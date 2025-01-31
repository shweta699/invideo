import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { Loan } from '../types/loan';
import { LoanDetails as LoanDetailsComponent } from '../components/LoanDetails';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export const LoanDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loan, setLoan] = useState<Loan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLoan = async () => {
      if (!id) return;
      
      try {
        const data = await api.getLoan(id);
        setLoan(data);
      } catch (err) {
        setError('Failed to fetch loan details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!loan) return <ErrorMessage message="Loan not found" />;

  return <LoanDetailsComponent loan={loan} />;
};