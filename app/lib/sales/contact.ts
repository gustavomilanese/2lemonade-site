/** Contacto del estudio (landings de venta y demos interactivas). */
export const CONTACT_EMAIL = "hola@2lemonade.online";

/** Dígitos para `wa.me` sin + (AR móvil: 54 + 9 + 11 + número). */
export const WHATSAPP_WA_ME_DIGITS = "5491135669036";

export function whatsappLinkWithText(text: string): string {
  return `https://wa.me/${WHATSAPP_WA_ME_DIGITS}?text=${encodeURIComponent(text)}`;
}
