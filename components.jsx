// Shared components — Lohann Kasper portfolio
const { useState, useEffect, useRef } = React;

/* ── Lang hook ── */
function useLang() {
  const [lang, setLangState] = useState(window.LANG);
  useEffect(() => {
    const off = window.onLangChange((l) => setLangState(l));
    return off;
  }, []);
  return lang;
}

/* ── Lang Dropdown ── */
function LangToggle() {
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const other = lang === "fr" ? "en" : "fr";
  const label = lang === "fr" ? "FR" : "EN";
  const otherLabel = lang === "fr" ? "EN" : "FR";
  const otherFull = lang === "fr" ? "English" : "Français";

  // Fermer si clic en dehors
  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="lang-dropdown" ref={ref}>
      <button
        className={`lang-btn ${open ? "open" : ""}`}
        data-cursor="hover"
        aria-label="Changer de langue"
        onClick={() => setOpen(v => !v)}
      >
        {label}
        <span className="lang-chevron" aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className="lang-menu">
          <button
            className="lang-option"
            data-cursor="hover"
            onClick={() => { window.setLang(other); setOpen(false); }}
          >
            <span className="lang-option-code">{otherLabel}</span>
            <span className="lang-option-full">{otherFull}</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* Cursor supprimé — souris native */
function Cursor() { return null; }

/* ── Reveal ── */
const _rl = new Set(); let _ri = false;
function _initReveal() {
  if (_ri) return; _ri = true;
  const t = () => _rl.forEach(fn => fn());
  window.addEventListener("scroll", t, { passive: true });
  window.addEventListener("resize", t);
  setInterval(t, 400);
}
function Reveal({ as: As = "div", className = "", stagger = false, children, threshold = 0.05, ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    _initReveal();
    const check = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      if (r.top < window.innerHeight * (1 - threshold) && r.bottom > 0) setSeen(true);
    };
    _rl.add(check);
    requestAnimationFrame(() => requestAnimationFrame(check));
    return () => _rl.delete(check);
  }, [seen, threshold]);
  return <As ref={ref} className={`${stagger ? "reveal-stagger" : "reveal"} ${seen ? "in" : ""} ${className}`} {...rest}>{children}</As>;
}

/* ── MaskLine ── */
function MaskLine({ children, delay = 0 }) {
  return <span className="mask-line"><span style={{ transitionDelay: `${delay}s` }}>{children}</span></span>;
}

/* ── Nav ── */
function Nav({ route, go }) {
  const lang = useLang();
  const T = window.I18N[lang].nav;
  const [open, setOpen] = useState(false);

  const links = [
    { id: "home",     label: T.index,    target: "home" },
    { id: "projects", label: T.projects, target: "projects" },
    { id: "about",    label: T.about,    target: "home", hash: "about" },
    { id: "contact",  label: T.contact,  target: "home", hash: "contact" },
  ];

  useEffect(() => { setOpen(false); }, [route]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNav = (l) => {
    l.hash ? go(l.target, l.hash) : go(l.id || l.target);
    setOpen(false);
  };

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a className="nav-brand" href="#" data-cursor="hover" data-cursor-label={T.index}
          onClick={(e) => { e.preventDefault(); go("home"); setOpen(false); }}>
          <span className="dot"></span>
          <span>Lohann Kasper / IDM</span>
        </a>
        <div className="nav-links">
          {links.map((l) => {
            const isActive = l.target === route && !l.hash;
            return (
              <a key={l.id} href="#"
                className={`nav-link hide-sm ${isActive ? "active" : ""}`}
                data-cursor="hover"
                onClick={(e) => { e.preventDefault(); handleNav(l); }}>
                {l.label}
              </a>
            );
          })}
          <LangToggle />
          <a className="nav-cta hide-xs" href="mailto:lohann.kasper@me.com"
            data-cursor="hover-lg" data-cursor-label={T.write}>
            <span className="dot" style={{ width:6, height:6, borderRadius:"50%", background:"var(--terracotta)" }}></span>
            {T.available}
          </a>
          <button className={`nav-burger ${open ? "open" : ""}`} aria-label="Menu"
            data-cursor="hover" onClick={() => setOpen(v => !v)}>
            <span></span><span></span>
          </button>
        </div>
      </div>

      {ReactDOM.createPortal(
        <div className={`nav-mobile ${open ? "open" : ""}`}>
          <div className="nav-mobile-links">
            {links.map((l, i) => {
              const isActive = l.target === route && !l.hash;
              return (
                <a key={l.id} href="#"
                  className={`nav-mobile-link ${isActive ? "active" : ""}`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                  onClick={(e) => { e.preventDefault(); handleNav(l); }}>
                  <span className="idx">0{i + 1}</span>
                  {l.label}
                </a>
              );
            })}
          </div>
          <a className="nav-mobile-cta" href="mailto:lohann.kasper@me.com" onClick={() => setOpen(false)}>
            <span className="dot" style={{ width:6, height:6, borderRadius:"50%", background:"var(--terracotta)" }}></span>
            lohann.kasper@me.com
          </a>
        </div>,
        document.body
      )}
    </nav>
  );
}

/* ── Footer ── */
function Footer() {
  const lang = useLang();
  const T = window.I18N[lang].footer;
  return (
    <footer className="footer wrap">
      <span>© {new Date().getFullYear()} Lohann Kasper · Lausanne, CH</span>
      <span>{T.copy}</span>
      <span>{T.version}</span>
    </footer>
  );
}

/* ── WorkRow ── */
function WorkRow({ project, go }) {
  return (
    <a className="work-row" href="#" data-cursor="hover-lg" data-cursor-label="Voir"
      onClick={(e) => { e.preventDefault(); go("project", project.slug); }}>
      <span className="num">{project.num} / 0{window.PROJECTS.length}</span>
      <div>
        <div className="title">{project.title} <em>{project.titleEm}</em></div>
        <div className="subtitle">{project.year} — {project.subtitle}</div>
      </div>
      <div className="tags">{project.tags.slice(0, 3).map(t => <span className="tag" key={t}>{t}</span>)}</div>
      <span className="arrow">↗</span>
    </a>
  );
}

/* ── ProjectCard ── */
function ProjectCard({ project, go, size }) {
  return (
    <a className={`proj-card size-${size || project.size || "md"}`} href="#"
      data-cursor="hover-lg" data-cursor-label="Étude"
      onClick={(e) => { e.preventDefault(); go("project", project.slug); }}>
      <div className="proj-card-cover"><img src={project.cover} alt={project.title} /></div>
      <div className="proj-card-meta">
        <div>
          <div className="proj-card-title">{project.title} — <em style={{ fontStyle:"italic", color:"var(--terracotta)" }}>{project.titleEm}</em></div>
          <div className="proj-card-sub">{project.year} · {project.tags.slice(0, 3).join(" · ")}</div>
        </div>
        <span className="proj-card-num">{project.num}</span>
      </div>
    </a>
  );
}

Object.assign(window, { Cursor, Reveal, MaskLine, Nav, Footer, WorkRow, ProjectCard, LangToggle, useLang });