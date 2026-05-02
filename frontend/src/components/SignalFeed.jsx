import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Pill, FileText, X, ChevronRight, Activity, Lock } from 'lucide-react';

export function SignalFeed({ signals }) {
  const [selectedSignal, setSelectedSignal] = useState(null);

  const highRiskSignals = signals.filter(s => s.is_adverse_event && s.confidence >= 0.7);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-start items-start h-full pb-4">
        <AnimatePresence>
          {highRiskSignals.map((signal, idx) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.15 }}
              className="glow-border-alert bg-white p-4 rounded-xl flex flex-col cursor-pointer hover:bg-slate-50 transition-colors shadow-sm"
              onClick={() => setSelectedSignal(signal)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-red-100 rounded-lg">
                    <ShieldAlert className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="font-semibold text-slate-800">
                    {signal.drug && signal.drug !== 'null' ? signal.drug : 'Unspecified Drug'}
                  </span>
                </div>
                <div className="px-2 py-1 bg-red-50 border border-red-200 rounded text-xs font-bold text-red-600">
                  {(signal.confidence * 100).toFixed(0)}% CONF
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-sm text-slate-500 mb-2">
                  <span className="font-medium">Symptom:</span> <span className="text-orange-600 font-medium">{signal.symptom}</span>
                </p>
                <p className="text-xs text-slate-500 line-clamp-2 italic border-l-2 border-slate-200 pl-2">
                  "{signal.text}"
                </p>
                <div className="mt-3 bg-violet-50 p-2 rounded-lg border border-violet-100">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-violet-700 uppercase mb-1">
                    <FileText className="w-3 h-3" /> AI Reasoning
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {signal.explanation}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex flex-col gap-2">
                {signal.has_phi && (
                  <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-violet-600 bg-violet-50 w-fit px-2 py-1 rounded">
                    <Lock className="w-3 h-3" /> PII/PHI Redacted
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3">
                  <span>{new Date(signal.timestamp).toLocaleTimeString()} • {signal.source}</span>
                  <span className="flex items-center gap-1 text-violet-600 font-medium">
                    View Evidence <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          {highRiskSignals.length === 0 && (
            <div className="col-span-full h-full flex flex-col items-center justify-center text-slate-400 text-sm gap-2">
              <Activity className="w-8 h-8 opacity-50" />
              <p>No high-risk safety signals detected at this time.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Evidence Trail Modal */}
      <AnimatePresence>
        {selectedSignal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 max-w-2xl w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-violet-500"></div>
              
              <button 
                onClick={() => setSelectedSignal(null)}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <ShieldAlert className="w-6 h-6 text-red-500" />
                Evidence Trail
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 text-slate-500 mb-1 text-sm font-medium">
                      <Pill className="w-4 h-4" /> Suspected Drug
                    </div>
                    <div className="text-lg font-bold text-slate-800">
                      {selectedSignal.drug && selectedSignal.drug !== 'null' ? selectedSignal.drug : 'Unspecified Drug'}
                    </div>
                  </div>
                  <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                    <div className="flex items-center gap-2 text-orange-600 mb-1 text-sm font-medium">
                      <Activity className="w-4 h-4" /> Reported Symptom
                    </div>
                    <div className="text-lg font-bold text-orange-700">{selectedSignal.symptom}</div>
                  </div>
                </div>

                <div className="bg-violet-50/50 p-4 rounded-xl border border-violet-100">
                  <div className="flex items-center gap-2 text-violet-700 mb-2 text-sm font-medium">
                    <FileText className="w-4 h-4" /> AI Reasoning (Explainability)
                  </div>
                  <p className="text-slate-700 leading-relaxed text-sm">
                    {selectedSignal.explanation}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-violet-400 rounded-l-xl"></div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-violet-600 tracking-wider uppercase">Raw Source: {selectedSignal.source}</span>
                    <span className="text-xs text-slate-400">{new Date(selectedSignal.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-600 italic">"{selectedSignal.text}"</p>
                  
                  {selectedSignal.has_phi && (
                    <div className="mt-3 bg-red-50 text-red-700 p-2 rounded text-xs flex items-center gap-2 border border-red-100">
                      <Lock className="w-4 h-4 shrink-0" />
                      <strong>Compliance Note:</strong> PII/PHI was detected and masked by the vault before indexing.
                    </div>
                  )}
                  
                  <p className="mt-3 text-[10px] text-slate-400 font-mono">ID: {selectedSignal.id} | Author: @{selectedSignal.author}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
