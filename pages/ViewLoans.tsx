import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Loan } from '../types/loan';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { format } from 'date-fns';

export const ViewLoans: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await api.getLoans();
        setLoans(data);
      } catch (err) {
        setError('Failed to fetch loans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Loans</h1>
      
      {loans.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">You don't have any loans yet.</p>
          <Link
            to="/create"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Request a Loan
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loans.map((loan) => (
            <Link
              key={loan.id}
              to={`/loans/${loan.id}`}
              className="block bg-white shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xl font-semibold">${loan.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      Created on {format(new Date(loan.createdAt), 'PP')}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      loan.status === 'APPROVED'
                        ? 'bg-green-100 text-green-800'
                        : loan.status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {loan.status}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    {loan.term} monthly payments
                  </p>
                  <p className="text-sm text-gray-600">
                    {loan.scheduledRepayments.filter((r) => r.status === 'PAID').length} /{' '}
                    {loan.scheduledRepayments.length} payments completed
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};