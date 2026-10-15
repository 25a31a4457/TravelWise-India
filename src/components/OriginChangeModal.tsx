import React from 'react';
import { AlertTriangle, RefreshCw, Trash2, X } from 'lucide-react';

interface OriginChangeModalProps {
  isOpen: boolean;
  previousOrigin: string;
  newOrigin: string;
  selectedCount: number;
  onKeepAndUpdate: () => void;
  onClearForNewCity: () => void;
  onCancel: () => void;
}

export const OriginChangeModal: React.FC<OriginChangeModalProps> = ({
  isOpen,
  previousOrigin,
  newOrigin,
  selectedCount,
  onKeepAndUpdate,
  onClearForNewCity,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative text-slate-800"
        role="dialog"
        aria-modal="true"
        aria-labelledby="origin-modal-title"
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 id="origin-modal-title" className="font-serif text-xl font-bold text-slate-900">
          Update Origin to {newOrigin}?
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          You currently have <strong>{selectedCount} place{selectedCount > 1 ? 's' : ''}</strong> selected in your plan with Origin set to <strong>{previousOrigin}</strong>. How would you like to handle your existing selections?
        </p>

        <div className="mt-6 space-y-3">
          <button
            onClick={onKeepAndUpdate}
            className="w-full p-4 rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/50 hover:bg-emerald-50 text-left transition-all flex items-start gap-3 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">
                Keep current selected places & update travel costs
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Retains all {selectedCount} places, recalculates transit times, road distances, and travel segments from {newOrigin}.
              </div>
            </div>
          </button>

          <button
            onClick={onClearForNewCity}
            className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-rose-50/60 hover:border-rose-300 text-left transition-all flex items-start gap-3 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 group-hover:bg-rose-100 group-hover:text-rose-700 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
              <Trash2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-rose-900">
                Clear current selections for new city
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Clears current places so you can discover and choose attractions tailored around {newOrigin}.
              </div>
            </div>
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Cancel & Keep {previousOrigin}
          </button>
        </div>
      </div>
    </div>
  );
};
