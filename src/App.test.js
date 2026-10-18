import { render, screen } from '@testing-library/react';
import Card from './Card';

test('renders Card component with title and description', () => {
  render(
    <Card
      title="ATS Score Checker"
      description="Instantly see how your resume performs on ATS systems."
      tag="Step 01"
    />
  );
  expect(screen.getByText(/ATS Score Checker/i)).toBeInTheDocument();
  expect(screen.getByText(/Instantly see how your resume performs/i)).toBeInTheDocument();
  expect(screen.getByText(/Step 01/i)).toBeInTheDocument();
});
