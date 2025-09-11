import React, { useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });
    const { token } = res.data;
    localStorage.setItem("token", token);
    nav("/dashboard");
  }
  return (
    <div className="container py-20">
      <form
        onSubmit={submit}
        className="max-w-md mx-auto bg-white p-6 rounded shadow"
      >
        <h3 className="text-xl font-semibold mb-4">Connexion</h3>
        <input
          className="w-full p-3 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          className="w-full p-3 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
        />
        <button className="px-4 py-2 bg-primary text-white rounded">
          Se connecter
        </button>
      </form>
    </div>
  );
}
