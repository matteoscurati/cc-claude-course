# Claude Course Research Corpus

Data raccolta: 2026-06-22

## Stato fonti

- Primo blocco YouTube: 7 video unici, con trascrizioni automatiche inglesi utilizzabili.
- Secondo blocco: 95 URL unici normalizzati.
- Secondo blocco web/docs: 82 pagine estratte in markdown senza errori.
- Secondo blocco YouTube: 13 video unici; metadati disponibili per tutti, trascrizione utile solo per "Delegate and schedule tasks in Claude Cowork".
- Duplicati rimossi: vari link ripetuti; corretto anche un URL incollato insieme che conteneva `get-started-with-claude-design` e la pagina di prompt engineering della piattaforma.

## Video gia analizzati

### AI fluency

- "AI Fluency: Framework & Foundations Course Trailer" introduce AI fluency: collaborare con AI in modo effective, efficient, ethical, safe.
- "Welcome to AI Fluency for small business owners" introduce il framework 4D: delegation, description, discernment, diligence.
- "AI Capabilities & Limitations" introduce il modello mentale tecnico: next token prediction, knowledge, working memory/context window, steerability.

### Claude Code e agenti

- "What is Claude Code?" definisce Claude Code come agente di coding con accesso a file, terminale, comandi, test, web e strumenti esterni.
- "What are subagents?" spiega agenti specializzati con contesto separato, utili a preservare il contesto principale.
- "What are skills?" spiega skills come cartelle di istruzioni, script e risorse che Claude carica quando rilevanti.

### Claude Platform

- "What is the Claude Developer Platform?" descrive API, SDK, CLI, console, primitives, infrastructure e controls per integrare Claude in prodotti.

## Nuovi video analizzati

- "Cowork is now generally available" - clip prodotto su Cowork GA.
- "Delegate and schedule tasks in Claude Cowork" - trascrizione utile: esempio meeting prep con calendar, Slack, email, folder di note, agenda generata e task schedulati.
- "Artifacts in Claude Code: share your work as it happens" - no transcript utile; tema coperto anche dal blog sugli artifacts.
- "Enterprise-managed auth for MCP connectors" - no transcript utile; tema coperto anche dal blog enterprise auth.
- "New agents for legal professionals | Claude Cowork" - no transcript utile; tema coperto dai blog legal.
- "Introducing agent view in Claude Code" - no transcript utile; tema coperto dal blog agent view.
- "New agents for financial services | Claude Cowork + Claude Managed Agents" - no transcript utile; tema coperto dai blog financial services.
- "Find and fix security vulnerabilities with Claude" - no transcript utile; tema coperto da Claude Security.
- "Claude now connects to Autodesk Fusion" - no transcript utile.
- "Claude now connects to Blender" - no transcript utile.
- "All your everyday apps, in one conversation" - no transcript utile.
- "The new Claude Code desktop app, redesigned for parallel agents" - no transcript utile; tema coperto docs desktop.
- "Introducing Claude Managed Agents" - no transcript utile; tema coperto blog Managed Agents.

## Tassonomia principale

### 1. Da chat a lavoro delegato

Il passaggio chiave non e "scrivere prompt migliori" in astratto, ma spostarsi da:

- domanda/risposta in chat;
- task delegati a un agente;
- workflow ricorrenti;
- agenti con strumenti, contesto, permessi, memoria e verifiche.

La linea didattica piu semplice:

- Chat: chiedere, ragionare, spiegare, fare brainstorming.
- Cowork: delegare task non tecnici multi-step che producono deliverable.
- Claude Code: delegare lavoro tecnico su codice, terminale, test e repository.
- Claude Design: generare e iterare design, prototipi, presentazioni e materiali visivi.
- Claude Security: scansione, validazione e patch di vulnerabilita.
- Platform / Managed Agents: integrare e distribuire agenti in prodotti o processi enterprise.

### 2. AI fluency e framework 4D

Il framework 4D e utile come base per principianti:

- Delegation: capire se, quando e quanto delegare all'AI.
- Description: descrivere bene obiettivo, contesto, vincoli, formato e criteri di qualita.
- Discernment: valutare output, rischi, accuratezza e adeguatezza.
- Diligence: restare responsabili, verificare, proteggere dati e fiducia.

