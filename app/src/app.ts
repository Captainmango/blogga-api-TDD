import { createServer } from './utils/server'
import { createDatabase, env } from './utils/db'
import 'reflect-metadata'

createDatabase(env.dev)

createServer()
  .then(server => {
    server.listen(3000, () => {
      console.info(`Listening on http://localhost:3000`)
    })
  })
  .catch(err => {
    console.error(`Error: ${err}`)
  })