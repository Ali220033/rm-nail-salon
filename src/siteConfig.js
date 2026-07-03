export const siteConfig = {
  salonName: "RM Nail Salon",
  siteUrl: "https://www.rmnailsalon.com",
  location: "Midtown NYC",
  specialty: "Russian Manicure",
  bookingUrl: "https://booksy.com/en-us/1762849_rm-nail-salon-midtown-nyc_nail-salon_30067_new-york-city",
  instagramUrl: "https://www.instagram.com/rmnailsalon.nyc?igsh=eWIyNXhxZTNwOGdh&utm_source=qr",
  instagramCleanUrl: "https://www.instagram.com/rmnailsalon.nyc/",
  phone: "346-865-6565",
  email: "rmnyc2026@gmail.com",
  address: "875 3rd Ave, Concourse Level, New York, NY 10022",
  hours: "Every day: 9:30 AM - 7:30 PM",
  instagramHandle: "@rmnailsalon.nyc",
  firstVisitOffer: "10% OFF First Visit",
  processVideo: "/videos/rm-manicure-session.webm",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=875%203rd%20Ave%20Concourse%20Level%20New%20York%20NY%2010022",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=875%203rd%20Ave%20Concourse%20Level%2C%20New%20York%2C%20NY%2010022&t=m&z=14&output=embed"
};

export const fastImage = (name) => `/images/fast/${name}.webp`;

const processImage = fastImage("work-reel-process");
const driveAsian1Image = fastImage("drive-asian-1");
const driveAsian3Image = fastImage("drive-asian-3");
const driveAsian4Image = fastImage("drive-asian-4");
const driveAsian5Image = fastImage("drive-asian-5");
const driveAsian6Image = fastImage("drive-asian-6");
const driveBlackImage = fastImage("drive-black");
const driveBrown1Image = fastImage("drive-brown-1");
const driveMidtownImage = fastImage("drive-midtown");
const driveWhiteImage = fastImage("drive-white");
const driveOfferBackImage = fastImage("drive-offer-back");
const driveOfferBirdImage = fastImage("drive-offer-bird");
const driveOfferBirthdayImage = fastImage("drive-offer-birthday");
const driveOfferShareImage = fastImage("drive-offer-share");
const extensionProcessImage = fastImage("service-extensions");
const extensionImage = fastImage("gallery-extensions");
const cleanComboImage = fastImage("service-combo-clean-real");
const gelNoPolishComboImage = fastImage("service-combo-gel-no-polish");
const russianClearImage = fastImage("service-russian-clear");
const mensManicureImage = fastImage("service-mens-manicure");
const japaneseManicureImage = fastImage("service-japanese-manicure");
const hardGelProcessImage = fastImage("service-hard-gel");
const hardGelImage = fastImage("gallery-aqua-french");
const spaHardGelImage = fastImage("service-ombre");
const fillInImage = fastImage("service-fill-in");
const smartPedicureProcessImage = fastImage("service-smart-pedicure");
const smartPedicureImage = fastImage("gallery-pedicure");
const spaPedicureImage = fastImage("service-spa-pedicure-v2");
const gelPedicureImage = fastImage("service-gel-pedicure");
const spaGelPedicureImage = fastImage("service-spa-gel-pedicure-v2");
const mensComboImage = fastImage("service-mens-combo");
const vipRoomImage = fastImage("service-vip-room");
const chromeImage = fastImage("service-chrome");
const ombreImage = fastImage("service-ombre");
const removalImage = fastImage("service-removal");
const repairImage = fastImage("service-repair");
const nailDesignProcessImage = fastImage("service-nail-design");
const nailDesignImage = fastImage("gallery-plum-gold");
const regularPolishImage = fastImage("service-regular-polish");
const frenchImage = fastImage("ref-gallery-french-square");
const catEyeServiceImage = fastImage("ref-gallery-blue-glitter");
const bestFriendsImage = cleanComboImage;
const extraLongImage = extensionImage;
const acrylicRemovalImage = fastImage("ref-gallery-white-macro");
const newRussianHardGelImage = fastImage("service-russian-hard-gel-new");
const newRussianNaturalImage = fastImage("service-russian-natural-new");
const newJapaneseClearImage = fastImage("service-japanese-clear-new");
const newMensNoPolishImage = fastImage("service-mens-no-polish-new");
const newRussianExtensionsImage = fastImage("service-russian-extensions-new");
const newSmartGelPedicureImage = fastImage("service-smart-gel-pedicure-new");
const newSmartPedicureNaturalImage = fastImage("service-smart-pedicure-natural-new");
const newCatEyeImage = fastImage("service-cat-eye-new");
const newClassicFrenchImage = fastImage("service-classic-french-new");
const newChromeDesignImage = fastImage("service-chrome-design-new");
const newOmbreDesignImage = fastImage("service-ombre-design-new");
const newNailDesignsImage = fastImage("service-nail-designs-new");

