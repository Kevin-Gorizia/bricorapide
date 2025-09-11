import { useState } from "react";
import api from "../lib/api";

export default function Register() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/users/register", { nom, email, password });
      alert("Inscription réussie ✅");
      setNom("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Inscription</h2>

      {error && <div className="text-red-500 mb-3">{error}</div>}

      <input
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        placeholder="Nom"
        className="w-full p-3 border rounded mb-3"
        required
      />

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="w-full p-3 border rounded mb-3"
        required
      />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Mot de passe"
        className="w-full p-3 border rounded mb-3"
        required
      />

      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Inscription..." : "S’inscrire"}
      </button>
    </form>
  );
}
