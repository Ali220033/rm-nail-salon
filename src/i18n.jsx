import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export const LANGUAGES = [
  { code: "en", label: "ENG", name: "English" },
  { code: "ru", label: "RU", name: "Русский" },
  { code: "es", label: "ES", name: "Español" }
];

const LANGUAGE_STORAGE_KEY = "rm-language";

const exactTranslations = {
  ru: {
    Home: "Главная",
    Services: "Услуги",
    "Russian Manicure": "Русский маникюр",
    About: "О нас",
    Gallery: "Галерея",
    Journal: "Журнал",
    Reviews: "Отзывы",
    FAQ: "FAQ",
    Contact: "Контакты",
    "Book Now": "Записаться",
    "Book Appointment": "Записаться",
    "View Services": "Услуги",
    "Explore Services": "Посмотреть услуги",
    "View All Services": "Все услуги",
    Instagram: "Instagram",
    "View availability on Booksy": "Посмотреть время в Booksy",
    Book: "Запись",
    Now: "сейчас",
    "10% OFF": "10% скидка",
    "First Visit": "Первый визит",
    "First visit": "Первый визит",
    "Learn More": "Подробнее",
    "Book This Look": "Записаться на этот образ",
    "Book This Service": "Записаться на услугу",
    "Book on Booksy": "Записаться в Booksy",
    "Finish Booking on Booksy": "Завершить запись в Booksy",
    "See Reviews": "Смотреть отзывы",
    "Read Reviews on Booksy": "Отзывы в Booksy",
    "Open in Maps": "Открыть карту",
    "View Map": "Карта",
    "Call Us": "Позвонить",
    Email: "Email",
    "Business Hours": "Часы работы",
    Daily: "Ежедневно",
    "Every day": "Ежедневно",
    "Daily 9:30 AM - 7:30 PM": "Ежедневно 9:30 - 19:30",
    "Every day: 9:30 AM - 7:30 PM": "Ежедневно: 9:30 - 19:30",
    "Midtown NYC / Russian Manicure": "Midtown NYC / русский маникюр",
    "MIDTOWN NYC / RUSSIAN MANICURE": "MIDTOWN NYC / РУССКИЙ МАНИКЮР",
    "SIGNATURE SERVICES": "ОСНОВНЫЕ УСЛУГИ",
    "CONVENIENT FOR CLIENTS FROM": "УДОБНО ДЛЯ КЛИЕНТОВ ИЗ",
    "TRUST & EDUCATION": "ДОВЕРИЕ И ЗНАНИЯ",
    "One RM location: 875 3rd Ave, Concourse Level, New York, NY 10022.":
      "Одна локация RM: 875 3rd Ave, Concourse Level, New York, NY 10022.",
    "Midtown East": "Midtown East",
    "Grand Central": "Grand Central",
    "Sutton Place": "Sutton Place",
    "Rockefeller Center": "Rockefeller Center",
    "Fifth Avenue": "Fifth Avenue",
    "Russian Manicure NYC": "Русский маникюр NYC",
    "Hard Gel NYC": "Hard gel NYC",
    "Gel Manicure Midtown NYC": "Гель-маникюр Midtown NYC",
    "Smart Pedicure NYC": "Smart педикюр NYC",
    "Pedicure Midtown NYC": "Педикюр Midtown NYC",
    "Gel Extensions NYC": "Гелевое наращивание NYC",
    "Builder Gel NYC": "Builder gel NYC",
    "Nail Art NYC": "Nail art NYC",
    "Meet the Artists": "Мастера",
    "Sterilization Process": "Стерилизация",
    "Russian vs Regular": "Русский vs обычный",
    "Hard Gel Longevity": "Стойкость hard gel",
    "Russian Manicure Safety": "Безопасность русского маникюра",
    "Copyright 2026 RM Nail Salon": "Copyright 2026 RM Nail Salon",
    "Back to top": "Наверх",

    "Manhattan's Luxury Russian Manicure Experience": "Люксовый русский маникюр в Manhattan",
    "Midtown's Luxury Russian Manicure Studio": "Люксовая студия русского маникюра в Midtown",
    "Russian Manicure in Midtown NYC": "Русский маникюр в Midtown NYC",
    "Precision Russian manicure, hard gel, smart pedicure, and nail art at 875 3rd Ave.":
      "Точный русский маникюр, hard gel, smart педикюр и nail art по адресу 875 3rd Ave.",
    "Precision. Hygiene. Long-lasting beauty.": "Точность. Гигиена. Долговечная красота.",
    "Book in 20 seconds": "Запись за 20 секунд",
    "5.0 Booksy rating": "Рейтинг Booksy 5.0",
    "7 client reviews": "7 отзывов клиентов",
    "A short glimpse into the RM process.": "Короткий взгляд на процесс RM.",
    "A bright cyan studio moment that shows the calm, precise hand work behind a polished Russian manicure.":
      "Яркий cyan-момент студии, показывающий спокойную и точную работу мастера за безупречным русским маникюром.",
    "Your next manicure should feel different.": "Ваш следующий маникюр должен ощущаться иначе.",
    "Ready for your best manicure?": "Готовы к своему лучшему маникюру?",
    "Message on Instagram": "Написать в Instagram",

    "Manicure": "Маникюр",
    "Pedicure": "Педикюр",
    "Combo Services": "Комбо услуги",
    "Add-ons & Designs": "Дизайны и дополнения",
    "Removal & Repair": "Снятие и ремонт",
    "Russian Manicure (no polish/regular polish)": "Русский маникюр (без покрытия/обычный лак)",
    "Russian Manicure (Hard gel)": "Русский маникюр (hard gel)",
    "Men's Manicure (no polish)": "Мужской маникюр (без покрытия)",
    "Men's Manicure": "Мужской маникюр",
    "Japanese Manicure (clear)": "Японский маникюр (прозрачный)",
    "Japanese Care": "Японский уход",
    "Russian Nail Extensions": "Русское наращивание ногтей",
    Extensions: "Наращивание",
    "Fill-in (correction of extended nails)": "Коррекция наращенных ногтей",
    "Smart Pedicure": "Smart педикюр",
    "Russian Smart Pedicure w/no regular polish": "Русский smart педикюр без/с обычным лаком",
    "Russian Smart Gel Pedicure": "Русский smart gel педикюр",
    "Smart Gel Pedicure": "Smart gel педикюр",
    "No polish Manicure + Regular/No polish Pedicure": "Маникюр без покрытия + педикюр без/с обычным лаком",
    "Clean Combo": "Clean combo",
    "Gel Manicure+Pedicure w/no polish": "Гель-маникюр + педикюр без покрытия",
    "Hard Gel Combo": "Hard gel combo",
    "Russian Gel Manicure+Russian Smart Gel Pedicure": "Русский гель-маникюр + русский smart gel педикюр",
    "Gel Combo": "Гель combo",
    "Natural Nail Care Combo": "Комбо ухода за натуральными ногтями",
    "Natural Care": "Натуральный уход",
    "Men's Grooming Combo": "Мужской grooming combo",
    "Men's Combo": "Мужской combo",
    "VIP Room Service": "VIP room service",
    "Best Friends Combo": "Best Friends combo",
    "Mr & Mrs Combo Service": "Mr & Mrs combo",
    "SAME TIME (4 Hands) combo": "SAME TIME combo (4 руки)",
    "Classic French": "Классический French",
    "Cat Eye": "Cat eye",
    "Chrome design": "Chrome дизайн",
    "Ombre design": "Ombre дизайн",
    "Nail Designs": "Дизайн ногтей",
    "Regular Polish": "Обычный лак",
    "Extra Long Nails": "Extra long nails",
    "Gel Removal Only (toes)": "Снятие геля с ног",
    "Gel Removal Only (hands)": "Снятие геля с рук",
    "Gel removal": "Снятие геля",
    "Acrylic / Dip removal": "Снятие acrylic / dip",
    "One Nail Repair": "Ремонт одного ногтя",
    "Hooked nail fix": "Исправление hooked nail",
    "No date selected": "Дата не выбрана",
    "Chosen Date": "Выбранная дата",
    "Select Date": "Выберите дату",
    "Preferred Time": "Удобное время",
    "Your Preview": "Ваш выбор",

    "What is a Russian manicure?": "Что такое русский маникюр?",
    "How long does a Russian manicure last?": "Сколько держится русский маникюр?",
    "Is Russian manicure safe?": "Безопасен ли русский маникюр?",
    "What is the difference between Russian manicure and regular manicure?":
      "Чем русский маникюр отличается от обычного?",
    "How long does hard gel last?": "Сколько держится hard gel?",
    "Do you sterilize your tools?": "Вы стерилизуете инструменты?",
    "Where are you located in Midtown NYC?": "Где вы находитесь в Midtown NYC?",
    "How do I book an appointment?": "Как записаться?",
    "Which service should I choose if my nails are weak or brittle?":
      "Какую услугу выбрать, если ногти слабые или ломкие?",
    "Can I book a natural look without gel?": "Можно ли записаться на натуральный вид без геля?",
    "What should I do before my appointment?": "Что сделать перед визитом?",
    "RM Nail Salon has one location at 875 3rd Ave, Concourse Level, New York, NY 10022. It is convenient for clients coming from Midtown East, Grand Central, Sutton Place, Rockefeller Center, Fifth Avenue, work, hotels, and Instagram bookings.":
      "У RM Nail Salon одна локация: 875 3rd Ave, Concourse Level, New York, NY 10022. Это удобно для клиентов из Midtown East, Grand Central, Sutton Place, Rockefeller Center, Fifth Avenue, с работы, из отелей и из Instagram.",

    "RM Nail Salon Reviews | Russian Manicure Midtown NYC": "Отзывы RM Nail Salon | Русский маникюр Midtown NYC",
    "Russian Manicure NYC | Midtown Nail Salon | RM Nail Salon":
      "Русский маникюр NYC | Nail Salon Midtown | RM Nail Salon",
    "Russian Manicure Services Midtown NYC | RM Nail Salon":
      "Услуги русского маникюра Midtown NYC | RM Nail Salon",
    "Contact RM Nail Salon | Midtown NYC": "Контакты RM Nail Salon | Midtown NYC"
  },
  es: {
    Home: "Inicio",
    Services: "Servicios",
    "Russian Manicure": "Manicura rusa",
    About: "Nosotros",
    Gallery: "Galería",
    Journal: "Guía",
    Reviews: "Reseñas",
    FAQ: "FAQ",
    Contact: "Contacto",
    "Book Now": "Reservar",
    "Book Appointment": "Reservar cita",
    "View Services": "Ver servicios",
    "Explore Services": "Explorar servicios",
    "View All Services": "Ver todos los servicios",
    Instagram: "Instagram",
    "View availability on Booksy": "Ver horarios en Booksy",
    Book: "Reserva",
    Now: "ahora",
    "10% OFF": "10% OFF",
    "First Visit": "Primera visita",
    "First visit": "Primera visita",
    "Learn More": "Más información",
    "Book This Look": "Reservar este look",
    "Book This Service": "Reservar servicio",
    "Book on Booksy": "Reservar en Booksy",
    "Finish Booking on Booksy": "Finalizar reserva en Booksy",
    "See Reviews": "Ver reseñas",
    "Read Reviews on Booksy": "Ver reseñas en Booksy",
    "Open in Maps": "Abrir en Maps",
    "View Map": "Ver mapa",
    "Call Us": "Llámanos",
    Email: "Email",
    "Business Hours": "Horario",
    Daily: "Todos los días",
    "Every day": "Todos los días",
    "Daily 9:30 AM - 7:30 PM": "Todos los días 9:30 AM - 7:30 PM",
    "Every day: 9:30 AM - 7:30 PM": "Todos los días: 9:30 AM - 7:30 PM",
    "Midtown NYC / Russian Manicure": "Midtown NYC / manicura rusa",
    "MIDTOWN NYC / RUSSIAN MANICURE": "MIDTOWN NYC / MANICURA RUSA",
    "SIGNATURE SERVICES": "SERVICIOS PRINCIPALES",
    "CONVENIENT FOR CLIENTS FROM": "CONVENIENTE PARA CLIENTES DE",
    "TRUST & EDUCATION": "CONFIANZA Y EDUCACIÓN",
    "One RM location: 875 3rd Ave, Concourse Level, New York, NY 10022.":
      "Una sola ubicación RM: 875 3rd Ave, Concourse Level, New York, NY 10022.",
    "Midtown East": "Midtown East",
    "Grand Central": "Grand Central",
    "Sutton Place": "Sutton Place",
    "Rockefeller Center": "Rockefeller Center",
    "Fifth Avenue": "Fifth Avenue",
    "Russian Manicure NYC": "Manicura rusa NYC",
    "Hard Gel NYC": "Hard gel NYC",
    "Gel Manicure Midtown NYC": "Manicura gel Midtown NYC",
    "Smart Pedicure NYC": "Smart pedicure NYC",
    "Pedicure Midtown NYC": "Pedicure Midtown NYC",
    "Gel Extensions NYC": "Extensiones gel NYC",
    "Builder Gel NYC": "Builder gel NYC",
    "Nail Art NYC": "Nail art NYC",
    "Meet the Artists": "Conoce a las artistas",
    "Sterilization Process": "Esterilización",
    "Russian vs Regular": "Rusa vs regular",
    "Hard Gel Longevity": "Duración hard gel",
    "Russian Manicure Safety": "Seguridad de manicura rusa",
    "Copyright 2026 RM Nail Salon": "Copyright 2026 RM Nail Salon",
    "Back to top": "Volver arriba",

    "Manhattan's Luxury Russian Manicure Experience": "La experiencia luxury de manicura rusa en Manhattan",
    "Midtown's Luxury Russian Manicure Studio": "Estudio de manicura rusa de lujo en Midtown",
    "Russian Manicure in Midtown NYC": "Manicura rusa en Midtown NYC",
    "Precision Russian manicure, hard gel, smart pedicure, and nail art at 875 3rd Ave.":
      "Manicura rusa precisa, hard gel, smart pedicure y nail art en 875 3rd Ave.",
    "Precision. Hygiene. Long-lasting beauty.": "Precisión. Higiene. Belleza duradera.",
    "Book in 20 seconds": "Reserva en 20 segundos",
    "5.0 Booksy rating": "Rating Booksy 5.0",
    "7 client reviews": "7 reseñas de clientes",
    "A short glimpse into the RM process.": "Una mirada breve al proceso RM.",
    "A bright cyan studio moment that shows the calm, precise hand work behind a polished Russian manicure.":
      "Un momento luminoso del estudio cyan que muestra el trabajo calmo y preciso detrás de una manicura rusa pulida.",
    "Your next manicure should feel different.": "Tu próxima manicura debe sentirse diferente.",
    "Ready for your best manicure?": "¿Lista para tu mejor manicura?",
    "Message on Instagram": "Escribir por Instagram",

    Manicure: "Manicura",
    Pedicure: "Pedicura",
    "Combo Services": "Servicios combo",
    "Add-ons & Designs": "Diseños y extras",
    "Removal & Repair": "Remoción y reparación",
    "Russian Manicure (no polish/regular polish)": "Manicura rusa (sin esmalte/esmalte regular)",
    "Russian Manicure (Hard gel)": "Manicura rusa (hard gel)",
    "Men's Manicure (no polish)": "Manicura masculina (sin esmalte)",
    "Men's Manicure": "Manicura masculina",
    "Japanese Manicure (clear)": "Manicura japonesa (clear)",
    "Japanese Care": "Cuidado japonés",
    "Russian Nail Extensions": "Extensiones rusas",
    Extensions: "Extensiones",
    "Fill-in (correction of extended nails)": "Relleno/corrección de extensiones",
    "Smart Pedicure": "Smart pedicure",
    "Russian Smart Pedicure w/no regular polish": "Russian smart pedicure sin/con esmalte regular",
    "Russian Smart Gel Pedicure": "Russian smart gel pedicure",
    "Smart Gel Pedicure": "Smart gel pedicure",
    "No polish Manicure + Regular/No polish Pedicure": "Manicura sin esmalte + pedicura regular/sin esmalte",
    "Clean Combo": "Clean combo",
    "Gel Manicure+Pedicure w/no polish": "Manicura gel + pedicura sin esmalte",
    "Hard Gel Combo": "Hard gel combo",
    "Russian Gel Manicure+Russian Smart Gel Pedicure": "Manicura rusa gel + Russian smart gel pedicure",
    "Gel Combo": "Gel combo",
    "Natural Nail Care Combo": "Combo cuidado natural",
    "Natural Care": "Cuidado natural",
    "Men's Grooming Combo": "Combo grooming masculino",
    "Men's Combo": "Combo masculino",
    "VIP Room Service": "Servicio VIP room",
    "Best Friends Combo": "Best Friends combo",
    "Mr & Mrs Combo Service": "Servicio combo Mr & Mrs",
    "SAME TIME (4 Hands) combo": "Combo SAME TIME (4 manos)",
    "Classic French": "French clásico",
    "Cat Eye": "Cat eye",
    "Chrome design": "Diseño chrome",
    "Ombre design": "Diseño ombre",
    "Nail Designs": "Diseños de uñas",
    "Regular Polish": "Esmalte regular",
    "Extra Long Nails": "Uñas extra largas",
    "Gel Removal Only (toes)": "Remoción gel solo pies",
    "Gel Removal Only (hands)": "Remoción gel solo manos",
    "Gel removal": "Remoción gel",
    "Acrylic / Dip removal": "Remoción acrylic / dip",
    "One Nail Repair": "Reparación de una uña",
    "Hooked nail fix": "Corrección hooked nail",
    "No date selected": "Sin fecha seleccionada",
    "Chosen Date": "Fecha elegida",
    "Select Date": "Elegir fecha",
    "Preferred Time": "Hora preferida",
    "Your Preview": "Tu selección",

    "What is a Russian manicure?": "¿Qué es una manicura rusa?",
    "How long does a Russian manicure last?": "¿Cuánto dura una manicura rusa?",
    "Is Russian manicure safe?": "¿Es segura la manicura rusa?",
    "What is the difference between Russian manicure and regular manicure?":
      "¿Cuál es la diferencia entre manicura rusa y regular?",
    "How long does hard gel last?": "¿Cuánto dura el hard gel?",
    "Do you sterilize your tools?": "¿Esterilizan las herramientas?",
    "Where are you located in Midtown NYC?": "¿Dónde están ubicados en Midtown NYC?",
    "How do I book an appointment?": "¿Cómo reservo una cita?",
    "Which service should I choose if my nails are weak or brittle?":
      "¿Qué servicio debo elegir si mis uñas son débiles o quebradizas?",
    "Can I book a natural look without gel?": "¿Puedo reservar un look natural sin gel?",
    "What should I do before my appointment?": "¿Qué debo hacer antes de mi cita?",
    "RM Nail Salon has one location at 875 3rd Ave, Concourse Level, New York, NY 10022. It is convenient for clients coming from Midtown East, Grand Central, Sutton Place, Rockefeller Center, Fifth Avenue, work, hotels, and Instagram bookings.":
      "RM Nail Salon tiene una sola ubicación en 875 3rd Ave, Concourse Level, New York, NY 10022. Es conveniente para clientas que vienen de Midtown East, Grand Central, Sutton Place, Rockefeller Center, Fifth Avenue, trabajo, hoteles e Instagram.",

    "RM Nail Salon Reviews | Russian Manicure Midtown NYC": "Reseñas RM Nail Salon | Manicura rusa Midtown NYC",
    "Russian Manicure NYC | Midtown Nail Salon | RM Nail Salon":
      "Manicura rusa NYC | Nail Salon Midtown | RM Nail Salon",
    "Russian Manicure Services Midtown NYC | RM Nail Salon":
      "Servicios de manicura rusa Midtown NYC | RM Nail Salon",
    "Contact RM Nail Salon | Midtown NYC": "Contacto RM Nail Salon | Midtown NYC"
  }
};