export const serviceMenu = [
  {
    category: "Manicure",
    note: "Russian dry manicure standards with clean shaping, cuticle refinement, and a polished finish.",
    services: [
      {
        id: "russian-clear",
        name: "Russian Manicure (no polish/regular polish)",
        shortName: "Russian Manicure",
        time: "45 min",
        price: "$65",
        topTech: null,
        image: newRussianNaturalImage,
        description:
          "A highly precise dry manicure using professional e-file techniques to deeply clean cuticles and shape nails perfectly. Available with no polish for a natural, healthy look or finished with regular nail polish for a classic touch of color. Best for clients who prefer beautifully groomed nails without gel."
      },
      {
        id: "mens-manicure",
        name: "Men's Manicure (no polish)",
        shortName: "Men's Manicure",
        time: "40 min",
        price: "$75",
        topTech: null,
        image: newMensNoPolishImage,
        description:
          "A professional manicure designed for men, combining expert cuticle cleaning, shaping, and buffing for a clean, healthy appearance. Includes a relaxing hand massage for overall care. Best for men who want neat, strong, and well-maintained nails."
      },
      {
        id: "japanese-manicure",
        name: "Japanese Manicure (clear)",
        shortName: "Japanese Care",
        time: "1 h",
        price: "$90",
        topTech: null,
        image: newJapaneseClearImage,
        description:
          "A restorative nail treatment using mineral-rich paste and powder to strengthen nails, smooth the nail plate, and create a natural glossy shine. Performed only on natural nails without polish or gel. Best for weak, brittle, or damaged nails that need strength and natural shine."
      },
      {
        id: "russian-hard-gel",
        name: "Russian Manicure (Hard gel)",
        shortName: "Hard Gel Russian",
        time: "1 h 30 min",
        price: "$115",
        topTech: null,
        image: newRussianHardGelImage,
        description:
          "A luxury service that combines precise Russian cuticle work with structured hard gel to create strong, perfectly balanced nail architecture. Ideal for weak, thin, or brittle nails, this technique reinforces the natural nail, corrects shape, and provides exceptional durability while maintaining an elegant, glossy, natural-looking finish."
      },
      {
        id: "nail-extensions",
        name: "Russian Nail Extensions",
        shortName: "Extensions",
        time: "2 h 30 min",
        price: "$195-$215",
        topTech: null,
        image: newRussianExtensionsImage,
        description:
          "An advanced extension service designed to create customized length and shape in a single visit. Meticulous Russian manicure techniques are combined with a safe, flexible, long-lasting gel system to sculpt balanced, elegant nail architecture tailored to each client."
      },
      {
        id: "fill-in",
        name: "Fill-in (correction of extended nails)",
        shortName: "Fill-in",
        time: "2 hr",
        price: "$130",
        topTech: "$140",
        image: fillInImage,
        description:
          "Structure balancing, regrowth correction, shaping, and a refreshed finish for existing extensions."
      }
    ]
  },
  {
    category: "Pedicure",
    note: "Smart pedicure care with hygienic tools, polished skin work, and a clean glossy finish.",
    services: [
      {
        id: "smart-pedicure",
        name: "Russian Smart Pedicure w/no regular polish",
        shortName: "Smart Pedicure",
        time: "1 h 15 min",
        price: "$95",
        topTech: null,
        image: newSmartPedicureNaturalImage,
        description:
          "A luxurious dry pedicure performed with professional e-file techniques to refine the nails, perfect the cuticles, and gently smooth the entire foot. Calluses and dry skin are carefully polished away with precision for a hygienic, controlled treatment. Available with regular polish or without polish for a clean, natural finish."
      },
      {
        id: "smart-gel-pedicure",
        name: "Russian Smart Gel Pedicure",
        shortName: "Smart Gel Pedicure",
        time: "1 h 15 min",
        price: "$120",
        topTech: null,
        image: newSmartGelPedicureImage,
        description:
          "An elevated pedicure designed for precision and comfort. Includes meticulous dry cuticle detailing, precise nail shaping, gentle controlled callus refinement, and a high-gloss long-lasting gel application for a clean, flawlessly smooth look."
      }
    ]
  },
  {
    category: "Combo Services",
    note: "Paired appointments for clients who want the full RM finish in one visit.",
    services: [
      {
        id: "combo-clear",
        name: "No polish Manicure + Regular/No polish Pedicure",
        shortName: "Clean Combo",
        time: "2 hr",
        price: "$135",
        topTech: "$150",
        image: newRussianNaturalImage,
        description:
          "Natural nail grooming for hands and feet with precise shaping, cuticle care, and a clean finish."
      },
      {
        id: "hard-gel-smart",
        name: "Gel Manicure+Pedicure w/no polish",
        shortName: "Hard Gel Combo",
        time: "2 hr 45 min",
        price: "$185",
        topTech: "$200",
        image: newRussianHardGelImage,
        description:
          "A polished hard gel manicure paired with smart pedicure care for a complete elevated look."
      },
      {
        id: "hard-gel-smart-gel",
        name: "Russian Gel Manicure+Russian Smart Gel Pedicure",
        shortName: "Gel Combo",
        time: "2 hr 45 min",
        price: "$210",
        topTech: "$220",
        image: newSmartGelPedicureImage,
        description:
          "Long-wear gel finish for hands and feet with meticulous shaping and glossy color."
      },
      {
        id: "natural-care-combo",
        name: "Natural Nail Care Combo",
        shortName: "Natural Care",
        time: "2 hr 30 min",
        price: "$185",
        topTech: "$200",
        image: newJapaneseClearImage,
        description:
          "Japanese manicure care paired with spa pedicure details for natural nails that look quietly refined."
      },
      {
        id: "mens-grooming-combo",
        name: "Men's Grooming Combo",
        shortName: "Men's Combo",
        time: "1 hr 55 min",
        price: "$140",
        topTech: "$160",
        image: newMensNoPolishImage,
        description:
          "Hands and feet groomed with clean cuticle work, shaping, and a polished natural finish."
      },
      {
        id: "vip-room",
        name: "VIP Room Service",
        shortName: "VIP Room",
        time: "2 hr",
        price: "$285",
        topTech: "$300",
        image: vipRoomImage,
        description:
          "A more private and elevated booking experience for clients who want extra quiet and attention."
      },
      {
        id: "best-friends-combo",
        name: "Best Friends Combo",
        shortName: "Best Friends",
        time: "1 hr 30 min",
        price: "$200",
        topTech: "$220",
        image: newClassicFrenchImage,
        description:
          "A shared appointment experience for two guests who want a polished manicure and pedicure moment together."
      },
      {
        id: "mr-mrs-combo",
        name: "Mr & Mrs Combo Service",
        shortName: "Mr & Mrs",
        time: "1 hr 30 min",
        price: "$250",
        topTech: "$275",
        image: newOmbreDesignImage,
        description:
          "A couples service with refined grooming and polished care designed for two."
      },
      {
        id: "four-hands-combo",
        name: "SAME TIME (4 Hands) combo",
        shortName: "4 Hands",
        time: "1 hr 30 min",
        price: "$275",
        topTech: "$290",
        image: newNailDesignsImage,
        description:
          "A time-saving luxury appointment where two technicians work simultaneously for a complete finish."
      }
    ]
  },
  {
    category: "Add-ons & Designs",
    note: "Minimal, glossy, and editorial finishing touches for a signature set.",
    services: [
      {
        id: "french",
        name: "Classic French",
        shortName: "French",
        time: "15 min",
        price: "$25",
        topTech: null,
        image: newClassicFrenchImage,
        description:
          "A timeless choice that highlights elegance and natural beauty. Performed with exceptional precision: ultra-thin smile lines, seamless blending, and perfectly balanced shaping that enhances the natural nail structure."
      },
      {
        id: "cat-eye",
        name: "Cat eye",
        shortName: "Cat Eye",
        time: "15 min",
        price: "$20",
        topTech: null,
        image: newCatEyeImage,
        description:
          "A magnet-activated technique that creates a deep, dimensional glow reminiscent of gemstone reflections. Premium magnetic gels create sharp luminous lines or soft diffused galaxy effects tailored to your preference."
      },
      {
        id: "chrome",
        name: "Chrome design",
        shortName: "Chrome",
        time: "15 min",
        price: "$20",
        topTech: null,
        image: newChromeDesignImage,
        description:
          "Chrome designs create a flawless mirror-like shine or delicate pearlescent glow using high-grade rubbed pigments. The effect can range from soft opalescent shimmer to bold ultra-metallic reflection."
      },
      {
        id: "ombre",
        name: "Ombre design",
        shortName: "Ombre",
        time: "20 min",
        price: "$30",
        topTech: null,
        image: newOmbreDesignImage,
        description:
          "A flawlessly blended gradient created using soft-brush techniques for a smooth, seamless color transition. The Russian approach keeps the fade clean at the cuticle with no harsh lines, streaks, or uneven texture."
      },
      {
        id: "nail-design",
        name: "Nail Designs",
        shortName: "Nail Designs",
        time: "Varies",
        price: "Individual",
        topTech: null,
        image: newNailDesignsImage,
        description:
          "Fully customized nail art inspired by your ideas, from intricate hand-painted designs to multi-layer textures, 3D elements, abstract concepts, or themed sets. Pricing is individual and based on design complexity."
      },
      {
        id: "regular-polish",
        name: "Regular Polish",
        shortName: "Polish",
        time: "15 min",
        price: "$15+",
        topTech: null,
        image: regularPolishImage,
        description:
          "A classic polish finish added to clean manicure or pedicure work."
      },
      {
        id: "extra-long-nails",
        name: "Extra Long Nails",
        shortName: "Extra Long",
        time: "15 min",
        price: "$20+",
        topTech: null,
        image: extraLongImage,
        description:
          "Added time and structure for extra-long length, shaping, and refinement."
      }
    ]
  },
  {
    category: "Removal & Repair",
    note: "Protective removal and small corrections before the next perfect set.",
    services: [
      {
        id: "gel-removal-toes",
        name: "Gel Removal Only (toes)",
        shortName: "Toe Gel Removal",
        time: "15 min",
        price: "$15",
        topTech: null,
        image: removalImage,
        description:
          "Standalone gel removal for toes with careful product removal and nail-surface protection."
      },
      {
        id: "gel-removal-hands",
        name: "Gel Removal Only (hands)",
        shortName: "Hand Gel Removal",
        time: "20 min",
        price: "$20",
        topTech: null,
        image: removalImage,
        description:
          "Standalone hand gel removal handled gently to protect the natural nail."
      },
      {
        id: "gel-removal",
        name: "Gel removal",
        shortName: "Gel Removal",
        time: "15 min",
        price: "$25",
        topTech: null,
        image: removalImage,
        description:
          "Gel removal service for clients preparing for care, repair, or a fresh set."
      },
      {
        id: "acrylic-removal",
        name: "Acrylic / Dip removal",
        shortName: "Acrylic Removal",
        time: "25 min",
        price: "$25",
        topTech: null,
        image: acrylicRemovalImage,
        description:
          "Safe removal for acrylic or dip product before repair, care, or a new service."
      },
      {
        id: "one-nail-repair",
        name: "One Nail Repair",
        shortName: "Nail Repair",
        time: "10 min",
        price: "$5+",
        topTech: null,
        image: repairImage,
        description:
          "A focused repair for a chipped, cracked, or broken nail."
      },
      {
        id: "hooked-nail-fix",
        name: "Hooked nail fix",
        shortName: "Hooked Nail Fix",
        time: "5 min",
        price: "$3",
        topTech: null,
        image: repairImage,
        description:
          "A quick correction for a hooked or downward-growing nail shape."
      }
    ]
  }
];

