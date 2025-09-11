import { useEffect, useState } from "react";
import api from "../lib/api";
import ReservationCard from "../components/ReservationCard";

interface Reservation {
  id: string;
  service: string;
  nomClient: string;
  emailClient: string;
  amountCents: number;
  createdAt: string;
}

export default function Dashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vous devez être connecté pour voir le dashboard.");
      setLoading(false);
      return;
    }

    api
      .get("/reservations", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setReservations(res.data);
      })
      .catch(() => {
        setError("Impossible de charger les réservations.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold text-dark mb-10">Tableau de bord</h1>

      {loading && (
        <p className="text-gray-500">Chargement des réservations...</p>
      )}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && reservations.length === 0 && (
        <p className="text-gray-500">Aucune réservation trouvée.</p>
      )}

      {!loading && !error && reservations.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {reservations.map((r) => (
            <ReservationCard key={r.id} {...r} />
          ))}
        </div>
      )}
    </div>
  );
}
