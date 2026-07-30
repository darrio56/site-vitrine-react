const SERVICES = [
  { title: 'Analyse de données', description: 'Nettoyage, exploration et visualisation de jeux de données.' },
  { title: 'Machine Learning', description: 'Conception et entraînement de modèles prédictifs.' },
  { title: 'Vision par ordinateur', description: "Reconnaissance d'image, OCR, extraction d'information." },
]

export default function Services() {
  return (
    <section id="services" className="section">
      <p className="eyebrow">$ services</p>
      <h2>Services</h2>

      <div className="project-grid">
        {SERVICES.map((service) => (
          <article key={service.title} className="project-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
