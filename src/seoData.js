import { faqs, fastImage, serviceMenu, siteConfig } from "./siteConfig.js";

const serviceImageById = (id, fallback) =>
  serviceMenu.flatMap((group) => group.services).find((service) => service.id === id)?.image || fastImage(fallback);

export const reviewSummary = {
  source: "Booksy",
  sourceUrl: siteConfig.bookingUrl,
  ratingValue: "5.0",
  reviewCount: "8",
  checkedAt: "2026-09-06",
  reviews: [
    {
      author: "Lauren",
      ratingValue: "5",
      reviewBody: "Meticulous, clean and careful work."
    },
    {
      author: "Jacqueline",
      ratingValue: "5",
      reviewBody: "Great manicure and service"
    },
    {
      author: "Nikki",
      ratingValue: "5",
      reviewBody: "Great service! Love my nails"
    },
    {
      author: "Emily",
      ratingValue: "5",
      reviewBody: "The manicures here always come out really nice!"
    },
    {
      author: "B.",
      ratingValue: "5",
      reviewBody: "10/10"
    }
  ]
};

export const coreSeoPages = [
  {
    path: "/",
    navLabel: "Home",
    title: "Russian Manicure NYC | Midtown Nail Salon | RM Nail Salon",
    description:
      "RM Nail Salon offers luxury Russian manicures, hard gel, gel manicures, pedicures, and nail art in Midtown Manhattan. Book your appointment today.",
    h1: "Midtown's Luxury Russian Manicure Studio",
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
    path: "/reviews",
    navLabel: "Reviews",
    title: "RM Nail Salon Reviews | Russian Manicure Midtown NYC",
    description:
      "Read client reviews for RM Nail Salon in Midtown NYC, including Russian manicure, hard gel, smart pedicure, nail art, and clean luxury appointment feedback.",
    h1: "RM Nail Salon reviews",
    image: fastImage("brand-face-red-nails-tight"),
    imageAlt: "RM Nail Salon client review campaign with red manicure",
    priority: "0.62"
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
  },
  {
    path: "/privacy-policy",
    navLabel: "Privacy Policy",
    title: "Privacy Policy | RM Nail Salon Midtown NYC",
    description:
      "Read the RM Nail Salon privacy policy for website visits, booking links, contact information, cookies, ads, analytics, and client communication.",
    h1: "Privacy Policy",
    image: fastImage("brand-salon-front-full"),
    imageAlt: "RM Nail Salon Midtown NYC studio interior",
    priority: "0.3"
  },
  {
    path: "/terms",
    navLabel: "Terms",
    title: "Terms of Use | RM Nail Salon Midtown NYC",
    description:
      "Read the RM Nail Salon website terms for booking links, service information, third-party platforms, website content, and contact details.",
    h1: "Terms of Use",
    image: fastImage("contact-salon-interior"),
    imageAlt: "RM Nail Salon Midtown NYC manicure studio",
    priority: "0.3"
  },
  {
    path: "/404",
    noindex: true,
    navLabel: "Page Not Found",
    title: "Page Not Found | RM Nail Salon",
    description:
      "The page you are looking for is not available. Return to RM Nail Salon services, reviews, gallery, contact, or Booksy appointment booking.",
    h1: "Page Not Found",
    image: fastImage("rm-hero-editorial"),
    imageAlt: "RM Nail Salon manicure detail",
    priority: "0.1"
  },
  {
    path: "/team",
    navLabel: "Meet the Artists",
    title: "Meet the Nail Artists | RM Nail Salon Midtown NYC",
    description:
      "Meet the RM Nail Salon artists behind precise Russian manicures, hard gel overlays, extensions, nail art, and hygienic Midtown NYC nail care.",
    h1: "Meet the artists behind the RM finish",
    label: "Nail Artists",
    image: fastImage("contact-salon-interior"),
    imageAlt: "Manicure stations inside RM Nail Salon in Midtown NYC",
    priority: "0.62",
    related: ["/russian-manicure-nyc", "/hard-gel-manicure-nyc", "/sterilization-process"]
  },
  {
    path: "/sterilization-process",
    navLabel: "Sterilization",
    title: "Tool Hygiene & Nail Preparation | RM Nail Salon NYC",
    description:
      "Plan your visit with questions about reusable tools, single-use items, station preparation, and nail care at RM Nail Salon in Midtown NYC.",
    h1: "Tool hygiene and preparation: what to know",
    label: "Before Your Visit",
    image: fastImage("work-reel-process"),
    imageAlt: "RM Nail Salon manicure process with professional nail tools",
    priority: "0.64",
    related: ["/russian-manicure-nyc", "/faq", "/team"]
  },
  {
    path: "/blog",
    navLabel: "Journal",
    title: "Russian Manicure Blog NYC | RM Nail Salon Journal",
    description:
      "Read RM Nail Salon guides on Russian manicures, hard gel, dry manicure safety, BIAB comparisons, nail lifting, and Midtown NYC nail care.",
    h1: "The RM Journal for better manicure decisions",
    label: "Education",
    image: fastImage("brand-salon-front-full"),
    imageAlt: "RM Nail Salon Midtown NYC studio entrance for manicure education journal",
    priority: "0.65",
    related: ["/russian-manicure-nyc", "/hard-gel-manicure-nyc", "/faq"]
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
    h1: "Russian Manicure in Midtown NYC",
    heroCopy:
      "RM Nail Salon specializes in clean waterless manicure work for clients who want a polished finish that looks refined up close.",
    image: serviceImageById("russian-clear", "service-russian-natural-new"),
    imageAlt: "Russian manicure with clean natural nails at RM Nail Salon",
    introTitle: "Precision prep before the polish.",
    intro:
      "Russian manicure is a dry, detail-focused technique. At RM, the appointment is built around careful nail prep, precise cuticle refinement, balanced shaping, and a polished finish that stays clean as the nail grows.",
    serviceType: "Russian Manicure",
    serviceIds: ["russian-clear", "russian-hard-gel", "nail-extensions"],
    highlights: [
      ["Dry precision", "Detailed e-file cuticle care creates the crisp, photo-clean line Russian manicures are known for."],
      ["Long-wear finish", "Hard gel and polish options are structured for shine, balance, and a refined grow-out."],
      ["Midtown access", "The studio is close to Lexington Avenue, Park Avenue, and Grand Central for city appointments."]
    ],
    ctaLabel: "Book Russian Manicure",
    decisionTitle: "Why Russian manicure is different from a basic manicure.",
    decisionCopy:
      "The value is in the prep: clean cuticle work, careful shaping, controlled technique, and a finish that looks polished up close as the nails grow.",
    relatedTitle: "Pair Russian manicure with the next RM service.",
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
    h1: "Hard Gel Manicure in Midtown NYC",
    heroCopy:
      "A hard gel appointment at RM combines Russian manicure prep with structure that feels slim, glossy, and durable.",
    image: serviceImageById("russian-hard-gel", "service-russian-hard-gel-new"),
    imageAlt: "Finished hard gel manicure result at RM Nail Salon in Midtown NYC",
    introTitle: "For clients who want strength without a bulky look.",
    intro:
      "Hard gel is ideal when natural nails need extra support, shape correction, or a longer-wearing finish. The RM approach keeps the profile refined while protecting the clean luxury look clients expect from a Russian manicure studio.",
    serviceType: "Hard Gel Manicure",
    serviceIds: ["russian-hard-gel", "nail-extensions", "fill-in"],
    processImage: fastImage("service-hard-gel"),
    processAlt: "Hard gel manicure application process at RM Nail Salon",
    processTitle: "How Hard Gel Is Applied",
    processHeading: "Structure is built after clean Russian prep.",
    processCopy:
      "The process image shows the controlled application work behind the finished surface: prep, product placement, balance, and refinement.",
    resultTitle: "A glossy structure that still looks slim.",
    resultCopy:
      "Clients choose hard gel when they want strength and longevity without a thick or heavy-looking manicure.",
    comparisonRows: [
      ["Hard gel vs gel polish", "Gel polish adds color. Hard gel adds structure, strength, and shape support over the natural nail."],
      ["Hard gel vs builder gel", "Both are structural options. RM positions hard gel for stronger support and longer-wear architecture."],
      ["Hard gel vs extensions", "Hard gel supports your natural length. Extensions are chosen when you want added length or a shape transformation."]
    ],
    highlights: [
      ["Structured overlay", "The nail is balanced for strength, arch, and a smooth glossy surface."],
      ["Russian prep first", "Cuticle work and nail prep happen before gel structure, so the finish looks sharp."],
      ["Maintenance rhythm", "Most clients schedule fill-in or refresh appointments around their natural growth cycle."]
    ],
    ctaLabel: "Book Hard Gel",
    decisionTitle: "Why hard gel costs more than regular gel polish.",
    decisionCopy:
      "Hard gel is a structured service. It requires prep, product control, surface refinement, and balance so the nail feels stronger without looking thick.",
    relatedTitle: "Compare hard gel with related RM services.",
    related: ["/russian-manicure-nyc", "/builder-gel-nyc", "/gel-extensions-nyc"],
    priority: "0.9"
  },
  {
    path: "/gel-manicure-midtown-nyc",
    navLabel: "Gel Manicure Midtown NYC",
    label: "Glossy Gel Finish",
    title: "Gel Manicure Midtown NYC | RM Nail Salon",
    description:
      "Book a luxury gel manicure in Midtown NYC with Russian manicure prep, clean shaping, glossy color, structured options, and long-lasting RM polish.",
    h1: "Gel Manicure in Midtown NYC",
    heroCopy:
      "For clients who want glossy color, careful prep, and a manicure that feels more refined than a rushed gel appointment.",
    image: serviceImageById("russian-hard-gel", "service-russian-hard-gel-new"),
    imageAlt: "Glossy gel manicure finish at RM Nail Salon in Midtown NYC",
    introTitle: "Gel looks better when the prep work is precise.",
    intro:
      "RM pairs gel color with detailed cuticle care, clean nail shaping, and optional structured support so the manicure looks polished up close and wears beautifully.",
    serviceType: "Gel Manicure",
    serviceIds: ["russian-hard-gel", "russian-clear", "regular-polish"],
    highlights: [
      ["Cleaner prep", "Dry manicure standards help the gel finish look neat around the cuticle line."],
      ["Glossy wear", "Color is applied with attention to reflection, edges, and a smooth surface."],
      ["Midtown booking", "Easy online booking for clients near Third Avenue, Grand Central, and Midtown East."]
    ],
    ctaLabel: "Book Gel Manicure",
    decisionTitle: "Why RM gel manicures start with detailed prep.",
    decisionCopy:
      "A gel manicure looks more refined when the cuticle area, nail plate, and polish edges are prepared carefully before color is applied.",
    relatedTitle: "Choose the gel service that fits your nails.",
    related: ["/russian-manicure-nyc", "/hard-gel-manicure-nyc", "/nail-art-nyc"],
    priority: "0.88"
  },
  {
    path: "/smart-pedicure-nyc",
    navLabel: "Smart Pedicure NYC",
    label: "Pedicure Detail",
    title: "Smart Pedicure NYC | RM Nail Salon Midtown",
    description:
      "Book a Russian smart pedicure in Midtown NYC with hygienic tools, clean nail care, smooth detail work, spa options, and optional gel polish.",
    h1: "Smart Pedicure in Midtown NYC",
    heroCopy:
      "RM pedicure services focus on hygienic tools, precise shaping, and a calm salon experience for hands-and-feet clients.",
    image: serviceImageById("smart-pedicure", "service-smart-pedicure-natural-new"),
    imageAlt: "Finished smart pedicure result at RM Nail Salon",
    introTitle: "Detailed smart pedicure care for clean, polished, comfortable feet.",
    intro:
      "A smart pedicure is built for clients who want careful foot and nail care without a rushed salon feel. RM pairs clean technique with a premium Midtown studio setting and optional regular or gel polish.",
    serviceType: "Russian Smart Pedicure",
    serviceIds: ["smart-pedicure", "smart-gel-pedicure", "combo-clear", "hard-gel-smart-gel"],
    processImage: fastImage("service-smart-pedicure"),
    processAlt: "Smart pedicure preparation process at RM Nail Salon",
    processTitle: "Pedicure Detail",
    processHeading: "Finished comfort, supported by hygienic prep.",
    processCopy:
      "The process work stays calm and controlled, while the first image shows what clients actually want to feel and see: clean, polished feet.",
    highlights: [
      ["Hygienic process", "The service emphasizes clean tools, steady prep, and careful foot-care detail."],
      ["Gel or natural finish", "Choose a polished gel look or a clean no-polish result depending on the appointment."],
      ["Pairs well", "Many clients book smart pedicure care with Russian manicure or hard gel services."]
    ],
    ctaLabel: "Book Smart Pedicure",
    decisionTitle: "Why smart pedicure clients choose detail over speed.",
    decisionCopy:
      "This service is for clients who want careful foot and nail care, clean shaping, and a polished finish without the rushed feeling of a basic pedicure.",
    relatedTitle: "Pair your smart pedicure with manicure services.",
    related: ["/russian-manicure-nyc", "/hard-gel-manicure-nyc", "/nail-art-nyc"],
    priority: "0.88"
  },
  {
    path: "/pedicure-midtown-nyc",
    navLabel: "Pedicure Midtown NYC",
    label: "Midtown Pedicure",
    title: "Pedicure Midtown NYC | RM Nail Salon",
    description:
      "Book a clean pedicure in Midtown NYC at RM Nail Salon, including Russian smart pedicure care, spa options, hygienic tools, and gel polish.",
    h1: "Pedicure in Midtown NYC",
    heroCopy:
      "RM pedicure appointments are designed for clients who want careful foot care, polished shaping, and a calm Midtown studio experience.",
    image: serviceImageById("smart-pedicure", "service-smart-pedicure-natural-new"),
    imageAlt: "Finished pedicure result at RM Nail Salon in Midtown Manhattan",
    introTitle: "Pedicure care should feel hygienic, detailed, and calm.",
    intro:
      "From natural grooming to gel pedicure finishes, RM focuses on clean tools, careful shaping, and a polished result that feels professional from start to finish.",
    serviceType: "Pedicure",
    serviceIds: ["smart-pedicure", "smart-gel-pedicure", "combo-clear", "hard-gel-smart-gel"],
    highlights: [
      ["Smart pedicure detail", "Nail and foot care are paced carefully instead of feeling rushed."],
      ["Gel or no polish", "Choose a glossy gel finish or a clean natural result."],
      ["Central location", "Convenient for clients coming from Midtown East, Grand Central, Sutton Place, and Rockefeller Center to the 875 3rd Ave studio."]
    ],
    ctaLabel: "Book Pedicure",
    decisionTitle: "Why a clean pedicure appointment should feel unrushed.",
    decisionCopy:
      "Pedicure work should be hygienic, comfortable, and precise. RM keeps the focus on careful shaping, clean tools, and a calm Midtown experience.",
    relatedTitle: "Explore related pedicure and manicure options.",
    related: ["/smart-pedicure-nyc", "/russian-manicure-nyc", "/gel-manicure-midtown-nyc"],
    priority: "0.84"
  },
  {
    path: "/gel-extensions-nyc",
    navLabel: "Gel Extensions NYC",
    label: "Sculpted Length",
    title: "Gel Extensions NYC | RM Nail Salon Midtown",
    description:
      "Gel nail extensions in Midtown NYC with sculpted length, slim architecture, clean Russian manicure prep, refined shaping, and nail art options.",
    h1: "Gel Extensions in Midtown NYC",
    heroCopy:
      "For clients who want more length, RM builds extensions with balanced architecture and a refined high-end profile.",
    image: serviceImageById("nail-extensions", "service-russian-extensions-new"),
    imageAlt: "Finished gel nail extensions at RM Nail Salon",
    introTitle: "Elegant gel extensions with balanced shape, clean cuticle work, and refined structure.",
    intro:
      "RM Nail Salon approaches extensions like architecture. The service focuses on structure, proportion, and cuticle cleanliness so long nails still feel refined, balanced, and elegant.",
    serviceType: "Gel Nail Extensions",
    serviceIds: ["nail-extensions", "fill-in", "extra-long-nails"],
    processImage: fastImage("service-extensions"),
    processAlt: "Gel extension form and structure process at RM Nail Salon",
    processTitle: "How Extensions Are Built",
    processHeading: "The technical work stays below the beauty result.",
    processCopy:
      "Forms and structure are part of the craft, but the client-facing promise is a slim, proportioned shape that feels intentional.",
    comparisonRows: [
      ["Choose Extensions if", "You want added length, a shape transformation, or a stronger base for detailed nail art."],
      ["Choose Hard Gel if", "You like your natural length but need more structure, strength, and long-wear support."],
      ["Choose Nail Art if", "Your length and shape are already right and you want French, chrome, cat eye, ombre, or custom detail."]
    ],
    highlights: [
      ["Sculpted form", "Length is built with attention to nail architecture, sidewalls, and a balanced apex."],
      ["Russian manicure base", "The clean prep work supports the final shape and keeps the set looking refined."],
      ["Design-ready", "Extensions can be finished natural, glossy, chrome, French, or with custom nail art."]
    ],
    ctaLabel: "Book Gel Extensions",
    decisionTitle: "Why extensions require structure, not just length.",
    decisionCopy:
      "A refined extension set depends on proportion, sidewalls, balance, prep, and finish. RM designs length to look polished rather than heavy.",
    relatedTitle: "Complete your extension appointment.",
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
    h1: "Builder Gel in Midtown NYC",
    heroCopy:
      "When nails need reinforcement but not full extensions, RM uses structured gel services to keep the look slim and polished.",
    image: serviceImageById("russian-hard-gel", "service-russian-hard-gel-new"),
    imageAlt: "Structured builder gel style manicure result at RM Nail Salon",
    introTitle: "Support, shape, and shine without visual weight.",
    intro:
      "Builder gel is used when a client wants strength, smoother shape, or a more durable manicure on natural nails. RM pairs the overlay with Russian cuticle preparation so the finish stays crisp around the nail fold.",
    serviceType: "Builder Gel Manicure",
    serviceIds: ["russian-hard-gel", "nail-extensions", "fill-in"],
    comparisonLabel: "Builder, Hard Gel, Extensions",
    comparisonTitle: "Choose by what your natural nails need.",
    comparisonRows: [
      ["Choose Builder Gel if", "Your natural nails need support, smoother shape, or reinforcement, but you do not want added length."],
      ["Choose Hard Gel if", "You want stronger structure, longer-wear balance, and a polished overlay with Russian manicure prep."],
      ["Choose Extensions if", "You want new length, a shape transformation, or a more dramatic design-ready manicure."]
    ],
    highlights: [
      ["Natural nail support", "Builder-style gel helps reinforce nails while keeping the manicure refined."],
      ["Smooth architecture", "The surface is shaped for a glossy salon finish, not a thick artificial look."],
      ["Good transition service", "Ideal for clients moving from regular gel to a stronger structured manicure."]
    ],
    ctaLabel: "Book Builder Gel",
    decisionTitle: "Why builder gel is a structural service.",
    decisionCopy:
      "Builder gel adds support and shape while keeping the manicure clean. The result depends on prep, balance, and surface refinement.",
    relatedTitle: "Compare builder gel with hard gel and extensions.",
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
    h1: "Nail Art in Midtown NYC",
    heroCopy:
      "RM uses nail art as a luxury detail: clean, glossy, balanced, and designed around the shape of the hand.",
    image: serviceImageById("nail-design", "service-nail-designs-new"),
    imageAlt: "Finished nail art manicure at RM Nail Salon",
    introTitle: "Detailed nail art designed to look refined, not heavy.",
    intro:
      "Nail art looks more refined when the base manicure is precise. RM pairs Russian manicure standards with French, chrome, cat eye, ombre, and custom accent work for clients who want detail without visual noise.",
    serviceType: "Nail Art",
    serviceIds: ["french", "chrome", "cat-eye", "ombre", "nail-design"],
    highlights: [
      ["Design restraint", "Fine accents, reflective finishes, and clean color placement keep the result high-end."],
      ["Service pairing", "Art can be added to hard gel, extensions, regular polish, or a Russian manicure appointment."],
      ["Photo-ready detail", "The final set is built for close-up detail, clean photos, and a polished finish."]
    ],
    ctaLabel: "Book Nail Art",
    decisionTitle: "Why nail art should be planned around the full set.",
    decisionCopy:
      "The design looks best when it fits the nail length, shape, base color, and service timing. RM keeps detail work polished and wearable.",
    relatedTitle: "Choose the base service for your nail art.",
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
    path: "/nail-salon-midtown-nyc",
    navLabel: "Nail Salon Midtown NYC",
    label: "Midtown NYC",
    title: "Nail Salon Midtown NYC | RM Nail Salon",
    description:
      "RM Nail Salon is a luxury nail salon in Midtown NYC for Russian manicures, hard gel, gel manicures, pedicures, extensions, and nail art.",
    h1: "A luxury nail salon in Midtown NYC for precise manicure work.",
    heroCopy:
      "RM gives Midtown clients a more polished alternative to generic nail appointments, with Russian manicure standards and a cyan-lit studio mood.",
    image: fastImage("brand-salon-front-full"),
    imageAlt: "RM Nail Salon storefront in Midtown NYC",
    area: "Midtown NYC",
    landmarks: ["Third Avenue", "Grand Central Terminal", "Midtown East", "Lexington Avenue"],
    introTitle: "A central Midtown studio built for clients who notice details.",
    intro:
      "RM Nail Salon serves clients who want clean cuticle work, structured gel, smart pedicure care, and a luxury appointment near the center of Manhattan.",
    related: ["/russian-manicure-nyc", "/gel-manicure-midtown-nyc", "/pedicure-midtown-nyc"],
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
    path: "/russian-manicure-grand-central",
    navLabel: "Russian Manicure Grand Central",
    label: "Grand Central",
    title: "Russian Manicure Near Grand Central | RM Nail Salon",
    description:
      "Book a Russian manicure near Grand Central at RM Nail Salon in Midtown NYC, with precise cuticle care, hard gel options, and clean polish.",
    h1: "Russian manicure near Grand Central for polished city schedules.",
    heroCopy:
      "For commuters and Midtown professionals, RM offers a detail-focused Russian manicure close to Grand Central and the Chrysler Building.",
    image: fastImage("brand-city-skyline-tight"),
    imageAlt: "Russian manicure near Grand Central at RM Nail Salon",
    area: "Grand Central",
    landmarks: ["Grand Central Terminal", "Chrysler Building", "Lexington Avenue", "Park Avenue"],
    introTitle: "A clean manicure appointment near the station.",
    intro:
      "Clients near Grand Central book RM for precise cuticle care, structured gel, and a studio experience that feels calm before or after a busy Manhattan day.",
    related: ["/russian-manicure-nyc", "/hard-gel-manicure-nyc", "/gel-manicure-midtown-nyc"],
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
      "RM brings an editorial beauty standard to Midtown clients who want manicures that feel clean, modern, and refined.",
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
  },
  {
    path: "/russian-manicure-murray-hill",
    navLabel: "Russian Manicure Murray Hill",
    label: "Murray Hill",
    title: "Russian Manicure Near Murray Hill | RM Nail Salon",
    description:
      "Book a Russian manicure near Murray Hill at RM Nail Salon in Midtown NYC, with precise cuticle care, hard gel, gel manicures, and pedicures.",
    h1: "Russian manicure near Murray Hill for a cleaner polished finish.",
    heroCopy:
      "RM serves Murray Hill clients looking for Russian manicure detail, structured gel, and a luxury Midtown appointment.",
    image: fastImage("service-combo-clean-real"),
    imageAlt: "Russian manicure and pedicure near Murray Hill at RM Nail Salon",
    area: "Murray Hill",
    landmarks: ["Murray Hill", "Park Avenue", "Madison Avenue", "Grand Central Terminal"],
    introTitle: "A short Midtown trip for cleaner cuticle work.",
    intro:
      "Clients coming from Murray Hill book RM when they want a precise manicure experience with a more elevated finish than a basic salon visit.",
    related: ["/russian-manicure-nyc", "/gel-manicure-midtown-nyc", "/smart-pedicure-nyc"],
    priority: "0.72"
  }
];

