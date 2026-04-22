require('dotenv').config();

const cors = require('cors');
const crypto = require('crypto');
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { hashPassword, initDb, pool, verifyPassword } = require('./db');
const { getCodingQuestions, gradeAptitude, pickAptitudeQuestions } = require('./questionBank');

const app = express();
const port = process.env.PORT || 5000;
const uploadRoot = path.join(__dirname, 'uploads');
const authSecret = process.env.ADMIN_AUTH_SECRET || 'tazviro-hiring-admin-secret';

fs.mkdirSync(path.join(uploadRoot, 'resumes'), { recursive: true });
fs.mkdirSync(path.join(uploadRoot, 'recordings'), { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const folder = file.fieldname === 'cameraRecording' ? 'recordings' : 'resumes';
    cb(null, path.join(uploadRoot, folder));
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '');
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

const asyncRoute = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

const toPublicUploadUrl = (filePath = '') => {
  if (!filePath) {
    return null;
  }

  const relativePath = path.relative(uploadRoot, filePath).replace(/\\/g, '/');
  if (!relativePath || relativePath.startsWith('..')) {
    return null;
  }

  return `/uploads/${relativePath}`;
};

const sendStoredFile = async ({ res, queryText, id, missingMessage, downloadName }) => {
  const result = await pool.query(queryText, [id]);
  if (!result.rowCount || !result.rows[0].file_path) {
    return res.status(404).json({ message: missingMessage });
  }

  const filePath = result.rows[0].file_path;
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Stored file was not found on disk.' });
  }

  if (downloadName) {
    res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(downloadName)}"`);
  }

  return res.sendFile(path.resolve(filePath));
};

const base64UrlEncode = (value) => Buffer.from(value).toString('base64url');
const base64UrlDecode = (value) => Buffer.from(value, 'base64url').toString('utf8');

const signAdminToken = (payload) => {
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = crypto.createHmac('sha256', authSecret).update(encodedPayload).digest('base64url');
  return `${encodedPayload}.${signature}`;
};

const verifyAdminToken = (token) => {
  const [encodedPayload, signature] = (token || '').split('.');
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = crypto.createHmac('sha256', authSecret).update(encodedPayload).digest('base64url');
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (signatureBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  const payload = JSON.parse(base64UrlDecode(encodedPayload));
  if (!payload.exp || payload.exp < Date.now()) {
    return null;
  }

  return payload;
};

const issueAdminSession = (adminUser) => {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 12;
  const token = signAdminToken({
    sub: adminUser.id,
    username: adminUser.username,
    mustChangePassword: adminUser.must_change_password,
    exp: expiresAt,
  });

  return {
    token,
    user: {
      id: adminUser.id,
      username: adminUser.username,
      mustChangePassword: adminUser.must_change_password,
    },
    expiresAt,
  };
};

const requireAdminAuth = asyncRoute(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const payload = verifyAdminToken(token);

  if (!payload) {
    return res.status(401).json({ message: 'Admin authentication is required.' });
  }

  const adminUser = await pool.query(
    'SELECT id, username, must_change_password FROM admin_users WHERE id = $1',
    [payload.sub],
  );

  if (!adminUser.rowCount) {
    return res.status(401).json({ message: 'Admin user was not found.' });
  }

  req.adminUser = adminUser.rows[0];
  next();
});

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use('/uploads', express.static(uploadRoot));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/admin/assets/resume/:candidateId', asyncRoute(async (req, res) => {
  await sendStoredFile({
    res,
    id: Number(req.params.candidateId),
    missingMessage: 'Resume was not found for this candidate.',
    downloadName: undefined,
    queryText: `
      SELECT resume_path AS file_path
      FROM candidates
      WHERE id = $1
    `,
  });
}));

app.get('/api/admin/assets/resume/:candidateId/download', asyncRoute(async (req, res) => {
  const candidate = await pool.query(
    `SELECT resume_path AS file_path, resume_original_name
     FROM candidates
     WHERE id = $1`,
    [Number(req.params.candidateId)],
  );

  if (!candidate.rowCount || !candidate.rows[0].file_path) {
    return res.status(404).json({ message: 'Resume was not found for this candidate.' });
  }

  if (!fs.existsSync(candidate.rows[0].file_path)) {
    return res.status(404).json({ message: 'Stored file was not found on disk.' });
  }

  return res.download(path.resolve(candidate.rows[0].file_path), candidate.rows[0].resume_original_name || 'resume');
}));

