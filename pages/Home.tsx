import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, Calendar, CheckSquare } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Simple and Flexible Loan Management
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Get the financial flexibility you need with our easy-to-use loan platform
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <DollarSign className="h-8 w-8 text-blue-500" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Flexible Amounts</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Choose the loan amount that works best for your needs
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <Calendar className="h-8 w-8 text-blue-500" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Custom Terms</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Select repayment terms that fit your schedule
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <CheckSquare className="h-8 w-8 text-blue-500" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Easy Management</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Track and manage your loans in one place
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/create"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};