import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronRight,
  Dumbbell,
  ExternalLink,
  Flower2,
  Grid2X2,
  HeartHandshake,
  Instagram,
  Leaf,
  LockKeyhole,
  MapPin,
  Menu,
  MessageCircle,
  MoveUpRight,
  Phone,
  Play,
  ShieldCheck,
  Sparkles,
  Trees,
  UsersRound,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import interiorImage from "@/assets/armaan-interior.jpg";
import rooftopImage from "@/assets/armaan-rooftop.jpg";
import floorPlan2BhkUpdated from "@/assets/floorplan-2bhk-updated.jpg";
import floorPlan3BhkUpdated from "@/assets/floorplan-3bhk-updated.jpg";
import northViewUpdated from "@/assets/north-view-updated.jpg";
import northEastViewUpdated from "@/assets/north-east-view-updated.jpg";
import heroVideoUpdated from "@/assets/armaan-hero-video-updated.mp4";

const PHONE_NUMBER = "+91 91676 45523";
const PHONE_TEL = "tel:+919167645523";
const WHATSAPP_URL = "https://wa.me/919167645523";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARMAAN Santacruz West | Luxury 2 & 3 BHK Residences by Poonam Group" },
      {
        name: "description",
        content:
          "Discover ARMAAN in Santacruz West — boutique luxury residences featuring one apartment per floor, private balconies, sky garden lounge, 13 habitable floors, 11 ft slab height, and timeless terracotta architecture by Poonam Group.",
      },
      { name: "keywords", content: "Armaan Santacruz West, Luxury Residences Mumbai, Poonam Group, 2 BHK Santacruz West, 3 BHK Santacruz West, Real Estate Mumbai, Premium Apartments, One residence per floor, Vastu compliant homes, Mumbai luxury flats" },
      { property: "og:title", content: "ARMAAN Santacruz West | Luxury Residences by Poonam Group" },
      {
        property: "og:description",
        content: "A rare boutique address in the heart of Santacruz West offering luxurious 2 & 3 BHK residences, one per floor. Where dreams find their address."
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ARMAAN Santacruz West | Luxury Residences by Poonam Group" },
      {
        name: "twitter:description",
        content: "Discover ARMAAN in Santacruz West — boutique luxury residences featuring one apartment per floor and timeless terracotta architecture."
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          name: "ARMAAN by Poonam Group",
          description: "Boutique luxury 2 & 3 BHK residences in Santacruz West, Mumbai. Features one residence per floor, vastu compliant homes, column-free design, 11 ft slab height, and a sky garden lounge.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Saraswat Road, Off Linking Road",
            addressLocality: "Santacruz West",
            addressRegion: "Maharashtra",
            postalCode: "400054",
            addressCountry: "IN",
          },
          url: "https://www.poonamgroup.com",
          brand: { "@type": "Organization", name: "Poonam Group", foundingDate: "1960" },
          offers: {
            "@type": "Offer",
            businessFunction: "LeaseOut",
            itemOffered: {
              "@type": "Apartment",
              numberOfRooms: "2 or 3",
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "Sky Garden Lounge", value: true },
                { "@type": "LocationFeatureSpecification", name: "Fitness Centre", value: true },
                { "@type": "LocationFeatureSpecification", name: "One Residence Per Floor", value: true },
                { "@type": "LocationFeatureSpecification", name: "Vastu Compliant", value: true }
              ]
            }
          }
        }),
      },
    ],
  }),
  component: ArmaanPage,
});

const navItems = [
  ["Overview", "overview"],
  ["Architecture", "architecture"],
  ["Interiors", "interiors"],
  ["Residences", "residences"],
  ["Amenities", "amenities"],
  ["Sky Garden", "sky-garden"],
  ["Location", "location"],
  ["Gallery", "gallery"],
  ["Poonam Group", "legacy"],
  ["Contact", "contact"],
] as const;

const features = [
  ["Terracotta façade", "Warm, textural and unmistakably ARMAAN.", Building2],
  ["Handcrafted jali screens", "Light and shadow, composed with intent.", Grid2X2],
  ["Green balcony planters", "A quiet, breathing edge to every home.", Leaf],
  ["Natural light-filled interiors", "Spaces shaped by the rhythm of daylight.", Sparkles],
] as const;

