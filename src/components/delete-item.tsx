import axios, { AxiosError } from "axios";
import { TableCell } from "./ui/table";
import type { productSchema } from "./products/product-table";
import type { supplierSchema } from "./suppliers/suppliers-table";
import { showToast } from "@/providers/toast-provider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { DeleteIcon } from "lucide-react";

export default function DeleteItem({
  classnames,
  item,
  route,
  refresh,
}: {
  classnames: string;
  item: supplierSchema | productSchema;
  route: "suppliers" | "products";
  refresh: () => void;
}) {
  async function handleDelete() {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/${route}/${item.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token-woow")}`,
          },
        }
      );
      showToast({ texto: "Eliminado correctamente", tipo: "success" });
      refresh();
    } catch (err) {
      console.log(err);
      const error = err as AxiosError<{ message: string }>;
      showToast({ texto: error?.response?.data?.message || "Error al eliminar el ítem", tipo: "error" });
    }
  }

  return (
    <TableCell className={`${classnames}`} onClick={(e) => e.stopPropagation()}>
      <Dialog>
        <DialogTrigger><DeleteIcon className="stroke-[1.4]"/></DialogTrigger>
        <DialogContent className="fixed inset-0 bg-background/10 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="bg-background rounded-md p-4 border border-foreground/20">
            <DialogTitle>¿Desear eliminar a {item.name}?</DialogTitle>
            <DialogDescription>
              Eliminar el item de la base de datos
            </DialogDescription>
            <footer className="flex flex-col gap-2 pt-4">
              <Button onClick={handleDelete}>Confirmar</Button>
              <DialogClose>Cerrar</DialogClose>
            </footer>
          </div>
        </DialogContent>
      </Dialog>
    </TableCell>
  );
}