export const featuredServiceIds = [
  "russian-hard-gel",
  "russian-clear",
  "nail-extensions",
  "smart-gel-pedicure",
  "smart-pedicure",
  "nail-design"
];

const allServicesWithCategory = serviceMenu.flatMap((group) =>
  group.services.map((service) => ({ ...service, category: group.category }))
);

export const featuredServices = featuredServiceIds
  .map((id) => allServicesWithCategory.find((service) => service.id === id))
  .filter(Boolean);

export const galleryItems = [
  {
    title: "Clean Russian Manicure",
    caption: "Full-hand natural finish with clean cuticle detail.",
    category: "Russian Manicure",
    tone: "cream",
    size: "tall",
    image: newRussianNaturalImage,
    alt: "Full hands with clean natural Russian manicure finish",
    focal: "50% 34%"
  },
  {
    title: "Hard Gel Structure",
    caption: "Balanced hard gel result with a glossy surface.",
    category: "Hard Gel",
    tone: "cream",
    size: "wide",
    image: newRussianHardGelImage,
    alt: "Finished hard gel manicure with glossy structured surface",
    focal: "48% 38%"
  },
  {
    title: "Master at Work",
    caption: "A controlled process moment with professional manicure tools.",
    category: "Process",
    tone: "mist",
    size: "small",
    image: processImage,
    alt: "Technician performing detailed cuticle work with professional tools",
    focal: "52% 42%"
  },
  {
    title: "Smart Pedicure",
    caption: "Clean foot care with precise shaping and polish detail.",
    category: "Pedicure",
    tone: "plum",
    size: "tall",
    image: newSmartPedicureNaturalImage,
    alt: "Smart pedicure service with clean toe nail shaping",
    focal: "50% 42%"
  },
  {
    title: "Gel Pedicure",
    caption: "Glossy gel pedicure result for a clean long-wear finish.",
    category: "Pedicure",
    tone: "line",
    size: "small",
    image: newSmartGelPedicureImage,
    alt: "Glossy gel pedicure result with clean toe polish",
    focal: "50% 50%"
  },
  {
    title: "Nail Extensions",
    caption: "Sculpted length with refined shape and slim structure.",
    category: "Extensions",
    tone: "structure",
    size: "small",
    image: newRussianExtensionsImage,
    alt: "Long nail extensions with refined shape and glossy finish",
    focal: "50% 44%"
  },
  {
    title: "Chrome Finish",
    caption: "Reflective chrome shine with a polished editorial edge.",
    category: "Nail Art",
    tone: "gold",
    size: "wide",
    image: newChromeDesignImage,
    alt: "Chrome manicure with reflective polished finish",
    focal: "50% 46%"
  },
  {
    title: "Ombre Detail",
    caption: "Soft gradient color work with a clean blended finish.",
    category: "Nail Art",
    tone: "mist",
    size: "small",
    image: newOmbreDesignImage,
    alt: "Ombre manicure with soft gradient polish",
    focal: "50% 45%"
  },
  {
    title: "Men's Grooming",
    caption: "Natural grooming with the same clean RM precision.",
    category: "Natural Care",
    tone: "mist",
    size: "small",
    image: newMensNoPolishImage,
    alt: "Men's manicure with clean natural nail grooming",
    focal: "50% 44%"
  },
  {
    title: "French Square",
    caption: "Clean French finish on a squared shape.",
    category: "French",
    tone: "aquaGold",
    size: "small",
    image: newClassicFrenchImage,
    alt: "Square French manicure inspiration with clean white tips",
    focal: "50% 48%"
  },
  {
    title: "Burgundy Gloss",
    caption: "Deep glossy color with a refined shape.",
    category: "Color",
    tone: "plum",
    size: "small",
    image: fastImage("ref-gallery-burgundy"),
    alt: "Burgundy glossy manicure inspiration on shaped nails",
    focal: "50% 46%"
  },
  {
    title: "Red Almond",
    caption: "Classic red manicure inspiration with a luxury shape.",
    category: "Color",
    tone: "line",
    size: "small",
    image: fastImage("ref-gallery-red"),
    alt: "Classic red almond manicure inspiration",
    focal: "50% 48%"
  },
  {
    title: "Ocean Art",
    caption: "Detailed hand-painted nail art for a statement set.",
    category: "Nail Art",
    tone: "aqua",
    size: "wide",
    image: fastImage("ref-gallery-ocean-art"),
    alt: "Detailed ocean-inspired nail art inspiration",
    focal: "50% 50%"
  },
  {
    title: "Glitter Cat Eye",
    caption: "Dimensional reflective color movement.",
    category: "Cat Eye",
    tone: "structure",
    size: "wide",
    image: newCatEyeImage,
    alt: "Glitter cat eye manicure inspiration with reflective polish",
    focal: "50% 50%"
  },
  {
    title: "Studio Detail",
    caption: "Cyan-lit RM studio atmosphere in Midtown.",
    category: "Studio",
    tone: "plum",
    size: "wide",
    image: vipRoomImage,
    alt: "Cyan-lit manicure station with tools inside a premium nail studio",
    focal: "50% 48%"
  },
  {
    title: "Midtown Studio Front",
    caption: "RM Nail Salon at 875 3rd Ave, Concourse Level.",
    category: "Location",
    tone: "aqua",
    size: "small",
    image: fastImage("brand-salon-front-full"),
    alt: "RM Nail Salon storefront at 875 3rd Ave in Midtown Manhattan",
    focal: "50% 45%"
  },
  {
    title: "RM Campaign",
    caption: "Brand campaign mood with red manicure detail.",
    category: "Campaign",
    tone: "aqua",
    size: "small",
    image: driveAsian4Image,
    alt: "RM Nail Salon campaign image with red manicure detail",
    focal: "50% 38%"
  },
  {
    title: "Midtown Glow",
    caption: "NYC skyline campaign frame with the RM cyan signature.",
    category: "Campaign",
    tone: "plum",
    size: "small",
    image: driveMidtownImage,
    alt: "Midtown Manhattan skyline campaign image for RM Nail Salon",
    focal: "50% 50%"
  }
];

