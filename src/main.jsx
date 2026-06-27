import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring
} from "framer-motion";
import {
  ArrowUpRight,
  AtSign,
  CalendarDays,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
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
  getRelatedSeoPages,
  getSeoPage,
  getServiceById,
  reviewSummary,
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

const luxuryServices = [
  {
    title: "Russian Manicure",
    copy: "For the clean cuticle line and polished grow-out clients notice weeks later.",
    price: "from $55",
    image: fastImage("service-russian-clear"),
    link: "/russian-manicure-nyc"
  },
  {
    title: "Hard Gel Overlay",
    copy: "Slim structure, glossy balance, and strength without a heavy-looking nail.",
    price: "from $105",
    image: fastImage("service-hard-gel"),
    link: "/hard-gel-manicure-nyc"
  },
  {
    title: "Gel Manicure",
    copy: "A long-wear finish shaped around elegant hands and a clean RM standard.",
    price: "from $105",
    image: fastImage("service-spa-hard-gel-v2"),
    link: "/services"
  },
  {
    title: "Nail Extensions",
    copy: "Sculpted length with proportion, architecture, and a refined editorial profile.",
    price: "from $175",
    image: fastImage("service-extensions"),
    link: "/gel-extensions-nyc"
  },
  {
    title: "Smart Pedicure",
    copy: "Clean foot care, precise shaping, and optional gel polish in a calm studio setting.",
    price: "from $85",
    image: fastImage("service-smart-pedicure"),
    link: "/smart-pedicure-nyc"
  },
  {
    title: "Nail Art",
    copy: "French, chrome, cat eye, ombre, and custom accents that still feel luxury.",
    price: "from $20",
    image: fastImage("service-nail-design"),
    link: "/nail-art-nyc"
  }
];

const proofStripItems = [
  "1,000+ happy client moments",
  "Russian manicure specialists",
  "Premium sterilization standards",
  "Midtown Manhattan studio",
  "5.0 Booksy rating"
];

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

const homeReviews = [
  {
    author: "Lauren",
    quote: "Meticulous, clean and careful work.",
    detail: "Russian manicure client"
  },
  {
    author: "Jacqueline",
    quote: "Great manicure and service.",
    detail: "Hard gel appointment"
  },
  {
    author: "Nikki",
    quote: "Great service and beautiful nails.",
    detail: "RM client review"
  }
];

const locationAreas = [
  "Midtown East",
  "Grand Central",
  "Turtle Bay",
  "Sutton Place",
  "Rockefeller Center",
  "Murray Hill"
];

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
    const timer = window.setTimeout(() => setLoading(false), 1000);
    const onScroll = () => setNavCompact(window.scrollY > 42);
    const onPop = () => setRoute(normalizePath());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPop);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        return <ServicesPage />;
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
      <FloatingOffer />
      <MobileBook />
      <GalleryModal item={selectedGallery} onClose={() => setSelectedGallery(null)} />
    </div>
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

function RouteLink({ to, navigate, className = "", children }) {
  if (to.startsWith("#")) {
    return (
      <a href={to} className={className}>
        {children}
      </a>
    );
  }

  return (
    <a href={to} className={className} onClick={navigate(to)}>
      {children}
    </a>
  );
}

function Nav({ compact, route, navigate }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [route]);

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
            aria-label="Open navigation menu"
          >
            {open ? <X size={22} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
      <nav className={open ? "nav-links open" : "nav-links"}>
        {routes.slice(1).map((item) =>
          item.to.startsWith("#") ? (
            <a key={item.to} href={item.to} onClick={() => setOpen(false)}>
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
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 170, damping: 15 });
  const y = useSpring(my, { stiffness: 170, damping: 15 });
  const external = href?.startsWith("http");
  const canMagnet =
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
      <SocialProofStrip />
      <LuxuryServicesOverview navigate={navigate} />
      <SignatureExperience navigate={navigate} />
      <BeforeAfterExperience />
      <Proof />
      <ProcessTimeline />
      <WorkReel />
      <GalleryPreview setSelectedGallery={setSelectedGallery} navigate={navigate} />
      <MeetArtists />
      <ReviewsSection />
      <EditorialJournal navigate={navigate} />
      <LocationSection navigate={navigate} />
      <HomeFaq />
      <Offer />
      <Booking navigate={navigate} />
    </>
  );
}

