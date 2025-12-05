import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export interface categorySchema {
  id: number;
  name: string;
  description: string;
}

interface CategoriesContextProps {
  categories: categorySchema[] | null;
  loading: boolean;
  error: string | null;
}

const CategoriesContext = createContext<CategoriesContextProps>({
  categories: null,
  loading: true,
  error: null,
});

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<categorySchema[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token-woow")}`,
          }}
        );
        setCategories(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message ?? "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoriesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCategories = () => useContext(CategoriesContext);
