const aptitudeQuestions = [
  { id: 'apt-1', question: 'If 12 workers finish a job in 15 days, how many days will 20 workers take?', options: ['6', '9', '12', '25'], answer: '9' },
  { id: 'apt-2', question: 'A number increased by 20% becomes 180. What is the original number?', options: ['120', '140', '150', '160'], answer: '150' },
  { id: 'apt-3', question: 'Find the next number: 3, 9, 27, 81, ?', options: ['108', '162', '216', '243'], answer: '243' },
  { id: 'apt-4', question: 'The average of 5 numbers is 18. If one number is removed, the average becomes 16. What number was removed?', options: ['20', '24', '26', '28'], answer: '26' },
  { id: 'apt-5', question: 'A train 120 m long crosses a pole in 6 seconds. What is its speed?', options: ['60 km/h', '72 km/h', '80 km/h', '90 km/h'], answer: '72 km/h' },
  { id: 'apt-6', question: 'What is 35% of 240?', options: ['72', '78', '84', '90'], answer: '84' },
  { id: 'apt-7', question: 'Simple interest on Rs. 5000 at 8% for 2 years is:', options: ['Rs. 400', 'Rs. 600', 'Rs. 800', 'Rs. 1000'], answer: 'Rs. 800' },
  { id: 'apt-8', question: 'If A:B = 2:3 and B:C = 4:5, then A:C is:', options: ['6:15', '8:15', '2:5', '3:5'], answer: '8:15' },
  { id: 'apt-9', question: 'A shopkeeper marks an item Rs. 800 and gives 10% discount. Selling price is:', options: ['Rs. 680', 'Rs. 700', 'Rs. 720', 'Rs. 760'], answer: 'Rs. 720' },
  { id: 'apt-10', question: 'Find the odd one: Apple, Mango, Carrot, Banana', options: ['Apple', 'Mango', 'Carrot', 'Banana'], answer: 'Carrot' },
  { id: 'apt-11', question: 'If 7x = 84, then x is:', options: ['7', '10', '12', '14'], answer: '12' },
  { id: 'apt-12', question: 'A can do a work in 10 days and B in 15 days. Together they take:', options: ['5 days', '6 days', '8 days', '12 days'], answer: '6 days' },
  { id: 'apt-13', question: 'Find the next letters: AB, DE, GH, ?', options: ['IJ', 'JK', 'KL', 'LM'], answer: 'JK' },
  { id: 'apt-14', question: 'The perimeter of a square is 48 cm. Its area is:', options: ['96 sq cm', '120 sq cm', '144 sq cm', '196 sq cm'], answer: '144 sq cm' },
  { id: 'apt-15', question: 'Which is the smallest fraction?', options: ['1/2', '2/3', '3/4', '4/5'], answer: '1/2' },
  { id: 'apt-16', question: 'A clock shows 3:15. The angle between the hands is closest to:', options: ['0 degrees', '7.5 degrees', '15 degrees', '30 degrees'], answer: '7.5 degrees' },
  { id: 'apt-17', question: 'If CODING is written as DPEJOH, then TEST is written as:', options: ['UFTU', 'SDRS', 'VGUW', 'UERT'], answer: 'UFTU' },
  { id: 'apt-18', question: 'A man sells an article for Rs. 550 at 10% profit. Cost price is:', options: ['Rs. 450', 'Rs. 500', 'Rs. 525', 'Rs. 600'], answer: 'Rs. 500' },
  { id: 'apt-19', question: 'The LCM of 12 and 18 is:', options: ['24', '30', '36', '72'], answer: '36' },
  { id: 'apt-20', question: 'The HCF of 48 and 60 is:', options: ['6', '8', '12', '16'], answer: '12' },
  { id: 'apt-21', question: 'If 15% of a number is 45, the number is:', options: ['200', '250', '300', '350'], answer: '300' },
  { id: 'apt-22', question: 'Find the missing number: 2, 6, 12, 20, 30, ?', options: ['36', '40', '42', '44'], answer: '42' },
  { id: 'apt-23', question: 'A bag has 3 red and 2 blue balls. Probability of picking a red ball is:', options: ['2/5', '3/5', '1/2', '3/2'], answer: '3/5' },
  { id: 'apt-24', question: 'What is the square root of 196?', options: ['12', '13', '14', '16'], answer: '14' },
  { id: 'apt-25', question: 'If today is Monday, what day will it be after 17 days?', options: ['Wednesday', 'Thursday', 'Friday', 'Saturday'], answer: 'Thursday' },
  { id: 'apt-26', question: 'A rectangle has length 20 and breadth 12. Its area is:', options: ['64', '120', '240', '320'], answer: '240' },
  { id: 'apt-27', question: 'Choose the synonym of "Rapid".', options: ['Slow', 'Fast', 'Weak', 'Late'], answer: 'Fast' },
  { id: 'apt-28', question: 'Choose the antonym of "Expand".', options: ['Grow', 'Stretch', 'Contract', 'Increase'], answer: 'Contract' },
  { id: 'apt-29', question: 'If 5 pens cost Rs. 75, then 8 pens cost:', options: ['Rs. 100', 'Rs. 110', 'Rs. 120', 'Rs. 130'], answer: 'Rs. 120' },
  { id: 'apt-30', question: 'A person travels 60 km in 1.5 hours. Speed is:', options: ['30 km/h', '35 km/h', '40 km/h', '45 km/h'], answer: '40 km/h' },
  { id: 'apt-31', question: 'Which number is divisible by both 3 and 5?', options: ['25', '30', '32', '42'], answer: '30' },
  { id: 'apt-32', question: 'Find the next number: 1, 4, 9, 16, ?', options: ['20', '24', '25', '36'], answer: '25' },
  { id: 'apt-33', question: 'If the price rises from 100 to 125, percentage increase is:', options: ['20%', '25%', '30%', '40%'], answer: '25%' },
  { id: 'apt-34', question: 'Which word is different: Dog, Cat, Lion, Sparrow', options: ['Dog', 'Cat', 'Lion', 'Sparrow'], answer: 'Sparrow' },
  { id: 'apt-35', question: 'The value of 2^5 is:', options: ['16', '25', '32', '64'], answer: '32' },
  { id: 'apt-36', question: 'If 8 + 4 = 96 and 6 + 3 = 54, then 7 + 2 = ?', options: ['45', '56', '63', '72'], answer: '63' },
  { id: 'apt-37', question: 'A cube has how many faces?', options: ['4', '6', '8', '12'], answer: '6' },
  { id: 'apt-38', question: 'Choose the correctly spelled word.', options: ['Definately', 'Definitely', 'Definetly', 'Defiantly'], answer: 'Definitely' },
  { id: 'apt-39', question: 'If 25% of x is 60, then x is:', options: ['180', '200', '220', '240'], answer: '240' },
  { id: 'apt-40', question: 'The sum of angles in a triangle is:', options: ['90 degrees', '120 degrees', '180 degrees', '360 degrees'], answer: '180 degrees' },
  { id: 'apt-41', question: 'A boat goes 18 km downstream in 2 hours. Downstream speed is:', options: ['6 km/h', '9 km/h', '12 km/h', '18 km/h'], answer: '9 km/h' },
  { id: 'apt-42', question: 'Which comes next: Z, X, V, T, ?', options: ['R', 'S', 'U', 'W'], answer: 'R' },
  { id: 'apt-43', question: 'If a:b = 5:7 and b = 35, then a is:', options: ['20', '25', '30', '40'], answer: '25' },
  { id: 'apt-44', question: 'Convert 0.75 to a percentage.', options: ['7.5%', '25%', '75%', '750%'], answer: '75%' },
  { id: 'apt-45', question: 'A class has 18 boys and 12 girls. Percentage of girls is:', options: ['30%', '35%', '40%', '45%'], answer: '40%' },
];

