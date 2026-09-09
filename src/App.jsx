import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  m as motion,
  useMotionValue,
  useReducedMotion,
  useSpring
} from "framer-motion";
import {
  ArrowUpRight,
  AtSign,
  CalendarDays,
  ChevronDown,
  Clock,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  X
} from "lucide-react";
import {
  faqs,
  fastImage,
  featuredServices,
  galleryItems,
  proofBlocks,
  serviceMenu,
  siteConfig
} from "./siteConfig";
import {
  absoluteImage,
  absoluteUrl,
  blogArticlePages,
  buildStructuredData,
  geoLandingPages,
  getDecisionDetails,
  getDecisionFaqs,
  getRelatedSeoPages,
  getSeoPage,
  getServiceById,
  reviewSummary,
  seoPages,
  serviceLandingPages
} from "./seoData";
import { trackBookingConversion, trackDirectionsConversion, trackReviewClick } from "./googleAds";
import "../public/fonts/optimized-fonts.css";
import "./styles.css";
import "./header.css";
import "./footer.css";
import { ResponsiveImage } from "./ResponsiveImage.jsx";
import { GalleryViewer } from "./GalleryViewer.jsx";
import { ReviewLoop } from "./ReviewLoop.jsx";
import { useScrollChoreography } from "./useScrollChoreography.js";
import imageManifest from "./imageManifest.json";
import { arrivalGuides, directionsFrom } from "./arrivalGuides.js";

const reveal = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};

const pageMotion = {
  initial: false,
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.22 } }
};

const routes = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/russian-manicure-nyc", label: "Russian Manicure" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Journal" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" }
];

const reviewUrl = siteConfig.bookingUrl;
const clientReviews = reviewSummary.reviews.map((review, index) => ({
  name: review.author,
  meta: "Confirmed Booksy client",
  avatar: review.avatar,
  avatarKind: review.avatarKind,
  isSummary: review.isSummary,
  time: "",
  source: "Read on Booksy",
  quote: review.reviewBody,
  workImage: `/images/reviews/review-work-${String((index + 3) % 10 + 1).padStart(2, "0")}.webp`
}));

const prefersReducedScroll = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const scrollBehavior = () => (prefersReducedScroll() ? "auto" : "smooth");

const referenceImage = (name) => `/images/reference/${name}.webp`;

const luxuryServices = [
  {
    id: "russian-hard-gel",
    title: "Russian Manicure (Hard gel)",
    copy: "Precise Russian cuticle work with structured hard gel for stronger, balanced nail architecture and a glossy natural-looking finish.",
    bestFor: "Long-wear structure",
    link: "/hard-gel-manicure-nyc"
  },
  {
    id: "russian-clear",
    title: "Russian Manicure",
    copy: "A highly precise dry manicure for deeply cleaned cuticles, perfect shaping, and a natural or regular-polish finish.",
    bestFor: "No polish / regular polish",
    link: "/russian-manicure-nyc"
  },
  {
    id: "nail-extensions",
    title: "Russian Nail Extensions",
    copy: "Customized length and shape sculpted with a flexible long-lasting gel system for smooth, lightweight durability.",
    bestFor: "Full transformation",
    link: "/gel-extensions-nyc"
  },
  {
    id: "smart-gel-pedicure",
    title: "Russian Smart Gel Pedicure",
    copy: "Dry cuticle detailing, controlled callus refinement, precise shaping, and high-gloss gel for long-lasting toes.",
    bestFor: "Gel pedicure durability",
    link: "/smart-pedicure-nyc"
  },
  {
    id: "smart-pedicure",
    title: "Russian Smart Pedicure",
    copy: "A luxurious dry pedicure that refines nails, cuticles, calluses, and dry skin for exceptionally soft, clean feet.",
    bestFor: "Natural or regular polish",
    link: "/smart-pedicure-nyc"
  },
  {
    id: "nail-design",
    title: "Nail Designs",
    copy: "Fully customized nail art, from hand-painted details to textures, abstract concepts, 3D elements, and themed sets.",
    bestFor: "Custom creativity",
    link: "/nail-art-nyc"
  }
].map((service) => {
  const menuItem = getServiceById(service.id);
  return { ...service, price: menuItem.price, time: menuItem.time, image: menuItem.image };
});

const proofStripItems = [
  `${reviewSummary.ratingValue} Booksy rating`,
  `${reviewSummary.reviewCount} Booksy client reviews`,
  "875 3rd Ave, Concourse Level",
  siteConfig.hoursShort,
  "Russian manicure specialists"
];

const serviceDetails = {
  "russian-clear": {
    bestFor: "Clean cuticles and natural nails",
    includes: "Dry cuticle work, shaping, and no-polish or regular-polish finish.",
    learnMorePath: "/russian-manicure-nyc",
    bookLabel: "Book Russian Manicure",
    imageAlt: "Russian manicure with clean glossy natural nails"
  },
  "russian-hard-gel": {
    bestFor: "Strength without a bulky look",
    includes: "Russian prep, hard gel structure, color, and glossy finish.",
    learnMorePath: "/hard-gel-manicure-nyc",
    bookLabel: "Book Hard Gel",
    imageAlt: "Russian manicure hard gel with glossy black and white nail art"
  },
  "nail-extensions": {
    bestFor: "Length and shape transformation",
    includes: "Customized length, sculpted structure, refined sidewalls, shaping, and color.",
    learnMorePath: "/gel-extensions-nyc",
    bookLabel: "Book Extensions",
    imageAlt: "Finished long nail extensions with refined shape and glossy finish"
  },
  "smart-pedicure": {
    bestFor: "Natural or regular-polish foot care",
    includes: "Dry pedicure, callus refinement, hygienic prep, and regular or no-polish finish.",
    learnMorePath: "/smart-pedicure-nyc",
    bookLabel: "Book Smart Pedicure",
    imageAlt: "Smart pedicure care with clean toe nail shaping"
  },
  "smart-gel-pedicure": {
    bestFor: "Glossy long-wear toes",
    includes: "Smart pedicure care finished with long-wear gel color.",
    learnMorePath: "/smart-pedicure-nyc",
    bookLabel: "Book Gel Pedicure",
    imageAlt: "Gel pedicure result with glossy toe polish"
  },
  "nail-design": {
    bestFor: "Custom detail or statement accents",
    includes: "Custom detail work priced individually by complexity.",
    learnMorePath: "/nail-art-nyc",
    bookLabel: "Book Nail Art",
    imageAlt: "Custom nail design detail with glossy finish"
  },
  "fill-in": {
    bestFor: "Correcting grown-out extensions",
    includes: "Regrowth correction, structure rebalance, shaping, and refreshed finish.",
    learnMorePath: "/gel-extensions-nyc",
    bookLabel: "Book Fill-In",
    imageAlt: "Fill-in correction for extended nails with clean shape"
  },
  "combo-clear": {
    bestFor: "Natural hand and foot grooming",
    includes: "Dry manicure, regular or no-polish pedicure, shaping, and cuticle refinement.",
    learnMorePath: "/services",
    bookLabel: "Book Clean Combo",
    imageAlt: "Natural no polish manicure and pedicure combo service"
  },
  "hard-gel-smart": {
    bestFor: "Hard gel hands with natural pedicure care",
    includes: "Structured gel manicure with smart pedicure care finished without toe polish.",
    learnMorePath: "/services",
    bookLabel: "Book Hard Gel Combo",
    imageAlt: "Gel manicure and no polish pedicure combo service"
  },
  "hard-gel-smart-gel": {
    bestFor: "Long-wear gel on hands and feet",
    includes: "Russian gel manicure, Smart Gel Pedicure, cuticle detail, and glossy finish.",
    learnMorePath: "/services",
    bookLabel: "Book Gel Combo",
    imageAlt: "Russian gel manicure and Smart Gel Pedicure combo result"
  },
  "natural-care-combo": {
    bestFor: "Restorative natural nail care",
    includes: "Japanese manicure care paired with natural foot grooming and refinement.",
    learnMorePath: "/services",
    bookLabel: "Book Natural Care",
    imageAlt: "Natural nail care manicure and pedicure combo"
  },
  "mens-grooming-combo": {
    bestFor: "Clean masculine grooming",
    includes: "Hand and foot grooming, shaping, buffing, and natural clean finish.",
    learnMorePath: "/services",
    bookLabel: "Book Men's Combo",
    imageAlt: "Men's grooming manicure and pedicure combo"
  },
  "vip-room": {
    bestFor: "Private elevated appointments",
    includes: "Private room service with focused attention and RM finishing standards.",
    learnMorePath: "/services",
    bookLabel: "Book VIP Room",
    imageAlt: "Private VIP room nail salon service"
  },
  "best-friends-combo": {
    bestFor: "Two-guest beauty appointments",
    includes: "Shared appointment experience with polished nail care for two guests.",
    learnMorePath: "/services",
    bookLabel: "Book Best Friends",
    imageAlt: "Best Friends manicure combo with two polished hands"
  },
  "mr-mrs-combo": {
    bestFor: "Couples grooming and polish",
    includes: "Couples nail care with refined grooming, shaping, and natural polish detail.",
    learnMorePath: "/services",
    bookLabel: "Book Mr & Mrs",
    imageAlt: "Mr and Mrs combo manicure service with two clients"
  },
  "four-hands-combo": {
    bestFor: "Fast full-service appointments",
    includes: "Two technicians working together for manicure and pedicure timing efficiency.",
    learnMorePath: "/services",
    bookLabel: "Book 4 Hands",
    imageAlt: "Four hands manicure and pedicure combo service"
  },
  "regular-polish": {
    bestFor: "Classic color finish",
    includes: "Regular polish applied after clean shaping and nail-surface preparation.",
    learnMorePath: "/nail-art-nyc",
    bookLabel: "Book Polish",
    imageAlt: "Regular polish manicure finish"
  },
  "extra-long-nails": {
    bestFor: "Extra length and structure",
    includes: "Additional shaping time, structure balance, and long-length refinement.",
    learnMorePath: "/gel-extensions-nyc",
    bookLabel: "Book Extra Long",
    imageAlt: "Extra long nail extension service"
  },
  "gel-removal-toes": {
    bestFor: "Toe gel removal",
    includes: "Controlled toe gel removal with nail-surface protection and edge refinement.",
    learnMorePath: "/services",
    bookLabel: "Book Toe Removal",
    imageAlt: "Gel removal only for toes"
  },
  "gel-removal-hands": {
    bestFor: "Hand gel removal",
    includes: "Gentle hand gel removal with natural nail protection and clean finish.",
    learnMorePath: "/services",
    bookLabel: "Book Hand Removal",
    imageAlt: "Gel removal only for hands"
  },
  "gel-removal": {
    bestFor: "Preparing for repair or a fresh set",
    includes: "Careful gel removal before repair, natural care, or a new manicure service.",
    learnMorePath: "/services",
    bookLabel: "Book Gel Removal",
    imageAlt: "Gel removal service for manicure preparation"
  },
  "acrylic-removal": {
    bestFor: "Acrylic or dip removal",
    includes: "Protective product reduction and removal before recovery care or a new service.",
    learnMorePath: "/services",
    bookLabel: "Book Acrylic Removal",
    imageAlt: "Acrylic and dip removal with professional nail drill"
  },
  "one-nail-repair": {
    bestFor: "Single nail correction",
    includes: "One chipped, cracked, lifted, or broken nail cleaned, stabilized, and reshaped.",
    learnMorePath: "/services",
    bookLabel: "Book Nail Repair",
    imageAlt: "One nail repair service"
  },
  "hooked-nail-fix": {
    bestFor: "Hooked nail correction",
    includes: "Shape correction for a hooked or downward-growing nail edge.",
    learnMorePath: "/services",
    bookLabel: "Book Hooked Nail Fix",
    imageAlt: "Hooked nail correction service"
  },
  french: {
    bestFor: "Classic clean tips",
    includes: "French finish added to manicure or pedicure service.",
    learnMorePath: "/nail-art-nyc",
    bookLabel: "Book French Add-On",
    imageAlt: "French manicure inspiration with clean white tips"
  },
  chrome: {
    bestFor: "Reflective editorial shine",
    includes: "Chrome finish added to a manicure service.",
    learnMorePath: "/nail-art-nyc",
    bookLabel: "Book Chrome Add-On",
    imageAlt: "Chrome manicure with reflective polish finish"
  },
  "cat-eye": {
    bestFor: "Dimensional magnetic shine",
    includes: "Cat eye gel finish added to a manicure service.",
    learnMorePath: "/nail-art-nyc",
    bookLabel: "Book Cat Eye Add-On",
    imageAlt: "Cat eye manicure with reflective magnetic polish"
  }
};

