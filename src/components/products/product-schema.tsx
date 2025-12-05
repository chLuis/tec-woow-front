import { z } from "zod";

export const productoSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  sku: z.string().min(2, "El SKU es obligatorio"),
  price: z.number().positive("El precio debe ser mayor a 0"),
  current_stock: z.number().int().nonnegative("Stock inválido"),
  min_stock: z.number().int().nonnegative("Stock mínimo inválido"),
  status: z.enum(["ACTIVE", "DRAFT", "DISCONTINUED"]),
  supplier_id: z.string().optional(),
  category_id: z.number().int().positive("Debe seleccionar una categoría"),
  description: z.string().optional(),
});

export type ProductoType = z.infer<typeof productoSchema>;
