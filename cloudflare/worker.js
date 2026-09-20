const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8' }
const CORS_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-headers': 'Content-Type, Authorization',
  'access-control-expose-headers': 'Authorization'
}
const encoder = new TextEncoder()

function json (value, status = 200, headers = {}) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { ...JSON_HEADERS, ...CORS_HEADERS, ...headers }
  })
}

function empty (status = 204) {
  return new Response(null, { status, headers: CORS_HEADERS })
}

function textValue (value, maxLength, fallback = '') {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : fallback
}

function base64Url (bytes) {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function randomToken () {
  return base64Url(crypto.getRandomValues(new Uint8Array(32)))
}

async function passwordHash (password, salt = base64Url(crypto.getRandomValues(new Uint8Array(16)))) {
  const iterations = 120000
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: encoder.encode(salt), iterations },
    key,
    256
  )
  return `pbkdf2$${iterations}$${salt}$${base64Url(new Uint8Array(bits))}`
}

async function passwordMatches (password, stored) {
  const [, , salt] = String(stored).split('$')
  return Boolean(salt) && (await passwordHash(password, salt)) === stored
}

async function readBody (request) {
  try {
    return await request.json()
  } catch {
    return {}
  }
}

function parseTags (value) {
  if (Array.isArray(value)) return value.flat().map(tag => textValue(String(tag), 40)).filter(Boolean).slice(0, 8)
  if (typeof value === 'string') return value.split(',').map(tag => textValue(tag, 40)).filter(Boolean).slice(0, 8)
  return []
}

function dbTags (value) {
  try {
    const parsed = JSON.parse(value || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function createSession (db, userId) {
  const token = randomToken()
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  await db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)').bind(token, userId, expiresAt).run()
  return token
}

async function sessionUser (request, db) {
  const token = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '')
  if (!token) return null
  return db.prepare(`
    SELECT u.id, u.name, u.email, u.password_hash
    FROM sessions s JOIN users u ON u.id = s.user_id
    WHERE s.token = ? AND s.expires_at > ?
  `).bind(token, new Date().toISOString()).first()
}

function cardFromRow (row) {
  return {
    id: row.id,
    recto: row.recto,
    verso: row.verso,
    created_at: row.created_at,
    deck_id: row.deck_id,
    deckId: row.deck_id,
    deckTitle: row.deck_title
  }
}

async function cardsForDeck (db, deckId) {
  const rows = (await db.prepare('SELECT * FROM cards WHERE deck_id = ? ORDER BY id').bind(deckId).all()).results
  return rows.map(cardFromRow)
}

async function deckById (db, deckId) {
  const deck = await db.prepare('SELECT * FROM decks WHERE id = ?').bind(deckId).first()
  if (!deck) return null
  return { id: deck.id, title: deck.title, tags: dbTags(deck.tag), cards: await cardsForDeck(db, deck.id) }
}

async function listDecks (db, userId = null, withCards = false) {
  const where = userId === null ? '' : 'WHERE d.user_id = ?'
  const statement = db.prepare(`
    SELECT d.id, d.title, d.created_at, d.tag, d.user_id, count(c.id) AS card_number
    FROM decks d LEFT JOIN cards c ON c.deck_id = d.id
    ${where}
    GROUP BY d.id
    ORDER BY d.id
  `)
  const rows = (await (userId === null ? statement.all() : statement.bind(userId).all())).results
  const decks = []
  for (const row of rows) {
    const deck = { ...row, tag: dbTags(row.tag), card_number: Number(row.card_number) }
    if (withCards) {
      deck.tags = deck.tag
      deck.cards = await cardsForDeck(db, deck.id)
    }
    decks.push(deck)
  }
  return decks
}

async function userPayload (db, user) {
  const delayed = (await db.prepare('SELECT card_id FROM delays WHERE user_id = ? AND to_date > ?')
    .bind(user.id, new Date().toISOString()).all()).results
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    decks: await listDecks(db, user.id, true),
    delayedCards: delayed.map(row => row.card_id)
  }
}

async function requireUser (request, env) {
  return sessionUser(request, env.DB)
}

