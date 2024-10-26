import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { TabType } from '../types/quiz';

type TabBarProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  successCount: number;
  errorCount: number;
};

export function TabBar({ activeTab, onTabChange, successCount, errorCount }: TabBarProps) {
  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => onTabChange('form')}
        className={`px-4 py-2 rounded-lg font-medium ${
          activeTab === 'form'
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        New Question
      </button>
      <button
        onClick={() => onTabChange('success')}
        className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
          activeTab === 'success'
            ? 'bg-green-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <CheckCircle2 className="w-4 h-4" />
        Correct ({successCount})
      </button>
      <button
        onClick={() => onTabChange('errors')}
        className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
          activeTab === 'errors'
            ? 'bg-red-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <XCircle className="w-4 h-4" />
        Incorrect ({errorCount})
      </button>
    </div>
  );
}