# Struttura Sessione: Update settembre 2026

Data: 16 settembre 2026, 11:30–12:30 (blocco della due giorni interna, vedi `sessioni/2026-09-16-17/programma.md`)

Durata target: 60 minuti (56 pianificati + 4 di buffer)

Pubblico: colleghi che hanno gia' seguito la lezione di giugno (`site/`). Non si rispiegano le basi (token, context window, chat vs agente).

Obiettivo: aggiornare la mappa mentale a tre mesi di distanza, con una regola sola: **la logica e' la stessa, cambia il fornitore**. Quattro fasce di prezzo che si ripetono tra i vendor, l'effort come leva ovunque, l'harness fatto degli stessi ingredienti ovunque, l'orchestrazione «il forte pianifica e giudica, l'economico esegue» ovunque.

## Obiettivo didattico

A fine sessione i partecipanti devono saper:

- collocare un modello nuovo (USA o Cina) in una delle quattro fasce e scegliere fascia + effort in base al task, ragionando in costo per task completato;
- riconoscere gli otto ingredienti di un harness e ritrovarli in Claude Code, Codex, Antigravity, Grok Build/Bot, Hermes, OpenCode;
- distinguere subagent, team e workflow, e applicare la regola di routing di Cantiere;
- capire cosa fa Claude Design, come si lavora nel canvas e quando preferire Figma, Claude Design o la skill `design` in Claude Code;
- avere un'idea concreta delle alternative degli altri vendor per ogni tema.

## Regola sulle fonti

Solo siti ufficiali dei vendor (annunci, docs, pricing, help center) o Hugging Face per i pesi aperti. Ogni numero nel deck ha `source` e `status` (`verified` o `check`) nell'oggetto `DATA` in `deck/script.js`, con la data di verifica stampata. Le voci `check` si risolvono la mattina del 16 o si tolgono.

## Struttura 60 minuti

### 0. Apertura: tre mesi di cambiamenti

Tempo: 3 minuti (11:30)

- Da giugno sono usciti oltre dieci modelli di frontiera e cinque harness nuovi.
- Serve un modo di leggerli, non una lista: quattro fasce, effort, harness, orchestrazione.
- Widget: timeline cliccabile giugno → settembre, cross-vendor.
- Regola dei tempi: alle 12:05 si passa a Design comunque.

Frase chiave:

> Non devi ricordare i nomi. Devi riconoscere la fascia e la leva.

### 1. Modelli: la mappa USA + Cina

Tempo: 12 minuti (11:33)

Concetti:

- quattro fasce di prezzo per milione di token: frontiera (~$10/$50), alta (~$4-5/$20-25), media (~$2/$10-12), economica (<$1);
- le fasce si ripetono tra Anthropic, OpenAI, Google, xAI; i modelli cinesi open weight stanno nelle fasce alta/media/economica e fissano il pavimento del prezzo;
- effort (low → max) come leva principale: il modello grande a effort basso spesso batte il piccolo a effort alto;
- si paga per task completato, non per token;
- la saga di Fable 5 (sospeso il 12 giugno, tornato il 1 luglio con usage credits): la frontiera non garantisce disponibilita', serve un piano B su un altro vendor.

Widget: `tierLadder` (fasce × vendor, prezzi reali, click su un modello → scheda), `effortLever` (slider low → max).

Nessuna demo: sezione solo teorica, il tempo va ai due widget.

Frase chiave:

> Piu' capace non vuol dire sempre meglio: scegli la fascia, poi l'effort, e conta il costo per task.

### 2. Harness: la cornice intorno al modello

Tempo: 10 minuti (11:45)

Concetti:

- «il modello conta, ma l'harness conta moltissimo»;
- otto ingredienti: file di istruzioni, skills, hooks, subagent, MCP, sandbox/permessi, memoria, orchestrazione;
- tutti i vendor sono convergiti sugli stessi ingredienti: Claude Code, Codex (AGENTS.md, `/goal`), Antigravity CLI (`agy`, ha sostituito Gemini CLI), Grok Build (open source) e Grok Bot (agenti always-on), Hermes Agent (open source, model-agnostic, memoria persistente), OpenCode/Pi;
- le differenze vere: sandbox, memoria persistente, modello agnostico o proprietario;
- per i task lunghi: contesto fresco a ogni sessione, progress file, self-verification (Anthropic, nov 2025).