async function handlePublic (request, env, path) {
  if (path === '/v1/decks' && request.method === 'GET') return json(await listDecks(env.DB))

  const deckMatch = path.match(/^\/v1\/deck\/(\d+)$/)
  if (deckMatch && request.method === 'GET') {
    const deck = await deckById(env.DB, Number(deckMatch[1]))
    return deck ? json(deck) : json('Ce paquet n’existe pas', 404)
  }
  return null
}

async function handleAuth (request, env, path) {
  if (path === '/v1/signup' && request.method === 'POST') {
    const body = await readBody(request)
    const name = textValue(body.name, 60)
    const email = textValue(body.email, 160).toLowerCase()
    const password = typeof body.password === 'string' ? body.password : ''
    if (!name || !email || password.length < 8) return json('Nom, e-mail et mot de passe de 8 caractères minimum requis', 400)
    const exists = await env.DB.prepare('SELECT id FROM users WHERE email = ? OR name = ?').bind(email, name).first()
    if (exists) return json('Ce nom ou cet e-mail est déjà utilisé', 409)

    const result = await env.DB.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)')
      .bind(name, email, await passwordHash(password)).run()
    const token = await createSession(env.DB, result.meta.last_row_id)
    return json({ message: `New user ${name} is registered` }, 201, { Authorization: token })
  }

  if (path === '/v1/login' && request.method === 'POST') {
    const body = await readBody(request)
    const user = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(textValue(body.email, 160).toLowerCase()).first()
    if (!user || !(await passwordMatches(String(body.password || ''), user.password_hash))) {
      return json('Identifiant ou mot de passe inconnu', 401)
    }
    const token = await createSession(env.DB, user.id)
    return json(await userPayload(env.DB, user), 200, { Authorization: token })
  }

  if (path === '/v1/user/infos' && request.method === 'GET') {
    const user = await requireUser(request, env)
    if (!user) return json('Session invalide ou expirée', 401)
    const token = request.headers.get('authorization') || ''
    return json(await userPayload(env.DB, user), 200, { Authorization: token })
  }

  if (path === '/v1/user/update' && request.method === 'POST') {
    const user = await requireUser(request, env)
    if (!user) return json('Session invalide ou expirée', 401)
    const body = await readBody(request)
    if (!(await passwordMatches(String(body.currentPassword || ''), user.password_hash))) return json('Mot de passe actuel incorrect', 403)
    const name = textValue(body.name, 60, user.name) || user.name
    const email = textValue(body.email, 160, user.email).toLowerCase() || user.email
    const password = textValue(body.newPassword, 200)
    const hash = password ? await passwordHash(password) : user.password_hash
    try {
      await env.DB.prepare('UPDATE users SET name = ?, email = ?, password_hash = ? WHERE id = ?')
        .bind(name, email, hash, user.id).run()
    } catch {
      return json('Ce nom ou cet e-mail est déjà utilisé', 409)
    }
    return json({ message: `User ${name} has been updated` })
  }

  return null
}

