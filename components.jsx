// Shared components for Lohann Kasper portfolio
const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* ─────────── Custom Cursor ─────────── */
function Cursor() {
  const ref = useRef(null);
  const labelRef = useRef(null);
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState("default"); // default | hover | hover-lg | text

  useEffect(() => {
    const dot = ref.current;
    if (!dot) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x, ty = y;

    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    let raf;
    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const updateHover = (e) => {
      const t = e.target.closest("[data-cursor]");
      if (t) {
        const m = t.getAttribute("data-cursor") || "hover";
        const l = t.getAttribute("data-cursor-label") || "";
        setMode(m);
        setLabel(l);
      } else if (e.target.closest("a, button, [role=button]")) {
        setMode("hover");
        setLabel("");
      } else if (e.target.closest("input, textarea")) {
        setMode("text");
        setLabel("");
      } else {
        setMode("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", updateHover);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", updateHover);
    };
  }, []);

  return (
    <div ref={ref} className={`cursor ${mode !== "default" ? mode : ""}`}>
      <span ref={labelRef} className="cursor-label">{label}</span>
    </div>
  );
}

/* ─────────── Reveal on scroll ─────────── */
// Global state — single shared scroll listener for all Reveal instances.
const _revealListeners = new Set();
let _revealInit = false;
function _initReveal() {
  if (_revealInit) return;
  _revealInit = true;
  const tick = () => {
    _revealListeners.forEach((fn) => fn());
  };
  window.addEventListener("scroll", tick, { passive: true });
  window.addEventListener("resize", tick);
  // Periodic re-check (covers post-layout shifts, font loads, etc.)
  setInterval(tick, 400);
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
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Reveal when any part of the element enters the bottom 90% of viewport
      if (r.top < vh * (1 - threshold) && r.bottom > 0) {
        setSeen(true);
      }
    };
    _revealListeners.add(check);
    // Immediate check after layout settles
    requestAnimationFrame(() => requestAnimationFrame(check));
    return () => { _revealListeners.delete(check); };
  }, [seen, threshold]);
  return (
    <As
      ref={ref}
      className={`${stagger ? "reveal-stagger" : "reveal"} ${seen ? "in" : ""} ${className}`}
      {...rest}
    >
      {children}
    </As>
  );
}

/* ─────────── Mask Reveal (word lines) ─────────── */
function MaskLine({ children, delay = 0 }) {
  return (
    <span className="mask-line">
      <span style={{ transitionDelay: `${delay}s` }}>{children}</span>
    </span>
  );
}

/* ─────────── Nav ─────────── */
function Nav({ route, go }) {
  const links = [
    { id: "home", label: "Accueil" },
    { id: "projects", label: "Projets" },
    { id: "about", label: "À propos", target: "home", hash: "about" },
    { id: "contact", label: "Contact", target: "home", hash: "contact" }
  ];
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a
          className="nav-brand"
          href="#"
          data-cursor="hover"
          data-cursor-label="Home"
          onClick={(e) => { e.preventDefault(); go("home"); }}
        >
          <span className="dot"></span>
          <span>Lohann Kasper / IDM</span>
        </a>
        <div className="nav-links">
          {links.map((l) => {
            const isActive = (l.target ? l.target === route : l.id === route);
            return (
              <a
                key={l.id}
                href="#"
                className={`nav-link hide-sm ${isActive && !l.hash ? "active" : ""}`}
                data-cursor="hover"
                onClick={(e) => {
                  e.preventDefault();
                  if (l.target) {
                    go(l.target, l.hash);
                  } else {
                    go(l.id);
                  }
                }}
              >
                {l.label}
              </a>
            );
          })}
          <a
            className="nav-cta"
            href="mailto:lohann.kasper@me.com"
            data-cursor="hover-lg"
            data-cursor-label="Écrire"
          >
            <span className="dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--terracotta)" }}></span>
            Disponible
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─────────── Footer ─────────── */
function Footer() {
  return (
    <footer className="footer wrap">
      <span>© {new Date().getFullYear()} Lohann Kasper · Lausanne, CH</span>
      <span>Conçu et codé à la main · HTML · CSS · JS</span>
      <span>v2.0 — édition Mai 2026</span>
    </footer>
  );
}

/* ─────────── Helpers ─────────── */
function ArrowGlyph() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

/* ─────────── Project List Row (home) ─────────── */
function WorkRow({ project, go }) {
  return (
    <a
      className="work-row"
      href="#"
      data-cursor="hover-lg"
      data-cursor-label="Voir"
      onClick={(e) => { e.preventDefault(); go("project", project.slug); }}
    >
      <span className="num">{project.num} / 0{window.PROJECTS.length}</span>
      <div>
        <div className="title">
          {project.title} <em>{project.titleEm}</em>
        </div>
        <div className="subtitle">{project.year} — {project.subtitle}</div>
      </div>
      <div className="tags">
        {project.tags.slice(0, 3).map((t) => (
          <span className="tag" key={t}>{t}</span>
        ))}
      </div>
      <span className="arrow">↗</span>
      <div className="preview">
        <img src={project.cover} alt="" />
      </div>
    </a>
  );
}

/* ─────────── Project Card (grid) ─────────── */
function ProjectCard({ project, go, size }) {
  const finalSize = size || project.size || "md";
  return (
    <a
      className={`proj-card size-${finalSize}`}
      href="#"
      data-cursor="hover-lg"
      data-cursor-label="Étude"
      onClick={(e) => { e.preventDefault(); go("project", project.slug); }}
    >
      <div className="proj-card-cover">
        <img src={project.cover} alt={project.title} />
      </div>
      <div className="proj-card-meta">
        <div>
          <div className="proj-card-title">{project.title} — <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>{project.titleEm}</em></div>
          <div className="proj-card-sub">{project.year} · {project.tags.slice(0, 3).join(" · ")}</div>
        </div>
        <span className="proj-card-num">{project.num}</span>
      </div>
    </a>
  );
}

// Export globals
Object.assign(window, {
  Cursor, Reveal, MaskLine, Nav, Footer,
  ArrowGlyph, WorkRow, ProjectCard
});
