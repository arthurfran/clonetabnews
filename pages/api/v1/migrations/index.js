import migrationsrunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();

  const defaultOptionsMigrations = {
    dbClient: dbClient,
    dir: join("infra", "migrations"),
    direction: "up",
    dryRun: true,
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    console.log("Entrou no Get");
    const pendingmigrations = await migrationsrunner(defaultOptionsMigrations);
    await dbClient.end();
    response.status(200).json(pendingmigrations);
  }
  if (request.method === "POST") {
    console.log("Entrou no POST");
    const migratedmigrations = await migrationsrunner({
      ...defaultOptionsMigrations,
      dryRun: false,
    });
    await dbClient.end();

    if (migratedmigrations.length > 0) {
      response.status(201).json(migratedmigrations);
    }
    response.status(200).json(migratedmigrations);
  } else {
    return response.status(405);
  }
}
