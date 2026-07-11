// Home page — Lohann Kasper portfolio
const { useState: useStateHome, useEffect: useEffectHome } = React;

function HomePage({ go, scrollTo }) {
  const lang = useLang();
  const TH = window.I18N[lang].hero;
  const TA = window.I18N[lang].about;
  const TW = window.I18N[lang].work;
  const TT = window.I18N[lang].testimonials;
  const TC = window.I18N[lang].contact;

  useEffectHome(() => {
    if (scrollTo) {
      const t = setTimeout(() => {
        const el = document.getElementById(scrollTo);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return () => clearTimeout(t);
    } else {
      window.scrollTo(0, 0);
    }
  }, [scrollTo]);

  const wordList = [...window.ROLES, window.ROLES[0]];

  return (
    <div className="page">
      {/* HERO */}
      <section className="hero wrap">
        <div className="hero-top">
          <div className="eyebrow"><span>{TH.eyebrow}</span></div>
          <div className="hero-meta">
            <div className="row"><span>{TH.basedLabel}</span><strong>{TH.basedValue}</strong></div>
            <div className="row">
              <span>{TH.statusLabel}</span>
              <strong style={{ display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--terracotta)", display:"inline-block" }}></span>
                {TH.statusValue}
              </strong>
            </div>
            <div className="row"><span>{TH.yearLabel}</span><strong>{TH.yearValue}</strong></div>
          </div>
        </div>

        <div className="hero-intro">
          <div>
            <Reveal>
              <h1 className="hero-title">
                <span className="name-row">Lohann</span>
                <span className="name-row"><em>Kasper.</em></span>
              </h1>
            </Reveal>
            <div className="role-rotator">
              <span>{TH.rolePrefix}</span>
              <span className="word-mask">
                <span className="word-stack">
                  {wordList.map((w, i) => <span key={i}>{w}</span>)}
                </span>
              </span>
            </div>
          </div>
          <div className="hero-portrait" data-cursor="hover-lg" data-cursor-label={TH.hello}>
            <img src="images/profile.jpeg" alt="Lohann Kasper" />
          </div>
        </div>

        <div className="hero-body">
          <div>
            <Reveal>
              <p className="hero-desc">
                {TH.desc.split(TH.descEm)[0]}
                <em>{TH.descEm}</em>
                {TH.desc.split(TH.descEm)[1]}
              </p>
            </Reveal>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#" data-cursor="hover"
                onClick={(e) => { e.preventDefault(); go("projects"); }}>
                {TH.ctaWork} <span className="arrow">↗</span>
              </a>
              <a className="btn" href="#contact" data-cursor="hover"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
                {TH.ctaContact}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="skills-strip">
        <div className="skills-track">
          {[...window.SKILLS, ...window.SKILLS].map((s, i) => <span className="item" key={i}>{s}</span>)}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section wrap">
        <div><span className="eyebrow">{TA.eyebrow}</span></div>
        <div className="section-head"></div>
        <div className="split-grid">
          <Reveal>
            <h2 style={{ fontFamily:"var(--display)", fontSize:"clamp(40px, 5.5vw, 80px)", lineHeight:1, letterSpacing:"-0.015em" }}>
              {TA.heading} <em style={{ color:"var(--terracotta)", fontStyle:"italic" }}>{TA.headingEm}</em>.
              <br />
              <span style={{ color:"var(--ink-soft)" }}>{TA.headingSub}</span>
            </h2>
          </Reveal>
          <Reveal className="prose">
            <p>
              Ingénieur des médias diplômé de la <strong>{TA.p1Strong}</strong>
              {lang === "fr"
                ? ", je travaille à l'intersection de la communication, du marketing et du design d'expérience. J'aime construire des projets de bout en bout — de la stratégie à l'exécution."
                : ", I work at the intersection of communication, marketing and experience design. I like building projects end-to-end — from strategy to execution."}
            </p>
            <p>
              {lang === "fr"
                ? <>Mes terrains de jeu : la <strong>{TA.p2Strong1}</strong> (sites, processus, identité), l'<strong>{TA.p2Strong2}</strong> par le design thinking et le prototypage rapide, et la <strong>{TA.p2Strong3}</strong> qui transforme une intention en action.</>
                : <>My playgrounds: <strong>{TA.p2Strong1}</strong> (websites, processes, identity), <strong>{TA.p2Strong2}</strong> through design thinking and rapid prototyping, and <strong>{TA.p2Strong3}</strong> that turns intent into action.</>}
            </p>
            <p>{TA.p3}</p>
          </Reveal>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="section wrap" style={{ paddingTop: 40 }}>
        <div className="section-head">
          <div>
            <span className="eyebrow">{TW.eyebrow}</span>
            <h2 style={{ marginTop: 16 }}>{TW.heading} <em>{TW.headingEm}</em></h2>
          </div>
          <div className="right">{TW.desc}</div>
        </div>
        <div className="work-list">
          {window.PROJECTS.map((p) => <WorkRow key={p.id} project={p} go={go} />)}
        </div>
        <div style={{ display:"flex", justifyContent:"flex-end", marginTop:32 }}>
          <a className="btn" href="#" data-cursor="hover"
            onClick={(e) => { e.preventDefault(); go("projects"); }}>
            {TW.cta} <span className="arrow">↗</span>
          </a>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section wrap" style={{ paddingTop: 60 }}>
        <div className="section-head">
          <div>
            <span className="eyebrow">{TT.eyebrow}</span>
            <h2 style={{ marginTop: 16 }}>{TT.heading} <em>{TT.headingEm}</em></h2>
          </div>
          <div className="right">{TT.desc}</div>
        </div>
        <Reveal className="testimonials" stagger>
          {window.TESTIMONIALS.map((t, i) => (
            <div className="testimonial" key={i}>
              <span className="testimonial-mark">"</span>
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-who">
                <div className="testimonial-avatar"><img src={t.avatar} alt={t.name} /></div>
                <div>
                  <div className="name">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section wrap">
        <span className="eyebrow">{TC.eyebrow}</span>
        <Reveal>
          <h2 className="contact-mega">
            {TC.megaLine1} <em>{TC.megaEm}</em>{TC.megaLine2}<br />
            <a href="mailto:lohann.kasper@me.com" data-cursor="hover-lg" data-cursor-label={TC.cursorLabel}>
              lohann.kasper<br />
              @me.com<span style={{ color:"var(--terracotta)" }}>.</span>
            </a>
          </h2>
        </Reveal>
        <div className="contact-meta">
          <div className="field">
            <span className="field-label">Email</span>
            <a href="mailto:lohann.kasper@me.com" data-cursor="hover">lohann.kasper@me.com</a>
          </div>
          <div className="field">
            <span className="field-label">LinkedIn</span>
            <a href="https://www.linkedin.com/in/lohann-kasper/" target="_blank" rel="noopener noreferrer" data-cursor="hover">linkedin.com/in/lohann-kasper</a>
          </div>
          <div className="field">
            <span className="field-label">GitHub</span>
            <a href="https://github.com/Lohannaki" target="_blank" rel="noopener noreferrer" data-cursor="hover">github.com/Lohannaki</a>
          </div>
          <div className="field">
            <span className="field-label">{TC.locationLabel}</span>
            <span>{TC.locationValue}</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

window.HomePage = HomePage;
