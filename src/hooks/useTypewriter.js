import { useEffect, useState } from 'react'

/**
 * useTypewriter — fait défiler une liste de mots lettre par lettre,
 * comme "Je suis Data Scientist|" sur le site d'origine.
 *
 * C'est un bon premier exercice React : il montre comment gérer
 * un état qui évolue dans le temps avec useEffect + setTimeout,
 * et comment nettoyer un effet (cleanup function).
 */
export function useTypewriter(words, { typingSpeed = 90, pause = 1400, deletingSpeed = 45 } = {}) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex % words.length]

    let timeout

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setWordIndex((i) => i + 1)
    } else {
      timeout = setTimeout(
        () => {
          const nextLength = text.length + (isDeleting ? -1 : 1)
          setText(currentWord.slice(0, nextLength))
        },
        isDeleting ? deletingSpeed : typingSpeed,
      )
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, pause, deletingSpeed])

  return text
}
