import AppSheet from "@/components/app-sheet";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import SuppliersForm from "@/components/suppliers/suppliers-form";
import TableSuppliers from "@/components/suppliers/suppliers-table";
import { useOutletContext } from "react-router-dom";

export default function SuppliersPage() {
  const [open, setOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const { role } = useOutletContext<{role: string }>();
  
  const fetchSuppliers = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/suppliers`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token-woow')}` }});
    setSuppliers(res.data.data);
  };

  useEffect(() => {
    const fetching = async () => {
      await fetchSuppliers();
    };
    fetching();
  }, []);

  return (
    <div className="w-full">
      {role !== import.meta.env.VITE_ROLE_VIEW && <AppSheet
        open={open}
        setOpen={setOpen}
        trigger={<Button className="absolute right-2 top-2">Nuevo proveedor</Button>}
        title="Cargar proveedor"
        description="Complete el formulario para cargar un nuevo proveedor."
        children={<SuppliersForm onClose={() => setOpen(false)} fetchSuppliers={fetchSuppliers}/>}
      />}
      <h2 className="p-4 text-xl font-medium">Lista de proveedores</h2>
      
      <TableSuppliers suppliers={suppliers} fetchSuppliers={fetchSuppliers}/>
      
    </div>
  );
}
