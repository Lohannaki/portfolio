// Project detail page
const { useState: useStateD, useEffect: useEffectD } = React;

function ProjectDetailPage({ slug, go }) {
  const project = window.PROJECTS.find(p => p.slug === slug) || window.PROJECTS[0];
  const lang = useLang();
  const TD = window.I18N[lang].detail;

  useEffectD(() => { window.scrollTo(0, 0); }, [slug]);
  const idx = window.PROJECTS.findIndex(p => p.slug === slug);
  const next = window.PROJECTS[(idx + 1) % window.PROJECTS.length];

  return (
    <div className="page">
      <article>
        <header className="detail-hero wrap">
          <a className="back-link" href="#" data-cursor="hover"
            onClick={(e) => { e.preventDefault(); go("projects"); }}>
            <span>←</span> {TD.back}
          </a>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", flexWrap:"wrap", gap:16, marginBottom:32 }}>
            <span className="eyebrow">{TD.eyebrow} · {project.num}</span>
            <span className="kicker">{project.year}</span>
          </div>
          <div className="detail-tags">
            {project.tags.map(t => <span className="detail-tag" key={t}>{t}</span>)}
          </div>
          <Reveal>
            <h1 className="detail-title">{project.title}<br /><em>{project.titleEm}.</em></h1>
          </Reveal>
          <Reveal>
            <p className="detail-intro">{project.intro || project.description}</p>
          </Reveal>
          <div className="detail-meta">
            {Object.entries(project.meta || {}).map(([k, v]) => (
              <div key={k}><div className="label">{k}</div><div className="value">{v}</div></div>
            ))}
            {(project.links || []).length > 0 && (
              <div>
                <div className="label">{TD.links}</div>
                <div className="value">
                  {project.links.map((l, i) => (
                    <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" data-cursor="hover" style={{ display:"block" }}>{l.label} ↗</a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="wrap">
          <Reveal>
            <div className={`detail-hero-img ${project.id === "uefa" ? "contain" : ""}`}>
              <img src={project.id === "uefa" ? project.coverLogo : project.cover} alt={project.title} />
            </div>
          </Reveal>
        </div>

        {project.problem && (
          <section className="detail-section">
            <div className="wrap">
              <div className="detail-section-head">
                <span className="detail-section-num">{TD.sectionA}</span>
                <Reveal><h2 className="detail-section-title">{TD.titleA} <em>{TD.titleAEm}</em></h2></Reveal>
              </div>
              <div className="detail-grid">
                <span className="kicker">{TD.diagnosis}</span>
                <Reveal className="prose">
                  <p style={{ fontSize:19, lineHeight:1.6 }}>{project.problem}</p>
                  {project.reformulation && <>
                    <p style={{ marginTop:32, fontFamily:"var(--mono)", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", color:"var(--ink-soft)" }}>{TD.hmw}</p>
                    <p style={{ fontFamily:"var(--display)", fontStyle:"italic", fontSize:"clamp(24px, 2.6vw, 36px)", lineHeight:1.25, color:"var(--ink)", marginTop:12, paddingLeft:24, borderLeft:"2px solid var(--terracotta)" }}>
                      « {project.reformulation} »
                    </p>
                  </>}
                </Reveal>
              </div>
            </div>
          </section>
        )}

        {project.tasks && project.tasks.length > 0 && (
          <section className="detail-section">
            <div className="wrap">
              <div className="detail-section-head">
                <span className="detail-section-num">{TD.sectionB}</span>
                <Reveal><h2 className="detail-section-title">{TD.titleB} <em>{TD.titleBEm}</em></h2></Reveal>
              </div>
              <div className="detail-grid">
                <span className="kicker">{TD.deliverables(project.tasks.length)}</span>
                <Reveal>
                  <ol className="task-list">
                    {project.tasks.map((t, i) => (
                      <li key={i}><span className="num">{String(i+1).padStart(2,"0")}</span><span>{t}</span></li>
                    ))}
                  </ol>
                </Reveal>
              </div>
            </div>
          </section>
        )}

        {project.keyPoints && (
          <section className="detail-section">
            <div className="wrap">
              <div className="detail-section-head">
                <span className="detail-section-num">{TD.sectionCKey}</span>
                <Reveal><h2 className="detail-section-title">{TD.titleCKey} <em>{TD.titleCKeyEm}</em></h2></Reveal>
              </div>
              <Reveal className="key-points" stagger>
                {project.keyPoints.map((kp, i) => (
                  <div className="key-point" key={i}>
                    <span className="kp-num">{kp.num}</span>
                    <h3>{kp.title}</h3>
                    <p>{kp.body}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>
        )}

        {project.solution && (
          <section className="detail-section">
            <div className="wrap">
              <div className="detail-section-head">
                <span className="detail-section-num">{TD.sectionCSol}</span>
                <Reveal>
                  <h2 className="detail-section-title">
                    {project.solution.name.split(" ").slice(0,-1).join(" ")} <em>{project.solution.name.split(" ").slice(-1)[0]}</em>.
                  </h2>
                </Reveal>
              </div>
              <div className="solution-list">
                {project.solution.components.map(c => (
                  <Reveal key={c.num} className="row">
                    <span className="num">{c.num}</span>
                    <h3 className="ttl">{c.title}</h3>
                    <p className="desc">{c.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {project.axes && (
          <section className="detail-section">
            <div className="wrap">
              <div className="detail-section-head">
                <span className="detail-section-num">{TD.sectionCAxes}</span>
                <Reveal><h2 className="detail-section-title">{TD.titleCAxes} <em>{TD.titleCAxesEm}</em></h2></Reveal>
              </div>
              <AxesList axes={project.axes} />
            </div>
          </section>
        )}

        {project.methodology && (
          <section className="detail-section">
            <div className="wrap">
              <div className="detail-section-head">
                <span className="detail-section-num">{TD.sectionDMeth}</span>
                <Reveal><h2 className="detail-section-title">{TD.titleDMeth} <em>{TD.titleDMethEm}</em></h2></Reveal>
              </div>
              <div className="detail-grid">
                <div>
                  <div style={{ marginBottom:16 }}>
                    <p className="kicker">{TD.approach}</p>
                    <p style={{ marginTop:6 }}>{project.methodology.approach}</p>
                  </div>
                  <div>
                    <p className="kicker">{TD.tool}</p>
                    <p style={{ marginTop:6 }}>{project.methodology.tool}</p>
                  </div>
                </div>
                <Reveal>
                  <p className="kicker" style={{ marginBottom:16 }}>{TD.phases}</p>
                  <ol className="task-list">
                    {project.methodology.phases.map((ph, i) => (
                      <li key={i}><span className="num">{String(i+1).padStart(2,"0")}</span><span>{ph}</span></li>
                    ))}
                  </ol>
                </Reveal>
              </div>
            </div>
          </section>
        )}

        {project.team && (
          <section className="detail-section">
            <div className="wrap">
              <div className="detail-section-head">
                <span className="detail-section-num">{TD.sectionDTeam}</span>
                <Reveal><h2 className="detail-section-title">NextGen <em>Recruiters</em>.</h2></Reveal>
              </div>
              <Reveal className="team-grid" stagger>
                {project.team.map((m, i) => (
                  <div className="team-card" key={i}>
                    <span className="kicker">M-0{i+1}</span>
                    <div className="name" style={{ marginTop:12 }}>{m.name}</div>
                    <div className="role">{m.role}</div>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>
        )}

        {project.gallery && (
          <section className="detail-section">
            <div className="wrap">
              <div className="detail-section-head">
                <span className="detail-section-num">{TD.sectionEGal}</span>
                <Reveal><h2 className="detail-section-title">{TD.titleEGal} <em>{TD.titleEGalEm}</em></h2></Reveal>
              </div>
            </div>
            <GalleryCarousel items={project.gallery} TD={TD} />
          </section>
        )}

        <section className="detail-section">
          <div className="wrap">
            <span className="eyebrow">{TD.nextProject} · {next.num}</span>
            <a href="#" data-cursor="hover-lg" data-cursor-label="Lire"
              onClick={(e) => { e.preventDefault(); go("project", next.slug); }}
              style={{ display:"block", marginTop:16 }}>
              <h2 style={{ fontFamily:"var(--display)", fontWeight:400, fontSize:"clamp(56px, 9vw, 144px)", lineHeight:0.92, letterSpacing:"-0.02em", transition:"color .3s var(--ease)" }}
                onMouseEnter={(e) => e.currentTarget.style.color="var(--terracotta)"}
                onMouseLeave={(e) => e.currentTarget.style.color=""}>
                {next.title} <em style={{ color:"var(--terracotta)", fontStyle:"italic" }}>{next.titleEm}</em> <span style={{ fontStyle:"italic", color:"var(--ink-soft)" }}>↗</span>
              </h2>
            </a>
          </div>
        </section>

        <Footer />
      </article>
    </div>
  );
}

function AxesList({ axes }) {
  const [open, setOpen] = useStateD(0);
  return (
    <div className="axes-list">
      {axes.map((a, i) => (
        <div className={`axis-card ${open === i ? "open" : ""}`} key={i}>
          <button className="axis-card-head" data-cursor="hover" onClick={() => setOpen(open === i ? -1 : i)}>
            <span className="num">{a.num}</span>
            <span className="ttl">{a.title}</span>
            <span className="toggle">+</span>
          </button>
          <div className="axis-card-body">
            <div>
              <div className="axis-card-body-inner">
                <p>{a.desc}</p>
                <ul>{a.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GalleryCarousel({ items, TD }) {
  const railRef = React.useRef(null);
  const [progress, setProgress] = useStateD(0);
  const [canL, setCanL] = useStateD(false);
  const [canR, setCanR] = useStateD(true);

  const update = React.useCallback(() => {
    const el = railRef.current; if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setCanL(el.scrollLeft > 4);
    setCanR(el.scrollLeft < max - 4);
  }, []);

  useEffectD(() => {
    const el = railRef.current; if (!el) return;
    update(); el.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [update]);

  const step = (dir) => {
    const el = railRef.current; if (!el) return;
    const first = el.querySelector(".gc-item");
    el.scrollBy({ left: dir * ((first ? first.getBoundingClientRect().width : el.clientWidth * 0.6) + 16), behavior: "smooth" });
  };

  useEffectD(() => {
    const el = railRef.current; if (!el) return;
    let down = false, sx = 0, ss = 0;
    const down_ = (e) => { down=true; sx=(e.touches?e.touches[0].clientX:e.clientX); ss=el.scrollLeft; el.classList.add("dragging"); };
    const move_ = (e) => { if(!down)return; el.scrollLeft=ss-(((e.touches?e.touches[0].clientX:e.clientX))-sx); };
    const up_ = () => { down=false; el.classList.remove("dragging"); };
    el.addEventListener("mousedown",down_); window.addEventListener("mousemove",move_); window.addEventListener("mouseup",up_);
    el.addEventListener("touchstart",down_,{passive:true}); el.addEventListener("touchmove",move_,{passive:true}); el.addEventListener("touchend",up_);
    return()=>{ el.removeEventListener("mousedown",down_); window.removeEventListener("mousemove",move_); window.removeEventListener("mouseup",up_); el.removeEventListener("touchstart",down_); el.removeEventListener("touchmove",move_); el.removeEventListener("touchend",up_); };
  }, []);

  return (
    <div className="gallery-carousel">
      <div className="gc-rail" ref={railRef} data-cursor="hover" data-cursor-label={TD.drag}>
        {items.map((g, i) => (
          <div className="gc-item" key={i}>
            <img src={g.src} alt={`Visuel ${i+1}`} draggable={false} />
            <span className="gc-num">{String(i+1).padStart(2,"0")} / {String(items.length).padStart(2,"0")}</span>
          </div>
        ))}
      </div>
      <div className="wrap gc-controls">
        <div className="gc-progress"><div className="gc-progress-bar" style={{ transform:`scaleX(${progress})` }}></div></div>
        <div className="gc-arrows">
          <button className="gc-arrow" onClick={() => step(-1)} disabled={!canL} aria-label={TD.prev} data-cursor="hover">←</button>
          <button className="gc-arrow" onClick={() => step(1)} disabled={!canR} aria-label={TD.next} data-cursor="hover">→</button>
        </div>
      </div>
    </div>
  );
}

window.ProjectDetailPage = ProjectDetailPage;
