import { createContext, useContext, useState, ReactNode } from "react";

interface FilterValue {
  [key: string]: any;
}

interface DashboardFiltersContextType {
  filters: FilterValue;
  setFilter: (filterId: string, value: any) => void;
  clearFilters: () => void;
}

const DashboardFiltersContext = createContext<DashboardFiltersContextType | undefined>(
  undefined
);

export function DashboardFiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterValue>({});

  const setFilter = (filterId: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <DashboardFiltersContext.Provider value={{ filters, setFilter, clearFilters }}>
      {children}
    </DashboardFiltersContext.Provider>
  );
}

export function useDashboardFilters() {
  const context = useContext(DashboardFiltersContext);
  if (!context) {
    throw new Error("useDashboardFilters must be used within DashboardFiltersProvider");
  }
  return context;
}
