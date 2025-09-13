/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { HiArrowLeft, HiLockClosed, HiCreditCard } from "react-icons/hi";
import { useNotification } from "../../contexts/UseNotification";
import { useAuth } from "../../contexts/AuthContext";
import { formatPrice } from "../../utils/pricing";
import type { BookingFormData, PricingCalculation } from "../../types";
import api from "../../lib/api";
import Button from "../ui/Button";

interface PaymentSectionProps {
  formData: BookingFormData;
  pricing: PricingCalculation;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PaymentSection({
  formData,
  pricing,
  onSuccess,
  onCancel,
}: PaymentSectionProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { showError } = useNotification();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !user) {
      showError("Erreur de configuration du paiement");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      showError("Élément de carte non trouvé");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Créer l'intention de paiement côté serveur
      const { data } = await api.post("/payments/create-payment-intent", {
        amountCents: pricing.acompteCents,
        currency: "eur",
        metadata: {
          service: formData.service,
          surface: formData.surface,
          distanceKm: formData.distanceKm,
          clientEmail: formData.email,
          clientNom: formData.nom,
        },
      });

      // 2. Confirmer le paiement avec Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formData.nom,
              email: formData.email,
              phone: formData.telephone,
              address: {
                line1: formData.adresse,
              },
            },
          },
        }
      );

      if (error) {
        showError(error.message || "Erreur lors du paiement");
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        // 3. Créer la réservation côté serveur
        await api.post("/reservations", {
          nomClient: formData.nom,
          emailClient: formData.email,
          telephone: formData.telephone,
          service: formData.service,
          surface: formData.surface,
          distanceKm: formData.distanceKm,
          adresse: formData.adresse,
          description: formData.description,
          datePreferee: formData.datePreferee,
          amountCents: pricing.totalCents,
          acompteCents: pricing.acompteCents,
          stripePaymentIntentId: paymentIntent.id,
        });

        onSuccess();
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Erreur lors du traitement de la réservation";
      showError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
        fontFamily: "system-ui, -apple-system, sans-serif",
      },
      invalid: {
        color: "#9e2146",
      },
    },
    hidePostalCode: true,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onCancel}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Retour au formulaire"
        >
          <HiArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <HiCreditCard className="w-5 h-5 text-orange-500" />
          Paiement sécurisé
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Récapitulatif de la commande */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Récapitulatif de votre réservation
          </h4>

          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium">{formData.service}</span>
            </div>

            {formData.surface > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Surface:</span>
                <span className="font-medium">{formData.surface} m²</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-gray-600">Distance:</span>
              <span className="font-medium">{formData.distanceKm} km</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Date préférée:</span>
              <span className="font-medium">
                {new Date(formData.datePreferee).toLocaleDateString("fr-FR")}
              </span>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total TTC:</span>
                <span>{formatPrice(pricing.totalCents)}</span>
              </div>

              <div className="flex justify-between text-orange-600 font-bold">
                <span>Acompte à régler:</span>
                <span>{formatPrice(pricing.acompteCents)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire de paiement */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Informations de paiement
          </h4>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Informations de carte bancaire
              </label>
              <div className="p-3 border border-gray-300 rounded-lg bg-white">
                <CardElement options={cardElementOptions} />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HiLockClosed className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  Paiement 100% sécurisé
                </span>
              </div>
              <p className="text-xs text-blue-800">
                Vos informations de paiement sont chiffrées et sécurisées par
                Stripe. Nous ne stockons aucune information bancaire.
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              isLoading={isProcessing}
              disabled={!stripe || isProcessing}
              className="w-full"
            >
              {isProcessing
                ? "Traitement en cours..."
                : `Payer ${formatPrice(pricing.acompteCents)}`}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              En confirmant votre paiement, vous acceptez nos conditions
              générales de vente. Le solde de{" "}
              {formatPrice(pricing.totalCents - pricing.acompteCents)} sera à
              régler après intervention.
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
