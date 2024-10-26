import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { QuizEntry } from '../types/quiz';

type EntryListProps = {
  entries: QuizEntry[];
  type: 'success' | 'errors';
  onUpdateConcept?: (timestamp: number, newConcept: string, type: 'success' | 'errors') => void;
};

export function EntryList({ entries, type, onUpdateConcept }: EntryListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedConcept, setEditedConcept] = useState('');
  
  const borderColor = type === 'success' ? 'border-green-500' : 'border-red-500';
  const answerColor = type === 'success' ? 'text-green-600' : 'text-red-600';

  const handleEdit = (entry: QuizEntry) => {
    setEditingId(entry.timestamp);
    setEditedConcept(entry.concept);
  };

  const handleSave = (timestamp: number) => {
    if (onUpdateConcept && editedConcept.trim()) {
      onUpdateConcept(timestamp, editedConcept, type);
    }
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedConcept('');
  };

  if (entries.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No {type === 'success' ? 'correct' : 'incorrect'} answers yet
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.timestamp}
          className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${borderColor}`}
        >
          <h3 className="font-medium text-gray-900 mb-2">Question: {entry.question}</h3>
          <div className="bg-gray-50 rounded-lg p-4 mb-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-700">Concept:</h4>
              {editingId !== entry.timestamp && (
                <button
                  onClick={() => handleEdit(entry)}
                  className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
              )}
            </div>
            {editingId === entry.timestamp ? (
              <div className="space-y-2">
                <textarea
                  value={editedConcept}
                  onChange={(e) => setEditedConcept(e.target.value)}
                  className="w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2"
                  rows={3}
                  autoFocus
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleSave(entry.timestamp)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600 mt-1">{entry.concept}</p>
            )}
          </div>
          <p className="text-sm text-gray-600">Your Answer: {entry.userAnswer}</p>
          <p className={`text-sm ${answerColor}`}>Correct Answer: {entry.correctAnswer}</p>
          <p className="text-xs text-gray-400 mt-2">
            {new Date(entry.timestamp).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}