const phraseTranslations = {
  ru: [
    ["Russian manicure", "русский маникюр"],
    ["Russian Manicure", "Русский маникюр"],
    ["hard gel", "hard gel"],
    ["Hard gel", "Hard gel"],
    ["gel manicure", "гель-маникюр"],
    ["Gel Manicure", "Гель-маникюр"],
    ["pedicure", "педикюр"],
    ["Pedicure", "Педикюр"],
    ["nail art", "nail art"],
    ["Nail Art", "Nail art"],
    ["extensions", "наращивание"],
    ["Extensions", "Наращивание"],
    ["Midtown NYC", "Midtown NYC"],
    ["Midtown Manhattan", "Midtown Manhattan"],
    ["Book Appointment", "Записаться"],
    ["Book Now", "Записаться"],
    ["Learn More", "Подробнее"],
    ["client reviews", "отзывы клиентов"],
    ["Google review", "Google отзыв"],
    ["Booksy booking", "запись Booksy"],
    ["Concourse Level", "Concourse Level"]
  ],
  es: [
    ["Russian manicure", "manicura rusa"],
    ["Russian Manicure", "Manicura rusa"],
    ["hard gel", "hard gel"],
    ["Hard gel", "Hard gel"],
    ["gel manicure", "manicura gel"],
    ["Gel Manicure", "Manicura gel"],
    ["pedicure", "pedicure"],
    ["Pedicure", "Pedicure"],
    ["nail art", "nail art"],
    ["Nail Art", "Nail art"],
    ["extensions", "extensiones"],
    ["Extensions", "Extensiones"],
    ["Midtown NYC", "Midtown NYC"],
    ["Midtown Manhattan", "Midtown Manhattan"],
    ["Book Appointment", "Reservar cita"],
    ["Book Now", "Reservar"],
    ["Learn More", "Más información"],
    ["client reviews", "reseñas de clientes"],
    ["Google review", "reseña Google"],
    ["Booksy booking", "reserva Booksy"],
    ["Concourse Level", "Concourse Level"]
  ]
};

