import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import SuppliersForm from "./suppliers-form";
import DeleteItem from "../delete-item";
import { useOutletContext } from "react-router-dom";

export default function TableSuppliers({
  suppliers,
  fetchSuppliers,
}: {
  suppliers: supplierSchema[];
  fetchSuppliers: () => void;
}) {
  const { role } = useOutletContext<{role: string }>();

  const [supplierSelected, setSupplierSelected] =
    useState<supplierSchema | null>(null);

  const handleEdit = (supplier: supplierSchema | null) => {
    setSupplierSelected(supplier);
  };

  return (
    <div className="p-4">
      <Table>
        <TableCaption>Lista de proveedores.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Información</TableHead>
            {role !== import.meta.env.VITE_ROLE_VIEW && <TableHead className="text-right">Eliminar</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id} onClick={() => handleEdit(supplier)}>
              <TableCell className="font-medium">{supplier.name}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.phone}</TableCell>
              <TableCell>{supplier.contact_info}</TableCell>
              {role !== import.meta.env.VITE_ROLE_VIEW && <DeleteItem
                item={supplier}
                classnames="flex items-center justify-end"
                refresh={fetchSuppliers}
                route="suppliers"
              />}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {supplierSelected && role !== import.meta.env.VITE_ROLE_VIEW && (
        <div
          onClick={() => handleEdit(null)}
          className="z-10 bg-background/50 backdrop-blur-sm fixed inset-0 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="m-auto p-2 bg-background border border-foreground rounded-xl"
          >
            <header className="px-4 pb-3">
              <h4 className="font-bold">Edición del proveedor</h4>
              <span className="text-blue-500">{supplierSelected.name}</span>
            </header>
            <SuppliersForm
              supplier={supplierSelected}
              fetchSuppliers={fetchSuppliers}
              setSuppliers={() => setSupplierSelected(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export interface supplierSchema {
  id?: string;
  name: string;
  email: string;
  phone: string;
  contact_info: number;
}
