import React, { useState } from 'react';
import { CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '../types';

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Which stage involves cleaning data and standardizing formats?",
    options: ["Extract", "Transform", "Load", "Staging"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "In modern ELT pipelines, where does the transformation typically happen?",
    options: ["Before loading", "In the source database", "In the destination Data Warehouse", "In the API"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What is the temporary storage location between Extract and Transform often called?",
    options: ["The Data Lake", "Staging Area", "The Archive", "Production"],
    correctAnswer: 1
  }
];

const QuizTab: React.FC = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === QUESTIONS[currentQuestionIdx].correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIdx < QUESTIONS.length - 1) {
        setCurrentQuestionIdx(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (showResults) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-6 text-center animate-[fade-in-up_0.5s_ease-out]">
        <Award className={`w-24 h-24 ${score === QUESTIONS.length ? 'text-yellow-400' : 'text-blue-500'}`} />
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
          <p className="text-slate-400 text-lg">You scored {score} out of {QUESTIONS.length}</p>
        </div>
        
        <div className="p-6 bg-slate-800 rounded-xl border border-slate-700 max-w-sm w-full">
          {score === QUESTIONS.length ? (
            <p className="text-green-400 font-bold">Perfect Score! You're a Data Engineer!</p>
          ) : score > 0 ? (
            <p className="text-blue-400">Good job! Review the tabs to get 100%.</p>
          ) : (
             <p className="text-slate-400">Give it another try!</p>
          )}
        </div>

        <button 
          onClick={resetQuiz}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>
      </div>
    );
  }

  const currentQ = QUESTIONS[currentQuestionIdx];

  return (
    <div className="h-full max-w-2xl mx-auto flex flex-col justify-center">
      <div className="mb-8 flex justify-between items-center text-sm text-slate-500 uppercase tracking-wider font-bold">
        <span>Question {currentQuestionIdx + 1} of {QUESTIONS.length}</span>
        <span>Score: {score}</span>
      </div>

      <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 shadow-xl relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 bg-slate-800 w-full">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((currentQuestionIdx + 1) / QUESTIONS.length) * 100}%` }}
          ></div>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white mb-8">{currentQ.question}</h3>

        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            let btnClass = "w-full p-4 rounded-lg border text-left transition-all duration-200 flex justify-between items-center group ";
            
            if (isAnswered) {
              if (idx === currentQ.correctAnswer) {
                btnClass += "bg-green-900/30 border-green-500 text-green-200";
              } else if (idx === selectedOption) {
                btnClass += "bg-red-900/30 border-red-500 text-red-200";
              } else {
                btnClass += "bg-slate-800 border-slate-700 opacity-50";
              }
            } else {
              btnClass += "bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-blue-500 text-slate-200";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={isAnswered}
                className={btnClass}
              >
                <span className="font-medium">{option}</span>
                {isAnswered && idx === currentQ.correctAnswer && <CheckCircle className="text-green-500 w-5 h-5" />}
                {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswer && <XCircle className="text-red-500 w-5 h-5" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizTab;