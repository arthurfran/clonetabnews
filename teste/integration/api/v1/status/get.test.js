test("teste de integração saída 200", async () => {
  const request = await fetch("http://localhost:3000/api/v1/status");
  expect(request.status).toBe(200);
});
