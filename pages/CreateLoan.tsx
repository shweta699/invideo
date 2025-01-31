import React from 'react';
import { LoanForm } from '../components/LoanForm';

export const CreateLoan: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-sm rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Request a New Loan</h1>
      <LoanForm />
    </div>
  );
};