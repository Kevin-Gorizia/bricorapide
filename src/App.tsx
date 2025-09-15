import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  Phone,
  Mail,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import "./App.css";

// --- Header ---
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { to: "/services", label: "Services" },
    { to: "/pricing", label: "Tarifs" },
    { to: "/contact", label: "Contact" },
  ];

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              BR
            </motion.div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
                BricoRapide
              </h1>
              <p className="text-xs text-gray-500">
                Petits travaux & montages à domicile
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium relative ${
                  isActiveLink(item.to) ? "text-orange-500" : ""
                }`}
              >
                {item.label}
                {isActiveLink(item.to) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500"
                    layoutId="activeLink"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/booking">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors"
              >
                Réserver
              </motion.button>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Menu de navigation"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-4"
            >
              <nav className="flex flex-col gap-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`text-gray-700 hover:text-orange-500 transition-colors font-medium py-2 ${
                      isActiveLink(item.to) ? "text-orange-500" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link to="/booking" className="mt-4">
                  <button className="w-full px-6 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors">
                    Réserver
                  </button>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

// --- Hero ---
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

// --- BookingForm ---
function BookingForm() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    service: "",
    distance: "",
  });

  const [errors, setErrors] = useState<{ global?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      !formData.nom ||
      !formData.email ||
      !formData.telephone ||
      !formData.service
    ) {
      setErrors({ global: "Tous les champs sont requis" });
      return;
    }

    setIsSubmitting(true);
    // Simuler API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowPayment(true);
  };

  const handlePayment = async () => {
    setIsSubmitting(true);
    // Simuler paiement
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowPayment(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Réservation confirmée !
        </h3>
        <p className="text-gray-600 mb-6">
          Vous recevrez un email de confirmation sous peu.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setFormData({
              nom: "",
              email: "",
              telephone: "",
              service: "",
              distance: "",
            });
          }}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Nouvelle réservation
        </button>
      </motion.div>
    );
  }

  if (showPayment) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setShowPayment(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            ←
          </button>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-orange-500" />
            Paiement sécurisé
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              Récapitulatif
            </h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium">{formData.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Distance:</span>
                <span className="font-medium">{formData.distance || 0} km</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total TTC:</span>
                  <span>120,00 €</span>
                </div>
                <div className="flex justify-between text-orange-600 font-bold">
                  <span>Acompte (30%):</span>
                  <span>36,00 €</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Paiement</h4>
            <div className="space-y-4">
              <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600">
                  Simulation de paiement Stripe
                </p>
              </div>
              <button
                onClick={handlePayment}
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Traitement...
                  </>
                ) : (
                  "Payer 36,00 €"
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Réservation</h3>

      {errors.global && <p className="text-red-500 mb-3">{errors.global}</p>}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom complet *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => handleChange("nom", e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              value={formData.telephone}
              onChange={(e) => handleChange("telephone", e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service *
          </label>
          <select
            value={formData.service}
            onChange={(e) => handleChange("service", e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Sélectionner un service</option>
            <option value="plomberie">Plomberie</option>
            <option value="électricité">Électricité</option>
            <option value="menuiserie">Menuiserie</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
      >
        {isSubmitting ? "Traitement..." : "Réserver"}
      </button>
    </motion.form>
  );
}

// --- App ---
function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <BookingForm />
    </div>
  );
}

export default App;