Il messaggio da portare ai colleghi: l'AI non e un correttore automatico evoluto, ma un collaboratore a cui si delega lavoro restando responsabili del risultato.

### 3. Modello mentale: capacita e limiti

Punti base da spiegare:

- I modelli generano testo come prediction, non come accesso garantito alla verita.
- La conoscenza puo essere incompleta o datata.
- Il context window e la memoria di lavoro: contiene istruzioni, file letti, tool call e storia della sessione, ma ha limiti.
- La steerability dipende da istruzioni, esempi, contesto, feedback e strumenti.
- Molti errori nascono dall'incrocio di due limiti: es. hallucination = prediction + knowledge gap; drift = working memory + steerability.

### 4. Claude Code: loop agentico

Claude Code funziona in un loop:

- gather context;
- take action;
- verify results;
- repeat until task complete.

Tools principali:

- file operations;
- search;
- command execution;
- web/documentation;
- external services via MCP.

Buona regola didattica: senza tools Claude risponde; con tools Claude puo agire.

### 5. Best practice Claude Code

Pattern ricorrenti dalle docs:

- Dare a Claude un modo per verificare il lavoro: test, build, lint, screenshot, script, fixture.
- Per task incerti: explore first, then plan, then code.
- Per task piccoli: chiedere direttamente.
- Dare contesto specifico: file, vincoli, esempi, formato atteso.
- Usare contenuti ricchi: file con `@`, screenshot, URL docs, log, pipe da terminale.
- Creare un `CLAUDE.md` breve e utile con comandi, convenzioni, stile, test e gotcha.
- Usare plan mode quando il rischio e medio/alto o il codice e sconosciuto.

### 6. Permessi e controllo

Claude Code ha modalita con diversi tradeoff:

- `default`: auto solo letture; meglio per inizio e lavoro sensibile.
- `acceptEdits`: auto letture, edit file e comandi filesystem comuni.
- `plan`: esplora e propone senza modificare.
- `auto`: piu autonomia per task lunghi con safety checks.
- `dontAsk`: solo tool pre-approvati.
- `bypassPermissions`: tutto senza prompt; solo in container/VM isolati.

Messaggio per principianti: autonomia non significa perdere controllo; si sceglie il livello di supervisione.

### 7. Contesto, memoria e caching

Concetti da distinguere:

- Context window: memoria di lavoro della sessione.
- Compaction: riassunto automatico quando il contesto si riempie.
- `CLAUDE.md`: istruzioni persistenti rilette nelle sessioni.
- Auto memory: memoria mantenuta da Claude Code.
- Skills: corpo caricato on demand, non sempre.
- Subagents: lavoro isolato; torna solo un summary.
- Prompt caching: migliora velocita e costi, ma puo essere invalidato da cambiamenti a tool, modello, effort level, MCP, ecc.

### 8. Customization: sette metodi

Il blog "steering Claude Code" elenca sette modi di guidare Claude:

- `CLAUDE.md` files: contesto sempre caricato.
- Rules: vincoli generali o path-scoped.
- Skills: istruzioni, script e risorse on demand.
- Subagents: assistenti isolati per side task.
- Hooks: automazioni deterministiche su eventi.
- Output styles: stile di risposta.
- Append system prompt: istruzioni aggiunte al system prompt.

Regola pratica:

- Se Claude sbaglia una convenzione due volte: `CLAUDE.md`.
- Se ripeti lo stesso prompt/playbook: skill.
- Se serve un worker separato che esplora molto: subagent.
- Se serve collegarsi a dati o tool esterni: MCP.
- Se serve automazione deterministica a eventi: hook.

### 9. Skills

Skills non sono solo markdown: sono cartelle con istruzioni, script, risorse e frontmatter.

Categorie utili viste nel blog:

- library/API reference;
- product verification;
- data fetching and analysis;
- business process/team automation;
- code scaffolding/templates;
- code quality/review.

La migliore porta d'ingresso per i colleghi: "se ti ritrovi a spiegare sempre la stessa cosa a Claude, quella cosa e candidata a diventare skill".

### 10. Subagents

Servono per:

- esplorazioni lunghe;
- task specializzati;
- mantenere pulito il contesto principale;
- far tornare un summary invece del viaggio completo.

Tradeoff: il thread principale vede meno dettagli intermedi, quindi per task critici bisogna chiedere evidenze o riepiloghi strutturati.

### 11. MCP

