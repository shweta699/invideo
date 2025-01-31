import React, { useState } from 'react';
import { Calculator } from './components/Calculator';
import { Shader } from './components/Shader';

function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'shader'>('calculator');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Interactive Playground
        </h1>

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === 'calculator'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                Calculator
              </button>
              <button
                onClick={() => setActiveTab('shader')}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === 'shader'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                Shader
              </button>
            </nav>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          {activeTab === 'calculator' ? <Calculator /> : <Shader />}
        </div>
      </div>
    </div>
  );
}

export default App;