export const blogArticlePages = [
  {
    path: "/blog/russian-manicure-vs-regular-manicure",
    navLabel: "Russian vs Regular",
    label: "Russian Manicure Guide",
    title: "Russian Manicure vs Regular Manicure | RM Nail Salon NYC",
    description:
      "Compare Russian manicure and regular manicure prep, cuticle detail, polish wear, safety, timing, and who should book each service in NYC.",
    h1: "Russian manicure vs regular manicure: what changes?",
    heroCopy:
      "The difference is not just polish. It is prep, precision, structure, and how clean the manicure looks as it grows.",
    image: serviceImageById("russian-clear", "service-russian-natural-new"),
    imageAlt: "Clean Russian manicure natural nail result at RM Nail Salon",
    category: "Russian Manicure",
    author: "RM Nail Salon Editorial Team",
    datePublished: "2026-06-27",
    introTitle: "Compare the preparation separately from the finish.",
    intro: "Russian manicure describes a preparation approach; regular polish, gel polish, and structured gel describe different finishes. A photograph alone will not tell you which service was used. Decide whether you want tidy natural nails, color, added support, or extra length before comparing appointment names.",
    excerpt:
      "Understand how Russian manicure prep differs from a regular manicure before booking in Midtown NYC.",
    sections: [
      [
        "What changes during preparation",
        "A conventional manicure may include a soak and hand-tool preparation. A Russian manicure is usually performed without soaking and can involve an electric file. The label does not guarantee a particular result or make aggressive cuticle removal appropriate. Ask what preparation is included and tell the technician how much cuticle work you are comfortable with."
      ],
      [
        "Choose a finish that matches your plans",
        "No-polish care is an option when you want shaping without a gel coating. Regular polish is a color finish rather than a structural overlay. Hard gel adds a separate product structure. If your reference photo has extra length, ask about extensions rather than assuming any manicure can create that shape on your existing nails."
      ],
      [
        "Compare the complete appointment",
        "At RM, the natural manicure and hard-gel manicure are separate menu choices with different appointment lengths. Check the current menu and Booksy availability, and mention existing product, removal, repair, or nail art. Comparing only the headline price can miss extras needed to achieve your reference."
      ],
      [
        "A closer polish edge is not the only priority",
        "The American Academy of Dermatology advises against cutting or forcefully pushing back cuticles. A careful consultation should respect that protective skin, not promise the deepest possible removal. Say immediately if a service hurts; a premium result should not depend on tolerating pain."
      ],
      [
        "Before visiting Midtown",
        "Bring a reference photo and know the name of your existing product if possible. Decide whether maintaining your current length matters more than copying a particular image. All RM appointments take place at 875 3rd Ave, Concourse Level; choose the service on Booksy before planning your travel."
      ]
    ],
    sources: [["AAD: manicure and pedicure safety","https://www.aad.org/public/everyday-care/nail-care-secrets/basics/pedicures/manicure-pedicure-safety"]],
    dateModified: "2026-09-06",
    related: ["/russian-manicure-nyc", "/hard-gel-manicure-nyc", "/sterilization-process"],
    priority: "0.58"
  },
  {
    path: "/blog/how-long-does-hard-gel-last",
    navLabel: "Hard Gel Longevity",
    label: "Hard Gel Guide",
    title: "How Long Does Hard Gel Last? | RM Nail Salon NYC",
    description:
      "Learn how long hard gel manicures last, what affects lifting, when to book a fill-in, and how RM Nail Salon builds structured gel in Midtown NYC.",
    h1: "How long does hard gel last?",
    heroCopy:
      "Hard gel can keep nails stronger and glossier, but longevity depends on prep, structure, nail habits, and timing your maintenance.",
    image: serviceImageById("russian-hard-gel", "service-russian-hard-gel-new"),
    imageAlt: "Hard gel manicure structure at RM Nail Salon in Midtown NYC",
    category: "Hard Gel",
    author: "RM Nail Salon Editorial Team",
    datePublished: "2026-06-27",
    introTitle: "Plan maintenance, not a maximum wear record.",
    intro: "RM's public Booksy description gives a three-to-four-week wear expectation for its hard-gel manicure. Treat that as an estimate rather than a guarantee or a reason to ignore lifting. Your nails continue growing, so a set can need attention even when the color still looks glossy.",
    excerpt:
      "A practical hard gel guide for clients comparing overlay, fill-in, and long-wear manicure options.",
    sections: [
      [
        "What the estimate does and does not mean",
        "Wear time describes how long a result may remain presentable; it does not mean every nail should be left untouched for the same interval. Ask the technician for a return plan based on your existing product, length, growth, and appointment goals. Arrange an earlier assessment if something changes."
      ],
      [
        "An overlay and a fill-in are different appointments",
        "An overlay adds structure over your current nails. A fill-in or correction maintains existing product and addresses growth and shape. Do not choose a correction solely because it is listed at a different price: tell the salon what you are wearing and whether it was applied elsewhere."
      ],
      [
        "Plan around the way you use your hands",
        "Tell your artist about keyboard work, cleaning, sports, and whether you prefer short or long nails. Think about the period between visits as part of the design choice. A shape you can comfortably maintain is more useful than a length chosen only for a photograph."
      ],
      [
        "Do not turn removal into a home experiment",
        "The AAD warns that artificial-nail application and removal can damage natural nails. Ask which product was used and how it should be removed; do not assume all gels dissolve the same way. Arrange professional advice when a set needs correction instead of peeling it off."
      ],
      [
        "Book the right next step",
        "Keep a photo of the finished set and note when any problem first appeared. That gives the salon more useful context than a general statement that gel did not last. For current prices and appointment lengths, compare the hard-gel and fill-in services, then choose an available time on Booksy."
      ]
    ],
    sources: [["RM booking menu","https://booksy.com/en-us/1762849_rm-nail-salon-midtown-nyc-russian-manicure_nail-salon_30067_new-york-city"],["AAD: artificial nails and nail damage","https://www.aad.org/public/everyday-care/nail-care-secrets/basics/pedicures/reduce-artificial-nail-damage"]],
    dateModified: "2026-09-06",
    related: ["/hard-gel-manicure-nyc", "/builder-gel-nyc", "/blog/gel-lifting-reasons"],
    priority: "0.58"
  },
  {
    path: "/blog/is-russian-manicure-safe",
    navLabel: "Russian Manicure Safety",
    label: "Safety Guide",
    title: "Is Russian Manicure Safe? | RM Nail Salon Midtown NYC",
    description:
      "Learn what makes a Russian manicure safe, why training and tool hygiene matter, and how to choose a careful Russian manicure studio in NYC.",
    h1: "Is Russian manicure safe?",
    heroCopy:
      "A Russian manicure should feel controlled, clean, and professional. Safety depends on training, tool hygiene, and how carefully the service is performed.",
    image: fastImage("work-reel-process"),
    imageAlt: "Professional Russian manicure tool work at RM Nail Salon",
    category: "Safety",
    author: "RM Nail Salon Editorial Team",
    datePublished: "2026-06-27",
    introTitle: "No manicure technique is automatically risk-free.",
    intro: "A precise-looking manicure is not proof of a safe process. The condition of your nails and surrounding skin, the products used, and how the appointment is performed all matter. This guide is general information, not a medical assessment or a guarantee that any technique suits everyone.",
    excerpt:
      "What to know about Russian manicure safety, tools, and professional hygiene before booking.",
    sections: [
      [
        "Protect the skin around the nail",
        "Cuticles are protective tissue. The AAD recommends avoiding cutting or forcefully pushing them back. Ask for conservative preparation and discuss your comfort with the technician; clean-looking edges do not justify injury. Stop the service if you experience pain or burning."
      ],
      [
        "Ask about the tools and the setup",
        "Before the appointment, ask how reusable instruments are prepared between clients and which items are single-use. Ask to see the artist's applicable license if you want to verify it. A photograph, a sealed-looking pouch, or the word 'sterile' alone does not explain a salon's complete process."
      ],
      [
        "Tell the salon about previous product reactions",
        "The FDA notes that nail products can cause allergic reactions. Give the salon the product name if you have reacted before, and speak with a healthcare professional about a suspected allergy. Do not treat a different marketing label as proof that another gel will be suitable."
      ],
      [
        "When to postpone cosmetic work",
        "If a nail or the surrounding skin is painful, swollen, injured, or showing an unexplained change, seek appropriate medical advice before covering it with product. A salon visit is not a substitute for diagnosis. You can contact RM about rescheduling or choosing a non-product appointment after receiving advice."
      ],
      [
        "Make the consultation useful",
        "Explain your current product, recent removal, and any sensitivity before work starts. You can ask questions or decline a step. For appointment questions, contact the Midtown studio directly; for health concerns, contact a qualified healthcare professional."
      ]
    ],
    sources: [["AAD: manicure and pedicure safety","https://www.aad.org/public/everyday-care/nail-care-secrets/basics/pedicures/manicure-pedicure-safety"],["FDA: nail care products","https://www.fda.gov/cosmetics/cosmetic-products/nail-care-products"]],
    dateModified: "2026-09-06",
    related: ["/sterilization-process", "/russian-manicure-nyc", "/faq"],
    priority: "0.58"
  },
  {
    path: "/blog/dry-manicure-explained",
    navLabel: "Dry Manicure",
    label: "Technique Guide",
    title: "Dry Manicure Explained | RM Nail Salon NYC",
    description:
      "Dry manicure explained by RM Nail Salon: why Russian manicures avoid soaking, how dry prep helps polish application, and who it is best for.",
    h1: "Dry manicure explained for first-time Russian manicure clients",
    heroCopy:
      "Dry prep helps the technician see the nail clearly, refine the cuticle line carefully, and create a more controlled polish finish.",
    image: serviceImageById("russian-clear", "service-russian-natural-new"),
    imageAlt: "Dry manicure preparation with professional nail tool",
    category: "Technique",
    author: "RM Nail Salon Editorial Team",
    datePublished: "2026-06-27",
    introTitle: "Dry describes the preparation, not the finished coating.",
    intro: "A dry manicure does not include a water soak as its preparation step. It can finish with bare nails, regular polish, or a gel service. Russian manicure commonly uses a dry approach, but the two phrases do not tell you every tool, product, or technique a salon will use.",
    excerpt:
      "Why dry manicure prep is central to the clean, long-lasting Russian manicure look.",
    sections: [
      [
        "Start by separating three decisions",
        "Preparation concerns shaping and the area around the nail. The coating may be polish or a structured product. Length may remain natural or involve extensions. Asking about these separately helps you book the service you actually want instead of choosing only from a trend name."
      ],
      [
        "What to discuss before work begins",
        "Let the artist know whether you currently have gel, acrylic, dip, or extensions. If you do not know, explain where and when it was applied and show a photo. Removal, a broken nail, or a design request can change the appointment; a dry manicure label does not automatically include every extra."
      ],
      [
        "Dry does not mean more aggressive",
        "Skipping a soak is not a reason to remove more skin or file the natural nail heavily. The AAD notes that artificial-nail preparation can weaken nails. Discuss recent thinning or damage and avoid choosing extra product simply to hide a problem that needs assessment."
      ],
      [
        "Choose a useful reference photo",
        "Look for a photo with the nail length and finish you would like, then ask whether that look fits your natural nails. A natural glossy finish, an opaque gel color, and a sculpted extension can look similar in a close crop while requiring different services."
      ],
      [
        "Planning an RM appointment",
        "Compare the natural Russian manicure with the hard-gel option in the service menu. Book real availability on Booksy and mention removal or artwork before your visit. For a first appointment, bring your reference and leave enough time for the full service at our Concourse Level studio."
      ]
    ],
    sources: [["AAD: artificial nails and nail damage","https://www.aad.org/public/everyday-care/nail-care-secrets/basics/pedicures/reduce-artificial-nail-damage"]],
    dateModified: "2026-09-06",
    related: ["/russian-manicure-nyc", "/gel-manicure-midtown-nyc", "/blog/russian-manicure-vs-regular-manicure"],
    priority: "0.56"
  },
  {
    path: "/blog/hard-gel-vs-biab",
    navLabel: "Hard Gel vs BIAB",
    label: "Gel Education",
    title: "Hard Gel vs BIAB | RM Nail Salon Midtown NYC",
    description:
      "Compare hard gel and BIAB-style builder gel for natural nail support, flexibility, structure, fill-ins, and polished manicure results in NYC.",
    h1: "Hard gel vs BIAB: how to choose your structure",
    heroCopy:
      "Both services can strengthen the natural nail. The right choice depends on your nail goals, length, flexibility, and maintenance routine.",
    image: serviceImageById("russian-hard-gel", "service-russian-hard-gel-new"),
    imageAlt: "Structured gel manicure result at RM Nail Salon",
    category: "Builder Gel",
    author: "RM Nail Salon Editorial Team",
    datePublished: "2026-06-27",
    introTitle: "Check the exact product, not just the category name.",
    intro: "Hard gel, builder gel, and BIAB are not interchangeable labels. Builder gel describes a broad product category; BIAB is The GelBottle's branded range. The specific formula determines its intended use and removal method. RM's published hard-gel service does not by itself confirm availability of a particular BIAB product.",
    excerpt:
      "A simple guide to hard gel and BIAB-style builder gel before choosing a manicure service.",
    sections: [
      [
        "There is more than one BIAB formula",
        "The GelBottle lists both soak-off products and Hard BIAB. Its HEMA-Free BIAB guidance describes soak-off removal, while its Hard BIAB range is a hard-gel hybrid. That means 'all BIAB soaks off' is not a dependable rule. Ask for the exact product name before comparing options."
      ],
      [
        "Compare your goal before comparing names",
        "Tell the artist whether you want to maintain natural length, support a longer shape, or add extensions. Also mention how often you can return for maintenance. The appropriate appointment depends on those goals and your existing set, not simply which label is more popular online."
      ],
      [
        "Understand the next appointment too",
        "Ask whether the proposed product will be maintained with a fill-in or removed for a new application, and what that service costs. Removal methods differ between formulas. Do not use a tutorial for one product as instructions for another, or assume a stronger structure is automatically better for your nails."
      ],
      [
        "What to book at RM",
        "The service menu identifies the Russian hard-gel manicure, extensions, and fill-in options separately. If you specifically want BIAB or need maintenance on an existing BIAB set, contact the studio with its product name before booking. We do not list a branded formula as available without confirming it."
      ],
      [
        "Bring a realistic comparison",
        "A useful reference includes your current nails as well as the result you want. Ask about shape, finished thickness, total appointment time, and maintenance, not just shine. Check the final service and price on Booksy before confirming your visit."
      ]
    ],
    sources: [["The GelBottle: HEMA-Free BIAB removal","https://help.thegelbottle.com/support/solutions/articles/202000060645-is-it-a-soak-off-or-file-off-"],["The GelBottle: Hard BIAB","https://thegelbottle.com/hard-biab/"]],
    dateModified: "2026-09-06",
    related: ["/hard-gel-manicure-nyc", "/builder-gel-nyc", "/gel-extensions-nyc"],
    priority: "0.56"
  },
  {
    path: "/blog/gel-lifting-reasons",
    navLabel: "Gel Lifting Reasons",
    label: "Aftercare Guide",
    title: "Why Does Gel Lift? | RM Nail Salon NYC",
    description:
      "Learn why gel manicures lift, including prep, cuticle flooding, nail habits, water exposure, timing, and how RM Nail Salon helps prevent lifting.",
    h1: "Why does gel lift?",
    heroCopy:
      "Lifting usually has a reason. Better prep, better structure, and better aftercare help the manicure stay cleaner for longer.",
    image: fastImage("service-fill-in"),
    imageAlt: "Gel manicure fill-in and correction work at RM Nail Salon",
    category: "Aftercare",
    author: "RM Nail Salon Editorial Team",
    datePublished: "2026-06-27",
    introTitle: "A lifted edge needs assessment, not a stronger top coat.",
    intro: "Lifting describes product separating from the natural nail. The location, timing, product, and daily wear help the salon understand what happened. A photo may show a raised edge, but it cannot reliably establish the cause or rule out a nail or skin condition.",
    excerpt:
      "Common reasons gel lifts and how precise Russian manicure prep can help reduce problems.",
    sections: [
      [
        "Describe what happened and when",
        "Tell the salon which nails are affected, whether the change started near the cuticle or free edge, and how long you have worn the set. Mention an impact, recent removal, or a product change. Do not assume every problem is caused by either the technician or the client."
      ],
      [
        "Preparation and product choices deserve review",
        "The artist can assess the existing set and discuss preparation, application, length, and maintenance. Different products have different requirements. If another salon applied the set, share its product name if possible; an ordinary fill-in may not be the right appointment."
      ],
      [
        "Avoid picking at the lifted area",
        "The AAD advises against picking gel polish or trying to remove it aggressively. Contact the salon for an appropriate correction or removal appointment. Keeping a record of when the issue began is more helpful than repeatedly trying to conceal it."
      ],
      [
        "Watch for more than a cosmetic change",
        "The FDA notes that nail products can cause reactions. Pain, swelling, a rash, or an unexplained nail change deserves medical advice rather than another coating. A manicure service should not be presented as treatment for a suspected infection or allergy."
      ],
      [
        "Plan a practical maintenance routine",
        "Choose a length that fits your daily tasks, use gloves for cleaning, and discuss a return interval with your artist. Regular care does not guarantee that lifting will never occur. For RM correction questions, call or message the studio with a clear photo before choosing a Booksy appointment."
      ]
    ],
    sources: [["AAD: gel manicures","https://www.aad.org/public/everyday-care/nail-care-secrets/basics/pedicures/gel-manicures"],["FDA: nail care products","https://www.fda.gov/cosmetics/cosmetic-products/nail-care-products"]],
    dateModified: "2026-09-06",
    related: ["/hard-gel-manicure-nyc", "/blog/how-long-does-hard-gel-last", "/sterilization-process"],
    priority: "0.56"
  }
];

