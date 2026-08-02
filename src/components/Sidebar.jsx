const LINKS = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#a-propos', label: 'À propos' },
  { href: '#resume', label: 'Resume' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

export default function Sidebar({ open, onClose }) {

  function handleLinkClick(event, href){

    event.preventDefault()
    
    const container =document.getElementById('scrollContainer')

    const target=document.querySelector(href)

    if(container && target){
      container.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth', })
    }
    onClose()
  }

  return (
    <>
      {/* overlay cliquable pour fermer sur mobile */}
      <div
        className={`sidebar-overlay ${open ? 'is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`sidebar ${open ? 'is-open' : ''}`} aria-label="Navigation principale">
        <button className="sidebar-close" onClick={onClose} aria-label="Fermer le menu">
          ✕
        </button>

        <div className="sidebar-profile">
          <img
            src="/hugues1.jpeg"
            alt="Portrait de ONONO Hugues"
            className="sidebar-avatar"
          />
          <h3>ONONO MBITA hyacinthe hugues</h3>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>
            $ data-scientist
            $ Ingénieur IA
          </p>
        </div>

        <nav>
          <ul className="sidebar-nav">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={(event) => handleLinkClick(event, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-social">
          <a href="#" aria-label="Facebook">
            Facebook
          </a>
          <a href="#" aria-label="LinkedIn">
            LinkedIn
          </a>
        </div>
      </aside>
    </>
  )
}
