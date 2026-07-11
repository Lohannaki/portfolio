// Projects index page
const { useState: useStateP, useMemo: useMemoP, useEffect: useEffectP } = React;

function ProjectsPage({ go }) {
  useEffectP(() => { window.scrollTo(0, 0); }, []);
  const lang = useLang();
  const TP = window.I18N[lang].projects;
  const ALL = TP.filterAll;

  const allTags = useMemoP(() => {
    const set = new Set();
    window.PROJECTS.forEach(p => p.tags.forEach(t => set.add(t)));
    return [ALL, ...Array.from(set)];
  }, [ALL]);

  const [filter, setFilter] = useStateP(ALL);
  useEffectP(() => { setFilter(ALL); }, [ALL]);

  const filtered = useMemoP(() =>
    filter === ALL ? window.PROJECTS : window.PROJECTS.filter(p => p.tags.includes(filter)),
    [filter, ALL]
  );

  return (
    <div className="page">
      <header className="page-header wrap">
        <div className="page-header-grid">
          <div>
            <span className="eyebrow">{TP.eyebrow}</span>
            <Reveal>
              <h1 style={{ marginTop: 20 }}>{TP.heading} <em>{TP.headingEm}</em></h1>
            </Reveal>
          </div>
          <div className="right"><p>{TP.desc}</p></div>
        </div>
        <div className="filter-bar">
          <span className="filter-label">{TP.filterLabel}</span>
          {allTags.map(t => (
            <button key={t} className={`filter-btn ${filter === t ? "active" : ""}`}
              data-cursor="hover" onClick={() => setFilter(t)}>{t}</button>
          ))}
          <span className="filter-count">{TP.count(filtered.length, window.PROJECTS.length)}</span>
        </div>
      </header>

      <section className="wrap" style={{ padding: "80px 56px 120px" }}>
        {filtered.length === 0
          ? <p style={{ textAlign:"center", padding:80, color:"var(--ink-soft)" }}>{TP.empty}</p>
          : (
            <div className="proj-grid" key={filter}>
              {filtered.map((p, i) => (
                <FilterCard key={p.id} project={p} go={go} delay={i * 80} label={TP.cardLabel} />
              ))}
            </div>
          )
        }
      </section>
      <Footer />
    </div>
  );
}

function FilterCard({ project, go, delay = 0, label }) {
  return (
    <a className="proj-card size-md" href="#"
      data-cursor="hover-lg" data-cursor-label={label}
      onClick={(e) => { e.preventDefault(); go("project", project.slug); }}
      style={{ animation: `pageIn .7s var(--ease-out) ${delay}ms both` }}>
      <div className="proj-card-cover"><img src={project.cover} alt={project.title} /></div>
      <div className="proj-card-meta">
        <div>
          <div className="proj-card-title">{project.title} <em style={{ fontStyle:"italic", color:"var(--terracotta)" }}>— {project.titleEm}</em></div>
          <div className="proj-card-sub">{project.year} · {project.tags.slice(0, 3).join(" · ")}</div>
        </div>
        <span className="proj-card-num">{project.num}</span>
      </div>
    </a>
  );
}

window.ProjectsPage = ProjectsPage;
