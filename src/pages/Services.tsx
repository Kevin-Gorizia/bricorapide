import { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-start gap-4">
      <div className="flex items-center gap-4">
        {icon && (
          <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const services = [
    {
      title: "Montage meubles",
      description: "Montage rapide et fiable de vos meubles IKEA ou autres.",
    },
    {
      title: "Pose cabine douche",
      description:
        "Installation professionnelle de cabines de douche et accessoires.",
    },
    {
      title: "Montage cuisine",
      description:
        "Montage complet de votre cuisine avec précision et rapidité.",
    },
  ];

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold text-dark mb-10">Nos services</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <ServiceCard key={i} {...s} />
        ))}
      </div>
    </div>
  );
}
