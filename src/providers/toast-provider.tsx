import { createContext, useContext, useEffect, useState } from "react";
import { Check, FileWarning, Info, WormIcon } from "lucide-react";

export type ToastType = {
  texto: string | null;
  tipo: "error" | "success" | "warning" | "info";
};

type ToastContextType = {
  toast: ToastType | null;
  setToast: React.Dispatch<React.SetStateAction<ToastType | null>>;
};

const ToastContext = createContext<ToastContextType | null>(null);

// Variable global para exponer setToast
let externalSetToast: React.Dispatch<React.SetStateAction<ToastType | null>> | null = null;

// Función exportada para poder usar fuera del provider
// eslint-disable-next-line react-refresh/only-export-components
export function showToast(toast: ToastType) {
  if (!externalSetToast) {
    console.warn("⚠️ showToast fue llamado antes de inicializar el ToastProvider");
    return;
  }
  externalSetToast(toast);
}

export function ToastProvider({
  children,
  initialData = null,
}: {
  children: React.ReactNode;
  initialData?: ToastType | null;
}) {
  const [toast, setToast] = useState<ToastType | null>(initialData);

  // Enlazamos la función global con el estado actual
  useEffect(() => {
    externalSetToast = setToast;
    return () => {
      externalSetToast = null;
    };
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {toast && (
        <div
          key={`${toast.tipo}-${toast.texto}-${crypto.randomUUID()}`}
          className={`fixed flex justify-start top-2 right-2 z-99 min-w-52 w-full max-w-52 sm:max-w-80 border rounded-md p-3 overflow-clip animate-desvanecer ${
            toast.tipo === "success"
              ? "bg-green-600"
              : toast.tipo === "info"
              ? "bg-blue-500"
              : toast.tipo === "error"
              ? "bg-red-500"
              : "bg-orange-500"
          }`}
        >
          <div className="z-10 flex items-center gap-1">
            {toast.tipo === "success" && (
              <Check color="white" className="w-5 min-w-5 h-5" />
            )}
            {toast.tipo === "info" && (
              <Info color="white" className="w-5 min-w-5 h-5" />
            )}
            {toast.tipo === "error" && (
              <WormIcon color="white" className="w-5 min-w-5 h-5" />
            )}
            {toast.tipo === "warning" && (
              <FileWarning color="yellow" className="w-5 min-w-5 h-5" />
            )}
            <div className="line-clamp-3 text-white">{toast.texto}</div>
          </div>
          <div
            className={`absolute justify-self-start inset-y-0 w-full right-0 animate-grow ${
              toast.tipo === "success"
                ? "bg-green-700"
                : toast.tipo === "info"
                ? "bg-blue-600"
                : toast.tipo === "error"
                ? "bg-red-600"
                : "bg-orange-600"
            }`}
          ></div>
        </div>
      )}
      {children}
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de ToastContext");
  return ctx;
}

