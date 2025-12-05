import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductForm from "./product-form";
import { useState } from "react";
import { Edit } from "lucide-react";
import type { categorySchema } from "@/providers/categories-provider";
import type { supplierSchema } from "../suppliers/suppliers-table";
import ProductStock from "./product-stock";
import DeleteItem from "../delete-item";
import { useOutletContext } from "react-router-dom";

export default function TableProducts({products, categories, suppliers, refresh}:{products: productSchema[], categories: categorySchema[] | null , suppliers: supplierSchema[] | null ,refresh: () => void}) {
  const { role } = useOutletContext<{role: string }>();
  const [productSelected, setProductSelected] = useState<productSchema | null>(null);
  const [modifiedStock, setModifiedStock] = useState<productSchema | null>(null);
  
  const handleEdit = (product: productSchema | null) => {
    setProductSelected(product)
    setModifiedStock(null)
  };

  const handleStock = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>, product: productSchema) => {
    e.stopPropagation();
    setModifiedStock(product)
    //const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${product.id}`)
    //console.log(response);
    //  refresh();
    
  }


  return (
    <div className="p-4">
      <Table>
        <TableCaption>Lista de productos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SKU</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Proveedor</TableHead>
            <TableHead>Stock mín</TableHead>
            <TableHead className="text-right">Stock</TableHead>
            {role !== import.meta.env.VITE_ROLE_VIEW && <TableHead className="text-right">Eliminar</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} onClick={() => handleEdit(product)}>
              <TableCell className="font-medium">{product.sku}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.categories?.name}</TableCell>
              <TableCell>{product.suppliers?.name}</TableCell>
              <TableCell>{product.min_stock}</TableCell>
              <TableCell className="">
                <span className="flex items-center justify-end gap-2">
                  {product.current_stock}
                  {role !== import.meta.env.VITE_ROLE_VIEW && <Edit onClick={(e) => handleStock(e, product)} className="size-6 stroke-[1.4]"/>}
                </span>
              </TableCell>
              {role !== import.meta.env.VITE_ROLE_VIEW && <DeleteItem classnames="flex items-center justify-end" item={product} refresh={refresh} route="products" />}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {modifiedStock && role !== import.meta.env.VITE_ROLE_VIEW && <div onClick={() => handleEdit(null)} className="z-10 bg-background/50 backdrop-blur-sm fixed inset-0 flex items-center justify-center">
        <div onClick={(e) => e.stopPropagation()} className="m-auto p-2 bg-background border border-foreground rounded-xl">
          <header className="px-4 pb-3">
            <h4 className="font-bold">Edición del stock</h4>
            <span className="text-blue-500">{modifiedStock.name}</span>
          </header>
          <ProductStock product={modifiedStock} refresh={refresh} setModifiedStock={() => setModifiedStock(null)}/>
        </div>
      </div>}
      {productSelected && role !== import.meta.env.VITE_ROLE_VIEW && <div onClick={() => handleEdit(null)} className="z-10 bg-background/50 backdrop-blur-sm fixed inset-0 flex items-center justify-center">
        <div onClick={(e) => e.stopPropagation()} className="m-auto p-2 bg-background border border-foreground rounded-xl">
          <header className="px-4 pb-3">
            <h4 className="font-bold">Edición del producto</h4>
            <span className="text-blue-500">{productSelected.name}</span>
          </header>
          <ProductForm product={productSelected} categories={categories} suppliers={suppliers} refresh={refresh} setProductSelected={() => setProductSelected(null)}/>
        </div>
      </div>}
    </div>
  );
}


export interface paginationSchema {
  lastPage: number;
  page: number;
  total: number
}

export interface productSchema {
  id?: string;
  name: string;
  sku: string;
  price: number;
  current_stock: number;
  min_stock: number;
  status: "ACTIVE" | "DRAFT" | "DISCONTINUED";
  supplier_id?: string;
  category_id?: string;
  description?: string;
  categories?: {
    name: string
  },
  suppliers?: {
    name: string
  }
}