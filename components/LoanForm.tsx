import React, { useState } from 'react';
import { api } from '../services/api';
import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';

export const LoanForm: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.createLoan(Number(amount), Number(term));
      setAmount('');
      setTerm('');
    } catch (err) {
      setError('Failed to create loan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <ErrorMessage message={error} />}
      
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Loan Amount ($)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1000"
          step="100"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="term" className="block text-sm font-medium text-gray-700">
          Term (months)
        </label>
        <input
          type="number"
          id="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          min="1"
          max="12"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? <LoadingSpinner /> : 'Submit Loan Request'}
      </button>
    </form>
  );
};