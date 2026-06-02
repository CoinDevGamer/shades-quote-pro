import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { defaultQuote, type QuoteState } from "@/lib/quote-types";

export interface RecentExport {
  ref: string;
  name: string;
  total: number;
  at: number;
}

interface QuoteContextValue {
  quote: QuoteState;
  setQuote: React.Dispatch<React.SetStateAction<QuoteState>>;
  resetQuote: () => void;
  recent: RecentExport[];
  addRecent: (r: RecentExport) => void;
}

const Ctx = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [quote, setQuote] = useState<QuoteState>(() => defaultQuote());
  const [recent, setRecent] = useState<RecentExport[]>([]);

  const value = useMemo<QuoteContextValue>(
    () => ({
      quote,
      setQuote,
      resetQuote: () => setQuote(defaultQuote()),
      recent,
      addRecent: (r) => setRecent((prev) => [r, ...prev].slice(0, 8)),
    }),
    [quote, recent],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useQuote() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useQuote must be used inside QuoteProvider");
  return v;
}
