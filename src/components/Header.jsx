import { useEffect, useRef } from 'react'
import { useTypewriter } from '../hooks/useTypewriter.js'

/**
 * NetworkCanvas — l'élément "signature" du design : un fond de
 * points reliés qui évoquent un graphe de données / réseau de
 * neurones, discret, en lien direct avec le métier de Data Scientist.
 * Pur Canvas 2D, aucune librairie externe : bon exercice JS/React
 * (useRef + requestAnimationFrame + cleanup).
 */
function NetworkCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let nodes = []

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const count = Math.floor((canvas.width * canvas.height) / 18000)
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(198, 116, 31, 0.55)' // --accent
      ctx.strokeStyle = 'rgba(198, 116, 31, 0.15)'

      for (const node of nodes) {
        if (!prefersReducedMotion) {
          node.x += node.vx
          node.y += node.vy
          if (node.x < 0 || node.x > canvas.width) node.vx *= -1
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < 120) {
            ctx.globalAlpha = 1 - dist / 120
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      for (const node of nodes) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="network-canvas" aria-hidden="true" />
}

export default function Header({ onOpenMenu }) {
  const role = useTypewriter(['Data Scientist', 'Ingénieur Machine Learning', 'Développeur'])

  return (
    <header id="accueil" className="hero">
      <NetworkCanvas />

      <button className="menu-button" onClick={onOpenMenu} aria-label="Ouvrir le menu">
        <span />
        <span />
        <span />
      </button>

      <div className="hero-content">
        <p className="eyebrow">$ portfolio</p>
        <h1>ONONO MBITA Hyacinthe Hugues</h1>
        <p className="hero-role">
          Je suis <span className="hero-role-accent">{role}</span>
          <span className="hero-cursor">|</span>
        </p>
      </div>

      <img src="/hugues1.jpeg" alt="" className="hero-photo" aria-hidden="true" />
    </header>
  )
}
