import PricingSection from "../components/PricingSection";

export default function Pricing() {
  const plans = [
    {
      name: "Basique",
      price: "40€",
      features: [
        "Montage meubles simple",
        "Déplacement jusqu'à 5 km",
        "Support email",
      ],
    },
    {
      name: "Standard",
      price: "120€",
      features: [
        "Montage cabine douche",
        "Déplacement jusqu'à 10 km",
        "Support téléphone",
      ],
    },
    {
      name: "Premium",
      price: "300€ + 30€/m²",
      features: [
        "Montage cuisine complète",
        "Déplacement illimité",
        "Support premium 24/7",
      ],
    },
  ];

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold text-dark mb-10">Nos tarifs</h1>
      <PricingSection plans={plans} />
    </div>
  );
}
