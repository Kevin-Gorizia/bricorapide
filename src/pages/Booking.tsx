import BookingForm from "../components/BookingForm";

export default function BookingPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Réservation</h1>
      <BookingForm />
    </div>
  );
}
