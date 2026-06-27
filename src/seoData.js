import { faqs, fastImage, serviceMenu, siteConfig } from "./siteConfig.js";

export const reviewSummary = {
  source: "Booksy",
  sourceUrl: siteConfig.bookingUrl,
  ratingValue: "5.0",
  reviewCount: "7",
  reviews: [
    {
      author: "Lauren",
      ratingValue: "5",
      reviewBody: "Meticulous, clean and careful work."
    },
    {
      author: "Jacqueline",
      ratingValue: "5",
      reviewBody: "Great manicure and service."
    },
    {
      author: "Nikki",
      ratingValue: "5",
      reviewBody: "Great service and beautiful nails."
    }
  ]
};

export const coreSeoPages = [
  {
    path: "/",
    navLabel: "Home",
    title: "RM Nail Salon | Russian Manicure Midtown NYC",
    description:
      "Book premium Russian manicures, hard gel, smart pedicures, nail extensions, and nail art at RM Nail Salon in Midtown NYC near Grand Central.",
    h1: "RM Nail Salon",
    image: fastImage("rm-hero"),
    imageAlt: "RM Nail Salon Russian manicure studio in Midtown NYC",
    priority: "1.0"
  },
  {
    path: "/services",
    navLabel: "Services",
    title: "Russian Manicure Services Midtown NYC | RM Nail Salon",
    description:
      "Explore RM Nail Salon service pricing for Russian manicures, hard gel overlays, smart pedicures, extensions, nail art, repair, and online booking.",
    h1: "Russian manicure services in Midtown NYC",
    image: fastImage("ref-service-banner"),
    imageAlt: "RM Nail Salon service menu with Russian manicure details",
    priority: "0.9"
  },
  {
    path: "/about",
    navLabel: "About",
    title: "About RM Nail Salon | Midtown NYC Russian Manicure",
    description:
      "Meet RM Nail Salon, a Midtown NYC nail studio focused on Russian manicure precision, hygienic tools, long-lasting results, and elevated care.",
    h1: "About RM Nail Salon",
    image: fastImage("brand-city-skyline-tight"),
    imageAlt: "RM Nail Salon Midtown NYC brand campaign skyline",
    priority: "0.7"
  },
  {
    path: "/gallery",
    navLabel: "Gallery",
    title: "Nail Gallery Midtown NYC | RM Nail Salon",
    description:
      "View RM Nail Salon manicure and pedicure inspiration, from clean Russian manicures and hard gel to chrome, French, nail art, and extensions.",
    h1: "RM Nail Salon gallery",
    image: fastImage("gallery-aqua-french"),
    imageAlt: "Aqua French manicure gallery image by RM Nail Salon",
    priority: "0.7"
  },
  {
    path: "/faq",
    navLabel: "FAQ",
    title: "Russian Manicure FAQ Midtown NYC | RM Nail Salon",
    description:
      "Find answers about Russian manicures, hard gel longevity, hygiene, booking, timing, pricing, and what to expect at RM Nail Salon in Midtown NYC.",
    h1: "Russian manicure questions before booking",
    image: fastImage("gallery-blue-gray"),
    imageAlt: "Blue gray manicure detail for RM Nail Salon FAQ",
    priority: "0.6"
  },
  {
    path: "/contact",
    navLabel: "Contact",
    title: "Contact RM Nail Salon | Midtown NYC",
    description:
      "Contact RM Nail Salon at 875 3rd Ave, Concourse Level, New York, NY 10022. Book online, call, message Instagram, or open the Midtown NYC map.",
    h1: "Contact RM Nail Salon in Midtown NYC",
    image: fastImage("rm-hero-editorial"),
    imageAlt: "RM Nail Salon contact page manicure detail",
    priority: "0.6"
  }
];

