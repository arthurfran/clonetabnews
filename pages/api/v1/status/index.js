import database from "infra/database";
import { version } from "react";

async function status(request, response) {
  const databaseVersion = await database.query("SHOW server_version;");
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseMaxConnections = await database.query("SHOW max_connections;");
  const updatedAT = new Date().toISOString();
  response.status(200).json({
    updated_at: updatedAT,
    dependencies: {
      database: {
        version: databaseVersion.rows[0].server_version,
        max_connections: parseInt(
          databaseMaxConnections.rows[0].max_connections,
        ),
        opened_connections: databaseOpenedConnections.rows.length,
      },
    },
  });
}

export default status;
