import { render, screen } from '@testing-library/react';
import App from './App';

test('renders tazviro hiring portal welcome screen', () => {
  render(<App />);
  expect(screen.getByText(/welcome to tazviro technologies hiring portal/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /start candidate registration/i })).toBeInTheDocument();
});