export const serviceLandingPages = [
  {
    path: "/russian-manicure-nyc",
    navLabel: "Russian Manicure NYC",
    label: "Signature Service",
    title: "Russian Manicure NYC | RM Nail Salon Midtown",
    description:
      "Book a precise Russian manicure in Midtown NYC with detailed cuticle care, clean shaping, hygienic tools, hard gel options, and long-lasting shine.",
    h1: "Russian manicure in Midtown NYC, finished with restraint.",
    heroCopy:
      "RM Nail Salon specializes in clean waterless manicure work for clients who want polish that looks expensive up close.",
    image: fastImage("service-russian-clear"),
    imageAlt: "Russian manicure with clean natural nails at RM Nail Salon",
    introTitle: "A cleaner cuticle line is the whole point.",
    intro:
      "Russian manicure is a dry, detail-focused technique. At RM, the appointment is built around careful nail prep, precise cuticle refinement, balanced shaping, and a polished finish that stays clean as the nail grows.",
    serviceType: "Russian Manicure",
    serviceIds: ["russian-clear", "russian-hard-gel", "spa-russian-hard-gel"],
    highlights: [
      ["Dry precision", "Detailed e-file cuticle care creates the crisp, photo-clean line Russian manicures are known for."],
      ["Long-wear finish", "Hard gel and polish options are structured for shine, balance, and a refined grow-out."],
      ["Midtown access", "The studio is close to Lexington Avenue, Park Avenue, and Grand Central for city appointments."]
    ],
    related: ["/hard-gel-manicure-nyc", "/smart-pedicure-nyc", "/nail-art-nyc"],
    priority: "0.95"
  },
  {
    path: "/hard-gel-manicure-nyc",
    navLabel: "Hard Gel NYC",
    label: "Long-Wear Structure",
    title: "Hard Gel Manicure NYC | RM Nail Salon Midtown",
    description:
      "Hard gel manicures in Midtown NYC with Russian cuticle work, balanced structure, glossy color, fill-in options, and a polished long-wear result.",
    h1: "Hard gel manicure for structure, shine, and clean grow-out.",
    heroCopy:
      "A hard gel appointment at RM combines Russian manicure prep with structure that feels slim, glossy, and durable.",
    image: fastImage("service-hard-gel"),
    imageAlt: "Hard gel manicure application at RM Nail Salon in Midtown NYC",
    introTitle: "For clients who want strength without a bulky look.",
    intro:
      "Hard gel is ideal when natural nails need extra support, shape correction, or a longer-wearing finish. The RM approach keeps the profile refined while protecting the clean luxury look clients expect from a Russian manicure studio.",
    serviceType: "Hard Gel Manicure",
    serviceIds: ["russian-hard-gel", "spa-russian-hard-gel", "fill-in"],
    highlights: [
      ["Structured overlay", "The nail is balanced for strength, arch, and a smooth glossy surface."],
      ["Russian prep first", "Cuticle work and nail prep happen before gel structure, so the finish looks sharp."],
      ["Maintenance rhythm", "Most clients schedule fill-in or refresh appointments around their natural growth cycle."]
    ],
    related: ["/russian-manicure-nyc", "/builder-gel-nyc", "/gel-extensions-nyc"],
    priority: "0.9"
  },
  {
    path: "/smart-pedicure-nyc",
    navLabel: "Smart Pedicure NYC",
    label: "Pedicure Detail",
    title: "Smart Pedicure NYC | RM Nail Salon Midtown",
    description:
      "Book a Russian smart pedicure in Midtown NYC with hygienic tools, clean nail care, smooth detail work, spa options, and optional gel polish.",
    h1: "Smart pedicure care that feels clean, exact, and finished.",
    heroCopy:
      "RM pedicure services focus on hygienic tools, precise shaping, and a calm salon experience for hands-and-feet clients.",
    image: fastImage("service-smart-pedicure"),
    imageAlt: "Russian smart pedicure service at RM Nail Salon",
    introTitle: "Pedicure work should look polished and feel hygienic.",
    intro:
      "A smart pedicure is built for clients who want careful foot and nail care without a rushed salon feel. RM pairs clean technique with a premium Midtown studio setting and optional regular or gel polish.",
    serviceType: "Russian Smart Pedicure",
    serviceIds: ["smart-pedicure", "spa-smart-pedicure", "smart-gel-pedicure", "spa-smart-gel-pedicure"],
    highlights: [
      ["Hygienic process", "The service emphasizes clean tools, steady prep, and careful foot-care detail."],
      ["Gel or natural finish", "Choose a polished gel look or a clean no-polish result depending on the appointment."],
      ["Pairs well", "Many clients book smart pedicure care with Russian manicure or hard gel services."]
    ],
    related: ["/russian-manicure-nyc", "/hard-gel-manicure-nyc", "/nail-art-nyc"],
    priority: "0.88"
  },
  {
    path: "/gel-extensions-nyc",
    navLabel: "Gel Extensions NYC",
    label: "Sculpted Length",
    title: "Gel Extensions NYC | RM Nail Salon Midtown",
    description:
      "Gel nail extensions in Midtown NYC with sculpted length, slim architecture, clean Russian manicure prep, refined shaping, and nail art options.",
    h1: "Gel extensions with length that still looks elegant.",
    heroCopy:
      "For clients who want more length, RM builds extensions with balanced architecture and a refined high-end profile.",
    image: fastImage("service-extensions"),
    imageAlt: "Gel nail extensions being sculpted at RM Nail Salon",
    introTitle: "Length should look intentional, not heavy.",
    intro:
      "RM Nail Salon approaches extensions like architecture. The service focuses on structure, proportion, and cuticle cleanliness so long nails still feel polished, feminine, and expensive.",
    serviceType: "Gel Nail Extensions",
    serviceIds: ["nail-extensions", "fill-in", "extra-long-nails"],
    highlights: [
      ["Sculpted form", "Length is built with attention to nail architecture, sidewalls, and a balanced apex."],
      ["Russian manicure base", "The clean prep work supports the final shape and keeps the set looking refined."],
      ["Design-ready", "Extensions can be finished natural, glossy, chrome, French, or with custom nail art."]
    ],
    related: ["/builder-gel-nyc", "/nail-art-nyc", "/hard-gel-manicure-nyc"],
    priority: "0.88"
  },
  {
    path: "/builder-gel-nyc",
    navLabel: "Builder Gel NYC",
    label: "Balanced Overlay",
    title: "Builder Gel NYC | RM Nail Salon Midtown",
    description:
      "Builder gel and hard gel overlays in Midtown NYC for stronger natural nails, clean structure, Russian manicure prep, glossy color, and fill-ins.",
    h1: "Builder gel for stronger natural nails with a clean finish.",
    heroCopy:
      "When nails need reinforcement but not full extensions, RM uses structured gel services to keep the look slim and polished.",
    image: fastImage("service-spa-hard-gel-v2"),
    imageAlt: "Builder gel style overlay manicure at RM Nail Salon",
    introTitle: "Support, shape, and shine without visual weight.",
    intro:
      "Builder gel is used when a client wants strength, smoother shape, or a more durable manicure on natural nails. RM pairs the overlay with Russian cuticle preparation so the finish stays crisp around the nail fold.",
    serviceType: "Builder Gel Manicure",
    serviceIds: ["russian-hard-gel", "spa-russian-hard-gel", "fill-in"],
    highlights: [
      ["Natural nail support", "Builder-style gel helps reinforce nails while keeping the manicure refined."],
      ["Smooth architecture", "The surface is shaped for a glossy salon finish, not a thick artificial look."],
      ["Good transition service", "Ideal for clients moving from regular gel to a stronger structured manicure."]
    ],
    related: ["/hard-gel-manicure-nyc", "/russian-manicure-nyc", "/gel-extensions-nyc"],
    priority: "0.84"
  },
  {
    path: "/nail-art-nyc",
    navLabel: "Nail Art NYC",
    label: "Editorial Detail",
    title: "Nail Art NYC | RM Nail Salon Midtown",
    description:
      "Nail art in Midtown NYC from French and chrome to cat eye, ombre, custom details, and editorial accents paired with precise RM manicure prep.",
    h1: "Nail art that feels editorial, not overdone.",
    heroCopy:
      "RM uses nail art as a luxury detail: clean, glossy, balanced, and designed around the shape of the hand.",
    image: fastImage("service-nail-design"),
    imageAlt: "Detailed nail art design at RM Nail Salon",
    introTitle: "The best design still starts with clean prep.",
    intro:
      "Nail art looks more expensive when the base manicure is precise. RM pairs Russian manicure standards with French, chrome, cat eye, ombre, and custom accent work for clients who want detail without visual noise.",
    serviceType: "Nail Art",
    serviceIds: ["french", "chrome", "cat-eye", "ombre", "nail-design"],
    highlights: [
      ["Design restraint", "Fine accents, reflective finishes, and clean color placement keep the result high-end."],
      ["Service pairing", "Art can be added to hard gel, extensions, regular polish, or a Russian manicure appointment."],
      ["Instagram-ready", "The final set is built for close-up details, clean photos, and a polished social finish."]
    ],
    related: ["/gel-extensions-nyc", "/hard-gel-manicure-nyc", "/russian-manicure-nyc"],
    priority: "0.86"
  }
];

