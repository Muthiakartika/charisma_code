/**
 * Local PostgreSQL for development — no Docker or installer needed.
 *
 * Usage:  npm run db:local
 *   - The first run creates the database files in ./.local-database
 *   - Keep this terminal open while you work; press Ctrl+C to stop the database.
 *
 * The connection string printed below matches DATABASE_URL in .env.example.
 * In production, use a managed PostgreSQL service instead (see README).
 */
import EmbeddedPostgres from 'embedded-postgres'
import fs from 'node:fs'
import path from 'node:path'

const DATA_DIR = path.resolve('.local-database')
const PORT = 5433
const DATABASE_NAME = 'charisma'

const database = new EmbeddedPostgres({
  databaseDir: DATA_DIR,
  user: 'postgres',
  password: 'postgres',
  port: PORT,
  persistent: true,
  initdbFlags: ['--locale=C', '--encoding=UTF8'],
  onLog: () => {},
})

const isFirstRun = !fs.existsSync(path.join(DATA_DIR, 'PG_VERSION'))

if (isFirstRun) {
  console.log('Creating a new local PostgreSQL database (first run only)…')
  await database.initialise()
}

await database.start()

if (isFirstRun) {
  await database.createDatabase(DATABASE_NAME)
}

console.log('\n✅ Local PostgreSQL is running.')
console.log(`   DATABASE_URL=postgres://postgres:postgres@127.0.0.1:${PORT}/${DATABASE_NAME}`)
console.log('   Keep this window open. Press Ctrl+C to stop.\n')

const shutdown = async () => {
  console.log('\nStopping local PostgreSQL…')
  await database.stop()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

// Keep the process alive until Ctrl+C.
setInterval(() => {}, 1 << 30)
