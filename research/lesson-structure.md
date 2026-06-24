# Struttura Lezione: Claude, Agenti e LLM

Durata target: circa 60 minuti

Pubblico: colleghi con livello iniziale basso.

Obiettivo: dare una infarinata solida su LLM, prompt, context engineering, agenti e superfici Claude, con un focus pratico su Claude Code, Claude Cowork, Claude Design e differenze tra CLI e UI.

## Obiettivo Didattico

A fine lezione i partecipanti devono saper:

- spiegare in modo semplice cos'e' un LLM e perche' puo' sbagliare;
- distinguere chat, assistente e agente;
- formulare richieste migliori usando obiettivo, contesto, vincoli e formato;
- capire perche' il contesto migliora l'output ma ha costi e va gestito;
- orientarsi tra Claude Chat, Claude Code, Claude Cowork e Claude Design;
- capire quando usare CLI, IDE, Desktop UI, Web/Cloud, Cowork UI o Design UI;
- usare l'AI come acceleratore, non come sostituto del giudizio umano.

## Struttura 60 Minuti

### 1. Cos'e' un LLM e perche' non e' magia

Tempo: 8 minuti

Concetti:

- token: il testo viene spezzato in pezzi;
- prediction: il modello genera il prossimo pezzo probabile;
- training: il modello ha imparato pattern da enormi quantita' di dati;
- context window: il modello lavora su cio' che ha davanti nella richiesta/sessione;
- non e' un database della verita';
- puo' sbagliare, inventare, essere incompleto o rispondere in modo convincente ma errato.

Frase chiave:

> Un LLM non sa nel senso umano: genera risposte plausibili sulla base di contesto, istruzioni e conoscenza appresa.

### 2. Da chat ad agente

Tempo: 8 minuti

Evoluzione:

- Chatbot: risponde a domande.
- Assistant: segue istruzioni e mantiene contesto conversazionale.
- Tool-using AI: usa strumenti, file, web, database o API.
- Agent: riceve un obiettivo, pianifica, agisce, verifica e itera.

Esempio:

- Chat: "Scrivimi una mail."
- Agente: "Leggi questi documenti, estrai i punti rilevanti, prepara una bozza, confrontala con lo storico, crea il file finale."

Messaggio chiave:

> Un agente non si limita a rispondere: puo' lavorare su un obiettivo usando contesto e strumenti.

### 3. Prompt engineering e context engineering

Tempo: 10 minuti

#### Prompt engineering

Schema pratico:

```text
Obiettivo:
Contesto:
Vincoli:
Formato desiderato:
Criteri di qualita':
Cosa evitare:
```

Esempio:

```text
Devo preparare una mail per un cliente arrabbiato.
Contesto: il progetto e' in ritardo di 3 giorni per un problema tecnico.
Tono: professionale, trasparente, non difensivo.
Formato: massimo 180 parole.
Cosa evitare: non promettere date certe.
```

#### Context engineering

Definizione semplice:

- prompt engineering = come chiedi;
- context engineering = cosa metti a disposizione dell'AI.

Esempi di contesto:

- documenti rilevanti;
- esempi di output buoni;
- regole aziendali;
- dati aggiornati;
- file di progetto;
- memoria/istruzioni persistenti;
- strumenti collegati;
- conversazioni o task precedenti.

Messaggio chiave:

> La qualita' dell'output dipende molto dal contesto che l'AI vede.

#### Perche' il contesto pesa nei costi

Il contesto non e' gratis. I modelli lavorano su token, quindi ogni pezzo di testo, file, istruzione, tool result o cronologia che entra nella richiesta consuma token.

Impatto pratico:

- piu' contesto = piu' token di input;
- piu' token = costo maggiore sulle API o consumo maggiore del piano/limiti;
- piu' contesto = piu' latenza, perche' il modello deve processare piu' materiale;
- piu' contesto irrilevante = rischio maggiore di confusione, drift o risposte meno focalizzate;
- nei task lunghi, la cronologia e i risultati dei tool possono riempire la context window.

Frase chiave:

> Il contesto e' carburante, ma anche peso. Va dato bene, non dato tutto.

#### Quando pulire il contesto

Conviene pulire, riassumere o ripartire quando:

- la conversazione e' diventata lunga e contiene molte strade morte;
- il task e' cambiato rispetto all'obiettivo iniziale;
- l'AI inizia a confondere vincoli vecchi e nuovi;
- ci sono file/log/tool result non piu' rilevanti;
- stai passando da esplorazione a implementazione;
- stai cambiando argomento;
- vuoi ridurre costo, latenza o rumore;
- devi evitare che dati sensibili restino nel contesto operativo;
- vuoi produrre un brief pulito per una nuova sessione o un nuovo agente.

Come pulire:

- chiedere un riassunto operativo: fatti stabili, decisioni, vincoli, prossimi passi;
- aprire una nuova chat/sessione con solo il riassunto e i file necessari;
- rimuovere dettagli irrilevanti e tenere solo input utili;
- usare strumenti come compaction/memory quando disponibili;
- usare subagents o task separati per esplorazioni pesanti;
- tenere istruzioni durevoli in file dedicati, non ripeterle sempre nel prompt.

Regola pratica:

> Se non sapresti spiegare in 30 secondi cosa c'e' ancora di utile nella conversazione, probabilmente e' ora di pulire il contesto.

