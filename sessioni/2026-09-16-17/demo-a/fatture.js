// Demo A · sessione 16/09/2026
// Ripartizione di una fattura tra più centri di costo, in centesimi.
// Contiene un bug noto: la somma delle quote non torna sempre al totale.

/**
 * Ripartisce `totaleCent` (intero, centesimi) tra i centri di costo in
 * proporzione al loro `peso`. Ritorna un array di { id, cent }.
 */
function ripartisci(totaleCent, centri) {
  if (!Number.isInteger(totaleCent) || totaleCent < 0) throw new Error("totale non valido");
  const pesoTotale = centri.reduce((s, c) => s + c.peso, 0);
  if (pesoTotale <= 0) throw new Error("pesi non validi");
  return centri.map((c) => ({
    id: c.id,
    cent: Math.round((totaleCent * c.peso) / pesoTotale),
  }));
}

/**
 * Applica uno sconto percentuale e ritorna il nuovo totale in centesimi.
 */
function scontaPercento(totaleCent, percento) {
  if (percento < 0 || percento > 100) throw new Error("percentuale non valida");
  return Math.round(totaleCent * (1 - percento / 100));
}

module.exports = { ripartisci, scontaPercento };
