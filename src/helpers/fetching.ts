import { showToast } from "@/providers/toast-provider";
import axios from "axios";

export default async function fetchProducts({ page = 1, limit = 10, category, supplier, status }: FetchProductsSchema) {
  const token = localStorage.getItem("token-woow")

  if (!token) return showToast({ texto: "No autenticado", tipo: "error" })

  const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
  if (category && category !== "-1") params.set("category", category);
  if (supplier && supplier !== "-1") params.set("supplier", supplier);
  if (status && status !== "-1") params.set("status", status);

  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${params}`,
      {
        headers:
          { Authorization: `Bearer ${token}` }
      });
    return data
  }
  catch (error) {
    console.log(error);
    showToast({ texto: "Error al obtener los productos", tipo: "error" })
  }
};

export async function fetchDashboardProducts() {
  const token = localStorage.getItem("token-woow")

  if (!token) return showToast({ texto: "No autenticado", tipo: "error" })

 

  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/stats/dashboard`,
      {
        headers:
          { Authorization: `Bearer ${token}` }
      });
    return data
  }
  catch (error) {
    console.log(error);
    showToast({ texto: "Error al obtener los datos", tipo: "error" })
  }
};


export interface FetchProductsSchema { page: number, limit: number, category?: string | null, supplier?: string | null, status?: 'ACTIVE' | 'DRAFT' | 'DISCONTINUED' | '-1' | null }
