# Retreat interno · 16–17 settembre 2026 · guida di facilitazione

Conduce tutti i blocchi: Matteo. Questa guida è prescrittiva su format e tempi perché serve a chi conduce, non a chi partecipa.

Deck della sessione delle 11:30 del 16: [`deck/`](deck/index.html) (aprire dalla root del repo con `python3 -m http.server 8000` → `http://localhost:8000/sessioni/2026-09-16-17/deck/`).

**Assunzioni da confermare** (segnate «da confermare» nei blocchi): «21 Next» è un progetto cliente concluso; «Geo Workshop» è Generative Engine Optimization, cioè la visibilità nelle risposte generate da AI Overviews, ChatGPT, Perplexity (coerente con il plugin `claude-seo` già installato); il pranzo del 17 è alle 13:00 come il 16; i pomeriggi del 17 finiscono alle 17:00 con una plenaria di chiusura; il blocco 15:30–16:30 del 16 non era in scaletta ed è trattato come pausa lunga.

**Filo delle due giornate.** 16 = capire e confrontarsi (novità → cosa è successo davvero su un progetto → casi reali dei colleghi → semina per domani). 17 = decidere (Cantiere Futuro → GEO come primo servizio nuovo → piani di team).

**Formato di ogni blocco:** obiettivo · format · timing · domande guida · output e dove finisce · materiali da preparare · piano B se si sfora.

---

## 16 settembre

| Ora | Blocco | Chi |
|---|---|---|
| 11:00–11:30 | Introduzione | Francesco |
| 11:30–12:30 | Update: modelli, harness, orchestrazione, Claude Design | tutti |
| 13:00–14:00 | Pranzo | |
| 14:30–15:30 | Retro 21 Next | tutti |
| 15:30–16:30 | Pausa lunga (da confermare) | |
| 16:30–17:30 | Casi dal campo | tutti |
| 17:30–18:00 | Pausa | |
| 18:00–19:00 | Semina per Cantiere Futuro | tutti |
| 20:00–23:00 | Cena | |

### 11:00–11:30 · Introduzione (Francesco)

