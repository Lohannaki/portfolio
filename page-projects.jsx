// Projects index page
const { useState: useStateP, useMemo: useMemoP, useEffect: useEffectP } = React;

function ProjectsPage({ go }) {
  useEffectP(() => { window.scrollTo(0, 0); }, []);

  const allTags = useMemoP(() => {
    const set = new Set();
    window.PROJECTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["Tous", ...Array.from(set)];
  }, []);

  const [filter, setFilter] = useStateP("Tous");

  const filtered = useMemoP(() => {
    if (filter === "Tous") return window.PROJECTS;
    return window.PROJECTS.filter((p) => p.tags.includes(filter));
  }, [filter]);

  // assign asymmetric sizes by index for a nice rhythm
  const sized = filtered.map((p, i) => {
    const pattern = ["lg", "md", "md", "lg", "sm", "md", "lg"];
    return { ...p, _size: pattern[i % pattern.length] };
  });

  return (
    <div className="page">
      {/* Header */}
      <header className="page-header wrap">
        <div className="page-header-grid">
          <div>
            <span className="eyebrow">Archive · 2024 — 2025</span>
            <Reveal>
              <h1 style={{ marginTop: 20 }}>
                Projets & <em>études</em>.
              </h1>
            </Reveal>
          </div>
          <div className="right">
            <p>
              L'ensemble de mes projets réalisés en filière Ingénierie des
              médias et lors de mandats externes. Filtrez par compétence pour
              affiner.
            </p>
          </div>
        </div>

        <div className="filter-bar">
          <span className="filter-label">Filtrer</span>
          {allTags.map((t) => (
            <button
              key={t}
              className={`filter-btn ${filter === t ? "active" : ""}`}
              data-cursor="hover"
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
          <span className="filter-count">{filtered.length} / {window.PROJECTS.length} projets</span>
        </div>
      </header>

      {/* Grid */}
      <section className="wrap" style={{ padding: "80px 56px 120px" }}>
        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", padding: 80, color: "var(--ink-soft)" }}>
            Aucun projet ne correspond à ce filtre.
          </p>
        ) : (
          <div className="proj-grid" key={filter /* re-mount for stagger anim */}>
            {sized.map((p, i) => (
              <FilterCard key={p.id} project={p} go={go} delay={i * 80} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

function FilterCard({ project, go, delay = 0 }) {
  return (
    <a
      className={`proj-card size-${project._size || "md"}`}
      href="#"
      data-cursor="hover-lg"
      data-cursor-label="Étude"
      onClick={(e) => { e.preventDefault(); go("project", project.slug); }}
      style={{
        animation: `pageIn .7s var(--ease-out) ${delay}ms both`
      }}
    >
      <div className="proj-card-cover">
        <img src={project.cover} alt={project.title} />
      </div>
      <div className="proj-card-meta">
        <div>
          <div className="proj-card-title">
            {project.title} <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>— {project.titleEm}</em>
          </div>
          <div className="proj-card-sub">{project.year} · {project.tags.slice(0, 3).join(" · ")}</div>
        </div>
        <span className="proj-card-num">{project.num}</span>
      </div>
    </a>
  );
}

window.ProjectsPage = ProjectsPage;
