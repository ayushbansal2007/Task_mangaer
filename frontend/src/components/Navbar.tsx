import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <div className="text-xl font-bold flex items-center gap-2">
        ⏰ TaskFlow
      </div>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-sky-400">Home</Link>
        <Link to="/dashboard" className="hover:text-sky-400">Tasks</Link>
        <Link to="/login" className="hover:text-sky-400">Login</Link>

        <Link
          to="/register"
          className="bg-sky-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-sky-300 transition"
        >
          Get Started
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;
