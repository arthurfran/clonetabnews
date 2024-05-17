import migrationsrunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const methodAllowed = ["GET", "POST"];

  let dbClient;
  if (!methodAllowed.includes(request.method)) {
    return response.status(405).json({
      error: `Method ${request.method} is not allowed`,
    });
  }
  try {
    dbClient = await database.getNewClient();

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
      const pendingmigrations = await migrationsrunner(
        defaultOptionsMigrations,
      );

      response.status(200).json(pendingmigrations);
    }
    if (request.method === "POST") {
      console.log("Entrou no POST");
      const migratedmigrations = await migrationsrunner({
        ...defaultOptionsMigrations,
        dryRun: false,
      });

      if (migratedmigrations.length > 0) {
        response.status(201).json(migratedmigrations);
      }
      response.status(200).json(migratedmigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
