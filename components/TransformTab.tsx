import React, { useState } from 'react';
import { Filter, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { UserRecord } from '../types';

const TransformTab: React.FC = () => {
  const [toggles, setToggles] = useState({
    standardizeName: false,
    formatDate: false,
    cleanCurrency: false,
  });

  const rawData: UserRecord = {
    id: "U1",
    name: "john DOE ",
    signup_date: "2023/01/15",
    amount: "$100.50",
    status: 'raw'
  };

  const processData = (raw: UserRecord) => {
    const processed = { ...raw };
    processed.status = 'processed';

    if (toggles.standardizeName) {
      // Title Case and Trim
      processed.name = raw.name.trim().toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    }

    if (toggles.formatDate) {
      // YYYY/MM/DD -> YYYY-MM-DD
      processed.signup_date = raw.signup_date.replace(/\//g, '-');
    }

    if (toggles.cleanCurrency) {
      // Remove $ and parse to number (represented as float)
      const num = parseFloat(String(raw.amount).replace('$', ''));
      processed.amount = num;
    }

    return processed;
  };

  const processedData = processData(rawData);

  const toggleSwitch = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Filter className="text-blue-500" />
          T - Transform
        </h2>
        <p className="text-slate-400">
          This is the "Secret Sauce" where business logic is applied. Data is cleaned, standardized, 
          and enriched before analysis.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Input */}
        <div className="bg-slate-900 rounded-xl border border-slate-700 p-4 flex flex-col">
          <div className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">Raw Input</div>
          <div className="bg-slate-950 p-4 rounded-lg font-mono text-sm text-slate-300 flex-1 overflow-auto code-scroll shadow-inner">
            <span className="text-purple-400">{`{`}</span>
            <br />
            <div className="pl-4">
              <span className="text-blue-400">"id"</span>: <span className="text-green-400">"{rawData.id}"</span>,<br />
              
              <div className="bg-red-900/20 -mx-2 px-2 rounded">
                <span className="text-blue-400">"name"</span>: <span className="text-red-400">"{rawData.name}"</span>,
              </div>
              
              <div className="bg-red-900/20 -mx-2 px-2 rounded mt-1">
                <span className="text-blue-400">"signup_date"</span>: <span className="text-red-400">"{rawData.signup_date}"</span>,
              </div>
              
              <div className="bg-red-900/20 -mx-2 px-2 rounded mt-1">
                <span className="text-blue-400">"amount"</span>: <span className="text-red-400">"{rawData.amount}"</span>
              </div>
            </div>
            <span className="text-purple-400">{`}`}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col justify-center space-y-4 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-center font-bold text-slate-300 mb-2">Transformation Rules</h3>
          
          <button 
            onClick={() => toggleSwitch('standardizeName')}
            className={`flex items-center justify-between p-4 rounded-lg border transition-all ${toggles.standardizeName ? 'bg-blue-900/30 border-blue-500' : 'bg-slate-700 border-slate-600'}`}
          >
            <span className="text-sm font-medium">Standardize Names</span>
            {toggles.standardizeName ? <CheckCircle className="text-blue-400 w-5 h-5" /> : <XCircle className="text-slate-500 w-5 h-5" />}
          </button>

          <button 
            onClick={() => toggleSwitch('formatDate')}
            className={`flex items-center justify-between p-4 rounded-lg border transition-all ${toggles.formatDate ? 'bg-blue-900/30 border-blue-500' : 'bg-slate-700 border-slate-600'}`}
          >
            <span className="text-sm font-medium">ISO Date Format</span>
             {toggles.formatDate ? <CheckCircle className="text-blue-400 w-5 h-5" /> : <XCircle className="text-slate-500 w-5 h-5" />}
          </button>

          <button 
            onClick={() => toggleSwitch('cleanCurrency')}
            className={`flex items-center justify-between p-4 rounded-lg border transition-all ${toggles.cleanCurrency ? 'bg-blue-900/30 border-blue-500' : 'bg-slate-700 border-slate-600'}`}
          >
            <span className="text-sm font-medium">Currency to Float</span>
             {toggles.cleanCurrency ? <CheckCircle className="text-blue-400 w-5 h-5" /> : <XCircle className="text-slate-500 w-5 h-5" />}
          </button>

          <div className="flex justify-center py-4">
             <ArrowRight className="text-slate-500 animate-pulse w-8 h-8" />
          </div>
        </div>

        {/* Output */}
        <div className="bg-slate-900 rounded-xl border border-slate-700 p-4 flex flex-col">
          <div className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">Clean Output</div>
          <div className="bg-slate-950 p-4 rounded-lg font-mono text-sm text-slate-300 flex-1 overflow-auto code-scroll shadow-inner">
            <span className="text-purple-400">{`{`}</span>
            <br />
            <div className="pl-4">
              <span className="text-blue-400">"id"</span>: <span className="text-green-400">"{processedData.id}"</span>,<br />
              
              <div className={`${toggles.standardizeName ? 'bg-green-900/20' : 'bg-slate-800/50'} -mx-2 px-2 rounded transition-colors duration-300`}>
                <span className="text-blue-400">"name"</span>: <span className="text-green-400">"{processedData.name}"</span>,
              </div>
              
              <div className={`${toggles.formatDate ? 'bg-green-900/20' : 'bg-slate-800/50'} -mx-2 px-2 rounded mt-1 transition-colors duration-300`}>
                <span className="text-blue-400">"signup_date"</span>: <span className="text-green-400">"{processedData.signup_date}"</span>,
              </div>
              
              <div className={`${toggles.cleanCurrency ? 'bg-green-900/20' : 'bg-slate-800/50'} -mx-2 px-2 rounded mt-1 transition-colors duration-300`}>
                <span className="text-blue-400">"amount"</span>: <span className={toggles.cleanCurrency ? "text-orange-400" : "text-green-400"}>
                  {typeof processedData.amount === 'number' ? processedData.amount : `"${processedData.amount}"`}
                </span>
              </div>
            </div>
            <span className="text-purple-400">{`}`}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TransformTab;