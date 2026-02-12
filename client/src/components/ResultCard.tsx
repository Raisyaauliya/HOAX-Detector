import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Percent } from "lucide-react";
import type { AnalyzeResponse } from "@shared/schema";

interface ResultCardProps {
  result: AnalyzeResponse | null;
  isLoading: boolean;
}

export function ResultCard({ result, isLoading }: ResultCardProps) {
  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-2xl p-8 text-center mt-8"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
          <p className="text-white/90 font-medium text-lg">Analyzing content patterns...</p>
        </div>
      </motion.div>
    );
  }

  if (!result) return null;

  const isHoax = result.result === "HOAKS";
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative overflow-hidden rounded-3xl p-8 mt-8 border shadow-2xl backdrop-blur-md transition-all duration-500 ${
        isHoax 
          ? "bg-red-500/20 border-red-500/30 shadow-red-500/10" 
          : "bg-emerald-500/20 border-emerald-500/30 shadow-emerald-500/10"
      }`}
    >
      <div className="absolute top-0 right-0 p-32 opacity-10 bg-gradient-to-br from-white to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className={`p-4 rounded-2xl ${isHoax ? "bg-red-500 text-white" : "bg-emerald-500 text-white"} shadow-lg`}>
            {isHoax ? <AlertTriangle size={40} /> : <CheckCircle size={40} />}
          </div>
          
          <div className="text-left">
            <h3 className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-1">Detection Result</h3>
            <div className={`text-4xl md:text-5xl font-bold ${isHoax ? "text-red-100" : "text-emerald-100"}`}>
              {isHoax ? "STOP! HOAX" : "VALID CONTENT"}
            </div>
            <p className="text-white/80 mt-2 max-w-md">
              {isHoax 
                ? "Our AI has detected high probability of misinformation patterns in this text." 
                : "This content aligns with verified information patterns and appears authentic."}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center min-w-[140px] bg-white/10 rounded-2xl p-6 border border-white/10">
          <Percent className="text-white/40 mb-2" size={20} />
          <span className="text-4xl font-bold text-white tabular-nums">
            {(result.confidence * 100).toFixed(1)}%
          </span>
          <span className="text-white/50 text-xs font-medium uppercase tracking-widest mt-1">Confidence</span>
        </div>
      </div>
    </motion.div>
  );
}
