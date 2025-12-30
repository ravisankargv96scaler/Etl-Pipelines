import React from 'react';
import { Database, Server, Box, ArrowRight } from 'lucide-react';

const EtlVsEltTab: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">ETL vs. ELT</h2>
        <p className="text-slate-400">
          The modern cloud has changed the order of operations. 
          <span className="text-blue-400 ml-1">ELT</span> leverages the massive power of cloud warehouses (Snowflake, BigQuery) to transform data <em>after</em> loading.
        </p>
      </div>

      <div className="flex-1 grid grid-rows-2 gap-8 mt-4">
        
        {/* Classic ETL */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 bg-slate-800 rounded-bl-lg text-xs font-bold text-slate-400 border-l border-b border-slate-700">
            CLASSIC ETL
          </div>
          
          <div className="flex items-center justify-between h-full relative z-10 px-4">
            
            {/* Source */}
            <div className="flex flex-col items-center gap-2 z-10 bg-slate-900/50 p-2 rounded">
              <Database className="text-slate-500 w-8 h-8" />
              <span className="text-xs text-slate-500 font-bold">SOURCE</span>
            </div>

            {/* Transform Server (Middleman) */}
            <div className="flex flex-col items-center gap-2 z-10 bg-slate-900/50 p-2 rounded">
              <div className="w-12 h-12 border-2 border-orange-500 rounded bg-slate-800 flex items-center justify-center">
                 <Server className="text-orange-500 w-6 h-6" />
              </div>
              <span className="text-xs text-orange-500 font-bold text-center">Small Transform<br/>Server</span>
            </div>

            {/* Warehouse */}
            <div className="flex flex-col items-center gap-2 z-10 bg-slate-900/50 p-2 rounded">
              <Database className="text-blue-500 w-10 h-10" />
              <span className="text-xs text-blue-500 font-bold">WAREHOUSE</span>
            </div>

            {/* Connecting Line */}
            <div className="absolute top-1/2 left-10 right-10 h-1 bg-slate-700 -translate-y-8 z-0"></div>

            {/* Moving Packet (Slow through middle) */}
            <div className="absolute top-1/2 left-12 -translate-y-[2.1rem] z-20 animate-flow-slow">
              <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
            </div>

          </div>
          <p className="text-center text-xs text-slate-500 mt-4">Transformation happens in transit. Can be slow and bottlenecked.</p>
        </div>

        {/* Modern ELT */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 bg-slate-800 rounded-bl-lg text-xs font-bold text-blue-400 border-l border-b border-slate-700">
            MODERN ELT
          </div>
          
          <div className="flex items-center justify-between h-full relative z-10 px-4">
            
            {/* Source */}
            <div className="flex flex-col items-center gap-2 z-10 bg-slate-900/50 p-2 rounded">
              <Database className="text-slate-500 w-8 h-8" />
              <span className="text-xs text-slate-500 font-bold">SOURCE</span>
            </div>

            {/* Warehouse (With Transform Inside) */}
            <div className="flex flex-col items-center gap-2 z-10 bg-slate-900/50 p-2 rounded flex-1 ml-12">
              <div className="w-full h-16 border-2 border-blue-500 rounded bg-slate-800 flex items-center justify-center gap-4 relative overflow-hidden">
                 {/* Internal Swirl */}
                 <div className="absolute inset-0 bg-blue-500/10"></div>
                 <Database className="text-blue-300 w-8 h-8" />
                 <ArrowRight className="text-blue-500/50" />
                 <Server className="text-blue-300 w-8 h-8 animate-pulse" />
              </div>
              <span className="text-xs text-blue-400 font-bold text-center">Transform INSIDE Warehouse</span>
            </div>

            {/* Connecting Line */}
            <div className="absolute top-1/2 left-10 right-[60%] h-1 bg-slate-700 -translate-y-8 z-0"></div>

            {/* Moving Packet (Fast to warehouse) */}
            <div className="absolute top-1/2 left-12 -translate-y-[2.1rem] z-20 animate-flow-fast">
              <div className="w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_cyan]"></div>
            </div>

          </div>
          <p className="text-center text-xs text-slate-500 mt-4">Load raw data first, then Transform at scale using SQL/DBT.</p>
        </div>

      </div>
    </div>
  );
};

export default EtlVsEltTab;