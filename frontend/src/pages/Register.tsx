import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { RegisterData } from "../types";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    state: "",
    whatsapp_number: "", // Number ki jagah String rakha hai taaki +91 handle ho sake
    bio: "",
    goal: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Number ko format karna: agar user "+91" nahi lagata toh hum khud laga denge
    const formattedNumber = form.whatsapp_number.startsWith("+") 
      ? form.whatsapp_number 
      : `+91${form.whatsapp_number}`;

    const payload = {
      ...form,
      whatsapp_number: formattedNumber
    };

    try {
      const API_URL = import.meta.env.VITE_API_URL
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Signup failed");

      alert("Registration Successful! Please join the Twilio Sandbox.");
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl space-y-4"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-slate-800">Join Us</h2>
          <p className="text-slate-500 text-sm mt-1">Start your productivity journey</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-2">
             <p className="text-red-500 text-xs text-center font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <input name="name" placeholder="Full Name" onChange={handleChange} className="input-style" required />
          <input name="email" type="email" placeholder="Email Address" onChange={handleChange} className="input-style" required />
        </div>
        
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input-style" required />

        <div className="grid grid-cols-2 gap-3">
          <input name="city" placeholder="City" onChange={handleChange} className="input-style" />
          <input name="state" placeholder="State" onChange={handleChange} className="input-style" />
        </div>

        <div className="relative">
          <input 
            name="whatsapp_number" 
            type="tel" 
            placeholder="WhatsApp (e.g. 9876543210)" 
            onChange={handleChange} 
            className="input-style"
            required 
          />
          <span className="absolute right-3 top-3 text-[10px] text-slate-400 font-bold">REQUIRED</span>
        </div>

        <input name="goal" placeholder="Main Productivity Goal" onChange={handleChange} className="input-style" />
        
        <textarea
          name="bio"
          placeholder="A little about yourself..."
          onChange={handleChange}
          className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-sky-500 outline-none transition-all text-sm h-24"
        />

        <button 
          disabled={loading}
          className="w-full bg-sky-600 text-white py-3 rounded-xl font-bold hover:bg-sky-500 transition-colors shadow-lg shadow-sky-200"
        >
          {loading ? "Creating Profile..." : "Sign Up"}
        </button>
      </form>

      {/* Basic Internal CSS for input consistency */}
      <style>{`
        .input-style {
          width: 100%;
          border: 2px solid #f1f5f9;
          padding: 12px;
          border-radius: 12px;
          outline: none;
          transition: all 0.2s;
          font-size: 14px;
        }
        .input-style:focus {
          border-color: #0ea5e9;
          background-color: #f8fafc;
        }
      `}</style>
    </div>
  );
};

export default Register;