export const geoLandingPages = [
  {
    path: "/russian-manicure-midtown-manhattan",
    navLabel: "Midtown Manhattan",
    label: "Midtown Manhattan",
    title: "Russian Manicure Midtown Manhattan | RM Nail Salon",
    description:
      "Premium Russian manicures in Midtown Manhattan near Third Avenue, Grand Central, Rockefeller Center, Fifth Avenue, Madison Avenue, and the East Side.",
    h1: "Russian manicure in Midtown Manhattan for polished city schedules.",
    heroCopy:
      "RM Nail Salon serves clients who want a precise beauty appointment in the center of Manhattan without a rushed salon feeling.",
    image: fastImage("drive-midtown"),
    imageAlt: "Midtown Manhattan campaign image for RM Nail Salon",
    area: "Midtown Manhattan",
    landmarks: ["Grand Central Terminal", "Rockefeller Center", "Fifth Avenue", "Madison Avenue"],
    introTitle: "A central studio for clients moving through Midtown.",
    intro:
      "From workdays near Park Avenue to appointments before dinner, RM is built for clients who want Russian manicure precision in a calm Midtown setting.",
    related: ["/russian-manicure-nyc", "/hard-gel-manicure-nyc", "/smart-pedicure-nyc"],
    priority: "0.82"
  },
  {
    path: "/russian-manicure-midtown-east",
    navLabel: "Midtown East",
    label: "Midtown East",
    title: "Russian Manicure Midtown East | RM Nail Salon",
    description:
      "Book a Russian manicure in Midtown East near Lexington Avenue, Park Avenue, Madison Avenue, Third Avenue, and RM's Concourse Level nail studio.",
    h1: "Russian manicure in Midtown East with RM precision.",
    heroCopy:
      "Close to Midtown East offices, hotels, and residential buildings, RM offers a polished appointment for clients who care about details.",
    image: fastImage("brand-salon-front-full"),
    imageAlt: "RM Nail Salon storefront in Midtown East New York City",
    area: "Midtown East",
    landmarks: ["Lexington Avenue", "Park Avenue", "Madison Avenue", "Third Avenue"],
    introTitle: "A neighborhood studio with a high-end finish.",
    intro:
      "Midtown East clients often need a manicure that lasts through packed schedules. RM focuses on clean cuticle work, structured gel, and a studio experience that feels deliberate.",
    related: ["/russian-manicure-nyc", "/builder-gel-nyc", "/nail-art-nyc"],
    priority: "0.82"
  },
  {
    path: "/nail-salon-grand-central",
    navLabel: "Grand Central",
    label: "Grand Central",
    title: "Nail Salon Near Grand Central | RM Nail Salon",
    description:
      "RM Nail Salon is a premium Midtown NYC nail studio near Grand Central for Russian manicures, hard gel, smart pedicures, extensions, and nail art.",
    h1: "A nail salon near Grand Central for precise Russian manicure work.",
    heroCopy:
      "For clients commuting through Grand Central or working nearby, RM keeps the appointment calm, clean, and detail-focused.",
    image: fastImage("brand-city-skyline-tight"),
    imageAlt: "Midtown skyline near Grand Central for RM Nail Salon",
    area: "Grand Central",
    landmarks: ["Grand Central Terminal", "Park Avenue", "Lexington Avenue", "Chrysler Building"],
    introTitle: "Easy to fit into a Grand Central day.",
    intro:
      "RM is designed for clients who want appointment quality, not walk-in chaos. Services are structured around Russian manicure precision and a polished Midtown client experience.",
    related: ["/russian-manicure-nyc", "/hard-gel-manicure-nyc", "/smart-pedicure-nyc"],
    priority: "0.78"
  },
  {
    path: "/nail-salon-rockefeller-center",
    navLabel: "Rockefeller Center",
    label: "Rockefeller Center",
    title: "Nail Salon Near Rockefeller Center | RM Nail Salon",
    description:
      "A luxury nail salon near Rockefeller Center offering Russian manicures, hard gel overlays, smart pedicures, gel extensions, and clean nail art.",
    h1: "Polished nail care near Rockefeller Center.",
    heroCopy:
      "RM serves Midtown clients who want a cleaner, more exact manicure experience near the city's beauty, fashion, and office corridors.",
    image: fastImage("drive-asian-1"),
    imageAlt: "RM Nail Salon editorial manicure image for Rockefeller Center area clients",
    area: "Rockefeller Center",
    landmarks: ["Rockefeller Center", "Fifth Avenue", "Radio City Music Hall", "Madison Avenue"],
    introTitle: "A refined appointment before or after Midtown plans.",
    intro:
      "Whether the day includes shopping, office meetings, or an evening reservation, RM focuses on manicures that look clean in person and sharp in close-up photos.",
    related: ["/nail-art-nyc", "/hard-gel-manicure-nyc", "/russian-manicure-nyc"],
    priority: "0.76"
  },
  {
    path: "/nail-salon-fifth-avenue",
    navLabel: "Fifth Avenue",
    label: "Fifth Avenue",
    title: "Nail Salon Near Fifth Avenue NYC | RM Nail Salon",
    description:
      "Premium nail salon near Fifth Avenue in Midtown NYC for Russian manicures, hard gel, gel extensions, smart pedicures, chrome finishes, and nail art.",
    h1: "A Fifth Avenue-level finish without the generic salon feel.",
    heroCopy:
      "RM brings an editorial beauty standard to Midtown clients who want manicures that feel clean, modern, and expensive.",
    image: fastImage("drive-brown-1"),
    imageAlt: "Editorial red manicure image for Fifth Avenue nail salon page",
    area: "Fifth Avenue",
    landmarks: ["Fifth Avenue", "Madison Avenue", "Rockefeller Center", "Bryant Park"],
    introTitle: "Designed for clients who notice the finish.",
    intro:
      "Clients shopping, working, or staying near Fifth Avenue can book RM for Russian manicure detail, structured gel, and nail art that reads luxury instead of loud.",
    related: ["/nail-art-nyc", "/gel-extensions-nyc", "/russian-manicure-nyc"],
    priority: "0.75"
  },
  {
    path: "/nail-salon-bryant-park",
    navLabel: "Bryant Park",
    label: "Bryant Park",
    title: "Nail Salon Near Bryant Park | RM Nail Salon Midtown",
    description:
      "Book RM Nail Salon near Bryant Park for Russian manicure precision, hard gel, smart pedicures, nail extensions, clean nail art, and repairs.",
    h1: "A Bryant Park-area nail appointment with a calmer standard.",
    heroCopy:
      "RM gives Midtown clients a more composed manicure experience, with clean tools, exact prep, and a glossy finish.",
    image: fastImage("drive-asian-5"),
    imageAlt: "RM Nail Salon campaign image for Bryant Park area clients",
    area: "Bryant Park",
    landmarks: ["Bryant Park", "New York Public Library", "Fifth Avenue", "Grand Central Terminal"],
    introTitle: "Close enough for a Midtown schedule, elevated enough to feel special.",
    intro:
      "The Bryant Park corridor is busy, but your manicure does not need to feel rushed. RM focuses on controlled technique and a finished look that lasts.",
    related: ["/smart-pedicure-nyc", "/hard-gel-manicure-nyc", "/nail-art-nyc"],
    priority: "0.74"
  },
  {
    path: "/nail-salon-sutton-place",
    navLabel: "Sutton Place",
    label: "Sutton Place",
    title: "Nail Salon Near Sutton Place | RM Nail Salon",
    description:
      "RM Nail Salon serves Sutton Place clients with Russian manicures, hard gel, smart pedicures, extensions, refined nail art, and daily booking.",
    h1: "Russian manicure care near Sutton Place with a quiet luxury mood.",
    heroCopy:
      "For East Side clients who prefer clean details and a calm appointment, RM offers polished nail care close to home.",
    image: fastImage("brand-face-red-nails-framed"),
    imageAlt: "RM Nail Salon red manicure campaign image for Sutton Place clients",
    area: "Sutton Place",
    landmarks: ["Sutton Place", "East 57th Street", "Third Avenue", "First Avenue"],
    introTitle: "A nearby studio for clients who prefer refinement.",
    intro:
      "Sutton Place clients can book RM for Russian manicure prep, structured overlays, and pedicures with a cleaner, more precise salon rhythm.",
    related: ["/russian-manicure-nyc", "/smart-pedicure-nyc", "/builder-gel-nyc"],
    priority: "0.72"
  },
  {
    path: "/nail-salon-turtle-bay",
    navLabel: "Turtle Bay",
    label: "Turtle Bay",
    title: "Nail Salon Near Turtle Bay | RM Nail Salon Midtown",
    description:
      "A nail salon near Turtle Bay for Russian manicures, hard gel overlays, smart pedicures, nail extensions, clean editorial nail art, and repair.",
    h1: "A Turtle Bay-area manicure that looks clean from every angle.",
    heroCopy:
      "RM serves nearby East Side clients with careful manicure prep, polished finishes, and a professional booking experience.",
    image: fastImage("drive-white"),
    imageAlt: "RM Nail Salon fashion manicure image for Turtle Bay clients",
    area: "Turtle Bay",
    landmarks: ["Turtle Bay", "United Nations", "Lexington Avenue", "Third Avenue"],
    introTitle: "Nearby, precise, and built around a polished result.",
    intro:
      "Whether you are coming from the United Nations area, Lexington Avenue, or East Side offices, RM keeps the nail appointment focused and refined.",
    related: ["/hard-gel-manicure-nyc", "/gel-extensions-nyc", "/nail-art-nyc"],
    priority: "0.72"
  },
  {
    path: "/nail-salon-murray-hill",
    navLabel: "Murray Hill",
    label: "Murray Hill",
    title: "Nail Salon Near Murray Hill | RM Nail Salon Midtown",
    description:
      "RM Nail Salon serves Murray Hill clients with Russian manicures, hard gel, smart pedicures, extensions, nail art, repair services, and booking.",
    h1: "A Murray Hill-area nail salon for clean Russian manicure work.",
    heroCopy:
      "For clients coming north from Murray Hill, RM offers a premium nail appointment with precise prep and a calm Midtown finish.",
    image: fastImage("service-combo-clean-real"),
    imageAlt: "Natural manicure and pedicure combo service near Murray Hill at RM Nail Salon",
    area: "Murray Hill",
    landmarks: ["Murray Hill", "Park Avenue", "Madison Avenue", "Grand Central Terminal"],
    introTitle: "A short Midtown trip for a more exact manicure.",
    intro:
      "Murray Hill clients book RM when they want a cleaner finish than a basic neighborhood manicure: structured gel, careful cuticles, and refined color placement.",
    related: ["/russian-manicure-nyc", "/smart-pedicure-nyc", "/gel-extensions-nyc"],
    priority: "0.72"
  }
];

