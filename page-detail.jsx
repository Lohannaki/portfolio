// Project detail page — renders any project
const { useState: useStateD, useEffect: useEffectD } = React;

function ProjectDetailPage({ slug, go }) {
  const project = window.PROJECTS.find((p) => p.slug === slug) || window.PROJECTS[0];

  useEffectD(() => { window.scrollTo(0, 0); }, [slug]);

  // Determine "next" project for end-of-page nav
  const idx = window.PROJECTS.findIndex((p) => p.slug === slug);
  const next = window.PROJECTS[(idx + 1) % window.PROJECTS.length];

  return (
    <div className="page">
      <article>
        {/* HERO */}
        <header className="detail-hero wrap">
          <a
            className="back-link"
            href="#"
            data-cursor="hover"
            onClick={(e) => { e.preventDefault(); go("projects"); }}
          >
            <span>←</span> Tous les travaux
          </a>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
            <span className="eyebrow">Étude · {project.num}</span>
            <span className="kicker">{project.year}</span>
          </div>

          <div className="detail-tags">
            {project.tags.map((t) => (
              <span className="detail-tag" key={t}>{t}</span>
            ))}
          </div>

          <Reveal>
            <h1 className="detail-title">
              {project.title}<br />
              <em>{project.titleEm}.</em>
            </h1>
          </Reveal>

          <Reveal>
            <p className="detail-intro">{project.intro || project.description}</p>
          </Reveal>

          <div className="detail-meta">
            {Object.entries(project.meta || {}).map(([k, v]) => (
              <div key={k}>
                <div className="label">{k}</div>
                <div className="value">{v}</div>
              </div>
            ))}
            {(project.links || []).length > 0 && (
              <div>
                <div className="label">Liens</div>
                <div className="value">
                  {project.links.map((l, i) => (
                    <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" data-cursor="hover" style={{ display: "block" }}>
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* HERO IMAGE */}
        <div className="wrap">
          <Reveal>
            <div className={`detail-hero-img ${project.id === "uefa" ? "contain" : ""}`}>
              <img src={project.id === "uefa" ? project.coverLogo : project.cover} alt={project.title} />
            </div>
          </Reveal>
        </div>

        {/* PROBLEM */}
        {project.problem && (
          <section className="detail-section">
            <div className="wrap">
              <div className="detail-section-head">
                <span className="detail-section-num">A · Problématique</span>
                <Reveal>
                  <h2 className="detail-section-title">
                    Le <em>contexte</em>.
                  </h2>
                </Reveal>
              </div>
              <div className="detail-grid">
                <span className="kicker">Diagnostic</span>
                <Reveal className="prose">
                  <p style={{ fontSize: 19, lineHeight: 1.6 }}>{project.problem}</p>
                  {project.reformulation && (
                    <>
                      <p style={{ marginTop: 32, fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-soft)" }}>
                        Reformulation HMW
                      </p>
                      <p style={{
                        fontFamily: "var(--display)",
                        fontStyle: "italic",
                        fontSize: "clamp(24px, 2.6vw, 36px)",
                        lineHeight: 1.25,
                        color: "var(--ink)",
                        marginTop: 12,
                        paddingLeft: 24,
                        borderLeft: "2px solid var(--terracotta)"
                      }}>
                        « {project.reformulation} »
                      </p>
                    </>
                  )}
                </Reveal>
              </div>
            </div>
          </section>
        )}

        {/* TASKS */}
        {project.tasks && project.tasks.length > 0 && (
          <section className="detail-section">
            <div className="wrap">
              <div className="detail-section-head">
                <span className="detail-section-num">B · Réalisation</span>
                <Reveal>
                  <h2 className="detail-section-title">
                    Tâches <em>réalisées</em>.
                  </h2>
                </Reveal>
              </div>
              <div className="detail-grid">
                <span className="kicker">Livrables — {project.tasks.length} items</span>
                <Reveal>
                  <ol className="task-list">
                    {project.tasks.map((t, i) => (
                      <li key={i}>
                        <span className="num">{String(i + 1).padStart(2, "0")}</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </div>
            </div>
          </section>
        )}

        {/* KEY POINTS (UEFA) */}
        {project.keyPoints && (
          <section className="detail-section">
            <div className="wrap">
              <div className="detail-section-head">
                <span className="detail-section-num">C · Architecture</span>
                <Reveal>
                  <h2 className="detail-section-title">
                    Points <em>clés</em>.
                  </h2>
                </Reveal>
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

        {/* SOLUTION (RP) */}
        {project.solution && (
          <section className="detail-section">
            <div className="wrap">
              <div className="detail-section-head">
                <span className="detail-section-num">C · Solution</span>
                <Reveal>
                  <h2 className="detail-section-title">
                    {project.solution.name.split(" ").slice(0, -1).join(" ")} <em>{project.solution.name.split(" ").slice(-1)[0]}</em>.
                  </h2>
                </Reveal>
              </div>
              <div className="solution-list">
                {project.solution.components.map((c) => (
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

        {/* AXES (Get-Down) */}
        {project.axes && (
          <section className="detail-section">
            <div className="wrap">
              <div className="detail-section-head">
                <span className="detail-section-num">C · Axes de travail</span>
                <Reveal>
                  <h2 className="detail-section-title">
                    Trois <em>axes</em>.
                  </h2>
                </Reveal>
              </div>
              <AxesList axes={project.axes} />
            </div>
          </section>
        )}

        {/* METHODOLOGY (Get-Down) */}
        {project.methodology && (
          <section className="detail-section">
            <div className="wrap">
              <div className="detail-section-head">
                <span className="detail-section-num">D · Méthodologie</span>
                <Reveal>
                  <h2 className="detail-section-title">
                    Agile, <em>en sprints</em>.
                  </h2>
                </Reveal>
              </div>
              <div className="detail-grid">
                <div>
                  <span className="kicker">Approche</span>
                  <p style={{ marginTop: 8, fontFamily: "var(--display)", fontSize: 32, lineHeight: 1.1 }}>
                    {project.methodology.approach}
                  </p>
                  <span className="kicker" style={{ display: "block", marginTop: 24 }}>Outil</span>
                  <p style={{ marginTop: 8, fontFamily: "var(--display)", fontSize: 24 }}>
                    {project.methodology.tool}
                  </p>
                </div>
                <div>
                  <ol style={{ listStyle: "none" }}>
                    {project.methodology.phases.map((ph, i) => (
                      <li key={i} style={{
                        display: "grid",
                        gridTemplateColumns: "60px 1fr",
                        gap: 24,
                        padding: "20px 0",
                        borderTop: "1px solid var(--line)",
                        alignItems: "center"
                      }}>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--terracotta)" }}>
                          {String(i).padStart(2, "0")}
                        </span>
                        <span style={{ fontFamily: "var(--display)", fontSize: 22 }}>{ph}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TEAM (RP) */}
        {project.team && (
          <section className="detail-section">
            <div className="wrap">
              <div className="detail-section-head">
                <span className="detail-section-num">D · Équipe</span>
                <Reveal>
                  <h2 className="detail-section-title">
                    NextGen <em>Recruiters</em>.
                  </h2>
                </Reveal>
              </div>
              <Reveal className="team-grid" stagger>
                {project.team.map((m, i) => (
                  <div className="team-card" key={i}>
                    <span className="kicker">M-0{i + 1}</span>
                    <div className="name" style={{ marginTop: 12 }}>{m.name}</div>
                    <div className="role">{m.role}</div>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>
        )}

        {/* GALLERY */}
        {project.gallery && (
          <section className="detail-section">
            <div className="wrap">
              <div className="detail-section-head">
                <span className="detail-section-num">E · Galerie</span>
                <Reveal>
                  <h2 className="detail-section-title">
                    Aperçus <em>visuels</em>.
                  </h2>
                </Reveal>
              </div>
              <Reveal className="gallery-grid" stagger>
                {project.gallery.map((g, i) => (
                  <div key={i} className={`gallery-item ${g.span >= 8 ? `span-${g.span}` : g.span === 6 ? "span-6" : ""}`}>
                    <img src={g.src} alt={`Visuel ${i + 1}`} />
                  </div>
                ))}
              </Reveal>
            </div>
          </section>
        )}

        {/* NEXT PROJECT */}
        <section className="detail-section">
          <div className="wrap">
            <span className="eyebrow">Projet suivant · {next.num}</span>
            <a
              href="#"
              data-cursor="hover-lg"
              data-cursor-label="Lire"
              onClick={(e) => { e.preventDefault(); go("project", next.slug); }}
              style={{ display: "block", marginTop: 16 }}
            >
              <h2 style={{
                fontFamily: "var(--display)",
                fontWeight: 400,
                fontSize: "clamp(56px, 9vw, 144px)",
                lineHeight: 0.92,
                letterSpacing: "-0.02em",
                transition: "color .3s var(--ease)"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--terracotta)"}
              onMouseLeave={(e) => e.currentTarget.style.color = ""}>
                {next.title} <em style={{ color: "var(--terracotta)", fontStyle: "italic" }}>{next.titleEm}</em> <span style={{ fontStyle: "italic", color: "var(--ink-soft)" }}>↗</span>
              </h2>
            </a>
          </div>
        </section>

        <Footer />
      </article>
    </div>
  );
}

/* Accordion axes */
function AxesList({ axes }) {
  const [open, setOpen] = useStateD(0);
  return (
    <div className="axes-list">
      {axes.map((a, i) => (
        <div className={`axis-card ${open === i ? "open" : ""}`} key={i}>
          <button
            className="axis-card-head"
            data-cursor="hover"
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <span className="num">{a.num}</span>
            <span className="ttl">{a.title}</span>
            <span className="toggle">+</span>
          </button>
          <div className="axis-card-body">
            <div>
              <div className="axis-card-body-inner">
                <p>{a.desc}</p>
                <ul>
                  {a.items.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

window.ProjectDetailPage = ProjectDetailPage;
