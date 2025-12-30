import React, { useState } from 'react';
import { Database, Cloud, FileText, ArrowRight, Save } from 'lucide-react';

interface ExtractedItem {
  id: number;
  type: 'db' | 'api' | 'csv';
  icon: React.ElementType;
  label: string;
}

const ExtractTab: React.FC = () => {
  const [items, setItems] = useState<ExtractedItem[]>([]);
  const [animatingItem, setAnimatingItem] = useState<string | null>(null);

  const extractData = (type: 'db' | 'api' | 'csv') => {
    setAnimatingItem(type);
    
    // Animation delay
    setTimeout(() => {
      const newItem: ExtractedItem = {
        id: Date.now(),
        type,
        icon: type === 'db' ? Database : type === 'api' ? Cloud : FileText,
        label: type === 'db' ? 'SQL Row' : type === 'api' ? 'JSON' : 'CSV Line'
      };
      setItems(prev => [...prev, newItem]);
      setAnimatingItem(null);
    }, 600);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Database className="text-orange-500" />
          E - Extract
        </h2>
        <p className="text-slate-400">
          Data lives everywhere. The first step is gathering it into a common <strong>Staging Area</strong>.
          Notice how each source provides a different "shape" of data.
        </p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Sources Column */}
        <div className="flex-1 flex flex-col justify-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
          <h3 className="text-center font-bold text-slate-300 mb-2">DATA SOURCES</h3>
          
          <button 
            onClick={() => extractData('db')}
            disabled={!!animatingItem}
            className="flex items-center gap-4 p-4 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg transition-all active:scale-95 group relative overflow-hidden"
          >
            <div className="p-2 bg-blue-900/50 rounded-lg text-blue-400">
              <Database className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-bold text-white">MySQL Database</div>
              <div className="text-xs text-slate-400">Structured Rows</div>
            </div>
            {animatingItem === 'db' && (
              <div className="absolute right-4 w-6 h-6 bg-blue-500 rounded animate-ping opacity-75"></div>
            )}
          </button>

          <button 
            onClick={() => extractData('api')}
            disabled={!!animatingItem}
            className="flex items-center gap-4 p-4 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg transition-all active:scale-95 group relative overflow-hidden"
          >
            <div className="p-2 bg-purple-900/50 rounded-lg text-purple-400">
              <Cloud className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-bold text-white">Salesforce API</div>
              <div className="text-xs text-slate-400">Nested JSON</div>
            </div>
            {animatingItem === 'api' && (
              <div className="absolute right-4 w-6 h-6 bg-purple-500 rounded animate-ping opacity-75"></div>
            )}
          </button>

          <button 
            onClick={() => extractData('csv')}
            disabled={!!animatingItem}
            className="flex items-center gap-4 p-4 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg transition-all active:scale-95 group relative overflow-hidden"
          >
            <div className="p-2 bg-green-900/50 rounded-lg text-green-400">
              <FileText className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-bold text-white">Legacy CSV</div>
              <div className="text-xs text-slate-400">Comma Separated</div>
            </div>
            {animatingItem === 'csv' && (
              <div className="absolute right-4 w-6 h-6 bg-green-500 rounded animate-ping opacity-75"></div>
            )}
          </button>
        </div>

        {/* Animation Zone (Connector) */}
        <div className="hidden lg:flex flex-col justify-center items-center w-24">
          <div className="h-full w-1 bg-gradient-to-b from-slate-700 via-blue-500/20 to-slate-700 relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-slate-900 border border-slate-600 rounded-full">
               <ArrowRight className="text-slate-500" />
             </div>
          </div>
        </div>

        {/* Staging Area */}
        <div className="flex-1 bg-slate-900 rounded-xl border-2 border-dashed border-slate-600 p-6 flex flex-col relative overflow-hidden min-h-[300px]">
          <div className="absolute top-0 left-0 w-full h-8 bg-slate-800/80 backdrop-blur flex items-center justify-center border-b border-slate-700 z-10">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Save className="w-3 h-3" /> Staging Bucket
            </span>
          </div>

          <div className="mt-8 grid grid-cols-4 gap-2 content-start overflow-y-auto max-h-[400px] code-scroll">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="animate-[fade-in-up_0.3s_ease-out]">
                   <div className={`aspect-square rounded flex flex-col items-center justify-center p-2 gap-1
                     ${item.type === 'db' ? 'bg-blue-900/30 border border-blue-800' : ''}
                     ${item.type === 'api' ? 'bg-purple-900/30 border border-purple-800' : ''}
                     ${item.type === 'csv' ? 'bg-green-900/30 border border-green-800' : ''}
                   `}>
                     <Icon className="w-5 h-5 opacity-80" />
                     <span className="text-[10px] opacity-60 text-center leading-none">{item.label}</span>
                   </div>
                </div>
              );
            })}
            
            {items.length === 0 && (
              <div className="col-span-4 h-48 flex items-center justify-center text-slate-600 text-sm italic">
                Bucket is empty. Extract data to fill.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExtractTab;