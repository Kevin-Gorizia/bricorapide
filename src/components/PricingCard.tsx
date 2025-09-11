interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
}

export default function PricingCard({
  name,
  price,
  features,
}: PricingCardProps) {
  return (
    <div className="border rounded-lg p-6 bg-white shadow hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-dark">{name}</h3>
      <p className="mt-2 text-gray-600">{price}</p>
      <ul className="mt-4 text-sm text-gray-500 space-y-1">
        {features.map((f, i) => (
          <li key={i}>• {f}</li>
        ))}
      </ul>
      <a
        href="#booking"
        className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded"
      >
        Choisir
      </a>
    </div>
  );
}
