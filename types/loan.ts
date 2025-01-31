export type LoanStatus = 'PENDING' | 'APPROVED' | 'PAID';
export type RepaymentStatus = 'PENDING' | 'PAID';

export interface Loan {
  id: string;
  customerId: string;
  amount: number;
  term: number;
  status: LoanStatus;
  createdAt: string;
  scheduledRepayments: ScheduledRepayment[];
}

export interface ScheduledRepayment {
  id: string;
  loanId: string;
  amount: number;
  dueDate: string;
  status: RepaymentStatus;
}