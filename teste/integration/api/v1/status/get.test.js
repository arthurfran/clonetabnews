test("teste de integração saída 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.version).toBeDefined();

  const parsedupdatedAT = new Date(responseBody.updated_at).toISOString();

  expect(responseBody.updated_at).toEqual(parsedupdatedAT);
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.version).toEqual("16.0");

  console.log(responseBody.dependencies.database.open_connections);
});
