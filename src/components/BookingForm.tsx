import { useState } from "react";
import api from "../lib/api";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBKEY);

type ServiceType = "meuble" | "douche" | "cuisine";

function BookingFormInner() {
  const stripe = useStripe();
  const elements = useElements();

  const [service, setService] = useState<ServiceType>("meuble");
  const [surface, setSurface] = useState(0);
  const [distance, setDistance] = useState(0);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");

  const ACOMPTE_PERCENT = 0.3;
  const TARIF = { meuble: 4000, douche: 12000, cuisine: 30000 }; // cents
  const TARIF_DEPL_KM = 120; // cents/km

  const computeTotalCents = () => {
    let base =
      service === "meuble"
        ? TARIF.meuble
        : service === "douche"
        ? TARIF.douche
        : TARIF.cuisine * Math.max(0, surface);
    return base + Math.round(distance * TARIF_DEPL_KM);
  };

  const totalCents = computeTotalCents();
  const acompteCents = Math.round(totalCents * ACOMPTE_PERCENT);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Connecte-toi d'abord");
      return;
    }

    try {
      const { data } = await api.post<{ clientSecret: string }>(
        "/payments/create-payment-intent",
        { amountCents: acompteCents },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!stripe || !elements) return;
      const card = elements.getElement(CardElement);
      if (!card) return;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: { card, billing_details: { name: nom, email } },
        }
      );

      if (error) {
        alert(error.message);
        return;
      }

      await api.post(
        "/reservations",
        {
          nomClient: nom,
          emailClient: email,
          service,
          surface,
          distanceKm: distance,
          amountCents: totalCents,
          stripePaymentIntentId: paymentIntent?.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Réservation créée ✅");
    } catch (err) {
      if (err instanceof Error) alert(err.message);
      else alert("Erreur inconnue");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-6 rounded shadow max-w-2xl mx-auto"
    >
      <input
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        placeholder="Nom"
        className="w-full p-3 border rounded mb-3"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-3 border rounded mb-3"
      />
      <select
        value={service}
        onChange={(e) => setService(e.target.value as ServiceType)}
        className="w-full p-3 border rounded mb-3"
      >
        <option value="meuble">Montage meubles</option>
        <option value="douche">Pose cabine douche</option>
        <option value="cuisine">Montage cuisine</option>
      </select>
      {service === "cuisine" && (
        <input
          type="number"
          value={surface}
          onChange={(e) => setSurface(Number(e.target.value))}
          placeholder="Surface m²"
          className="w-full p-3 border rounded mb-3"
        />
      )}
      <input
        type="number"
        value={distance}
        onChange={(e) => setDistance(Number(e.target.value))}
        placeholder="Distance (km)"
        className="w-full p-3 border rounded mb-3"
      />
      <div className="mb-3">
        <div>Total = {(totalCents / 100).toFixed(2)} €</div>
        <div>Acompte (30%) = {(acompteCents / 100).toFixed(2)} €</div>
      </div>
      <div className="mb-4">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        Payer acompte & Réserver
      </button>
    </form>
  );
}

export default function BookingForm() {
  return (
    <Elements stripe={stripePromise}>
      <BookingFormInner />
    </Elements>
  );
}
