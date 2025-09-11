import React from "react";

interface HeroProps {
  onBook?: () => void;
}

const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto py-16 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-6/12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-dark leading-tight">
            Petits travaux & montages — rapides, propres, garantis.
          </h2>
          <p className="mt-4 text-gray-600">
            Montage meubles, pose cabine douche, montage cuisine au forfait
            selon m², joints, petites réparations et plus. Devis gratuit et
            intervention sous 48h selon disponibilité.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="#booking"
              className="px-6 py-3 bg-primary text-white rounded-md shadow"
            >
              Réserver une intervention
            </a>
            <a
              href="/services"
              className="px-6 py-3 border border-gray-300 rounded-md"
            >
              Voir les services
            </a>
          </div>
        </div>
        <div className="md:w-6/12">
          <img
            src="/src/assets/placeholder.jpg"
            alt="Montage meuble"
            className="w-full rounded-xl shadow"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
