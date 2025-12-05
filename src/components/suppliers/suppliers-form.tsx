import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import type { supplierSchema } from "./suppliers-table";
import { showToast } from "@/providers/toast-provider";
import { proveedorSchema } from "./suppliers-schema";

export default function SuppliersForm({supplier, onClose, fetchSuppliers, setSuppliers}: {supplier?: supplierSchema, onClose?: () => void, fetchSuppliers: () => void, setSuppliers?: () => void}) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);

    const proveedor = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      contact_info: formData.get("contact_info"),
    }
    const parsed = proveedorSchema.safeParse(proveedor);
    if (!parsed.success) {
      showToast({ texto: parsed.error.issues[0].message, tipo: 'error' });
      return;
    }
    try {
      const res = supplier 
        ? await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/suppliers/${supplier?.id}`, proveedor, {headers: {'Authorization': `Bearer ${localStorage.getItem('token-woow')}`}})
        : await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/suppliers/`, proveedor, {headers: {'Authorization': `Bearer ${localStorage.getItem('token-woow')}`}}) 
      console.log(res);
      showToast({ texto: supplier ? 'Proveedor editado con éxito' : 'Proveedor creado con éxito', tipo: 'success' })
      fetchSuppliers()
      onClose?.()
      setSuppliers?.()
    }
    catch (err) {
      console.log(err);
      const error = err as AxiosError<{ message: string }>;
      showToast({ texto: error?.response?.data?.message || 'Ocurrió un error. Intente nuevamente.', tipo: 'error' })
    }
  }
  
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-2 gap-4 px-4 pb-4 min-w-80">
      <label className="group relative col-span-2 mb-2 text-sm font-medium">
        <span className="absolute text-foreground/60 group-focus-within:-top-3 group-[&:has(input:valid)]:-top-3 left-3 top-2 bg-background px-1 duration-300">Nombre</span>
        <input type="text" defaultValue={supplier?.name} required name="name" className="w-full p-2 border border-gray-300 rounded" />
      </label>
      
      <label className="group relative col-span-2 mb-2 text-sm font-medium">
        <span className="absolute text-foreground/60 group-focus-within:-top-3 group-[&:has(input:valid)]:-top-3 left-3 top-2 bg-background px-1 duration-300">Email</span>
        <input type="email" defaultValue={supplier?.email} required name="email" className="w-full p-2 border border-gray-300 rounded" />
      </label>
      
      <label className="group relative col-span-2 mb-2 text-sm font-medium">
        <span className="absolute text-foreground/60 group-focus-within:-top-3 group-[&:has(input:valid)]:-top-3 left-3 top-2 bg-background px-1 duration-300">Teléfono</span>
        <input type="text" defaultValue={supplier?.phone} required name="phone" className="w-full p-2 border border-gray-300 rounded" />
      </label>
      
      <label className="group relative col-span-2 mb-2 text-sm font-medium">
        <span className="absolute text-foreground/60 group-focus-within:-top-3 group-[&:has(input:valid)]:-top-3 left-3 top-2 bg-background px-1 duration-300">Información</span>
        <input type="text" defaultValue={supplier?.contact_info} required name="contact_info" className="w-full p-2 border border-gray-300 rounded" />
      </label>

      
      <Button type="submit" className="col-span-2">{supplier ? 'Editar' : 'Cargar'}</Button>
    </form>
  )
}