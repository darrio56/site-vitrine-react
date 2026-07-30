import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import About from './components/About.jsx'
import Resume from './components/Resume.jsx'
import Portfolio from './components/Portfolio.jsx'
import Services from './components/Services.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Header onOpenMenu={() => setMenuOpen(true)} />
      <main>
        <About />
        <Resume />
        <Portfolio />
        <Services />
        <Contact />
      </main>
    </>
  )
}
