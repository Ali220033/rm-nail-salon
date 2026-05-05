export const siteConfig = {
  salonName: "RM Nail Salon",
  location: "Midtown NYC",
  specialty: "Russian Manicure",
  bookingUrl: "https://booksy.com/en-us/dl/show-business/1762849?utm_medium=c2c_referral",
  instagramUrl: "https://www.instagram.com/rmnailsalon.nyc?igsh=eWIyNXhxZTNwOGdh&utm_source=qr",
  phone: "346-865-6565",
  email: "rmnyc2026@gmail.com",
  address: "875 3rd Ave, Concourse Level, New York, NY 10022",
  hours: "Mon-Fri: 9:30 AM - 8:00 PM\nSat-Sun: 9:30 AM - 8:00 PM",
  instagramHandle: "@rmnailsalon.nyc",
  firstVisitOffer: "10% OFF First Visit",
  processVideo: "/videos/rm-manicure-session.webm",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=875%203rd%20Ave%20Concourse%20Level%20New%20York%20NY%2010022",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=875%203rd%20Ave%20Concourse%20Level%2C%20New%20York%2C%20NY%2010022&t=m&z=14&output=embed"
};

export const fastImage = (name) => `/images/fast/${name}.jpg`;

const processImage = fastImage("work-reel-process");
const extensionImage = fastImage("service-extensions");
const russianClearImage = fastImage("service-russian-clear");
const mensManicureImage = fastImage("service-mens-manicure");
const japaneseManicureImage = fastImage("service-japanese-manicure");
const hardGelImage = fastImage("service-hard-gel");
const spaHardGelImage = fastImage("service-spa-hard-gel-v2");
const fillInImage = fastImage("service-fill-in");
const smartPedicureImage = fastImage("service-smart-pedicure");
const spaPedicureImage = fastImage("service-spa-pedicure-v2");
const gelPedicureImage = fastImage("service-gel-pedicure");
const spaGelPedicureImage = fastImage("service-spa-gel-pedicure-v2");
const comboImage = fastImage("service-combo");
const mensComboImage = fastImage("service-mens-combo");
const vipRoomImage = fastImage("brand-salon-front-full");
const chromeImage = fastImage("service-chrome");
const ombreImage = fastImage("service-ombre");
const removalImage = fastImage("service-removal");
const repairImage = fastImage("service-repair");
const nailDesignImage = fastImage("brand-phone-red-nails");
const regularPolishImage = fastImage("brand-face-red-nails-tight");
const frenchImage = fastImage("ref-gallery-french-square");
const catEyeServiceImage = fastImage("ref-gallery-blue-glitter");
const bestFriendsImage = fastImage("ref-gallery-teal-orange");
const extraLongImage = fastImage("ref-gallery-gothic");
const acrylicRemovalImage = fastImage("ref-gallery-white-macro");