export const seoPages = [...coreSeoPages, ...serviceLandingPages, ...geoLandingPages];

export function getSeoPage(pathname = "/") {
  const normalized = normalizePathname(pathname);
  return seoPages.find((page) => page.path === normalized) || coreSeoPages[0];
}

export function normalizePathname(pathname = "/") {
  const clean = pathname.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  return clean;
}

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteImage(path = "") {
  if (!path) return absoluteUrl(fastImage("rm-hero"));
  if (path.startsWith("http")) return path;
  return absoluteUrl(path);
}

export function getServiceById(id) {
  for (const group of serviceMenu) {
    const service = group.services.find((item) => item.id === id);
    if (service) return { ...service, category: group.category };
  }
  return null;
}

export function getRelatedSeoPages(paths = []) {
  return paths.map((path) => getSeoPage(path)).filter(Boolean);
}

export function buildStructuredData(pathname = "/") {
  const page = getSeoPage(pathname);
  const graph = [
    organizationSchema(),
    localBusinessSchema(),
    webSiteSchema(),
    webPageSchema(page),
    breadcrumbSchema(page),
    imageObjectSchema(page)
  ];

  if (page.path === "/services") {
    graph.push(servicesItemListSchema());
  }

  if (page.path === "/faq") {
    graph.push(faqPageSchema());
  }

  const servicePage = serviceLandingPages.find((item) => item.path === page.path);
  if (servicePage) {
    graph.push(serviceSchema(servicePage));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph.filter(Boolean)
  };
}

