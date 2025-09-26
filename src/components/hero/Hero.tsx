import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div
            className="md:w-6/12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Petits travaux & montages — rapides, propres, garantis.
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Montage meubles, pose cabine douche, montage cuisine au forfait
              selon m², joints, petites réparations et plus. Devis gratuit et
              intervention sous 48h selon disponibilité.
            </p>
            <div className="mt-6 flex gap-4">
              <Link to="/booking">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition-colors"
                >
                  Réserver une intervention
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Voir les services
                </motion.button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="md:w-6/12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-full h-64 md:h-80 bg-gradient-to-br from-orange-200 to-orange-400 rounded-xl shadow-lg flex items-center justify-center">
              <p className="text-orange-800 font-semibold">
                Image de démonstration
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
