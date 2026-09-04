import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          1Fi <span className="text-gray-800">Shop</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="hover:text-blue-600 cursor-default">Smartphones</span>
          <span className="hover:text-blue-600 cursor-default">EMI Plans</span>
        </nav>
      </div>
    </header>
  );
}