const codingQuestions = {
  backend: [
    {
      id: 'be-1',
      title: 'API Rate Limiter',
      difficulty: 'Medium',
      estimatedTime: '20 min',
      languages: ['JavaScript', 'Python', 'Java'],
      prompt: 'Design a function that processes user request timestamps and allows only five requests per user in a rolling sixty-second window.',
      task: 'Return whether each request should be allowed or blocked while keeping the solution efficient for large input.',
      constraints: [
        'Up to 100000 requests may be processed.',
        'Timestamps are provided in ascending order.',
        'The rolling window is inclusive of the current request timestamp.',
      ],
      sampleCases: [
        { label: 'Sample 1', input: 'userA: [1, 10, 20, 30, 40, 50]', output: '[true, true, true, true, true, false]', explanation: 'The sixth request falls within the same sixty-second window.' },
        { label: 'Sample 2', input: 'userA: [1, 10, 20, 30, 40, 65]', output: '[true, true, true, true, true, true]', explanation: 'The oldest request at second 1 is outside the window when the request at 65 arrives.' },
      ],
      starterCode: {
        JavaScript: 'function allowRequests(requests) {\n  // requests: [{ userId, timestamp }]\n  // return array of booleans\n}\n',
        Python: 'def allow_requests(requests):\n    # requests: list of { userId, timestamp }\n    # return list[bool]\n    pass\n',
        Java: 'class Solution {\n    public boolean[] allowRequests(Request[] requests) {\n        return new boolean[requests.length];\n    }\n}\n',
      },
    },
    {
      id: 'be-2',
      title: 'Cursor Pagination',
      difficulty: 'Medium',
      estimatedTime: '18 min',
      languages: ['JavaScript', 'Python', 'Java'],
      prompt: 'You are given records sorted by createdAt descending. Build cursor-based pagination that returns the next page and the next cursor.',
      task: 'Implement a function that accepts the full record list, a page size, and an optional cursor, then returns the page data plus the next cursor.',
      constraints: [
        'The solution should avoid offset-based assumptions.',
        'The next cursor should allow the following page to start after the last item returned.',
      ],
      sampleCases: [
        { label: 'Sample 1', input: 'records=[9,8,7,6], size=2, cursor=null', output: 'page=[9,8], nextCursor=8', explanation: 'The next page should begin after record 8.' },
        { label: 'Sample 2', input: 'records=[9,8,7,6], size=2, cursor=8', output: 'page=[7,6], nextCursor=6', explanation: 'The cursor skips records already returned.' },
      ],
      starterCode: {
        JavaScript: 'function paginate(records, pageSize, cursor = null) {\n  return { page: [], nextCursor: null };\n}\n',
        Python: 'def paginate(records, page_size, cursor=None):\n    return { "page": [], "nextCursor": None }\n',
        Java: 'class Solution {\n    public PageResult paginate(List<Record> records, int pageSize, String cursor) {\n        return new PageResult();\n    }\n}\n',
      },
    },
    {
      id: 'be-3',
      title: 'Fix the Null Check Bug',
      difficulty: 'Easy',
      estimatedTime: '12 min',
      languages: ['JavaScript', 'Java', 'Python'],
      prompt: 'An API crashes when profile.address.city is missing. Write safer code that returns "Unknown" instead of throwing an error.',
      task: 'Show the corrected implementation and explain why the original code fails.',
      constraints: [
        'Handle null, undefined, and missing nested objects.',
        'Keep the implementation readable for production code review.',
      ],
      sampleCases: [
        { label: 'Sample 1', input: 'profile = { address: { city: "Hyderabad" } }', output: '"Hyderabad"', explanation: 'The city is available, so the real value should be returned.' },
        { label: 'Sample 2', input: 'profile = { }', output: '"Unknown"', explanation: 'Missing nested fields must not crash the API.' },
      ],
      starterCode: {
        JavaScript: 'function getCity(profile) {\n  return "Unknown";\n}\n',
        Java: 'class Solution {\n    public String getCity(Profile profile) {\n        return "Unknown";\n    }\n}\n',
        Python: 'def get_city(profile):\n    return "Unknown"\n',
      },
    },
  ],
  frontend: [
    {
      id: 'fe-1',
      title: 'React Search Filter',
      difficulty: 'Medium',
      estimatedTime: '18 min',
      languages: ['JavaScript', 'TypeScript'],
      prompt: 'Create a React component that filters a candidate list by name and designation without mutating the original array.',
      task: 'Build the component and explain how state updates avoid mutation.',
      constraints: [
        'The original data array must remain unchanged.',
        'Filtering should react immediately as the user types.',
      ],
      sampleCases: [
        { label: 'Sample 1', input: 'search="an", designation="Backend"', output: 'Only backend candidates whose names include "an"', explanation: 'Both filters should be applied together.' },
      ],
      starterCode: {
        JavaScript: 'export default function CandidateFilter({ candidates }) {\n  return null;\n}\n',
        TypeScript: 'type Candidate = { name: string; designation: string };\nexport default function CandidateFilter({ candidates }: { candidates: Candidate[] }) {\n  return null;\n}\n',
      },
    },
    {
      id: 'fe-2',
      title: 'Decode the Render Error',
      difficulty: 'Easy',
      estimatedTime: '12 min',
      languages: ['JavaScript', 'TypeScript'],
      prompt: 'A component maps over candidates but sometimes throws "Cannot read properties of undefined". Explain why and fix it defensively.',
      task: 'Provide the corrected component and mention the edge case that caused the crash.',
      constraints: [
        'The fix should still render an empty state gracefully.',
        'Do not mutate props.',
      ],
      sampleCases: [
        { label: 'Sample 1', input: 'candidates = undefined', output: 'Render fallback UI instead of crashing', explanation: 'The component must handle undefined safely.' },
      ],
      starterCode: {
        JavaScript: 'function CandidateList({ candidates }) {\n  return null;\n}\n',
        TypeScript: 'type Candidate = { id: string; name: string };\nfunction CandidateList({ candidates }: { candidates?: Candidate[] }) {\n  return null;\n}\n',
      },
    },
    {
      id: 'fe-3',
      title: 'Async Button State',
      difficulty: 'Medium',
      estimatedTime: '15 min',
      languages: ['JavaScript', 'TypeScript'],
      prompt: 'Write a submit button handler that prevents double submit, shows loading, calls an async API, and displays success or failure.',
      task: 'Build the UI logic and include the button state transitions.',
      constraints: [
        'Multiple rapid clicks must not trigger duplicate API calls.',
        'The user should see a clear loading and result state.',
      ],
      sampleCases: [
        { label: 'Sample 1', input: 'User clicks twice quickly', output: 'Only one API call should execute', explanation: 'The loading state should block duplicate submission.' },
      ],
      starterCode: {
        JavaScript: 'async function handleSubmit() {\n  // implement\n}\n',
        TypeScript: 'async function handleSubmit(): Promise<void> {\n  // implement\n}\n',
      },
    },
  ],
  fullstack: [
    {
      id: 'fs-1',
      title: 'Candidate Result Endpoint',
      difficulty: 'Medium',
      estimatedTime: '20 min',
      languages: ['JavaScript', 'TypeScript'],
      prompt: 'Design an endpoint that returns candidate details, aptitude score, pass status, and coding submissions by candidate ID.',
      task: 'Write the backend route and explain the response shape expected by a frontend dashboard.',
      constraints: [
        'Handle missing candidate IDs with a proper error response.',
        'Return structured JSON ready for frontend rendering.',
      ],
      sampleCases: [
        { label: 'Sample 1', input: 'GET /api/results/12', output: 'Candidate profile plus assessment result JSON', explanation: 'The payload should include both registration and test details.' },
      ],
      starterCode: {
        JavaScript: 'app.get("/api/results/:candidateId", async (req, res) => {\n  // implement\n});\n',
        TypeScript: 'app.get("/api/results/:candidateId", async (req, res) => {\n  // implement\n});\n',
      },
    },
    {
      id: 'fs-2',
      title: 'React Form Validation',
      difficulty: 'Medium',
      estimatedTime: '18 min',
      languages: ['JavaScript', 'TypeScript'],
      prompt: 'Create client and server validation for name, email, mobile number, designation, and resume upload.',
      task: 'Show both the frontend validation flow and the backend guard clauses.',
      constraints: [
        'The same rules should be enforced on both client and server.',
        'Validation messages should be clear for the user.',
      ],
      sampleCases: [
        { label: 'Sample 1', input: 'email = invalid, resume = missing', output: 'Validation errors for both fields', explanation: 'The form should not submit until the required fields are valid.' },
      ],
      starterCode: {
        JavaScript: 'function validateCandidateForm(values) {\n  return {};\n}\n',
        TypeScript: 'type CandidateForm = { name: string; email: string; mobile: string; designation: string };\nfunction validateCandidateForm(values: CandidateForm) {\n  return {};\n}\n',
      },
    },
    {
      id: 'fs-3',
      title: 'Debug Duplicate Emails',
      difficulty: 'Medium',
      estimatedTime: '16 min',
      languages: ['SQL', 'JavaScript'],
      prompt: 'Candidates are being inserted twice when the form is clicked quickly. Explain the issue and write a reliable fix.',
      task: 'Describe the race condition and provide both a database-safe and application-safe solution.',
      constraints: [
        'Prevent duplicates even under concurrent requests.',
        'Explain why frontend-only button disabling is not sufficient.',
      ],
      sampleCases: [
        { label: 'Sample 1', input: 'Two requests with same email arrive nearly together', output: 'Only one candidate record should be created', explanation: 'The database constraint is the final protection layer.' },
      ],
      starterCode: {
        SQL: '-- add a uniqueness constraint and safe insert logic here\n',
        JavaScript: 'async function registerCandidate(payload) {\n  // implement\n}\n',
      },
    },
  ],
};

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function pickAptitudeQuestions() {
  return shuffle(aptitudeQuestions).slice(0, 40).map(({ answer, ...question }) => question);
}

function gradeAptitude(answers) {
  return aptitudeQuestions.reduce((score, question) => {
    return answers[question.id] === question.answer ? score + 1 : score;
  }, 0);
}

function getCodingQuestions(designation = '') {
  const key = designation.toLowerCase().includes('front')
    ? 'frontend'
    : designation.toLowerCase().includes('full')
      ? 'fullstack'
      : 'backend';
  return codingQuestions[key];
}

module.exports = { pickAptitudeQuestions, gradeAptitude, getCodingQuestions };
