import type { MockPresetId } from "@/app/lib/sales/mockPresetData";

export type SalesUseCase = {
  id: string;
  title: string;
  hook: string;
  bullets: string[];
  ctaHint: string;
  examplePresetId: MockPresetId;
  thumbCaption?: string;
  thumbPhotoSrc?: string;
};

export const SALES_USE_CASES: SalesUseCase[] = [
  {
    id: "restaurant",
    title: "Restaurante o bar",
    hook: "Te buscan en Maps o Instagram: carta, horarios y reserva o pedido sin depender del teléfono ocupado.",
    bullets: [
      "Lo importante arriba: carta, horarios y un botón que manda",
      "WhatsApp con mensaje armado: toca y envía",
      "Ubicación y horarios visibles al instante",
    ],
    ctaHint: "El cliente cierra en tu chat, no en la décima pestaña.",
    examplePresetId: "carpetcare",
    thumbCaption: "Ejemplo · gastronomía",
    thumbPhotoSrc:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=88",
  },
  {
    id: "salon",
    title: "Peluquería, estética o spa",
    hook: "Desde un reel o tu perfil: servicios, fotos y turno por WhatsApp sin idas y vueltas.",
    bullets: [
      "Precios y servicios en orden, sin marear",
      "Fotos que venden la experiencia",
      "Turno explícito + Instagram a un toque",
    ],
    ctaHint: "Menos “¿cómo reservo?” · más turnos confirmados.",
    examplePresetId: "barber",
  },
  {
    id: "startup",
    title: "Marca nueva o lanzamiento",
    hook: "Problema, solución y próximo paso claros: lista de espera, demo o contacto directo.",
    bullets: [
      "La promesa en la primera pantalla",
      "Prueba social o logos si ya los tenés",
      "Formulario o agenda en un solo clic",
    ],
    ctaHint: "Una visita, una acción: que dejen mail, agenda o mensaje.",
    examplePresetId: "motivarc",
    thumbCaption: "Ejemplo · servicio profesional",
  },
  {
    id: "social",
    title: "Vendés por Instagram o redes",
    hook: "Misma energía que tu feed: empuja a WhatsApp o a comprar sin perder identidad.",
    bullets: [
      "Texto corto, legible en el celular",
      "Botones alineados con tu objetivo",
      "Lista para crecer si metés pauta",
    ],
    ctaHint: "Del post al mensaje: menos pasos, más ventas.",
    examplePresetId: "acompanarte",
    thumbCaption: "Ejemplo · cuidado en casa",
  },
];

export const SALES_WHATSAPP_NOTE =
  "Los botones de WhatsApp pueden abrir el chat con el mensaje ya listo, para responder más rápido y con contexto.";