export const seoPages = [...coreSeoPages, ...serviceLandingPages, ...geoLandingPages, ...blogArticlePages];

const defaultServiceDecision = {
  bestFor: ["Clients who notice cuticle detail", "A cleaner finish in close-up photos", "Appointments where longevity matters"],
  process: ["Consultation and nail assessment", "Dry prep and careful cuticle refinement", "Product or polish application", "Shape, shine, and aftercare review"],
  maintenance: "Most RM clients plan maintenance around 3 to 4 weeks, depending on nail growth, product choice, length, and daily habits.",
  aftercare: "Use cuticle oil, avoid picking, wear gloves for heavy water or cleaning exposure, and book maintenance before the structure grows too far out."
};

const serviceDecisionByPath = {
  "/russian-manicure-nyc": {
    bestFor: ["Clean natural nails", "Crisp cuticle lines", "First-time RM clients comparing regular and Russian manicure"],
    process: ["Dry cuticle and nail plate assessment", "Detailed e-file refinement", "Natural shaping", "Clear, polish, or hard gel finish"],
    maintenance: "A clean Russian manicure is commonly maintained around 3 to 4 weeks, depending on nail growth and product choice.",
    aftercare: "Keep the cuticle area hydrated and avoid picking at the polish edge so the manicure grows out cleanly."
  },
  "/hard-gel-manicure-nyc": {
    bestFor: ["Weak natural nails", "Longer-lasting structure", "Clients who want strength without a bulky look"],
    process: ["Russian manicure prep", "Hard gel structure", "Apex and surface refinement", "Color or glossy finish"],
    maintenance: "Hard gel is usually refreshed with a fill-in around 3 to 4 weeks, before the structure becomes too grown out.",
    aftercare: "Avoid using nails as tools and book a fill before the balance shifts toward the free edge."
  },
  "/gel-extensions-nyc": {
    bestFor: ["Added length", "Shape transformation", "Clients who want design-ready nails"],
    process: ["Natural nail prep", "Length and architecture planning", "Extension sculpting", "Shape refinement and finish"],
    maintenance: "Extensions need timely fill-ins or correction appointments to keep the profile balanced and elegant.",
    aftercare: "Protect longer nails from hard impact and schedule maintenance before lifting or imbalance begins."
  },
  "/smart-pedicure-nyc": {
    bestFor: ["Clean foot care", "No-rush pedicure detail", "Gel or natural toe finish"],
    process: ["Foot and nail assessment", "Smart pedicure preparation", "Shaping and skin detail", "Regular, gel, or no-polish finish"],
    maintenance: "Pedicure timing depends on polish type, nail growth, and skin-care needs. Many clients pair it with manicure visits.",
    aftercare: "Moisturize feet regularly and avoid tight shoes immediately after polish or gel service."
  },
  "/pedicure-midtown-nyc": {
    bestFor: ["Midtown pedicure appointments", "Clean natural toes", "Gel pedicure finishes"],
    process: ["Consultation", "Hygienic pedicure prep", "Nail shaping", "Regular, gel, or no-polish finish"],
    maintenance: "Most clients refresh pedicure care based on nail growth, polish condition, and seasonal foot-care needs.",
    aftercare: "Let regular polish fully set and protect gel polish from hard impact after the appointment."
  },
  "/nail-art-nyc": {
    bestFor: ["French, chrome, cat eye, or ombre", "Editorial details", "Clients who want design without visual noise"],
    process: ["Choose a design direction", "Prepare the base manicure", "Apply detail work by complexity", "Seal and refine the finish"],
    maintenance: "Nail art wears best when paired with a well-prepped manicure and a finish appropriate for your nail length.",
    aftercare: "Avoid picking at raised or detailed elements and book repair quickly if a single nail is damaged."
  }
};

