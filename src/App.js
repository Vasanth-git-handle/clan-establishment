import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Services", "Team", "Why Us", "Locations", "Contact"];

const SERVICES = [
  { icon: "🏗️", title: "Construction", desc: "End-to-end construction services with premium materials and expert craftsmanship." },
  { icon: "📋", title: "Consulting Services", desc: "Strategic construction consulting for optimal project planning and execution." },
  { icon: "🛋️", title: "Interior Designing", desc: "Elegant interior solutions that blend aesthetics with functional living spaces." },
  { icon: "💧", title: "Water Proofing", desc: "Advanced waterproofing treatments protecting structures from moisture damage." },
  { icon: "🔨", title: "Building Repair Works", desc: "Comprehensive structural repair and renovation for aging buildings." },
  { icon: "📐", title: "Land Survey & Marking", desc: "Precise land surveying and boundary marking for accurate project layouts." },
  { icon: "📊", title: "Structural Drawing", desc: "Detailed structural drawings meeting all engineering standards and codes." },
  { icon: "🏛️", title: "Elevation Drawing (2D & 3D)", desc: "Photorealistic 2D and 3D elevation designs for visualizing your vision." },
  { icon: "📜", title: "Municipal / DTCP / CMDA Approvals", desc: "Complete approval documentation for Municipal, DTCP, and CMDA requirements." },
  { icon: "🧮", title: "Estimation", desc: "Accurate cost estimation ensuring budget transparency throughout your project." },
  { icon: "💼", title: "Valuation", desc: "Professional property valuation services for informed investment decisions." },
];

const TEAM = [
  { name: "K. Venkat Sridhar", role: "Structural Engineer", initials: "KV", color: "#B8860B" },
  { name: "N.K. Sabarishbabu", role: "Structural Engineer", sub: "B.E., M.Tech", initials: "NS", color: "#8B6914" },
  { name: "Santhosh Tamilarasu", role: "Structural Engineer", initials: "ST", color: "#DAA520" },
];

