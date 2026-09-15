# Retreat interno · 16–17 settembre 2026 · guida di facilitazione

Guida di facilitazione: prescrittiva su format e tempi perché serve a chi conduce, non a chi partecipa.

Deck della sessione delle 11:30 del 16: [`deck/`](deck/index.html) (aprire dalla root del repo con `python3 -m http.server 8000` → `http://localhost:8000/sessioni/2026-09-16-17/deck/`).

**Assunzioni da confermare** (segnate «da confermare» nei blocchi): «21 Next» è un progetto cliente concluso; i pomeriggi del 17 finiscono alle 17:00 con una plenaria di chiusura.

**Filo delle due giornate.** 16 = capire e confrontarsi (novità → cosa è successo davvero su un progetto → come ognuno usa l'AI, cosa funziona e cosa no → semina per domani). 17 = decidere (Cantiere Futuro → Geo Workshop con il consulente → piani di team).

**Formato di ogni blocco:** obiettivo · format · timing · domande guida · output e dove finisce · materiali da preparare · piano B se si sfora.

---

## 16 settembre

| Ora | Blocco | Chi |
|---|---|---|
| 11:00–11:30 | Introduzione | Francesco |
| 11:30–12:30 | Update: modelli, harness, orchestrazione, Claude Design | tutti |
| 13:00–14:30 | Pranzo | |
| 14:30–15:00 | Ripresa | |
| 15:00–16:00 | Retro 21 Next | tutti |
| 16:00–17:30 | Casi dal campo: come usiamo l'AI, cosa funziona e cosa no | tutti |
| 17:30–18:00 | Pausa | |
| 18:00–19:00 | Semina per Cantiere Futuro | tutti |
| 20:00–23:00 | Cena | |

### 11:00–11:30 · Introduzione (Francesco)

### 11:30–12:30 · Update: modelli, harness, orchestrazione, Claude Design

**Obiettivo.** Aggiornare la mappa mentale di giugno con una regola sola: la logica è la stessa, cambia il fornitore.

**Format.** Deck interattivo in sette sezioni con due demo dal vivo (orchestrazione e Claude Design); la sezione Modelli è solo teorica. Scaletta, minuti e note del relatore sono nel deck (tasto `N`) e in `research/lesson-structure-2026-09.md`.

**Timing.** 11:30 apertura · 11:33 modelli · 11:45 harness · 11:55 orchestrazione (demo B alle 12:00) · **12:05 Claude Design, comunque** (demo C alle 12:09) · 12:15 confronto Figma / Design / `/design` · 12:22 chiusura · 12:26 domande. Il nav del deck mostra il ritardo rispetto al piano.

**Domande guida per il pubblico.** In quale fascia metteresti il modello che usi ogni giorno? Quale dei tre modi di modificare in Claude Design useresti per primo? Cosa deleghi oggi senza verificare?

**Output.** Deck pubblicato; glossario dei termini nuovi; le domande senza risposta finiscono nel board «da provare» del pomeriggio.

**Materiali.** Deck; workflow `ultracode` in esecuzione su un repo di Cantiere (demo B); prompt della demo C e crediti Claude Design; screenshot di fallback in `media/2026-09/`.

**Piano B.** Cut list in ordine: widget dell'effort → riga «alternative» del confronto Design → gradini per vendor dell'orchestrazione (restano i sei pattern). Design non si taglia.

### 15:00–16:00 · Retro 21 Next (progetto cliente concluso, da confermare)

**Obiettivo.** Capire cosa rifare uguale e cosa non rifare, con tre decisioni e un owner ciascuna.

**Format.** Timeline del progetto sul muro (milestone, consegne, incidenti) → scrittura silenziosa su tre colonne «fatto / ha funzionato / non ha funzionato» → cluster e voto a punti → discussione dei tre cluster più votati → decisioni.

**Timing.** 10′ timeline raccontata da chi ha seguito il progetto · 10′ scrittura silenziosa (un post-it per idea) · 15′ cluster e voto · 20′ discussione dei tre cluster più votati (7′ ciascuno, con cronometro) · 5′ decisioni.

**Domande guida.** Dove abbiamo perso tempo e perché? Cosa ha sorpreso il cliente in positivo? Cosa avremmo fatto diversamente con gli strumenti di oggi? Cosa del processo non era scritto da nessuna parte?

**Output.** Tre decisioni con owner e data; lista «da rifare uguale» e «da non rifare». Trascrizione in questo file (sezione «Esiti», in fondo) o in Basecamp.

**Materiali.** Timeline stampata o su board; numeri del progetto (ore, margine, consegne) sotto mano; post-it, pennarelli, bollini per il voto.

**Piano B.** Se si sfora: si discute solo il cluster più votato e si rimandano gli altri due ai piani di team del 17. Fine tassativa alle 16:00: dopo c'è il giro di tutto il team.

### 16:00–17:30 · Casi dal campo: come usiamo l'AI, cosa funziona e cosa no

**Obiettivo.** Far parlare tutti, non tre relatori: come ognuno usa l'AI oggi nel proprio lavoro, cosa funziona, cosa non funziona, quali problemi e quali idee. Serve a vedere il quadro reale del team, non i casi migliori.

**Format.** Giro completo del team con una scaletta fissa in quattro punti: **cosa faccio con l'AI nel mio lavoro · cosa funziona · cosa non funziona o mi blocca · un'idea che vorrei provare**. Chi vuole mostra una schermata. Si annota su una board a quattro colonne «funziona / non funziona / problemi / idee». Poi si raggruppano le voci e si discutono i tre temi più ricorrenti.

**Timing.** 16:00 regole e board (5′) · 16:05 giro di tutti (55′) · 17:00 raggruppamento e discussione dei tre temi più ricorrenti (25′) · 17:25 chiusura: cosa portiamo a Cantiere Futuro (5′).

**Domande guida.** Cosa si ripete in quasi tutti i racconti? Dove la verifica manca? Quali problemi sono nostri (processo, accessi, tempo) e quali dello strumento? Quali idee si possono provare senza chiedere nulla a nessuno?

**Output.** Board a quattro colonne trascritta negli Esiti; i tre temi ricorrenti e le idee «da provare» entrano nella semina delle 18:00 e nei piani di team del 17.

**Materiali.** Board con le quattro colonne; proiettore per chi vuole mostrare schermate.

**Piano B.** Se qualcuno preferisce non parlare: scrive i quattro punti su post-it e si leggono insieme. Se si sfora: si taglia la discussione a un solo tema, gli altri due passano alla semina delle 18:00.

### 18:00–19:00 · Semina per Cantiere Futuro

**Obiettivo.** Arrivare alla mattina del 17 con i temi già raccolti e raggruppati, così il blocco delle 9:30 decide invece di raccogliere.

**Format.** Brainstorming silenzioso su post-it per le tre domande del 17, poi clustering fatto insieme, poi un giro finale.

**Timing.** 3 × 5′ di scrittura silenziosa (come ci organizziamo · come ci raccontiamo · cosa offriamo), un post-it per idea · 25′ clustering a voce, una board per domanda · 10′ giro «una cosa che mi porto a cena», senza discussione.

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
| 11:00–12:00 | Geo Workshop | consulente esterno |
| 12:30–14:00 | Pranzo | |
| 14:00–14:30 | Ripresa | |
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

### 11:00–12:00 · Geo Workshop

### 14:30–15:30 · Lab di team

**Team marketing: acquisizione, non analisi.** Due domande guida: come usiamo uno o più agenti per acquisire clienti? Come cambia la nostra offerta commerciale? Si lavora su un segmento vero (un tipo di cliente che vogliamo davvero prendere) in tre postazioni parallele, 45′ di lavoro e 15′ di confronto:
- *Prospecting.* Un agente (Cowork o Claude con ricerca web e connettori) parte dal profilo del cliente ideale, costruisce una lista di prospect con motivazione e segnale di interesse, e prepara una bozza di primo contatto per ciascuno. Domanda: cosa deve verificare una persona prima che il messaggio parta?
- *Offerta.* Dal brief di un prospect alla proposta commerciale con la skill interna `proposta-commerciale-cc`, includendo i servizi nuovi (prototipi navigabili, agenti su misura, GEO): si guarda cosa cambia in deliverable, tempi e prezzo rispetto a una proposta di sei mesi fa.
- *Aggancio.* Un prototipo o un one-pager con Claude Design fatto sul prospect, da allegare al primo contatto: il «vieni a vedere» al posto del «ti racconto».

Output: la pipeline di acquisizione disegnata su una pagina (segmento → agente di prospecting → verifica umana → aggancio → proposta), con chi fa cosa e cosa resta umano; tre righe su come cambia l'offerta (cosa vendiamo, come lo confezioniamo, a che prezzo); una lista di prospect reale da provare la settimana dopo.

**Team dev.** Su un repo reale di Cantiere: costruire l'harness minimo (CLAUDE.md o AGENTS.md, una skill, un hook di test, un subagent revisore), poi eseguire lo stesso task con due harness (Claude Code e Codex, oppure Antigravity) e confrontare risultato, tempo e costo. Opzionale: un workflow bounded con il pattern «adversarial verification». Output: template di harness in un repo di Cantiere e tabella di confronto per il piano.

**Materiali.** Marketing: profilo del cliente ideale, accessi a Cowork, Claude Design e ai connettori (CRM, mail, LinkedIn se disponibile), la skill `proposta-commerciale-cc`, una proposta di sei mesi fa da confrontare. Dev: un repo di Cantiere, Codex o Antigravity accanto a Claude Code, crediti sufficienti.

**Piano B.** Se un lab non parte per accessi mancanti: si fa in coppia sul caso dell'altro team. Se il prospecting con connettori non è pronto: si parte da una lista fatta a mano e l'agente fa solo ricerca e bozze.

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

Problemi dal 16 (board «non funziona / problemi») e come li togliamo; idee da provare

Budget richiesto: strumenti, crediti, tempo

Primo check: data e chi lo convoca
```

**Timing.** 10′ rilettura delle decisioni della mattina e della board del 16 · 35′ compilazione · 15′ revisione incrociata (una persona dell'altro team legge il piano e fa tre domande).

**Output.** Due piani di una pagina trascritti qui sotto (o in Basecamp).

### 16:30–17:00 · Chiusura plenaria (da confermare)

Ogni team presenta il piano in 5′; giro finale «una cosa che faccio lunedì». Si fissa la data del primo check.

---

## Esiti (da compilare durante le due giornate)

### Retro 21 Next
- Decisioni:
- Da rifare uguale:
- Da non rifare:

### Casi dal campo
- Funziona:
- Non funziona:
- Problemi:
- Idee:
- Tre temi ricorrenti:

### Semina per Cantiere Futuro (cluster)
- Come ci organizziamo:
- Come ci raccontiamo:
- Cosa offriamo:

### Cantiere Futuro (decisioni)
- Come ci organizziamo:
- Come ci raccontiamo:
- Cosa offriamo:

### Piani di team
- Marketing:
- Dev:
