import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { RegisterData } from "../types";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    city: "",
    state: "",
    whatsapp_number: 0,
    bio: "",
    goal: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "whatsapp_number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Signup failed");

      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl w-96 shadow-lg space-y-3"
      >
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <input name="name" placeholder="Name" onChange={handleChange} className="input" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="input" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" />
        <input name="city" placeholder="City" onChange={handleChange} className="input" />
        <input name="state" placeholder="State" onChange={handleChange} className="input" />
        <input name="whatsapp_number" placeholder="WhatsApp Number" onChange={handleChange} className="input" />
        <input name="goal" placeholder="Goal" onChange={handleChange} className="input" />
        
        <textarea
          name="bio"
          placeholder="Short bio..."
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-400">
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Register;
