import React, { useEffect, useRef, useState } from 'react'
import { ArrowUp, RotateCcw, MessageCircle } from 'lucide-react'
import { topics, replyFor } from './roleFitKnowledge'

export default function RoleFit({ priorities: messages, setPriorities: setMessages, resumeUrl }) {
  const [draft, setDraft] = useState('')
  const latest = useRef(null)
  const input = useRef(null)
  useEffect(() => { if (messages.length) latest.current?.scrollIntoView({ behavior: 'instant', block: 'nearest' }) }, [messages.length])
  function send(value) {
    const text = value.trim().slice(0, 1000)
    if (!text) return
    setMessages(current => [...current, text])
    setDraft('')
    input.current?.focus({ preventScroll: true })
  }
  return (
    <section className={`chatExperience ${messages.length ? 'hasMessages' : ''}`} aria-labelledby="fit-heading">
      <div className="chatIntro">

        <h1 id="fit-heading">What could we build together?</h1>
        <p>Explore my experience, one question at a time.</p>
      </div>
      {!messages.length && <div className="starterSection"><div className="starterGrid">{topics.map((topic, index) => <button key={topic.label} onClick={() => send(topic.label)}>{['APIs & backend', 'React interfaces', 'Deployments', 'Production support'][index]}</button>)}</div></div>}
      <div className="chatMessages" role="log" aria-label="Role fit conversation" aria-live="polite" aria-relevant="additions">
        {messages.map((message, index) => { const reply = replyFor(message); return <div className="chatTurn" key={`${index}-${message}`} ref={index === messages.length - 1 ? latest : undefined}>
          <div className="userMessage"><span className="srOnly">You: </span>{message}</div>
          <div className="assistantMessage"><span className="assistantAvatar"><MessageCircle size={17} /></span><div><div className="replyHeading">Portfolio guide <span>Curated answer</span></div>{reply.matches.map(answer => <article className="answerBlock" key={answer.label}><span className="answerSource">{answer.source}</span><h2>{answer.label}</h2><p>{answer.experience}</p><div className="interviewPrompt"><strong>A question to take into an interview</strong><p>{answer.question}</p></div></article>)}{reply.fallback && <p>{reply.fallback}</p>}<div className="replyLinks"><a href="#experience">View experience ↗</a>{resumeUrl && <a href={resumeUrl} download="Raphaela-Oliveira-Resume.pdf">Résumé ↓</a>}<a href="https://www.linkedin.com/in/raphaelaoliveirajava" target="_blank" rel="noreferrer">Let’s talk ↗</a></div></div></div>
        </div> })}
      </div>
      <div className="composerArea">{messages.length > 0 && <button className="restartChat" onClick={() => { setMessages([]); setDraft(''); input.current?.focus() }}><RotateCcw size={13} /> Start a new conversation</button>}
        <form className="chatComposer" onSubmit={event => { event.preventDefault(); send(draft) }}>
          <label className="srOnly" htmlFor="chat-question">Ask about Raphaela’s experience</label>
          <textarea ref={input} id="chat-question" rows={2} maxLength={1000} value={draft} onChange={event => setDraft(event.target.value)} placeholder="What would you like to know?" onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send(draft) } }} />
          <div className="composerBottom"><button type="submit" disabled={!draft.trim()} aria-label="Send message"><ArrowUp size={19} /></button></div>
        </form>
        <p className="chatDisclosure">Curated answers, not AI. Your messages stay in this browser.</p>
      </div>
    </section>
  )
}
