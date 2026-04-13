import { WHATSAPP_WA_ME_DIGITS } from "./contact";

export type MockPresetId = "motivarc" | "carpetcare" | "barber" | "acompanarte";

function wa(text: string) {
  return `https://wa.me/${WHATSAPP_WA_ME_DIGITS}?text=${encodeURIComponent(text)}`;
}

/** Mensaje libre a la misma línea WhatsApp (p. ej. formulario de turno). */
export function demoWhatsAppWithMessage(text: string) {
  return `https://wa.me/${WHATSAPP_WA_ME_DIGITS}?text=${encodeURIComponent(text)}`;
}

export type MockPresetContent = {
  id: MockPresetId;
  label: string;
  domain: string;
  siteHref: string;
  heroImage: string;
  heroOverlay: string;
  heroEyebrow: string;
  heroEyebrowClass: string;
  heroTitle: string;
  heroTitleClass: string;
  heroSub: string;
  heroSubClass: string;
  primaryCta: string;
  primaryHref: string;
  primaryBtnClass: string;
  secondaryCta: string;
  waHref: string;
  servicesTitle: string;
  servicesTitleClass: string;
  services: [string, string, string];
  serviceImages: [string, string, string];
  galleryImages: [string, string, string, string];
  waLabel: string;
  footerTitle: string;
  footerLines: [string, string];
  mapsLabel: string;
  mapsHref: string;
  progressClass: string;
  accentRing: string;
  waBtnClass: string;
  mapsBtnClass: string;
  cardInner: string;
  footerShell: string;
  screenshotSrc?: string;
  screenshotWidth?: number;
  screenshotHeight?: number;
};

const CLEAN_IMG =
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=88";
const HOME_IMG =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=88";
const OFFICE_IMG =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=88";
const CLEAN_400 =
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=82";
const HOME_400 =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=82";
const OFFICE_400 =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=82";
const CLEAN_320 =
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=320&q=80";
const HOME_320 =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=320&q=80";
const OFFICE_320 =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=320&q=80";

const WELL_A =
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=88";
const WELL_B =
  "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=88";
const WELL_C =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=88";
const WELL_A_400 =
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=82";
const WELL_B_400 =
  "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=400&q=82";
const WELL_C_400 =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=82";
const WELL_A_320 =
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=320&q=80";
const WELL_B_320 =
  "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=320&q=80";
const WELL_C_320 =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=320&q=80";

