import { Link, useLocation } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";
import { Trophy, Wallet, BarChart3, ListChecks, User, LogOut, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const loggedIn = isLoggedIn();
  const location = useLocation();

  // Active link highlight karne ke liye helper
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 px-6 py-3 flex items-center justify-between">
      
      {/* LOGO SECTION */}
      <Link to="/" className="group flex items-center gap-3">
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-sky-500/20">
          <LayoutDashboard size={22} className="text-white" />
        </div>
        <span className="text-xl font-black italic tracking-tighter uppercase text-white">
          TASK<span className="text-sky-400">FLOW</span>
        </span>
      </Link>

      {/* CENTER LINKS (Desktop) */}
      <div className="hidden md:flex items-center gap-1 bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800">
        <NavLink to="/" active={isActive("/")} icon={<ListChecks size={18} />} label="Home" />
        <NavLink to="/money-pot" active={isActive("/money-pot")} icon={<Wallet size={18} />} label="Pot" color="text-green-400" />
        <NavLink to="/analytics" active={isActive("/analytics")} icon={<BarChart3 size={18} />} label="Stats" />
        <NavLink to="/leaderboard" active={isActive("/leaderboard")} icon={<Trophy size={18} />} label="Elite" color="text-yellow-500" />
      </div>

      {/* RIGHT SIDE (Profile/Auth) */}
      <div className="flex items-center gap-4">
        {loggedIn ? (
          <>
            <Link to="/profile" className={`p-2.5 rounded-xl border transition-all ${isActive("/profile") ? 'bg-sky-500/10 border-sky-500 text-sky-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}>
              <User size={20} />
            </Link>
            <button
              onClick={logout}
              className="group flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2.5 rounded-xl border border-red-500/20 transition-all font-bold text-sm"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-slate-400 hover:text-white font-bold text-sm px-4 transition-colors">Login</Link>
            <Link
              to="/register"
              className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-5 py-2.5 rounded-xl font-black text-sm uppercase tracking-tight transition-all shadow-lg shadow-sky-500/20 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

// Sub-component for Cleaner Code
const NavLink = ({ to, active, icon, label, color = "text-sky-400" }: any) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-sm ${
      active 
      ? `bg-slate-800 ${color} shadow-sm shadow-black/40` 
      : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;