const EDUCATION = [
  {
    period: '2024 — 2025',
    title: "Mémoire de fin d'études — Diplôme d'ingénieur",
    place: 'École Nationale Supérieure Polytechnique, Université de Yaoundé I',
    detail:
      "travail en évolution",
  },
]

const SKILLS = ['Python', 'Deep Learning', 'OCR', 'Computer Vision', 'SQL', 'React', 'PHP / Laravel']

export default function Resume() {
  return (
    <section id="resume" className="section">
      <p className="eyebrow">$ resume</p>
      <h2>Parcours</h2>

      <div className="resume-list">
        {EDUCATION.map((item) => (
          <article key={item.title} className="resume-item">
            <p className="resume-period">{item.period}</p>
            <h3>{item.title}</h3>
            <p className="resume-place">{item.place}</p>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>

      <h3 style={{ marginTop: '3rem' }}>Compétences</h3>
      <ul className="skills-list">
        {SKILLS.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  )
}