export const serviceMenu = [
  {
    category: "Manicure",
    note: "Russian dry manicure standards with clean shaping, cuticle refinement, and a polished finish.",
    services: [
      {
        id: "russian-clear",
        name: "Russian Manicure (clear/no polish)",
        shortName: "Russian Manicure",
        time: "45 min",
        price: "$55",
        topTech: "$65",
        image: russianClearImage,
        description:
          "A precise waterless manicure for clean cuticles, natural nail shaping, and a healthy polished look without color."
      },
      {
        id: "mens-manicure",
        name: "Men's Manicure (no polish)",
        shortName: "Men's Manicure",
        time: "40 min",
        price: "$65",
        topTech: "$75",
        image: mensManicureImage,
        description:
          "Clean grooming, precise cuticle care, nail shaping, and a refined natural finish for a polished appearance."
      },
      {
        id: "japanese-manicure",
        name: "Japanese Manicure (clear)",
        shortName: "Japanese Care",
        time: "1 hr",
        price: "$85",
        topTech: "$90",
        image: japaneseManicureImage,
        description:
          "A restorative natural nail care ritual focused on shine, strength, and a soft healthy finish."
      },
      {
        id: "russian-hard-gel",
        name: "Russian Manicure (hard gel)",
        shortName: "Hard Gel Russian",
        time: "1 hr 30 min",
        price: "$105",
        topTech: "$115",
        image: hardGelImage,
        description:
          "The signature long-wear service: dry cuticle work, balanced hard gel overlay, color, and a glossy premium finish."
      },
      {
        id: "spa-russian-hard-gel",
        name: "Spa Russian Manicure (hard gel)",
        shortName: "Spa Hard Gel",
        time: "2 hr",
        price: "$120",
        topTech: "$130",
        image: spaHardGelImage,
        description:
          "The signature hard gel manicure with elevated spa care for clients who want extra softness and detail."
      },
      {
        id: "nail-extensions",
        name: "Nail Extensions",
        shortName: "Extensions",
        time: "2 hr 30 min",
        price: "$175+",
        topTech: "$195+",
        image: extensionImage,
        description:
          "Sculpted length and architecture with a slim, elegant profile, finished with color or a refined clean look."
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
        name: "Russian Smart Pedicure (with/without reg polish)",
        shortName: "Smart Pedicure",
        time: "1 hr 15 min",
        price: "$85",
        topTech: "$95",
        image: smartPedicureImage,
        description:
          "Detailed foot and nail care with or without polish, designed for a fresh and hygienic finish."
      },
      {
        id: "spa-smart-pedicure",
        name: "Spa Russian Smart Pedicure w/without reg polish",
        shortName: "Spa Pedicure",
        time: "1 hr 30 min",
        price: "$115",
        topTech: "$125",
        image: spaPedicureImage,
        description:
          "A deeper spa pedicure experience with smoothing, grooming, and a calm luxury close."
      },
      {
        id: "smart-gel-pedicure",
        name: "Russian Smart Gel Pedicure",
        shortName: "Smart Gel Pedicure",
        time: "1 hr 15 min",
        price: "$110",
        topTech: "$120",
        image: gelPedicureImage,
        description:
          "Smart pedicure care finished with gel color for a clean, glossy, longer-wearing result."
      },
      {
        id: "spa-smart-gel-pedicure",
        name: "Spa Russian Smart Gel Pedicure",
        shortName: "Spa Gel Pedicure",
        time: "1 hr 30 min",
        price: "$140",
        topTech: "$150",
        image: spaGelPedicureImage,
        description:
          "The complete spa pedicure experience with gel polish, skin smoothing, and a premium finish."
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
        image: comboImage,
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
        image: comboImage,
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
        image: gelPedicureImage,
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
        image: japaneseManicureImage,
        description:
          "Japanese manicure care paired with spa pedicure details for natural nails that look quietly expensive."
      },
      {
        id: "mens-grooming-combo",
        name: "Men's Grooming Combo",
        shortName: "Men's Combo",
        time: "1 hr 55 min",
        price: "$140",
        topTech: "$160",
        image: mensComboImage,
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
        image: bestFriendsImage,
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
        image: mensComboImage,
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
        image: processImage,
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
        name: "French",
        shortName: "French",
        time: "15 min",
        price: "$25+",
        topTech: null,
        image: frenchImage,
        description:
          "A clean French finish, from classic white to RM's signature aqua micro-French."
      },
      {
        id: "cat-eye",
        name: "Cat Eye",
        shortName: "Cat Eye",
        time: "15 min",
        price: "$20+",
        topTech: null,
        image: catEyeServiceImage,
        description:
          "Dimensional magnetic gel with a luminous line that moves beautifully in the light."
      },
      {
        id: "chrome",
        name: "Chrome",
        shortName: "Chrome",
        time: "15 min",
        price: "$20",
        topTech: null,
        image: chromeImage,
        description:
          "A high-shine reflective finish for clients who want a modern editorial detail."
      },
      {
        id: "ombre",
        name: "Ombre",
        shortName: "Ombre",
        time: "20 min",
        price: "$30",
        topTech: null,
        image: ombreImage,
        description:
          "Soft gradient color work with a clean, blended luxury effect."
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
        id: "nail-design",
        name: "Nail Designs",
        shortName: "Nail Design",
        time: "20 min",
        price: "$25",
        topTech: null,
        image: nailDesignImage,
        description:
          "Custom detail work priced by complexity, from fine accents to more involved design."
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
  "spa-russian-hard-gel",
  "smart-gel-pedicure",
  "nail-extensions",
  "cat-eye",
  "gel-removal"
];

export const featuredServices = serviceMenu
  .flatMap((group) => group.services.map((service) => ({ ...service, category: group.category })))
  .filter((service) => featuredServiceIds.includes(service.id));

export const galleryItems = [
  { title: "RM Campaign", caption: "Brandbook campaign mood with red manicure detail.", tone: "aqua", size: "tall", image: fastImage("brand-face-red-nails-framed") },
  { title: "Midtown Studio", caption: "Cyan RM storefront presence in Midtown NYC.", tone: "plum", size: "wide", image: fastImage("brand-salon-front-full") },
  { title: "Master at Work", caption: "A clean process moment with professional tools.", tone: "mist", size: "small", image: processImage },
  { title: "Clean Russian", caption: "Immaculate natural cuticle line.", tone: "cream", size: "small", image: russianClearImage },
  { title: "Chrome Light", caption: "Reflective shine with cyan movement.", tone: "gold", size: "wide", image: chromeImage },
  { title: "Ombre Veil", caption: "Soft cream gradient with quiet luxury.", tone: "mist", size: "small", image: ombreImage },
  { title: "Hard Gel", caption: "Balanced structure applied with precision.", tone: "cream", size: "wide", image: hardGelImage },
  { title: "Pedicure Detail", caption: "Clean foot care in a cyan-lit suite.", tone: "plum", size: "tall", image: spaPedicureImage },
  { title: "Gel Pedicure", caption: "Glossy toes, clean tools, long wear.", tone: "line", size: "small", image: gelPedicureImage },
  { title: "Extensions", caption: "Length, structure, and refined shaping.", tone: "structure", size: "small", image: extensionImage },
  { title: "Brandbook Social", caption: "RM visual system adapted for social-first clients.", tone: "aquaGold", size: "wide", image: fastImage("brand-social-grid") },
  { title: "Men's Grooming", caption: "Natural grooming with the same RM precision.", tone: "mist", size: "small", image: mensManicureImage },
  { title: "Early Bird", caption: "Special offer campaign from the RM brandbook.", tone: "gold", size: "small", image: fastImage("brand-offer-earlybird-tight") },
  { title: "Return Visit", caption: "A fashion-forward offer visual for repeat bookings.", tone: "aqua", size: "small", image: fastImage("brand-offer-return-tight") },
  { title: "Nude Square", caption: "Reference-style clean nude square finish.", tone: "cream", size: "small", image: fastImage("ref-gallery-nude-square") },
  { title: "Ocean Art", caption: "Detailed hand-painted art for statement sets.", tone: "aqua", size: "wide", image: fastImage("ref-gallery-ocean-art") },
  { title: "Burgundy Gloss", caption: "Deep glossy color with editorial shine.", tone: "plum", size: "small", image: fastImage("ref-gallery-burgundy") },
  { title: "Leopard French", caption: "A bolder design direction with clean edges.", tone: "gold", size: "small", image: fastImage("ref-gallery-leopard") },
  { title: "Red Almond", caption: "Classic red with a luxury shape.", tone: "line", size: "small", image: fastImage("ref-gallery-red") },
  { title: "Glitter Cat Eye", caption: "Dimensional reflective color movement.", tone: "structure", size: "wide", image: fastImage("ref-gallery-glitter-multi") },
  { title: "Lavender Lines", caption: "Soft stripes and precise detailing.", tone: "mist", size: "small", image: fastImage("ref-gallery-lavender-stripes") },
  { title: "White Macro", caption: "Close-up polish detail and shine.", tone: "cream", size: "small", image: fastImage("ref-gallery-white-macro") },
  { title: "French Square", caption: "Clean French on a squared shape.", tone: "aquaGold", size: "small", image: fastImage("ref-gallery-french-square") },
  { title: "Blue Pedicure", caption: "Pedicure color inspiration with high shine.", tone: "line", size: "small", image: fastImage("ref-gallery-pedi-blue") },
  { title: "Turquoise French", caption: "Aqua-tipped inspiration for RM color.", tone: "aqua", size: "wide", image: fastImage("ref-gallery-turquoise-french") }
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
    question: "What makes Russian manicure different?",
    answer:
      "Russian manicure is a dry, detail-focused technique that refines the cuticle area with precision tools for a very clean, long-lasting finish."
  },
  {
    question: "How long does a hard gel Russian manicure last?",
    answer:
      "Most clients book maintenance around 3 to 4 weeks, depending on nail growth, lifestyle, and aftercare."
  },
  {
    question: "Is the process hygienic?",
    answer:
      "The site is built around hygiene messaging because it is part of the premium standard: clean tools, careful prep, and a calm professional process."
  },
  {
    question: "Can I book directly from the website?",
    answer:
      "Yes. All booking buttons are connected to the Fresha booking link in the config file, and the link can be replaced later if needed."
  },
  {
    question: "Can the photos be replaced with real work later?",
    answer:
      "Yes. Every image path is centralized in the service and gallery data, so replacing campaign or portfolio images with client-approved photos is simple."
  }
];
