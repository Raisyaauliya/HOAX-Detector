import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TestInstructions() {
  const [isOpen, setIsOpen] = useState(false);

  const testCases = [
    { label: "Valid Example", text: "Pemerintah luncurkan program bantuan sosial baru untuk UMKM tahun 2024." },
    { label: "Hoax Example", text: "Minum air garam panas di pagi hari dapat membunuh semua virus dalam tubuh secara instan." }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors mb-2 ml-1 focus:outline-none"
      >
        <Info size={16} />
        Testing Instructions & Examples
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-panel rounded-xl p-5 text-white/80 text-sm space-y-4">
              <p>
                To test the detection system, copy one of the examples below or enter your own news headline.
                The system analyzes linguistic patterns and known misinformation markers.
              </p>
              
              <div className="grid gap-3 md:grid-cols-2">
                {testCases.map((tc, idx) => (
                  <div key={idx} className="bg-black/20 rounded-lg p-3 border border-white/5">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-xs font-bold uppercase ${idx === 0 ? "text-emerald-300" : "text-red-300"}`}>
                        {tc.label}
                      </span>
                      <button 
                        onClick={() => handleCopy(tc.text)}
                        className="text-white/40 hover:text-white transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                    <p className="text-white/90 italic">"{tc.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