function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.salonName,
    url: siteConfig.siteUrl,
    logo: absoluteImage("/favicon.svg"),
    image: absoluteImage(fastImage("brand-salon-front-full")),
    sameAs: [siteConfig.instagramUrl],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        areaServed: "US-NY",
        availableLanguage: ["English"]
      }
    ]
  };
}

function localBusinessSchema() {
  return {
    "@type": ["LocalBusiness", "BeautySalon", "NailSalon"],
    "@id": `${siteConfig.siteUrl}/#nailsalon`,
    name: siteConfig.salonName,
    url: siteConfig.siteUrl,
    image: [
      absoluteImage(fastImage("rm-hero")),
      absoluteImage(fastImage("brand-salon-front-full")),
      absoluteImage(fastImage("service-hard-gel"))
    ],
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$",
    description:
      "Premium Russian manicure studio in Midtown NYC specializing in precise cuticle work, hard gel, pedicures, nail extensions, and nail art.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "875 3rd Ave, Concourse Level",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10022",
      addressCountry: "US"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:30",
        closes: "19:30"
      }
    ],
    areaServed: [
      "Midtown Manhattan",
      "Midtown East",
      "Grand Central",
      "Rockefeller Center",
      "Fifth Avenue",
      "Bryant Park",
      "Sutton Place",
      "Turtle Bay",
      "Murray Hill",
      "New York City"
    ],
    sameAs: [siteConfig.instagramUrl, siteConfig.bookingUrl],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviewSummary.ratingValue,
      reviewCount: reviewSummary.reviewCount,
      bestRating: "5",
      worstRating: "1"
    },
    review: reviewSummary.reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.ratingValue,
        bestRating: "5",
        worstRating: "1"
      },
      reviewBody: review.reviewBody,
      publisher: {
        "@type": "Organization",
        name: reviewSummary.source
      }
    }))
  };
}

