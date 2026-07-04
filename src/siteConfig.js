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
  processVideo: "/videos/rm-master-work.mp4",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=875%203rd%20Ave%20Concourse%20Level%20New%20York%20NY%2010022",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=875%203rd%20Ave%20Concourse%20Level%2C%20New%20York%2C%20NY%2010022&t=m&z=14&output=embed"
};

export const fastImage = (name) => `/images/fast/${name}.webp`;
const gallery1346Image = (name) => `/images/gallery-1346/${name}.webp`;

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
const comboNoPolishRegularPediImage = fastImage("service-combo-no-polish-regular-pedi-new");
const comboGelNoPolishImage = fastImage("service-combo-gel-no-polish-new");
const comboRussianGelSmartGelImage = fastImage("service-combo-russian-gel-smart-gel-new");
const comboNaturalCareImage = fastImage("service-combo-natural-care-new");
const comboBestFriendsImage = fastImage("service-combo-best-friends-new");
const comboMrMrsImage = fastImage("service-combo-mr-mrs-new");
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
const removalToesImage = fastImage("service-removal-toes-new");
const removalHandsImage = fastImage("service-removal-hands-new");
const gelRemovalNewImage = fastImage("service-gel-removal-new");
const oneNailRepairImage = fastImage("service-one-nail-repair-new");
const hookedNailFixImage = fastImage("service-hooked-nail-fix-new");
const nailDesignProcessImage = fastImage("service-nail-design");
const nailDesignImage = fastImage("gallery-plum-gold");
const regularPolishImage = fastImage("service-regular-polish");
const frenchImage = fastImage("ref-gallery-french-square");
const catEyeServiceImage = fastImage("ref-gallery-blue-glitter");
const bestFriendsImage = cleanComboImage;
const extraLongImage = extensionImage;
const acrylicRemovalImage = fastImage("service-acrylic-dip-removal-new");
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
          "A detailed correction service for grown-out extended nails. The existing structure is carefully refined, lifted areas are addressed when possible, the apex is rebalanced, and the shape is restored before a fresh glossy finish is applied. Best for clients who want to maintain length while keeping the nails strong, elegant, and properly balanced."
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
        image: comboNoPolishRegularPediImage,
        description:
          "A clean natural-care appointment for hands and feet in one visit. This combo pairs precise dry manicure work with a regular or no-polish pedicure, including careful shaping, cuticle refinement, and a smooth natural finish. Best for clients who want polished, healthy-looking nails without gel."
      },
      {
        id: "hard-gel-smart",
        name: "Gel Manicure+Pedicure w/no polish",
        shortName: "Hard Gel Combo",
        time: "2 hr 45 min",
        price: "$185",
        topTech: "$200",
        image: comboGelNoPolishImage,
        description:
          "A complete elevated appointment pairing structured gel manicure work with smart pedicure care finished without polish on the toes. The manicure focuses on strength, balance, and a glossy refined surface, while the pedicure keeps the feet clean, smooth, and naturally groomed."
      },
      {
        id: "hard-gel-smart-gel",
        name: "Russian Gel Manicure+Russian Smart Gel Pedicure",
        shortName: "Gel Combo",
        time: "2 hr 45 min",
        price: "$210",
        topTech: "$220",
        image: comboRussianGelSmartGelImage,
        description:
          "A high-gloss long-wear combo for clients who want a finished gel look on both hands and feet. Russian gel manicure precision is paired with Russian Smart Gel Pedicure detailing for clean cuticles, balanced shaping, smooth skin refinement, and durable color designed to stay polished for weeks."
      },
      {
        id: "natural-care-combo",
        name: "Natural Nail Care Combo",
        shortName: "Natural Care",
        time: "2 hr 30 min",
        price: "$185",
        topTech: "$200",
        image: comboNaturalCareImage,
        description:
          "A restorative natural-nail appointment for clients who want strength, shine, and healthy-looking hands and feet without heavy product. Japanese manicure care is paired with precise foot grooming to smooth, refine, and refresh the natural nail plate while keeping the finish soft and elegant."
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
          "A complete grooming appointment for men who want clean, healthy-looking hands and feet. Nails are shaped, cuticles are refined, rough edges are smoothed, and the final buffed finish looks neat, strong, and natural without polish."
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
          "A private elevated appointment experience for clients who want extra calm, focus, and personal attention during their service. Ideal for special occasions, quiet self-care time, or anyone who prefers a more discreet RM studio moment with the same precise manicure and pedicure standards."
      },
      {
        id: "best-friends-combo",
        name: "Best Friends Combo",
        shortName: "Best Friends",
        time: "1 hr 30 min",
        price: "$200",
        topTech: "$220",
        image: comboBestFriendsImage,
        description:
          "A shared beauty appointment for two guests who want to enjoy the RM experience together. Each client receives polished nail care with clean shaping, refined detail, and a finished look designed for photos, plans, and a relaxed moment with someone close."
      },
      {
        id: "mr-mrs-combo",
        name: "Mr & Mrs Combo Service",
        shortName: "Mr & Mrs",
        time: "1 hr 30 min",
        price: "$250",
        topTech: "$275",
        image: comboMrMrsImage,
        description:
          "A couples appointment designed for two people who want clean, refined grooming in one calm booking. The service balances feminine polish and masculine grooming with precise shaping, cuticle care, and a naturally elevated finish for both clients."
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
          "A time-saving luxury appointment where two technicians work simultaneously so your manicure and pedicure can be completed with less waiting. Best for busy clients who still want the full RM standard: clean cuticles, balanced shaping, smooth detail, and a polished finish."
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
          "A classic polish finish added after clean manicure or pedicure work. Nails are prepared with careful shaping and surface refinement before regular color is applied for a fresh, elegant look that feels light and easy to change."
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
          "Additional time and structure for clients choosing extra-long nail length. This add-on allows the artist to refine the architecture, balance the apex, protect the natural nail, and shape the length with the precision needed for a sleek, durable finish."
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
        image: removalToesImage,
        description:
          "A standalone toe gel removal performed with controlled technique to protect the natural nail plate. Product is removed carefully, edges are refined, and the nails are left clean and ready for natural wear, repair, or a fresh pedicure service."
      },
      {
        id: "gel-removal-hands",
        name: "Gel Removal Only (hands)",
        shortName: "Hand Gel Removal",
        time: "20 min",
        price: "$20",
        topTech: null,
        image: removalHandsImage,
        description:
          "A gentle standalone gel removal for hands, designed to protect the natural nail while removing old product. The service focuses on clean product breakdown, careful surface work, and a neat finish before your next manicure or natural nail break."
      },
      {
        id: "gel-removal",
        name: "Gel removal",
        shortName: "Gel Removal",
        time: "15 min",
        price: "$25",
        topTech: null,
        image: gelRemovalNewImage,
        description:
          "A careful gel removal service for clients preparing for repair, natural nail care, or a fresh set. Product is removed with attention to nail health, helping prevent unnecessary thinning while leaving the nail plate clean and ready for the next step."
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
          "A protective removal service for acrylic or dip product. The material is reduced and removed with controlled technique to minimize stress on the natural nail, then the surface is refined so the nails are ready for recovery care, repair, or a new RM service."
      },
      {
        id: "one-nail-repair",
        name: "One Nail Repair",
        shortName: "Nail Repair",
        time: "10 min",
        price: "$5+",
        topTech: null,
        image: oneNailRepairImage,
        description:
          "A focused correction for one chipped, cracked, lifted, or broken nail. The damaged area is cleaned, stabilized, reshaped, and blended into the existing set so the repair looks neat and comfortable until your next full appointment."
      },
      {
        id: "hooked-nail-fix",
        name: "Hooked nail fix",
        shortName: "Hooked Nail Fix",
        time: "5 min",
        price: "$3",
        topTech: null,
        image: hookedNailFixImage,
        description:
          "A precise shape correction for a hooked or downward-growing nail. The artist refines the structure and edge direction to create a cleaner visual line, helping the nail look more balanced while keeping the correction gentle and controlled."
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
    title: "Pearl Line Detail",
    caption: "Soft pearl structure with a clean RM finish.",
    category: "RM Gallery",
    tone: "cream",
    size: "tall",
    image: gallery1346Image("rm-gallery-01"),
    alt: "RM Nail Salon pearl line detail gallery image",
    focal: "50% 50%"
  },
  {
    title: "Precision Cuticle Work",
    caption: "Close-up studio detail from a precise manicure session.",
    category: "RM Gallery",
    tone: "cream",
    size: "small",
    image: gallery1346Image("rm-gallery-02"),
    alt: "RM Nail Salon precision cuticle work gallery image",
    focal: "50% 50%"
  },
  {
    title: "Soft Nude Gloss",
    caption: "Natural glossy nails with a quiet luxury finish.",
    category: "RM Gallery",
    tone: "mist",
    size: "small",
    image: gallery1346Image("rm-gallery-03"),
    alt: "RM Nail Salon soft nude gloss gallery image",
    focal: "50% 50%"
  },
  {
    title: "Minimal Almond Shape",
    caption: "Elegant almond length with clean balanced structure.",
    category: "RM Gallery",
    tone: "plum",
    size: "tall",
    image: gallery1346Image("rm-gallery-04"),
    alt: "RM Nail Salon minimal almond shape gallery image",
    focal: "50% 50%"
  },
  {
    title: "Cyan Studio Shine",
    caption: "Fresh nails photographed in the RM cyan studio mood.",
    category: "RM Gallery",
    tone: "line",
    size: "small",
    image: gallery1346Image("rm-gallery-05"),
    alt: "RM Nail Salon cyan studio shine gallery image",
    focal: "50% 50%"
  },
  {
    title: "Clean French Pedicure",
    caption: "Refined toe detail with a crisp polished edge.",
    category: "RM Gallery",
    tone: "structure",
    size: "small",
    image: gallery1346Image("rm-gallery-06"),
    alt: "RM Nail Salon clean french pedicure gallery image",
    focal: "50% 50%"
  },
  {
    title: "Natural Pedicure Finish",
    caption: "Soft pedicure detail with a clean natural finish.",
    category: "RM Gallery",
    tone: "gold",
    size: "tall",
    image: gallery1346Image("rm-gallery-07"),
    alt: "RM Nail Salon natural pedicure finish gallery image",
    focal: "50% 50%"
  },
  {
    title: "Cat Eye Glow",
    caption: "Dimensional magnetic shine with a polished reflective finish.",
    category: "RM Gallery",
    tone: "mist",
    size: "small",
    image: gallery1346Image("rm-gallery-08"),
    alt: "RM Nail Salon cat eye glow gallery image",
    focal: "50% 50%"
  },
  {
    title: "Classic French Shape",
    caption: "Crisp French lines with balanced nail architecture.",
    category: "RM Gallery",
    tone: "mist",
    size: "small",
    image: gallery1346Image("rm-gallery-09"),
    alt: "RM Nail Salon classic french shape gallery image",
    focal: "50% 50%"
  },
  {
    title: "Milky Ombre Finish",
    caption: "Soft blended ombre with a luminous high-gloss surface.",
    category: "RM Gallery",
    tone: "aquaGold",
    size: "small",
    image: gallery1346Image("rm-gallery-10"),
    alt: "RM Nail Salon milky ombre finish gallery image",
    focal: "50% 50%"
  },
  {
    title: "Soft Pink Structure",
    caption: "Light pink gel structure with a polished natural look.",
    category: "RM Gallery",
    tone: "plum",
    size: "small",
    image: gallery1346Image("rm-gallery-11"),
    alt: "RM Nail Salon soft pink structure gallery image",
    focal: "50% 50%"
  },
  {
    title: "Cherry Nail Art",
    caption: "Delicate cherry detail on a soft glossy base.",
    category: "RM Gallery",
    tone: "line",
    size: "small",
    image: gallery1346Image("rm-gallery-12"),
    alt: "RM Nail Salon cherry nail art gallery image",
    focal: "50% 50%"
  },
  {
    title: "Editorial Hand Detail",
    caption: "A refined hand close-up with polished RM styling.",
    category: "RM Gallery",
    tone: "aqua",
    size: "tall",
    image: gallery1346Image("rm-gallery-13"),
    alt: "RM Nail Salon editorial hand detail gallery image",
    focal: "50% 50%"
  },
  {
    title: "Mirror Detail",
    caption: "Reflective manicure detail with editorial shine.",
    category: "RM Gallery",
    tone: "structure",
    size: "small",
    image: gallery1346Image("rm-gallery-14"),
    alt: "RM Nail Salon mirror detail gallery image",
    focal: "50% 50%"
  },
  {
    title: "Clean Nude Set",
    caption: "Nude manicure detail with smooth structure and cuticle clarity.",
    category: "RM Gallery",
    tone: "plum",
    size: "small",
    image: gallery1346Image("rm-gallery-15"),
    alt: "RM Nail Salon clean nude set gallery image",
    focal: "50% 50%"
  },
  {
    title: "Glossy Short Nails",
    caption: "Short polished nails with a clean natural finish.",
    category: "RM Gallery",
    tone: "aqua",
    size: "small",
    image: gallery1346Image("rm-gallery-16"),
    alt: "RM Nail Salon glossy short nails gallery image",
    focal: "50% 50%"
  },
  {
    title: "French Square Detail",
    caption: "Structured square French design with a refined edge.",
    category: "RM Gallery",
    tone: "aqua",
    size: "small",
    image: gallery1346Image("rm-gallery-17"),
    alt: "RM Nail Salon french square detail gallery image",
    focal: "50% 50%"
  },
  {
    title: "Pearl Almond Set",
    caption: "Soft pearl almond nails with a luxury finish.",
    category: "RM Gallery",
    tone: "plum",
    size: "small",
    image: gallery1346Image("rm-gallery-18"),
    alt: "RM Nail Salon pearl almond set gallery image",
    focal: "50% 50%"
  },
  {
    title: "Studio Manicure Detail",
    caption: "A calm RM studio manicure moment with glossy nails.",
    category: "RM Gallery",
    tone: "cream",
    size: "tall",
    image: gallery1346Image("rm-gallery-19"),
    alt: "RM Nail Salon studio manicure detail gallery image",
    focal: "50% 50%"
  },
  {
    title: "Warm Nude Finish",
    caption: "Warm nude polish captured with a soft beauty finish.",
    category: "RM Gallery",
    tone: "mist",
    size: "small",
    image: gallery1346Image("rm-gallery-20"),
    alt: "RM Nail Salon warm nude finish gallery image",
    focal: "50% 50%"
  },
  {
    title: "Pink Gloss Close-Up",
    caption: "Close-up pink gloss manicure with polished light reflection.",
    category: "RM Gallery",
    tone: "line",
    size: "small",
    image: gallery1346Image("rm-gallery-21"),
    alt: "RM Nail Salon pink gloss close-up gallery image",
    focal: "50% 50%"
  },
  {
    title: "Salon Campaign Mood",
    caption: "Editorial RM campaign mood with nails and studio detail.",
    category: "RM Gallery",
    tone: "aquaGold",
    size: "small",
    image: gallery1346Image("rm-gallery-22"),
    alt: "RM Nail Salon salon campaign mood gallery image",
    focal: "50% 50%"
  },
  {
    title: "Cyan Manicure Moment",
    caption: "Bright cyan-lit manicure detail from the RM portfolio.",
    category: "RM Gallery",
    tone: "plum",
    size: "tall",
    image: gallery1346Image("rm-gallery-23"),
    alt: "RM Nail Salon cyan manicure moment gallery image",
    focal: "50% 50%"
  },
  {
    title: "Clean Shape Study",
    caption: "Balanced nail shape with a fresh polished finish.",
    category: "RM Gallery",
    tone: "structure",
    size: "small",
    image: gallery1346Image("rm-gallery-24"),
    alt: "RM Nail Salon clean shape study gallery image",
    focal: "50% 50%"
  },
  {
    title: "Soft French Detail",
    caption: "Natural French-inspired detail with clean structure.",
    category: "RM Gallery",
    tone: "cream",
    size: "small",
    image: gallery1346Image("rm-gallery-25"),
    alt: "RM Nail Salon soft french detail gallery image",
    focal: "50% 50%"
  },
  {
    title: "Milky White Extension",
    caption: "Milky extension shape with a smooth luxury surface.",
    category: "RM Gallery",
    tone: "mist",
    size: "small",
    image: gallery1346Image("rm-gallery-26"),
    alt: "RM Nail Salon milky white extension gallery image",
    focal: "50% 50%"
  },
  {
    title: "Aqua Studio Texture",
    caption: "RM aqua studio mood with polished nail detail.",
    category: "RM Gallery",
    tone: "gold",
    size: "small",
    image: gallery1346Image("rm-gallery-27"),
    alt: "RM Nail Salon aqua studio texture gallery image",
    focal: "50% 50%"
  },
  {
    title: "Polished Client Result",
    caption: "Fresh client result photographed in the RM style.",
    category: "RM Gallery",
    tone: "aqua",
    size: "tall",
    image: gallery1346Image("rm-gallery-28"),
    alt: "RM Nail Salon polished client result gallery image",
    focal: "50% 50%"
  },
  {
    title: "Full Portfolio Look",
    caption: "A complete RM gallery look with editorial detail.",
    category: "RM Gallery",
    tone: "line",
    size: "wide",
    image: gallery1346Image("rm-gallery-29"),
    alt: "RM Nail Salon full portfolio look gallery image",
    focal: "50% 50%"
  },
  {
    title: "Gloss and Shape",
    caption: "Balanced shine and nail architecture in a close-up view.",
    category: "RM Gallery",
    tone: "cream",
    size: "small",
    image: gallery1346Image("rm-gallery-30"),
    alt: "RM Nail Salon gloss and shape gallery image",
    focal: "50% 50%"
  },
  {
    title: "Natural Luxury Finish",
    caption: "Natural-looking manicure detail with soft luxury polish.",
    category: "RM Gallery",
    tone: "plum",
    size: "small",
    image: gallery1346Image("rm-gallery-31"),
    alt: "RM Nail Salon natural luxury finish gallery image",
    focal: "50% 50%"
  },
  {
    title: "Clean Nail Art",
    caption: "Minimal nail art with a polished feminine finish.",
    category: "RM Gallery",
    tone: "structure",
    size: "small",
    image: gallery1346Image("rm-gallery-32"),
    alt: "RM Nail Salon clean nail art gallery image",
    focal: "50% 50%"
  },
  {
    title: "RM Studio Detail",
    caption: "A refined RM studio image from the 1346 portfolio set.",
    category: "RM Gallery",
    tone: "aquaGold",
    size: "small",
    image: gallery1346Image("rm-gallery-33"),
    alt: "RM Nail Salon rm studio detail gallery image",
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
