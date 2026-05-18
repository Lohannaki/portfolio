// Home page — Lohann Kasper portfolio
const { useState: useStateHome, useEffect: useEffectHome } = React;

function HomePage({ go, scrollTo }) {
  // Scroll to hash if provided
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

  const roles = window.ROLES;
  // We'll build the role rotator: a column of role words that shifts via CSS animation.
  // To have it loop seamlessly we duplicate the first at the end.
  const wordList = [...roles, roles[0]];

  return (
    <div className="page">
      {/* HERO */}
      <section className="hero wrap">
        <div className="hero-top">
          <div className="eyebrow">
            <span>Portfolio · Édition 2026</span>
          </div>
          <div className="hero-meta">
            <div className="row">
              <span>Basé à</span>
              <strong>Lausanne, CH</strong>
            </div>
            <div className="row">
              <span>Statut</span>
              <strong style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--terracotta)", display: "inline-block" }}></span>
                Disponible
              </strong>
            </div>
            <div className="row">
              <span>Année</span>
              <strong>2026 — VI</strong>
            </div>
          </div>
        </div>

        <Reveal>
          <h1 className="hero-title">
            <span className="name-row">Lohann</span>
            <span className="name-row"><em>Kasper.</em></span>
          </h1>
        </Reveal>

        <div className="role-rotator">
          <span>Ingénieur des médias —</span>
          <span className="word-mask">
            <span className="word-stack">
              {wordList.map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </span>
          </span>
        </div>

        <div className="hero-body">
          <div>
            <Reveal>
              <p className="hero-desc">
                Je conçois des stratégies de communication et des produits digitaux
                qui font le pont entre la créativité, la donnée et la compréhension
                technique. Issu de la filière <em>Ingénierie des médias</em> de la
                HEIG-VD, je travaille sur la marque, l'expérience et le code.
              </p>
            </Reveal>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#" data-cursor="hover" onClick={(e) => { e.preventDefault(); go("projects"); }}>
                Voir les travaux <span className="arrow">↗</span>
              </a>
              <a className="btn" href="#contact" data-cursor="hover" onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}>
                Prendre contact
              </a>
            </div>
          </div>
          <div className="hero-portrait" data-cursor="hover-lg" data-cursor-label="Bonjour">
            <img src="images/profile.jpeg" alt="Lohann Kasper" />
            <div className="hero-portrait-tag">Lohann · 2026</div>
          </div>
        </div>
      </section>

      {/* SKILLS marquee */}
      <section className="skills-strip">
        <div className="skills-track">
          {[...window.SKILLS, ...window.SKILLS].map((s, i) => (
            <span className="item" key={i}>{s}</span>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">À propos · 01</span>
          </div>
        </div>
        <div className="split-grid">
          <Reveal>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(40px, 5.5vw, 80px)", lineHeight: 1, letterSpacing: "-0.015em" }}>
              Stratégie, créativité et <em style={{ color: "var(--terracotta)", fontStyle: "italic" }}>compréhension technique</em>.
              <br />
              <span style={{ color: "var(--ink-soft)" }}>Le triple langage de l'IDM.</span>
            </h2>
          </Reveal>
          <Reveal className="prose">
            <p>
              Ingénieur des médias diplômé de la <strong>HEIG-VD</strong>, je travaille
              à l'intersection de la communication, du marketing et du design d'expérience.
              J'aime construire des projets de bout en bout — de la stratégie à l'exécution.
            </p>
            <p>
              Mes terrains de jeu : la <strong>refonte digitale</strong> (sites, processus,
              identité), l'<strong>innovation</strong> par le design thinking et le prototypage
              rapide, et la <strong>communication</strong> qui transforme une intention en action.
            </p>
            <p>
              Côté technique, je code, conçois et déploie. Côté stratégie, j'aime poser
              les bonnes questions avant de chercher des réponses.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="section wrap" style={{ paddingTop: 40 }}>
        <div className="section-head">
          <div>
            <span className="eyebrow">Travaux sélectionnés · 02</span>
            <h2 style={{ marginTop: 16 }}>
              Projets <em>récents.</em>
            </h2>
          </div>
          <div className="right">
            Une sélection de projets menés entre 2024 et 2025 : stratégie de
            communication, innovation RH et refonte digitale. Cliquez pour
            l'étude complète.
          </div>
        </div>

        <div className="work-list">
          {window.PROJECTS.map((p) => (
            <WorkRow key={p.id} project={p} go={go} />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 32 }}>
          <a className="btn" href="#" data-cursor="hover" onClick={(e) => { e.preventDefault(); go("projects"); }}>
            Tous les travaux <span className="arrow">↗</span>
          </a>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section wrap" style={{ paddingTop: 60 }}>
        <div className="section-head">
          <div>
            <span className="eyebrow">Recommandations · 03</span>
            <h2 style={{ marginTop: 16 }}>
              Ce qu'on dit de moi <em>en off.</em>
            </h2>
          </div>
          <div className="right">
            Des mots de personnes avec qui j'ai eu la chance de travailler.
          </div>
        </div>
        <Reveal className="testimonials" stagger>
          {window.TESTIMONIALS.map((t, i) => (
            <div className="testimonial" key={i}>
              <span className="testimonial-mark">"</span>
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-who">
                <div className="testimonial-avatar">
                  <img src={t.avatar} alt={t.name} />
                </div>
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
        <span className="eyebrow">Contact · 04</span>
        <Reveal>
          <h2 className="contact-mega">
            On <em>discute</em> ?<br />
            <a href="mailto:lohann.kasper@me.com" data-cursor="hover-lg" data-cursor-label="Envoyer">
              lohann.kasper<br />
              @me.com<span style={{ color: "var(--terracotta)" }}>.</span>
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
            <span className="field-label">Localisation</span>
            <span>Lausanne · Suisse</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

window.HomePage = HomePage;