function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.siteUrl}/#website`,
    url: siteConfig.siteUrl,
    name: siteConfig.salonName,
    publisher: {
      "@id": `${siteConfig.siteUrl}/#organization`
    },
    inLanguage: "en-US"
  };
}

function webPageSchema(page) {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(page.path)}#webpage`,
    url: absoluteUrl(page.path),
    name: page.title,
    description: page.description,
    isPartOf: {
      "@id": `${siteConfig.siteUrl}/#website`
    },
    about: {
      "@id": `${siteConfig.siteUrl}/#nailsalon`
    },
    primaryImageOfPage: {
      "@id": `${absoluteUrl(page.path)}#primaryimage`
    },
    inLanguage: "en-US"
  };
}

function breadcrumbSchema(page) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.siteUrl
    }
  ];

  if (page.path !== "/") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: page.navLabel || page.h1,
      item: absoluteUrl(page.path)
    });
  }

  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(page.path)}#breadcrumb`,
    itemListElement: items
  };
}

function imageObjectSchema(page) {
  return {
    "@type": "ImageObject",
    "@id": `${absoluteUrl(page.path)}#primaryimage`,
    url: absoluteImage(page.image),
    caption: page.imageAlt || page.h1,
    representativeOfPage: true
  };
}

function faqPageSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl("/faq")}#faq`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

