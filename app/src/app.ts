import { createServer } from './utils/server'
import { createDatabase } from './utils/db'
import 'reflect-metadata'

createServer()
  .then(server => {
    server.listen(3000, () => {
      console.info(`Listening on http://localhost:3000`)
    })
  })
  .catch(err => {
    console.error(`Error: ${err}`)
  })