async function handleUserData (request, env, path) {
  const user = await requireUser(request, env)
  if (!user) return json('Session invalide ou expirée', 401)

  if (path === '/v1/user/cards' && request.method === 'GET') return json(await listDecks(env.DB, user.id, true))

  if (path === '/v1/deck' && request.method === 'POST') {
    const body = await readBody(request)
    const title = textValue(body.title, 120)
    const tags = JSON.stringify(parseTags(body.tag))
    if (!title) return json('Le titre est requis', 400)
    if (body.id) {
      const owned = await env.DB.prepare('SELECT id FROM decks WHERE id = ? AND user_id = ?').bind(Number(body.id), user.id).first()
      if (!owned) return json('Vous ne pouvez pas modifier ce paquet', 403)
      await env.DB.prepare('UPDATE decks SET title = ?, tag = ? WHERE id = ?').bind(title, tags, owned.id).run()
      return json({ deckId: owned.id, status: 'updated' })
    }
    const result = await env.DB.prepare('INSERT INTO decks (title, tag, user_id) VALUES (?, ?, ?)').bind(title, tags, user.id).run()
    return json({ deckId: result.meta.last_row_id, status: 'saved' }, 201)
  }

  const deckMatch = path.match(/^\/v1\/deck\/(\d+)$/)
  if (deckMatch && request.method === 'DELETE') {
    const result = await env.DB.prepare('DELETE FROM decks WHERE id = ? AND user_id = ?').bind(Number(deckMatch[1]), user.id).run()
    if (!result.meta.changes) return json('Vous ne pouvez pas supprimer ce paquet', 403)
    return json({ id: Number(deckMatch[1]), status: 'deleted' })
  }

  if (path === '/v1/card' && request.method === 'POST') {
    const body = await readBody(request)
    const recto = textValue(body.recto, 20000)
    const verso = textValue(body.verso, 20000)
    const deckId = Number(body.deckId)
    if (!recto || !verso || !deckId) return json('Le recto, le verso et le paquet sont requis', 400)
    const deck = await env.DB.prepare('SELECT id FROM decks WHERE id = ? AND user_id = ?').bind(deckId, user.id).first()
    if (!deck) return json('Vous ne pouvez pas modifier ce paquet', 403)
    if (body.id) {
      const card = await env.DB.prepare(`
        SELECT c.id FROM cards c JOIN decks d ON d.id = c.deck_id
        WHERE c.id = ? AND d.user_id = ?
      `).bind(Number(body.id), user.id).first()
      if (!card) return json('Vous ne pouvez pas modifier cette carte', 403)
      await env.DB.prepare('UPDATE cards SET recto = ?, verso = ?, deck_id = ? WHERE id = ?')
        .bind(recto, verso, deckId, card.id).run()
      return json({ id: card.id, status: 'updated' })
    }
    const result = await env.DB.prepare('INSERT INTO cards (recto, verso, deck_id) VALUES (?, ?, ?)').bind(recto, verso, deckId).run()
    return json({ id: result.meta.last_row_id, status: 'saved' }, 201)
  }

  if (path === '/v1/card' && request.method === 'DELETE') {
    const body = await readBody(request)
    const cardId = Number(body.id)
    const result = await env.DB.prepare(`
      DELETE FROM cards WHERE id = ? AND deck_id IN (SELECT id FROM decks WHERE user_id = ?)
    `).bind(cardId, user.id).run()
    if (!result.meta.changes) return json('Vous ne pouvez pas supprimer cette carte', 403)
    return json({ id: cardId, status: 'deleted' })
  }

  if (path === '/v1/card/delay' && (request.method === 'POST' || request.method === 'DELETE')) {
    const body = await readBody(request)
    const cardId = Number(body.id)
    if (!cardId) return json('Carte requise', 400)
    if (request.method === 'POST') {
      const toDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      await env.DB.prepare(`
        INSERT INTO delays (user_id, card_id, to_date) VALUES (?, ?, ?)
        ON CONFLICT(user_id, card_id) DO UPDATE SET to_date = excluded.to_date
      `).bind(user.id, cardId, toDate).run()
      return json({ cardId, toDate }, 201)
    }
    await env.DB.prepare('DELETE FROM delays WHERE user_id = ? AND card_id = ?').bind(user.id, cardId).run()
    return json({ cardId, status: 'undelayed' })
  }

  return null
}

export default {
  async fetch (request, env) {
    if (request.method === 'OPTIONS') return empty()
    const url = new URL(request.url)
    const path = url.pathname.replace(/\/{2,}/g, '/').replace(/\/+$/, '') || '/'
    try {
      if (path === '/' || path === '/health' || path === '/v1') return json({ service: 'memoria-api', status: 'ok' })
      const publicResponse = await handlePublic(request, env, path)
      if (publicResponse) return publicResponse
      const authResponse = await handleAuth(request, env, path)
      if (authResponse) return authResponse
      if (path.startsWith('/v1/')) {
        const dataResponse = await handleUserData(request, env, path)
        if (dataResponse) return dataResponse
      }
      return json('Route inconnue', 404)
    } catch (error) {
      console.error(error)
      return json('Le service ne peut pas traiter cette requête', 500)
    }
  }
}

