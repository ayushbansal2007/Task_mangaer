import { useState } from "react";
import type { LoginData } from "../types";
import { useNavigate, Link } from "react-router-dom";
import { loginSave } from "../utils/auth";
import { LogIn, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const API_URL = import.meta.env.VITE_API_URL
     const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user_id", data.user_id);
      loginSave(data.token, data.user_id);

      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-6 relative overflow-hidden">
      {/* Background Glow Decorations */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-sky-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full"></div>

      <div className="relative w-full max-w-md">
        {/* Card Container */}
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-500/10 rounded-2xl border border-sky-500/20 mb-4">
              <LogIn className="text-sky-400" size={32} />
            </div>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Welcome <span className="text-sky-400">Back</span></h2>
            <p className="text-slate-500 text-sm font-bold mt-2 uppercase tracking-widest">Sign in to continue your grind</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-shake">
                <AlertCircle size={18} /> {error}
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-sky-500/50 focus:ring-4 focus:ring-sky-500/10 rounded-2xl p-4 pl-12 text-white placeholder:text-slate-600 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={20} />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-sky-500/50 focus:ring-4 focus:ring-sky-500/10 rounded-2xl p-4 pl-12 text-white placeholder:text-slate-600 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              className="group w-full bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {loading ? "AUTHENTICATING..." : (
                <>
                  LOG IN <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center mt-8 text-slate-500 font-bold text-sm">
            DON'T HAVE AN ACCOUNT?{" "}
            <Link to="/register" className="text-sky-400 hover:text-sky-300 underline decoration-2 underline-offset-4">
              SIGN UP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

