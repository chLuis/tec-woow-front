import { Link } from "react-router-dom";

export default function Error404Page() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-muted-foreground">Page Not Found</p>
      <p className="text-sm text-muted-foreground">The page you are looking for does not exist.</p>
      <Link to="/dashboard" className="mt-4 text-blue-500 hover:underline">Go back to home</Link>
    </div>
  )
}