const LanguageContext = createContext({
  lang: "en",
  setLang: () => {}
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return LANGUAGES.some((item) => item.code === stored) ? stored : "en";
  });

  const setLang = (nextLang) => {
    if (!LANGUAGES.some((item) => item.code === nextLang)) return;
    setLangState(nextLang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLang);
    }
  };

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageSwitcher({ className = "" }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`language-switcher ${className}`.trim()} data-no-translate aria-label="Language selector">
      {LANGUAGES.map((item) => (
        <button
          key={item.code}
          type="button"
          className={item.code === lang ? "active" : ""}
          onClick={() => setLang(item.code)}
          aria-pressed={item.code === lang}
          title={item.name}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function translateText(value, lang) {
  if (lang === "en" || typeof value !== "string") return value;
  const translations = exactTranslations[lang] || {};
  const trimmed = value.trim();
  if (!trimmed) return value;

  const exact = translations[trimmed];
  if (exact) {
    return preserveWhitespace(value, exact);
  }

  if (trimmed.length > 72) {
    return value;
  }

  let translated = trimmed;
  const phrases = [...(phraseTranslations[lang] || [])].sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of phrases) {
    const escaped = escapeRegExp(from);
    const startsWithWord = /^\w/.test(from);
    const endsWithWord = /\w$/.test(from);
    const pattern = `${startsWithWord ? "\\b" : ""}${escaped}${endsWithWord ? "\\b" : ""}`;
    translated = translated.replace(new RegExp(pattern, "g"), to);
  }

  return preserveWhitespace(value, translated);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function useDomTranslations(lang, deps = []) {
  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    document.documentElement.lang = lang === "ru" ? "ru" : lang === "es" ? "es" : "en";
    translateRoot(document.body, lang);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          translateRoot(node, lang);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, ...deps]);
}

function translateRoot(root, lang) {
  if (!root) return;
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root, lang);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  if (shouldSkipElement(root)) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || shouldSkipElement(parent)) return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }
  nodes.forEach((node) => translateTextNode(node, lang));
}

function translateTextNode(node, lang) {
  if (!node.__rmOriginalText) {
    node.__rmOriginalText = node.nodeValue;
  }
  node.nodeValue = lang === "en" ? node.__rmOriginalText : translateText(node.__rmOriginalText, lang);
}

function shouldSkipElement(element) {
  if (element.closest?.("[data-no-translate]")) return true;
  return ["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "SELECT", "OPTION", "CODE", "PRE"].includes(
    element.tagName
  );
}

function preserveWhitespace(original, translated) {
  const leading = original.match(/^\s*/)?.[0] || "";
  const trailing = original.match(/\s*$/)?.[0] || "";
  return `${leading}${translated}${trailing}`;
}
