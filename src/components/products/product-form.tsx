import { Button } from "@/components/ui/button";
import { type categorySchema } from "@/providers/categories-provider";
import axios, { AxiosError } from "axios";
import type { supplierSchema } from "../suppliers/suppliers-table";
import { showToast } from "@/providers/toast-provider";
import { productoSchema } from "./product-schema";


interface productSchema {
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
}

export default function ProductForm({product, categories, suppliers, onClose, refresh, setProductSelected}: {product?: productSchema, categories: categorySchema[] | null, suppliers: supplierSchema[] | null , onClose?: () => void, refresh: () => void, setProductSelected?: () => void}) {
  

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);

    const producto = {
      name: formData.get("name"),
      sku: formData.get("sku"),
      price: parseFloat(formData.get("price") as string),
      current_stock: parseInt(formData.get("current_stock") as string),
      min_stock: parseInt(formData.get("min_stock") as string),
      status: formData.get("status"),
      supplier_id: formData.get("supplier_id"),
      category_id: parseInt(formData.get("category_id") as string),
      description: formData.get("description"),
    }

    const parsed = productoSchema.safeParse(producto);

  if (!parsed.success) {
    showToast({
      texto: parsed.error.issues[0].message,
      tipo: "error"
    });
    return;
  }
  
    try {
      const res = product 
        ? await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${product?.id}`, producto, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token-woow")}`,
          }}
        )
        : await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products/`, producto, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token-woow")}`,
          }}
        ) 
      console.log(res);
      refresh?.()
      onClose?.()
      if(product) setProductSelected?.()
        showToast({texto: product ? "Producto actualizado correctamente" : "Producto creado correctamente", tipo: "success"})
    }
    catch (err) {
      console.log(err);
      const error = err as AxiosError<{ message: string }>;
      showToast({ texto: error?.response?.data?.message || 'Ocurrió un error. Intente nuevamente.', tipo: 'error' })
    }
  }
  
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-2 gap-4 px-4 pb-4">
      <label className="group relative col-span-2 mb-2 text-sm font-medium">
        <span className="absolute text-foreground/60 group-focus-within:-top-3 group-[&:has(input:valid)]:-top-3 left-3 top-2 bg-background px-1 duration-300">Nombre del producto</span>
        <input type="text" defaultValue={product?.name} required name="name" className="w-full p-2 border border-gray-300 rounded" />
      </label>
      
      <label className="group relative col-span-2 mb-2 text-sm font-medium">
        <span className="absolute text-foreground/60 group-focus-within:-top-3 group-[&:has(input:valid)]:-top-3 left-3 top-2 bg-background px-1 duration-300">SKU</span>
        <input type="text" defaultValue={product?.sku} required name="sku" className="w-full p-2 border border-gray-300 rounded" />
      </label>
      
      <label className="group relative col-span-2 mb-2 text-sm font-medium">
        <span className="absolute text-foreground/60 group-focus-within:-top-3 group-[&:has(input:valid)]:-top-3 left-3 top-2 bg-background px-1 duration-300">Precio</span>
        <input type="number" defaultValue={product?.price} required name="price" min={1} className="w-full p-2 border border-gray-300 rounded" />
      </label>
      
      <label className="group relative col-span-1 mb-2 text-sm font-medium">
        <span className="absolute text-foreground/60 group-focus-within:-top-3 group-[&:has(input:valid)]:-top-3 left-3 top-2 bg-background px-1 duration-300">Stock</span>
        <input type="number" defaultValue={product?.current_stock} required name="current_stock" min={0} className="w-full p-2 border border-gray-300 rounded" />
      </label>

      <label className="group relative col-span-1 mb-2 text-sm font-medium">
        <span className="absolute text-foreground/60 group-focus-within:-top-3 group-[&:has(input:valid)]:-top-3 left-3 top-2 bg-background px-1 duration-300">Stock Mínimo</span>
        <input type="number" defaultValue={product?.min_stock} required name="min_stock" min={0} className="w-full p-2 border border-gray-300 rounded" />
      </label>

      <label className="group relative col-span-2 mb-2 text-sm font-medium">
        <span className="absolute text-foreground/60 -top-3 left-3 bg-background px-1 duration-300">Estado</span>
        <select name="status" required className="w-full p-2 border border-gray-300 rounded" defaultValue={product?.status || "ACTIVE"}>
          <option className="bg-background text-foreground" value="ACTIVE">Activo</option>
          <option className="bg-background text-foreground" value="DRAFT">Borrador</option>
          <option className="bg-background text-foreground" value="DISCONTINUED">Discontinuado</option>
        </select>
      </label>

      <label className="group relative col-span-2 mb-2 text-sm font-medium">
        <span className="absolute text-foreground/60 left-3 -top-3 bg-background px-1 duration-300">Proveedor</span>
        <select name="supplier_id" className="w-full p-2 border border-gray-300 rounded" defaultValue={product?.supplier_id || -1}>
          <option className="bg-background text-foreground" value={-1} disabled>Seleccione un proveedor</option>
          {suppliers?.map((supplier) => (
            <option className="bg-background text-foreground" key={supplier.id} value={supplier.id}>{supplier.name}</option>
          ))}
        </select>
      </label>
      <label className="group relative col-span-2 mb-2 text-sm font-medium">
        <span className="absolute text-foreground/60 left-3 -top-3 bg-background px-1 duration-300">Categoría</span>
        <select name="category_id" className="w-full p-2 border border-gray-300 rounded" defaultValue={product?.category_id || -1}>
          <option className="bg-background text-foreground" value={-1} disabled>Seleccione una categoría</option>
          {categories?.map((category) => (
            <option className="bg-background text-foreground" key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </label>
      <label className="group relative col-span-2 mb-2 text-sm font-medium">
        <span className="absolute text-foreground/60 -top-3 left-3 bg-background px-1 duration-300">Descripción</span>
        <textarea defaultValue={product?.description} name="description" className="w-full p-2 border border-gray-300 rounded" />
      </label>
      <Button type="submit" className="col-span-2">{product ? 'Editar' : 'Cargar'}</Button>
    </form>
  )
}