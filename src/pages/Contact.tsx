import { useState } from "react";
import api from "../lib/api"; // Assure-toi que tu as une instance axios ou fetch

export default function Contact() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    try {
      await api.post("/contact", { nom, email, message });
      setSuccess(true);
      setNom("");
      setEmail("");
      setMessage("");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Erreur inconnue");
    }
  };

  return (
    <div className="container mx-auto py-16 max-w-xl">
      <h1 className="text-3xl font-bold text-dark mb-6">Contactez-nous</h1>

      {success && (
        <div className="mb-4 text-green-600">Message envoyé avec succès ✅</div>
      )}
      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom"
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border rounded"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Votre message"
          className="w-full p-3 border rounded h-32"
          required
        />
        <button
          type="submit"
          className="w-full bg-primary text-white p-3 rounded hover:bg-orange-600 transition"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