function enrichService(service) {
  const defaults = {
    bestFor: service.category ? `${service.category.toLowerCase()} detail` : "A polished RM finish",
    includes: "Detailed preparation, clean shaping, and RM finishing standards.",
    learnMorePath: "/services",
    bookLabel: `Book ${service.shortName || service.name}`,
    imageAlt: `${service.name} service example`
  };

  return {
    ...service,
    ...defaults,
    ...(serviceDetails[service.id] || {})
  };
}

function bookingOptionLabel(service) {
  return `${service.shortName || service.name} / ${service.price}`;
}

const processSteps = [
  ["01", "Consultation", "We study your nail goals, lifestyle, shape preference, and existing product before touching the file."],
  ["02", "Nail & cuticle preparation", "Dry prep refines the cuticle line and nail plate so the finish looks clean up close."],
  ["03", "Structured application", "Gel, overlay, or extension work is balanced for strength, slimness, and a smooth silhouette."],
  ["04", "Precision finishing", "Edges, shine, color placement, and surface reflection are corrected before you leave the chair."],
  ["05", "Aftercare guidance", "You leave knowing how to protect the set and when to book the next maintenance appointment."]
];

const artistProfiles = ["Aika", "Aziza", "IRA"].map((name) => ({
  name,
  initials: name.slice(0, 1),
  specialty: "Select your service on Booksy to see appointment times with this artist."
}));

const locationAreas = [
  "Midtown East",
  "Grand Central",
  "Sutton Place"
];

const bookingTimeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM"
];

const calendarMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const calendarDays = ["S", "M", "T", "W", "T", "F", "S"];

function SeoHead({ route }) {
  useEffect(() => {
    const page = getSeoPage(route);
    document.documentElement.lang = "en";
    document.title = page.title;
    setMeta("name", "description", page.description);
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:type", page.datePublished ? "article" : "website");
    setMeta("property", "og:url", absoluteUrl(page.path));
    setMeta("property", "og:image", absoluteImage(page.image));
    setMeta("property", "og:image:alt", page.imageAlt || page.h1 || page.title);
    setMeta("property", "og:image:width", imageManifest[page.image]?.width);
    setMeta("property", "og:image:height", imageManifest[page.image]?.height);
    setMeta("name", "robots", page.noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", page.title);
    setMeta("name", "twitter:description", page.description);
    setMeta("name", "twitter:image", absoluteImage(page.image));
    setCanonical(absoluteUrl(page.path));
    setJsonLd(buildStructuredData(page.path));
  }, [route]);

  return null;
}

function setMeta(attribute, key, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!content) { tag?.remove(); return; }
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href) {
  let tag = document.head.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

function setJsonLd(data) {
  let tag = document.getElementById("rm-jsonld");
  if (!tag) {
    tag = document.createElement("script");
    tag.id = "rm-jsonld";
    tag.type = "application/ld+json";
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(data);
}

export function normalizePath(pathname = "/") {
  const path = pathname.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
  return seoPages.some((page) => page.path === path) ? path : "/404";
}

export function App({ initialPath = "/" }) {
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [route, setRoute] = useState(() => normalizePath(initialPath));
  const [navCompact, setNavCompact] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateScrollState = () => {
      frame = 0;
      const compact = window.scrollY > 42;
      setNavCompact((value) => (value === compact ? value : compact));
    };
    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateScrollState);
      }
    };
    const onPop = () => setRoute(normalizePath(window.location.pathname));
    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPop);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    let id = hash;
    try { id = decodeURIComponent(hash); } catch { /* Malformed fragments are treated as literal IDs. */ }
    const target = id && document.getElementById(id);
    if (target) target.scrollIntoView({ block: "start" });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [route]);

  useScrollChoreography(route);

  const navigate = (to) => (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (to !== window.location.pathname) {
      window.history.pushState({}, "", to);
      setRoute(normalizePath(new URL(to, window.location.origin).pathname));
    }
  };

  const page = useMemo(() => {
    const serviceSeoPage = serviceLandingPages.find((item) => item.path === route);
    if (serviceSeoPage) {
      return <ServiceLandingPage page={serviceSeoPage} navigate={navigate} />;
    }

    const geoSeoPage = geoLandingPages.find((item) => item.path === route);
    if (geoSeoPage) {
      return <GeoLandingPage page={geoSeoPage} navigate={navigate} />;
    }

    const blogArticlePage = blogArticlePages.find((item) => item.path === route);
    if (blogArticlePage) {
      return <BlogArticlePage page={blogArticlePage} navigate={navigate} />;
    }

    switch (route) {
      case "/":
        return <HomePage navigate={navigate} setSelectedGallery={setSelectedGallery} />;
      case "/services":
        return <ServicesPage navigate={navigate} />;
      case "/about":
        return <AboutPage navigate={navigate} />;
      case "/gallery":
        return <GalleryPage setSelectedGallery={setSelectedGallery} />;
      case "/blog":
        return <BlogIndexPage navigate={navigate} />;
      case "/team":
        return <TeamPage navigate={navigate} />;
      case "/sterilization-process":
        return <SterilizationPage navigate={navigate} />;
      case "/faq":
        return <FaqPage />;
      case "/reviews":
        return <ReviewsPage navigate={navigate} />;
      case "/contact":
        return <ContactPage navigate={navigate} />;
      case "/privacy-policy":
        return <PrivacyPolicyPage navigate={navigate} />;
      case "/terms":
        return <TermsPage navigate={navigate} />;
      case "/404":
        return <NotFoundPage navigate={navigate} />;
      default:
        return <NotFoundPage navigate={navigate} />;
    }
  }, [route]);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <div className="lux-site">
          <SeoHead route={route} />
          <Nav compact={navCompact} route={route} navigate={navigate} />
          <main key={route}>{page}</main>
          <Footer navigate={navigate} />
          <FloatingBookNow />
          {selectedGallery && <GalleryViewer items={galleryItems} initialIndex={selectedGallery.index} onClose={() => setSelectedGallery(null)} />}
          <CookieBanner />
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}

function Loader() {
  return (
    <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.55 } }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55 }}
        className="loader-mark"
      >
        RM
      </motion.div>
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: 148 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function RouteLink({ to = "/", navigate, className = "", children }) {
  const safeTo = to || "/";

  if (safeTo.startsWith("#")) {
    return (
      <a href={safeTo} className={className}>
        {children}
      </a>
    );
  }

  return (
    <a href={safeTo} className={className} onClick={navigate(safeTo)}>
      {children}
    </a>
  );
}

function Nav({ compact, route, navigate }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [route]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const menuNavigate = (to) => (event) => {
    setOpen(false);
    navigate(to)(event);
  };

  return (
    <header className={compact ? "nav nav-compact" : "nav"}>
      <div className="nav-top">
        <RouteLink to="/" navigate={navigate} className="nav-logo">
          <ResponsiveImage className="nav-monogram" src="/images/rm-glass-emblem.png" alt="" width="64" height="64" sizes="64px" loading="eager" />
          <div className="nav-logo-text">
            <em>RM NAIL SALON</em>
            <small><span>MIDTOWN NYC</span>{" "}<span>RUSSIAN MANICURE</span></small>
          </div>
        </RouteLink>
        <div className="nav-actions">
          <MagneticLink href={siteConfig.bookingUrl} className="nav-book">
            Book Now
          </MagneticLink>
          <button
            className="nav-menu-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? <X size={22} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" aria-label="Main navigation" className={open ? "nav-links open" : "nav-links"}>
        {routes.slice(1).map((item) =>
          item.to.startsWith("#") ? (
            <a
              key={item.to}
              href={route === "/" ? item.to : `/${item.to}`}
              onClick={(event) => {
                setOpen(false);
                if (route !== "/") {
                  event.preventDefault();
                  window.history.pushState({}, "", `/${item.to}`);
                  window.dispatchEvent(new PopStateEvent("popstate"));
                  window.setTimeout(
                    () => document.querySelector(item.to)?.scrollIntoView({ behavior: scrollBehavior() }),
                    90
                  );
                }
              }}
            >
              {item.label}
            </a>
          ) : (
            <a
              key={item.to}
              href={item.to}
              onClick={menuNavigate(item.to)}
              className={route === item.to ? "active" : ""}
              aria-current={route === item.to ? "page" : undefined}
            >
              {item.label}
            </a>
          )
        )}
        <a
          className="menu-book"
          href={siteConfig.bookingUrl}
          target="_blank"
          rel="noreferrer"
          onClick={trackBookingConversion}
        >
          Book Appointment
        </a>
        <InstagramLink className="menu-instagram" />
      </nav>
    </header>
  );
}

function InstagramLink({ className = "" }) {
  return (
    <a className={`instagram-icon-link ${className}`} href={siteConfig.instagramUrl}
      target="_blank" rel="noreferrer" aria-label="RM Nail Salon on Instagram" title="Instagram">
      <Instagram size={24} aria-hidden="true" />
    </a>
  );
}

function MagneticLink({ href, className = "", children, onClick }) {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 170, damping: 15 });
  const y = useSpring(my, { stiffness: 170, damping: 15 });
  const external = href?.startsWith("http");
  const canMagnet =
    !reduceMotion &&
    typeof window !== "undefined" &&
    window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
  const resetPosition = () => {
    mx.set(0);
    my.set(0);
  };
  const handleClick = (event) => {
    resetPosition();
    window.setTimeout(resetPosition, 120);
    if (href === siteConfig.bookingUrl && !onClick) {
      trackBookingConversion();
    }
    onClick?.(event);
  };

  return (
    <motion.a
      href={href}
      className={`magnetic ${className}`}
      style={{ x, y }}
      onClick={handleClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onPointerDown={resetPosition}
      onPointerUp={resetPosition}
      onPointerCancel={resetPosition}
      onMouseMove={(event) => {
        if (!canMagnet) {
          resetPosition();
          return;
        }
        const rect = event.currentTarget.getBoundingClientRect();
        mx.set((event.clientX - rect.left - rect.width / 2) * 0.18);
        my.set((event.clientY - rect.top - rect.height / 2) * 0.22);
      }}
      onMouseLeave={resetPosition}
      onBlur={resetPosition}
    >
      {children}
    </motion.a>
  );
}

function HomePage({ navigate, setSelectedGallery }) {
  return (
    <>
      <Hero navigate={navigate} />
      <LuxuryServicesOverview navigate={navigate} />
      <GalleryPreview setSelectedGallery={setSelectedGallery} navigate={navigate} />
      <Proof />
      <ReviewsSection />
      <WorkReel />
      <LocationSection navigate={navigate} />
      <Booking navigate={navigate} />
    </>
  );
}

function Hero({ navigate }) {
  return (
    <section className="hero-editorial">
      <picture>
        <source media="(min-width: 820px)" srcSet="/images/hero-rm-hq.webp" />
        <ResponsiveImage
          className="hero-backdrop"
          sizes="100vw"
          src="/images/hero-rm-mobile-hq.webp"
          alt="RM Nail Salon luxury Russian manicure hero"
          decoding="async"
          fetchPriority="high"
          loading="eager"
        />
      </picture>

      <motion.div
        className="hero-type"
        initial={false}
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.11 } } }}
      >
        <motion.h1 variants={reveal}>Midtown&apos;s Luxury Russian Manicure Studio</motion.h1>
        <motion.p variants={reveal} className="hero-sub">
          Precision Russian manicure, hard gel, smart pedicure, and nail art at 875 3rd Ave.
        </motion.p>
        <motion.div variants={reveal} className="hero-proof-line">
          <span>{reviewSummary.ratingValue} Booksy rating</span>
          <span>Book online</span>
          <span>{siteConfig.hoursShort}</span>
        </motion.div>
        <motion.div variants={reveal} className="hero-actions">
          <MagneticLink href={siteConfig.bookingUrl} className="gold-cta">
            Book Appointment <ArrowUpRight size={17} />
          </MagneticLink>
          <MagneticLink href="/services" onClick={navigate("/services")} className="aqua-cta">
            Explore Services <Sparkles size={16} />
          </MagneticLink>
        </motion.div>
      </motion.div>
    </section>
  );
}

