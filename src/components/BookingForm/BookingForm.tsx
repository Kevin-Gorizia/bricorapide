import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { HiCalculator, HiCreditCard } from "react-icons/hi";
import { useNotification } from "../../contexts/NotificationContext";
import { useAuth } from "../../contexts/AuthContext";
import { validateBookingForm } from "../../utils/validation";
import { calculatePricing, formatPrice } from "../../utils/pricing";
import type { BookingFormData } from "../../types";
import BookingFormFields from "./BookingFormFields";
import PricingDisplay from "./PricingDisplay";
import PaymentSection from "./PaymentSection";
import Button from "../../components/ui/Button";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBKEY);

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    nom: "",
    email: "",
    telephone: "",
    service: "meuble",
    surface: 0,
    distanceKm: 0,
    adresse: "",
    description: "",
    datePreferee: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const { showError, showSuccess } = useNotification();
  const { isAuthenticated } = useAuth();

  // Calcul du prix en temps réel
  const pricing = calculatePricing(
    formData.service,
    formData.surface,
    formData.distanceKm
  );

  const handleFieldChange = (
    field: keyof BookingFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const validation = validateBookingForm(formData);

    if (!validation.success) {
      setErrors(validation.errors);
      showError("Veuillez corriger les erreurs dans le formulaire");
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      showError("Vous devez être connecté pour effectuer une réservation");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Ici, on pourrait envoyer les données au serveur pour validation
      // et préparation du paiement

      // Simuler un délai de traitement
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowPayment(true);
      showSuccess("Formulaire validé ! Procédez au paiement de l'acompte.");
    } catch {
      showError("Erreur lors de la validation du formulaire");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = () => {
    showSuccess(
      "Réservation confirmée ! Vous recevrez un email de confirmation."
    );
    // Réinitialiser le formulaire
    setFormData({
      nom: "",
      email: "",
      telephone: "",
      service: "meuble",
      surface: 0,
      distanceKm: 0,
      adresse: "",
      description: "",
      datePreferee: "",
    });
    setShowPayment(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Connexion requise
        </h3>
        <p className="text-gray-600 mb-6">
          Vous devez être connecté pour effectuer une réservation.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/login")}
          >
            Se connecter
          </Button>
          <Button onClick={() => (window.location.href = "/register")}>
            S'inscrire
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        {!showPayment ? (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Formulaire */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <HiCalculator className="w-5 h-5 text-orange-500" />
                  Détails de votre demande
                </h3>

                <BookingFormFields
                  formData={formData}
                  errors={errors}
                  onChange={handleFieldChange}
                />
              </div>

              {/* Récapitulatif et prix */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Récapitulatif
                </h3>

                <PricingDisplay formData={formData} pricing={pricing} />

                <div className="mt-8">
                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full"
                    leftIcon={<HiCreditCard className="w-5 h-5" />}
                  >
                    Procéder au paiement de l'acompte
                  </Button>

                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Acompte de {formatPrice(pricing.acompteCents)} requis pour
                    confirmer la réservation
                  </p>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <Elements stripe={stripePromise}>
            <PaymentSection
              formData={formData}
              pricing={pricing}
              onSuccess={handlePaymentSuccess}
              onCancel={() => setShowPayment(false)}
            />
          </Elements>
        )}
      </motion.div>
    </div>
  );
}
