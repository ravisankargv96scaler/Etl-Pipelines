import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Box, Truck, PackageCheck, Cog, Factory } from 'lucide-react';

const BigPictureTab: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'extracting' | 'transforming' | 'loading' | 'done'>('idle');

  const runPipeline = () => {
    if (status !== 'idle' && status !== 'done') return;
    
    setStatus('extracting');
    
    // Simulate pipeline stages
    setTimeout(() => setStatus('transforming'), 1500);
    setTimeout(() => setStatus('loading'), 3500);
    setTimeout(() => setStatus('done'), 5000);
  };

  const reset = () => {
    setStatus('idle');
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Factory className="text-blue-500" />
          The Data Factory
        </h2>
        <p className="text-slate-400 leading-relaxed">
          Imagine a furniture factory. It takes <strong>Raw Materials</strong> (logs), processes them through 
          <strong> Machines</strong> (cutting, sanding), and ships <strong>Finished Products</strong> (chairs) to a warehouse.
          <br/><br/>
          <strong>ETL</strong> works the same way:
        </p>
        <ul className="list-disc list-inside text-slate-300 ml-4 space-y-1">
          <li><span className="text-data-raw font-mono font-bold">Extract:</span> Getting raw data from sources.</li>
          <li><span className="text-process-orange font-mono font-bold">Transform:</span> Cleaning and formatting the data.</li>
          <li><span className="text-data-clean font-mono font-bold">Load:</span> Storing it for analysis.</li>
        </ul>
      </div>

      <div className="flex-1 bg-slate-900 rounded-lg border border-slate-700 p-8 relative overflow-hidden flex flex-col justify-center items-center">
        
        {/* Background Pipes */}
        <div className="absolute top-1/2 left-0 w-full h-4 bg-slate-800 -translate-y-1/2 z-0"></div>

        {/* Zones */}
        <div className="relative z-10 w-full flex justify-between items-center max-w-3xl">
          
          {/* Source Zone */}
          <div className="flex flex-col items-center gap-4">
            <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center bg-slate-800 transition-colors duration-500 ${status === 'extracting' ? 'border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)]' : 'border-slate-600'}`}>
               <Box className={`w-10 h-10 ${status === 'extracting' ? 'text-orange-500 animate-bounce' : 'text-slate-500'}`} />
            </div>
            <span className="text-sm font-bold text-slate-400">SOURCE</span>
          </div>

          {/* Processing Zone */}
          <div className="flex flex-col items-center gap-4">
            <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center bg-slate-800 transition-colors duration-500 ${status === 'transforming' ? 'border-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'border-slate-600'}`}>
               <Cog className={`w-12 h-12 ${status === 'transforming' ? 'text-blue-500 animate-spin' : 'text-slate-500'}`} />
            </div>
            <span className="text-sm font-bold text-slate-400">TRANSFORM</span>
          </div>

          {/* Destination Zone */}
          <div className="flex flex-col items-center gap-4">
            <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center bg-slate-800 transition-colors duration-500 ${status === 'loading' || status === 'done' ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'border-slate-600'}`}>
               <PackageCheck className={`w-10 h-10 ${status === 'done' ? 'text-green-500' : 'text-slate-500'}`} />
            </div>
            <span className="text-sm font-bold text-slate-400">DESTINATION</span>
          </div>
        </div>

        {/* Moving Data Block Animation */}
        {status !== 'idle' && status !== 'done' && (
           <div 
             className={`absolute top-1/2 -mt-6 w-12 h-12 z-20 transition-all duration-[2000ms] ease-linear
               ${status === 'extracting' ? 'left-[15%] bg-slate-600 rotate-12 scale-90 rounded-sm' : ''}
               ${status === 'transforming' ? 'left-[50%] -translate-x-1/2 bg-process-orange rotate-180 scale-110 rounded-md' : ''}
               ${status === 'loading' ? 'left-[85%] bg-blue-500 rotate-0 scale-100 rounded-lg' : ''}
               flex items-center justify-center shadow-lg
             `}
           >
             <span className="text-[10px] font-bold text-white">DATA</span>
           </div>
        )}

      </div>

      <div className="flex justify-center">
        {status === 'idle' || status === 'done' ? (
          <button
            onClick={runPipeline}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all active:scale-95"
          >
            {status === 'done' ? <RotateCcw className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{status === 'done' ? 'Reset Pipeline' : 'Run Pipeline Job'}</span>
          </button>
        ) : (
          <div className="px-8 py-4 bg-slate-800 text-slate-400 font-bold rounded-lg border border-slate-600 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            Processing...
          </div>
        )}
      </div>
    </div>
  );
};

export default BigPictureTab;