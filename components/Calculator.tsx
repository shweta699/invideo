import { useState } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';

export function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<number | string>('');
  const [error, setError] = useState('');

  const calculateExpression = (expr: string) => {
    try {
      // Using Function instead of eval for better security
      const sanitizedExpr = expr.replace(/[^0-9+\-*/().]/g, '');
      const result = new Function(`return ${sanitizedExpr}`)();
      
      if (!isFinite(result)) {
        throw new Error('Invalid calculation result');
      }
      
      setResult(result);
      setError('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Invalid expression');
      setResult('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <CalculatorIcon className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Calculator</h2>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="Enter expression (e.g., 2+2)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => calculateExpression(expression)}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            =
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {result !== '' && !error && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold text-gray-800">
              Result: {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}