app.get('/api/admin/assets/recording/:attemptId', asyncRoute(async (req, res) => {
  await sendStoredFile({
    res,
    id: Number(req.params.attemptId),
    missingMessage: 'Recording was not found for this attempt.',
    downloadName: undefined,
    queryText: `
      SELECT camera_recording_path AS file_path
      FROM assessment_attempts
      WHERE id = $1
    `,
  });
}));

app.post('/api/candidates', upload.single('resume'), asyncRoute(async (req, res) => {
  const { name, email, mobile, designation } = req.body;
  const normalizedEmail = (email || '').trim().toLowerCase();

  if (!name || !normalizedEmail || !mobile || !designation || !req.file) {
    return res.status(400).json({ message: 'Name, email, mobile, designation, and resume are required.' });
  }

  const existingCandidate = await pool.query(
    'SELECT id FROM candidates WHERE LOWER(email) = $1 LIMIT 1',
    [normalizedEmail],
  );

  if (existingCandidate.rowCount) {
    return res.status(409).json({
      message: 'This email has already been used for the Tazviro Technologies hiring test and cannot take the test again.',
    });
  }

  const candidate = await pool.query(
    `INSERT INTO candidates (name, email, mobile, designation, resume_path, resume_original_name)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [name.trim(), normalizedEmail, mobile.trim(), designation, req.file.path, req.file.originalname],
  );

  const attempt = await pool.query(
    `INSERT INTO assessment_attempts (candidate_id, coding_designation)
     VALUES ($1, $2)
     RETURNING *`,
    [candidate.rows[0].id, designation],
  );

  res.status(201).json({ candidate: candidate.rows[0], attempt: attempt.rows[0] });
}));

app.get('/api/aptitude/questions', (_req, res) => {
  res.json({ questions: pickAptitudeQuestions(), passMark: 30, total: 40 });
});

app.post('/api/attempts/:attemptId/aptitude', asyncRoute(async (req, res) => {
  const attemptId = Number(req.params.attemptId);
  const answers = req.body.answers || {};
  const score = gradeAptitude(answers);
  const passed = score >= 30;

  const result = await pool.query(
    `UPDATE assessment_attempts
     SET aptitude_score = $1, aptitude_total = 40, aptitude_passed = $2, aptitude_answers = $3, updated_at = NOW()
     WHERE id = $4
     RETURNING *`,
    [score, passed, JSON.stringify(answers), attemptId],
  );

  if (!result.rowCount) {
    return res.status(404).json({ message: 'Attempt not found.' });
  }

  res.json({ score, total: 40, passed, attempt: result.rows[0] });
}));

app.get('/api/coding/questions', (req, res) => {
  res.json({ questions: getCodingQuestions(req.query.designation) });
});

app.post('/api/attempts/:attemptId/coding', asyncRoute(async (req, res) => {
  const attemptId = Number(req.params.attemptId);
  const { designation, questions, submissions } = req.body;

  const existing = await pool.query('SELECT aptitude_passed FROM assessment_attempts WHERE id = $1', [attemptId]);
  if (!existing.rowCount) {
    return res.status(404).json({ message: 'Attempt not found.' });
  }

  if (!existing.rows[0].aptitude_passed) {
    return res.status(403).json({ message: 'Candidate must pass aptitude before coding round.' });
  }

  const result = await pool.query(
    `UPDATE assessment_attempts
     SET coding_designation = $1, coding_questions = $2, coding_submissions = $3, completed_at = NOW(), updated_at = NOW()
     WHERE id = $4
     RETURNING *`,
    [designation, JSON.stringify(questions || []), JSON.stringify(submissions || {}), attemptId],
  );

  res.json({ attempt: result.rows[0] });
}));

app.post('/api/attempts/:attemptId/recording', upload.single('cameraRecording'), asyncRoute(async (req, res) => {
  const attemptId = Number(req.params.attemptId);

  if (!req.file) {
    return res.status(400).json({ message: 'Camera recording is required.' });
  }

  const result = await pool.query(
    `UPDATE assessment_attempts
     SET camera_recording_path = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING camera_recording_path`,
    [req.file.path, attemptId],
  );

  if (!result.rowCount) {
    return res.status(404).json({ message: 'Attempt not found.' });
  }

  res.json({ recordingPath: result.rows[0].camera_recording_path });
}));

app.post('/api/admin/login', asyncRoute(async (req, res) => {
  const username = (req.body.username || '').trim().toLowerCase();
  const password = req.body.password || '';

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const result = await pool.query(
    'SELECT id, username, password_hash, must_change_password FROM admin_users WHERE username = $1',
    [username],
  );

  if (!result.rowCount || !verifyPassword(password, result.rows[0].password_hash)) {
    return res.status(401).json({ message: 'Invalid admin username or password.' });
  }

  res.json(issueAdminSession(result.rows[0]));
}));

app.post('/api/admin/change-password', requireAdminAuth, asyncRoute(async (req, res) => {
  const currentPassword = req.body.currentPassword || '';
  const newPassword = req.body.newPassword || '';

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Current password and new password are required.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ message: 'New password must be at least 8 characters.' });
  }

  const adminUser = await pool.query(
    'SELECT id, username, password_hash, must_change_password FROM admin_users WHERE id = $1',
    [req.adminUser.id],
  );

  if (!adminUser.rowCount || !verifyPassword(currentPassword, adminUser.rows[0].password_hash)) {
    return res.status(401).json({ message: 'Current password is incorrect.' });
  }

  const updated = await pool.query(
    `UPDATE admin_users
     SET password_hash = $1, must_change_password = FALSE, updated_at = NOW()
     WHERE id = $2
     RETURNING id, username, must_change_password`,
    [hashPassword(newPassword), req.adminUser.id],
  );

  res.json(issueAdminSession(updated.rows[0]));
}));

app.get('/api/admin/candidates', requireAdminAuth, asyncRoute(async (_req, res) => {
  const result = await pool.query(`
    SELECT
      c.id AS candidate_id,
      c.name,
      c.email,
      c.mobile,
      c.designation,
      c.resume_original_name,
      c.resume_path,
      c.created_at AS candidate_created_at,
      a.id AS attempt_id,
      a.aptitude_score,
      a.aptitude_total,
      a.aptitude_passed,
      a.coding_designation,
      a.coding_questions,
      a.coding_submissions,
      a.camera_recording_path,
      a.completed_at,
      a.created_at AS attempt_created_at,
      CASE
        WHEN a.aptitude_passed = TRUE AND a.completed_at IS NOT NULL THEN 'Passed aptitude and completed coding'
        WHEN a.aptitude_passed = TRUE THEN 'Passed aptitude'
        WHEN a.aptitude_passed = FALSE AND a.aptitude_score > 0 THEN 'Not passed aptitude'
        ELSE 'Started registration'
      END AS assessment_status
    FROM candidates c
    LEFT JOIN assessment_attempts a ON a.candidate_id = c.id
    ORDER BY c.created_at DESC
  `);

  const candidates = result.rows.map((row) => ({
    ...row,
    resume_url: toPublicUploadUrl(row.resume_path),
    recording_url: toPublicUploadUrl(row.camera_recording_path),
    resume_view_url: row.resume_path ? `/api/admin/assets/resume/${row.candidate_id}` : null,
    resume_download_url: row.resume_path ? `/api/admin/assets/resume/${row.candidate_id}/download` : null,
    recording_view_url: row.camera_recording_path ? `/api/admin/assets/recording/${row.attempt_id}` : null,
  }));

  res.json({ candidates });
}));

app.get('/api/admin/users', requireAdminAuth, asyncRoute(async (_req, res) => {
  const result = await pool.query(`
    SELECT
      u.id,
      u.username,
      u.must_change_password,
      u.created_at,
      creator.username AS created_by_username
    FROM admin_users u
    LEFT JOIN admin_users creator ON creator.id = u.created_by
    ORDER BY u.created_at DESC
  `);

  res.json({ users: result.rows });
}));

app.post('/api/admin/users', requireAdminAuth, asyncRoute(async (req, res) => {
  const username = (req.body.username || '').trim().toLowerCase();
  const temporaryPassword = req.body.temporaryPassword || '';

  if (!username || !temporaryPassword) {
    return res.status(400).json({ message: 'Username and temporary password are required.' });
  }

  if (temporaryPassword.length < 8) {
    return res.status(400).json({ message: 'Temporary password must be at least 8 characters.' });
  }

  const result = await pool.query(
    `INSERT INTO admin_users (username, password_hash, must_change_password, created_by, updated_at)
     VALUES ($1, $2, TRUE, $3, NOW())
     RETURNING id, username, must_change_password, created_at`,
    [username, hashPassword(temporaryPassword), req.adminUser.id],
  );

  res.status(201).json({ user: result.rows[0] });
}));

app.use((err, _req, res, _next) => {
  console.error(err);
  if (err.code === '23505') {
    return res.status(409).json({ message: 'This username already exists.' });
  }
  res.status(500).json({ message: 'Server error. Please check backend logs.' });
});

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Hiring API running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start API:', error);
    process.exit(1);
  });
