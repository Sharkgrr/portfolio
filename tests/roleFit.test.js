import test from 'node:test'
import assert from 'node:assert/strict'
import { topics, replyFor } from '../src/roleFitKnowledge.js'

test('every starter returns its corresponding curated answer', () => {
  for (const topic of topics) assert.equal(replyFor(topic.label).matches[0], topic)
})
test('free text can match two relevant topics', () => {
  assert.equal(replyFor('We use Java and React').matches.length, 2)
})
test('production questions match production support', () => {
  assert.equal(replyFor('Investigate production issues').matches[0].label, 'Investigate production issues')
})
test('unsupported prompts get an honest fallback, never invented facts', () => {
  assert.equal(replyFor('What is your salary?').matches.length, 0)
  assert.match(replyFor('What is your salary?').fallback, /don’t have a prepared answer/)
})
