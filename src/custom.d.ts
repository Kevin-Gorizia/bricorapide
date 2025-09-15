// src/custom.d.ts

// --- CSS/SCSS Modules ---
declare module "*.css" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "*.scss" {
  const classes: Record<string, string>;
  export default classes;
}

// --- SVG ---
declare module "*.svg" {
  const content: string;
  export default content;
}

// --- Fichiers JSX/TSX React ---
declare module "*.jsx" {
  import type { ComponentType, PropsWithChildren } from "react";
  const component: ComponentType<PropsWithChildren<unknown>>;
  export default component;
}

declare module "*.tsx" {
  import type { ComponentType, PropsWithChildren } from "react";
  const component: ComponentType<PropsWithChildren<unknown>>;
  export default component;
}

// --- Fichiers JS/TS React (si tu en as) ---
declare module "*.js" {
  import type { ComponentType, PropsWithChildren } from "react";
  const component: ComponentType<PropsWithChildren<unknown>>;
  export default component;
}

declare module "*.ts" {
  import type { ComponentType, PropsWithChildren } from "react";
  const component: ComponentType<PropsWithChildren<unknown>>;
  export default component;
}
