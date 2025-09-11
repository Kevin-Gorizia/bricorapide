import React from "react";
import ServiceCard from "../components/Servicecards.tsx";
import { type ReactNode } from "react";

const servicesList: {
  title: string;
  desc: string;
  price: string;
  icon?: ReactNode;
}[] = [
  {
    title: "Montage meubles",
    desc: "IKEA, Conforama, Leroy Merlin…",
    price: "à partir de 40€",
  },
  {
    title: "Pose cuisine",
    desc: "Meubles et électroménager",
    price: "à partir de 150€",
  },
  {
    title: "Pose cabine douche",
    desc: "Pose rapide avec joints",
    price: "à partir de 100€",
  },
  {
    title: "Petites réparations",
    desc: "Électricité, plomberie, menuiserie",
    price: "à partir de 30€",
  },
];

const Services: React.FC = () => {
  return (
    <section className="container mx-auto py-16 space-y-12">
      <h2 className="text-3xl font-bold text-center">Tous nos services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {servicesList.map((s, i) => (
          <ServiceCard
            key={i}
            title={s.title}
            desc={s.desc}
            price={s.price}
            icon={s.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