### 4. Mappa Claude: Chat, Code, Cowork, Design

Tempo: 20 minuti

| Strumento | A cosa serve | Utente tipo | Output |
| --- | --- | --- | --- |
| Claude Chat | domande, testi, sintesi, brainstorming | tutti | risposte, bozze, ragionamenti |
| Claude Code | lavorare su codice, repo, terminale, test, bug, refactor | developer / tecnico | modifiche codice, PR, analisi, fix |
| Claude Cowork | delegare task di knowledge work multi-step | chi lavora con file, mail, docs, report | documenti, report, deck, spreadsheet, briefing |
| Claude Design | creare e iterare design, prototipi, mockup, presentazioni | designer, PM, marketing, founder | canvas, prototipi, schermate, materiali visuali |

Messaggio chiave:

> Non esiste un solo uso dell'AI. Esistono superfici diverse per tipi di lavoro diversi.

#### Claude Code

Messaggio semplice:

> Claude Code e' Claude con accesso operativo al progetto.

Puo':

- leggere file;
- cercare nel codice;
- modificare file;
- eseguire comandi;
- lanciare test/build/lint;
- usare strumenti esterni;
- lavorare in loop: capisce, modifica, verifica.

Quando usarlo:

- "Spiegami questa codebase."
- "Trova dove nasce questo bug."
- "Aggiungi questa feature."
- "Scrivi test."
- "Refactorizza questo modulo."
- "Preparami una PR."

Concetti da citare:

- context window;
- permission modes;
- plan mode;
- `CLAUDE.md`;
- skills;
- subagents;
- MCP.

#### Claude Cowork

Messaggio semplice:

> Claude Cowork serve per delegare lavoro non tecnico che normalmente richiede piu' passaggi.

Esempi:

- preparare un meeting briefing;
- leggere mail, Slack e documenti e produrre un report;
- creare un deck;
- riordinare file;
- trasformare screenshot in spreadsheet;
- creare report ricorrenti;
- preparare materiali per clienti.

Regola pratica: Cowork va bene quando:

- entrano piu' input;
- esce un file o deliverable;
- e' un task ripetibile;
- sai riconoscere se il risultato e' buono;
- la parte centrale e' noiosa: estrarre, riordinare, riconciliare, riformattare.

#### Claude Design

Messaggio semplice:

> Claude Design e' Claude applicato a output visuali e iterabili.

Puo' servire per:

- wireframe;
- mockup;
- prototipi;
- presentazioni;
- materiali marketing;
- esplorazioni visuali;
- uso di design system.

Differenza importante:

> Non e' solo "fammi un'immagine". E' piu' vicino a "costruiamo un artefatto visuale modificabile e iterabile".

### 5. CLI vs UI: quando usare cosa

Tempo: 7 minuti

| Superficie | Pro | Contro | Quando usarla |
| --- | --- | --- | --- |
| CLI | veloce, precisa, integrata col terminale, ideale per dev | richiede confidenza tecnica | coding serio, repo locali, test, automazioni |
| IDE | dentro editor, naturale per chi sviluppa | meno pulita della CLI per task lunghi | modifiche mentre lavori nel codice |
| Desktop UI | visuale, accessibile, gestione sessioni | meno scriptabile | multitasking, review, cowork, design |
| Web/Cloud | task offloadati, sessioni persistenti | ambiente non identico al locale | task lunghi, GitHub, lavoro asincrono |
| Cowork UI | pensata per non tecnici, task e deliverable | non e' per coding profondo | report, briefing, documenti |
| Design UI | canvas, preview, iterazione visuale | non e' terminale ne' IDE | prototipi, schermate, deck |

Frase chiave:

> La CLI e' per chi vuole lavorare vicino al sistema. La UI e' per chi vuole delegare e controllare visivamente il risultato.

### 6. Rischi, verifica e buone pratiche

Tempo: 5 minuti

Rischi:

- hallucination;
- dati sensibili;
- output convincente ma sbagliato;
- perdita di tono o standard aziendale;
- azioni automatiche non controllate;
- dipendenza senza verifica.

Regole pratiche:

- mai fidarsi ciecamente;
- verificare fonti e numeri;
- non inserire dati riservati se non si conoscono policy e ambiente;
- usare AI per accelerare, non per abdicare;
- dare criteri di verifica;
- per task importanti, chiedere assunzioni, incertezze e checklist di controllo.

### 7. Mini demo

Tempo: 2-5 minuti, integrabile nel blocco 4.

Demo consigliate:

1. Cowork/Chat style demo non tecnica:
   - "Preparami un briefing da questi appunti e trasformalo in una mail + checklist."

2. Claude Code demo tecnica leggera:
   - "Leggi questa piccola cartella, spiegami cosa fa, trova un bug semplice, proponi una modifica."

Claude Design:

- meglio mostrarlo con screenshot o esempio preparato, salvo disponibilita' di tempo per demo live.

## Messaggi Finali Da Portare A Casa

1. L'AI non e' magia: lavora su istruzioni, contesto e probabilita'.
2. Gli agenti non si limitano a rispondere: possono eseguire task usando strumenti.
3. Il valore sta nel saper delegare bene e verificare bene.
4. Il contesto e' fondamentale, ma costa e va gestito.
5. Claude Code, Cowork e Design sono superfici diverse per lavori diversi.

