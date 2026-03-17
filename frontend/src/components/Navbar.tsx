import { Link, useLocation } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";
import { 
  Trophy, Wallet, BarChart3, ListChecks, 
  User, LogOut, LayoutDashboard, Home as HomeIcon
} from "lucide-react";

const Navbar = () => {
  const loggedIn = isLoggedIn();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* --- TOP NAVBAR --- */}
      <nav className="sticky top-0 z-[60] bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="bg-gradient-to-br from-sky-500 to-indigo-600 p-2 rounded-xl group-hover:rotate-6 transition-transform shadow-lg shadow-sky-500/20">
            <LayoutDashboard size={22} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase text-white">
            TASK<span className="text-sky-400">FLOW</span>
          </span>
        </Link>

        {/* DESKTOP LINKS (Large Screen Only) */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1.5 rounded-2xl border border-white/5">
          <NavLink to="/" active={isActive("/")} icon={<HomeIcon size={18} />} label="Home" />
          <NavLink to="/money-pot" active={isActive("/money-pot")} icon={<Wallet size={18} />} label="Pot" color="text-green-400" />
          <NavLink to="/analytics" active={isActive("/analytics")} icon={<BarChart3 size={18} />} label="Stats" />
          <NavLink to="/leaderboard" active={isActive("/leaderboard")} icon={<Trophy size={18} />} label="Elite" color="text-yellow-500" />
        </div>

        {/* RIGHT SIDE (Profile/Auth) */}
        <div className="flex items-center gap-3">
          {loggedIn ? (
            <div className="flex items-center gap-2">
              <Link to="/profile" className={`p-2.5 rounded-xl border transition-all ${isActive("/profile") ? 'bg-sky-500/10 border-sky-500 text-sky-400' : 'bg-slate-900 border-white/5 text-slate-400'}`}>
                <User size={20} />
              </Link>
              <button onClick={logout} className="hidden md:flex bg-red-500/10 text-red-500 p-2.5 rounded-xl border border-red-500/10 hover:bg-red-500 hover:text-white transition-all">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-slate-400 hover:text-white font-bold text-sm px-3 transition-colors">Login</Link>
              <Link to="/register" className="bg-sky-500 text-slate-950 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-tight shadow-lg shadow-sky-500/20 transition-all hover:scale-105 active:scale-95">
                Join
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* --- MOBILE BOTTOM NAVIGATION (Tab Bar) --- */}
      {/* Ye hamesha dikhega mobile par (screen choti hone par) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[92%] max-w-[400px]">
        <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-2 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-around">
          <MobileTab to="/" active={isActive("/")} icon={<HomeIcon size={22} />} />
          <MobileTab to="/money-pot" active={isActive("/money-pot")} icon={<Wallet size={22} />} />
          
          {/* Middle Button (Primary Action) */}
          <Link to={loggedIn ? "/task" : "/login"} className="relative">
            <div className="bg-sky-500 p-4 rounded-full -mt-12 shadow-xl shadow-sky-500/40 border-[6px] border-[#030712] transition-transform active:scale-90">
              <ListChecks size={24} className="text-white" />
            </div>
          </Link>

          <MobileTab to="/analytics" active={isActive("/analytics")} icon={<BarChart3 size={22} />} />
          <MobileTab to="/leaderboard" active={isActive("/leaderboard")} icon={<Trophy size={22} />} />
        </div>
      </div>
    </>
  );
};

const NavLink = ({ to, active, icon, label, color = "text-sky-400" }: any) => (
  <Link to={to} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-sm ${active ? `bg-slate-800 ${color}` : 'text-slate-500 hover:text-slate-200'}`}>
    {icon} <span>{label}</span>
  </Link>
);

const MobileTab = ({ to, active, icon }: any) => (
  <Link to={to} className={`p-4 rounded-2xl transition-all flex flex-col items-center justify-center ${active ? 'text-sky-400' : 'text-slate-500'}`}>
    {icon}
    {active && <div className="w-1 h-1 bg-sky-400 rounded-full mt-1 animate-pulse"></div>}
  </Link>
);

export default Navbar;