import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mx-auto py-16">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-dark">
          Bienvenue chez Bricorapide
        </h1>
        <p className="text-gray-600 mb-6">
          Nous vous aidons à monter vos meubles, installer vos douches et
          cuisines rapidement et efficacement.
        </p>
        <Link
          to="/booking"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-orange-600 transition"
        >
          Réserver maintenant
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">Montage meubles</h3>
          <p className="text-gray-500">
            Montage rapide et fiable de vos meubles IKEA ou autres.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">Pose cabine douche</h3>
          <p className="text-gray-500">
            Installation professionnelle de cabines de douche et accessoires.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">Montage cuisine</h3>
          <p className="text-gray-500">
            Montage complet de votre cuisine avec précision et rapidité.
          </p>
        </div>
      </section>
    </div>
  );
}