const defaultDecisionFaqs = [
  ["How do I choose the right RM service?", "Choose Russian manicure for clean cuticle work, hard gel or builder gel for structure, extensions for length, and smart pedicure for detailed foot care."],
  ["How long should I expect the result to last?", "Many RM services are maintained around 3 to 4 weeks, but wear depends on nail growth, lifestyle, product type, and aftercare."],
  ["Why does Russian manicure cost more than a basic manicure?", "It takes more time, more detailed preparation, and more controlled technique around the cuticle and nail plate."]
];

const serviceFaqsByPath = {
  "/russian-manicure-nyc": [
    ["What makes Russian manicure different?", "Russian manicure is a dry, detail-focused service that refines the cuticle area and nail plate before polish, gel, or a natural finish is applied."],
    ["Can I book Russian manicure with no polish?", "Yes. RM offers Russian Manicure (clear/no polish) for clients who want clean cuticles, shaping, and a natural polished look."],
    ["How often should I maintain it?", "Many clients return around 3 to 4 weeks, depending on nail growth, product choice, lifestyle, and aftercare."]
  ],
  "/hard-gel-manicure-nyc": [
    ["Who is hard gel best for?", "Hard gel is best for clients who want more strength, smoother structure, or a longer-wearing manicure without a bulky-looking nail."],
    ["Is hard gel the same as regular gel polish?", "No. Gel polish adds color, while hard gel adds structure and support. RM pairs hard gel with Russian manicure prep for a cleaner finish."],
    ["Do I need a fill-in?", "Most hard gel clients maintain the structure with a fill-in around their natural growth cycle."]
  ],
  "/gel-manicure-midtown-nyc": [
    ["Why does RM gel manicure look cleaner?", "RM focuses on detailed prep, cuticle area neatness, and smooth polish edges before the glossy gel finish is cured."],
    ["Can I add nail art to a gel manicure?", "Yes. French, chrome, cat eye, ombre, and custom details can be added depending on timing and design complexity."],
    ["Where can I see current availability?", "Use the Book Appointment button to open Booksy and choose the exact service, date, and time."]
  ],
  "/smart-pedicure-nyc": [
    ["What is a Russian smart pedicure?", "It is a detailed pedicure service focused on clean nail care, shaping, hygienic prep, and either a natural, regular polish, or gel finish."],
    ["Can I book smart pedicure without polish?", "Yes. The menu includes smart pedicure options with or without regular polish, plus gel pedicure options."],
    ["Can I pair it with manicure?", "Yes. Many clients book manicure and pedicure together or choose one of the combo services on the service menu."]
  ],
  "/pedicure-midtown-nyc": [
    ["Do you offer gel pedicure?", "Yes. RM offers Russian Smart Gel Pedicure plus combo options that pair manicure and gel pedicure services."],
    ["Is pedicure available every day?", "RM lists weekday hours from 9:30 AM to 8:00 PM and weekend hours from 10:00 AM to 8:00 PM. Current availability is shown on Booksy."],
    ["Can I book no-polish pedicure?", "Yes. The smart pedicure menu includes with or without regular polish options."]
  ],
  "/gel-extensions-nyc": [
    ["Who should book extensions?", "Extensions are best for clients who want added length, a shape transformation, or a base for more detailed nail art."],
    ["Can extensions look natural?", "Yes. RM focuses on proportion, structure, and sidewall refinement so added length still looks elegant."],
    ["How do I maintain extensions?", "Book timely fill-ins or corrections before the structure grows too far out or becomes imbalanced."]
  ],
  "/builder-gel-nyc": [
    ["Is builder gel good for weak nails?", "Builder-style gel can help support natural nails when they need more structure than gel polish alone."],
    ["Will builder gel look thick?", "RM focuses on balance and surface refinement so structured gel looks slim and polished."],
    ["How is builder gel different from extensions?", "Builder gel supports the natural nail. Extensions add length and require more architecture."]
  ],
  "/nail-art-nyc": [
    ["What nail art can I book?", "RM offers French, chrome, cat eye, ombre, and custom nail design options depending on complexity."],
    ["Should I book nail art separately?", "Nail art is usually added to a manicure, hard gel, or extension service. Book the base service first when choosing your appointment."],
    ["How is nail art priced?", "Pricing depends on the design type and complexity. Booksy shows the current menu and availability."]
  ]
};

