import { useState } from 'react'

const INITIAL_FORM = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [sent, setSent] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    // Étape suivante possible : envoyer `form` à une API (EmailJS,
    // ou un petit backend) plutôt que de simuler l'envoi ici.
    console.log('Formulaire envoyé :', form)
    setSent(true)
    setForm(INITIAL_FORM)
  }

  return (
    <section id="contact" className="section">
      <p className="eyebrow">$ contact</p>
      <h2>Contact</h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Nom
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>

        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          Message
          <textarea name="message" rows={4} value={form.message} onChange={handleChange} required />
        </label>

        <button type="submit">Envoyer</button>

        {sent && <p role="status">Message envoyé — merci !</p>}
      </form>
    </section>
  )
}
