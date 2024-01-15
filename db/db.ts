import { createPool } from 'mysql2' // do not use 'mysql2/promises'!
import { Kysely, MysqlDialect } from 'kysely'
import { PersonTable } from './schemas/User.ts'

interface Database {
  person: PersonTable
}

const dialect = new MysqlDialect({
  // Currently only placeholders
  pool: createPool({
    database: process.env.NODE_ENV === "development" ? "development" : "bettertoday",
    host: "database",
    user: process.env.NODE_ENV === "development" ? "root" : process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    port: 3306,
    connectionLimit: 10,
  })
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
})