const test = require("node:test");
const assert = require("node:assert/strict");
const { ripartisci, scontaPercento } = require("./fatture");

test("la somma delle quote è uguale al totale (3 centri uguali)", () => {
  const quote = ripartisci(10000, [{ id: "design", peso: 1 }, { id: "dev", peso: 1 }, { id: "pm", peso: 1 }]);
  const somma = quote.reduce((s, q) => s + q.cent, 0);
  assert.equal(somma, 10000);
});

test("la somma delle quote è uguale al totale (pesi 2/3/5 su 1,00 €)", () => {
  const quote = ripartisci(100, [{ id: "a", peso: 2 }, { id: "b", peso: 3 }, { id: "c", peso: 5 }]);
  assert.equal(quote.reduce((s, q) => s + q.cent, 0), 100);
});

test("la somma delle quote è uguale al totale (caso casuale)", () => {
  for (let i = 0; i < 200; i++) {
    const totale = Math.floor(Math.random() * 1_000_000);
    const centri = Array.from({ length: 3 + (i % 4) }, (_, k) => ({ id: "c" + k, peso: 1 + Math.floor(Math.random() * 9) }));
    const somma = ripartisci(totale, centri).reduce((s, q) => s + q.cent, 0);
    assert.equal(somma, totale, `totale ${totale}, pesi ${centri.map((c) => c.peso).join("/")}`);
  }
});

test("lo sconto del 20% su 99,99 € dà 79,99 €", () => {
  assert.equal(scontaPercento(9999, 20), 7999);
});
