const PROJECTS = [
  {
    title: "Validation d'identité par OCR + Deep Learning",
    description:
      "Extraction automatique d'informations depuis des pièces d'identité et vérification par reconnaissance d'image.",
  },
  {
    title: 'Ce portfolio — version React',
    description:
      'Site vitrine construit avec HTML5, React et JavaScript, comme projet d’apprentissage.',
  },
  {
    title: 'Ce portfolio — version Laravel',
    description:
      'La même interface, reconstruite avec PHP / Laravel, pour maîtriser le backend MVC.',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="section">
      <p className="eyebrow">$ portfolio</p>
      <h2>Projets</h2>

      <div className="project-grid">
        {PROJECTS.map((project) => (
          <article key={project.title} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
