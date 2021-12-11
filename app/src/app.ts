import { createServer } from './utils/server'
import { createDatabase } from './utils/db'
import 'reflect-metadata'
import connection, { dbEnvs } from './utils/connection'

createDatabase()

createServer()
  .then(server => {
    server.listen(3000, () => {
      console.info(`Listening on http://localhost:3000`)
    })
  })
  .catch(err => {
    console.error(`Error: ${err}`)
  })