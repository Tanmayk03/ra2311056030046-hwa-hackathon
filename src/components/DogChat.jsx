import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Dog, Send, X } from 'lucide-react'
import { chatSuggestions, findChatAnswer } from '../data/chatQuestions.js'

const GREETING = 'Hello! How can I help you?'

export default function DogChat({ open, onClose, returnFocusRef }) {
  const [messages, setMessages] = useState([
    { id: 'greeting', from: 'bot', answer: { paragraphs: [GREETING], links: [] } },
  ])
  const [draft, setDraft] = useState('')
  const nextId = useRef(1)
  const logRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus()
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
    })

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open || !logRef.current) return
    logRef.current.scrollTop = logRef.current.scrollHeight
  }, [messages, open])

  function ask(question) {
    const cleaned = question.trim()
    if (!cleaned) return

    const userMessage = { id: `user-${nextId.current++}`, from: 'user', text: cleaned }
    const botMessage = {
      id: `bot-${nextId.current++}`,
      from: 'bot',
      answer: findChatAnswer(cleaned),
    }

    setMessages((current) => [...current, userMessage, botMessage])
    setDraft('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    ask(draft)
  }

  function handleClose() {
    onClose()
    window.requestAnimationFrame(() => returnFocusRef?.current?.focus())
  }

  return (
    <div
      className="hwa-chat"
      hidden={!open}
      role="dialog"
      aria-labelledby="hwa-chat-title"
      aria-describedby="hwa-chat-note"
    >
      <div className="hwa-chat-header">
        <span className="hwa-chat-avatar" aria-hidden="true">
          <Dog size={20} />
        </span>
        <div className="min-w-0">
          <h2 id="hwa-chat-title" className="hwa-chat-title">
            Ask the retriever
          </h2>
          <p className="hwa-chat-subtitle">Answers from this site</p>
        </div>
        <button type="button" className="hwa-chat-close" onClick={handleClose} aria-label="Close chat">
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="hwa-chat-log" ref={logRef} role="log" aria-live="polite" aria-relevant="additions">
        {messages.map((message) =>
          message.from === 'user' ? (
            <div key={message.id} className="hwa-chat-row is-user">
              <p className="hwa-chat-bubble is-user">{message.text}</p>
            </div>
          ) : (
            <div key={message.id} className="hwa-chat-row is-bot">
              <div className="hwa-chat-bubble is-bot">
                {message.answer.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {message.answer.links.length > 0 && (
                  <div className="hwa-chat-links">
                    {message.answer.links.map((link) => (
                      <Link key={link.to} to={link.to} onClick={handleClose}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ),
        )}
      </div>

      {messages.length === 1 && (
        <div className="hwa-chat-suggestions" aria-label="Suggested questions">
          {chatSuggestions.map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => ask(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <form className="hwa-chat-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="hwa-chat-input">
          Type your question
        </label>
        <input
          id="hwa-chat-input"
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask a question…"
          autoComplete="off"
        />
        <button type="submit" disabled={!draft.trim()} aria-label="Send question">
          <Send size={17} aria-hidden="true" />
        </button>
      </form>

      <p id="hwa-chat-note" className="hwa-chat-note">
        Demo helper · answers come from this site · no message is sent
      </p>
    </div>
  )
}
