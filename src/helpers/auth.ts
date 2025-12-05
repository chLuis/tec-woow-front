import { showToast } from "@/providers/toast-provider";
import axios, { AxiosError } from "axios";

export async function register(fullname: string, email: string, password: string, repeatPassword: string, navigate: (url: string) => void) {
  if (password !== repeatPassword) {
    return showToast({ texto: "Las contraseñas no coinciden", tipo: "error" })
  }
  try {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, { full_name: fullname, email, password })
    showToast({ texto: "Registro exitoso", tipo: "success" })
    navigate("/");

  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    showToast({ texto: error?.response?.data?.message || "Error al registrar", tipo: "error" })
  }
}

export async function login(email: string, password: string, navigate: (url: string) => void) {
  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { email, password })
    showToast({ texto: "Inicio de sesión exitoso", tipo: "success" })
    localStorage.setItem("token-woow", res.data.payload)
    navigate("/dashboard");

  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    showToast({ texto: error?.response?.data?.message || "Error al iniciar sesión", tipo: "error" })
  }
}


export function decodeToken(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return { payload, isExpired: exp < now };
  } catch {
    return { payload: null, isExpired: true };
  }
}
