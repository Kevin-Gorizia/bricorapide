import {
  HiUser,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiCalendar,
} from "react-icons/hi";
import { requiresSurface, getServiceDescription } from "../../utils/pricing";
import type { BookingFormData, ServiceType } from "../../types";
import Input from "../ui/Input";

interface BookingFormFieldsProps {
  formData: BookingFormData;
  errors: Record<string, string>;
  onChange: (field: keyof BookingFormData, value: string | number) => void;
}

export default function BookingFormFields({
  formData,
  errors,
  onChange,
}: BookingFormFieldsProps) {
  const serviceOptions: { value: ServiceType; label: string }[] = [
    { value: "meuble", label: "Montage de meubles" },
    { value: "douche", label: "Pose de cabine de douche" },
    { value: "cuisine", label: "Montage de cuisine" },
  ];

  // Date minimum (aujourd'hui)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      {/* Informations personnelles */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          Informations personnelles
        </h4>

        <div className="space-y-4">
          <Input
            label="Nom complet"
            value={formData.nom}
            onChange={(e) => onChange("nom", e.target.value)}
            error={errors.nom}
            leftIcon={<HiUser className="w-4 h-4" />}
            isRequired
            placeholder="Votre nom et prénom"
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            error={errors.email}
            leftIcon={<HiMail className="w-4 h-4" />}
            isRequired
            placeholder="votre@email.com"
          />

          <Input
            label="Téléphone"
            type="tel"
            value={formData.telephone}
            onChange={(e) => onChange("telephone", e.target.value)}
            error={errors.telephone}
            leftIcon={<HiPhone className="w-4 h-4" />}
            isRequired
            placeholder="06 12 34 56 78"
          />
        </div>
      </div>

      {/* Détails de l'intervention */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          Détails de l'intervention
        </h4>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type de service <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.service}
              onChange={(e) =>
                onChange("service", e.target.value as ServiceType)
              }
              className={`
                w-full px-3 py-2 border rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                transition-colors duration-200
                ${errors.service ? "border-red-500" : "border-gray-300"}
              `}
              aria-invalid={!!errors.service}
            >
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.service}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {getServiceDescription(formData.service)}
            </p>
          </div>

          {requiresSurface(formData.service) && (
            <Input
              label="Surface (m²)"
              type="number"
              min="1"
              max="1000"
              value={formData.surface || ""}
              onChange={(e) => onChange("surface", Number(e.target.value))}
              error={errors.surface}
              isRequired
              placeholder="Ex: 15"
              helperText="Surface de la cuisine en mètres carrés"
            />
          )}

          <Input
            label="Distance depuis Votre localisation (km)"
            type="number"
            min="0"
            max="200"
            step="0.1"
            value={formData.distanceKm || ""}
            onChange={(e) => onChange("distanceKm", Number(e.target.value))}
            error={errors.distanceKm}
            isRequired
            placeholder="Ex: 15.5"
            helperText="Distance approximative pour calculer les frais de déplacement"
          />

          <Input
            label="Adresse d'intervention"
            value={formData.adresse}
            onChange={(e) => onChange("adresse", e.target.value)}
            error={errors.adresse}
            leftIcon={<HiLocationMarker className="w-4 h-4" />}
            isRequired
            placeholder="123 Rue de la Paix, 75001 Paris"
          />

          <Input
            label="Date préférée"
            type="date"
            min={today}
            value={formData.datePreferee}
            onChange={(e) => onChange("datePreferee", e.target.value)}
            error={errors.datePreferee}
            leftIcon={<HiCalendar className="w-4 h-4" />}
            isRequired
            helperText="Nous vous contacterons pour confirmer la disponibilité"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description complémentaire
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => onChange("description", e.target.value)}
              rows={4}
              maxLength={1000}
              className={`
                w-full px-3 py-2 border rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                transition-colors duration-200 resize-vertical
                ${errors.description ? "border-red-500" : "border-gray-300"}
              `}
              placeholder="Décrivez votre projet, vos contraintes particulières, etc."
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.description}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {formData.description.length}/1000 caractères
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