Non è un blocco di Matteo. Da concordare con Francesco entro il 15: la regola dei tempi (ogni blocco finisce all'ora scritta, le domande si fanno dentro il blocco), il passaggio di consegne alle 11:30 e l'annuncio che il deck resta online dopo la sessione.

### 11:30–12:30 · Update: modelli, harness, orchestrazione, Claude Design

**Obiettivo.** Aggiornare la mappa mentale di giugno con una regola sola: la logica è la stessa, cambia il fornitore.

**Format.** Deck interattivo in sette sezioni con tre demo dal vivo. Scaletta, minuti e note del relatore sono nel deck (tasto `N`) e in `research/lesson-structure-2026-09.md`.

**Timing.** 11:30 apertura · 11:33 modelli (demo A alle 11:41) · 11:45 harness · 11:55 orchestrazione (demo B alle 12:00) · **12:05 Claude Design, comunque** (demo C alle 12:09) · 12:15 confronto Figma / Design / `/design` · 12:22 chiusura · 12:26 domande. Il nav del deck mostra il ritardo rispetto al piano.

**Domande guida per il pubblico.** In quale fascia metteresti il modello che usi ogni giorno? Quale dei tre modi di modificare in Claude Design useresti per primo? Cosa deleghi oggi senza verificare?

**Output.** Deck pubblicato; glossario dei termini nuovi; le domande senza risposta finiscono nel board «da provare» del pomeriggio.

**Materiali.** Deck provato con cronometro; workflow `ultracode` lanciato alle 11:20 su un repo di Cantiere (demo B); prompt della demo C pronto e crediti Claude Design controllati; screenshot datati di fallback in `media/2026-09/`; `ai-consultants` funzionante per la variante della demo A. Materiali della demo A pronti in [`demo-a/`](demo-a/index.html) (funzione con bug noto, test, `run.sh` per il confronto modello/effort, `consult.sh` per la variante multi-vendor).

**Piano B.** Cut list in ordine: demo A → riga «alternative» del confronto Design → gradini per vendor dell'orchestrazione (restano i sei pattern). Design non si taglia.

### 14:30–15:30 · Retro 21 Next (progetto cliente concluso, da confermare)

**Obiettivo.** Capire cosa rifare uguale e cosa non rifare, con tre decisioni e un owner ciascuna.

**Format.** Timeline del progetto sul muro (milestone, consegne, incidenti) → scrittura silenziosa su tre colonne «fatto / ha funzionato / non ha funzionato» → cluster e voto a punti → discussione dei tre cluster più votati → decisioni.

**Timing.** 10′ timeline raccontata da chi ha seguito il progetto · 10′ scrittura silenziosa (un post-it per idea) · 15′ cluster e voto (tre punti a testa) · 20′ discussione dei tre cluster più votati (7′ ciascuno, con cronometro) · 5′ decisioni.

**Domande guida.** Dove abbiamo perso tempo e perché? Cosa ha sorpreso il cliente in positivo? Cosa avremmo fatto diversamente con gli strumenti di oggi? Cosa del processo non era scritto da nessuna parte?

**Output.** Tre decisioni con owner e data; lista «da rifare uguale» e «da non rifare». Trascrizione in questo file (sezione «Esiti», in fondo) o in Basecamp.

**Materiali.** Timeline stampata o su board; numeri del progetto (ore, margine, consegne) sotto mano; post-it, pennarelli, bollini per il voto.

**Piano B.** Se si sfora: si discute solo il cluster più votato e si rimandano gli altri due ai piani di team del 17.

### 16:30–17:30 · Casi dal campo

**Obiettivo.** Vedere lavoro vero fatto con l'AI negli ultimi tre mesi, con costo e verifica, per far emergere pattern comuni e attriti.

**Format.** Tre o quattro colleghi, scelti e avvisati entro il 14, raccontano in 10′ ciascuno un lavoro reale con una scaletta fissa in cinque punti: cosa dovevo fare · quale strumento e quale modello · cosa ho verificato e come · quanto è costato (tempo e token) · cosa rifarei diverso. Matteo tiene i tempi e annota su una board a tre colonne «funziona / attrito / da provare». Ultimi 15–20′: discussione sui pattern comuni.

**Timing.** 4 × 10′ (o 3 × 12′) · 15–20′ discussione.

**Domande guida per la discussione.** Cosa si ripete in tutti i casi? Dove la verifica è mancata? Quale attrito è nostro (processo, accessi) e quale dello strumento?

**Output.** Board «funziona / attrito / da provare» trascritta qui sotto; le voci «attrito» entrano nei piani di team del 17.

**Materiali.** Relatori confermati con la scaletta in cinque punti inviata via messaggio; board pronta con le tre colonne; proiettore per chi vuole mostrare schermate.

**Piano B.** Se un relatore manca, Matteo copre lo slot con un caso proprio (per esempio la proposta commerciale generata con la skill interna `proposta-commerciale-cc`).

### 18:00–19:00 · Semina per Cantiere Futuro

**Obiettivo.** Arrivare alla mattina del 17 con i temi già raccolti e raggruppati, così il blocco delle 9:30 decide invece di raccogliere.

**Format.** Brainstorming silenzioso su post-it per le tre domande del 17, poi clustering fatto insieme, poi un giro finale.

**Timing.** 3 × 5′ di scrittura silenziosa (come ci organizziamo · come ci raccontiamo · cosa offriamo), un post-it per idea · 25′ clustering a voce, una board per domanda · 10′ giro «una cosa che mi porto a cena» (una frase a testa, senza discussione).

**Domande guida.** Come ci organizziamo: chi fa cosa quando l'AI fa una parte del lavoro; chi verifica; quanto budget di strumenti. Come ci raccontiamo: cosa diciamo ai clienti di come lavoriamo; quali prove abbiamo. Cosa offriamo: quali servizi nuovi siamo pronti a vendere, quali da provare, quali no.

**Output.** Tre board di cluster fotografate e trascritte qui sotto prima delle 9:30 del 17.

**Materiali.** Post-it di tre colori (uno per domanda), pennarelli, tre board (fisiche, o Miro/FigJam se qualcuno è da remoto).

**Piano B.** Se il gruppo è stanco: si fa una sola domanda per esteso (cosa offriamo) e le altre due si aprono il 17 mattina con 10′ di scrittura in più.

---

## 17 settembre

| Ora | Blocco | Chi |
|---|---|---|
| 9:30–10:45 | Cantiere Futuro | tutti |
| 10:45–11:00 | Pausa | |
| 11:00–12:00 | Geo Workshop | tutti |
| 13:00–14:00 | Pranzo (da confermare) | |
| 14:30–15:30 | Lab di team | marketing · dev, separati |
| 15:30–16:30 | Piano di team | marketing · dev, separati |
| 16:30–17:00 | Chiusura plenaria (da confermare) | tutti |

### 9:30–10:45 · Cantiere Futuro

**Obiettivo.** Tre decisioni per ciascuna delle tre domande, ognuna con owner e data.

**Format.** Si parte dai cluster della sera prima. Tre round da 22′: lettura dei cluster (5′), discussione (12′), decisione (5′). Ultimi 9′: priorità tra le nove decisioni e conferma degli owner.

**Timing.** 9:30 come ci organizziamo · 9:52 come ci raccontiamo · 10:14 cosa offriamo · 10:36 priorità e owner.

**Contenuti per round.**
- *Come ci organizziamo.* Ruoli con l'AI nel flusso brief → proposta → design → dev → consegna; chi verifica cosa; regola di routing e budget di strumenti; cosa smettiamo di fare a mano.
- *Come ci raccontiamo.* Posizionamento: un'agenzia che sa delegare e verificare, non «un'agenzia AI»; prove concrete da mostrare (prototipi in ore, casi dal campo del 16); cosa non promettiamo.
- *Cosa offriamo.* Candidati: prototipi navigabili, agenti e automazioni su misura, skill e MCP sui sistemi del cliente, GEO, AI fluency e governance. Per ciascuno: pronto / da provare / no.

**Output.** Nove decisioni con owner e data; lista servizi con stato. Trascrizione qui sotto.

**Materiali.** Le tre board del 16 sera; un foglio «decisioni» per round con tre righe vuote; cronometro visibile.

**Piano B.** Se un round sfora: si chiude con una decisione sola e si passa al successivo; le altre due vanno nel piano di team del pomeriggio.

### 11:00–12:00 · Geo Workshop (GEO = Generative Engine Optimization, da confermare)

**Obiettivo.** Capire cosa cambia rispetto alla SEO quando la risposta la scrive un modello, fare un audit dal vivo e abbozzare un'offerta.

**Format.** Spiegazione breve, audit dal vivo con la skill `seo-geo` del plugin `claude-seo`, lavoro in gruppi, condivisione.

**Timing.** 10′ cos'è GEO e come cambia rispetto alla SEO (crawler AI, `llms.txt`, citabilità dei passaggi, segnali di brand, AI Overviews / ChatGPT / Perplexity) · 25′ audit dal vivo del sito di Cantiere e di un sito cliente scelto con il team · 15′ in gruppi: «cosa venderemmo come servizio GEO» (pacchetto, deliverable, prezzo indicativo) · 10′ condivisione.

**Domande guida.** Su quali query i nostri clienti vengono citati da un'AI oggi? Cosa manca al loro sito per essere citato? Quale parte del lavoro è nostra e quale dello strumento?

**Output.** Checklist GEO di Cantiere; bozza di offerta GEO da rifinire nel pomeriggio marketing.

**Materiali.** `claude-seo` funzionante sulla macchina di Matteo, provato il 15 sul sito di Cantiere; un sito cliente scelto con il consenso del team; proiettore.

**Piano B.** Se l'audit dal vivo si blocca: report dell'audit del 15 già esportato e proiettato.

### 14:30–15:30 · Lab di team

**Team marketing.** Su un caso cliente reale con brand kit: una persona fa un one-pager o una landing con Claude Design partendo dal design system del cliente; una imposta un report o briefing ricorrente con Cowork (task schedulato); una fa l'audit GEO del cliente. 45′ di lavoro, 15′ di confronto. Output: tre artefatti reali e la lista di cosa serve per rifarlo su ogni cliente (accessi, brand kit, tempo).

**Team dev.** Su un repo reale di Cantiere: costruire l'harness minimo (CLAUDE.md o AGENTS.md, una skill, un hook di test, un subagent revisore), poi eseguire lo stesso task con due harness (Claude Code e Codex, oppure Antigravity) e confrontare risultato, tempo e costo. Opzionale: un workflow bounded con il pattern «adversarial verification». Output: template di harness in un repo di Cantiere e tabella di confronto per il piano.

**Materiali.** Marketing: caso cliente con brand kit, accessi a Claude Design e Cowork. Dev: repo scelto, Codex o Antigravity installati accanto a Claude Code, crediti sufficienti.

**Piano B.** Se un lab non parte per accessi mancanti: si fa in coppia sul caso dell'altro team.

### 15:30–16:30 · Piano di team (separati, stesso template)

**Obiettivo.** Tradurre Cantiere Futuro e il lab in un piano fino a dicembre.

**Template (una pagina per team).**

```
Team: ______            Owner del piano: ______        Data: 17/09/2026

Tre obiettivi entro dicembre (cosa, misura, owner, prima scadenza)
1.
2.
3.

Cosa smettiamo di fare a mano

Attriti dal 16 (board «attrito») e come li togliamo

Budget richiesto: strumenti, crediti, tempo

Primo check: data e chi lo convoca
```

**Timing.** 10′ rilettura delle decisioni della mattina e del board «attrito» · 35′ compilazione · 15′ revisione incrociata (una persona dell'altro team legge il piano e fa tre domande).

**Output.** Due piani di una pagina trascritti qui sotto (o in Basecamp).

### 16:30–17:00 · Chiusura plenaria (da confermare)

Ogni team presenta il piano in 5′; giro finale «una cosa che faccio lunedì» (una frase a testa). Si fissa la data del primo check.

---

## Materiali da preparare prima del 16

- Deck delle 11:30 pubblicato e provato con cronometro; le voci `check` in `deck/script.js` risolte o tolte la mattina del 16; demo con fallback.
- Timeline di 21 Next stampata o su board; numeri del progetto (ore, margine).
- Post-it di tre colori, pennarelli, bollini per il voto, tre board (fisiche o Miro/FigJam).
- Relatori di «Casi dal campo» confermati entro il 14, scaletta in cinque punti inviata via messaggio; board a tre colonne pronta.
- Account con crediti per Claude Design e per i modelli di frontiera; workflow `ultracode` pronto da lanciare alle 11:20.
- `claude-seo` provato il 15 sul sito di Cantiere; sito cliente scelto.
- Repo reale per il team dev con Codex o Antigravity installati; caso cliente con brand kit per il marketing.
- Questo file aperto sul portatile di chi conduce, per trascrivere gli esiti.

## Esiti (da compilare durante le due giornate)

### Retro 21 Next
- Decisioni:
- Da rifare uguale:
- Da non rifare:

### Casi dal campo
- Funziona:
- Attrito:
- Da provare:

### Semina per Cantiere Futuro (cluster)
- Come ci organizziamo:
- Come ci raccontiamo:
- Cosa offriamo:

### Cantiere Futuro (decisioni)
- Come ci organizziamo:
- Come ci raccontiamo:
- Cosa offriamo:

### Geo Workshop
- Checklist GEO di Cantiere:
- Bozza di offerta:

### Piani di team
- Marketing:
- Dev:
