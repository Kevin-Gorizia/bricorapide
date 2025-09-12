import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "./App.css";

// Composant Header amélioré
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { to: "/services", label: "Services" },
    { to: "/pricing", label: "Tarifs" },
    { to: "/contact", label: "Contact" },
  ];

  const isActiveLink = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
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

          {/* Navigation desktop */}
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

          {/* Actions desktop */}
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

          {/* Menu mobile toggle */}
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

        {/* Menu mobile */}
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

// Composant Hero amélioré
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

// Composant de formulaire de réservation amélioré
function BookingForm() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    service: "meuble",
    surface: "",
    distance: "",
    adresse: "",
    description: "",
    datePreferee: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    if (!formData.telephone.trim())
      newErrors.telephone = "Le téléphone est requis";
    if (!formData.adresse.trim()) newErrors.adresse = "L'adresse est requise";
    if (!formData.datePreferee) newErrors.datePreferee = "La date est requise";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulation d'un appel API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowPayment(true);
  };

  const handlePayment = async () => {
    setIsSubmitting(true);

    // Simulation du paiement
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
              service: "meuble",
              surface: "",
              distance: "",
              adresse: "",
              description: "",
              datePreferee: "",
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
                <span className="font-medium">{formData.distance} km</span>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Détails de votre demande
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={(e) => handleChange("nom", e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.nom ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Votre nom et prénom"
                  />
                </div>
                {errors.nom && (
                  <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="votre@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => handleChange("telephone", e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.telephone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="06 12 34 56 78"
                  />
                </div>
                {errors.telephone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.telephone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => handleChange("service", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="meuble">Montage de meubles</option>
                  <option value="douche">Pose de cabine de douche</option>
                  <option value="cuisine">Montage de cuisine</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Distance (km) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.distance}
                  onChange={(e) => handleChange("distance", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="15"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.adresse}
                    onChange={(e) => handleChange("adresse", e.target.value)}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.adresse ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="123 Rue de la Paix, 75001 Paris"
                  />
                </div>
                {errors.adresse && (
                  <p className="mt-1 text-sm text-red-600">{errors.adresse}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date préférée <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={formData.datePreferee}
                    onChange={(e) =>
                      handleChange("datePreferee", e.target.value)
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.datePreferee ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.datePreferee && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.datePreferee}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Récapitulatif
            </h3>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Estimation du coût
              </h4>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service de base:</span>
                  <span className="font-medium">40,00 €</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Déplacement:</span>
                  <span className="font-medium">18,00 €</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">TVA (20%):</span>
                  <span className="font-medium">11,60 €</span>
                </div>

                <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
                  <span>Total TTC:</span>
                  <span className="text-orange-600">69,60 €</span>
                </div>

                <div className="flex justify-between text-sm bg-orange-50 p-2 rounded">
                  <span className="text-orange-800 font-medium">
                    Acompte (30%):
                  </span>
                  <span className="text-orange-800 font-bold">20,88 €</span>
                </div>
              </div>

              <div className="mt-6 p-3 bg-blue-50 rounded text-sm">
                <h5 className="font-medium text-blue-900 mb-1">À savoir:</h5>
                <ul className="text-blue-800 space-y-1">
                  <li>• Devis gratuit et sans engagement</li>
                  <li>• Intervention sous 48h</li>
                  <li>• Travaux garantis 1 an</li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Validation...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Procéder au paiement
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

// Pages
function HomePage() {
  return (
    <div>
      <Hero />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nos services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Montage meubles",
                price: "40€",
                description: "Montage professionnel de tous types de meubles",
              },
              {
                title: "Pose cabine douche",
                price: "120€",
                description: "Installation complète de votre cabine de douche",
              },
              {
                title: "Montage cuisine",
                price: "300€/m²",
                description: "Montage complet de votre cuisine équipée",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-2xl font-bold text-orange-500 mb-4">
                  {service.price}
                </p>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Nos Services</h1>
        <p className="text-lg text-gray-600 mb-12">
          Découvrez notre gamme complète de services de bricolage et montage à
          domicile.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Montage de meubles",
              icon: "🪑",
              description:
                "Montage professionnel de tous types de meubles IKEA, Conforama, etc.",
            },
            {
              title: "Pose cabine de douche",
              icon: "🚿",
              description:
                "Installation complète de votre cabine de douche avec étanchéité garantie",
            },
            {
              title: "Montage cuisine",
              icon: "🏠",
              description:
                "Montage complet de votre cuisine équipée, plan de travail inclus",
            },
            {
              title: "Petites réparations",
              icon: "🔧",
              description:
                "Réparations diverses : robinetterie, serrurerie, électricité",
            },
            {
              title: "Pose de joints",
              icon: "🔨",
              description:
                "Réfection de joints salle de bain, cuisine, fenêtres",
            },
            {
              title: "Fixations murales",
              icon: "📺",
              description: "Fixation TV, étagères, miroirs, tableaux",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Nos Tarifs</h1>
        <p className="text-lg text-gray-600 mb-12">
          Tarifs transparents et compétitifs pour tous nos services.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Montage meubles",
              price: "40€",
              features: [
                "Forfait par meuble",
                "Outils inclus",
                "Garantie 1 an",
                "Nettoyage inclus",
              ],
            },
            {
              title: "Pose cabine douche",
              price: "120€",
              features: [
                "Installation complète",
                "Étanchéité garantie",
                "Test de fonctionnement",
                "Garantie 2 ans",
              ],
            },
            {
              title: "Montage cuisine",
              price: "300€/m²",
              features: [
                "Prix au m²",
                "Plan de travail inclus",
                "Raccordements inclus",
                "Garantie 2 ans",
              ],
            },
          ].map((pricing, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg border-2 border-gray-200 hover:border-orange-500 transition-colors"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {pricing.title}
              </h3>
              <div className="text-4xl font-bold text-orange-500 mb-6">
                {pricing.price}
              </div>
              <ul className="space-y-3">
                {pricing.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/booking" className="block mt-8">
                <button className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  Réserver
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Informations importantes
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Frais de déplacement
              </h4>
              <p className="text-gray-600">
                1,20€ par kilomètre depuis notre base
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Acompte</h4>
              <p className="text-gray-600">
                30% à la réservation, solde après intervention
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Devis</h4>
              <p className="text-gray-600">Gratuit et sans engagement</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Délai</h4>
              <p className="text-gray-600">
                Intervention sous 48h selon disponibilité
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Nous contacter
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="font-semibold">Téléphone</p>
                  <p className="text-gray-600">06 12 34 56 78</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">contact@bricorapide.fr</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="font-semibold">Zone d'intervention</p>
                  <p className="text-gray-600">
                    Paris et région parisienne (200km max)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Horaires
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span>8h00 - 18h00</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi</span>
                <span>9h00 - 17h00</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche</span>
                <span>Sur demande</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Réservation
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Remplissez le formulaire ci-dessous pour réserver votre intervention.
        </p>
        <BookingForm />
      </motion.div>
    </div>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>© 2024 BricoRapide. Tous droits réservés.</p>
          <nav className="flex gap-6 mt-4 md:mt-0">
            <Link
              to="/services"
              className="hover:text-orange-500 transition-colors"
            >
              Services
            </Link>
            <Link
              to="/pricing"
              className="hover:text-orange-500 transition-colors"
            >
              Tarifs
            </Link>
            <Link
              to="/contact"
              className="hover:text-orange-500 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

// App principal
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
