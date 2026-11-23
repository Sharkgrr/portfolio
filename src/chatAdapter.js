import { replyFor } from './roleFitKnowledge.js'

export function curatedAnswer(question) {
  const reply = replyFor(question)
  const notes = reply.matches.map(note => `${note.source}\n${note.experience}\n\nA question to explore together\n${note.question}`)
  return ['The AI guide is unavailable. Here is a curated portfolio note.', ...notes, reply.fallback].filter(Boolean).join('\n\n')
}

export const portfolioChatAdapter = {
  async run({ messages, abortSignal }) {
    const history = messages
      .filter(message => message.role === 'user' || message.role === 'assistant')
      .slice(-11)
      .map(message => ({
        role: message.role,
        content: message.content.filter(part => part.type === 'text').map(part => part.text).join('\n').slice(0, 4000),
      }))
      .filter(message => message.content.trim())
    try {
      const response = await fetch(import.meta.env?.VITE_CHAT_API_URL || '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: AbortSignal.any([abortSignal, AbortSignal.timeout(35000)]),
      })
      if (!response.ok) throw new Error('Guide unavailable')
      const data = await response.json()
      if (!data.text?.trim()) throw new Error('Empty answer')
      return { content: [{ type: 'text', text: data.text }] }
    } catch (error) {
      if (abortSignal.aborted) throw error
      return { content: [{ type: 'text', text: curatedAnswer(history.at(-1)?.content || '') }] }
    }
  },
}
