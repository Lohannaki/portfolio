// Main App — Lohann Kasper Portfolio
const { useState: useStateApp, useEffect: useEffectApp } = React;

function App() {
  // route: "home" | "projects" | "project"
  // payload: slug for project; for home: optional scroll target
  const initial = parseHash();
  const [route, setRoute] = useStateApp(initial.route);
  const [payload, setPayload] = useStateApp(initial.payload);
  const [scrollTarget, setScrollTarget] = useStateApp(null);

  function parseHash() {
    const h = window.location.hash.replace(/^#\/?/, "");
    if (!h) return { route: "home", payload: null };
    const parts = h.split("/");
    if (parts[0] === "projects") return { route: "projects", payload: null };
    if (parts[0] === "project" && parts[1]) return { route: "project", payload: parts[1] };
    if (parts[0] === "home") return { route: "home", payload: parts[1] || null };
    return { route: "home", payload: null };
  }

  function go(target, opt) {
    if (target === "project") {
      window.location.hash = `#/project/${opt}`;
      setRoute("project");
      setPayload(opt);
      setScrollTarget(null);
    } else if (target === "projects") {
      window.location.hash = "#/projects";
      setRoute("projects");
      setPayload(null);
      setScrollTarget(null);
    } else if (target === "home") {
      window.location.hash = opt ? `#/home/${opt}` : "#/";
      setRoute("home");
      setPayload(null);
      setScrollTarget(opt || null);
    }
  }

  useEffectApp(() => {
    const onHash = () => {
      const r = parseHash();
      setRoute(r.route);
      setPayload(r.payload);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <React.Fragment>
      <Cursor />
      <Nav route={route} go={go} />
      <main key={`${route}-${payload}`}>
        {route === "home" && <HomePage go={go} scrollTo={scrollTarget} />}
        {route === "projects" && <ProjectsPage go={go} />}
        {route === "project" && <ProjectDetailPage slug={payload} go={go} />}
      </main>
    </React.Fragment>
  );
}

// Mount — Babel-transformed scripts run after DOMContentLoaded, so mount immediately.
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
setTimeout(() => {
  const boot = document.getElementById("boot");
  if (boot) {
    boot.style.transition = "opacity .5s ease";
    boot.style.opacity = "0";
    setTimeout(() => boot.remove(), 600);
  }
}, 200);
