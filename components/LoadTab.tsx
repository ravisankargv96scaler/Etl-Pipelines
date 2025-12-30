import React, { useState } from 'react';
import { Upload, RefreshCw, Zap, Table } from 'lucide-react';
import { UserRecord } from '../types';

const INITIAL_WAREHOUSE: UserRecord[] = [
  { id: 'U1', name: 'Alice Smith', signup_date: '2023-01-01', amount: 50.00, status: 'processed' },
  { id: 'U2', name: 'Bob Jones', signup_date: '2023-01-02', amount: 75.20, status: 'processed' },
  { id: 'U3', name: 'Charlie Day', signup_date: '2023-01-03', amount: 120.00, status: 'processed' },
];

const INCOMING_DATA: UserRecord[] = [
  { id: 'U2', name: 'Bob Jones', signup_date: '2023-01-02', amount: 200.00, status: 'updated' }, // Update
  { id: 'U4', name: 'Diana Prince', signup_date: '2023-01-06', amount: 95.50, status: 'new' }, // New
];

const LoadTab: React.FC = () => {
  const [warehouse, setWarehouse] = useState<UserRecord[]>(INITIAL_WAREHOUSE);
  const [loadingType, setLoadingType] = useState<'idle' | 'full' | 'incremental'>('idle');

  const fullLoad = () => {
    setLoadingType('full');
    // Simulate truncate (flash white/empty)
    setWarehouse([]);
    
    setTimeout(() => {
      // Load all records (Merging initial + incoming as if source of truth)
      // In a real full load, we replace everything with the source state. 
      // For this demo, we'll just load the "final state" of all records.
      const finalState = [
        INITIAL_WAREHOUSE[0], // U1 unchange
        INCOMING_DATA[0],     // U2 updated
        INITIAL_WAREHOUSE[2], // U3 unchanged
        INCOMING_DATA[1]      // U4 new
      ];
      setWarehouse(finalState);
      setLoadingType('idle');
    }, 800);
  };

  const incrementalLoad = () => {
    setLoadingType('incremental');
    
    setTimeout(() => {
      setWarehouse(prev => {
        const next = [...prev];
        INCOMING_DATA.forEach(incoming => {
          const index = next.findIndex(r => r.id === incoming.id);
          if (index >= 0) {
            // Update
            next[index] = incoming;
          } else {
            // Insert
            next.push(incoming);
          }
        });
        return next;
      });
      setLoadingType('idle');
    }, 800);
  };

  const reset = () => {
    setWarehouse(INITIAL_WAREHOUSE);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Upload className="text-green-500" />
            L - Load
          </h2>
          <p className="text-slate-400">
            Finally, data is loaded into the Warehouse.
          </p>
        </div>
        <button onClick={reset} className="text-xs text-slate-500 hover:text-white underline">Reset Table</button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-8">
        
        {/* Queue / Controls */}
        <div className="md:w-1/3 flex flex-col gap-6">
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
             <h3 className="font-bold text-slate-300 mb-4 border-b border-slate-700 pb-2">Incoming Queue</h3>
             <div className="space-y-2">
                {INCOMING_DATA.map(rec => (
                  <div key={rec.id} className="bg-slate-700 p-2 rounded text-xs flex justify-between items-center border-l-4 border-orange-500">
                    <span className="font-mono text-white">{rec.id}</span>
                    <span className="text-slate-300">{rec.status === 'updated' ? 'Update Amt' : 'New User'}</span>
                    <span className="font-mono text-green-400">${rec.amount}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="space-y-3">
             <button 
               onClick={fullLoad}
               disabled={loadingType !== 'idle'}
               className="w-full p-4 bg-red-900/30 hover:bg-red-900/50 border border-red-800 text-red-200 rounded-lg flex items-center justify-between group transition-all"
             >
               <div className="flex items-center gap-3">
                 <RefreshCw className={`w-5 h-5 ${loadingType === 'full' ? 'animate-spin' : ''}`} />
                 <div className="text-left">
                   <div className="font-bold">Full Load</div>
                   <div className="text-[10px] opacity-70">Truncate & Insert</div>
                 </div>
               </div>
             </button>

             <button 
               onClick={incrementalLoad}
               disabled={loadingType !== 'idle'}
               className="w-full p-4 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-800 text-blue-200 rounded-lg flex items-center justify-between group transition-all"
             >
               <div className="flex items-center gap-3">
                 <Zap className={`w-5 h-5 ${loadingType === 'incremental' ? 'text-yellow-400' : ''}`} />
                 <div className="text-left">
                   <div className="font-bold">Incremental Load</div>
                   <div className="text-[10px] opacity-70">Upsert (Update/Insert)</div>
                 </div>
               </div>
             </button>
          </div>
        </div>

        {/* Warehouse Visualization */}
        <div className="flex-1 bg-slate-900 rounded-xl border border-slate-700 p-6 flex flex-col">
           <div className="flex items-center gap-2 mb-4">
             <Table className="text-slate-500" />
             <h3 className="font-bold text-white">DATA WAREHOUSE <span className="text-slate-500 font-normal ml-2 text-sm">(Final Destination)</span></h3>
           </div>
           
           <div className={`flex-1 overflow-hidden transition-opacity duration-200 ${loadingType === 'full' ? 'opacity-0' : 'opacity-100'}`}>
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-slate-700 text-xs uppercase text-slate-500 tracking-wider">
                   <th className="p-3">ID</th>
                   <th className="p-3">Name</th>
                   <th className="p-3">Date</th>
                   <th className="p-3 text-right">Amount</th>
                 </tr>
               </thead>
               <tbody className="text-sm">
                 {warehouse.map((row) => {
                   const isNewOrUpdated = INCOMING_DATA.some(i => i.id === row.id) && loadingType === 'idle' && row.amount === (INCOMING_DATA.find(i => i.id === row.id)?.amount || -1);
                   
                   return (
                    <tr 
                      key={row.id} 
                      className={`border-b border-slate-800 transition-colors duration-1000 ${isNewOrUpdated ? 'bg-green-900/20' : ''}`}
                    >
                      <td className="p-3 font-mono text-slate-400">{row.id}</td>
                      <td className="p-3 text-slate-200">{row.name}</td>
                      <td className="p-3 text-slate-400">{row.signup_date}</td>
                      <td className="p-3 text-right font-mono text-green-400">${Number(row.amount).toFixed(2)}</td>
                    </tr>
                   );
                 })}
                 {warehouse.length === 0 && (
                   <tr>
                     <td colSpan={4} className="p-8 text-center text-slate-600 italic">
                       Warehouse is empty. Run a load job.
                     </td>
                   </tr>
                 )}
               </tbody>
             </table>
           </div>
        </div>

      </div>
    </div>
  );
};

export default LoadTab;