// Portfolio data — Lohann Kasper
window.PROJECTS = [
  {
    id: "uefa",
    slug: "uefa",
    num: "01",
    year: "2024",
    title: "Stratégie de communication",
    titleEm: "UEFA × Amazon × MEI",
    subtitle: "Recrutement de coachs féminines",
    description: "Stratégie de communication digitale pour recruter de nouvelles coachs féminines et maximiser les leviers d'attraction.",
    cover: "images/maddli_1.png",
    coverLogo: "images/UEFA-logo.png",
    tags: ["Communication", "Stratégie", "Marketing", "Innovation"],
    featured: true,
    size: "lg",
    meta: {
      "Contexte": "PI25 — HEIG-VD",
      "Client": "UEFA × Amazon × MEI",
      "Rôle": "Stratégie & communication",
      "Reconnaissance": "Projet favori de l'UEFA"
    },
    links: [
      { label: "pi25.heig-vd.ch", href: "https://pi25.heig-vd.ch/en/projects/maddli" },
      { label: "whynotyou.ch", href: "https://whynotyou.ch" }
    ],
    intro: "Comment encourager une nouvelle génération de coachs féminines dans un milieu où elles manquent de modèles, de ressources et de reconnaissance ? Un dispositif de simulation, de mentorat et de communication, conçu pour l'UEFA.",
    tasks: [
      "Analyse des besoins et définition de la stratégie",
      "Conception d'une simulation de coach interactive",
      "Starter pack avec ressources et parcours d'onboarding",
      "Apprentissage gamifié sur tablette",
      "Support tablette pour activations terrain",
      "Projection dans le rôle de coach via roleplay"
    ],
    keyPoints: [
      { num: "01", title: "Contexte & défi", body: "Formation coûteuse, parcours peu clairs, environnements peu encourageants, manque de modèles féminins identifiables." },
      { num: "02", title: "Proposition", body: "Plateforme de simulation digitale avec mentorat et starter pack, soutenue par une vidéo de campagne immersive." },
      { num: "03", title: "Public cible", body: "Jeunes femmes avec potentiel de leadership, employées Amazon, participantes grassroots." },
      { num: "04", title: "Scalable & testé", body: "Activation tablette lors d'événements UEFA/ASF, contenu modulaire et multilingue." },
      { num: "05", title: "Communication", body: "Vidéo immersive multilingue, marketing de guérilla, stratégie de contenu alignée UEFA/ASF." },
      { num: "06", title: "Pourquoi ça fonctionne", body: "Gamification pour se projeter, accès direct aux mentors, parcours clairs renforçant confiance et action." }
    ],
    gallery: [
      { src: "images/maddli_0.png", span: 8 },
      { src: "images/maddli_2.png", span: 4 },
      { src: "images/maddli_1.png", span: 12 }
    ]
  },
  {
    id: "rp",
    slug: "rp",
    num: "02",
    year: "2025",
    title: "Stratégie d'innovation RH",
    titleEm: "Retraites Populaires",
    subtitle: "Crunch Time Innovation 2025",
    description: "Transformation du processus de recrutement des jeunes (15-20 ans) en une expérience interactive, inclusive et engageante.",
    cover: "images/rp4.png",
    tags: ["Innovation", "Design thinking", "Stratégie", "UX/UI", "RH"],
    featured: true,
    size: "md",
    meta: {
      "Contexte": "Crunch Time Innovation 2025",
      "Client": "Retraites Populaires",
      "Équipe": "NextGen Recruiters",
      "Durée": "5 jours · mars 2025"
    },
    intro: "Repenser un processus de recrutement traditionnel pour attirer la génération Z, en valorisant leurs soft skills à travers un portail immersif.",
    problem: "Retraites Populaires fait face à un processus de recrutement traditionnel qui peine à évaluer les candidats ayant peu d'expérience, et à un manque de notoriété auprès des jeunes.",
    reformulation: "Comment transformer le processus de recrutement des jeunes (15-20 ans) pour le rendre plus interactif, inclusif et engageant, tout en valorisant leurs compétences de manière innovante ?",
    tasks: [
      "Analyse des attentes de la génération Z (Qualinsight)",
      "Étude des pratiques concurrentes (Canton de Vaud, Bobst)",
      "Création d'un persona détaillé (Léo Dupont, 15 ans)",
      "Brainstorm individuel + brainwriting en équipe",
      "Définition de 3 idées finales présentées au client",
      "Conception d'une maquette POC fonctionnelle"
    ],
    solution: {
      name: "Portail de postulation NextGen",
      components: [
        { num: "01", title: "Portail de postulations", desc: "Espace centralisé où les candidats postulent via un processus simplifié et interactif." },
        { num: "02", title: "Questions mises en situation", desc: "Scénarios réalistes pour évaluer les soft skills de manière concrète." },
        { num: "03", title: "Test de personnalité", desc: "Questionnaire interactif (type MBTI) pour cerner les traits du candidat." },
        { num: "04", title: "Simulation communication", desc: "Réponse à un mail par écrit, puis présentation orale ou vidéo de Retraites Populaires." },
        { num: "05", title: "Spider chart", desc: "Visualisation des compétences sur 4 axes : communication, curiosité, autonomie, équipe." },
        { num: "06", title: "Chatbot postulations", desc: "Assistant virtuel répondant aux questions des candidats depuis le portail." }
      ]
    },
    team: [
      { name: "Lohann Kasper", role: "Ingénieur des médias" },
      { name: "Deniz Ispir", role: "Économiste d'entreprise" },
      { name: "Jérémy Sennwald", role: "Économiste d'entreprise" },
      { name: "Axel Antunes", role: "Ingénieur Dev Full Stack" },
      { name: "Julien Holzer", role: "Ingénieur logiciel" }
    ],
    gallery: [
      { src: "images/rp1.png", span: 12 },
      { src: "images/rp2.png", span: 6 },
      { src: "images/rp3.png", span: 6 },
      { src: "images/rp4.png", span: 4 },
      { src: "images/rp5.png", span: 4 },
      { src: "images/rp6.png", span: 4 },
      { src: "images/rp7.png", span: 6 },
      { src: "images/rp8.png", span: 6 }
    ]
  },
  {
    id: "getdown",
    slug: "getdown",
    num: "03",
    year: "2025",
    title: "Refonte web & digitalisation",
    titleEm: "The Get-Down",
    subtitle: "Travail de Bachelor — HEIG-VD",
    description: "Refonte complète du site, automatisation des inscriptions et stratégie de communication digitale pour une école de danse romande.",
    cover: "images/gd1.png",
    tags: ["Web", "UX/UI", "Communication", "Gestion de projet", "SEO"],
    featured: true,
    size: "lg",
    meta: {
      "Contexte": "Travail de Bachelor",
      "Client": "The Get-Down Sàrl",
      "Filière": "Ingénierie des médias",
      "Date": "Août 2025"
    },
    intro: "Une école de breakdance romande avec 180+ élèves, un site Wix de 2015 et un processus d'inscription 100% manuel. Refonte complète sur 4 sprints.",
    problem: "The Get-Down est active à Genève, Lausanne, Nyon et Gland avec plus de 180 élèves. Trois problèmes majeurs : un site Wix daté, un processus d'inscription manuel chronophage, et une communication digitale sans stratégie.",
    tasks: [
      "Audit UX selon les heuristiques de Nielsen",
      "Analyse PageSpeed et SEO (SEOptimer)",
      "Personas et empathy maps",
      "MVP en 3 étapes sur Jira",
      "Refonte WordPress — 12 pages",
      "Mobile responsive et multilingue",
      "Benchmark de 4 solutions d'inscription",
      "Intégration SportsNow et widgets",
      "Configuration abonnements et paiements",
      "Stratégie éditoriale digitale",
      "Photos professionnelles des professeurs"
    ],
    axes: [
      {
        num: "01",
        title: "Refonte du site web",
        desc: "Nouveau site WordPress avec thème optimisé, responsive, SEO amélioré et architecture d'information repensée selon les heuristiques de Nielsen.",
        items: ["Audit UX heuristiques Nielsen", "Analyse PageSpeed & SEO", "Personas et empathy map", "MVP en 3 étapes sur Jira", "12 pages complètes", "Mobile responsive", "Extensions multilingues"]
      },
      {
        num: "02",
        title: "Système d'inscription SportsNow",
        desc: "Remplacement du processus manuel (Excel, WhatsApp, virement) par la plateforme SportsNow intégrée directement au site.",
        items: ["Benchmark de 4 solutions", "Configuration abonnements et rabais", "Questionnaire de santé intégré", "Widget d'inscription sur le site", "Paiements en ligne", "180 inscriptions automatisées"]
      },
      {
        num: "03",
        title: "Stratégie de communication digitale",
        desc: "Structuration de la présence en ligne avec une ligne éditoriale claire, un calendrier de publication et des formats adaptés à chaque plateforme.",
        items: ["Analyse Instagram, Facebook, YouTube", "Choix des plateformes cibles", "Ligne éditoriale et charte", "Calendrier éditorial", "Formats par plateforme", "Recommandations TikTok"]
      }
    ],
    methodology: {
      approach: "Agile en sprints",
      tool: "Jira",
      phases: ["Pré-étude & analyse", "Sprint 1 — Choix logiciel + photos", "Sprint 2 — Site web", "Sprint 3 — SportsNow", "Sprint 4 — Communication"]
    },
    gallery: [
      { src: "images/gd0.png", span: 12 },
      { src: "images/gd1.png", span: 6 },
      { src: "images/gd2.png", span: 6 },
      { src: "images/gd3.png", span: 12 }
    ]
  }
];

window.TESTIMONIALS = [
  {
    quote: "Ils ont démontré des compétences remarquables en innovation, gestion de projet et travail d'équipe. Leur engagement et professionnalisme ont été exemplaires.",
    name: "Kelly Grilo",
    role: "Responsable RH — Retraites Populaires",
    avatar: "images/kelly.jpeg"
  },
  {
    quote: "Son dossier de maturité a été noté 6/6 — les solutions proposées sont d'une grande utilité pour les formateurs. Son professionnalisme et sa fiabilité ont été remarquables.",
    name: "Marie Kramer",
    role: "Référente de formation — CHUV",
    avatar: "images/marie-kramer.jpeg"
  }
];

window.SKILLS = [
  "Communication",
  "Marketing digital",
  "Design thinking",
  "Gestion de projet",
  "Innovation",
  "UX/UI",
  "Stratégie",
  "SEO"
];

window.ROLES = [
  "Communication",
  "Marketing",
  "Stratégie",
  "Design thinking"
];
