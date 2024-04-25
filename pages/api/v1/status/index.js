import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const maxConnections = await database.query("show max_connections;");
  const version = await database.query("show server_version;");
  const DataBaseName = process.env.POSTGRES_DB;
  const OpenedConnections = await database.query({
    text: "SELECT count (*) ::int FROM pg_stat_activity WHERE datname = $1;",
    values: [DataBaseName],
  });
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: parseInt(maxConnections.rows[0].max_connections),
        version: version.rows[0].server_version,
        open_connections: OpenedConnections.rows[0].count,
      },
    },
  });
}

export default status;