function servicesItemListSchema() {
  const allServices = serviceMenu.flatMap((group) =>
    group.services.map((service) => ({ ...service, category: group.category }))
  );

  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl("/services")}#services`,
    name: "RM Nail Salon service menu",
    itemListElement: allServices.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: serviceToSchema(service, absoluteUrl(`/services#${service.id}`))
    }))
  };
}

function serviceSchema(page) {
  const services = page.serviceIds.map(getServiceById).filter(Boolean);
  const primaryService = services[0] || null;
  return {
    ...serviceToSchema(
      {
        id: page.path.slice(1),
        name: page.serviceType,
        description: page.intro,
        image: page.image,
        price: primaryService?.price,
        time: primaryService?.time
      },
      `${absoluteUrl(page.path)}#service`
    ),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${page.serviceType} options`,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: serviceToSchema(service, absoluteUrl(`/services#${service.id}`)),
        priceCurrency: "USD",
        price: extractPrice(service.price)
      }))
    }
  };
}

function serviceToSchema(service, id) {
  return {
    "@type": "Service",
    "@id": id,
    name: service.name,
    serviceType: service.name,
    description: service.description,
    image: absoluteImage(service.image),
    provider: {
      "@id": `${siteConfig.siteUrl}/#nailsalon`
    },
    areaServed: "New York City",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: extractPrice(service.price),
      availability: "https://schema.org/InStock",
      url: siteConfig.bookingUrl
    }
  };
}

function extractPrice(price = "") {
  const match = String(price).match(/\d+/);
  return match ? match[0] : undefined;
}
