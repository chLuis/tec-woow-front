import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { showToast } from "@/providers/toast-provider";


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

export default function ProductStock({product, onClose, refresh, setModifiedStock}: {product?: productSchema, onClose?: () => void, refresh: () => void, setModifiedStock?: () => void}) {
  

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);

    const producto = {current_stock: parseInt(formData.get("current_stock") as string)}
  
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${product?.id}/stock`, producto, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token-woow')}`
      }
      });
      console.log(res);
      refresh?.()
      onClose?.()
      setModifiedStock?.()
      showToast({texto: "Stock del producto actualizado correctamente", tipo: "success"})
    }
    catch (err) {
      console.log(err);
      const error = err as AxiosError<{ message: string }>;
      showToast({ texto: error?.response?.data?.message || 'Ocurrió un error. Intente nuevamente.', tipo: 'error' })
    }
  }
  
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-1 gap-4 px-4 pb-4">
      <label className="group relative col-span-1 mb-2 text-sm font-medium">
        <span className="absolute text-foreground/60 group-focus-within:-top-3 group-[&:has(input:valid)]:-top-3 left-3 top-2 bg-background px-1 duration-300">Stock</span>
        <input type="number" defaultValue={product?.current_stock} required name="current_stock" min={0} className="w-full p-2 border border-gray-300 rounded" />
      </label> 
      <Button type="submit" className="col-span-2">Editar</Button>
    </form>
  )
}