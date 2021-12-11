import { createServer } from './utils/server'
import 'reflect-metadata'
import connection from './utils/db'

connection.create();

createServer()
  .then(server => {
    server.listen(3000, () => {
      console.info(`Listening on http://localhost:3000`)
    })
  })
  .catch(err => {
    console.error(`Error: ${err}`)
  })