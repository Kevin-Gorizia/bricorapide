import React from "react";

const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Julie M.",
      text: "Montage de ma cuisine impeccable. Travail rapide et soigné !",
    },
    {
      name: "Karim L.",
      text: "Pose de cabine de douche nickel, très professionnel.",
    },
    {
      name: "Sophie D.",
      text: "Montage de meubles Ikea super efficace. Je recommande !",
    },
  ];

  return (
    <section className="container mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-white">
        Avis clients
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-dark rounded-xl p-6 shadow border border-gray-800"
          >
            <p className="text-gray-300">“{r.text}”</p>
            <p className="mt-4 font-semibold text-primary">— {r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
