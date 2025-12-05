import AppSheet from "@/components/app-sheet";
import { Button } from "@/components/ui/button";
import ProductForm from "../components/products/product-form";
import TableProducts, { type paginationSchema } from "../components/products/product-table";
import { useEffect, useState } from "react";
import PaginationProducts from "../components/products/pagination-products";
import { useCategories } from "@/providers/categories-provider";
import fetchProducts from "@/helpers/fetching";
import axios from "axios";
import type { supplierSchema } from "@/components/suppliers/suppliers-table";
import { useOutletContext } from "react-router-dom";

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const { categories } = useCategories()
  const { role } = useOutletContext<{role: string }>();
  const [suppliers, setSuppliers] = useState<supplierSchema[] | null>(null)
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1)
  const [categoria, setCategoria] = useState<string | null >(null);
  const [proveedor, setProveedor] = useState<string | null>(null);
  const [estado, setEstado] = useState<'ACTIVE' | 'DRAFT' | 'DISCONTINUED' | '-1' | null>(null);
  const [limit, setLimit] = useState(10);
  const [paginationProducts, setPaginationProducts] = useState({} as paginationSchema);

  useEffect(() => {
    const fetchingSuppliers = async () => {
      const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/suppliers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token-woow")}`,
          }}
        );
      setSuppliers(data.data)
    };
    fetchingSuppliers()
    
  },[])

  useEffect(() => {
    const fetching = async () => {
      const productsFetch = await fetchProducts({page: 1, limit, category: categoria, supplier: proveedor, status: estado});
      setProducts(productsFetch.data)
      setPaginationProducts(productsFetch.meta)
    };
    fetching();
  }, [limit, categoria, proveedor, estado]);

  useEffect(() => {
    const fetching = async () => {
      const productsFetch = await fetchProducts({page: page, limit, category: categoria, supplier: proveedor, status: estado});
      setProducts(productsFetch.data)
      setPaginationProducts(productsFetch.meta)
    };
    fetching();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, refresh]);

  return (
    <div className="w-full">
      {role !== import.meta.env.VITE_ROLE_VIEW && <AppSheet
        open={open}
        setOpen={setOpen}
        trigger={<Button className="absolute right-2 top-2">Nuevo producto</Button>}
        title="Cargar producto"
        description="Complete el formulario para cargar un nuevo producto."
        children={<ProductForm onClose={() => setOpen(false)} categories={categories} suppliers={suppliers} refresh={() => setRefresh(!refresh)}/>}
      />}
      <h2 className="p-4 text-xl font-medium">Lista de productos</h2>
      <div className="px-4 flex flex-col md:flex-row gap-3">
        <p>Filtrar por:</p>
        <div>
          <div className="flex flex-wrap gap-3">
            <label className="relative">
              <span className="absolute -top-3 left-2 bg-background px-1">Categoría</span>
              <select
                className="border px-2 py-1 rounded min-w-[40dvw] md:min-w-44"
                value={categoria as string}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option className="bg-background text-foreground" value="-1" >Sin filtrar</option>
                {categories?.map((category) => (
                  <option className="bg-background text-foreground" key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </label>
            
            <label className="relative">
              <span className="absolute -top-3 left-2 bg-background px-1">Proveedor</span>
              <select
                className="border px-2 py-1 rounded min-w-[40dvw] md:min-w-44"
                value={proveedor as string}
                onChange={(e) => setProveedor(e.target.value)}
                >
                <option className="bg-background text-foreground" value="-1">Sin filtrar</option>
                {suppliers?.map((supplier) => (
                  <option className="bg-background text-foreground" key={supplier.id} value={supplier.name}>{supplier.name}</option>
                ))}
              </select>
            </label>

            <label className="relative">
              <span className="absolute -top-3 left-2 bg-background px-1">Estado</span>
              <select
                className="border px-2 py-1 rounded min-w-[40dvw] md:min-w-44"
                value={estado as 'ACTIVE' | 'DRAFT' | 'DISCONTINUED' | '-1'}
                onChange={(e) => setEstado(e.target.value as 'ACTIVE' | 'DRAFT' | 'DISCONTINUED' | '-1')}
              >
                <option className="bg-background text-foreground" value="-1">Sin filtrar</option>
                <option className="bg-background text-foreground" value="ACTIVE">Activo</option>
                <option className="bg-background text-foreground" value="DRAFT">Borrador</option>
                <option className="bg-background text-foreground" value="DISCONTINUED">Discontinuado</option>
              </select>
            </label>
            
            <label className="relative">
              <span className="absolute -top-3 left-2 bg-background px-1">Mostrar</span>
            
              <select
                className="border px-2 py-1 rounded min-w-[40dvw] md:min-w-44"
                value={limit}
                onChange={(e) => setLimit(+e.target.value)}
              >
                <option className="bg-background text-foreground" value={10}>10</option>
                <option className="bg-background text-foreground" value={20}>20</option>
                <option className="bg-background text-foreground" value={30}>30</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <TableProducts products={products} categories={categories} suppliers={suppliers} refresh={() => setRefresh(!refresh)}/>
      {paginationProducts?.total && (
        <PaginationProducts
          pagination={paginationProducts} 
          limit={limit}
          setPage={setPage}
          fetchProducts={fetchProducts} 
          category={categoria}
          supplier={proveedor}
          status={estado}
        />
      )}
    </div>
  );
}
