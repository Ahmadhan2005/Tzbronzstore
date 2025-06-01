"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"

async function loginUser({ username, password }) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

async function registerUser({ username, password }) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

export default function LoginComponent({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    function syncUser() {
      const userData = localStorage.getItem("user");
      if (userData && userData !== "undefined") {
        try {
          setUser(JSON.parse(userData));
        } catch {
          setUser(null);
          localStorage.removeItem("user");
        }
      } else {
        setUser(null);
      }
    }
    window.addEventListener("storage", syncUser);
    syncUser();
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ...existing code...
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    // ...existing code...
    if (isLogin) {
      // ...login seperti sebelumnya...
      const res = await loginUser(form);
      if (res.success) {
        setUser(res.user);
        localStorage.setItem("user", JSON.stringify(res.user));
        if (onAuth) onAuth(res.user);
        window.dispatchEvent(new Event("storage"));
        if (res.user.role === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/");
        }
      } else {
        setMsg(res.error || "Login gagal");
      }
    } else {
      // Validasi password & konfirmasi password
      if (form.password !== form.confirmPassword) {
        setMsg("Konfirmasi password tidak cocok.");
        setLoading(false);
        return;
      }
      if (form.password.length < 8) {
        setMsg("Password minimal 8 karakter.");
        setLoading(false);
        return;
      }
      // Proses register
      const res = await registerUser(form);
      if (res.success) {
        setMsg("Berhasil daftar! Silakan login.");
        setIsLogin(true); // Pindah ke form login
        setForm({ username: "", password: "", confirmPassword: "" });
      } else {
        setMsg(res.error || "Registrasi gagal");
      }
    }
    setLoading(false);
  };


  const handleLogout = () => {
    setUser(null);
    setMsg("Berhasil logout.");
    localStorage.removeItem("user");
    if (onAuth) onAuth(null);
    // Trigger update di tab lain
    window.dispatchEvent(new Event("storage"));
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="bg-white border border-purple-100 rounded-2xl p-8 text-purple-700 text-center shadow-xl w-full max-w-sm animate-fade-in">
          <div className="mb-4 text-2xl font-bold">Halo, <b>{user.username}</b>!</div>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-4 py-2 rounded-lg font-bold w-full shadow hover:from-purple-700 hover:to-purple-500 transition"
          >
            Logout
          </button>
          {msg && <div className="mt-2 text-green-500">{msg}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="w-full max-w-sm bg-white border border-purple-100 rounded-2xl p-8 shadow-xl animate-fade-in">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 text-center">
          {isLogin ? "Masuk ke Akun" : "Daftar Akun Baru"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="px-3 py-2 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
            autoFocus
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="px-3 py-2 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
            minLength={8}
          />
          {!isLogin && (
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Konfirmasi Password"
              className="px-3 py-2 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
              minLength={8}
            />
          )}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-4 py-2 rounded-lg font-bold w-full shadow hover:from-purple-700 hover:to-purple-500 transition"
            disabled={loading}
          >
            {loading ? "Memproses..." : isLogin ? "Login" : "Daftar"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-purple-600 underline text-sm hover:text-purple-800 transition"
            onClick={() => setIsLogin((v) => !v)}
          >
            {isLogin ? "Belum punya akun? Daftar" : "Sudah punya akun? Login"}
          </button>
        </div>
        {msg && <div className="mt-3 text-red-500 text-center text-sm">{msg}</div>}
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}
