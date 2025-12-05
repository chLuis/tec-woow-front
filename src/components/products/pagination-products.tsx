import { Button } from "@/components/ui/button";
import fetchProducts from "@/helpers/fetching";

interface PaginationProps {
  pagination: {
    page: number;
    lastPage: number;
    total: number;
  };
  setPage: (page: number) => void;
  limit: number;
  category: string | null;
  supplier: string | null;
  status: 'ACTIVE' | 'DRAFT' | 'DISCONTINUED' | '-1' | null;
  fetchProducts: (args: {page: number, limit: number, category?: string | null, supplier?: string | null, status?: 'ACTIVE' | 'DRAFT' | 'DISCONTINUED' | '-1' | null}) => void;
}

export default function PaginationProducts({ pagination, limit, setPage, category, supplier, status }: PaginationProps) {
  const { page, total, lastPage } = pagination;

  const goTo = (newPage: number) => {
    if (newPage < 1 || newPage > lastPage) return;
    setPage(newPage);
    fetchProducts({ page: newPage, limit, category: category, supplier: supplier, status: status});
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button
        variant="outline"
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
      >
        Anterior
      </Button>

      <span className="px-3 py-1 border rounded-md">
        Página {page} de {lastPage}
      </span>

      <Button
        variant="outline"
        onClick={() => goTo(page + 1)}
        disabled={page > total/limit}
      >
        Siguiente
      </Button>
    </div>
  );
}
