import Registry from "../src";

test("ping", async () => {
  const registry = new Registry({
    hostname: "localhost",
    port: 5001
  });

  const res = await registry.ping();

  expect(res).toBeDefined();
});

test("catalog", async () => {
  const registry = new Registry({
    hostname: "localhost",
    port: 5001
  });

  const catalog = await registry.catalog();

  expect(catalog.repositories).toBeDefined();
});