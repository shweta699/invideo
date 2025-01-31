import React from 'react';
import { format } from 'date-fns';
import { Loan } from '../types/loan';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface LoanDetailsProps {
  loan: Loan;
}

export const LoanDetails: React.FC<LoanDetailsProps> = ({ loan }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'PENDING':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Loan Details</h2>
        <div className="flex items-center">
          {getStatusIcon(loan.status)}
          <span className="ml-2 text-sm font-medium">{loan.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Amount</p>
          <p className="font-medium">${loan.amount.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Term</p>
          <p className="font-medium">{loan.term} months</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Scheduled Repayments</h3>
        <div className="space-y-3">
          {loan.scheduledRepayments.map((repayment) => (
            <div
              key={repayment.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded"
            >
              <div>
                <p className="font-medium">
                  ${repayment.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Due: {format(new Date(repayment.dueDate), 'PP')}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  repayment.status === 'PAID'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {repayment.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};