export function getDecisionDetails(page) {
  return serviceDecisionByPath[page.path] || defaultServiceDecision;
}

export function getDecisionFaqs(page) {
  if (!serviceLandingPages.some((item) => item.path === page.path)) return [];
  const serviceType = page.serviceType || "this service";
  const pageFaqs = serviceFaqsByPath[page.path] || defaultDecisionFaqs;
  return [
    ...pageFaqs,
    ["How do I book?", `Use the Book Appointment button to open RM Nail Salon on Booksy and reserve ${serviceType} online.`]
  ];
}

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

  if (page.path === "/blog") {
    graph.push(blogCollectionSchema());
  }

  const blogPage = blogArticlePages.find((item) => item.path === page.path);
  if (blogPage) {
    graph.push(articleSchema(blogPage));
  }

  const servicePage = serviceLandingPages.find((item) => item.path === page.path);
  if (servicePage) {
    graph.push(serviceSchema(servicePage));
    graph.push(faqSchemaForPage(servicePage, getDecisionFaqs(servicePage), "service-faq"));
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
    name: siteConfig.googleBusinessName,
    alternateName: siteConfig.salonName,
    url: siteConfig.siteUrl,
    logo: absoluteImage("/images/rm-platinum-monogram.webp"),
    image: absoluteImage(fastImage("brand-salon-front-full")),
    sameAs: [siteConfig.instagramCleanUrl || siteConfig.instagramUrl],
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
    "@type": "NailSalon",
    "@id": `${siteConfig.siteUrl}/#nailsalon`,
    name: siteConfig.googleBusinessName,
    alternateName: siteConfig.salonName,
    url: siteConfig.siteUrl,
    additionalType: "https://schema.org/BeautySalon",
    image: [
      absoluteImage(fastImage("rm-hero")),
      absoluteImage(fastImage("brand-salon-front-full")),
      absoluteImage(serviceImageById("russian-hard-gel", "service-russian-hard-gel-new"))
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
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:30",
        closes: "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "10:00",
        closes: "20:00"
      }
    ],
    areaServed: [
      "Midtown Manhattan",
      "Midtown NYC",
      "Midtown East",
      "Grand Central",
      "Rockefeller Center",
      "Fifth Avenue",
      "Bryant Park",
      "Sutton Place",
      "Murray Hill",
      "Third Avenue",
      "Lexington Avenue",
      "Park Avenue",
      "New York City"
    ],
    hasMap: siteConfig.mapUrl,
    sameAs: [siteConfig.instagramCleanUrl || siteConfig.instagramUrl, siteConfig.bookingUrl],
    potentialAction: {
      "@type": "ReserveAction",
      target: siteConfig.bookingUrl,
      result: {
        "@type": "Reservation",
        name: "RM Nail Salon appointment"
      }
    }
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
  return faqSchemaForPage(getSeoPage("/faq"), faqs.map((item) => [item.question, item.answer]), "faq");
}

