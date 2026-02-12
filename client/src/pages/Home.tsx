import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Search, Sparkles, ShieldCheck } from "lucide-react";
import { api } from "@shared/routes";

import { useAnalyze } from "@/hooks/use-analysis";
import { ResultCard } from "@/components/ResultCard";
import { HistoryList } from "@/components/HistoryList";
import { TestInstructions } from "@/components/TestInstructions";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

// Use the exact schema from routes
const formSchema = api.analysis.analyze.input;
type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const [lastResult, setLastResult] = useState<any>(null);
  const { toast } = useToast();
  
  const { mutate: analyze, isPending } = useAnalyze();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (data: FormData) => {
    analyze(data, {
      onSuccess: (result) => {
        setLastResult(result);
        form.reset(); // Optional: clear input after search
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-4 backdrop-blur-sm border border-white/20 shadow-lg">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight drop-shadow-md">
            Deteksi Hoaks AI
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light">
            Hybrid Hoax Detection System utilizing advanced natural language processing to identify misinformation in real-time.
          </p>
        </motion.div>

        {/* Main Interface */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-[25px] p-6 md:p-10 shadow-2xl"
        >
          <TestInstructions />

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative group">
              <textarea
                {...form.register("text")}
                placeholder="Paste news headline or text here to analyze..."
                className="w-full glass-input h-40 rounded-2xl p-6 text-lg resize-none transition-all duration-300 shadow-inner focus:ring-4 focus:ring-purple-500/20"
                disabled={isPending}
              />
              <Search className="absolute right-6 top-6 text-white/30 pointer-events-none" size={24} />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isPending || !form.watch("text")}
                className="
                  group relative px-8 py-4 rounded-xl font-bold text-white text-lg
                  bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e]
                  shadow-lg shadow-red-500/30
                  hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 hover:scale-[1.02]
                  active:translate-y-0 active:scale-[0.98]
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                  transition-all duration-300 ease-out overflow-hidden
                "
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isPending ? "Analyzing..." : "Check Hoax"}
                  {!isPending && <Sparkles size={20} className="group-hover:animate-pulse" />}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </div>
          </form>

          <ResultCard result={lastResult} isLoading={isPending} />
          
          <HistoryList />
        </motion.div>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center text-white/40 text-sm font-medium"
        >
          <p>Universitas Siber Asia 2026 &copy; All Rights Reserved</p>
        </motion.footer>
      </div>
      <Toaster />
    </div>
  );
}