function Hero({ navigate }) {
  return (
    <section className="hero-editorial">
      <img
        className="hero-backdrop hero-backdrop-desktop"
        src={fastImage("rm-hero")}
        alt="RM Nail Salon luxury Russian manicure hero"
        decoding="async"
        fetchPriority="high"
        loading="eager"
      />
      <img
        className="hero-backdrop hero-backdrop-mobile"
        src={fastImage("rm-hero-editorial")}
        alt="RM Nail Salon luxury Russian manicure hero"
        decoding="async"
        fetchPriority="high"
        loading="eager"
      />
      <div className="polish-orb orb-one" />
      <div className="polish-orb orb-two" />
      <div className="gel-ribbon ribbon-one" />
      <div className="gel-ribbon ribbon-two" />

      <motion.div
        className="hero-type"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.11 } } }}
      >
        <motion.h1 variants={reveal}>Manhattan&apos;s Luxury Russian Manicure Experience</motion.h1>
        <motion.p variants={reveal} className="hero-sub">
          Flawless cuticle work, structured gel, and long-lasting nail artistry in the heart of Midtown NYC.
        </motion.p>
        <motion.div variants={reveal} className="hero-actions">
          <MagneticLink href={siteConfig.bookingUrl} className="gold-cta">
            Book an Appointment <ArrowUpRight size={17} />
          </MagneticLink>
          <MagneticLink href="/services" onClick={navigate("/services")} className="aqua-cta">
            Explore Services <Sparkles size={16} />
          </MagneticLink>
        </motion.div>
        <motion.div variants={reveal} className="hero-proof">
          <span>Midtown Manhattan</span>
          <span>5.0 Booksy rating</span>
          <span>Russian manicure specialists</span>
          <span>Book in 20 seconds</span>
        </motion.div>
      </motion.div>

      <div className="hero-index">
        <span>Precision</span>
        <span>Hygiene</span>
        <span>Long-lasting beauty</span>
      </div>
    </section>
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
      <SectionIntro
        label="Services"
        title="Treatments designed for the manicure people keep looking at."
        copy="Choose the appointment by the result you want: a cleaner cuticle line, stronger structure, glossy color, sculpted length, or a complete hands-and-feet finish."
      />
      <div className="luxury-service-grid">
        {luxuryServices.map((service, index) => (
          <motion.article
            key={service.title}
            className="luxury-service-card"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <img src={service.image} alt={`${service.title} at RM Nail Salon in Midtown Manhattan`} loading="lazy" decoding="async" />
            <div>
              <span>{service.price}</span>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <RouteLink to={service.link} navigate={navigate} className="text-link">
                Learn more <ArrowUpRight size={15} />
              </RouteLink>
            </div>
          </motion.article>
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

function FeaturedServicesHome() {
  const [active, setActive] = useState(featuredServices[0]);

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
          <img src={active.image} alt={`${active.name} example at RM Nail Salon`} loading="lazy" decoding="async" />
          <div className="featured-price">
            <span>{active.time}</span>
            <strong>{active.price}</strong>
          </div>
        </motion.div>
        <div className="featured-service-list">
          {featuredServices.map((service) => (
            <button
              key={service.id}
              className={active.id === service.id ? "featured-service-row active" : "featured-service-row"}
              onClick={() => setActive(service)}
            >
              <span>{service.category}</span>
              <strong>{service.shortName}</strong>
              <em>{service.price}</em>
            </button>
          ))}
          <MagneticLink href={siteConfig.bookingUrl} className="outline-cta">
            Book Appointment <CalendarDays size={16} />
          </MagneticLink>
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
          <img className="process-shot process-shot-one" src={fastImage("work-reel-process")} alt="Russian manicure cuticle prep at RM Nail Salon" loading="lazy" decoding="async" />
          <img className="process-shot process-shot-two" src={fastImage("service-hard-gel")} alt="Hard gel manicure work in progress at RM Nail Salon" loading="lazy" decoding="async" />
          <img className="process-shot process-shot-three" src={fastImage("brand-face-red-nails-framed")} alt="RM Nail Salon editorial red manicure campaign image" loading="lazy" decoding="async" />
          <div className="process-light light-one" />
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
        label="Meet the Artists"
        title="Luxury salons sell the hand behind the work."
        copy="These editable artist profiles give the site real expert presence now, and can be replaced with final names, portraits, certifications, and languages when you provide them."
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
            <img src={artist.image} alt={`${artist.name} portrait placeholder for RM Nail Salon`} loading="lazy" decoding="async" />
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

function ReviewsSection() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="reviews-lead">
        <p className="eyebrow">Client Proof</p>
        <h2>People book beauty when they feel safe choosing you.</h2>
        <p>
          RM is building trust through visible process, clean standards, and client reviews from the booking platform.
        </p>
        <div className="rating-lockup" aria-label={`${reviewSummary.ratingValue} rating from ${reviewSummary.reviewCount} client reviews`}>
          <strong>{reviewSummary.ratingValue}</strong>
          <span>
            <Star size={16} fill="currentColor" />
            {reviewSummary.source} rating
          </span>
          <em>{reviewSummary.reviewCount} client reviews</em>
        </div>
      </div>
      <div className="review-cards">
        {homeReviews.map((review, index) => (
          <motion.article
            key={review.author}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <div>
              {[0, 1, 2, 3, 4].map((item) => (
                <Star key={item} size={14} fill="currentColor" />
              ))}
            </div>
            <q>{review.quote}</q>
            <span>{review.author} / {review.detail}</span>
          </motion.article>
        ))}
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
        <RouteLink to="/contact" navigate={navigate} className="aqua-cta">
          Contact & Map <MapPin size={16} />
        </RouteLink>
      </div>
      <div className="home-map-frame">
        <iframe
          title="RM Nail Salon Midtown Manhattan map"
          src={siteConfig.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
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
            <button onClick={() => setOpen(open === index ? -1 : index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.question}</strong>
              <ChevronDown size={18} />
            </button>
            <AnimatePresence>
              {open === index && (
                <motion.p
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
  return (
    <section className="booking-editorial">
      <div className="booking-gloss" />
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        viewport={{ once: true, amount: 0.4 }}
        className="booking-copy"
      >
        <motion.p variants={reveal} className="eyebrow">
          Book RM
        </motion.p>
        <motion.h2 variants={reveal}>Ready for nails that look flawless for weeks?</motion.h2>
        <motion.p variants={reveal}>
          Book the appointment that makes your hands feel polished before you even reach for your phone camera.
        </motion.p>
        <motion.div variants={reveal} className="booking-actions">
          <MagneticLink href={siteConfig.bookingUrl} className="gold-cta">
            Book Appointment <CalendarDays size={16} />
          </MagneticLink>
          <MagneticLink href="/contact" onClick={navigate("/contact")} className="outline-cta">
            Message Us <MessageCircle size={16} />
          </MagneticLink>
        </motion.div>
      </motion.div>
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

function ServicesPage() {
  const allServices = serviceMenu.flatMap((group) =>
    group.services.map((service) => ({ ...service, category: group.category }))
  );
  const [spotlight, setSpotlight] = useState(
    allServices.find((service) => service.id === "russian-hard-gel") || allServices[0]
  );

  const scrollToCategory = (category) => {
    document.getElementById(slug(category))?.scrollIntoView({ behavior: "smooth", block: "start" });
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
            className="lookbook-image organic-mask"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
          >
            <img src={spotlight.image} alt={`${spotlight.name} service preview at RM Nail Salon`} loading="lazy" decoding="async" />
            <div>
              <span>{spotlight.category}</span>
              <strong>{spotlight.name}</strong>
              <em>{spotlight.price}</em>
            </div>
          </motion.div>
          <div className="lookbook-rail" aria-label="Service image previews">
            {allServices.map((service) => (
              <button
                key={service.id}
                className={spotlight.id === service.id ? "active" : ""}
                onMouseEnter={() => setSpotlight(service)}
                onFocus={() => setSpotlight(service)}
                onClick={() => {
                  setSpotlight(service);
                  document.getElementById(service.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              >
                <img src={service.image} alt={`${service.name} thumbnail at RM Nail Salon`} loading="lazy" decoding="async" />
                <span>{service.shortName}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="category-pills" aria-label="Service categories">
          {serviceMenu.map((group) => (
            <button key={group.category} onClick={() => scrollToCategory(group.category)}>
              {group.category}
            </button>
          ))}
        </div>
        {serviceMenu.map((group) => (
          <div className="catalog-group" id={slug(group.category)} key={group.category}>
            <div className="catalog-group-heading">
              <p className="eyebrow">{group.category}</p>
              <h2>{group.category}</h2>
              <p>{group.note}</p>
            </div>
            <div className="catalog-list">
              {group.services.map((service) => (
                <article
                  className="catalog-service"
                  key={service.id}
                  id={service.id}
                  onMouseEnter={() => setSpotlight({ ...service, category: group.category })}
                >
                  <img src={service.image} alt={`${service.name} service image at RM Nail Salon`} loading="lazy" decoding="async" />
                  <div className="catalog-copy">
                    <span>{service.time}</span>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                  </div>
                  <div className="catalog-price">
                    <strong>{service.price}</strong>
                    {service.topTech && <span>Top tech {service.topTech}</span>}
                    <MagneticLink href={siteConfig.bookingUrl} className="mini-book">
                      Book <ArrowUpRight size={14} />
                    </MagneticLink>
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
  const services = page.serviceIds.map(getServiceById).filter(Boolean);
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
      <section className="seo-landing-section service-seo">
        <div className="seo-lead-block">
          <p className="eyebrow">{page.serviceType}</p>
          <h2>{page.introTitle}</h2>
          <p>{page.intro}</p>
          <div className="seo-cta-row">
            <MagneticLink href={siteConfig.bookingUrl} className="gold-cta">
              Book This Service <CalendarDays size={16} />
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

        <div className="seo-service-list">
          <div className="seo-list-heading">
            <p className="eyebrow">Related RM Services</p>
            <h2>Choose the version that fits your nails.</h2>
          </div>
          {services.map((service) => (
            <article key={service.id} className="seo-service-card">
              <img
                src={service.image}
                alt={`${service.name} at RM Nail Salon in Midtown NYC`}
                loading="lazy"
                decoding="async"
              />
              <div>
                <span>{service.category} / {service.time}</span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
              <strong>{service.price}</strong>
              <MagneticLink href={siteConfig.bookingUrl} className="mini-book">
                Book <ArrowUpRight size={14} />
              </MagneticLink>
            </article>
          ))}
        </div>

        <RelatedSeoLinks
          title="Continue through the RM service path."
          links={relatedPages}
          navigate={navigate}
        />
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
          links={geoLandingPages.filter((item) => item.path !== page.path).slice(0, 5)}
          navigate={navigate}
        />
      </section>
      <Booking navigate={navigate} />
    </>
  );
}

function RelatedSeoLinks({ title, links, navigate }) {
  return (
    <div className="related-seo-links">
      <p className="eyebrow">Internal Links</p>
      <h2>{title}</h2>
      <div>
        {links.map((item) => (
          <RouteLink key={item.path} to={item.path} navigate={navigate}>
            {item.navLabel || item.h1}
            <ArrowUpRight size={14} />
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
          className={`masonry-item ${item.size} tone-${item.tone}`}
          aria-label={`Open ${item.title} gallery photo`}
          onClick={() => setSelectedGallery({ ...item, index })}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <img src={item.image} alt={item.alt || `${item.title} manicure gallery photo at RM Nail Salon`} loading="lazy" decoding="async" />
        </motion.button>
      ))}
    </div>
  );
}

function GalleryModal({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="modal-backdrop"
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
        {faqs.map((item, index) => (
          <article className={open === index ? "faq-item open" : "faq-item"} key={item.question}>
            <button onClick={() => setOpen(open === index ? -1 : index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.question}</strong>
              <ChevronDown size={19} />
            </button>
            <AnimatePresence>
              {open === index && (
                <motion.p
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
  return (
    <footer className="footer-editorial">
      <RouteLink to="/" navigate={navigate} className="footer-logo">
        {siteConfig.salonName}
      </RouteLink>
      <div className="footer-review-proof">
        <strong>{reviewSummary.ratingValue}</strong>
        <span>{reviewSummary.source} rating from {reviewSummary.reviewCount} client reviews</span>
        <div>
          {reviewSummary.reviews.map((review) => (
            <q key={review.author}>{review.reviewBody}</q>
          ))}
        </div>
      </div>
      <nav>
        {routes.slice(1).map((item) => (
          <RouteLink key={item.to} to={item.to} navigate={navigate}>
            {item.label}
          </RouteLink>
        ))}
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
          {geoLandingPages.slice(0, 7).map((item) => (
            <RouteLink key={item.path} to={item.path} navigate={navigate}>
              {item.navLabel}
            </RouteLink>
          ))}
        </div>
        <div>
          <span>Trust & Education</span>
          <RouteLink to="/blog" navigate={navigate}>
            RM Journal
          </RouteLink>
          <RouteLink to="/team" navigate={navigate}>
            Meet the Artists
          </RouteLink>
          <RouteLink to="/sterilization-process" navigate={navigate}>
            Sterilization Process
          </RouteLink>
          {blogArticlePages.slice(0, 3).map((item) => (
            <RouteLink key={item.path} to={item.path} navigate={navigate}>
              {item.navLabel}
            </RouteLink>
          ))}
        </div>
      </div>
      <span>Copyright 2026 RM Nail Salon</span>
    </footer>
  );
}

function MobileBook() {
  return (
    <a href={siteConfig.bookingUrl} className="mobile-book" target="_blank" rel="noreferrer">
      Book Now
    </a>
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

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

createRoot(document.getElementById("root")).render(<App />);