export const MOCK_PRESETS: Record<MockPresetId, MockPresetContent> = {
  motivarc: {
    id: "motivarc",
    label: "MotivarCare",
    domain: "motivarc.care",
    siteHref: "https://www.instagram.com/explore/tags/saludmental/",
    screenshotSrc: "/landings/motivarc-terapia-online.png",
    screenshotWidth: 802,
    screenshotHeight: 2000,
    heroImage:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=88",
    heroOverlay: "bg-gradient-to-t from-sky-950/85 via-teal-900/40 to-cyan-900/15",
    heroEyebrow: "Terapia online · lic. en psicología",
    heroEyebrowClass: "text-cyan-100 drop-shadow-md",
    heroTitle: "MotivarCare",
    heroTitleClass: "text-white drop-shadow-lg",
    heroSub: "Sesiones seguras por videollamada — reservá tu primera consulta",
    heroSubClass: "text-sky-50/95 drop-shadow",
    primaryCta: "Conocer servicios",
    primaryHref: "https://www.instagram.com/explore/tags/terapiaonline/",
    primaryBtnClass:
      "bg-gradient-to-r from-teal-500 to-sky-600 font-bold text-white shadow-[0_6px_20px_rgba(20,184,166,0.35)] ring-1 ring-white/30 hover:brightness-110 active:scale-[0.98]",
    secondaryCta: "WhatsApp",
    waHref: wa("Hola MotivarCare, quiero consultar por terapia online"),
    servicesTitle: "Enfoques",
    servicesTitleClass: "text-teal-800",
    services: ["Ansiedad", "Gestión del estrés", "Acompañamiento"],
    serviceImages: [
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=82",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=82",
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=400&q=82",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=320&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=320&q=80",
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=320&q=80",
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=320&q=80",
    ],
    waLabel: "Escribir por WhatsApp",
    footerTitle: "Turnos · Modalidad online",
    footerLines: ["Lun–Vie con cita previa", "Argentina · cobertura nacional"],
    mapsLabel: "Ver en Instagram",
    mapsHref: "https://www.instagram.com/explore/tags/terapiaonline/",
    progressClass: "bg-gradient-to-r from-teal-400 to-sky-500",
    accentRing: "ring-teal-400/45",
    waBtnClass:
      "bg-gradient-to-r from-[#128C7E] to-teal-600 shadow-[0_6px_20px_rgba(20,184,166,0.35)] ring-1 ring-white/25 hover:brightness-110",
    mapsBtnClass:
      "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md ring-1 ring-sky-300/35",
    cardInner: "bg-white ring-1 ring-teal-200/80 shadow-[0_10px_40px_rgba(15,118,110,0.12)]",
    footerShell: "border-teal-200/70 bg-gradient-to-b from-sky-50/90 to-teal-50/40",
  },
  carpetcare: {
    id: "carpetcare",
    label: "Pristine Carpet Care",
    domain: "pristinecarpet.care",
    siteHref: "https://www.instagram.com/explore/tags/carpetcleaning/",
    screenshotSrc: "/landings/pristine-carpet-care.png",
    screenshotWidth: 823,
    screenshotHeight: 2000,
    heroImage: CLEAN_IMG,
    heroOverlay: "bg-gradient-to-t from-slate-900/88 via-sky-900/45 to-cyan-800/15",
    heroEyebrow: "Rugs · wall-to-wall · commercial",
    heroEyebrowClass: "text-sky-200 drop-shadow-md",
    heroTitle: "Pristine Carpet Care",
    heroTitleClass: "text-white drop-shadow-lg",
    heroSub: "Steam, stain treatment & deodorizing — free on-site estimates",
    heroSubClass: "text-sky-100/95 drop-shadow",
    primaryCta: "See work (IG)",
    primaryHref: "https://www.instagram.com/explore/tags/carpetcleaning/",
    primaryBtnClass:
      "bg-gradient-to-r from-sky-500 to-blue-600 font-bold text-white shadow-[0_6px_20px_rgba(14,165,233,0.35)] ring-1 ring-white/30 hover:brightness-110 active:scale-[0.98]",
    secondaryCta: "WhatsApp",
    waHref: wa("Hi Pristine Carpet Care, I'd like a quote for rug / carpet cleaning"),
    servicesTitle: "Services",
    servicesTitleClass: "text-sky-900",
    services: ["Deep steam", "Stain shield", "Office & home"],
    serviceImages: [CLEAN_400, HOME_400, OFFICE_400],
    galleryImages: [CLEAN_320, HOME_320, OFFICE_320, CLEAN_320],
    waLabel: "Get a quote · WhatsApp",
    footerTitle: "Coverage · Hours",
    footerLines: ["Mon–Sat 8:00–19:00", "Book a slot — we come to you"],
    mapsLabel: "Area served · Maps",
    mapsHref: "https://www.google.com/maps/search/?api=1&query=carpet+cleaning+Buenos+Aires",
    progressClass: "bg-gradient-to-r from-sky-400 to-blue-500",
    accentRing: "ring-sky-400/45",
    waBtnClass:
      "bg-gradient-to-r from-[#128C7E] to-sky-600 shadow-[0_6px_20px_rgba(14,165,233,0.35)] ring-1 ring-white/20 hover:brightness-110",
    mapsBtnClass:
      "bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md ring-1 ring-indigo-300/35",
    cardInner: "bg-white ring-1 ring-sky-200/80 shadow-[0_10px_40px_rgba(14,165,233,0.12)]",
    footerShell: "border-sky-200/70 bg-gradient-to-b from-sky-50/90 to-white",
  },
  barber: {
    id: "barber",
    label: "Barbería",
    domain: "nortebarber.ar",
    siteHref: "https://www.instagram.com/explore/tags/barberia/",
    heroImage:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=88",
    heroOverlay: "bg-gradient-to-t from-black/85 via-black/45 to-black/20",
    heroEyebrow: "Fade · barba con navaja · citas",
    heroEyebrowClass: "text-amber-300 drop-shadow-md",
    heroTitle: "Norte Barber",
    heroTitleClass: "text-white drop-shadow-lg",
    heroSub: "Reservá turno — te pasamos la dirección por WhatsApp",
    heroSubClass: "text-amber-100/95 drop-shadow",
    primaryCta: "Ver Instagram",
    primaryHref: "https://www.instagram.com/explore/tags/barbershop/",
    primaryBtnClass:
      "bg-gradient-to-b from-amber-300 to-amber-500 font-black text-zinc-900 shadow-[0_4px_14px_rgba(217,119,6,0.45)] ring-1 ring-amber-200/80 hover:brightness-105 active:scale-[0.98]",
    secondaryCta: "WhatsApp",
    waHref: wa("Hola, quiero turno en Norte Barber"),
    servicesTitle: "Servicios",
    servicesTitleClass: "text-zinc-600",
    services: ["Corte + degradé", "Barba & perfilado", "Combo full"],
    serviceImages: [
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=400&q=82",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=400&q=82",
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=400&q=82",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=320&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=320&q=80",
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=320&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=320&q=80",
    ],
    waLabel: "Reservar por WhatsApp",
    footerTitle: "Horario · Sillón",
    footerLines: ["Mar–Sáb 10:00–20:00", "Palermo, CABA"],
    mapsLabel: "Abrir en Google Maps",
    mapsHref: "https://www.google.com/maps/search/?api=1&query=Palermo,+Buenos+Aires",
    progressClass: "bg-gradient-to-r from-amber-400 to-amber-600",
    accentRing: "ring-amber-500/40",
    waBtnClass:
      "bg-[#128C7E] shadow-[0_6px_20px_rgba(18,140,126,0.45)] ring-1 ring-white/20 hover:brightness-110 active:scale-[0.99]",
    mapsBtnClass:
      "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md ring-1 ring-sky-400/40 hover:brightness-110",
    cardInner: "bg-white ring-1 ring-zinc-200/90 shadow-[0_8px_30px_rgba(15,23,42,0.08)]",
    footerShell: "border-zinc-200/80 bg-gradient-to-b from-zinc-50 to-white shadow-inner",
  },
  acompanarte: {
    id: "acompanarte",
    label: "Acompañarte",
    domain: "acompanarte.care",
    siteHref: "https://www.instagram.com/explore/tags/cuidadoadultomayor/",
    screenshotSrc: "/landings/acompanarte-senior-care.png",
    screenshotWidth: 607,
    screenshotHeight: 2000,
    heroImage: WELL_A,
    heroOverlay: "bg-gradient-to-t from-rose-950/88 via-amber-900/40 to-orange-900/12",
    heroEyebrow: "Adultos mayores · acompañamiento · hogar",
    heroEyebrowClass: "text-amber-100 drop-shadow-md",
    heroTitle: "Acompañarte",
    heroTitleClass: "text-white drop-shadow-lg",
    heroSub: "Cuidado humano a domicilio — coordinamos visitas y seguimiento familiar",
    heroSubClass: "text-rose-50/95 drop-shadow",
    primaryCta: "Ver experiencias",
    primaryHref: "https://www.instagram.com/explore/tags/gerontologia/",
    primaryBtnClass:
      "bg-gradient-to-r from-rose-500 to-amber-600 font-bold text-white shadow-[0_6px_20px_rgba(225,29,72,0.3)] ring-1 ring-white/30 hover:brightness-110 active:scale-[0.98]",
    secondaryCta: "WhatsApp",
    waHref: wa("Hola Acompañarte, quiero información sobre cuidado a domicilio"),
    servicesTitle: "Servicios",
    servicesTitleClass: "text-rose-900",
    services: ["Compañía diaria", "Higiene & movilidad", "Derivaciones"],
    serviceImages: [WELL_A_400, WELL_B_400, WELL_C_400],
    galleryImages: [WELL_A_320, WELL_B_320, WELL_C_320, WELL_A_320],
    waLabel: "Coordinar por WhatsApp",
    footerTitle: "Cobertura · Turnos",
    footerLines: ["Consultá tu zona y franjas", "Equipo con referencias verificables"],
    mapsLabel: "Cómo llegamos · Maps",
    mapsHref: "https://www.google.com/maps/search/?api=1&query=cuidado+adultos+mayores+domicilio+CABA",
    progressClass: "bg-gradient-to-r from-rose-400 to-amber-500",
    accentRing: "ring-rose-400/40",
    waBtnClass:
      "bg-gradient-to-r from-[#128C7E] to-rose-600 shadow-[0_6px_20px_rgba(225,29,72,0.25)] ring-1 ring-white/20 hover:brightness-110",
    mapsBtnClass:
      "bg-gradient-to-r from-amber-600 to-rose-700 text-white shadow-md ring-1 ring-amber-300/40",
    cardInner: "bg-white ring-1 ring-rose-200/80 shadow-[0_10px_40px_rgba(190,18,60,0.1)]",
    footerShell: "border-rose-200/70 bg-gradient-to-b from-rose-50/90 to-amber-50/50",
  },
};
