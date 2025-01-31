import axios from 'axios';
import { Loan } from '../types/loan';

const API_URL = 'http://localhost:3000/api';

export const api = {
  // Loan related API calls
  createLoan: async (amount: number, term: number) => {
    const response = await axios.post(`${API_URL}/loans`, { amount, term });
    return response.data;
  },

  getLoans: async () => {
    const response = await axios.get(`${API_URL}/loans`);
    return response.data;
  },

  getLoan: async (id: string): Promise<Loan> => {
    const response = await axios.get(`${API_URL}/loans/${id}`);
    return response.data;
  },

  approveLoan: async (id: string) => {
    const response = await axios.patch(`${API_URL}/loans/${id}/approve`);
    return response.data;
  },

  // Repayment related API calls
  addRepayment: async (loanId: string, repaymentId: string, amount: number) => {
    const response = await axios.post(`${API_URL}/loans/${loanId}/repayments`, {
      repaymentId,
      amount,
    });
    return response.data;
  },
};