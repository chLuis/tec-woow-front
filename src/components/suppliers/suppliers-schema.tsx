import { z } from "zod";

export const proveedorSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.email("Email inválido"),
  phone: z.string().min(6, "Teléfono inválido"),
  contact_info: z.string().optional(),
});

export type ProveedorType = z.infer<typeof proveedorSchema>;
