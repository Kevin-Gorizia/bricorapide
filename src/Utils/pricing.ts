import type { ServiceType, PricingCalculation } from "../types";

// Configuration des tarifs (en centimes pour éviter les erreurs de virgule flottante)
export const PRICING_CONFIG = {
  services: {
    meuble: 4000, // 40€
    douche: 12000, // 120€
    cuisine: 30000, // 300€ par m²
  },
  deplacement: 120, // 1.20€ par km
  acomptePercent: 0.3, // 30%
  tva: 0.2, // 20%
} as const;

/**
 * Calcule le prix total d'une intervention
 */
export function calculatePricing(
  service: ServiceType,
  surface: number = 0,
  distanceKm: number = 0
): PricingCalculation {
  // Prix de base selon le service
  let basePriceCents: number;

  switch (service) {
    case "meuble":
      basePriceCents = PRICING_CONFIG.services.meuble;
      break;
    case "douche":
      basePriceCents = PRICING_CONFIG.services.douche;
      break;
    case "cuisine":
      basePriceCents = PRICING_CONFIG.services.cuisine * Math.max(1, surface);
      break;
    default:
      throw new Error(`Service non reconnu: ${service}`);
  }

  // Prix du déplacement
  const distancePriceCents = Math.round(
    distanceKm * PRICING_CONFIG.deplacement
  );

  // Prix total HT
  const totalHTCents = basePriceCents + distancePriceCents;

  // Prix total TTC
  const totalCents = Math.round(totalHTCents * (1 + PRICING_CONFIG.tva));

  // Acompte
  const acompteCents = Math.round(totalCents * PRICING_CONFIG.acomptePercent);

  return {
    basePriceCents,
    distancePriceCents,
    totalCents,
    acompteCents,
  };
}

/**
 * Formate un prix en centimes vers une chaîne en euros
 */
export function formatPrice(priceCents: number): string {
  return (priceCents / 100).toFixed(2) + " €";
}

/**
 * Calcule la TVA d'un montant
 */
export function calculateTVA(amountHTCents: number): number {
  return Math.round(amountHTCents * PRICING_CONFIG.tva);
}

/**
 * Valide qu'un service nécessite une surface
 */
export function requiresSurface(service: ServiceType): boolean {
  return service === "cuisine";
}

/**
 * Obtient la description d'un service
 */
export function getServiceDescription(service: ServiceType): string {
  const descriptions = {
    meuble: "Montage de meubles",
    douche: "Pose de cabine de douche",
    cuisine: "Montage de cuisine (prix au m²)",
  };

  return descriptions[service];
}

/**
 * Obtient l'unité de tarification d'un service
 */
export function getServiceUnit(service: ServiceType): string {
  const units = {
    meuble: "forfait",
    douche: "forfait",
    cuisine: "m²",
  };

  return units[service];
}

// src/utils/pricing.ts

// (Removed duplicate calculatePricing function to avoid redeclaration error)
