import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
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
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
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
  seoPages,
  serviceLandingPages
} from "./seoData";
import "./styles.css";

const reveal = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};

const pageMotion = {
  initial: { opacity: 0, y: 18 },
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
  { to: "#reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" }
];

const googleReviewUrl = siteConfig.mapUrl;

const googleReviews = [
  {
    name: "Monelle Hylaris",
    meta: "4 reviews / 4 photos",
    time: "a month ago",
    avatar: "/images/reviews/monelle-hylaris.webp",
    quote:
      "I had a great experience at Russian manicure nail studio. The tech was so gentle, detailed, and really knew what she was doing. My cuticles look super clean and my nails came out so neat and polished. You can tell they take their time and care about the work. Definitely one of the best manicures I have had."
  },
  {
    name: "Giuliana F.",
    meta: "11 reviews / 4 photos",
    time: "3 months ago",
    avatar: "/images/reviews/giuliana-f.webp",
    quote:
      "The best nail salon ever. Every technician here is extremely skilled and works efficiently. I always leave very happy with how my nails look. The attention to detail that the technicians have here is unmatched. The salon itself is very cute and all of the employees are very kind."
  },
  {
    name: "Rina Pineda",
    meta: "2 reviews / 2 photos",
    time: "a month ago",
    avatar: "/images/reviews/rina-pineda.webp",
    quote:
      "I am so happy I found this place. They did an amazing job with my nails, beautiful job, and they took their time in every single detail. I recommend this place if you are looking for a professional Russian manicure."
  }
];

const prefersReducedScroll = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const scrollBehavior = () => (prefersReducedScroll() ? "auto" : "smooth");

const referenceImage = (name) => `/images/reference/${name}.webp`;

const luxuryServices = [
  {
    title: "Russian Manicure (Hard gel)",
    copy: "Precise Russian cuticle work with structured hard gel for stronger, balanced nail architecture and a glossy natural-looking finish.",
    price: "$115",
    time: "1 h 30 min",
    bestFor: "Long-wear structure",
    image: fastImage("service-russian-hard-gel-new"),
    link: "/hard-gel-manicure-nyc"
  },
  {
    title: "Russian Manicure",
    copy: "A highly precise dry manicure for deeply cleaned cuticles, perfect shaping, and a natural or regular-polish finish.",
    price: "$65",
    time: "45 min",
    bestFor: "No polish / regular polish",
    image: fastImage("service-russian-natural-new"),
    link: "/russian-manicure-nyc"
  },
  {
    title: "Russian Nail Extensions",
    copy: "Customized length and shape sculpted with a flexible long-lasting gel system for smooth, lightweight durability.",
    price: "$195-$215",
    time: "2 h 30 min",
    bestFor: "Full transformation",
    image: fastImage("service-russian-extensions-new"),
    link: "/gel-extensions-nyc"
  },
  {
    title: "Russian Smart Gel Pedicure",
    copy: "Dry cuticle detailing, controlled callus refinement, precise shaping, and high-gloss gel for long-lasting toes.",
    price: "$120",
    time: "1 h 15 min",
    bestFor: "Gel pedicure durability",
    image: fastImage("service-smart-gel-pedicure-new"),
    link: "/smart-pedicure-nyc"
  },
  {
    title: "Russian Smart Pedicure",
    copy: "A luxurious dry pedicure that refines nails, cuticles, calluses, and dry skin for exceptionally soft, clean feet.",
    price: "$95",
    time: "1 h 15 min",
    bestFor: "Natural or regular polish",
    image: fastImage("service-smart-pedicure-natural-new"),
    link: "/smart-pedicure-nyc"
  },
  {
    title: "Nail Designs",
    copy: "Fully customized nail art, from hand-painted details to textures, abstract concepts, 3D elements, and themed sets.",
    price: "Individual",
    time: "Varies",
    bestFor: "Custom creativity",
    image: fastImage("service-nail-designs-new"),
    link: "/nail-art-nyc"
  }
];

