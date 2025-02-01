import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="dfc items-center justify-center h-screen text-zinc-400">
      <p>No matching route found</p>
      <p>Go to <Link to="/" className="text-zinc-200 hover:text-zinc-100 hover:underline">Home</Link></p>
    </div>
  )
}

export default NotFound
