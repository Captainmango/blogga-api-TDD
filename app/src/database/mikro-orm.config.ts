import { Post } from '@entities/Post'
import { Comment } from '@entities/Comment'
import { defineConfig } from '@mikro-orm/sqlite'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const databaseName = process.env.NODE_ENV === "test"
    ? "test-database.db"
    : "dev-database.db"

export default defineConfig({
    entities: [Post, Comment],
    dbName: databaseName,
    highlighter: new SqlHighlighter(),
    migrations: {
        tableName: "database_migrations",
        path: "./app/src/database/migrations",
        disableForeignKeys: true,
        allOrNothing: true,
        emit: 'ts',
        snapshot: false,
    },
    seeder: {
        path: "./app/src/database/seeders",
        emit: 'ts',
    }
})
