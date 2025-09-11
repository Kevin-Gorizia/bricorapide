interface Reservation {
  id: string;
  service: string;
  nomClient: string;
  emailClient: string;
  amountCents: number;
  createdAt: string;
}

export default function ReservationCard({
  service,
  nomClient,
  emailClient,
  amountCents,
  createdAt,
}: Reservation) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h4 className="font-semibold text-lg text-dark">{service}</h4>
        <p className="text-gray-600">
          {nomClient} — {emailClient}
        </p>
      </div>
      <div className="text-right">
        <p className="font-bold text-primary">
          {(amountCents / 100).toFixed(2)} €
        </p>
        <p className="text-sm text-gray-400">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
