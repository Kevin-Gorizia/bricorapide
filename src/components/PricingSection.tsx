import PricingCard from "./PricingCard";

interface Plan {
  name: string;
  price: string;
  features: string[];
}

interface PricingSectionProps {
  plans: Plan[];
}

export default function PricingSection({ plans }: PricingSectionProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan, i) => (
        <PricingCard key={i} {...plan} />
      ))}
    </div>
  );
}
