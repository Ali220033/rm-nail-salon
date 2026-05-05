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
  Sparkles,
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
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" }
];

function normalizePath() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  return routes.some((route) => route.to === path) ? path : "/";
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
    switch (route) {
      case "/services":
        return <ServicesPage />;
      case "/about":
        return <AboutPage navigate={navigate} />;
      case "/gallery":
        return <GalleryPage setSelectedGallery={setSelectedGallery} />;
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
        {routes.slice(1).map((item) => (
          <RouteLink
            key={item.to}
            to={item.to}
            navigate={menuNavigate}
            className={route === item.to ? "active" : ""}
          >
            {item.label}
          </RouteLink>
        ))}
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
      <SignatureExperience navigate={navigate} />
      <BrandRibbon />
      <FeaturedServicesHome />
      <WorkReel />
      <GalleryPreview setSelectedGallery={setSelectedGallery} navigate={navigate} />
      <Proof />
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
        <motion.p variants={reveal} className="eyebrow">
          Premium Russian manicure studio
        </motion.p>
        <motion.h1 variants={reveal}>RM Nail Salon</motion.h1>
        <motion.p variants={reveal} className="hero-sub">
          Russian Manicure in Midtown NYC
        </motion.p>
        <motion.p variants={reveal} className="hero-trust">
          Precision. Hygiene. Long-lasting beauty.
        </motion.p>
        <motion.div variants={reveal} className="hero-actions">
          <MagneticLink href={siteConfig.bookingUrl} className="gold-cta">
            Book Appointment <ArrowUpRight size={17} />
          </MagneticLink>
          <MagneticLink href="/services" onClick={navigate("/services")} className="aqua-cta">
            View Services <Sparkles size={16} />
          </MagneticLink>
        </motion.div>
      </motion.div>

      <div className="hero-index">
        <span>Midtown NYC</span>
        <span>Russian Manicure</span>
        <span>Cyan Luxury Studio</span>
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
          <img src={fastImage("brand-salon-front-full")} alt="RM Nail Salon Midtown NYC storefront" loading="lazy" decoding="async" />
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
    <section className="signature-section">
      <div className="signature-layout">
        <SectionIntro
          label="Signature Experience"
          title="Luxury is the discipline of every small detail."
          copy="RM Nail Salon is designed around Russian manicure precision: clean cuticle work, balanced structure, hygienic preparation, and a finish that looks expensive up close."
        />
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
            <span>Russian manicure</span>
            <strong>Clean. Precise. Long wearing.</strong>
            <p>A beauty appointment that feels calm, controlled, and deeply polished.</p>
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
          <img src={active.image} alt={`${active.name} example`} loading="eager" decoding="async" />
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
          <img className="process-shot process-shot-one" src={fastImage("work-reel-process")} alt="" loading="lazy" decoding="async" />
          <img className="process-shot process-shot-two" src={fastImage("service-hard-gel")} alt="" loading="lazy" decoding="async" />
          <img className="process-shot process-shot-three" src={fastImage("brand-face-red-nails-framed")} alt="" loading="lazy" decoding="async" />
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

function Proof() {
  return (
    <section className="proof-editorial">
      <SectionIntro label="Why Clients Choose RM" title="Proof, not decoration." align="center" />
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

function Offer() {
  const campaigns = [
    {
      image: fastImage("brand-offer-earlybird-tight"),
      label: "Early Bird Special",
      title: "10% OFF Before 12 PM",
      copy: "Monday-Thursday"
    },
    {
      image: fastImage("brand-offer-return-tight"),
      label: "Come Back Within 3 Weeks",
      title: "Get 8% Off Your Next Visit",
      copy: "Returning client offer"
    },
    {
      image: fastImage("brand-offer-birthday-tight"),
      label: "Birthday Offer",
      title: "Enjoy 10% Off",
      copy: "Birthday week appointment"
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
          {campaigns.map((campaign) => (
            <article
              className="offer-campaign"
              key={campaign.title}
              aria-label={`${campaign.label}: ${campaign.title}. ${campaign.copy}`}
            >
              <img src={campaign.image} alt={`${campaign.title} RM special offer`} loading="eager" decoding="async" />
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
        <motion.h2 variants={reveal}>Your next manicure should feel different.</motion.h2>
        <motion.p variants={reveal}>
          Precise, clean, glossy, and designed to make the decision to book feel obvious.
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

function PageHero({ label, title, copy, image = fastImage("rm-hero-editorial") }) {
  return (
    <section className="page-hero">
      <img src={image} alt="" loading="eager" decoding="async" />
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
        title="Full RM service catalog."
        copy="Explore signature manicures, pedicures, add-ons, and repair services with clear timing and pricing."
        image={fastImage("ref-service-banner")}
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
            <img src={spotlight.image} alt={`${spotlight.name} service preview`} loading="eager" decoding="async" />
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
                <img src={service.image} alt="" loading="eager" decoding="async" />
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
                  <img src={service.image} alt="" loading="eager" decoding="async" />
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

function AboutPage({ navigate }) {
  return (
    <>
      <PageHero
        label="About RM"
        title="A Russian manicure studio built on restraint and precision."
        copy="RM Nail Salon is for clients who want a manicure that feels elevated, clean, and reliable before they even walk in."
        image={fastImage("brand-city-skyline-tight")}
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
        title="A portfolio wall for the RM finish."
        copy="Natural hands, cyan salon light, glossy details, and luxury color restraint define the RM visual language."
        image={fastImage("gallery-aqua-french")}
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
          onClick={() => setSelectedGallery({ ...item, index })}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <img src={item.image} alt="" loading="eager" decoding="async" />
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item.title}</strong>
          <em>{item.caption}</em>
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
            <img src={item.image} alt={`${item.title} manicure preview`} decoding="async" />
            <button className="modal-close" onClick={onClose} aria-label="Close gallery preview">
              <X size={19} />
            </button>
            <div>
              <span>{String(item.index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
            </div>
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
        title="Questions clients ask before booking."
        copy="Clear answers for clients who care about precision, hygiene, timing, and long-lasting results."
        image={fastImage("gallery-blue-gray")}
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
        title="Ready for the final links."
        copy="Book your appointment, message the studio, or save the Midtown NYC details for your next visit."
        image={fastImage("rm-hero-editorial")}
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
      <nav>
        {routes.slice(1).map((item) => (
          <RouteLink key={item.to} to={item.to} navigate={navigate}>
            {item.label}
          </RouteLink>
        ))}
      </nav>
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