export const proofBlocks = [
  ["Midtown NYC", "A central studio experience made for clients booking from Instagram and city schedules."],
  ["Hygienic Tools", "Clean tools, thoughtful preparation, and a process that feels visibly professional."],
  ["Russian Precision", "E-file cuticle work, clean structure, and color placement handled with exacting detail."],
  ["Long-Lasting Results", "A glossy finish designed to stay fresh, balanced, and polished for weeks."],
  ["Clean Luxury", "A calm, feminine, cyan-lit salon experience that feels elevated without feeling cold."]
];

export const faqs = [
  {
    question: "What is a Russian manicure?",
    answer:
      "A Russian manicure is a dry, detail-focused manicure technique that refines the cuticle area and nail plate before polish or gel is applied, creating an exceptionally clean finish."
  },
  {
    question: "How long does a Russian manicure last?",
    answer:
      "Most clients schedule maintenance around 3 to 4 weeks, depending on nail growth, lifestyle, product choice, and aftercare."
  },
  {
    question: "Is Russian manicure safe?",
    answer:
      "Russian manicure should be performed by a trained specialist with careful technique and hygienic tools. RM focuses on controlled prep, clean standards, and a professional appointment pace."
  },
  {
    question: "What is the difference between Russian manicure and regular manicure?",
    answer:
      "A regular manicure usually focuses on basic shaping and polish. Russian manicure is more detail-driven around the cuticle area and nail plate, which helps the final result look cleaner and more precise."
  },
  {
    question: "How long does hard gel last?",
    answer:
      "Hard gel maintenance is commonly booked around 3 to 4 weeks. Retention depends on nail condition, length, daily habits, and aftercare."
  },
  {
    question: "Do you sterilize your tools?",
    answer:
      "RM follows a clean-service workflow: tools are disinfected and prepared between clients, the workspace is reset before each appointment, and detailed cuticle work is performed with controlled professional technique."
  },
  {
    question: "Where are you located in Midtown NYC?",
    answer:
      "RM Nail Salon is located at 875 3rd Ave, Concourse Level, New York, NY 10022, close to Midtown East, Grand Central, Turtle Bay, Sutton Place, and Rockefeller Center."
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Use any Book Appointment button on the website to open the RM Nail Salon Booksy booking page and choose your service, date, and time."
  }
];
