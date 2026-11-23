import React, { useEffect, useRef } from 'react'
import { Compass, Square } from 'lucide-react'
import {
  ThreadPrimitive, ComposerPrimitive, MessagePrimitive,
  useAui, useAuiState,
  AssistantRuntimeProvider, useLocalRuntime,
} from '@assistant-ui/react'
import { portfolioChatAdapter } from './chatAdapter'

function GuideMessage() {
  const isUser = useAuiState(state => state.message.role === 'user')
  return (
    <MessagePrimitive.Root className={`guideMessage ${isUser ? 'visitorMessage' : 'noteMessage'}`}>
      <span className="eyebrow">{isUser ? 'Your question' : 'Portfolio guide'}</span>
      <div className="messageText"><MessagePrimitive.Content /></div>
      <MessagePrimitive.Error><p role="alert">This response was interrupted. Please try your question again.</p></MessagePrimitive.Error>
    </MessagePrimitive.Root>
  )
}

function Guide({ question }) {
  const aui = useAui()
  const thread = aui.thread()
  const isRunning = useAuiState(state => state.thread.isRunning)
  const isEmpty = useAuiState(state => state.thread.isEmpty)
  const lastQuestion = useRef(null)
  useEffect(() => {
    if (!question || lastQuestion.current === question.id) return
    lastQuestion.current = question.id
    aui.thread().cancelRun()
    aui.thread().append({ role: 'user', content: [{ type: 'text', text: question.text }] })
  }, [aui, question])
  return (
    <section className="guidePage" aria-labelledby="guide-title">
      <div className="pageHeading"><span className="eyebrow"><Compass size={16} /> A conversation with context</span><h1 id="guide-title">Follow your curiosity.</h1><p>Ask about my work, a technical challenge or where my experience connects with yours.</p></div>
      <ThreadPrimitive.Root className="guideThread">
        {isEmpty && <div className="guideStarters">{[
          'How do you move spreadsheet-based work into a React interface?',
          'How does your Java and Kotlin experience connect to API design?',
          'What would you investigate when an API starts timing out?',
        ].map(prompt => <button className="textChoice" key={prompt} onClick={() => thread.append({ role: 'user', content: [{ type: 'text', text: prompt }] })}>{prompt}</button>)}</div>}
        <div className="guideMessages" role="log" aria-label="Conversation with the portfolio guide" aria-live="polite">
          <ThreadPrimitive.Messages components={{ UserMessage: GuideMessage, AssistantMessage: GuideMessage }} />
        </div>
        {isRunning && <p className="guideStatus" role="status">Connecting your question to my work…</p>}
        <ComposerPrimitive.Root className="guideComposer">
          <label className="eyebrow" htmlFor="guide-question">What would you like to explore?</label>
          <ComposerPrimitive.Input id="guide-question" placeholder="Ask a question about my work…" rows={3} maxLength={1000} submitOnEnter />
          <div className="composerActions"><span>Enter to send · Shift + Enter for a new line</span>{isRunning ? <ComposerPrimitive.Cancel className="button secondary"><Square size={14} /> Stop</ComposerPrimitive.Cancel> : <ComposerPrimitive.Send className="button primary">Ask the guide</ComposerPrimitive.Send>}</div>
        </ComposerPrimitive.Root>
        {!isEmpty && <button className="plainButton" onClick={() => { thread.cancelRun(); thread.reset() }}>Start a new conversation</button>}
      </ThreadPrimitive.Root>
      <p className="smallPrint">AI guide powered by Mastra. Responses may contain mistakes. Questions are sent to the AI provider. Curated notes are available when the guide is offline.</p>
    </section>
  )
}

export default function RoleFit({ question }) {
  const runtime = useLocalRuntime(portfolioChatAdapter)
  return <AssistantRuntimeProvider runtime={runtime}><Guide question={question} /></AssistantRuntimeProvider>
}
