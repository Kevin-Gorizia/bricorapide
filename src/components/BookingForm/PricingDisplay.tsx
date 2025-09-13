import { motion } from "framer-motion";
import { HiCash, HiTruck, HiReceiptTax } from "react-icons/hi";
import {
  formatPrice,
  getServiceDescription,
  getServiceUnit,
  calculateTVA,
} from "../../utils/pricing";
import type { BookingFormData, PricingCalculation } from "../../types";

interface PricingDisplayProps {
  formData: BookingFormData;
  pricing: PricingCalculation;
}

export default function PricingDisplay({
  formData,
  pricing,
}: PricingDisplayProps) {
  const tvaAmount = calculateTVA(
    pricing.totalCents - calculateTVA(pricing.totalCents)
  );
  const htAmount = pricing.totalCents - tvaAmount;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-50 rounded-lg p-6"
    >
      <h4 className="text-lg font-semibold text-gray-900 mb-4">
        Estimation du coût
      </h4>

      {/* Service sélectionné */}
      <div className="mb-4 p-3 bg-white rounded border">
        <div className="flex items-center gap-2 mb-2">
          <HiCash className="w-4 h-4 text-orange-500" />
          <span className="font-medium text-gray-900">
            {getServiceDescription(formData.service)}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          {formData.service === "cuisine" && formData.surface > 0 && (
            <p>
              {formData.surface} m² × {formatPrice(30000)} ={" "}
              {formatPrice(pricing.basePriceCents)}
            </p>
          )}
          {formData.service !== "cuisine" && (
            <p>
              Forfait {getServiceUnit(formData.service)}:{" "}
              {formatPrice(pricing.basePriceCents)}
            </p>
          )}
        </div>
      </div>

      {/* Frais de déplacement */}
      {formData.distanceKm > 0 && (
        <div className="mb-4 p-3 bg-white rounded border">
          <div className="flex items-center gap-2 mb-2">
            <HiTruck className="w-4 h-4 text-orange-500" />
            <span className="font-medium text-gray-900">
              Frais de déplacement
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <p>
              {formData.distanceKm} km × {formatPrice(120)} ={" "}
              {formatPrice(pricing.distancePriceCents)}
            </p>
          </div>
        </div>
      )}

      {/* Détail des prix */}
      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Sous-total HT:</span>
          <span className="font-medium">{formatPrice(htAmount)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600 flex items-center gap-1">
            <HiReceiptTax className="w-3 h-3" />
            TVA (20%):
          </span>
          <span className="font-medium">{formatPrice(tvaAmount)}</span>
        </div>

        <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
          <span>Total TTC:</span>
          <span className="text-orange-600">
            {formatPrice(pricing.totalCents)}
          </span>
        </div>

        <div className="flex justify-between text-sm bg-orange-50 p-2 rounded">
          <span className="text-orange-800 font-medium">
            Acompte à régler (30%):
          </span>
          <span className="text-orange-800 font-bold">
            {formatPrice(pricing.acompteCents)}
          </span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Solde à régler après intervention:</span>
          <span className="font-medium">
            {formatPrice(pricing.totalCents - pricing.acompteCents)}
          </span>
        </div>
      </div>

      {/* Informations complémentaires */}
      <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
        <h5 className="font-medium text-blue-900 mb-1">À savoir:</h5>
        <ul className="text-blue-800 space-y-1">
          <li>• Devis gratuit et sans engagement</li>
          <li>• Intervention sous 48h selon disponibilité</li>
          <li>• Travaux garantis 1 an</li>
          <li>• Paiement du solde après réalisation</li>
        </ul>
      </div>
    </motion.div>
  );
}
