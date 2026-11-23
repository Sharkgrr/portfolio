import test from 'node:test'
import assert from 'node:assert/strict'
import { portfolioChatAdapter } from '../src/chatAdapter.js'

const userMessage = text => ({ role: 'user', content: [{ type: 'text', text }] })

test('the chat adapter sends bounded recent text history to the Mastra endpoint', async t => {
  let request
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    request = { url, ...options }
    return { ok: true, json: async () => ({ text: 'A grounded answer.' }) }
  })
  const result = await portfolioChatAdapter.run({
    messages: Array.from({ length: 15 }, (_, index) => userMessage(`API question ${index}`)),
    abortSignal: new AbortController().signal,
  })
  assert.equal(request.url, '/api/chat')
  const payload = JSON.parse(request.body)
  assert.equal(payload.messages.length, 11)
  assert.equal(payload.messages[0].content, 'API question 4')
  assert.equal(payload.messages.at(-1).role, 'user')
  assert.equal(result.content[0].text, 'A grounded answer.')
})

test('server errors and empty answers recover with explicit curated portfolio notes', async t => {
  for (const response of [
    { ok: false },
    { ok: true, json: async () => ({ text: ' ' }) },
  ]) {
    const mock = t.mock.method(globalThis, 'fetch', async () => response)
    const result = await portfolioChatAdapter.run({
      messages: [userMessage('Java API')],
      abortSignal: new AbortController().signal,
    })
    assert.match(result.content[0].text, /AI guide is unavailable/)
    assert.match(result.content[0].text, /Itaú Unibanco/)
    mock.mock.restore()
  }
})

test('cancelling a request propagates cancellation instead of displaying a fallback', async t => {
  const controller = new AbortController()
  controller.abort()
  t.mock.method(globalThis, 'fetch', async () => { throw controller.signal.reason })
  await assert.rejects(portfolioChatAdapter.run({
    messages: [userMessage('React')], abortSignal: controller.signal,
  }), { name: 'AbortError' })
})
