import { db } from "./db";
import * as path from "path";
import { promises as fs } from "fs";
import { FileMigrationProvider, Migration, MigrationResultSet, Migrator } from "kysely";

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    // This needs to be an absolute path.
    migrationFolder: path.join(__dirname, "migrations"),
  }),
});

async function migrate(action: string | undefined) {
  if (action === undefined) {
    const { error, results } = await migrator.migrateToLatest();
    outputMigrationResult({ error, results })
  }
  if (action === "up") {
    const { error, results } = await migrator.migrateUp();
    outputMigrationResult({ error, results })
  }
  if (action === "down") {
    const { error, results } = await migrator.migrateDown();
    outputMigrationResult({ error, results })
  }

  await db.destroy();
}

function outputMigrationResult({ results, error }: MigrationResultSet) {
  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }
}

migrate(process.argv.slice(2)[0])