Widget: `harnessMatrix` (ingredienti × harness, click sulla cella → nome nativo).

Frase chiave:

> L'harness di default e' fatto per il coding. Per tutto il resto lo costruisci tu, con gli stessi otto mattoni.

### 3. Orchestrazione: quando un agente non basta

Tempo: 10 minuti (11:55)

Concetti:

- scala a tre gradini: subagent → team → workflow, con l'equivalente per ogni vendor;
- i sei pattern del Workflow tool di Claude Code (classify-and-act, fan-out-and-synthesize, adversarial verification, generate-and-filter, tournament, loop-until-done) e le tre patologie che curano (laziness, self-preferential bias, goal drift);
- regola di routing di Cantiere: il forte pianifica e giudica, l'economico esegue, il revisore e' dimensionato al lavoro, l'output delegato non e' fatto finche' non e' verificato;
- costa: solo per task di alto valore.

Widget: `orchLadder` (gradini per vendor) + pattern.

Demo B (4 minuti): workflow `ultracode` lanciato prima della sessione su un repo di Cantiere, mostrato in `/workflows` con risultato e costo. Nulla dal vivo.

Frase chiave:

> Paghi il giudizio due volte, prima e dopo; le mani in mezzo le paghi al prezzo piu' basso che regge il compito.

### 4. Claude Design: cos'e' e come si lavora

Tempo: 10 minuti (12:05)

Concetti:

- prodotto Anthropic Labs (17 aprile 2026), beta su Pro/Max/Team/Enterprise, condivide i limiti d'uso;
- chat a sinistra, canvas a destra;
- input: screenshot, DOCX/PPTX/XLSX, catture web, repo e design system via `/design-sync`;
- tre modi di modificare: chat, commenti inline sugli elementi, editing diretto (drag, resize, align) e slider creati da Claude;
- output: prototipi, wireframe/mockup, deck PPTX, landing, social, PDF, HTML, zip; integrazioni Adobe, Canva, Gamma, Miro, Vercel, Wix, Lovable, Replit, Base44; link con permessi view/comment/edit; handoff a Claude Code.

Widget: `designStepper` (brief → import → genera → itera → esporta → handoff).

Demo C (5 minuti): one-pager A4 di questa sessione dal design system del repo sincronizzato; un commento inline, uno slider, export PDF, handoff.

Frase chiave:

> Non «fammi un'immagine»: un artefatto visuale che parte dal tuo design system e finisce nel codice.

### 5. Design: Figma, Claude Design, `/design` e le alternative

Tempo: 7 minuti (12:15)

Concetti:

- Figma: precisione, componenti e variabili, multiplayer, Dev Mode, Figma MCP server per far leggere e scrivere gli agenti;
- Claude Design: esplorazione e deliverable rapido;
- skill `design` in Claude Code: canvas artifact nel repo, early preview;
- alternative: Figma Make, Google Stitch (Gemini, DESIGN.md, export in Antigravity), v0, Lovable, Canva AI;
- tono onesto: Figma resta source of truth.

Widget: `designCompare` (matrice + profilo designer / dev / PM-marketing).

Frase chiave:

> Tre mestieri, tre strumenti: precisione, esplorazione, prototipo nel repo.

### 6. Chiusura: per Cantiere, glossario, fonti

Tempo: 4 minuti (12:22)

- Cambia il mestiere: scegliere fascia + effort, costruire l'harness, verificare cio' che si delega, restare vendor-neutral.
- Glossario dei soli termini nuovi; bibliografia datata.

Buffer e domande: 4 minuti (12:26).

## Piano di taglio se si sfora

In ordine: widget dell'effort → riga «alternative» del confronto Design → gradini per vendor di `orchLadder` (restano i pattern). Design non si taglia.