function QuickBookingCard() {
  const quickServices = useMemo(() => featuredServices.map(enrichService).slice(0, 6), []);
  const [serviceId, setServiceId] = useState(quickServices[0]?.id || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const selected = quickServices.find((service) => service.id === serviceId) || quickServices[0];
  const minDate = isoDate(new Date());

  return (
    <motion.form
      className="hero-booking-card"
      variants={reveal}
      onSubmit={(event) => {
        event.preventDefault();
        trackBookingConversion();
        window.open(siteConfig.bookingUrl, "_blank", "noopener,noreferrer");
      }}
      aria-label="Quick appointment planner"
    >
      <label>
        <span>Service</span>
        <select value={serviceId} onChange={(event) => setServiceId(event.target.value)}>
          {quickServices.map((service) => (
            <option key={service.id} value={service.id}>
              {bookingOptionLabel(service)}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Date</span>
        <input type="date" value={date} min={minDate} onChange={(event) => setDate(event.target.value)} />
      </label>
      <label>
        <span>Time</span>
        <select value={time} onChange={(event) => setTime(event.target.value)}>
          <option value="">Choose time</option>
          {bookingTimeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">
        <CalendarDays size={16} />
        Reserve
      </button>
      <p>
        {selected?.name || "RM appointment"}
        {date ? ` / ${displayDate(date)}` : ""}
        {time ? ` / ${time}` : ""}
      </p>
    </motion.form>
  );
}

function SocialProofStrip() {
  return (
    <section className="social-proof-strip" aria-label="RM Nail Salon trust signals">
      <div>
        {proofStripItems.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function LuxuryServicesOverview({ navigate }) {
  return (
    <section className="luxury-services-section">
      <div className="services-editorial-head">
        <SectionIntro
          label="Signature Services"
          title="Choose by the result you want to see three weeks later."
          copy="Every RM service starts with clean prep and ends with a polished finish. Compare the most-booked appointments by structure, timing, and intent."
        />
        <MagneticLink href="/services" onClick={navigate("/services")} className="gold-cta">
          View All Services <ArrowUpRight size={16} />
        </MagneticLink>
      </div>
      <div className="services-editorial-list">
        {luxuryServices.map((service, index) => (
          <RouteLink
            key={service.title}
            to={service.link}
            navigate={navigate}
            className={`${index === 0 ? "service-line feature" : "service-line"} service-${slug(service.title)}`}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <ResponsiveImage src={service.image} sizes="(min-width: 640px) 92px, 72px" alt={`${service.title} at RM Nail Salon in Midtown Manhattan`} loading="lazy" decoding="async" />
            <div>
              <em>{service.bestFor}</em>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </div>
            <strong>
              {service.price}
              <small>{service.time}</small>
            </strong>
            <ArrowUpRight size={18} />
          </RouteLink>
        ))}
      </div>
    </section>
  );
}

function BrandRibbon() {
  return (
    <section className="brand-ribbon-section">
      <motion.div
        className="brand-ribbon"
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <div className="brand-mark-panel">
          <span>RM</span>
          <p>Nail Salon</p>
          <strong>Midtown NYC</strong>
          <em>Russian Manicure</em>
        </div>
        <div className="brand-copy-panel">
          <p className="eyebrow">Cyan Luxury Studio</p>
          <h2>Clean precision, made instantly recognizable.</h2>
          <p>
            A darker editorial base with RM cyan as the signature glow, gold for booking moments, and cream for soft
            luxury highlights.
          </p>
        </div>
        <div className="brand-media-panel">
          <ResponsiveImage src={fastImage("drive-midtown")} alt="RM Nail Salon Midtown NYC campaign skyline" loading="lazy" decoding="async" />
          <div>
            <span>875 3rd Ave</span>
            <strong>Concourse Level</strong>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SectionIntro({ label, title, copy, align = "left" }) {
  return (
    <motion.div
      className={`section-intro ${align === "center" ? "center" : ""}`}
      variants={reveal}
      initial={false}
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
    >
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </motion.div>
  );
}

function SignatureExperience({ navigate }) {
  return (
    <section className="signature-section signature-campaign">
      <div className="signature-layout">
        <div>
          <SectionIntro
            label="Signature Russian Manicure"
            title="The detail-obsessed manicure NYC women are searching for."
            copy="Wake up every morning with nails that still look freshly done. RM focuses on precise cuticle care, clean nail plate preparation, smooth structure, and polish application designed to stay elegant as your nails grow."
          />
          <div className="signature-bullets">
            {[
              "Precise dry cuticle refinement",
              "Clean nail plate preparation",
              "Smooth structured gel finish",
              "Ideal for elegant nails that last for weeks"
            ].map((item) => (
              <span key={item}>
                <ShieldCheck size={16} />
                {item}
              </span>
            ))}
          </div>
          <MagneticLink href={siteConfig.bookingUrl} className="gold-cta signature-book">
            Book Russian Manicure <CalendarDays size={16} />
          </MagneticLink>
        </div>
        <motion.div
          className="editorial-composition"
          initial={false}
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={reveal} className="composition-photo large organic-mask">
            <ResponsiveImage src={fastImage("gallery-aqua-french")} alt="Aqua French manicure at RM Nail Salon" loading="lazy" decoding="async" />
          </motion.div>
          <motion.div variants={reveal} className="floating-glass composition-card">
            <span>Signature detail</span>
            <strong>Clean cuticle line. Balanced shape. Quiet luxury.</strong>
            <p>A beauty appointment that feels calm, controlled, and deeply polished from the first file stroke.</p>
            <RouteLink to="/about" navigate={navigate} className="text-link">
              Meet the studio <ArrowUpRight size={15} />
            </RouteLink>
          </motion.div>
          <motion.div variants={reveal} className="composition-metric">
            <em>3-4</em>
            <span>week polished look</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedServicesHome({ navigate }) {
  const homeFeaturedServices = useMemo(() => featuredServices.map(enrichService), []);
  const [activeId, setActiveId] = useState(homeFeaturedServices[0]?.id);
  const active = homeFeaturedServices.find((service) => service.id === activeId) || homeFeaturedServices[0];

  return (
    <section className="featured-service-section">
      <SectionIntro
        label="Most Booked"
        title="The services clients come back for."
        copy="Main treatments from the booking menu are shown upfront with pricing, then the full service catalog lives on its own page."
        align="center"
      />
      <div className="featured-service-shell">
        <motion.div
          className="featured-service-visual organic-mask"
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          <ResponsiveImage src={active.image} alt={active.imageAlt} loading="lazy" decoding="async" />
          <div className="featured-price">
            <span>{active.time}</span>
            <strong>{active.price}</strong>
          </div>
        </motion.div>
        <div className="featured-service-list">
          {homeFeaturedServices.map((service) => (
            <button
              key={service.id}
              className={active.id === service.id ? "featured-service-row active" : "featured-service-row"}
              onClick={() => setActiveId(service.id)}
            >
              <span>{service.category}</span>
              <strong>{service.shortName}</strong>
              <em>{service.price}</em>
            </button>
          ))}
          <div className="featured-service-detail">
            <span>Best for: {active.bestFor}</span>
            <p>{active.includes}</p>
            <div>
              <MagneticLink href={siteConfig.bookingUrl} className="gold-cta">
                {active.bookLabel} <CalendarDays size={16} />
              </MagneticLink>
              <RouteLink to={active.learnMorePath} navigate={navigate} className="outline-cta">
                {active.shortName || active.name} details <ArrowUpRight size={16} />
              </RouteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkReel() {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let isInView = false;
    let hasLoaded = false;
    let isApproaching = false;

    setVideoReady(false);
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const prepareVideo = () => {
      if (hasLoaded) return;
      hasLoaded = true;
      video.preload = "auto";
      video.load();
    };

    const playVideo = () => {
      if (document.hidden || !isInView) return;
      prepareVideo();
      const playback = video.play();
      if (playback?.catch) playback.catch(() => {});
    };

    const revealVideo = () => {
      if (video.readyState >= 2) setVideoReady(true);
    };

    const pauseVideo = () => {
      video.pause();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView) {
          playVideo();
        } else {
          pauseVideo();
        }
      },
      { rootMargin: "0px", threshold: 0 }
    );

    // Fetch only as visitors approach this lower-page section, giving the
    // browser time to buffer without competing with the initial hero load.
    const warmVideo = () => {
      if (!isApproaching || window.scrollY === 0) return;
      prepareVideo();
      warmup.disconnect();
    };
    const warmup = new IntersectionObserver(([entry]) => {
      isApproaching = entry.isIntersecting;
      warmVideo();
    }, { rootMargin: `${Math.max(1600, Math.min(innerHeight * 3, 2600))}px 0px` });
    warmup.observe(video);
    observer.observe(video);

    const handleVisibility = () => {
      if (document.hidden) {
        pauseVideo();
      } else {
        playVideo();
      }
    };
    const handleScroll = () => {
      warmVideo();
      playVideo();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    video.addEventListener("loadeddata", revealVideo);
    video.addEventListener("canplay", playVideo);
    video.addEventListener("canplay", revealVideo);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", playVideo, { passive: true });
    window.addEventListener("focus", playVideo);

    return () => {
      observer.disconnect();
      warmup.disconnect();
      pauseVideo();
      document.removeEventListener("visibilitychange", handleVisibility);
      video.removeEventListener("loadeddata", revealVideo);
      video.removeEventListener("canplay", playVideo);
      video.removeEventListener("canplay", revealVideo);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", playVideo);
      window.removeEventListener("focus", playVideo);
    };
  }, []);

  return (
    <section className="work-reel-section">
      <div className="work-reel-copy">
        <p className="eyebrow">Master at work</p>
        <h2>A short glimpse into the RM process.</h2>
        <p>
          A bright cyan studio moment that shows the calm, precise hand work behind a polished Russian manicure.
        </p>
      </div>
      <motion.div
        className="reel-video-frame"
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        aria-label="RM Nail Salon manicure work video"
      >
        <video
          ref={videoRef}
          className={`process-video${videoReady ? " is-video-ready" : ""}`}
          muted
          loop
          playsInline
          preload="none"
          aria-label="Looping RM Nail Salon manicure work video"
        >
          <source src={siteConfig.processVideo} type="video/mp4" />
          <source src={siteConfig.processVideoWebm} type="video/webm" />
        </video>
      </motion.div>
    </section>
  );
}

function ProcessTimeline() {
  return (
    <section className="process-timeline-section">
      <SectionIntro
        label="Designed Around Detail"
        title="Your appointment, paced like a luxury ritual."
        copy="Every step is intentional, from consultation to aftercare, because the manicure should feel as polished as the result."
        align="center"
      />
      <div className="process-timeline">
        {processSteps.map(([number, title, copy], index) => (
          <motion.article
            key={title}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function GalleryPreview({ setSelectedGallery, navigate }) {
  return (
    <section className="gallery-editorial preview">
      <SectionIntro
        label="Gallery"
        title="Campaign polish, real-service clarity."
        copy="A curated preview of clean shapes, glossy finishes, RM campaign moments, and cyan-lit salon detail."
      />
      <GalleryGrid items={galleryItems.slice(0, 9)} setSelectedGallery={setSelectedGallery} />
      <div className="section-action">
        <MagneticLink href="/gallery" onClick={navigate("/gallery")} className="aqua-cta">
          Open Gallery <ArrowUpRight size={16} />
        </MagneticLink>
      </div>
    </section>
  );
}

function MeetArtists() {
  return (
    <section className="team-page-section">
      <SectionIntro label="Our Artists" title="Choose your next appointment with RM." copy="See the current artist roster and available appointments on Booksy." />
      <ArtistCards />
    </section>
  );
}

function ArtistCards() {
  return (
    <div className="artist-rail team-mode">
      {artistProfiles.map((artist) => (
        <article className="artist-card verified-artist" key={artist.name}>
          <span className="artist-initial" aria-hidden="true">{artist.initials}</span>
          <div>
            <span>RM Nail Salon</span>
            <h3>{artist.name}</h3>
            <p>{artist.specialty}</p>
            <MagneticLink href={siteConfig.bookingUrl} className="mini-book">
              View Availability <ArrowUpRight size={14} />
            </MagneticLink>
          </div>
        </article>
      ))}
    </div>
  );
}

function Proof() {
  return (
    <section className="proof-editorial">
      <SectionIntro
        label="Why Clients Choose RM"
        title="Trust is built into the appointment."
        copy="Luxury clients need more than pretty polish. They need clean tools, steady technique, retention, and a specialist who notices the small things."
        align="center"
      />
      <div className="proof-orbit">
        {proofBlocks.map(([title, copy], index) => (
          <motion.article
            key={title}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            viewport={{ once: true }}
            className="proof-block"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function CleanProcessPreview({ navigate }) {
  const cleanSteps = [
    ["Prepared Tools", "Tools and work surfaces are prepared between appointments with a clean-service mindset."],
    ["Careful E-File Work", "Cuticle prep is paced carefully, with controlled technique around the nail plate."],
    ["Fresh Workstation", "The station is reset before service so the appointment feels calm, organized, and professional."],
    ["Comfort Check", "Your nail condition, length, and product history guide the service choice before polish begins."]
  ];

  return (
    <section className="clean-process-section">
      <div className="clean-process-layout">
        <div className="clean-process-copy">
          <p className="eyebrow">Our Clean Process</p>
          <h2>Precision should feel comfortable before it looks beautiful.</h2>
          <p>
            Russian manicure requires trust. RM approaches every appointment with careful preparation, controlled
            technique, and a clean workstation so the experience feels professional from start to finish.
          </p>
          <div className="clean-step-grid">
            {cleanSteps.map(([title, copy]) => (
              <article key={title}>
                <ShieldCheck size={17} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <RouteLink to="/sterilization-process" navigate={navigate} className="outline-cta">
            Read the Clean Process <ArrowUpRight size={16} />
          </RouteLink>
        </div>
        <div className="clean-process-media">
          <ResponsiveImage
            src={fastImage("work-reel-process")}
            alt="Technician performing detailed Russian manicure prep with professional tools"
            loading="lazy"
            decoding="async"
          />
          <ResponsiveImage
            src={fastImage("service-vip-room")}
            alt="Clean cyan-lit manicure station prepared for a nail appointment"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="reviews-lead">
        <p className="eyebrow">Client Proof</p>
        <h2>Real reviews, real appointments.</h2>
        <p>
          Clients come to RM for the detail work: clean cuticles, careful timing, and a polished result that still feels
          fresh weeks later.
        </p>
        <div className="rating-lockup" aria-label={`${reviewSummary.ratingValue} Booksy client rating`}>
          <strong>{reviewSummary.ratingValue}</strong>
          <span>
            <Star size={16} fill="currentColor" />
            Review proof
          </span>
          <em>Midtown NYC clients</em>
        </div>
        <RouteLink to="/reviews" navigate={simpleNavigate} className="outline-cta review-booksy-link">
          Open Review Lounge <ArrowUpRight size={16} />
        </RouteLink>
      </div>
      <ReviewLoop>
        {clientReviews.slice(0, 5).map((review) => (
          <article key={review.name} className="google-review-card">
            <ReviewCard review={review} />
          </article>
        ))}
      </ReviewLoop>
    </section>
  );
}

function simpleNavigate(to) {
  return (event) => {
    if (event?.metaKey || event?.ctrlKey || event?.shiftKey || event?.altKey) return;
    event?.preventDefault();
    window.history.pushState({}, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
}

function ReviewCard({ review, compact = false }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const avatarRef = useRef(null);
  useEffect(() => {
    // An eagerly loaded server-rendered image can fail before React attaches
    // onError. Check that case as well so the avatar never stays broken.
    const photo = avatarRef.current;
    if (photo?.complete && !photo.naturalWidth) setPhotoFailed(true);
  }, [review.avatar]);
  return (
    <>
      <div className="google-review-head">
        <span className="review-avatar">
          <span className="review-initial" role="img" aria-label={`${review.name}'s initials avatar`} aria-hidden={Boolean(review.avatar && !photoFailed)}>{review.name.slice(0, 1)}</span>
          {review.avatar && !photoFailed ? (
            <img ref={avatarRef} src={review.avatar} alt={review.avatarKind === "client-photo" ? `Review photo shared by ${review.name} on Booksy` : `${review.name}'s Booksy profile image`} width="56" height="56" loading="eager" fetchPriority="low" decoding="async" onError={() => setPhotoFailed(true)} />
          ) : null}
        </span>
        <div>
          <strong>{review.name}</strong>
          <span>{review.meta}</span>
          {review.avatarKind === "client-photo" && <span className="review-photo-kind">Client-shared photo</span>}
        </div>
      </div>
      <div className="google-stars" role="img" aria-label="5 star review">
        {[0, 1, 2, 3, 4].map((item) => (
          <Star key={item} size={15} fill="currentColor" />
        ))}
        <span>{review.isSummary ? "Review summary" : review.time}</span>
      </div>
      <p>{review.quote}</p>
      <em>
        {review.source || "See Review"} <ArrowUpRight size={14} />
      </em>
    </>
  );
}

function ReviewsPage({ navigate }) {
  const featured = clientReviews.slice(0, 3);
  const moreReviews = clientReviews.slice(3);

  return (
    <>
      <PageHero
        label="Client Reviews"
        title="Proof that precision feels different."
        copy="A dedicated review lounge for RM clients comparing Russian manicure, hard gel, pedicure, and clean luxury service in Midtown NYC."
        image="/images/reviews/review-work-06.webp"
        alt="RM Nail Salon client review nail art result"
        className="reviews-page-hero"
      />
      <section className="review-lounge-section">
        <div className="review-lounge-hero">
          <article className="review-score-panel">
            <span>RM Reputation</span>
            <strong>5.0</strong>
            <p>
              {reviewSummary.ratingValue} from {reviewSummary.reviewCount} reviews on Booksy. Read client review summaries below or visit Booksy for the original reviews.
            </p>
            <div>
              <MagneticLink href={reviewUrl} className="outline-cta" onClick={trackReviewClick}>
                See Reviews <ArrowUpRight size={16} />
              </MagneticLink>
              <MagneticLink href={siteConfig.bookingUrl} className="gold-cta">
                Book Appointment <CalendarDays size={16} />
              </MagneticLink>
            </div>
          </article>
          <div className="review-feature-stack">
            {featured.map((review, index) => (
              <motion.a
                key={review.name}
                href={reviewUrl}
                target="_blank"
                rel="noreferrer"
                className={`review-orbit-card orbit-${index + 1}`}
                onClick={trackReviewClick}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <ResponsiveImage src={review.workImage} alt="Manicure design from the RM Nail Salon gallery" loading="lazy" decoding="async" />
                <span className="review-photo-label">From the RM gallery</span>
                <ReviewCard review={review} />
              </motion.a>
            ))}
          </div>
        </div>

        <p className="review-source-note">Booksy rating checked September 8, 2026. Avatars use Booksy profile images or the reviewer&apos;s own uploaded review photo, labeled Client-shared photo; initials appear when neither is available. Gallery images illustrate RM work and are not linked to individual reviewers.</p>
        <div className="review-proof-grid">
          {moreReviews.map((review, index) => (
            <a
              key={`${review.name}-${index}`}
              href={reviewUrl}
              target="_blank"
              rel="noreferrer"
              className="review-proof-card"
              onClick={trackReviewClick}
            >
              <ResponsiveImage src={review.workImage} alt="Manicure design from the RM Nail Salon gallery" loading="lazy" decoding="async" />
              <span className="review-photo-label">From the RM gallery</span>
                <ReviewCard review={review} />
            </a>
          ))}
        </div>

        <div className="review-conversion-panel">
          <div>
            <p className="eyebrow">Book Confidently</p>
            <h2>Choose the appointment that matches the result you want.</h2>
          </div>
          <RouteLink to="/services" navigate={navigate} className="aqua-cta">
            Compare Services <ArrowUpRight size={16} />
          </RouteLink>
        </div>
      </section>
    </>
  );
}

function EditorialJournal({ navigate }) {
  return (
    <section className="journal-section">
      <div className="section-intro">
        <p className="eyebrow">RM Journal</p>
        <h2>Better nails start with better questions.</h2>
        <p>
          Short, honest guides for clients comparing Russian manicure, hard gel, dry prep, and long-wear nail care in
          Midtown NYC.
        </p>
      </div>
      <div className="journal-grid">
        {blogArticlePages.slice(0, 3).map((article, index) => (
          <RouteLink
            key={article.path}
            to={article.path}
            navigate={navigate}
            className={index === 0 ? "journal-card feature" : "journal-card"}
          >
            <ResponsiveImage src={article.image} alt={article.imageAlt} loading="lazy" decoding="async" />
            <div>
              <span>{article.category}</span>
              <h3>{article.h1}</h3>
              <p>{article.excerpt}</p>
              <em>Read guide <ArrowUpRight size={14} /></em>
            </div>
          </RouteLink>
        ))}
      </div>
      <div className="section-action">
        <RouteLink to="/blog" navigate={navigate} className="outline-cta">
          View All Guides <ArrowUpRight size={16} />
        </RouteLink>
      </div>
    </section>
  );
}

function LocationSection({ navigate }) {
  const visitCards = [
    {
      Icon: Clock,
      eyebrow: "Open",
      title: "Hours",
      lines: [
        ["Mon-Fri", "9:30 AM - 8:00 PM"],
        ["Sat-Sun", "10:00 AM - 8:00 PM"]
      ],
      kind: "hours"
    },
    {
      Icon: Phone,
      eyebrow: "Call Us",
      title: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/[^0-9]/g, "")}`
    },
    {
      Icon: Mail,
      eyebrow: "Email",
      title: siteConfig.email,
      href: `mailto:${siteConfig.email}`
    },
    {
      Icon: AtSign,
      eyebrow: "Instagram",
      title: siteConfig.instagramHandle,
      href: siteConfig.instagramUrl,
      external: true
    }
  ];

  return (
    <section className="home-location-section">
      <div className="location-copy">
        <p className="eyebrow">Midtown Manhattan</p>
        <h2>Visit us at 875 3rd Ave, Concourse Level.</h2>
        <p>
          RM Nail Salon is positioned for city clients booking from work, Instagram, hotels, and nearby East Side
          neighborhoods.
        </p>
        <div className="location-meta">
          <span>{siteConfig.hours}</span>
          <a href={`tel:${siteConfig.phone.replace(/[^0-9]/g, "")}`}>{siteConfig.phone}</a>
          <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">{siteConfig.instagramHandle}</a>
        </div>
        <div className="nearby-areas">
          {locationAreas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </div>
      <div className="home-location-visual">
        <div className="visit-contact-board">
          <div className="home-map-frame luxe-map-frame">
            <iframe
              title="RM Nail Salon Midtown Manhattan map"
              src={siteConfig.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="cyan-map-pin" aria-hidden="true">
              <MapPin size={22} fill="currentColor" />
            </div>
            <div className="map-glass-card">
              <MapPin size={18} />
              <div>
                <span>RM Nail Salon</span>
                <strong>875 3rd Ave</strong>
                <em>Concourse Level / New York, NY 10022</em>
              </div>
            </div>
            <a
              className="map-directions-link"
              href={siteConfig.mapUrl}
              target="_blank"
              rel="noreferrer"
              onClick={trackDirectionsConversion}
            >
              <Navigation size={15} />
              Open in Maps
            </a>
          </div>
          <div className="visit-card-stack">
            {visitCards.map(({ Icon, eyebrow, title, href, external, lines, kind }) => {
              const body = lines ? (
                <div className="hours-lines">
                  {lines.map(([label, value]) => (
                    <p key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </p>
                  ))}
                </div>
              ) : href ? (
                <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
                  {title}
                </a>
              ) : (
                <strong>{title}</strong>
              );

              return (
                <article className={`visit-info-card${kind ? ` visit-info-card--${kind}` : ""}`} key={eyebrow}>
                  <Icon size={18} />
                  <div>
                    <span>{eyebrow === "Instagram" ? <InstagramLink /> : eyebrow}</span>
                    {lines ? <h3>{title}</h3> : body}
                    {lines && body}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <article className="salon-preview-card">
          <ResponsiveImage
            src="/images/rm-salon-interior-green.webp"
            alt="RM Nail Salon green and gold manicure studio interior"
            loading="lazy"
            decoding="async"
          />
          <div>
            <span>RM studio interior</span>
            <strong>Green velvet chairs, gold details, and a calm station prepared for precise work.</strong>
          </div>
        </article>
      </div>
    </section>
  );
}

function HomeFaq() {
  const [open, setOpen] = useState(0);
  const homeFaqs = faqs.slice(0, 6);

  return (
    <section className="home-faq-section">
      <SectionIntro
        label="Before You Book"
        title="The questions clients ask before choosing Russian manicure."
        copy="Clear answers reduce hesitation and help first-time clients understand the RM standard."
      />
      <div className="home-faq-list">
        {homeFaqs.map((item, index) => (
          <article key={item.question} className={open === index ? "open" : ""}>
            <button
              onClick={() => setOpen(open === index ? -1 : index)}
              aria-expanded={open === index}
              aria-controls={`home-faq-${index}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.question}</strong>
              <ChevronDown size={18} />
            </button>
            <AnimatePresence>
              {open === index && (
                <motion.p
                  id={`home-faq-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {item.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </article>
        ))}
      </div>
    </section>
  );
}

function Offer() {
  const campaigns = [
    {
      image: fastImage("drive-offer-bird"),
      label: "Early Bird Special",
      title: "10% OFF Before 12 PM",
      copy: "Monday-Thursday"
    },
    {
      image: fastImage("drive-offer-back"),
      label: "Come Back Within 3 Weeks",
      title: "Get 8% Off Your Next Visit",
      copy: "Returning client offer"
    },
    {
      image: fastImage("drive-offer-birthday"),
      label: "Birthday Offer",
      title: "Enjoy 10% Off",
      copy: "Birthday week appointment"
    },
    {
      image: fastImage("drive-offer-share"),
      label: "Share With Your Bestie",
      title: "Enjoy 10% Off",
      copy: "Bestie referral story"
    }
  ];

  return (
    <section className="invitation-section">
      <motion.div
        className="invitation"
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <p className="eyebrow">First Visit Invitation</p>
        <h2>{siteConfig.firstVisitOffer}</h2>
        <span>Not a cheap coupon. A first appointment invitation to experience RM precision, hygiene, and polish.</span>
        <div className="offer-campaigns">
          {campaigns.map((campaign, index) => (
            <article
              className="offer-campaign"
              key={`${campaign.title}-${index}`}
              aria-label={`${campaign.label}: ${campaign.title}. ${campaign.copy}`}
            >
              <ResponsiveImage src={campaign.image} alt={`${campaign.title} RM special offer`} loading="lazy" decoding="async" />
            </article>
          ))}
        </div>
        <MagneticLink href={siteConfig.bookingUrl} className="plum-cta">
          Reserve the Offer <ArrowUpRight size={16} />
        </MagneticLink>
      </motion.div>
    </section>
  );
}

function Booking({ navigate }) {
  return (
    <section className="booking-editorial booking-direct" id="booking">
      <div className="booking-gloss" />
      <div className="booking-copy">
        <p className="eyebrow">Your Next Appointment</p>
        <h2>Ready for perfect nails?</h2>
        <p>Choose your service, artist, and available appointment time directly on Booksy. Your visit is confirmed there, at our one Midtown studio.</p>
        <div className="booking-actions">
          <MagneticLink href={siteConfig.bookingUrl} className="gold-cta">
            Book Appointment <CalendarDays size={16} />
          </MagneticLink>
          <RouteLink to="/services" navigate={navigate} className="outline-cta">
            View Service Menu <ArrowUpRight size={16} />
          </RouteLink>
        </div>
        <p className="booking-address">{siteConfig.address}</p>
      </div>
    </section>
  );
}

function PageHero({ label, title, copy, image = fastImage("rm-hero-editorial"), alt = "", className = "" }) {
  return (
    <section className={`page-hero ${className}`.trim()}>
      <ResponsiveImage src={image} alt={alt} sizes="100vw" loading="eager" decoding="async" fetchPriority="high" />
      <div>
        <p className="eyebrow">{label}</p>
        <h1>{title}</h1>
        {copy && <p>{copy}</p>}
      </div>
    </section>
  );
}

function ServicesPage({ navigate }) {
  const serviceGroups = useMemo(
    () =>
      serviceMenu.map((group) => ({
        ...group,
        services: group.services.map((service) => enrichService({ ...service, category: group.category }))
      })),
    []
  );
  const allServices = useMemo(() => serviceGroups.flatMap((group) => group.services), [serviceGroups]);
  const [spotlight, setSpotlight] = useState(
    allServices.find((service) => service.id === "russian-hard-gel") || allServices[0]
  );

  const scrollToCategory = (category) => {
    document.getElementById(slug(category))?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  };

  return (
    <>
      <PageHero
        label="Service Menu"
        title="Russian manicure services, pricing, and booking options."
        copy="Compare RM Nail Salon manicures, pedicures, hard gel overlays, extensions, nail art, and repair services before booking in Midtown NYC."
        image={fastImage("ref-service-banner")}
        alt="RM Nail Salon Russian manicure service menu in Midtown NYC"
      />
      <section className="catalog-section">
        <div className="service-lookbook">
          <motion.div
            key={spotlight.id}
            className={`lookbook-image organic-mask service-${spotlight.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
          >
            <ResponsiveImage src={spotlight.image} alt={spotlight.imageAlt} loading="lazy" decoding="async" />
            <div>
              <span>{spotlight.category}</span>
              <strong>{spotlight.name}</strong>
              <em>{spotlight.price}</em>
              <p>{spotlight.bestFor}</p>
            </div>
          </motion.div>
          <div className="lookbook-rail" aria-label="Service image previews">
            {allServices.map((service) => (
              <button
                key={service.id}
                aria-label={`Preview ${service.shortName} service`}
                className={`${spotlight.id === service.id ? "active" : ""} service-${service.id}`}
                onMouseEnter={() => setSpotlight(service)}
                onFocus={() => setSpotlight(service)}
                onClick={() => {
                  setSpotlight(service);
                  document.getElementById(service.id)?.scrollIntoView({ behavior: scrollBehavior(), block: "center" });
                }}
              >
                <ResponsiveImage
                  className="rail-thumb"
                  src={service.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                />
                <span>{service.shortName}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="category-pills" aria-label="Service categories">
          {serviceGroups.map((group) => (
            <button key={group.category} onClick={() => scrollToCategory(group.category)}>
              {group.category}
            </button>
          ))}
        </div>
        {serviceGroups.map((group) => (
          <div className="catalog-group" id={slug(group.category)} key={group.category}>
            <div className="catalog-group-heading">
              <p className="eyebrow">{group.category}</p>
              <h2>{group.category}</h2>
              <p>{group.note}</p>
            </div>
            <div className="catalog-list">
              {group.services.map((service) => (
                <article
                  className={`catalog-service service-${service.id}`}
                  key={service.id}
                  id={service.id}
                  onMouseEnter={() => setSpotlight({ ...service, category: group.category })}
                >
                  <ResponsiveImage src={service.image} alt={service.imageAlt} loading="lazy" decoding="async" />
                  <div className="catalog-copy">
                    <span>{service.time}</span>
                    <h3>{service.name}</h3>
                    <em>Best for: {service.bestFor}</em>
                    <p>{service.description}</p>
                    <small>{service.includes}</small>
                  </div>
                  <div className="catalog-price">
                    <strong>{service.price}</strong>
                    {service.topTech && <span>Top tech {service.topTech}</span>}
                    <MagneticLink href={siteConfig.bookingUrl} className="mini-book">
                      {service.bookLabel} <ArrowUpRight size={14} />
                    </MagneticLink>
                    <RouteLink to={service.learnMorePath} navigate={navigate} className="service-learn-link">
                      {service.shortName || service.name} details
                    </RouteLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

function BeforeAfterExperience() {
  const [position, setPosition] = useState(56);

  return (
    <section className="before-after-section">
      <div className="before-after-copy">
        <p className="eyebrow">Before / After</p>
        <h2>Visible difference. Refined results.</h2>
        <p>
          Russian manicure is visual: cleaner cuticles, smoother shape, and a finish that looks more intentional in
          close-up photos and everyday life.
        </p>
      </div>
      <motion.div
        className="before-after-frame"
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <ResponsiveImage
          className="before-image"
          src={fastImage("service-russian-clear")}
          alt="Before Russian manicure natural nail preparation"
          loading="lazy"
          decoding="async"
        />
        <div className="after-layer" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          <ResponsiveImage
            src={fastImage("gallery-aqua-french")}
            alt="After Russian manicure glossy refined result"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="slider-line" style={{ left: `${position}%` }}>
          <span />
        </div>
        <input
          aria-label="Compare before and after manicure result"
          type="range"
          min="20"
          max="80"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
        />
        <div className="before-after-labels">
          <span>Before</span>
          <span>After</span>
        </div>
      </motion.div>
    </section>
  );
}

function ServiceLandingPage({ page, navigate }) {
  const services = page.serviceIds.map(getServiceById).filter(Boolean).map(enrichService);
  const relatedPages = getRelatedSeoPages(page.related);
  const decision = getDecisionDetails(page);
  const decisionFaqs = getDecisionFaqs(page);

  return (
    <>
      <PageHero
        label={page.label}
        title={page.h1}
        copy={page.heroCopy}
        image={page.image}
        alt={page.imageAlt}
      />
      <section className="seo-landing-section service-seo">
        <div className="seo-lead-block">
          <p className="eyebrow">{page.serviceType}</p>
          <h2>{page.introTitle}</h2>
          <p>{page.intro}</p>
          <div className="seo-cta-row">
            <MagneticLink href={siteConfig.bookingUrl} className="gold-cta">
              {page.ctaLabel || `Book ${page.serviceType}`} <CalendarDays size={16} />
            </MagneticLink>
            <RouteLink to="/services" navigate={navigate} className="aqua-cta">
              View Full Menu <ArrowUpRight size={16} />
            </RouteLink>
          </div>
        </div>

        <div className="seo-proof-grid">
          {page.highlights.map(([title, copy], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>

        {(page.processImage || page.comparisonRows) && (
          <div className="service-context-panel">
            {page.processImage && (
              <div className="service-image-story">
                <article>
                  <ResponsiveImage src={page.resultImage || page.image} alt={page.resultAlt || page.imageAlt} loading="lazy" decoding="async" />
                  <div>
                    <span>Final result first</span>
                    <h3>{page.resultTitle || "The finish clients are booking for."}</h3>
                    <p>{page.resultCopy || "A polished result should look clean up close before the process becomes part of the story."}</p>
                  </div>
                </article>
                <article>
                  <ResponsiveImage src={page.processImage} alt={page.processAlt || `${page.serviceType} process at RM Nail Salon`} loading="lazy" decoding="async" />
                  <div>
                    <span>{page.processTitle || "How the work happens"}</span>
                    <h3>{page.processHeading || "Controlled technique, clean preparation."}</h3>
                    <p>{page.processCopy || "Process photography belongs here: it builds trust after the client has already seen the result."}</p>
                  </div>
                </article>
              </div>
            )}
            {page.comparisonRows && (
              <div className="service-comparison-table">
                <p className="eyebrow">{page.comparisonLabel || "Service Comparison"}</p>
                <h2>{page.comparisonTitle || "Choose the right structure for your nails."}</h2>
                {page.comparisonRows.map(([title, copy]) => (
                  <article key={title}>
                    <strong>{title}</strong>
                    <p>{copy}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="service-decision-panel">
          <div>
            <p className="eyebrow">{page.decisionLabel || "Before Your Appointment"}</p>
            <h2>{page.decisionTitle || "Why this appointment costs more than a basic manicure."}</h2>
            <p>
              {page.decisionCopy ||
                "Premium nail work is not just polish. It is preparation, structure, hygiene, and the judgement to keep the final result refined."}
            </p>
          </div>
          <div className="decision-columns">
            <article>
              <span>Best For</span>
              {decision.bestFor.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </article>
            <article>
              <span>Process</span>
              {decision.process.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </article>
            <article>
              <span>Maintenance</span>
              <p>{decision.maintenance}</p>
              <span>Aftercare</span>
              <p>{decision.aftercare}</p>
            </article>
          </div>
        </div>

        <div className="seo-service-list">
          <div className="seo-list-heading">
            <p className="eyebrow">Related RM Services</p>
            <h2>Choose the version that fits your nails.</h2>
          </div>
          {services.map((service) => (
            <article key={service.id} className="seo-service-card">
              <ResponsiveImage
                src={service.image}
                alt={service.imageAlt}
                loading="lazy"
                decoding="async"
              />
              <div>
                <span>{service.category} / {service.time}</span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <small>Best for: {service.bestFor}</small>
              </div>
              <strong>{service.price}</strong>
              <MagneticLink href={siteConfig.bookingUrl} className="mini-book">
                {service.bookLabel} <ArrowUpRight size={14} />
              </MagneticLink>
            </article>
          ))}
        </div>

        <RelatedSeoLinks
          title={page.relatedTitle || "Choose the next service for your appointment."}
          eyebrow={page.relatedEyebrow || "Appointment Path"}
          links={relatedPages}
          navigate={navigate}
        />

        <ServiceFaqPanel title={`Before you book ${page.serviceType.toLowerCase()}.`} faqs={decisionFaqs} />
      </section>
      <Booking navigate={navigate} />
    </>
  );
}

function ServiceFaqPanel({ title, faqs: panelFaqs }) {
  const [open, setOpen] = useState(0);
  const enrichedFaqs = panelFaqs.map(([question, answer]) => [
    question,
    `${answer} At RM, the goal is to help you understand the service before you sit down: what will be refined, how the result should wear, and when you should return for maintenance. If you are unsure between options, choose the closest service online and we can guide the final choice during the appointment.`
  ]);

  return (
    <div className="service-page-faqs luxe-accordion">
      <p className="eyebrow">Service FAQ</p>
      <h2>{title}</h2>
      {enrichedFaqs.map(([question, answer], index) => (
        <article className={open === index ? "open" : ""} key={question}>
          <button
            type="button"
            onClick={() => setOpen(open === index ? -1 : index)}
            aria-expanded={open === index}
            aria-controls={`service-faq-${index}`}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{question}</h3>
            <ChevronDown size={18} />
          </button>
          <AnimatePresence initial={false}>
            {open === index && (
              <motion.p
                id={`service-faq-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                {answer}
              </motion.p>
            )}
          </AnimatePresence>
        </article>
      ))}
    </div>
  );
}

function GeoLandingPage({ page, navigate }) {
  const arrival = arrivalGuides[page.area];
  const relatedPages = getRelatedSeoPages(page.related);
  const nearbyRouteLinks = geoLandingPages
    .filter((item) => item.path !== page.path && locationAreas.includes(item.label))
    .slice(0, 5);
  const arrivalAreas = [page.area, ...locationAreas]
    .filter(Boolean)
    .filter((area, index, list) => list.indexOf(area) === index)
    .slice(0, 4);
  const arrivalAreaText =
    arrivalAreas.length > 1
      ? `${arrivalAreas.slice(0, -1).join(", ")}, or ${arrivalAreas.at(-1)}`
      : page.area;

  return (
    <>
      <PageHero
        label={page.label}
        title={page.h1}
        copy={page.heroCopy}
        image={page.image}
        alt={page.imageAlt}
      />
      <section className="seo-landing-section geo-seo">
        <div className="geo-story-grid">
          <article className="geo-story-main">
            <p className="eyebrow">{page.area} Client Route</p>
            <h2>{page.introTitle}</h2>
            <p>{page.intro}</p>
            <p className="single-location-note">
              RM Nail Salon has one studio location: <strong>{siteConfig.address}</strong>. This page is a guide for
              clients coming from {page.area} to our Midtown NYC studio, not a separate branch.
            </p>
            <p>
              RM Nail Salon is located at {siteConfig.address}, with booking available online for weekday appointments
              from 9:30 AM to 8:00 PM and weekend appointments from 10:00 AM to 8:00 PM.
            </p>
            <div className="seo-cta-row">
              <MagneticLink href={siteConfig.bookingUrl} className="gold-cta">
                Book Appointment <CalendarDays size={16} />
              </MagneticLink>
              <RouteLink to="/contact" navigate={navigate} className="outline-cta">
                View Map <MapPin size={16} />
              </RouteLink>
            </div>
          </article>
          <div className="landmark-panel">
            <p className="eyebrow">Convenient For Clients From</p>
            <h3>Nearby routes to our Midtown studio:</h3>
            <ul>
              {page.landmarks.map((landmark) => (
                <li key={landmark}>{landmark}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="geo-arrival-board">
          <ResponsiveImage src={fastImage("brand-salon-front-full")} alt="Manicure stations inside RM Nail Salon at 875 3rd Ave" loading="lazy" decoding="async" />
          <div>
            <p className="eyebrow">One Midtown Address</p>
            <h2>{arrival?.[0] || "Find our Midtown studio."}</h2>
            {arrival && <p>{arrival[1]}</p>}
            <p>
              Whether you are booking from {arrivalAreaText}, your appointment
              takes place at RM Nail Salon in Midtown NYC: {siteConfig.address}.
            </p>
            <div className="arrival-proof-row">
              <span>{siteConfig.hoursShort}</span>
              <span>Booksy booking</span>
              <span>Concourse Level</span>
            </div>
            <MagneticLink href={directionsFrom(page.area)} onClick={trackDirectionsConversion} className="outline-cta">
              Directions from {page.area} <Navigation size={16} />
            </MagneticLink>
            <p>Need step-free access or help finding the entrance? Call {siteConfig.phone} before traveling so we can discuss your arrival.</p>
          </div>
        </div>

        <div className="geo-service-path">
          <div className="seo-list-heading">
            <p className="eyebrow">Popular For {page.area}</p>
            <h2>Choose your service before you travel.</h2>
          </div>
          {relatedPages.map((item) => (
            <RouteLink key={item.path} to={item.path} navigate={navigate} className="geo-path-card">
              <ResponsiveImage src={item.image} alt={item.imageAlt} loading="lazy" decoding="async" />
              <div>
                <span>{item.navLabel}</span>
                <h3>{item.h1}</h3>
                <p>{item.description}</p>
              </div>
              <ArrowUpRight size={17} />
            </RouteLink>
          ))}
        </div>

        <RelatedSeoLinks
          title="More nearby client routes to the Midtown studio."
          eyebrow="Convenient For Clients From"
          links={nearbyRouteLinks}
          navigate={navigate}
        />
      </section>
      <Booking navigate={navigate} />
    </>
  );
}

function RelatedSeoLinks({ title, links, navigate, eyebrow = "Appointment Path" }) {
  return (
    <div className="related-seo-links">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <div className="related-card-grid">
        {links.map((item) => (
          <RouteLink key={item.path} to={item.path} navigate={navigate} className="related-service-card">
            <ResponsiveImage src={item.image} alt={item.imageAlt} loading="lazy" decoding="async" />
            <span>{item.navLabel || item.label || "RM Nail Salon"}</span>
            <h3>{item.h1}</h3>
            <p>{item.description}</p>
            <em>
              Learn more <ArrowUpRight size={14} />
            </em>
          </RouteLink>
        ))}
      </div>
    </div>
  );
}

function BlogIndexPage({ navigate }) {
  const page = getSeoPage("/blog");

  return (
    <>
      <PageHero
        label={page.label}
        title={page.h1}
        copy="A polished education hub for clients who want to understand Russian manicure, hard gel, safety, and long-wear nail care before booking."
        image={page.image}
        alt={page.imageAlt}
      />
      <section className="blog-index-section">
        <div className="blog-hero-deck">
          <article>
            <p className="eyebrow">Editorial Guides</p>
            <h2>Clear answers before you sit in the chair.</h2>
            <p>
              Compare preparation, product choices, maintenance, and appointment timing before choosing your nail service.
            </p>
          </article>
          <div className="journal-depth-board">
            <RouteLink to="/sterilization-process" navigate={navigate} className="trust-ticket">
              <ShieldCheck size={18} />
              <span>Read our hygiene and sterilization process</span>
              <ArrowUpRight size={15} />
            </RouteLink>
            {[
              ["01", "Technique", "Dry prep, hard gel, and smart pedicure explained in plain language."],
              ["02", "Longevity", "Understand why polish lifts, when to refill, and how to protect shine."],
              ["03", "Booking", "Choose the right service before you open the Booksy calendar."]
            ].map(([number, title, copy]) => (
              <div key={title} className="journal-micro-card">
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="blog-card-grid">
          {blogArticlePages.map((article, index) => (
            <RouteLink
              key={article.path}
              to={article.path}
              navigate={navigate}
              className={index % 3 === 0 ? "blog-card wide" : "blog-card"}
            >
              <ResponsiveImage src={article.image} alt={article.imageAlt} loading="lazy" decoding="async" />
              <div>
                <span>{article.category}</span>
                <h2>{article.h1}</h2>
                <p>{article.excerpt}</p>
                <em>Open guide <ArrowUpRight size={14} /></em>
              </div>
            </RouteLink>
          ))}
        </div>
      </section>
    </>
  );
}

function BlogArticlePage({ page, navigate }) {
  const relatedPages = getRelatedSeoPages(page.related);

  return (
    <>
      <PageHero
        label={page.label}
        title={page.h1}
        copy={page.heroCopy}
        image={page.image}
        alt={page.imageAlt}
      />
      <section className="article-layout">
        <aside className="article-sidebar">
          <span>{page.category}</span>
          <strong>{page.author}</strong>
          <em>{page.dateModified ? "Updated" : "Published"} <time dateTime={page.dateModified || page.datePublished}>{new Date(`${page.dateModified || page.datePublished}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</time></em>
          <MagneticLink href={siteConfig.bookingUrl} className="mini-book">
            Book Now <CalendarDays size={14} />
          </MagneticLink>
        </aside>
        <article className="article-body">
          <p className="eyebrow">RM Education</p>
          <h2>{page.introTitle}</h2>
          <p>{page.intro}</p>
          <div className="article-luxury-strip" aria-label="RM guide quick proof points">
            {[
              [Sparkles, "Visual result", "Clean edges and shape are the first things clients notice."],
              [ShieldCheck, "Safe decision", "Technique, nail condition, and maintenance timing matter."],
              [CalendarDays, "Booking clarity", "Every guide links back to the service path that fits best."]
            ].map(([Icon, title, copy]) => (
              <div key={title}>
                <Icon size={18} />
                <strong>{title}</strong>
                <span>{copy}</span>
              </div>
            ))}
          </div>
          {page.sections.map(([heading, copy]) => (
            <section key={heading}>
              <h3>{heading}</h3>
              <p>{copy}</p>
            </section>
          ))}
          {page.sources?.length > 0 && <section className="article-sources">
            <h3>Sources and further reading</h3>
            <ul>{page.sources.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{label}</a></li>)}</ul>
            <p>General service information, not medical advice. Product availability and appointment details should be confirmed with the studio.</p>
          </section>}
          <div className="article-next-step">
            <h3>Ready to choose the right service?</h3>
            <p>
              Book RM Nail Salon online, or compare the service menu if you are deciding between Russian manicure, hard
              gel, pedicure, extensions, and nail art.
            </p>
            <div className="seo-cta-row">
              <MagneticLink href={siteConfig.bookingUrl} className="gold-cta">
                Book Appointment <CalendarDays size={16} />
              </MagneticLink>
              <RouteLink to="/services" navigate={navigate} className="outline-cta">
                View Services <ArrowUpRight size={16} />
              </RouteLink>
            </div>
          </div>
        </article>
        <RelatedSeoLinks title="Keep reading with RM." links={relatedPages} navigate={navigate} />
      </section>
    </>
  );
}

function TeamPage({ navigate }) {
  const page = getSeoPage("/team");
  return (
    <>
      <PageHero label={page.label} title={page.h1} image={page.image} alt={page.imageAlt}
        copy="Meet the artists listed for our Midtown studio, then choose your service and appointment on Booksy." />
      <section className="team-page-section">
        <div className="team-intro-card">
          <p className="eyebrow">Personal Appointments</p>
          <h2>The right appointment starts with a conversation.</h2>
          <p>Tell us about your current product, preferred length, and the finish you have in mind. If you are returning to a particular artist, check their availability on Booksy before choosing a time.</p>
          <p>All appointments take place at {siteConfig.address}. For a design consultation or help choosing an artist, call {siteConfig.phone}.</p>
          <RouteLink to="/contact" navigate={navigate} className="aqua-cta">
            Contact the Studio <MessageCircle size={16} />
          </RouteLink>
        </div>
        <ArtistCards />
      </section>
    </>
  );
}

function SterilizationPage({ navigate }) {
  const page = getSeoPage("/sterilization-process");
  const standards = [
    ["Reusable instruments", "Ask how the instruments for your service are cleaned and processed between clients, and how ready-to-use tools are stored. A photograph of equipment does not explain its operation."],
    ["Single-use items", "Ask which files, buffers, or other service items are single-use, and how used items are separated from items ready for your appointment."],
    ["The workstation", "Look at the station and ask about its preparation between appointments. The AAD recommends checking cleanliness and asking how tools are cleaned."],
    ["Your comfort", "Discuss preparation before it starts, including any sensitivity or previous reaction. Tell the technician immediately if the service hurts."],
    ["Product and aftercare questions", "Ask for the name of the product used, its appropriate maintenance or removal method, and who to contact if something changes after your visit."]
  ];

  return (
    <>
      <PageHero
        label={page.label}
        title={page.h1}
        copy="Clear questions about tools, products, and comfort help you make an informed appointment choice."
        image={page.image}
        alt={page.imageAlt}
      />
      <section className="sterile-section">
        <div className="sterile-manifesto">
          <p className="eyebrow">Clean Luxury</p>
          <h2>Every premium result begins before the color.</h2>
          <p>
            Cleaning, disinfection, and sterilization are not interchangeable terms. Ask the studio to explain the preparation of the specific tools used in your appointment. For personal health concerns, seek advice from a qualified healthcare professional before cosmetic work.
          </p>
          <div className="seo-cta-row">
            <RouteLink to="/faq" navigate={navigate} className="outline-cta">
              Read FAQ <ArrowUpRight size={16} />
            </RouteLink>
            <MagneticLink href={siteConfig.bookingUrl} className="gold-cta">
              Book Appointment <CalendarDays size={16} />
            </MagneticLink>
          </div>
        </div>
        <div className="sterile-timeline">
          <p><a href="https://www.aad.org/public/everyday-care/nail-care-secrets/basics/pedicures/manicure-pedicure-safety" target="_blank" rel="noreferrer">Read the AAD's manicure and pedicure safety guidance</a></p>
          {standards.map(([title, copy], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function AboutPage({ navigate }) {
  return (
    <>
      <PageHero
        label="About RM"
        title="A Midtown NYC studio built for precision, hygiene, and polish."
        copy="RM Nail Salon brings Russian manicure standards, cyan-lit luxury, and carefully paced appointments to 875 3rd Ave."
        image={fastImage("brand-city-skyline-tight")}
        alt="RM Nail Salon Midtown NYC campaign image"
      />
      <section className="about-story">
        <div className="about-lead">
          <p className="eyebrow">Studio Philosophy</p>
          <h2>Luxury is not louder. It is cleaner, calmer, and more exact.</h2>
        </div>
        <div className="about-body">
          <p>
            RM brings a premium Russian manicure standard to Midtown NYC with a cyan-lit studio mood, careful service
            pacing, and a calm booking experience made for modern beauty clients.
          </p>
          <p>
            Bring a reference photo, let us know what is currently on your nails, and tell us about your preferred length and finish. We can help you choose the appointment that fits your plans.
          </p>
          <MagneticLink href="/services" onClick={navigate("/services")} className="aqua-cta">
            View Services <ArrowUpRight size={16} />
          </MagneticLink>
          <RouteLink to="/team" navigate={navigate} className="outline-cta">Meet the Artists <ArrowUpRight size={16} /></RouteLink>
        </div>
        <div className="about-luxury-collage" aria-label="RM Nail Salon luxury studio mood">
            <ResponsiveImage src={fastImage("brand-salon-front-full")} alt="Manicure stations inside RM Nail Salon in Midtown NYC" loading="lazy" decoding="async" />
          <div>
            <span>875 3rd Ave</span>
            <strong>Concourse Level</strong>
            <em>Midtown East appointment studio</em>
          </div>
          <ResponsiveImage src={fastImage("service-vip-room")} alt="Cyan-lit RM Nail Salon studio chair" loading="lazy" decoding="async" />
        </div>
      </section>
      <section className="values-flow">
        {[
          ["01", "Precision", "Detailed e-file cuticle work and balanced nail architecture.", ShieldCheck],
          ["02", "Hygiene", "Clean tools, careful preparation, and professional standards.", Sparkles],
          ["03", "Longevity", "A glossy finish designed to look fresh well beyond the appointment.", Clock],
          ["04", "Experience", "A calm premium visit with cyan RM atmosphere and personal attention.", Star]
        ].map(([number, title, copy, Icon]) => (
          <motion.article
            key={title}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Icon size={19} />
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </motion.article>
        ))}
      </section>
    </>
  );
}

function GalleryPage({ setSelectedGallery }) {
  return (
    <>
      <PageHero
        label="Gallery"
        title="Russian manicure gallery with clean shape, shine, and detail."
        copy="Browse RM manicure, pedicure, chrome, French, extension, and nail art inspiration before choosing your next appointment."
        image={galleryItems[0]?.image || fastImage("gallery-aqua-french")}
        alt="RM Nail Salon gallery photo from the 1346 portfolio set"
      />
      <section className="gallery-editorial full">
        <SectionIntro
          label="RM Portfolio"
          title="Clean results, studio detail, and appointment inspiration."
          copy="Explore cuticle work, hard gel structure, pedicure detail, extensions, and editorial nail art through a curated RM portfolio."
        />
        <GalleryGrid items={galleryItems} setSelectedGallery={setSelectedGallery} />
      </section>
    </>
  );
}

function GalleryGrid({ items, setSelectedGallery }) {
  return (
    <div className="masonry-gallery">
      {items.map((item, index) => (
        <motion.button
          key={`${item.title}-${index}`}
          className={`masonry-item ${item.size} tone-${item.tone} gallery-${slug(item.title)}`}
          aria-label={`View photo: ${item.title}`}
          onClick={() => setSelectedGallery({ index: galleryItems.findIndex((photo) => photo.image === item.image) })}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          style={{ "--image-focus": item.focal || "center" }}
        >
          <ResponsiveImage src={item.image} sizes={item.size === "wide" ? "(max-width: 819px) calc(50vw - 24px), (max-width: 1440px) 50vw, 680px" : "(max-width: 819px) calc(50vw - 24px), (max-width: 1440px) 25vw, 340px"} alt={item.alt || `${item.title} manicure gallery photo`} loading="lazy" decoding="async" />
        </motion.button>
      ))}
    </div>
  );
}

function FaqPage() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <PageHero
        label="FAQ"
        title="Russian manicure questions answered before you book."
        copy="Learn how Russian manicure works, how long hard gel can last, what hygiene standards mean, and how to choose your RM service."
        image={fastImage("service-russian-hard-gel-new")}
        alt="Luxury hard gel Russian manicure detail for RM Nail Salon FAQ"
      />
      <section className="faq-section">
        <SectionIntro
          label="Before You Book"
          title="Clear answers for a more confident appointment."
          copy="Use these details to choose between Russian manicure, hard gel, pedicure, extensions, nail art, and repair services."
          align="center"
        />
        <div className="faq-luxury-banner">
          <ResponsiveImage src={fastImage("work-reel-process")} alt="RM Nail Salon manicure prep process" loading="lazy" decoding="async" />
          <div>
            <span>Ask before you book</span>
            <strong>Better questions create better appointments.</strong>
            <p>
              These answers are written for clients who care about safety, shape, product choice, and how their nails
              will look after the appointment, not just on appointment day.
            </p>
          </div>
        </div>
        {faqs.map((item, index) => (
          <article className={open === index ? "faq-item open" : "faq-item"} key={item.question}>
            <button
              onClick={() => setOpen(open === index ? -1 : index)}
              aria-expanded={open === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.question}</strong>
              <ChevronDown size={19} />
            </button>
            <AnimatePresence>
              {open === index && (
                <motion.p
                  id={`faq-answer-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {item.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </article>
        ))}
      </section>
    </>
  );
}

function ContactPage({ navigate }) {
  const contacts = [
    [Phone, "Phone", siteConfig.phone, `tel:${siteConfig.phone.replace(/[^0-9]/g, "")}`],
    [Mail, "Email", siteConfig.email, `mailto:${siteConfig.email}`],
    [AtSign, "Instagram", siteConfig.instagramHandle, siteConfig.instagramUrl],
    [MapPin, "Address", siteConfig.address, siteConfig.mapUrl],
    [Clock, "Hours", siteConfig.hoursLines.join("\n"), null]
  ];

  return (
    <>
      <PageHero
        label="Contact"
        title="Book or contact RM Nail Salon in Midtown NYC."
        copy="Find our address, phone number, Instagram, booking link, business hours, and map for your next appointment."
        image={fastImage("brand-door-review")}
        alt="RM Nail Salon Midtown NYC studio entrance"
        className="contact-page-hero"
      />
      <section id="contact" className="contact-editorial">
        <SectionIntro
          label="Visit RM"
          title="Book online, call, or find us in Midtown Manhattan."
          copy="RM Nail Salon is located at 875 3rd Ave, Concourse Level, with weekday and weekend appointments available through Booksy."
          align="center"
        />
        <div className="contact-layout">
          <div className="contact-concierge-card">
            <ResponsiveImage src={fastImage("contact-salon-interior")} alt="RM Nail Salon Midtown NYC manicure studio interior" loading="lazy" decoding="async" />
            <div>
              <span>Midtown Appointment Concierge</span>
              <h2>Arrive below street level, leave polished above expectation.</h2>
              <p>
                Use the map for 875 3rd Ave, Concourse Level. Book online for the fastest appointment flow, or message
                Instagram when you need help choosing between Russian manicure, hard gel, smart pedicure, and nail art.
              </p>
              <MagneticLink href={siteConfig.bookingUrl} className="gold-cta">
                Book on Booksy <CalendarDays size={16} />
              </MagneticLink>
            </div>
          </div>
          <div className="contact-cards">
            {contacts.map(([Icon, label, value, href]) => {
              const external = href?.startsWith("http");
              const handleContactClick = href === siteConfig.mapUrl ? trackDirectionsConversion : undefined;
              return (
                <article key={label} className={label === "Hours" ? "contact-hours-card" : undefined}>
                  <Icon size={19} />
                  <span>{label === "Instagram" ? <InstagramLink /> : label}</span>
                  {href ? (
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      onClick={handleContactClick}
                    >
                      {value}
                    </a>
                  ) : (
                    <p>{value}</p>
                  )}
                </article>
              );
            })}
          </div>
          <div className="map-frame">
            <iframe
              title="RM Nail Salon map"
              src={siteConfig.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={siteConfig.mapUrl}
              target="_blank"
              rel="noreferrer"
              onClick={trackDirectionsConversion}
            >
              <MapPin size={18} />
              Open in Google Maps
            </a>
          </div>
        </div>
        <nav className="nearby-directory" aria-label="Nearby area guides">
          <p className="eyebrow">Convenient For Clients From</p>
          <h2>Plan your visit to Midtown.</h2>
          <p>One studio, at {siteConfig.address}. Find arrival guidance from your neighborhood or Midtown destination.</p>
          <ul>{geoLandingPages.map((page) => (
            <li key={page.path}><RouteLink to={page.path} navigate={navigate}>{page.navLabel} <ArrowUpRight size={14} /></RouteLink></li>
          ))}</ul>
        </nav>
      </section>
    </>
  );
}

function LegalPageShell({ label, title, copy, children }) {
  return (
    <>
      <PageHero
        label={label}
        title={title}
        copy={copy}
        image={fastImage("contact-salon-interior")}
        alt="RM Nail Salon Midtown NYC manicure studio"
        className="legal-page-hero"
      />
      <section className="legal-editorial">
        <div className="legal-document">
          {children}
          <div className="legal-contact-panel">
            <ShieldCheck size={20} />
            <div>
              <strong>RM Nail Salon Midtown NYC Russian Manicure</strong>
              <span>{siteConfig.address}</span>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <a href={`tel:${siteConfig.phone.replace(/[^0-9]/g, "")}`}>{siteConfig.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      label="Privacy"
      title="Privacy Policy"
      copy="How RM Nail Salon handles website visits, booking links, contact details, cookies, and advertising tools."
    >
      <p className="legal-updated">Last updated September 2, 2026</p>
      <h2>Information We Collect</h2>
      <p>
        RM Nail Salon may receive information you choose to share when you call, email, message us on Instagram, or use
        a booking link. This can include your name, phone number, email address, appointment questions, service
        preferences, and any details you provide while asking about an appointment.
      </p>
      <h2>Booking and Third-Party Platforms</h2>
      <p>
        Appointment booking is handled through Booksy. When you click a Book Appointment or Booksy link, you leave this
        website and Booksy may collect information under its own privacy policy and account terms.
      </p>
      <h2>Cookies, Ads, and Analytics</h2>
      <p>
        This website uses Google advertising and measurement tools to understand visits, measure booking and direction
        clicks, and improve marketing. Non-essential storage is controlled by the cookie banner. If you choose
        essential cookies only, advertising and analytics storage remain disabled where supported by Google consent
        mode.
      </p>
      <h2>How We Use Information</h2>
      <p>
        We use contact information to answer questions, help with booking, provide directions, improve the website, and
        understand which pages help clients choose services. We do not sell personal information from this website.
      </p>
      <h2>Contact</h2>
      <p>
        For privacy questions, contact RM Nail Salon at {siteConfig.email} or {siteConfig.phone}.
      </p>
    </LegalPageShell>
  );
}

function TermsPage() {
  return (
    <LegalPageShell
      label="Terms"
      title="Terms of Use"
      copy="The simple rules for using the RM Nail Salon website, service information, and booking links."
    >
      <p className="legal-updated">Last updated September 2, 2026</p>
      <h2>Website Information</h2>
      <p>
        This website provides general information about RM Nail Salon services, location, hours, reviews, gallery
        images, and appointment options. We work to keep details accurate, but services, timing, pricing, and
        availability can change.
      </p>
      <h2>Appointments</h2>
      <p>
        Booking is completed through Booksy or by contacting RM Nail Salon directly. Appointment availability,
        cancellation rules, deposits, and final service choices are handled through the booking flow and salon
        communication at the time of booking.
      </p>
      <h2>Service Results</h2>
      <p>
        Nail results depend on natural nail condition, product choice, lifestyle, aftercare, and the service selected.
        Website content is not medical advice. If your nails are damaged, sensitive, or affected by a health condition,
        tell the salon before service.
      </p>
      <h2>Website Content</h2>
      <p>
        Text, images, layout, and branding on this site belong to RM Nail Salon or are used for RM Nail Salon marketing.
        Do not copy or reuse website content without permission.
      </p>
      <h2>Third-Party Links</h2>
      <p>
        This website links to Booksy, Instagram, Google Maps, and other third-party services. Those services are
        responsible for their own websites, policies, and account experiences.
      </p>
    </LegalPageShell>
  );
}

function NotFoundPage({ navigate }) {
  return (
    <section className="not-found-page">
      <ResponsiveImage src={fastImage("rm-hero-editorial")} alt="RM Nail Salon manicure detail" loading="eager" decoding="async" />
      <div>
        <p className="eyebrow">404 / Page Not Found</p>
        <h1>This page is not on the RM menu.</h1>
        <p>
          The link may have moved, but the Midtown studio is still right here. Choose a service, view the map, or book
          directly on Booksy.
        </p>
        <div className="not-found-actions">
          <RouteLink to="/services" navigate={navigate} className="gold-cta">
            View Services <ArrowUpRight size={16} />
          </RouteLink>
          <RouteLink to="/contact" navigate={navigate} className="outline-cta">
            Contact & Map <MapPin size={16} />
          </RouteLink>
        </div>
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  const footerGeoLinks = locationAreas
    .map((area) => geoLandingPages.find((item) => item.label === area))
    .filter(Boolean);
  const footerServices = [
    { to: "/russian-manicure-nyc", label: "Russian Manicure" },
    { to: "/smart-pedicure-nyc", label: "Russian Pedicure" },
    { to: "/gel-extensions-nyc", label: "Extensions" },
    { to: "/nail-art-nyc", label: "Nail Art" }
  ];
  const quickLinks = [
    { to: "/gallery", label: "Gallery" },
    { to: "/reviews", label: "Reviews" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <footer className="footer-editorial">
      <div className="footer-lightline" />
      <div className="footer-luxury-wrap">
        <div className="footer-luxury-grid">
          <div className="footer-brand-block">
            <div className="footer-brand-heading">
              <div>
                <span className="footer-brand-kicker">One Midtown Location</span>
                <h3>{siteConfig.salonName}</h3>
              </div>
            </div>
            <p className="footer-brand-copy">
              Luxury Russian manicure studio at 875 3rd Ave for precise manicure, hard gel, pedicure, and nail art.
            </p>
            <div className="footer-contact-list" aria-label="RM Nail Salon contact details">
              <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer" onClick={trackDirectionsConversion}>
                <MapPin size={16} />
                <span>
                  <small>Address</small>
                  <strong>875 3rd Ave, Concourse Level</strong>
                  <em>New York, NY</em>
                </span>
              </a>
              <span>
                <Clock size={16} />
                <span>
                  <small>Hours</small>
                  {siteConfig.hoursLines.map((line) => (
                    <strong className="footer-hours-row" key={line}>
                      <span>{line.slice(0, line.indexOf(" "))}</span>{" "}
                      <span>{line.slice(line.indexOf(" ") + 1)}</span>
                    </strong>
                  ))}
                </span>
              </span>
              <a href={`tel:${siteConfig.phone.replace(/[^0-9]/g, "")}`}>
                <Phone size={16} />
                <span>
                  <small>Call</small>
                  <strong>{siteConfig.phone}</strong>
                </span>
              </a>
            </div>
            <div className="footer-social-labels" aria-label="RM Nail Salon social links">
              <InstagramLink />
              <a href={siteConfig.bookingUrl} target="_blank" rel="noreferrer" onClick={trackBookingConversion}>
                <CalendarDays size={16} />
                Booksy
              </a>
              <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer" onClick={trackDirectionsConversion}>
                <Navigation size={16} />
                Directions
              </a>
            </div>
          </div>

        <div className="footer-closing-cta">
          <div>
            <span>★★★★★ {reviewSummary.ratingValue} Booksy</span>
            <h2>Ready for perfect nails?</h2>
            <p>Experience precision Russian manicure trusted by Midtown NYC clients.</p>
          </div>
          <MagneticLink href={siteConfig.bookingUrl} className="gold-cta">
            Book Appointment <CalendarDays size={16} />
          </MagneticLink>
        </div>

          <nav className="footer-link-column" aria-label="Footer services">
            <span>Services</span>
            {footerServices.map((item) => (
              <RouteLink key={item.to} to={item.to} navigate={navigate}>
                {item.label}
              </RouteLink>
            ))}
          </nav>

          <nav className="footer-link-column" aria-label="Footer quick links">
            <span>Quick Links</span>
            {quickLinks.map((item) => (
              <RouteLink key={item.to} to={item.to} navigate={navigate}>
                {item.label}
              </RouteLink>
            ))}
          </nav>
        </div>

        <div className="footer-mini-nearby">
          <span>Convenient for clients from </span>
          {footerGeoLinks.map((item, index) => (
            <span key={item.path}>
              {index > 0 ? (index === footerGeoLinks.length - 1 ? " and " : ", ") : ""}
              <RouteLink to={item.path} navigate={navigate}>{item.label}</RouteLink>
            </span>
          ))}{"."}
        </div>

        <div className="footer-bottom">
          <span>© 2026 RM Nail Salon. All Rights Reserved.</span>
          <div>
            <RouteLink to="/privacy-policy" navigate={navigate}>
              Privacy Policy
            </RouteLink>
            <RouteLink to="/terms" navigate={navigate}>
              Terms
            </RouteLink>
            <RouteLink to="/sterilization-process" navigate={navigate}>
              Sterilization
            </RouteLink>
            <RouteLink to="/blog" navigate={navigate}>
              Journal
            </RouteLink>
            <a href={`mailto:${siteConfig.email}`}>Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileBook({ visible }) {
  return (
    <a
      href={siteConfig.bookingUrl}
      className={visible ? "mobile-book visible" : "mobile-book"}
      target="_blank"
      rel="noreferrer"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={trackBookingConversion}
    >
      <span>Book Appointment</span>
      <em>View availability on Booksy</em>
    </a>
  );
}

function CookieBanner() {
  const [choice, setChoice] = useState(null);
  useEffect(() => {
    try {
      setChoice(window.localStorage.getItem("rm-cookie-consent") || "");
    } catch {
      setChoice("");
    }
  }, []);

  const updateConsent = (value) => {
    const granted = value === "accepted";
    try {
      window.localStorage.setItem("rm-cookie-consent", value);
    } catch {
      // Consent still updates for this visit if storage is unavailable.
    }

    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: granted ? "granted" : "denied",
        ad_storage: granted ? "granted" : "denied",
        ad_user_data: granted ? "granted" : "denied",
        ad_personalization: granted ? "granted" : "denied"
      });
    }
    setChoice(value);
  };

  if (choice === null || choice) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie preferences">
      <div>
        <p>
          Optional cookies measure booking and direction clicks. <a href="/privacy-policy">Privacy Policy</a>
        </p>
      </div>
      <div className="cookie-actions">
        <button type="button" onClick={() => updateConsent("essential")}>
          Essential Only
        </button>
        <button type="button" onClick={() => updateConsent("accepted")}>
          Accept All
        </button>
      </div>
    </div>
  );
}

function FloatingBookNow() {
  return (
    <MagneticLink href={siteConfig.bookingUrl} className="floating-book-circle">
      <span>Book</span>
      <strong>Now</strong>
    </MagneticLink>
  );
}

function FloatingOffer() {
  return (
    <a
      href={siteConfig.bookingUrl}
      className="floating-offer"
      target="_blank"
      rel="noreferrer"
      onClick={trackBookingConversion}
    >
      <span>10% OFF</span>
      <em>First Visit</em>
    </a>
  );
}

function buildCalendar(year, month) {
  const first = new Date(year, month, 1);
  const cells = Array.from({ length: first.getDay() }, () => null);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  return cells;
}

function startOfDay(value) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

function isoDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(
    2,
    "0"
  )}`;
}

function displayDate(value) {
  if (!value) return "No date selected";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

