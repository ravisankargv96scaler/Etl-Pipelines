import React, { useState } from 'react';
import { TabId } from './types';
import { Factory, Database, Filter, Upload, Network, BookOpen } from 'lucide-react';

// Components
import BigPictureTab from './components/BigPictureTab';
import ExtractTab from './components/ExtractTab';
import TransformTab from './components/TransformTab';
import LoadTab from './components/LoadTab';
import EtlVsEltTab from './components/EtlVsEltTab';
import QuizTab from './components/QuizTab';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>(TabId.BIG_PICTURE);

  const renderContent = () => {
    switch (activeTab) {
      case TabId.BIG_PICTURE: return <BigPictureTab />;
      case TabId.EXTRACT: return <ExtractTab />;
      case TabId.TRANSFORM: return <TransformTab />;
      case TabId.LOAD: return <LoadTab />;
      case TabId.ETL_VS_ELT: return <EtlVsEltTab />;
      case TabId.QUIZ: return <QuizTab />;
      default: return <BigPictureTab />;
    }
  };

  const tabs = [
    { id: TabId.BIG_PICTURE, label: 'The Big Picture', icon: Factory },
    { id: TabId.EXTRACT, label: 'Extract', icon: Database },
    { id: TabId.TRANSFORM, label: 'Transform', icon: Filter },
    { id: TabId.LOAD, label: 'Load', icon: Upload },
    { id: TabId.ETL_VS_ELT, label: 'ETL vs ELT', icon: Network },
    { id: TabId.QUIZ, label: 'Quiz', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-industrial-dark text-slate-200 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Network className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white">Pipeline Academy</h1>
            </div>
            <div className="text-sm text-slate-400 hidden sm:block">
              Interactive ETL Learning Module
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* Navigation Sidebar/Top Bar */}
        <nav className="lg:w-64 flex-shrink-0">
          <div className="bg-industrial-panel rounded-xl shadow-lg border border-slate-700 overflow-hidden sticky top-24">
            <div className="p-4 border-b border-slate-700">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Modules</h2>
            </div>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap lg:whitespace-normal
                      ${isActive 
                        ? 'bg-blue-600/20 text-blue-400 border-l-4 border-blue-500' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
                      }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Content Panel */}
        <div className="flex-1 bg-industrial-panel rounded-xl shadow-lg border border-slate-700 p-6 min-h-[600px]">
          {renderContent()}
        </div>

      </main>
    </div>
  );
};

export default App;