const proofStripItems = [
  "5.0 Booksy rating",
  "7 Booksy client reviews",
  "875 3rd Ave, Concourse Level",
  "Daily 9:30 AM - 7:30 PM",
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
    includes: service.description,
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

const artistProfiles = [
  {
    name: "Lead Russian Manicure Artist",
    specialty: "Cuticle precision, hard gel structure",
    experience: "8+ years experience",
    languages: "English, Russian",
    certification: "Advanced dry manicure training",
    image: fastImage("drive-white")
  },
  {
    name: "Structured Gel Specialist",
    specialty: "Builder gel, extensions, refined shape",
    experience: "6+ years experience",
    languages: "English",
    certification: "Gel architecture certification",
    image: fastImage("drive-asian-3")
  },
  {
    name: "Pedicure & Detail Specialist",
    specialty: "Smart pedicure, clean natural finish",
    experience: "5+ years experience",
    languages: "English, Russian",
    certification: "Hygienic pedicure standards",
    image: fastImage("brand-model-sunglasses")
  }
];

const locationAreas = [
  "Midtown East",
  "Grand Central",
  "Turtle Bay",
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
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", absoluteUrl(page.path));
    setMeta("property", "og:image", absoluteImage(page.image));
    setMeta("property", "og:image:alt", page.imageAlt || page.h1 || page.title);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "1600");
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
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
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

function normalizePath() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  return seoPages.some((page) => page.path === path) ? path : "/";
}

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [route, setRoute] = useState(normalizePath);
  const [navCompact, setNavCompact] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 420);
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
    const onPop = () => setRoute(normalizePath());
    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPop);
    return () => {
      window.clearTimeout(timer);
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  }, [route]);

  const navigate = (to) => (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (to !== window.location.pathname) {
      window.history.pushState({}, "", to);
      setRoute(to);
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
      case "/contact":
        return <ContactPage />;
      default:
        return <HomePage navigate={navigate} setSelectedGallery={setSelectedGallery} />;
    }
  }, [route]);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <div className="lux-site">
          <SeoHead route={route} />
          <AnimatePresence>{loading && <Loader />}</AnimatePresence>
          <Nav compact={navCompact} route={route} navigate={navigate} />
          <main>
            <AnimatePresence mode="wait">
              <motion.div key={route} {...pageMotion}>
                {page}
              </motion.div>
            </AnimatePresence>
          </main>
          <Footer navigate={navigate} />
          <FloatingBookNow />
          <GalleryModal item={selectedGallery} onClose={() => setSelectedGallery(null)} />
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
          <span>RM</span>
          <em>{siteConfig.salonName}</em>
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
      <nav id="mobile-navigation" className={open ? "nav-links open" : "nav-links"}>
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
            <RouteLink
              key={item.to}
              to={item.to}
              navigate={menuNavigate}
              className={route === item.to ? "active" : ""}
            >
              {item.label}
            </RouteLink>
          )
        )}
        <a className="menu-book" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">
          Book Appointment
        </a>
        <a className="menu-instagram" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
          Instagram
        </a>
      </nav>
    </header>
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
        <img
          className="hero-backdrop"
          src="/images/hero-rm-mobile-hq.webp"
          alt="RM Nail Salon luxury Russian manicure hero"
          decoding="async"
          fetchPriority="high"
          loading="eager"
        />
      </picture>

      <motion.div
        className="hero-type"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.11 } } }}
      >
        <motion.h1 variants={reveal}>Midtown&apos;s Luxury Russian Manicure Studio</motion.h1>
        <motion.p variants={reveal} className="hero-sub">
          Precision Russian manicure, hard gel, smart pedicure, and nail art at 875 3rd Ave.
        </motion.p>
        <motion.div variants={reveal} className="hero-proof-line">
          <span>5.0 Booksy rating</span>
          <span>Book in 20 seconds</span>
          <span>Daily 9:30 AM - 7:30 PM</span>
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
            <img src={service.image} alt={`${service.title} at RM Nail Salon in Midtown Manhattan`} loading="lazy" decoding="async" />
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
        initial={{ opacity: 0, y: 34 }}
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
          <img src={fastImage("drive-midtown")} alt="RM Nail Salon Midtown NYC campaign skyline" loading="lazy" decoding="async" />
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
      initial="hidden"
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
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={reveal} className="composition-photo large organic-mask">
            <img src={fastImage("gallery-aqua-french")} alt="Aqua French manicure at RM Nail Salon" loading="lazy" decoding="async" />
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
          <img src={active.image} alt={active.imageAlt} loading="lazy" decoding="async" />
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
                Learn More <ArrowUpRight size={16} />
              </RouteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkReel() {
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
        className="reel-phone"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <div className="process-stage" aria-label="RM Nail Salon Russian manicure work process">
          <video
            className="process-video"
            src={siteConfig.processVideo}
            poster={fastImage("work-reel-process")}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Looping Russian manicure session video at RM Nail Salon"
          />
          <div className="process-light light-two" />
          <div className="animated-nails">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="reel-sheen" />
        <div className="reel-controls">
          <div>
            <i />
          </div>
        </div>
        <div className="reel-caption">
          <span>Precision in motion</span>
          <strong>Cuticle prep, clean structure, glossy finish.</strong>
        </div>
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
            initial={{ opacity: 0, y: 24 }}
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
    <section className="artist-section">
      <SectionIntro
        label="The Hand Behind the Work"
        title="A premium manicure is only as good as the specialist performing it."
        copy="RM highlights technique, pacing, and service standards before personality. Final technician names and portraits can be added when the salon is ready to publish them."
      />
      <div className="artist-rail">
        {artistProfiles.map((artist, index) => (
          <motion.article
            key={artist.name}
            className="artist-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <img src={artist.image} alt={`${artist.name} at RM Nail Salon`} loading="lazy" decoding="async" />
            <div>
              <span>{artist.experience}</span>
              <h3>{artist.name}</h3>
              <p>{artist.specialty}</p>
              <dl>
                <div>
                  <dt>Languages</dt>
                  <dd>{artist.languages}</dd>
                </div>
                <div>
                  <dt>Training</dt>
                  <dd>{artist.certification}</dd>
                </div>
              </dl>
              <MagneticLink href={siteConfig.bookingUrl} className="mini-book">
                Book with this artist <ArrowUpRight size={14} />
              </MagneticLink>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
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
            initial={{ opacity: 0, y: 28 }}
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
          <img
            src={fastImage("work-reel-process")}
            alt="Technician performing detailed Russian manicure prep with professional tools"
            loading="lazy"
            decoding="async"
          />
          <img
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
        <p className="eyebrow">Google Client Proof</p>
        <h2>Real reviews, real appointments.</h2>
        <p>
          Clients come to RM for the detail work: clean cuticles, careful timing, and a polished result that still feels
          fresh weeks later.
        </p>
        <div className="rating-lockup" aria-label="5.0 Google rating from client reviews">
          <strong>5.0</strong>
          <span>
            <Star size={16} fill="currentColor" />
            Google rating
          </span>
          <em>Midtown NYC clients</em>
        </div>
        <MagneticLink href={googleReviewUrl} className="outline-cta review-booksy-link">
          See Reviews on Google <ArrowUpRight size={16} />
        </MagneticLink>
      </div>
      <div className="google-review-shell">
        <div className="google-review-rail" aria-label="Scrollable Google reviews">
          {googleReviews.map((review, index) => (
            <motion.a
              key={review.name}
              href={googleReviewUrl}
              target="_blank"
              rel="noreferrer"
              className="google-review-card"
              aria-label={`Read ${review.name}'s Google review`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <div className="google-review-head">
                <img src={review.avatar} alt={`${review.name} Google profile`} loading="lazy" decoding="async" />
                <div>
                  <strong>{review.name}</strong>
                  <span>{review.meta}</span>
                </div>
              </div>
              <div className="google-stars" aria-label="5 star review">
                {[0, 1, 2, 3, 4].map((item) => (
                  <Star key={item} size={15} fill="currentColor" />
                ))}
                <span>{review.time}</span>
              </div>
              <p>{review.quote}</p>
              <em>
                See Review <ArrowUpRight size={14} />
              </em>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
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
            <img src={article.image} alt={article.imageAlt} loading="lazy" decoding="async" />
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
      title: "Business Hours",
      lines: [["Daily", "9:30 AM - 7:30 PM"]]
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
            <a className="map-directions-link" href={siteConfig.mapUrl} target="_blank" rel="noreferrer">
              <Navigation size={15} />
              Open in Maps
            </a>
          </div>
          <div className="visit-card-stack">
            {visitCards.map(({ Icon, eyebrow, title, href, external, lines }) => {
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
                <article className="visit-info-card" key={eyebrow}>
                  <Icon size={18} />
                  <div>
                    <span>{eyebrow}</span>
                    {lines ? <h3>{title}</h3> : body}
                    {lines && body}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <article className="salon-preview-card">
          <img
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
        initial={{ opacity: 0, y: 36 }}
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
              <img src={campaign.image} alt={`${campaign.title} RM special offer`} loading="lazy" decoding="async" />
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
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(isoDate(today));
  const [selectedTime, setSelectedTime] = useState("11:00 AM");
  const serviceGroups = useMemo(
    () =>
      serviceMenu
        .filter((group) => group.services?.length)
        .map((group) => ({
          category: group.category,
          services: group.services.map((service) => enrichService({ ...service, category: group.category }))
        })),
    []
  );
  const [selectedCategory, setSelectedCategory] = useState(serviceGroups[0]?.category || "");
  const selectedGroup = serviceGroups.find((group) => group.category === selectedCategory) || serviceGroups[0];
  const services = selectedGroup?.services || [];
  const [selectedServiceId, setSelectedServiceId] = useState("russian-hard-gel");
  const selectedService = services.find((service) => service.id === selectedServiceId) || services[0];
  const days = useMemo(() => buildCalendar(viewYear, viewMonth), [viewYear, viewMonth]);

  useEffect(() => {
    if (!services.some((service) => service.id === selectedServiceId) && services[0]) {
      setSelectedServiceId(services[0].id);
    }
  }, [services, selectedServiceId]);

  const shiftMonth = (delta) => {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
    const firstSelectable = startOfDay(next) < today ? today : next;
    setSelectedDate(isoDate(firstSelectable));
  };

  return (
    <section className="booking-editorial" id="booking">
      <div className="booking-gloss" />
      <div className="booking-planner-shell">
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          viewport={{ once: true, amount: 0.28 }}
          className="booking-copy"
        >
          <motion.p variants={reveal} className="eyebrow">
            Reserve Your Visit
          </motion.p>
          <motion.h2 variants={reveal}>Book your moment of precision.</motion.h2>
          <motion.p variants={reveal}>
            Choose a service, preview a date and time, then finish securely on Booksy with RM Nail Salon&apos;s real
            availability.
          </motion.p>
          <motion.div variants={reveal} className="booking-actions">
            <MagneticLink href={siteConfig.bookingUrl} className="gold-cta">
              Continue to Booksy <CalendarDays size={16} />
            </MagneticLink>
            <MagneticLink href="/contact" onClick={navigate("/contact")} className="outline-cta">
              Ask a Question <MessageCircle size={16} />
            </MagneticLink>
          </motion.div>
        </motion.div>

        <motion.div
          className="appointment-planner"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="calendar-panel">
            <div className="calendar-head">
              <div>
                <span>Select date</span>
                <strong>
                  {calendarMonths[viewMonth]} {viewYear}
                </strong>
              </div>
              <div>
                <button type="button" onClick={() => shiftMonth(-1)} aria-label="Previous month">
                  <ChevronLeft size={17} />
                </button>
                <button type="button" onClick={() => shiftMonth(1)} aria-label="Next month">
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
            <div className="calendar-weekdays">
              {calendarDays.map((day, index) => (
                <span key={`${day}-${index}`}>{day}</span>
              ))}
            </div>
            <div className="calendar-grid">
              {days.map((dateItem, index) => {
                if (!dateItem) return <span key={`empty-${index}`} />;
                const value = isoDate(dateItem);
                const past = startOfDay(dateItem) < today;
                const selected = selectedDate === value;
                return (
                  <button
                    key={value}
                    type="button"
                    disabled={past}
                    className={selected ? "selected" : ""}
                    onClick={() => setSelectedDate(value)}
                  >
                    {dateItem.getDate()}
                    {value === isoDate(today) && !selected && <i />}
                  </button>
                );
              })}
            </div>
            <div className="chosen-date">
              <CalendarDays size={19} />
              <div>
                <span>Chosen date</span>
                <strong>{displayDate(selectedDate)}</strong>
              </div>
            </div>
          </div>

          <div className="planner-detail-panel">
            <div className="service-group-tabs" aria-label="Service categories">
              {serviceGroups.map((group) => (
                <button
                  key={group.category}
                  type="button"
                  className={selectedCategory === group.category ? "selected" : ""}
                  onClick={() => {
                    setSelectedCategory(group.category);
                    setSelectedServiceId(group.services[0]?.id || selectedServiceId);
                  }}
                >
                  {group.category}
                </button>
              ))}
            </div>
            <label>
              <span>Service</span>
              <select value={selectedServiceId} onChange={(event) => setSelectedServiceId(event.target.value)}>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {bookingOptionLabel(service)}
                  </option>
                ))}
              </select>
            </label>
            <div className="time-slot-group">
              <span>Preferred time</span>
              <div>
                {bookingTimeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    className={selectedTime === slot ? "selected" : ""}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
            <article className="planner-summary">
              <img
                src={selectedService?.image || referenceImage("ref-luxury-hero")}
                alt={`${selectedService?.name || "RM service"} preview`}
                loading="lazy"
                decoding="async"
              />
              <div>
                <span>Your preview</span>
                <h3>{selectedService?.name}</h3>
                <p>
                  {selectedService?.price} / {selectedService?.time}. {displayDate(selectedDate)} at {selectedTime}.
                </p>
              </div>
            </article>
            <a className="planner-book-button" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">
              <Check size={17} />
              Finish Booking on Booksy
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PageHero({ label, title, copy, image = fastImage("rm-hero-editorial"), alt = "" }) {
  return (
    <section className="page-hero">
      <img src={image} alt={alt} loading="eager" decoding="async" fetchPriority="high" />
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
            <img src={spotlight.image} alt={spotlight.imageAlt} loading="lazy" decoding="async" />
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
                <img
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
                  <img src={service.image} alt={service.imageAlt} loading="lazy" decoding="async" />
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
                      Learn more
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
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <img
          className="before-image"
          src={fastImage("service-russian-clear")}
          alt="Before Russian manicure natural nail preparation"
          loading="lazy"
          decoding="async"
        />
        <div className="after-layer" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          <img
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
                  <img src={page.resultImage || page.image} alt={page.resultAlt || page.imageAlt} loading="lazy" decoding="async" />
                  <div>
                    <span>Final result first</span>
                    <h3>{page.resultTitle || "The finish clients are booking for."}</h3>
                    <p>{page.resultCopy || "A polished result should look clean up close before the process becomes part of the story."}</p>
                  </div>
                </article>
                <article>
                  <img src={page.processImage} alt={page.processAlt || `${page.serviceType} process at RM Nail Salon`} loading="lazy" decoding="async" />
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
              <img
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

        <div className="service-page-faqs">
          <p className="eyebrow">Service FAQ</p>
          <h2>Before you book {page.serviceType.toLowerCase()}.</h2>
          {decisionFaqs.map(([question, answer]) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>
      <Booking navigate={navigate} />
    </>
  );
}

function GeoLandingPage({ page, navigate }) {
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
      <section className="seo-landing-section geo-seo">
        <div className="geo-story-grid">
          <article className="geo-story-main">
            <p className="eyebrow">{page.area} Nail Studio</p>
            <h2>{page.introTitle}</h2>
            <p>{page.intro}</p>
            <p>
              RM Nail Salon is located at {siteConfig.address}, with booking available online and daily appointments
              from 9:30 AM to 7:30 PM.
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
            <p className="eyebrow">Nearby</p>
            <h3>Clients visit RM from:</h3>
            <ul>
              {page.landmarks.map((landmark) => (
                <li key={landmark}>{landmark}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="geo-service-path">
          <div className="seo-list-heading">
            <p className="eyebrow">Popular For {page.area}</p>
            <h2>Services clients often pair with this location page.</h2>
          </div>
          {relatedPages.map((item) => (
            <RouteLink key={item.path} to={item.path} navigate={navigate} className="geo-path-card">
              <img src={item.image} alt={item.imageAlt} loading="lazy" decoding="async" />
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
          title="Explore more Midtown NYC service areas."
          eyebrow="Nearby Midtown Routes"
          links={geoLandingPages.filter((item) => item.path !== page.path).slice(0, 5)}
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
            <img src={item.image} alt={item.imageAlt} loading="lazy" decoding="async" />
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
              These guides are written for clients comparing premium nail services in Midtown Manhattan, not for
              generic beauty traffic.
            </p>
          </article>
          <RouteLink to="/sterilization-process" navigate={navigate} className="trust-ticket">
            <ShieldCheck size={18} />
            <span>Read our hygiene and sterilization process</span>
            <ArrowUpRight size={15} />
          </RouteLink>
        </div>
        <div className="blog-card-grid">
          {blogArticlePages.map((article, index) => (
            <RouteLink
              key={article.path}
              to={article.path}
              navigate={navigate}
              className={index % 3 === 0 ? "blog-card wide" : "blog-card"}
            >
              <img src={article.image} alt={article.imageAlt} loading="lazy" decoding="async" />
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
          <em>Updated {new Date(page.datePublished).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</em>
          <MagneticLink href={siteConfig.bookingUrl} className="mini-book">
            Book Now <CalendarDays size={14} />
          </MagneticLink>
        </aside>
        <article className="article-body">
          <p className="eyebrow">RM Education</p>
          <h2>{page.introTitle}</h2>
          <p>{page.intro}</p>
          {page.sections.map(([heading, copy]) => (
            <section key={heading}>
              <h3>{heading}</h3>
              <p>{copy}</p>
            </section>
          ))}
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
      <PageHero
        label={page.label}
        title={page.h1}
        copy="Luxury manicures are sold by trust. Meet the roles, standards, and specialties behind the RM appointment experience."
        image={page.image}
        alt={page.imageAlt}
      />
      <section className="team-page-section">
        <div className="team-intro-card">
          <p className="eyebrow">E-E-A-T</p>
          <h2>Artists first. Services second.</h2>
          <p>
            RM is built around trained nail specialists who understand cuticle precision, clean product application,
            structure, and long-wear results. Actual team portraits and names can be added as soon as the salon is ready
            to publish them.
          </p>
          <RouteLink to="/sterilization-process" navigate={navigate} className="aqua-cta">
            See Hygiene Standards <ShieldCheck size={16} />
          </RouteLink>
        </div>
        <div className="artist-rail team-mode">
          {artistProfiles.map((artist) => (
            <article className="artist-card" key={artist.name}>
              <img src={artist.image} alt={`${artist.name} at RM Nail Salon`} loading="lazy" decoding="async" />
              <div>
                <span>{artist.experience}</span>
                <h3>{artist.name}</h3>
                <p>{artist.specialty}</p>
                <dl>
                  <div>
                    <dt>Languages</dt>
                    <dd>{artist.languages}</dd>
                  </div>
                  <div>
                    <dt>Training</dt>
                    <dd>{artist.certification}</dd>
                  </div>
                </dl>
                <MagneticLink href={siteConfig.bookingUrl} className="mini-book">
                  Book With RM <ArrowUpRight size={14} />
                </MagneticLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function SterilizationPage({ navigate }) {
  const page = getSeoPage("/sterilization-process");
  const standards = [
    ["Consultation first", "We check nail condition and service goals before choosing the correct prep and product path."],
    ["Clean tool mindset", "Detailed services require controlled, hygienic setup and professional handling from start to finish."],
    ["Dry prep control", "Russian manicure work is paced carefully around the cuticle area for a cleaner result."],
    ["Product discipline", "Gel, hard gel, and extension products are applied with attention to edges, balance, and wear."],
    ["Aftercare clarity", "Clients leave with practical guidance on oil, water exposure, maintenance timing, and booking rhythm."]
  ];

  return (
    <>
      <PageHero
        label={page.label}
        title={page.h1}
        copy="Trust is not a slogan. It is the way tools, timing, polish edges, and client comfort are handled during the appointment."
        image={page.image}
        alt={page.imageAlt}
      />
      <section className="sterile-section">
        <div className="sterile-manifesto">
          <p className="eyebrow">Clean Luxury</p>
          <h2>Every premium result begins before the color.</h2>
          <p>
            Russian manicure clients care about detail because the detail is visible. RM treats hygiene, controlled prep,
            and calm pacing as part of the luxury experience.
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
            Every detail is designed to help new visitors trust the work quickly: clean tools, precise technique,
            long-wearing results, and an experience that feels professional instead of template-like.
          </p>
          <MagneticLink href="/services" onClick={navigate("/services")} className="aqua-cta">
            View Services <ArrowUpRight size={16} />
          </MagneticLink>
        </div>
      </section>
      <section className="values-flow">
        {[
          ["01", "Precision", "Detailed e-file cuticle work and balanced nail architecture."],
          ["02", "Hygiene", "Clean tools, careful preparation, and professional standards."],
          ["03", "Longevity", "A glossy finish designed to look fresh well beyond the appointment."],
          ["04", "Experience", "A calm premium visit with cyan RM atmosphere and personal attention."]
        ].map(([number, title, copy]) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
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
        image={fastImage("gallery-aqua-french")}
        alt="Aqua French manicure gallery photo at RM Nail Salon"
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
          aria-label={`Open ${item.title} gallery photo`}
          onClick={() => setSelectedGallery({ ...item, index })}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          style={{ "--image-focus": item.focal || "center" }}
        >
          <img src={item.image} alt={item.alt || `${item.title} manicure gallery photo`} loading="lazy" decoding="async" />
          <div className="masonry-caption">
            <span>{item.category || "RM Gallery"}</span>
            <strong>{item.title}</strong>
            <em>{item.caption}</em>
            <small>Book this look <ArrowUpRight size={13} /></small>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

function GalleryModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} gallery preview`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`modal-card tone-${item.tone}`}
            initial={{ scale: 0.94, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 24 }}
            onClick={(event) => event.stopPropagation()}
          >
            <img src={item.image} alt={`${item.title} manicure close-up`} decoding="async" />
            <button className="modal-close" onClick={onClose} aria-label="Close gallery preview">
              <X size={19} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
        image={fastImage("gallery-blue-gray")}
        alt="Blue gray manicure detail for Russian manicure FAQ"
      />
      <section className="faq-section">
        <SectionIntro
          label="Before You Book"
          title="Clear answers for a more confident appointment."
          copy="Use these details to choose between Russian manicure, hard gel, pedicure, extensions, nail art, and repair services."
          align="center"
        />
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

function ContactPage() {
  const contacts = [
    [Phone, "Phone", siteConfig.phone, `tel:${siteConfig.phone.replace(/[^0-9]/g, "")}`],
    [Mail, "Email", siteConfig.email, `mailto:${siteConfig.email}`],
    [AtSign, "Instagram", siteConfig.instagramHandle, siteConfig.instagramUrl],
    [MapPin, "Address", siteConfig.address, siteConfig.mapUrl],
    [Clock, "Hours", siteConfig.hours, null]
  ];

  return (
    <>
      <PageHero
        label="Contact"
        title="Book or contact RM Nail Salon in Midtown NYC."
        copy="Find our address, phone number, Instagram, booking link, daily hours, and map for your next appointment."
        image={fastImage("rm-hero-editorial")}
        alt="RM Nail Salon contact page manicure detail"
      />
      <section id="contact" className="contact-editorial">
        <SectionIntro
          label="Visit RM"
          title="Book online, call, or find us in Midtown Manhattan."
          copy="RM Nail Salon is located at 875 3rd Ave, Concourse Level, with daily appointments and online booking through Booksy."
          align="center"
        />
        <div className="contact-layout">
          <div className="contact-cards">
            {contacts.map(([Icon, label, value, href]) => {
              const external = href?.startsWith("http");
              return (
                <article key={label}>
                  <Icon size={19} />
                  <span>{label}</span>
                  {href ? (
                    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
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
            <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer">
              <MapPin size={18} />
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Footer({ navigate }) {
  const primaryLinks = routes.slice(1).filter((item) => !item.to.startsWith("#"));
  const footerGeoLinks = locationAreas
    .map((area) => geoLandingPages.find((item) => item.label === area))
    .filter(Boolean);
  const trustLinks = [
    { to: "/blog", label: "RM Journal" },
    { to: "/team", label: "Meet the Artists" },
    { to: "/sterilization-process", label: "Sterilization Process" },
    ...blogArticlePages.slice(0, 3).map((item) => ({ to: item.path, label: item.navLabel }))
  ];

  return (
    <footer className="footer-editorial">
      <div className="footer-lightline" />
      <div className="footer-topline">
        <RouteLink to="/" navigate={navigate} className="footer-logo">
          <span>RM</span>
          <div>
            <strong>{siteConfig.salonName}</strong>
            <em>Midtown NYC / Russian Manicure</em>
          </div>
        </RouteLink>
        <p>
          Precision Russian manicure, hard gel, smart pedicure, and polished client experience at 875 3rd Ave.
        </p>
        <div className="footer-socials">
          <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
            <AtSign size={17} />
          </a>
          <a href={`tel:${siteConfig.phone.replace(/[^0-9]/g, "")}`} aria-label="Call RM Nail Salon">
            <Phone size={17} />
          </a>
          <a href={`mailto:${siteConfig.email}`} aria-label="Email RM Nail Salon">
            <Mail size={17} />
          </a>
          <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer" aria-label="Open map">
            <MapPin size={17} />
          </a>
        </div>
      </div>

      <nav className="footer-primary-nav" aria-label="Footer primary navigation">
        {primaryLinks.map((item) => (
          <RouteLink key={item.to} to={item.to} navigate={navigate}>
            {item.label}
          </RouteLink>
        ))}
        <a
          href="/#reviews"
          onClick={(event) => {
            event.preventDefault();
            window.history.pushState({}, "", "/#reviews");
            window.dispatchEvent(new PopStateEvent("popstate"));
            window.setTimeout(() => document.querySelector("#reviews")?.scrollIntoView({ behavior: scrollBehavior() }), 90);
          }}
        >
          Reviews
        </a>
      </nav>

      <div className="footer-seo-nav">
        <div>
          <span>Signature Services</span>
          {serviceLandingPages.map((item) => (
            <RouteLink key={item.path} to={item.path} navigate={navigate}>
              {item.navLabel}
            </RouteLink>
          ))}
        </div>
        <div>
          <span>Nearby Areas</span>
          {footerGeoLinks.map((item) => (
            <RouteLink key={item.path} to={item.path} navigate={navigate}>
              {item.navLabel}
            </RouteLink>
          ))}
        </div>
        <div>
          <span>Trust & Education</span>
          {trustLinks.map((item) => (
            <RouteLink key={item.to} to={item.to} navigate={navigate}>
              {item.label}
            </RouteLink>
          ))}
        </div>
      </div>
      <div className="footer-watermark" aria-hidden="true">
        RM Nail Salon
      </div>
      <div className="footer-bottom">
        <span>Copyright 2026 RM Nail Salon</span>
        <RouteLink to="/" navigate={navigate}>
          Back to top
        </RouteLink>
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
    >
      <span>Book Appointment</span>
      <em>View availability on Booksy</em>
    </a>
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
    <a href={siteConfig.bookingUrl} className="floating-offer" target="_blank" rel="noreferrer">
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

const rootElement = document.getElementById("root");
const appRoot = window.__rmNailSalonRoot || createRoot(rootElement);
window.__rmNailSalonRoot = appRoot;
appRoot.render(<App />);