MCP e lo standard aperto per collegare Claude a strumenti, dati e API.

Esempi:

- issue tracker;
- GitHub;
- Sentry/monitoring;
- database;
- Figma/design;
- Slack, Gmail, Notion, Asana, ecc.

Messaggio semplice: MCP evita il copia/incolla da sistemi esterni e permette a Claude di leggere/agire dove il lavoro vive gia.

Rischio da citare: server MCP e contenuti esterni possono introdurre prompt injection o azioni indesiderate; serve fiducia, permessi e governance.

### 12. Claude Cowork

Regola base:

- Chat se vuoi risposta, spiegazione, brainstorming, gut check.
- Cowork se vuoi un deliverable, un file, un report, un deck, uno spreadsheet, una task multi-step o ricorrente.

Cinque criteri per un task adatto a Cowork:

1. Entrano piu input: file, folder, connector.
2. Esce un file o deliverable.
3. Lo farai di nuovo.
4. Sai gia riconoscere un buon risultato.
5. Il "middle work" e noioso: estrarre, compilare, riconciliare, riformattare.

Esempi:

- daily briefing da Slack/Gmail;
- budget pacing;
- report periodici;
- meeting prep;
- sales account book;
- documenti, deck, spreadsheet, naming/organizzazione file.

### 13. Claude Design

Claude Design serve per:

- design, prototipi, presentazioni, mockup;
- importare o allegare design system;
- iterare via chat, canvas editing e commenti;
- passare tra design e code.

Per principianti: e un modo concreto di far vedere che "AI agentica" non vuol dire solo codice.

### 14. Enterprise, governance e sicurezza

Temi ricorrenti:

- role-based access controls;
- spend limits;
- analytics e observability;
- OpenTelemetry;
- Compliance API;
- enterprise-managed auth per MCP;
- Workload Identity Federation;
- permissioning e audit;
- zero trust per agenti;
- sandbox controllata per Managed Agents.

Messaggio: agenti potenti richiedono contesto, strumenti e autonomia, quindi governance e visibilita diventano parte del prodotto.

### 15. Managed Agents e Platform

Managed Agents rispondono al problema: un prototipo agente non basta per andare in produzione.

Servono:

- runtime;
- state management;
- credentials;
- permissions;
- sandbox;
- observability;
- scaling;
- agent harness.

Linea semplice: Claude Platform serve a mettere Claude dentro prodotti/processi; Managed Agents serve a far girare agenti in produzione senza costruire tutta l'infrastruttura da zero.

### 16. Dynamic workflows, ultraplan, ultrareview

Dynamic workflows: Claude puo creare un harness per il task, usando pattern come:

- classify-and-act;
- fan-out-and-synthesize;
- adversarial verification;
- generate-and-filter;
- tournament.

Ultraplan: pianificazione piu strutturata/revisionabile nel browser.

Ultrareview: review piu profonda, in research preview.

Per una lezione base questi sono "advanced topics", non core.

### 17. Grandi codebase

Pattern per adozione seria:

- non caricare troppo contesto sempre;
- rendere la codebase navigabile;
- `CLAUDE.md` lean e layered;
- skills per playbook e conoscenza specifica;
- hooks per automazioni;
- MCP per sistemi esterni;
- subagents per esplorazione;
- ownership interna per configurazione e adozione.

Frase chiave: il modello conta, ma il harness intorno al modello conta moltissimo.

### 18. HTML/artifacts

Markdown va bene, ma HTML/artifacts diventano utili quando servono:

- alta densita informativa;
- visualizzazioni;
- condivisione;
- interazione;
- report e dashboard leggibili.

Questo puo diventare un esempio pratico: far generare a Claude un mini report visuale invece di una risposta testuale.

## Possibile gerarchia per una lezione da 1 ora

Non e ancora una scaletta definitiva, ma il corpus suggerisce questa priorita:

1. Che cosa cambia: da chatbot a agente.
2. AI fluency: 4D e responsabilita umana.
3. Come ragiona/lavora un agente: context, tools, loop, verifica.
4. Come usare Claude in pratica: Chat, Cowork, Code, Design.
5. Prompt/task buoni: contesto, obiettivo, vincoli, formato, criteri di verifica.
6. Demo pratica breve: delegare una task e verificare output.
7. Concetti avanzati solo come preview: skills, subagents, MCP, managed agents.

