import { Link, Navigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken, login } from "../helpers/auth";
import { Copy, CopyCheck } from "lucide-react";


export default function Home() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [copy, setCopy] = useState<string | null>(null)
  const token = localStorage.getItem("token-woow");
  
  if(token) {
    const { payload, isExpired } = decodeToken(token);
    console.log(payload, isExpired);

    if (payload && !isExpired) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopy(text)
    setTimeout(() => {
      setCopy(null)
    }, 2000);
  }

  return (
    <div className="bg-background flex flex-col gap-2 items-center justify-center flex-1 min-h-screen">
      <div className="shadow-md border border-foreground/20 rounded-md w-fit flex flex-col p-5 gap-6 min-w-96">
        <header className="">
          <div className="font-semibold">Login</div>
          <div className="text-sm">Ingresa con tu cuenta para utilizar la aplicación</div>
        </header>
        <div className="flex flex-col gap-6">
          <label className="group relative col-span-2 mb-2 text-sm font-medium">
            <span className="absolute text-foreground/60 group-focus-within:-top-3 group-[&:has(input:valid)]:-top-3 left-3 top-2 bg-background px-1 duration-300">Email</span>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border w-full rounded-md p-2"/>
          </label>
          <label className="group relative col-span-2 mb-2 text-sm font-medium">
            <span className="absolute text-foreground/60 group-focus-within:-top-3 group-[&:has(input:valid)]:-top-3 left-3 top-2 bg-background px-1 duration-300">Password</span>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border w-full rounded-md p-2"/>
          </label>
        </div>
        <Button onClick={() => login(email, password, navigate)}>Login</Button>
        <div className="text-center">
          ¿No tienes cuenta? <Link to={"/register"} className="underline">Registrate</Link>
        </div>
      </div>

      <div className="shadow-md border border-foreground/20 bg-black/60 rounded-md w-fit flex flex-col p-5 gap-1 min-w-96">
        <div className="text-lg">También puede elegir una de estas</div>
        {ACCOUNTS.map((account) => (
          <div className="flex items-center gap-1 text-sm">
            <span>{account}</span>
            {copy && copy === account ? <CopyCheck className="size-4 cursor-pointer animate-show-in"/> : <Copy onClick={() => handleCopyText(account)} className="size-4 cursor-pointer animate-show-in"/>}
          </div>
        ))}
 
        <div>Contraseña <strong>123123</strong></div>
      </div>
      {copy && <div className="fixed top-2 bg-blue-950 p-2 rounded-md">Copiado! {copy}</div>}
    </div>
  )
}
const ACCOUNTS = [
  'admin@admin.com',
  'manager@manager.com',
  'viewer@viewer.com'
]