const overviewStats = [
  ["13", "Habitable floors"],
  ["01", "Residence per floor"],
  ["2 & 3", "BHK residences"],
  ["11 ft", "Slab height"],
  ["∞", "Column-free planning"],
  ["24/7", "Quiet security"],
] as const;

const amenities = [
  ["Equipped fitness centre", Dumbbell],
  ["Sky garden lounge", Trees],
  ["Yoga & meditation zone", Flower2],
  ["Children's play area", UsersRound],
  ["Grand entrance lobby", Building2],
  ["CCTV security", ShieldCheck],
  ["High-speed elevators", Zap],
  ["Video door phone", LockKeyhole],
] as const;

const connections = [
  ["Santacruz Station", "05 min", "Rail"],
  ["Santacruz Metro", "05 min", "Metro"],
  ["Khar Station", "10 min", "Rail"],
  ["Airport", "15 min", "Air"],
  ["Linking Road", "03 min", "Life"],
] as const;

const galleryItems = [
  ["North East View", northEastViewUpdated, "ARMAAN North East exterior view — artist impression"],
  ["North View", northViewUpdated, "ARMAAN North exterior view — artist impression"],
  ["Living room", interiorImage, "An interior that breathes"],
  ["Rooftop garden", rooftopImage, "A sky-level pause"],
] as const;

function ArmaanPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePlan, setActivePlan] = useState<"2 BHK" | "3 BHK" | null>(null);
  const [activeGallery, setActiveGallery] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showAllConnections, setShowAllConnections] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activePlan || activeGallery !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePlan, activeGallery]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <header className={`site-nav ${scrolled ? "site-nav-scrolled" : ""}`}>
        <button className="brand-mark" onClick={() => scrollTo("top")} aria-label="ARMAAN home">
          <span className="brand-monogram">A</span>
          <span>
            <strong>ARMAAN</strong>
            <small>by Poonam Group</small>
          </span>
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)}>{label}</button>
          ))}
        </nav>
        <Button className="nav-cta hidden md:inline-flex" onClick={() => scrollTo("contact")}>
          Private preview <ArrowUpRight />
        </Button>
        <button className="menu-trigger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}<ArrowUpRight /></button>)}
          <Button onClick={() => scrollTo("contact")}>Book a private preview <ArrowUpRight /></Button>
        </div>
      )}

      <section id="top" className="hero-section">
        <video
          className="hero-image hero-project-image"
          src={heroVideoUpdated}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="hero-wash" />
        <div className="hero-content page-shell">
          <p className="eyebrow light-eyebrow"><span /> Santacruz West · Mumbai</p>
          <h1>Where dreams<br /><em>find their address.</em></h1>
          <p className="hero-subtitle">Bigger space. Better living.<br />Your world, beautifully considered.</p>
          <div className="hero-actions">
            <Button variant="secondary" onClick={() => scrollTo("contact")}>Book private preview <ArrowUpRight /></Button>
            <a className="hero-call" href={PHONE_TEL}><Phone /><span>Call now<br /><strong>{PHONE_NUMBER}</strong></span></a>
            <button className="text-action" onClick={() => scrollTo("residences")}>Explore ARMAAN <ArrowDownRight /></button>
          </div>
        </div>
        <div className="hero-meta"><span>01 / 05</span><span className="hero-line" /><span>A new address is taking shape</span></div>
        <button className="scroll-cue" onClick={() => scrollTo("overview")}><span>Scroll to discover</span><ArrowDownRight /></button>
      </section>

      <section id="overview" className="intro-section page-shell section-pad">
        <div className="section-kicker"><span>01</span><span className="kicker-line" /><span>The ARMAAN story</span></div>
        <div className="intro-grid">
          <div>
            <p className="eyebrow">A considered way of living</p>
            <h2>More than a home.<br /><em>A point of view.</em></h2>
          </div>
          <div className="intro-copy">
            <p>In the heart of Santacruz West, a rare kind of address is taking shape. ARMAAN is an intimate collection of residences where architecture, light and life come together with quiet confidence.</p>
            <p className="muted-copy">One residence per floor. Generous proportions. A timeless terracotta identity that feels at home in Mumbai, and entirely your own.</p>
            <button className="underlined-action" onClick={() => scrollTo("residences")}>Discover the residences <ArrowUpRight /></button>
          </div>
        </div>
        <div className="stat-strip">
          {overviewStats.map(([value, label]) => <div className="stat-item" key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </section>

      <section id="architecture" className="story-section section-pad clay-texture">
        <div className="page-shell story-grid">
          <div className="story-image-wrap story-project-image reveal-up"><img src={northViewUpdated} alt="ARMAAN boutique residence, North view — artist impression" width={410} height={744} loading="lazy" /><span className="image-caption">01 — The official North View · Artist impression</span></div>
          <div className="story-copy">
            <div className="section-kicker"><span>02</span><span className="kicker-line" /><span>Architecture story</span></div>
            <p className="eyebrow">Where form meets flow</p>
            <h2>Rooted in place.<br /><em>Made for now.</em></h2>
            <p>A harmonious blend of contemporary architecture and Mumbai's vernacular charm. Soft curves meet honest materials; shaded balconies open to the city; and every home is framed by the shifting light of the day.</p>
            <div className="feature-list">{features.map(([title, copy, Icon]) => <div className="feature-row" key={title}><Icon /><div><strong>{title}</strong><span>{copy}</span></div></div>)}</div>
          </div>
        </div>
      </section>

      <section id="interiors" className="experience-section section-pad page-shell">
        <div className="editorial-heading"><div><p className="eyebrow">The interior experience</p><h2>Designed to welcome.<br /><em>Built to inspire.</em></h2></div><p>Indulge in spaces that breathe opulence. Natural textures, considered details and a sense of calm in every room.</p></div>
        <div className="experience-frame"><img src={interiorImage} alt="ARMAAN living room interior" width={1600} height={1100} loading="lazy" /><div className="frame-overlay"><span>Designed for shared moments</span><span>02 / 04</span></div></div>
      </section>

      <section id="residences" className="residences-section section-pad">
        <div className="page-shell">
          <div className="section-kicker light-kicker"><span>03</span><span className="kicker-line" /><span>Find your ARMAAN</span></div>
          <div className="residences-heading"><div><p className="eyebrow light-eyebrow">Rarely available, deeply personal</p><h2>Choose your<br /><em>point of view.</em></h2></div><p>Two generous formats, each with the freedom to make the everyday feel exceptional.</p></div>
          <div className="residence-grid">
            <ResidenceCard type="2 BHK" area="787" details={["2 bedrooms", "2 bathrooms", "Kitchen", "Staff toilet", "Spacious living & dining"]} onPlan={() => setActivePlan("2 BHK")} />
            <ResidenceCard type="3 BHK" area="1274" details={["3 bedrooms", "3 bathrooms", "Balcony", "Powder toilet", "Dry balcony", "Staff toilet"]} onPlan={() => setActivePlan("3 BHK")} featured />
          </div>
          <div className="floorplan-strip">
            {([["2 BHK", floorPlan2BhkUpdated, "1st & 7th floor · 787.18 sq. ft. RERA area"], ["3 BHK", floorPlan3BhkUpdated, "8th to 13th floor · 1274.60 sq. ft. RERA area"]] as const).map(([type, src, meta]) => (
              <div className="floorplan-tile" key={type}>
                <img src={src} alt={`ARMAAN ${type} typical floor plan`} loading="lazy" />
                <span className="floorplan-tile-label"><strong>{type} floor plan</strong><small>{meta}</small></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="amenities" className="amenities-section section-pad page-shell">
        <div className="section-kicker"><span>04</span><span className="kicker-line" /><span>The ARMAAN amenity</span></div>
        <div className="amenities-heading"><div><p className="eyebrow">A life well balanced</p><h2>Shape your day<br /><em>with wellness & style.</em></h2></div><p>Thoughtfully designed spaces to move, meet, pause and play — all without leaving the comfort of home.</p></div>
        <div className="amenity-grid">{amenities.map(([label, Icon]) => <div className="amenity-item" key={label}><Icon /><span>{label}</span><ArrowUpRight /></div>)}</div>
      </section>

      <section id="sky-garden" className="sky-section">
        <img src={rooftopImage} alt="Night view of the ARMAAN residence and landscaped rooftop" width={1920} height={1200} loading="lazy" /><div className="sky-overlay" />
        <div className="page-shell sky-content"><p className="eyebrow light-eyebrow"><span /> The sky garden</p><h2>A place to meditate,<br /><em>mingle & make memories.</em></h2><button className="outline-action" onClick={() => scrollTo("contact")}>Schedule a rooftop visit <ArrowUpRight /></button></div>
        <div className="leaf-mark leaf-one"><Leaf /></div><div className="leaf-mark leaf-two"><Leaf /></div>
      </section>

      <section id="location" className="location-section section-pad page-shell">
        <div className="section-kicker"><span>05</span><span className="kicker-line" /><span>The neighbourhood</span></div>
        <div className="location-grid"><div><p className="eyebrow">In the middle of everything</p><h2>Life, well<br /><em>connected.</em></h2><div className="address"><MapPin /><span>Saraswat Road,<br />Off Linking Road,<br />Santacruz West,<br />Mumbai — 400054</span></div><a className="underlined-action" href="https://maps.google.com/?q=Saraswat+Road+Santacruz+West+Mumbai" target="_blank" rel="noreferrer">Open in Google Maps <ExternalLink /></a></div>
          <div className="map-panel"><div className="map-grid" /><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-pin"><span>ARMAAN</span><MapPin /></div><div className="map-label label-one">Linking Road</div><div className="map-label label-two">Santacruz West</div><span className="map-scale">Mumbai / 19.0842° N</span></div></div>
        <div className="connection-list">{connections.slice(0, showAllConnections ? connections.length : 3).map(([name, time, type]) => <div key={name} className="connection-row"><span>{type}</span><strong>{name}</strong><em>{time}</em><ArrowUpRight /></div>)}</div><button className="underlined-action connection-toggle" onClick={() => setShowAllConnections(!showAllConnections)}>{showAllConnections ? "Show less" : "View more nearby"}<ChevronRight /></button>
      </section>

      <section id="gallery" className="gallery-section section-pad clay-texture"><div className="page-shell"><div className="editorial-heading"><div><p className="eyebrow">The visual language</p><h2>See the feeling<br /><em>for yourself.</em></h2></div><p>A glimpse into a world of warm light, tactile materiality and quiet moments.</p></div><div className="gallery-grid">{galleryItems.map(([category, image, alt], index) => <button className={`gallery-tile gallery-tile-${index + 1}`} key={`${category}-${index}`} onClick={() => setActiveGallery(index)}><img src={image} alt={alt} loading="lazy" width={1600} height={1100} /><span>{category}<ArrowUpRight /></span></button>)}</div></div></section>

      <section id="legacy" className="legacy-section section-pad page-shell"><div className="legacy-grid"><div><div className="section-kicker"><span>06</span><span className="kicker-line" /><span>The people behind ARMAAN</span></div><p className="eyebrow">Building legacies across Mumbai since 1960</p><h2>Three generations.<br /><em>One promise.</em></h2></div><div className="legacy-copy"><p>For over six decades, Poonam Group has created places where people can put down roots and build a life. ARMAAN brings that experience to a more intimate, considered scale.</p><div className="legacy-numbers"><span><strong>1960</strong><small>Established</small></span><span><strong>15M+</strong><small>Sq. ft. delivered</small></span><span><strong>03</strong><small>Generations</small></span></div><button className="underlined-action">Meet Poonam Group <ArrowUpRight /></button></div></div></section>

      <section id="contact" className="contact-section">
        <img className="contact-project-image" src={northViewUpdated} alt="ARMAAN boutique residence, North view — artist impression" width={410} height={744} loading="lazy" />
        <div className="contact-overlay" />
        <div className="page-shell contact-inner">
          <div className="contact-heading">
            <p className="eyebrow light-eyebrow">A private invitation</p>
            <h2>Own your<br /><em>landmark address.</em></h2>
            <p>Tell us how you'd like to experience ARMAAN. Our team will be in touch shortly.</p>
            <a className="call-cta" href={PHONE_TEL}><Phone /><span>Call us directly<br /><strong>{PHONE_NUMBER}</strong></span><ArrowUpRight /></a>
          </div>
          <form className="enquiry-form" onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const data = Object.fromEntries(formData.entries()) as Record<string, string>;
            const subject = `Enquiry from ${data['name'] || 'Website'}`;
            
            fetch("https://formsubmit.co/ajax/Armaanbypoonam@gmail.com", {
              method: "POST",
              headers: { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: JSON.stringify({
                  _subject: subject,
                  name: data['name'],
                  phone: "+91 " + data['phone'],
                  email: data['email'],
                  residence: data['residence'] || 'N/A',
                  message: data['message']
              })
            }).catch(error => console.error(error));

            setSubmitted(true);
          }}>
            <label>Name<input name="name" required placeholder="Your full name" /></label>
            <label>Phone
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ paddingRight: '8px', color: 'inherit' }}>+91</span>
                <input name="phone" required type="tel" pattern="[0-9]{10}" maxLength={10} placeholder="0000000000" title="Please enter exactly 10 digits" style={{ flex: 1 }} />
              </div>
            </label>
            <label>Email<input name="email" type="email" required pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$" placeholder="you@email.com" title="Please enter a valid email address" /></label>
            <label>Residence
              <select name="residence" defaultValue="">
                <option value="" disabled>Select a residence</option>
                <option>2 BHK · 787 sq. ft.</option>
                <option>3 BHK · 1274 sq. ft.</option>
              </select>
            </label>
            <label className="full-field">Message<textarea name="message" placeholder="Tell us what you're looking for" rows={3} /></label>
            <Button className="submit-button" type="submit">{submitted ? <><Check /> Thank you — we'll be in touch</> : <>Book an exclusive site visit <ArrowUpRight /></>}</Button>
          </form>
        </div>
      </section>

      <footer className="footer-section"><div className="page-shell footer-grid"><div className="footer-brand"><span className="brand-monogram">A</span><div><strong>ARMAAN</strong><small>by Poonam Group</small></div><p>A rare address in<br />Santacruz West, Mumbai.</p></div><div className="footer-contact"><p className="eyebrow">Enquiries</p><a href={PHONE_TEL}>{PHONE_NUMBER} <Phone /></a><a href="mailto:Armaanbypoonam@gmail.com">Armaanbypoonam@gmail.com <ArrowUpRight /></a></div><div className="footer-links"><p className="eyebrow">Follow the story</p><a href="#gallery">Instagram <Instagram /></a><a href="#top">Back to top <ArrowUpRight /></a></div></div><div className="page-shell footer-bottom"><span>© 2025 Poonam Group. All rights reserved.</span><span>MahaRERA Reg. No. PR1180002501408</span><span>Terms & privacy</span></div></footer>

      <a className="whatsapp-float" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><HeartHandshake /></a>
      <div className="mobile-action-bar"><a href={PHONE_TEL}><Phone /><span>Call</span></a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><HeartHandshake /><span>WhatsApp</span></a><button onClick={() => scrollTo("contact")}><Sparkles /><span>Book visit</span></button></div>

      {activePlan && <FloorPlanModal type={activePlan} onClose={() => setActivePlan(null)} />}
      {activeGallery !== null && galleryItems[activeGallery] && <GalleryModal item={galleryItems[activeGallery]} onClose={() => setActiveGallery(null)} onNext={() => setActiveGallery((activeGallery + 1) % galleryItems.length)} />}
    </main>
  );
}

function ResidenceCard({ type, area, details, onPlan, featured = false }: { type: string; area: string; details: string[]; onPlan: () => void; featured?: boolean }) {
  return (
    <article className={`residence-card ${featured ? "residence-card-featured" : ""}`}>
      <div className="residence-top"><span>Residence {featured ? "02" : "01"}</span><span className="residence-dot" /></div>
      <h3>{type}</h3>
      <div className="area"><strong>{area}</strong><span>sq. ft.<br />carpet area</span></div>
      <ul>{details.map(detail => <li key={detail}><Check />{detail}</li>)}</ul>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant={featured ? "secondary" : "outline"} onClick={onPlan}>View floor plan <ArrowUpRight /></Button>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label={`Chat on WhatsApp about ${type}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: featured ? 'var(--charcoal)' : 'var(--primary)', color: 'var(--secondary)', border: `1px solid ${featured ? 'var(--secondary)' : 'var(--border)'}`, transition: 'all 0.3s' }}>
          <MessageCircle style={{ width: '1.2rem', height: '1.2rem' }} />
        </a>
      </div>
    </article>
  );
}

function FloorPlanModal({ type, onClose }: { type: "2 BHK" | "3 BHK"; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const plan = type === "2 BHK" ? floorPlan2BhkUpdated : floorPlan3BhkUpdated;
  const subtitle = type === "2 BHK" ? "1st & 7th floor · RERA area 787.18 sq. ft." : "8th to 13th floor · RERA area 1274.60 sq. ft.";

  if (!submitted) {
    return (
      <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`Enquiry for ${type}`} onClick={onClose}>
        <div className="plan-modal" style={{ background: 'var(--charcoal)', color: 'var(--secondary)', maxWidth: '600px' }} onClick={event => event.stopPropagation()}>
           <button className="close-modal" style={{ color: 'var(--secondary)' }} onClick={onClose} aria-label="Close modal"><X /></button>
           <div className="contact-heading" style={{ marginBottom: '2rem' }}>
             <p className="eyebrow light-eyebrow" style={{ color: 'color-mix(in oklab, var(--secondary) 72%, transparent)' }}>Unlock floor plan</p>
             <h2>View<br /><em>{type} plan.</em></h2>
             <p style={{ color: 'color-mix(in oklab, var(--secondary) 72%, transparent)', marginTop: '1rem', fontSize: '0.9rem', lineHeight: '1.7' }}>Please enter your details to view the floor plan.</p>
           </div>
           <form className="enquiry-form" onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const data = Object.fromEntries(formData.entries()) as Record<string, string>;
              const subject = `Floor Plan Enquiry from ${data['name'] || 'Website'}`;
              
              fetch("https://formsubmit.co/ajax/Armaanbypoonam@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: subject,
                    name: data['name'],
                    phone: "+91 " + data['phone'],
                    email: data['email'],
                    residence: data['residence'] || 'N/A',
                    message: data['message']
                })
              }).catch(error => console.error(error));

              setSubmitted(true);
           }}>
              <label>Name<input name="name" required placeholder="Your full name" /></label>
              <label>Phone
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ paddingRight: '8px', color: 'inherit' }}>+91</span>
                  <input name="phone" required type="tel" pattern="[0-9]{10}" maxLength={10} placeholder="0000000000" title="Please enter exactly 10 digits" style={{ flex: 1 }} />
                </div>
              </label>
              <label>Email<input name="email" type="email" required pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$" placeholder="you@email.com" title="Please enter a valid email address" /></label>
              <label>Residence
                <select name="residence" defaultValue={type === "2 BHK" ? "2 BHK · 787 sq. ft." : "3 BHK · 1274 sq. ft."}>
                  <option value="" disabled>Select a residence</option>
                  <option>2 BHK · 787 sq. ft.</option>
                  <option>3 BHK · 1274 sq. ft.</option>
                </select>
              </label>
              <label className="full-field">Message<textarea name="message" placeholder="Tell us what you're looking for" rows={3} /></label>
              <Button className="submit-button" type="submit">View Full Plan <ArrowUpRight /></Button>
           </form>
        </div>
      </div>
    );
  }

  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${type} floor plan`} onClick={onClose}><div className="plan-modal plan-modal-image" onClick={event => event.stopPropagation()}><button className="close-modal" onClick={onClose} aria-label="Close floor plan"><X /></button><p className="eyebrow">Residence {type} · Typical floor plan</p><h2>{type} <em>floor plan.</em></h2><div className="plan-image-wrap"><img src={plan} alt={`ARMAAN ${type} typical floor plan with room dimensions and areas`} /></div><div className="plan-footer"><span>{subtitle} · Plan is indicative and subject to change</span><a className="underlined-action" href={PHONE_TEL}>Call to discuss this plan <Phone /></a></div></div></div>;
}

function GalleryModal({ item, onClose, onNext }: { item: readonly [string, string, string]; onClose: () => void; onNext: () => void }) {
  return <div className="modal-backdrop gallery-backdrop" role="dialog" aria-modal="true" aria-label={item[2]} onClick={onClose}><div className="gallery-modal" onClick={event => event.stopPropagation()}><img src={item[1]} alt={item[2]} /><div className="gallery-modal-footer"><span>{item[0]} · {item[2]}</span><div><button onClick={onNext} aria-label="Next gallery image"><ChevronRight /></button><button onClick={onClose} aria-label="Close gallery"><X /></button></div></div></div></div>;
}