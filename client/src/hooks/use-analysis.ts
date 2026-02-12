import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type AnalyzeRequest } from "@shared/routes";

// POST /api/analyze
export function useAnalyze() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AnalyzeRequest) => {
      // Input validation using Zod
      const validated = api.analysis.analyze.input.parse(data);
      
      const res = await fetch(api.analysis.analyze.path, {
        method: api.analysis.analyze.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.analysis.analyze.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Analysis failed");
      }

      return api.analysis.analyze.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      // Invalidate history to show new entry
      queryClient.invalidateQueries({ queryKey: [api.analysis.history.path] });
    },
  });
}

// GET /api/history
export function useHistory() {
  return useQuery({
    queryKey: [api.analysis.history.path],
    queryFn: async () => {
      const res = await fetch(api.analysis.history.path);
      if (!res.ok) throw new Error("Failed to fetch history");
      return api.analysis.history.responses[200].parse(await res.json());
    },
  });
}

// DELETE /api/history (clear)
export function useClearHistory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.analysis.clear.path, {
        method: api.analysis.clear.method,
      });
      if (!res.ok) throw new Error("Failed to clear history");
    },
    onSuccess: () => {
      queryClient.setQueryData([api.analysis.history.path], []);
    },
  });
}