const WHY_US = [
  { icon: "⚙️", title: "Expert Engineers", desc: "Certified structural engineers with deep domain expertise." },
  { icon: "📅", title: "5+ Years Experience", desc: "Proven track record across residential and commercial projects." },
  { icon: "🏆", title: "Quality Construction", desc: "Premium materials and stringent quality control at every stage." },
  { icon: "⏱️", title: "On-Time Delivery", desc: "Disciplined project timelines with no compromise on milestones." },
  { icon: "🤝", title: "Trusted Consultation", desc: "Honest, transparent advice that puts your interests first." },
  { icon: "⭐", title: "Customer Satisfaction", desc: "Long-term relationships built on trust, care, and results." },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimSection({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>{children}</div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = () => {
    const { name, phone, message } = formData;
    if (!name.trim() && !message.trim()) return;
    const text = `Hi, I'm ${name || "a visitor"} from the Clan Establishment website.${phone ? `\nPhone: ${phone}` : ""}\n\n${message || "I'd like to get in touch."}`;
    const waUrl = `https://wa.me/916382692427?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  const goldGrad = "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)";
  const darkGold = "#B8860B";
  const gold = "#D4A017";
  const lightGold = "#FFD700";

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", background: "#0A0A0A", color: "#F5F0E8", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: ${darkGold}; border-radius: 3px; }
        .sans { font-family: 'Montserrat', sans-serif; }
        .gold-text { background: ${goldGrad}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .service-card { transition: transform 0.4s ease, border-color 0.4s ease; }
        .service-card:hover { transform: translateY(-8px); border-color: ${gold} !important; }
        .service-card:hover .card-icon { transform: scale(1.2); }
        .team-card { transition: transform 0.4s ease, border-color 0.4s ease; }
        .team-card:hover { transform: translateY(-6px); border-color: ${gold} !important; }
        .why-card { transition: background 0.3s ease, border-color 0.3s ease; }
        .why-card:hover { background: rgba(180,134,11,0.08) !important; border-color: ${gold} !important; }
        .nav-link:hover { color: ${lightGold} !important; }
        .cta-primary:hover { background: ${goldGrad}; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(180,134,11,0.4); }
        .cta-secondary:hover { background: rgba(180,134,11,0.1); border-color: ${lightGold} !important; color: ${lightGold} !important; transform: translateY(-2px); }
        .social-icon:hover { color: ${lightGold} !important; transform: translateY(-3px); }
        .hamburger-line { display: block; width: 22px; height: 2px; background: #F5F0E8; transition: all 0.3s ease; border-radius: 2px; }
        @keyframes shimmer { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse-ring { 0%{transform:scale(0.8);opacity:1} 100%{transform:scale(2);opacity:0} }
        @keyframes slideDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
        .hero-badge { animation: float 4s ease-in-out infinite; }
        .pulse::before { content:''; position:absolute; inset:0; border-radius:50%; border:2px solid ${gold}; animation: pulse-ring 2s ease-out infinite; }
        .mobile-menu { animation: slideDown 0.25s ease; }
        input, textarea { outline: none; font-family: 'Montserrat', sans-serif; }
        input:focus, textarea:focus { border-color: ${gold} !important; box-shadow: 0 0 0 2px rgba(180,134,11,0.2) !important; }

        /* ── Responsive grid helpers ── */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
        .locations-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
        .roles-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .hero-stats { display: flex; flex-direction: column; gap: 24px; align-items: center; position: absolute; right: 5%; bottom: 10%; }
        .hero-content { max-width: 720px; }
        .section-pad { padding: 120px 5%; }

        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 48px; }
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
        }

        @media (max-width: 767px) {
          .section-pad { padding: 72px 5%; }
          .locations-grid { grid-template-columns: 1fr; gap: 20px; }
          .roles-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
          .footer-grid { grid-template-columns: 1fr; gap: 28px; }
          .hero-stats { position: static; flex-direction: row; justify-content: center; gap: 32px; margin-top: 40px; }
          .hero-content { max-width: 100%; }
          .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
        }

        @media (max-width: 480px) {
          .roles-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || menuOpen ? "rgba(10,10,10,0.97)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        borderBottom: scrolled || menuOpen ? `1px solid rgba(180,134,11,0.2)` : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <div onClick={() => scrollTo("hero")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, background: goldGrad, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#0A0A0A", flexShrink: 0 }}>CE</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#F5F0E8", fontFamily: "Montserrat, sans-serif", lineHeight: 1 }}>CLAN</div>
              <div style={{ fontSize: 8, letterSpacing: 2.5, color: gold, fontFamily: "Montserrat, sans-serif", lineHeight: 1 }}>ESTABLISHMENT</div>
            </div>
          </div>

          {/* Desktop links */}
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <div style={{ display: "none" }} className="desktop-nav">
              {NAV_LINKS.map(l => (
                <button key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase().replace(/\s/g, "-"))}
                  style={{ background: "none", border: "none", color: "#C8C0B0", cursor: "pointer", fontSize: 11, letterSpacing: 1.5, fontFamily: "Montserrat, sans-serif", transition: "color 0.3s" }}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Desktop CTA — hidden on mobile */}
            <button onClick={() => scrollTo("contact")} className="cta-primary"
              style={{ background: goldGrad, border: "none", borderRadius: 2, padding: "8px 18px", color: "#0A0A0A", fontFamily: "Montserrat, sans-serif", fontSize: 10, letterSpacing: 1.5, fontWeight: 700, cursor: "pointer", transition: "all 0.3s", display: "none" }}
              id="desktop-cta">
              CONSULT
            </button>

            {/* Hamburger — mobile only */}
            <button onClick={() => setMenuOpen(o => !o)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: 5, alignItems: "center", justifyContent: "center" }}
              id="hamburger-btn" aria-label="Toggle menu">
              <span className="hamburger-line" style={menuOpen ? { transform: "rotate(45deg) translate(5px, 5px)" } : {}} />
              <span className="hamburger-line" style={menuOpen ? { opacity: 0 } : {}} />
              <span className="hamburger-line" style={menuOpen ? { transform: "rotate(-45deg) translate(5px, -5px)" } : {}} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="mobile-menu" style={{
            background: "rgba(10,10,10,0.98)", borderTop: `1px solid rgba(180,134,11,0.15)`,
            padding: "16px 5% 24px",
          }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase().replace(/\s/g, "-"))}
                style={{ display: "block", width: "100%", background: "none", border: "none", color: "#C8C0B0", cursor: "pointer", fontSize: 12, letterSpacing: 2, fontFamily: "Montserrat, sans-serif", padding: "13px 0", textAlign: "left", borderBottom: "1px solid rgba(180,134,11,0.07)", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = lightGold} onMouseLeave={e => e.target.style.color = "#C8C0B0"}>
                {l.toUpperCase()}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} className="cta-primary"
              style={{ background: goldGrad, border: "none", borderRadius: 2, padding: "12px", color: "#0A0A0A", fontFamily: "Montserrat, sans-serif", fontSize: 11, letterSpacing: 2, fontWeight: 700, cursor: "pointer", width: "100%", marginTop: 16, transition: "all 0.3s" }}>
              GET FREE CONSULTATION
            </button>
          </div>
        )}

        {/* Inject responsive desktop styles */}
        <style>{`
          @media (min-width: 768px) {
            #hamburger-btn { display: none !important; }
            #desktop-cta { display: block !important; }
            .desktop-nav { display: flex !important; gap: 28px; align-items: center; }
          }
        `}</style>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 64 }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, background: `url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=80') center/cover no-repeat` }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,10,10,0.93) 0%, rgba(10,10,10,0.78) 50%, rgba(10,10,10,0.90) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", top: "20%", right: "8%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, rgba(180,134,11,0.12) 0%, transparent 70%)`, zIndex: 1, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 5%", position: "relative", zIndex: 2, width: "100%" }}>
          <div className="hero-content">
            <div className="sans hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(180,134,11,0.12)", border: `1px solid rgba(180,134,11,0.3)`, borderRadius: 2, padding: "6px 14px", marginBottom: 28 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: gold, flexShrink: 0 }} />
              <span style={{ fontSize: 9, letterSpacing: 2, color: gold, fontFamily: "Montserrat, sans-serif" }}>ENGINEERING · PROCUREMENT · CONSTRUCTION</span>
            </div>

            <h1 style={{ fontSize: "clamp(42px, 8vw, 90px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginBottom: 8 }}>
              <span style={{ display: "block", color: "#F5F0E8" }}>CLAN</span>
              <span className="gold-text" style={{ display: "block" }}>ESTABLISHMENT</span>
            </h1>

            <div style={{ width: 70, height: 2, background: goldGrad, margin: "18px 0" }} />

            <p style={{ fontSize: "clamp(18px, 3vw, 34px)", fontStyle: "italic", color: "#C8C0B0", fontWeight: 300, marginBottom: 10, letterSpacing: 0.5 }}>
              "Establish Together..."
            </p>
            <p className="sans" style={{ fontSize: 11, color: "#8A8070", letterSpacing: 2, marginBottom: 36, textTransform: "uppercase" }}>
              Engineering · Procurement · Construction
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("contact")} className="cta-primary"
                style={{ background: goldGrad, border: "none", borderRadius: 2, padding: "14px 28px", color: "#0A0A0A", fontFamily: "Montserrat, sans-serif", fontSize: 11, letterSpacing: 1.5, fontWeight: 700, cursor: "pointer", transition: "all 0.3s" }}>
                GET FREE CONSULTATION
              </button>
              <button onClick={() => scrollTo("services")} className="cta-secondary"
                style={{ background: "transparent", border: `1px solid rgba(212,160,23,0.5)`, borderRadius: 2, padding: "14px 28px", color: "#C8C0B0", fontFamily: "Montserrat, sans-serif", fontSize: 11, letterSpacing: 1.5, fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}>
                OUR SERVICES
              </button>
            </div>
          </div>

          {/* Stats — row on mobile, column on desktop */}
          <div className="hero-stats">
            {[["40+", "Projects"], ["3", "Engineers"], ["2023", "Founded"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div className="gold-text" style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 700 }}>{n}</div>
                <div className="sans" style={{ fontSize: 9, letterSpacing: 2, color: "#6A6050" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 2 }}>
          <div className="sans" style={{ fontSize: 8, letterSpacing: 3, color: "#5A5040" }}>SCROLL</div>
          <div style={{ width: 1, height: 40, background: `linear-gradient(${gold}, transparent)` }} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section-pad" style={{ background: "#0D0D0D", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="about-grid">
            <AnimSection>
              <div className="sans" style={{ fontSize: 10, letterSpacing: 4, color: gold, marginBottom: 14 }}>WHO WE ARE</div>
              <h2 style={{ fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
                Building Dreams,<br /><span className="gold-text">Delivering Excellence</span>
              </h2>
              <div style={{ width: 50, height: 2, background: goldGrad, marginBottom: 24 }} />
              <p className="sans" style={{ fontSize: 13, lineHeight: 1.9, color: "#9A9080", marginBottom: 32, fontWeight: 300 }}>
                Clan Establishment is a growing engineering, procurement, and construction company established in 2023, committed to delivering high-quality construction, structural engineering, and consulting services in Chennai and Kanchipuram. We focus on trust, quality, and timely project delivery.
              </p>
              <div className="roles-grid">
                {[["Developer", "🏗️"], ["Builder", "🏛️"], ["Consultant", "📋"], ["Investor", "💡"]].map(([r, ic]) => (
                  <div key={r} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", border: `1px solid rgba(180,134,11,0.2)`, borderRadius: 4 }}>
                    <span style={{ fontSize: 16 }}>{ic}</span>
                    <span className="sans" style={{ fontSize: 11, letterSpacing: 0.5, color: "#C8C0B0", fontWeight: 500 }}>{r}</span>
                  </div>
                ))}
              </div>
            </AnimSection>

            <AnimSection delay={150}>
              <div>
                <div style={{ background: "#141414", border: `1px solid rgba(180,134,11,0.15)`, borderRadius: 4, padding: "36px 32px", marginBottom: 16 }}>
                  <div style={{ fontSize: 60, fontWeight: 700, color: "#1A1A1A", lineHeight: 1 }}>2023</div>
                  <div className="sans" style={{ fontSize: 9, letterSpacing: 4, color: gold, marginTop: 8 }}>ESTABLISHED</div>
                  <div style={{ width: 36, height: 1, background: goldGrad, margin: "18px 0" }} />
                  <p className="sans" style={{ fontSize: 12, color: "#7A7060", lineHeight: 1.8, fontWeight: 300 }}>
                    A young, ambitious firm committed to transforming the construction landscape in Tamil Nadu with engineering excellence and innovative solutions.
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[["Chennai", "Primary Market"], ["Kanchipuram", "Headquarters"]].map(([city, sub]) => (
                    <div key={city} style={{ background: "#111", border: `1px solid rgba(180,134,11,0.15)`, borderRadius: 4, padding: "18px 14px" }}>
                      <div style={{ fontSize: 20 }}>📍</div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#F5F0E8", marginTop: 8 }}>{city}</div>
                      <div className="sans" style={{ fontSize: 9, color: "#6A6050", letterSpacing: 1 }}>{sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section-pad" style={{ background: "#080808", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="sans" style={{ fontSize: 10, letterSpacing: 4, color: gold, marginBottom: 14 }}>WHAT WE OFFER</div>
              <h2 style={{ fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 700 }}>
                Our <span className="gold-text">Services</span>
              </h2>
              <div style={{ width: 50, height: 2, background: goldGrad, margin: "18px auto 0" }} />
            </div>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: 16 }}>
            {SERVICES.map((s, i) => (
              <AnimSection key={s.title} delay={Math.min(i * 50, 300)}>
                <div className="service-card" style={{
                  background: "#0F0F0F", border: `1px solid rgba(180,134,11,0.12)`, borderRadius: 4,
                  padding: "28px 24px", height: "100%",
                }}>
                  <div className="card-icon" style={{ fontSize: 32, marginBottom: 16, transition: "transform 0.3s" }}>{s.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "#F5F0E8" }}>{s.title}</h3>
                  <div style={{ width: 28, height: 1, background: goldGrad, marginBottom: 12 }} />
                  <p className="sans" style={{ fontSize: 12, color: "#6A6050", lineHeight: 1.8, fontWeight: 300 }}>{s.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="section-pad" style={{ background: "#0D0D0D", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="sans" style={{ fontSize: 10, letterSpacing: 4, color: gold, marginBottom: 14 }}>THE EXPERTS</div>
              <h2 style={{ fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 700 }}>
                Meet Our <span className="gold-text">Team</span>
              </h2>
              <div style={{ width: 50, height: 2, background: goldGrad, margin: "18px auto 0" }} />
            </div>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 20 }}>
            {TEAM.map((m, i) => (
              <AnimSection key={m.name} delay={i * 100}>
                <div className="team-card" style={{
                  background: "#0F0F0F", border: `1px solid rgba(180,134,11,0.12)`, borderRadius: 4,
                  padding: "36px 28px", textAlign: "center",
                }}>
                  <div style={{ position: "relative", display: "inline-block", marginBottom: 20 }}>
                    <div className="pulse" style={{ position: "relative", width: 84, height: 84, borderRadius: "50%", background: `linear-gradient(135deg, rgba(180,134,11,0.2), rgba(180,134,11,0.05))`, border: `2px solid ${m.color}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                      <span style={{ fontSize: 26, fontWeight: 700, color: m.color }}>{m.initials}</span>
                    </div>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: "#F5F0E8", marginBottom: 4 }}>{m.name}</h3>
                  {m.sub && <div className="sans" style={{ fontSize: 10, color: gold, letterSpacing: 1, marginBottom: 6 }}>{m.sub}</div>}
                  <div style={{ width: 28, height: 1, background: goldGrad, margin: "10px auto" }} />
                  <div className="sans" style={{ fontSize: 10, letterSpacing: 2, color: "#8A8070" }}>{m.role.toUpperCase()}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="why-us" className="section-pad" style={{ background: "#080808", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="sans" style={{ fontSize: 10, letterSpacing: 4, color: gold, marginBottom: 14 }}>OUR STRENGTHS</div>
              <h2 style={{ fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 700 }}>
                Why Choose <span className="gold-text">Us</span>
              </h2>
              <div style={{ width: 50, height: 2, background: goldGrad, margin: "18px auto 0" }} />
            </div>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: 16 }}>
            {WHY_US.map((w, i) => (
              <AnimSection key={w.title} delay={Math.min(i * 70, 280)}>
                <div className="why-card" style={{
                  background: "#0F0F0F", border: `1px solid rgba(180,134,11,0.12)`, borderRadius: 4,
                  padding: "24px 20px", display: "flex", gap: 16, alignItems: "flex-start",
                }}>
                  <div style={{ fontSize: 28, flexShrink: 0 }}>{w.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#F5F0E8", marginBottom: 6 }}>{w.title}</h3>
                    <p className="sans" style={{ fontSize: 12, color: "#6A6050", lineHeight: 1.7, fontWeight: 300 }}>{w.desc}</p>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ── */}
      <section id="locations" className="section-pad" style={{ background: "#0D0D0D", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="sans" style={{ fontSize: 10, letterSpacing: 4, color: gold, marginBottom: 14 }}>WHERE WE OPERATE</div>
              <h2 style={{ fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 700 }}>
                Service <span className="gold-text">Locations</span>
              </h2>
              <div style={{ width: 50, height: 2, background: goldGrad, margin: "18px auto 0" }} />
            </div>
          </AnimSection>
          <AnimSection delay={150}>
            <div style={{ background: "#0F0F0F", border: `1px solid rgba(180,134,11,0.15)`, borderRadius: 4, padding: "clamp(28px, 5%, 60px)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, rgba(180,134,11,0.05) 0%, transparent 70%)`, pointerEvents: "none" }} />
              <div className="locations-grid" style={{ position: "relative", zIndex: 1 }}>
                {[
                  { city: "Chennai", desc: "Tamil Nadu's capital — our primary service hub covering residential, commercial, and industrial projects across the metropolitan area.", badge: "PRIMARY HUB" },
                  { city: "Kanchipuram", desc: "The ancient temple city — our home base and headquarters, serving the Kanchipuram district with all construction and engineering services.", badge: "HEADQUARTERS" },
                ].map(({ city, desc, badge }) => (
                  <div key={city} style={{ textAlign: "center", padding: "clamp(24px, 5%, 40px) clamp(16px, 4%, 32px)", background: "#111", border: `1px solid rgba(180,134,11,0.1)`, borderRadius: 4 }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>📍</div>
                    <div className="sans" style={{ fontSize: 9, letterSpacing: 2.5, color: gold, marginBottom: 10, background: "rgba(180,134,11,0.1)", display: "inline-block", padding: "4px 10px", borderRadius: 2 }}>{badge}</div>
                    <h3 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, marginBottom: 12 }}>{city}</h3>
                    <div style={{ width: 36, height: 1, background: goldGrad, margin: "0 auto 14px" }} />
                    <p className="sans" style={{ fontSize: 12, color: "#6A6050", lineHeight: 1.8, fontWeight: 300 }}>{desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: 32, position: "relative", zIndex: 1 }}>
                <p className="sans" style={{ fontSize: 12, color: "#5A5040", letterSpacing: 1 }}>Serving Tamil Nadu — Building the Future</p>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad" style={{ background: "#080808", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="sans" style={{ fontSize: 10, letterSpacing: 4, color: gold, marginBottom: 14 }}>REACH OUT</div>
              <h2 style={{ fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 700 }}>
                Get In <span className="gold-text">Touch</span>
              </h2>
              <div style={{ width: 50, height: 2, background: goldGrad, margin: "18px auto 0" }} />
            </div>
          </AnimSection>
          <div className="contact-grid">
            <AnimSection>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 24, color: "#F5F0E8" }}>Contact Information</h3>
                {[
                  { icon: "📍", label: "Address", val: "No. 251, Gandhi Road, Kanchipuram, Tamil Nadu – 631501" },
                  { icon: "📞", label: "Phone", val: "6382692427" },
                  { icon: "✉️", label: "Email", val: "clanestablishment23@gmail.com" },
                ].map(({ icon, label, val }) => (
                  <div key={label} style={{ display: "flex", gap: 14, marginBottom: 16, padding: "18px 16px", background: "#0F0F0F", border: `1px solid rgba(180,134,11,0.12)`, borderRadius: 4 }}>
                    <div style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{icon}</div>
                    <div>
                      <div className="sans" style={{ fontSize: 9, letterSpacing: 2, color: gold, marginBottom: 4 }}>{label.toUpperCase()}</div>
                      <div className="sans" style={{ fontSize: 12, color: "#C8C0B0", fontWeight: 300, lineHeight: 1.6, wordBreak: "break-word" }}>{val}</div>
                    </div>
                  </div>
                ))}
                <div style={{ background: "#0F0F0F", border: `1px solid rgba(180,134,11,0.12)`, borderRadius: 4, padding: 18, marginTop: 8 }}>
                  <div className="sans" style={{ fontSize: 9, letterSpacing: 2, color: gold, marginBottom: 10 }}>LOCATION MAP</div>
                  <div style={{ background: "#141414", borderRadius: 4, height: 140, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6, border: `1px solid rgba(180,134,11,0.08)` }}>
                    <div style={{ fontSize: 32 }}>🗺️</div>
                    <div className="sans" style={{ fontSize: 10, color: "#5A5040", letterSpacing: 1 }}>Gandhi Road, Kanchipuram</div>
                    <div className="sans" style={{ fontSize: 10, color: "#4A4030", letterSpacing: 1 }}>Tamil Nadu – 631501</div>
                  </div>
                </div>
              </div>
            </AnimSection>

            <AnimSection delay={150}>
              <div style={{ background: "#0F0F0F", border: `1px solid rgba(180,134,11,0.15)`, borderRadius: 4, padding: "clamp(28px, 5%, 44px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{ width: 28, height: 28, background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>💬</div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: "#F5F0E8" }}>Chat on WhatsApp</h3>
                </div>
                <p className="sans" style={{ fontSize: 12, color: "#5A5040", marginBottom: 28, fontWeight: 300 }}>Fill in your details — we'll open WhatsApp with your message pre-filled.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { placeholder: "Your Full Name", key: "name", type: "text" },
                    { placeholder: "Phone Number (optional)", key: "phone", type: "tel" },
                  ].map(({ placeholder, key, type }) => (
                    <input key={key} type={type} placeholder={placeholder} value={formData[key]}
                      onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                      style={{ background: "#141414", border: `1px solid rgba(180,134,11,0.2)`, borderRadius: 4, padding: "13px 14px", color: "#F5F0E8", fontSize: 13, transition: "all 0.3s", width: "100%" }} />
                  ))}
                  <textarea placeholder="Your Message / Project Details" value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    rows={5}
                    style={{ background: "#141414", border: `1px solid rgba(180,134,11,0.2)`, borderRadius: 4, padding: "13px 14px", color: "#F5F0E8", fontSize: 13, resize: "vertical", transition: "all 0.3s", width: "100%" }} />
                  <button onClick={handleSubmit}
                    style={{ background: "#25D366", border: "none", borderRadius: 4, padding: "15px", color: "#fff", fontFamily: "Montserrat, sans-serif", fontSize: 12, letterSpacing: 1.5, fontWeight: 700, cursor: "pointer", transition: "background 0.3s", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                    onMouseEnter={e => e.currentTarget.style.background = "#1ebe5d"}
                    onMouseLeave={e => e.currentTarget.style.background = "#25D366"}>
                    <span style={{ fontSize: 16 }}>📲</span>
                    SEND VIA WHATSAPP
                  </button>
                  <p className="sans" style={{ fontSize: 10, color: "#3A3025", textAlign: "center", letterSpacing: 0.5 }}>
                    Opens WhatsApp · +91 63826 92427
                  </p>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#050505", borderTop: `1px solid rgba(180,134,11,0.2)`, padding: "56px 5% 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid" style={{ marginBottom: 40, paddingBottom: 40, borderBottom: `1px solid rgba(180,134,11,0.1)` }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 38, height: 38, background: goldGrad, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#0A0A0A", flexShrink: 0 }}>CE</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 2.5, color: "#F5F0E8", fontFamily: "Montserrat, sans-serif" }}>CLAN</div>
                  <div style={{ fontSize: 8, letterSpacing: 2.5, color: gold, fontFamily: "Montserrat, sans-serif" }}>ESTABLISHMENT</div>
                </div>
              </div>
              <p className="sans" style={{ fontSize: 12, color: "#5A5040", lineHeight: 1.8, fontWeight: 300, maxWidth: 240 }}>
                Building trust through engineering excellence. Your vision, our expertise — together we establish.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {["FB", "IG", "LI", "YT"].map(s => (
                  <div key={s} className="social-icon" style={{ width: 34, height: 34, border: `1px solid rgba(180,134,11,0.2)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 9, color: "#6A6050", fontFamily: "Montserrat, sans-serif", transition: "all 0.3s", fontWeight: 600 }}>{s}</div>
                ))}
              </div>
            </div>
            {[
              { title: "Services", links: ["Construction", "Consulting", "Interior Design", "Waterproofing", "Structural Drawing"] },
              { title: "Company", links: ["About Us", "Our Team", "Why Choose Us", "Locations", "Contact"] },
              { title: "Contact", links: ["Gandhi Road, Kanchipuram", "TN – 631501", "6382692427", "clanestablishment23@gmail.com"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <div className="sans" style={{ fontSize: 9, letterSpacing: 3, color: gold, marginBottom: 16 }}>{title.toUpperCase()}</div>
                {links.map(l => (
                  <div key={l} className="sans" style={{ fontSize: 11, color: "#5A5040", marginBottom: 8, cursor: "pointer", transition: "color 0.3s", fontWeight: 300, wordBreak: "break-word" }}
                    onMouseEnter={e => e.target.style.color = lightGold} onMouseLeave={e => e.target.style.color = "#5A5040"}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div className="footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p className="sans" style={{ fontSize: 10, color: "#3A3025", fontWeight: 300 }}>© 2025 Clan Establishment. All rights reserved.</p>
            <p className="sans" style={{ fontSize: 10, color: "#3A3025", fontWeight: 300 }}>Engineering · Procurement · Construction</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
