import { motion, AnimatePresence } from "framer-motion";
import { Clock, Trash2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useHistory, useClearHistory } from "@/hooks/use-analysis";
import { format } from "date-fns";

export function HistoryList() {
  const { data: history, isLoading } = useHistory();
  const { mutate: clearHistory, isPending: isClearing } = useClearHistory();

  if (isLoading) return <div className="text-white/50 text-center py-8">Loading history...</div>;
  if (!history || history.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="text-white text-xl font-display font-semibold flex items-center gap-2">
          <Clock className="text-white/60" size={20} />
          Recent Analysis
        </h3>
        
        <button
          onClick={() => clearHistory()}
          disabled={isClearing}
          className="text-white/40 hover:text-white/90 text-sm flex items-center gap-1.5 transition-colors disabled:opacity-50"
        >
          <Trash2 size={14} />
          Clear History
        </button>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {history.map((item, index) => {
            const isHoax = item.result === "HOAKS";
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-panel p-4 rounded-xl flex items-center justify-between group hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-white/90 truncate font-medium">{item.text}</p>
                  <p className="text-white/40 text-xs mt-1">
                    {item.createdAt ? format(new Date(item.createdAt), 'MMM d, yyyy • h:mm a') : 'Just now'}
                  </p>
                </div>
                
                <div className={`flex items-center gap-3 px-3 py-1.5 rounded-lg border ${
                  isHoax 
                    ? "bg-red-500/20 border-red-500/30 text-red-100" 
                    : "bg-emerald-500/20 border-emerald-500/30 text-emerald-100"
                }`}>
                  {isHoax ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
                  <span className="font-bold text-sm tracking-wide">{item.result}</span>
                  <span className="text-xs opacity-70 border-l border-white/20 pl-2 ml-1">
                    {Math.round(item.confidence * 100)}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
