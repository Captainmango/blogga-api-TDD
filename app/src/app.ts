import { createServer } from './utils/server'
import 'reflect-metadata'
import connection from './utils/db'


/**
 * Where the magic happens. Not the cleanest way to do this, but it orks for the purposes of this.
 * Bonus marks if you refactor this and make things nicer here.
 */
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