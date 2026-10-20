import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  accessConfigured,
  correctBirthday,
  createMusicSession,
  musicBase,
  musicDestination,
  SESSION_SECONDS,
  validMusicSession
} from '../lib/music-access.js'

const now = Date.UTC(2026, 9, 20)
process.env.MUSIC_SESSION_SECRET =
  'test-only-secret-with-at-least-32-characters'
process.env.MUSIC_BIRTHDATE = '1999-01-15'
process.env.LISTENING_HOST = 'music.example.com'

test('only the exact birthday succeeds', () => {
  assert.equal(correctBirthday('1999-01-15'), true)
  for (const value of [
    '1999-01-14',
    '1998-01-15',
    '15/01/1999',
    '',
    null,
    '1999-01-15 '
  ])
    assert.equal(correctBirthday(value), false)
})

test('sessions expire, reject tampering, and do not contain the birthday', () => {
  const token = createMusicSession(now)
  assert.equal(validMusicSession(token, now), true)
  assert.equal(validMusicSession(token, now + SESSION_SECONDS * 1000 - 1), true)
  assert.equal(validMusicSession(token, now + SESSION_SECONDS * 1000), false)
  assert.equal(validMusicSession(token, now - 1000), false)
  const [scope, version, expires, sig] = token.split('.')
  assert.equal(
    validMusicSession(
      `${scope}.${version}.${expires}.${sig[0] === 'a' ? 'b' : 'a'}${sig.slice(1)}`,
      now
    ),
    false
  )
  assert.equal(token.includes('1999'), false)
  for (const value of [
    undefined,
    '',
    'true',
    `${token}x`,
    token.replace('music.v1', 'music.v2'),
    `${token.slice(0, -1)}!`,
    'x'.repeat(200)
  ])
    assert.equal(validMusicSession(value, now), false)
})

test('rotating the secret revokes existing sessions', () => {
  const old = process.env.MUSIC_SESSION_SECRET
  const token = createMusicSession(now)
  process.env.MUSIC_SESSION_SECRET =
    'another-test-secret-with-at-least-32-characters'
  assert.equal(validMusicSession(token, now), false)
  process.env.MUSIC_SESSION_SECRET = old
})

test('missing configuration fails closed', () => {
  const old = process.env.MUSIC_SESSION_SECRET
  const token = createMusicSession(now)
  delete process.env.MUSIC_SESSION_SECRET
  assert.equal(Boolean(accessConfigured()), false)
  assert.equal(validMusicSession(token, now), false)
  assert.equal(correctBirthday('1999-01-15'), false)
  assert.throws(() => createMusicSession(now))
  process.env.MUSIC_SESSION_SECRET = old
})

test('return paths stay within the music section on either host', () => {
  assert.equal(musicBase('music.example.com:3000'), '')
  assert.equal(musicBase('www.example.com'), '/listening')
  assert.equal(
    musicDestination('/tracks?range=30d', 'music.example.com'),
    '/tracks?range=30d'
  )
  assert.equal(
    musicDestination('/listening/player', 'localhost:3000'),
    '/listening/player'
  )
  for (const value of [
    'https://evil.example',
    '//evil.example',
    '/\\evil.example',
    '/api/listening/access',
    '/unlock',
    '/listening/unlock',
    '/\nevil'
  ]) {
    assert.equal(musicDestination(value, 'music.example.com'), '/')
    assert.equal(musicDestination(value, 'localhost:3000'), '/listening')
  }
  assert.equal(musicDestination('/blogs', 'localhost:3000'), '/listening')
})
