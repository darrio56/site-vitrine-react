// ChatWidget.jsx
// -----------------------------------------------------------------------------
// Widget de chat flottant qui permet aux visiteurs de mon portfolio de poser
// des questions à un assistant IA (qui connaît mes infos : compétences, projets, etc.)
// Ce composant ne fait QUE l'affichage + les appels réseau : toute la logique IA
// (appel à Claude) est gérée côté Laravel, dans la route /api/chat.
// -----------------------------------------------------------------------------

// On importe "useState" (pour gérer l'état local du composant : messages, input...)
// et "useRef" (pour faire défiler automatiquement vers le dernier message)
import { useState, useRef, useEffect } from "react";

// On importe le fichier de styles associé à ce composant
import "./ChatWidget.css";

// -----------------------------------------------------------------------------
// Composant principal : ChatWidget
// -----------------------------------------------------------------------------
export default function ChatWidget() {
  // --- États (state) du composant ---

  // isOpen : détermine si la fenêtre de chat est ouverte ou repliée (juste la bulle)
  const [isOpen, setIsOpen] = useState(false);

  // messages : tableau qui contient tout l'historique de la conversation
  // Chaque message est un objet : { role: "user" | "assistant", content: "texte" }
  // On démarre avec un message d'accueil de la part de l'assistant
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Salut ! Pose-moi une question sur mon parcours, mes compétences ou mes projets.",
    },
  ]);

  // inputValue : contient le texte que l'utilisateur est en train de taper
  const [inputValue, setInputValue] = useState("");

  // isLoading : true pendant qu'on attend la réponse de l'API (pour afficher "...")
  const [isLoading, setIsLoading] = useState(false);

  // error : contient un message d'erreur si l'appel API échoue, sinon null
  const [error, setError] = useState(null);

  // messagesEndRef : référence vers un élément invisible en bas de la liste,
  // utilisée pour faire défiler automatiquement vers le dernier message
  const messagesEndRef = useRef(null);

  // --- Effet : défilement automatique ---
  // À chaque fois que "messages" change (nouveau message ajouté),
  // on fait défiler la fenêtre de chat vers le bas
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // --- Fonction : envoyer un message ---
  // Cette fonction est appelée quand l'utilisateur clique sur "Envoyer"
  // ou appuie sur Entrée
  const sendMessage = async () => {
    // On ne fait rien si le champ est vide (ou ne contient que des espaces)
    const trimmed = inputValue.trim();
    if (trimmed === "" || isLoading) return;

    // On crée l'objet représentant le message de l'utilisateur
    const userMessage = { role: "user", content: trimmed };

    // On ajoute ce message à l'historique existant
    // On utilise la forme "fonction" de setMessages (prev => ...) pour être sûr
    // de partir du dernier état à jour, même si plusieurs mises à jour s'enchaînent
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    // On vide le champ de saisie immédiatement (meilleure UX)
    setInputValue("");

    // On active l'indicateur de chargement et on réinitialise l'erreur
    setIsLoading(true);
    setError(null);

    try {
      // Appel HTTP vers l'API Laravel (route définie côté back-end)
      // On envoie tout l'historique pour que l'assistant ait le contexte complet
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      // Si le serveur répond avec un code d'erreur HTTP (4xx, 5xx)
      if (!response.ok) {
        throw new Error("Le serveur a répondu avec une erreur.");
      }

      // On parse la réponse JSON envoyée par Laravel
      // On s'attend à recevoir quelque chose comme : { reply: "texte de la réponse" }
      const data = await response.json();

      // On ajoute la réponse de l'assistant à l'historique des messages
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      // En cas d'échec réseau ou d'erreur serveur, on affiche un message d'erreur
      setError("Impossible de contacter l'assistant pour le moment. Réessaie dans un instant.");
    } finally {
      // Que ça réussisse ou échoue, on désactive l'indicateur de chargement
      setIsLoading(false);
    }
  };

  // --- Fonction : gérer la touche "Entrée" dans le champ de saisie ---
  const handleKeyDown = (e) => {
    // Si la touche pressée est "Enter" ET qu'on ne maintient pas Shift
    // (Shift+Entrée permettrait un saut de ligne, comportement classique des chats)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Empêche le saut de ligne par défaut
      sendMessage();
    }
  };

  // --- Rendu du composant ---
  return (
    <div className="chat-widget">
      {/* Bulle flottante : visible quand le chat est fermé */}
      {!isOpen && (
        <button
          className="chat-bubble"
          onClick={() => setIsOpen(true)}
          aria-label="Ouvrir le chat"
        >
          💬
        </button>
      )}

      {/* Fenêtre de chat complète : visible seulement si isOpen est vrai */}
      {isOpen && (
        <div className="chat-window">
          {/* En-tête de la fenêtre avec titre et bouton de fermeture */}
          <div className="chat-header">
            <span>Assistant IA</span>
            <button
              className="chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le chat"
            >
              ✕
            </button>
          </div>

          {/* Zone d'affichage des messages */}
          <div className="chat-messages">
            {/* On parcourt le tableau "messages" et on affiche chaque message */}
            {messages.map((msg, index) => (
              <div
                key={index}
                // La classe CSS change selon que c'est l'utilisateur ou l'assistant
                // (permet d'aligner et de colorer différemment les bulles)
                className={`chat-message ${msg.role === "user" ? "chat-message-user" : "chat-message-assistant"}`}
              >
                {msg.content}
              </div>
            ))}

            {/* Indicateur "en train d'écrire" pendant le chargement */}
            {isLoading && (
              <div className="chat-message chat-message-assistant chat-message-loading">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            )}

            {/* Affichage d'un message d'erreur si l'appel API a échoué */}
            {error && <div className="chat-error">{error}</div>}

            {/* Élément invisible utilisé comme cible pour le défilement automatique */}
            <div ref={messagesEndRef} />
          </div>

          {/* Zone de saisie du message */}
          <div className="chat-input-area">
            <textarea
              className="chat-input"
              placeholder="Écris ton message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              className="chat-send"
              onClick={sendMessage}
              disabled={isLoading || inputValue.trim() === ""}
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
