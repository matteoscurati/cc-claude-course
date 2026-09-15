# Demo A · modello e effort (3 minuti)

Stesso prompt, stessa funzione con un bug noto, modelli e effort diversi: si guardano **tempo, costo ed esito**. Serve a mostrare le due regole della sezione Modelli: si paga per task completato, e l'effort è una leva prima del cambio di modello.

## Il bug

`fatture.js` ripartisce una fattura tra centri di costo in proporzione ai pesi, arrotondando ogni quota. La somma delle quote **non torna sempre al totale** (esempio: 100 centesimi su pesi 2/3/5 → 20 + 30 + 50 va bene, ma 10.000 su tre pesi uguali → 3.333 × 3 = 9.999). La correzione minima è assegnare il resto all'ultima quota (o distribuire i centesimi mancanti). I test in `fatture.test.js` lo rendono evidente:

```bash
node --test          # 2 test su 4 falliscono
```

## Il giro dal vivo

```bash
./run.sh             # tre giri: sonnet/low · opus/high · opus/low
./run.sh fable low   # un giro solo
```

Ogni giro copia i file in una cartella temporanea, lancia `claude -p` con `--model` e `--effort`, misura il tempo, legge il costo dal JSON di risposta e rilancia i test per dire se il bug è stato risolto. Il risultato finisce in una tabella markdown `risultati-<data>.md`, da proiettare.

Da dire in sala:
- il modello grande a effort basso spesso chiude al primo colpo a un costo vicino a quello del piccolo;
- guardare la colonna «esito», non solo «costo»: un giro economico che lascia i test rossi non è economico.

## Durante la presentazione (3 minuti, dalle 11:41)

Prima di salire: terminale già aperto in `demo-a/`, font grande, tabella `risultati-<data>.md` del giorno prima già aperta in una seconda finestra (o proiettata dal deck come screenshot).

| Quando | Cosa fai | Cosa dici |
|---|---|---|
| 0:00 | `node --test` | «Una funzione vera: ripartisce una fattura tra centri di costo. Due test rossi: la somma delle quote non torna al totale.» |
| 0:20 | `cat prompt.txt` | «Stesso prompt per tutti: trova il bug, spiegalo in tre righe, correzione minima, verifica con i test.» |
| 0:35 | `./run.sh opus low` (parte, lasciala girare) | «Modello di fascia alta a effort basso. Mentre lavora guardiamo cosa è successo ieri con gli altri giri.» |
| 0:50 | mostra la tabella del giorno prima | «Fascia media a effort basso: tempo, costo, esito. Fascia alta a effort alto: più cara, stesso esito. Guardate la colonna esito prima del costo.» |
| 2:00 | torna al terminale: riga della tabella + esito | «Il modello grande a effort basso ha chiuso al primo colpo, a un costo vicino a quello del piccolo. Prima abbassi l'effort, poi cambi modello. Si paga il task finito, non il token.» |
| 2:40 | chiudi | «Se il giro lascia i test rossi non è economico, è un giro sprecato.» Avanti con la slide. |

Se alle 2:00 il giro non è finito: commenta la tabella di ieri e vai avanti; il risultato lo si legge alla fine della sezione. Se il terminale non collabora: la tabella di ieri è la demo.

## Variante multi-vendor

```bash
./consult.sh
```

Manda la stessa domanda in parallelo ai consulenti configurati in `ai-consultants` (Codex, Gemini, Kimi, Qwen, GLM, DeepSeek…) e stampa il report: «stessa domanda, più modelli», chi trova il bug e chi no.

## Prima della sessione

- Provare `./run.sh` una volta il 15 e tenere il file `risultati-*.md` come fallback; fare due screenshot con la data visibile in `../../../media/2026-09/`.
- Controllare che `claude`, `jq` e i CLI dei consulenti siano loggati e con credito.
- Durante la demo lanciare **un solo giro** dal vivo (`./run.sh opus low`), gli altri due dal file del giorno prima: 3 minuti reggono un giro, non tre.