function faqSchemaForPage(page, pageFaqs = [], id = "faq") {
  if (!pageFaqs.length) return null;
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(page.path)}#${id}`,
    mainEntity: pageFaqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
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

function blogCollectionSchema() {
  return {
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/blog")}#collection`,
    name: "RM Nail Salon Journal",
    description: getSeoPage("/blog").description,
    hasPart: blogArticlePages.map((article) => ({
      "@type": "BlogPosting",
      headline: article.h1,
      url: absoluteUrl(article.path),
      image: absoluteImage(article.image),
      datePublished: article.datePublished,
      author: {
        "@type": "Organization",
        name: siteConfig.salonName
      }
    }))
  };
}

function articleSchema(article) {
  return {
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(article.path)}#article`,
    headline: article.h1,
    name: article.title,
    description: article.description,
    image: absoluteImage(article.image),
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Organization",
      name: siteConfig.salonName,
      url: siteConfig.siteUrl
    },
    publisher: {
      "@id": `${siteConfig.siteUrl}/#organization`
    },
    mainEntityOfPage: {
      "@id": `${absoluteUrl(article.path)}#webpage`
    },
    articleSection: article.category,
    inLanguage: "en-US"
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
    areaServed: ["Midtown Manhattan", "Midtown East", "New York City"],
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: extractPrice(service.price),
      availability: "https://schema.org/InStock",
      url: siteConfig.bookingUrl,
      eligibleRegion: "New York, NY"
    }
  };
}

function extractPrice(price = "") {
  const match = String(price).match(/\d+/);
  return match ? match[0] : undefined;
}
