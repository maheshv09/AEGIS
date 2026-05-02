import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, MessageSquare, AlertCircle } from 'lucide-react';

export function LiveTicker({ signals }) {
  return (
    <div className="flex flex-col gap-3 h-full overflow-y-auto pr-2 custom-scrollbar">
      <AnimatePresence>
        {signals.map((signal, index) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-lg border flex gap-3 ${
              signal.is_adverse_event 
                ? 'bg-red-50 border-red-200' 
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="mt-1">
              {signal.source.toLowerCase() === 'x' ? (
                <Twitter className="w-5 h-5 text-sky-500" />
              ) : (
                <MessageSquare className="w-5 h-5 text-orange-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-semibold text-slate-600">@{signal.author}</span>
                <span className="text-[10px] text-slate-400">
                  {new Date(signal.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">
                {signal.text}
              </p>
              
              {signal.is_adverse_event && (
                <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded w-fit border border-red-200">
                  <AlertCircle className="w-3 h-3" />
                  Signal Detected
                </div>
              )}
              {signal.has_phi && (
                <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-violet-700 bg-violet-100 px-2 py-1 rounded w-fit border border-violet-200">
                  PHI Redacted
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {signals.length === 0 && (
          <div className="h-full flex items-center justify-center text-slate-400 text-sm">
            Listening to data streams...
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
