import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../helpers/auth";


export default function Register() {
  const [email, setEmail] = useState("")
  const [fullname, setFullname] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const navigate = useNavigate()


  return (
    <div className="bg-background flex items-center justify-center flex-1 min-h-screen">
      <div className="shadow-md border border-foreground/20 rounded-md w-fit flex flex-col p-5 gap-6">
        <header className="">
          <div className="font-semibold">Registro</div>
          <div className="text-sm">Registra una cuenta para utilizar la aplicación</div>
        </header>
        <div className="flex flex-col gap-6">
          <label className="group relative col-span-2 mb-2 text-sm font-medium">
            <span className="absolute text-foreground/60 group-focus-within:-top-3 group-[&:has(input:valid)]:-top-3 left-3 top-2 bg-background px-1 duration-300">Nombre y Apellido</span>
            <input required type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} className="border w-full rounded-md p-2"/>
          </label>
          <label className="group relative col-span-2 mb-2 text-sm font-medium">
            <span className="absolute text-foreground/60 group-focus-within:-top-3 group-[&:has(input:valid)]:-top-3 left-3 top-2 bg-background px-1 duration-300">Email</span>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border w-full rounded-md p-2"/>
          </label>
          <label className="group relative col-span-2 mb-2 text-sm font-medium">
            <span className="absolute text-foreground/60 group-focus-within:-top-3 group-[&:has(input:valid)]:-top-3 left-3 top-2 bg-background px-1 duration-300">Password</span>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border w-full rounded-md p-2"/>
          </label>
          <label className="group relative col-span-2 mb-2 text-sm font-medium">
            <span className="absolute text-foreground/60 group-focus-within:-top-3 group-[&:has(input:valid)]:-top-3 left-3 top-2 bg-background px-1 duration-300">Repita su Password</span>
            <input required type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} className="border w-full rounded-md p-2"/>
          </label>
        </div>
        <Button onClick={() => register(fullname, email, password, repeatPassword, navigate)}>Registrarse</Button>
        <div className="text-center">
          ¿Ya tienes cuenta? <Link to={"/"} className="underline">Ingresa</Link>
        </div>
      </div>
    </div>
  )
}