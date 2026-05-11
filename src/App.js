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

function useInView(threshold = 0.15) {
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
      transform: inView ? "translateY(0)" : "translateY(40px)",
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

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", phone: "", message: "" });
  };

  const goldGrad = "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)";
  const darkGold = "#B8860B";
  const gold = "#D4A017";
  const lightGold = "#FFD700";

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", background: "#0A0A0A", color: "#F5F0E8", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: ${darkGold}; border-radius: 3px; }
        .sans { font-family: 'Montserrat', sans-serif; }
        .gold-text { background: ${goldGrad}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .service-card:hover { transform: translateY(-8px); border-color: ${gold} !important; }
        .service-card:hover .card-icon { transform: scale(1.2); }
        .team-card:hover { transform: translateY(-6px); border-color: ${gold} !important; }
        .why-card:hover { background: rgba(180,134,11,0.08) !important; border-color: ${gold} !important; }
        .nav-link:hover { color: ${lightGold} !important; }
        .cta-primary:hover { background: ${goldGrad}; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(180,134,11,0.4); }
        .cta-secondary:hover { background: rgba(180,134,11,0.1); border-color: ${lightGold} !important; color: ${lightGold} !important; transform: translateY(-2px); }
        .social-icon:hover { color: ${lightGold} !important; transform: translateY(-3px); }
        @keyframes shimmer { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse-ring { 0%{transform:scale(0.8);opacity:1} 100%{transform:scale(2);opacity:0} }
        .hero-badge { animation: float 4s ease-in-out infinite; }
        .pulse::before { content:''; position:absolute; inset:0; border-radius:50%; border:2px solid ${gold}; animation: pulse-ring 2s ease-out infinite; }
        input, textarea { outline: none; font-family: 'Montserrat', sans-serif; }
        input:focus, textarea:focus { border-color: ${gold} !important; box-shadow: 0 0 0 2px rgba(180,134,11,0.2) !important; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(180,134,11,0.2)` : "none",
        transition: "all 0.4s ease",
        padding: "0 5%",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
          <div onClick={() => scrollTo("hero")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, background: goldGrad, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#0A0A0A" }}>CE</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: 2, color: "#F5F0E8", fontFamily: "Montserrat, sans-serif" }}>CLAN</div>
              <div style={{ fontSize: 9, letterSpacing: 3, color: gold, fontFamily: "Montserrat, sans-serif", marginTop: -2 }}>ESTABLISHMENT</div>
            </div>
          </div>
          <div className="sans" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <button key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase().replace(/\s/g,"-"))}
                style={{ background: "none", border: "none", color: "#C8C0B0", cursor: "pointer", fontSize: 12, letterSpacing: 1.5, fontFamily: "Montserrat, sans-serif", transition: "color 0.3s", display: window.innerWidth < 768 ? "none" : "block" }}>
                {l.toUpperCase()}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} className="cta-primary"
              style={{ background: goldGrad, border: "none", borderRadius: 2, padding: "9px 20px", color: "#0A0A0A", fontFamily: "Montserrat, sans-serif", fontSize: 11, letterSpacing: 1.5, fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}>
              CONSULT
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: `url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=80') center/cover no-repeat`,
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.75) 50%, rgba(10,10,10,0.88) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", top: "20%", right: "8%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, rgba(180,134,11,0.12) 0%, transparent 70%)`, zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: "15%", left: "5%", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, rgba(180,134,11,0.08) 0%, transparent 70%)`, zIndex: 1 }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%", position: "relative", zIndex: 2, width: "100%" }}>
          <div style={{ maxWidth: 720 }}>
            <div className="sans hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(180,134,11,0.12)", border: `1px solid rgba(180,134,11,0.3)`, borderRadius: 2, padding: "6px 16px", marginBottom: 32 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: gold }} />
              <span style={{ fontSize: 10, letterSpacing: 2.5, color: gold, fontFamily: "Montserrat, sans-serif" }}>ENGINEERING · PROCUREMENT · CONSTRUCTION</span>
            </div>

            <h1 style={{ fontSize: "clamp(48px, 7vw, 90px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginBottom: 8 }}>
              <span style={{ display: "block", color: "#F5F0E8" }}>CLAN</span>
              <span className="gold-text" style={{ display: "block" }}>ESTABLISHMENT</span>
            </h1>

            <div style={{ width: 80, height: 2, background: goldGrad, margin: "20px 0" }} />

            <p style={{ fontSize: "clamp(22px, 3vw, 36px)", fontStyle: "italic", color: "#C8C0B0", fontWeight: 300, marginBottom: 12, letterSpacing: 1 }}>
              "Establish Together..."
            </p>
            <p className="sans" style={{ fontSize: 13, color: "#8A8070", letterSpacing: 2, marginBottom: 48, textTransform: "uppercase" }}>
              Engineering · Procurement · Construction
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("contact")} className="cta-primary"
                style={{ background: goldGrad, border: "none", borderRadius: 2, padding: "16px 36px", color: "#0A0A0A", fontFamily: "Montserrat, sans-serif", fontSize: 12, letterSpacing: 2, fontWeight: 700, cursor: "pointer", transition: "all 0.3s" }}>
                GET FREE CONSULTATION
              </button>
              <button onClick={() => scrollTo("services")} className="cta-secondary"
                style={{ background: "transparent", border: `1px solid rgba(212,160,23,0.5)`, borderRadius: 2, padding: "16px 36px", color: "#C8C0B0", fontFamily: "Montserrat, sans-serif", fontSize: 12, letterSpacing: 2, fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}>
                OUR SERVICES
              </button>
            </div>
          </div>

          <div style={{ position: "absolute", right: "5%", bottom: "10%", display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
            {[["40+", "Projects"], ["3", "Engineers"], ["2023", "Founded"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div className="gold-text" style={{ fontSize: 28, fontWeight: 700 }}>{n}</div>
                <div className="sans" style={{ fontSize: 9, letterSpacing: 2, color: "#6A6050" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 2 }}>
          <div className="sans" style={{ fontSize: 9, letterSpacing: 3, color: "#5A5040" }}>SCROLL</div>
          <div style={{ width: 1, height: 50, background: `linear-gradient(${gold}, transparent)` }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "120px 5%", background: "#0D0D0D", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <AnimSection>
              <div className="sans" style={{ fontSize: 10, letterSpacing: 4, color: gold, marginBottom: 16 }}>WHO WE ARE</div>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
                Building Dreams,<br /><span className="gold-text">Delivering Excellence</span>
              </h2>
              <div style={{ width: 60, height: 2, background: goldGrad, marginBottom: 28 }} />
              <p className="sans" style={{ fontSize: 14, lineHeight: 1.9, color: "#9A9080", marginBottom: 40, fontWeight: 300 }}>
                Clan Establishment is a growing engineering, procurement, and construction company established in 2023, committed to delivering high-quality construction, structural engineering, and consulting services in Chennai and Kanchipuram. We focus on trust, quality, and timely project delivery.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[["Developer", "🏗️"], ["Builder", "🏛️"], ["Consultant", "📋"], ["Investor", "💡"]].map(([r, ic]) => (
                  <div key={r} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", border: `1px solid rgba(180,134,11,0.2)`, borderRadius: 4 }}>
                    <span style={{ fontSize: 18 }}>{ic}</span>
                    <span className="sans" style={{ fontSize: 12, letterSpacing: 1, color: "#C8C0B0", fontWeight: 500 }}>{r}</span>
                  </div>
                ))}
              </div>
            </AnimSection>

            <AnimSection delay={200}>
              <div style={{ position: "relative" }}>
                <div style={{ background: "#141414", border: `1px solid rgba(180,134,11,0.15)`, borderRadius: 4, padding: 48, marginBottom: 20 }}>
                  <div style={{ fontSize: 72, fontWeight: 700, color: "#1A1A1A", lineHeight: 1 }}>2023</div>
                  <div className="sans" style={{ fontSize: 10, letterSpacing: 4, color: gold, marginTop: 8 }}>ESTABLISHED</div>
                  <div style={{ width: 40, height: 1, background: goldGrad, margin: "20px 0" }} />
                  <p className="sans" style={{ fontSize: 13, color: "#7A7060", lineHeight: 1.8, fontWeight: 300 }}>
                    A young, ambitious firm committed to transforming the construction landscape in Tamil Nadu with engineering excellence and innovative solutions.
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[["Chennai", "Primary Market"], ["Kanchipuram", "Service Area"]].map(([city, sub]) => (
                    <div key={city} style={{ background: "#111", border: `1px solid rgba(180,134,11,0.15)`, borderRadius: 4, padding: "20px 16px" }}>
                      <div style={{ fontSize: 20 }}>📍</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: "#F5F0E8", marginTop: 8 }}>{city}</div>
                      <div className="sans" style={{ fontSize: 10, color: "#6A6050", letterSpacing: 1 }}>{sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "120px 5%", background: "#080808", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div className="sans" style={{ fontSize: 10, letterSpacing: 4, color: gold, marginBottom: 16 }}>WHAT WE OFFER</div>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, lineHeight: 1.1 }}>
                Our <span className="gold-text">Services</span>
              </h2>
              <div style={{ width: 60, height: 2, background: goldGrad, margin: "20px auto 0" }} />
            </div>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {SERVICES.map((s, i) => (
              <AnimSection key={s.title} delay={i * 60}>
                <div className="service-card" style={{
                  background: "#0F0F0F", border: `1px solid rgba(180,134,11,0.12)`, borderRadius: 4,
                  padding: "32px 28px", transition: "all 0.4s ease", cursor: "default", height: "100%",
                }}>
                  <div className="card-icon" style={{ fontSize: 36, marginBottom: 20, transition: "transform 0.3s" }}>{s.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 10, color: "#F5F0E8" }}>{s.title}</h3>
                  <div style={{ width: 30, height: 1, background: goldGrad, marginBottom: 14 }} />
                  <p className="sans" style={{ fontSize: 12, color: "#6A6050", lineHeight: 1.8, fontWeight: 300 }}>{s.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" style={{ padding: "120px 5%", background: "#0D0D0D", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div className="sans" style={{ fontSize: 10, letterSpacing: 4, color: gold, marginBottom: 16 }}>THE EXPERTS</div>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700 }}>
                Meet Our <span className="gold-text">Team</span>
              </h2>
              <div style={{ width: 60, height: 2, background: goldGrad, margin: "20px auto 0" }} />
            </div>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, justifyContent: "center" }}>
            {TEAM.map((m, i) => (
              <AnimSection key={m.name} delay={i * 100}>
                <div className="team-card" style={{
                  background: "#0F0F0F", border: `1px solid rgba(180,134,11,0.12)`, borderRadius: 4,
                  padding: "40px 32px", textAlign: "center", transition: "all 0.4s ease",
                }}>
                  <div style={{ position: "relative", display: "inline-block", marginBottom: 24 }}>
                    <div className="pulse" style={{ position: "relative", width: 90, height: 90, borderRadius: "50%", background: `linear-gradient(135deg, rgba(180,134,11,0.2), rgba(180,134,11,0.05))`, border: `2px solid ${m.color}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                      <span style={{ fontSize: 28, fontWeight: 700, color: m.color }}>{m.initials}</span>
                    </div>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: "#F5F0E8", marginBottom: 6 }}>{m.name}</h3>
                  {m.sub && <div className="sans" style={{ fontSize: 10, color: gold, letterSpacing: 1, marginBottom: 8 }}>{m.sub}</div>}
                  <div style={{ width: 30, height: 1, background: goldGrad, margin: "12px auto" }} />
                  <div className="sans" style={{ fontSize: 11, letterSpacing: 2, color: "#8A8070" }}>{m.role.toUpperCase()}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" style={{ padding: "120px 5%", background: "#080808", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div className="sans" style={{ fontSize: 10, letterSpacing: 4, color: gold, marginBottom: 16 }}>OUR STRENGTHS</div>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700 }}>
                Why Choose <span className="gold-text">Us</span>
              </h2>
              <div style={{ width: 60, height: 2, background: goldGrad, margin: "20px auto 0" }} />
            </div>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {WHY_US.map((w, i) => (
              <AnimSection key={w.title} delay={i * 80}>
                <div className="why-card" style={{
                  background: "#0F0F0F", border: `1px solid rgba(180,134,11,0.12)`, borderRadius: 4,
                  padding: "28px 24px", display: "flex", gap: 20, alignItems: "flex-start", transition: "all 0.3s ease",
                }}>
                  <div style={{ fontSize: 32, flexShrink: 0 }}>{w.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#F5F0E8", marginBottom: 8 }}>{w.title}</h3>
                    <p className="sans" style={{ fontSize: 12, color: "#6A6050", lineHeight: 1.7, fontWeight: 300 }}>{w.desc}</p>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="locations" style={{ padding: "120px 5%", background: "#0D0D0D", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div className="sans" style={{ fontSize: 10, letterSpacing: 4, color: gold, marginBottom: 16 }}>WHERE WE OPERATE</div>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700 }}>
                Service <span className="gold-text">Locations</span>
              </h2>
              <div style={{ width: 60, height: 2, background: goldGrad, margin: "20px auto 0" }} />
            </div>
          </AnimSection>
          <AnimSection delay={200}>
            <div style={{ background: "#0F0F0F", border: `1px solid rgba(180,134,11,0.15)`, borderRadius: 4, padding: "60px 40px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, rgba(180,134,11,0.05) 0%, transparent 70%)` }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, position: "relative", zIndex: 1 }}>
                {[
                  { city: "Chennai", desc: "Tamil Nadu's capital — our primary service hub covering residential, commercial, and industrial projects across the metropolitan area.", badge: "PRIMARY HUB" },
                  { city: "Kanchipuram", desc: "The ancient temple city — our home base and headquarters, serving the Kanchipuram district with all construction and engineering services.", badge: "HEADQUARTERS" },
                ].map(({ city, desc, badge }) => (
                  <div key={city} style={{ textAlign: "center", padding: "40px 32px", background: "#111", border: `1px solid rgba(180,134,11,0.1)`, borderRadius: 4 }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>📍</div>
                    <div className="sans" style={{ fontSize: 9, letterSpacing: 3, color: gold, marginBottom: 12, background: "rgba(180,134,11,0.1)", display: "inline-block", padding: "4px 12px", borderRadius: 2 }}>{badge}</div>
                    <h3 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>{city}</h3>
                    <div style={{ width: 40, height: 1, background: goldGrad, margin: "0 auto 16px" }} />
                    <p className="sans" style={{ fontSize: 12, color: "#6A6050", lineHeight: 1.8, fontWeight: 300 }}>{desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center", marginTop: 40, position: "relative", zIndex: 1 }}>
                <p className="sans" style={{ fontSize: 13, color: "#5A5040", letterSpacing: 1 }}>Serving Tamil Nadu — Building the Future</p>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "120px 5%", background: "#080808", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div className="sans" style={{ fontSize: 10, letterSpacing: 4, color: gold, marginBottom: 16 }}>REACH OUT</div>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700 }}>
                Get In <span className="gold-text">Touch</span>
              </h2>
              <div style={{ width: 60, height: 2, background: goldGrad, margin: "20px auto 0" }} />
            </div>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            <AnimSection>
              <div>
                <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 32, color: "#F5F0E8" }}>Contact Information</h3>
                {[
                  { icon: "📍", label: "Address", val: "No. 251, Gandhi Road, Kanchipuram, Tamil Nadu – 631501" },
                  { icon: "📞", label: "Phone", val: "6382692427" },
                  { icon: "✉️", label: "Email", val: "clanestablishment23@gmail.com" },
                ].map(({ icon, label, val }) => (
                  <div key={label} style={{ display: "flex", gap: 16, marginBottom: 28, padding: "20px", background: "#0F0F0F", border: `1px solid rgba(180,134,11,0.12)`, borderRadius: 4 }}>
                    <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{icon}</div>
                    <div>
                      <div className="sans" style={{ fontSize: 9, letterSpacing: 2, color: gold, marginBottom: 6 }}>{label.toUpperCase()}</div>
                      <div className="sans" style={{ fontSize: 13, color: "#C8C0B0", fontWeight: 300, lineHeight: 1.6 }}>{val}</div>
                    </div>
                  </div>
                ))}
                <div style={{ background: "#0F0F0F", border: `1px solid rgba(180,134,11,0.12)`, borderRadius: 4, padding: 20, marginTop: 8 }}>
                  <div className="sans" style={{ fontSize: 9, letterSpacing: 2, color: gold, marginBottom: 12 }}>LOCATION MAP</div>
                  <div style={{ background: "#141414", borderRadius: 4, height: 160, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8, border: `1px solid rgba(180,134,11,0.08)` }}>
                    <div style={{ fontSize: 36 }}>🗺️</div>
                    <div className="sans" style={{ fontSize: 10, color: "#5A5040", letterSpacing: 1 }}>Gandhi Road, Kanchipuram</div>
                    <div className="sans" style={{ fontSize: 10, color: "#4A4030", letterSpacing: 1 }}>Tamil Nadu – 631501</div>
                  </div>
                </div>
              </div>
            </AnimSection>

            <AnimSection delay={200}>
              <div style={{ background: "#0F0F0F", border: `1px solid rgba(180,134,11,0.15)`, borderRadius: 4, padding: "44px 36px" }}>
                <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8, color: "#F5F0E8" }}>Send Us a Message</h3>
                <p className="sans" style={{ fontSize: 12, color: "#5A5040", marginBottom: 32, fontWeight: 300 }}>We'll get back to you within 24 hours</p>
                {submitted && (
                  <div style={{ background: "rgba(180,134,11,0.1)", border: `1px solid rgba(180,134,11,0.3)`, borderRadius: 4, padding: "14px 20px", marginBottom: 24 }}>
                    <p className="sans" style={{ fontSize: 12, color: gold }}>✓ Message sent! We'll be in touch soon.</p>
                  </div>
                )}
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {[
                    { placeholder: "Your Full Name", key: "name", type: "text" },
                    { placeholder: "Phone Number", key: "phone", type: "tel" },
                  ].map(({ placeholder, key, type }) => (
                    <input key={key} type={type} placeholder={placeholder} value={formData[key]}
                      onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                      required
                      style={{ background: "#141414", border: `1px solid rgba(180,134,11,0.2)`, borderRadius: 4, padding: "14px 16px", color: "#F5F0E8", fontSize: 13, transition: "all 0.3s", width: "100%" }} />
                  ))}
                  <textarea placeholder="Your Message / Project Details" value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    required rows={5}
                    style={{ background: "#141414", border: `1px solid rgba(180,134,11,0.2)`, borderRadius: 4, padding: "14px 16px", color: "#F5F0E8", fontSize: 13, resize: "vertical", transition: "all 0.3s", width: "100%" }} />
                  <button type="submit" className="cta-primary"
                    style={{ background: goldGrad, border: "none", borderRadius: 2, padding: "16px", color: "#0A0A0A", fontFamily: "Montserrat, sans-serif", fontSize: 12, letterSpacing: 2, fontWeight: 700, cursor: "pointer", transition: "all 0.3s", marginTop: 8 }}>
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#050505", borderTop: `1px solid rgba(180,134,11,0.2)`, padding: "60px 5% 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48, paddingBottom: 48, borderBottom: `1px solid rgba(180,134,11,0.1)` }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 42, height: 42, background: goldGrad, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#0A0A0A" }}>CE</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 3, color: "#F5F0E8", fontFamily: "Montserrat, sans-serif" }}>CLAN</div>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: gold, fontFamily: "Montserrat, sans-serif" }}>ESTABLISHMENT</div>
                </div>
              </div>
              <p className="sans" style={{ fontSize: 12, color: "#5A5040", lineHeight: 1.8, fontWeight: 300, maxWidth: 260 }}>
                Building trust through engineering excellence. Your vision, our expertise — together we establish.
              </p>
              <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
                {["FB", "IG", "LI", "YT"].map(s => (
                  <div key={s} className="social-icon" style={{ width: 36, height: 36, border: `1px solid rgba(180,134,11,0.2)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 10, color: "#6A6050", fontFamily: "Montserrat, sans-serif", transition: "all 0.3s", fontWeight: 600 }}>{s}</div>
                ))}
              </div>
            </div>
            {[
              { title: "Services", links: ["Construction", "Consulting", "Interior Design", "Waterproofing", "Structural Drawing"] },
              { title: "Company", links: ["About Us", "Our Team", "Why Choose Us", "Locations", "Contact"] },
              { title: "Contact", links: ["Gandhi Road, Kanchipuram", "TN – 631501", "6382692427", "clanestablishment23@gmail.com"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <div className="sans" style={{ fontSize: 10, letterSpacing: 3, color: gold, marginBottom: 20 }}>{title.toUpperCase()}</div>
                {links.map(l => (
                  <div key={l} className="sans" style={{ fontSize: 12, color: "#5A5040", marginBottom: 10, cursor: "pointer", transition: "color 0.3s", fontWeight: 300 }}
                    onMouseEnter={e => e.target.style.color = lightGold} onMouseLeave={e => e.target.style.color = "#5A5040"}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p className="sans" style={{ fontSize: 11, color: "#3A3025", fontWeight: 300 }}>© 2025 Clan Establishment. All rights reserved.</p>
            <p className="sans" style={{ fontSize: 11, color: "#3A3025", fontWeight: 300 }}>Engineering · Procurement · Construction</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
