/* =========================================================================
   Corso Claude · LLM, Agenti e strumenti Anthropic
   Engine del deck + widget interattivi. Vanilla JS, nessuna dipendenza.
   ========================================================================= */
(function () {
  "use strict";
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };

  /* ============================================================= DECK NAV */
  const slides = $$(".slide");
  const total = slides.length;
  let idx = 0;

  const progressbar = $("#progressbar");
  const navCur = $("#nav-cur"), navName = $("#nav-name"), navTotal = $("#nav-total");
  const navPrev = $("#nav-prev"), navNext = $("#nav-next");
  const dotsWrap = $("#dots");
  const ovGrid = $("#ov-grid");

  navTotal.textContent = total;

  // build dots + overview cards
  slides.forEach((s, i) => {
    const d = el("button", i === 0 ? "on" : "");
    d.title = s.dataset.title || `Sezione ${i + 1}`;
    d.addEventListener("click", () => go(i));
    dotsWrap.appendChild(d);

    const c = el("button", "ov-card" + (i === 0 ? " on" : ""));
    c.innerHTML = `<div class="ov-n">${String(i).padStart(2, "0")}</div>
      <div class="ov-t">${s.dataset.title || "Sezione"}</div>
      <div class="ov-time">${s.dataset.time || ""}</div>`;
    c.addEventListener("click", () => { go(i); closeOverview(); });
    ovGrid.appendChild(c);
  });
  const dots = $$("#dots button");
  const ovCards = $$("#ov-grid .ov-card");

  function render() {
    slides.forEach((s, i) => s.classList.toggle("active", i === idx));
    dots.forEach((d, i) => d.classList.toggle("on", i === idx));
    ovCards.forEach((d, i) => d.classList.toggle("on", i === idx));
    progressbar.style.width = (total <= 1 ? 100 : (idx / (total - 1)) * 100) + "%";
    navCur.textContent = idx + 1;
    navName.textContent = slides[idx].dataset.title || "";
    navPrev.disabled = idx === 0;
    navNext.disabled = idx === total - 1;
    updateNotes();
    if (!document.body.classList.contains("scrollmode")) window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }
  function go(i) { idx = clamp(i, 0, total - 1); render(); }
  function next() { go(idx + 1); }
  function prev() { go(idx - 1); }

  navPrev.addEventListener("click", prev);
  navNext.addEventListener("click", next);

  /* ============================================================= KEYBOARD */
  document.addEventListener("keydown", (e) => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
    if (typing && e.key !== "Escape") return;
    if (document.body.classList.contains("scrollmode") &&
        ["ArrowRight", "ArrowLeft"].indexOf(e.key) === -1) return;
    switch (e.key) {
      case "ArrowRight": case "PageDown": case " ": e.preventDefault(); next(); break;
      case "ArrowLeft":  case "PageUp": e.preventDefault(); prev(); break;
      case "Home": go(0); break;
      case "End": go(total - 1); break;
      case "n": case "N": toggleNotes(); break;
      case "t": case "T": toggleTheme(); break;
      case "s": case "S": toggleMode(); break;
      case "o": case "O": toggleOverview(); break;
      case "Escape": closeOverview(); break;
      default:
        if (/^[1-9]$/.test(e.key)) go(parseInt(e.key, 10) - 1);
    }
  });

  /* ============================================================= THEME */
  const root = document.documentElement;
  function toggleTheme() {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    $("#btn-theme").classList.toggle("active", root.dataset.theme === "light");
  }
  $("#btn-theme").addEventListener("click", toggleTheme);

  /* ============================================================= MODE */
  function toggleMode() {
    document.body.classList.toggle("scrollmode");
    const on = document.body.classList.contains("scrollmode");
    $("#btn-mode").classList.toggle("active", on);
    if (!on) render();
  }
  $("#btn-mode").addEventListener("click", toggleMode);

  /* ============================================================= NOTES */
  const notesPanel = $("#notes"), notesBody = $("#notes-body");
  function updateNotes() {
    const raw = slides[idx].dataset.notes || "Nessuna nota per questa sezione.";
    const items = raw.split(/(?<=[.!?])\s+/).filter(Boolean);
    notesBody.innerHTML = "<ul>" + items.map((t) => `<li>${t}</li>`).join("") + "</ul>";
  }
  function toggleNotes() {
    notesPanel.classList.toggle("show");
    $("#btn-notes").classList.toggle("active", notesPanel.classList.contains("show"));
  }
  $("#btn-notes").addEventListener("click", toggleNotes);

  /* ============================================================= OVERVIEW */
  const overview = $("#overview");
  function toggleOverview() { overview.classList.toggle("show"); $("#btn-overview").classList.toggle("active", overview.classList.contains("show")); }
  function closeOverview() { overview.classList.remove("show"); $("#btn-overview").classList.remove("active"); }
  $("#btn-overview").addEventListener("click", toggleOverview);
  overview.addEventListener("click", (e) => { if (e.target === overview) closeOverview(); });

  /* ============================================================= TIMER */
  (function timer() {
    const box = $("#timer"), out = $(".t-elapsed", box);
    let started = null, elapsed = 0, tick = null;
    const fmt = (s) => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
    function paint() {
      const sec = elapsed + (started ? Math.floor((Date.now() - started) / 1000) : 0);
      out.textContent = fmt(sec);
      const tgt = $(".t-target", box);
      tgt.style.color = sec > 3600 ? "var(--danger)" : sec > 3000 ? "var(--gold)" : "var(--muted-2)";
    }
    box.addEventListener("click", () => {
      if (started) { elapsed += Math.floor((Date.now() - started) / 1000); started = null; box.classList.remove("running"); clearInterval(tick); }
      else { started = Date.now(); box.classList.add("running"); tick = setInterval(paint, 1000); paint(); }
    });
    box.addEventListener("dblclick", () => { started = null; elapsed = 0; box.classList.remove("running"); clearInterval(tick); paint(); });
  })();

  /* ========================================================================
     WIDGET 1 · TOKENIZER
     ===================================================================== */
  (function tokenizer() {
    const input = $("#tok-input"), out = $("#tok-out");
    if (!input) return;
    const palette = ["#d9775733", "#87a98f33", "#d9b25f33", "#a892d633"];
    function tokenize(text) {
      const parts = text.match(/(\s+|[^\s\wàèéìòù]+|[\wàèéìòù]+)/giu) || [];
      const toks = [];
      for (const p of parts) {
        if (/^\s+$/.test(p)) { toks.push({ t: p === " " ? "·" : p.replace(/ /g, "·"), kind: "sp" }); continue; }
        if (/^[\wàèéìòù]+$/iu.test(p) && p.length > 4) {
          let i = 0;
          while (i < p.length) { const len = i === 0 ? 4 : 3; toks.push({ t: p.slice(i, i + len), kind: "word" }); i += len; }
        } else { toks.push({ t: p, kind: /[\wàèéìòù]/iu.test(p) ? "word" : "punct" }); }
      }
      return toks;
    }
    function paint() {
      const text = input.value;
      const toks = tokenize(text);
      out.innerHTML = "";
      let c = 0;
      toks.forEach((tk) => {
        const span = el("span", "tok" + (tk.kind === "sp" ? " sp" : ""), tk.t);
        if (tk.kind !== "sp") { span.style.background = palette[c % palette.length]; c++; }
        out.appendChild(span);
      });
      $("#tok-count").textContent = toks.filter((t) => t.kind !== "sp").length;
      $("#tok-chars").textContent = text.length;
      $("#tok-words").textContent = (text.trim().match(/[\wàèéìòù]+/giu) || []).length;
    }
    input.addEventListener("input", paint);
    paint();
  })();

  /* ========================================================================
     WIDGET 2 · NEXT-TOKEN PREDICTION
     ===================================================================== */
  (function predict() {
    const ctxBox = $("#pred-ctx"), barsBox = $("#pred-bars"), segBox = $("#pred-examples");
    if (!ctxBox) return;
    const examples = [
      { label: "Frase comune", pre: "Il gatto è salito sul", post: "",
        cand: [["tetto", .31], ["divano", .2], ["tavolo", .15], ["letto", .12], ["albero", .09], ["muro", .07], ["davanzale", .06]] },
      { label: "Fatto noto", pre: "La capitale d'Italia è", post: "",
        cand: [["Roma", .8], ["Milano", .06], ["Firenze", .05], ["Napoli", .04], ["Torino", .03], ["Venezia", .02]] },
      { label: "Codice", pre: "for (let i = 0; i <", post: "",
        cand: [["arr.length", .34], ["n", .27], ["10", .16], ["items", .12], ["count", .07], ["size", .04]] },
    ];
    let exIdx = 0, temp = 0.7, picked = -1;

    examples.forEach((ex, i) => {
      const b = el("button", i === 0 ? "on" : "", ex.label);
      b.addEventListener("click", () => { exIdx = i; picked = -1; renderAll(); $$("#pred-examples button").forEach((x, j) => x.classList.toggle("on", j === i)); });
      segBox.appendChild(b);
    });

    function adjusted() {
      const ex = examples[exIdx];
      const raw = ex.cand.map(([w, p]) => [w, Math.pow(p, 1 / temp)]);
      const sum = raw.reduce((a, [, p]) => a + p, 0);
      return raw.map(([w, p]) => [w, p / sum]).sort((a, b) => b[1] - a[1]);
    }
    function renderCtx(word) {
      const ex = examples[exIdx];
      ctxBox.innerHTML = `${ex.pre} <span class="blank${word ? " filled" : ""}">${word || "▢▢▢"}</span> ${ex.post}`;
    }
    function renderBars() {
      const list = adjusted();
      barsBox.innerHTML = "";
      list.forEach(([w, p], i) => {
        const row = el("div", "predbar" + (picked === i ? " pick" : ""));
        row.innerHTML = `<span class="word">${w}</span>
          <div class="track"><div class="fill" style="width:${(p * 100).toFixed(1)}%"></div></div>
          <span class="pct">${(p * 100).toFixed(0)}%</span>`;
        barsBox.appendChild(row);
      });
      return list;
    }
    function renderAll() { renderCtx(picked >= 0 ? adjusted()[picked][0] : null); renderBars(); }

    $("#pred-sample").addEventListener("click", () => {
      const list = adjusted();
      let r = Math.random(), acc = 0, sel = 0;
      for (let i = 0; i < list.length; i++) { acc += list[i][1]; if (r <= acc) { sel = i; break; } }
      picked = sel; renderAll();
    });
    $("#pred-reset").addEventListener("click", () => { picked = -1; renderAll(); });
    const tempIn = $("#pred-temp");
    tempIn.addEventListener("input", () => { temp = parseFloat(tempIn.value); $("#pred-temp-val").textContent = temp.toFixed(2); picked = -1; renderAll(); });
    renderAll();
  })();

  /* ========================================================================
     WIDGET 3 · LOOP DIAGRAM (chatbot vs agent)
     ===================================================================== */
  (function loop() {
    const stage = $("#loop-stage"), caption = $("#loop-caption");
    if (!stage) return;
    const flows = {
      chat: {
        nodes: [
          { ico: "🧑", nm: "Prompt utente", ds: "una domanda", cap: "L'utente fa una domanda." },
          { ico: "💬", nm: "Risposta", ds: "testo generato", cap: "Il modello genera una risposta. Fine: nessuna azione, nessuna verifica." },
        ],
        cycle: false,
      },
      agent: {
        nodes: [
          { ico: "🎯", nm: "Obiettivo", ds: "il task da completare", cap: "L'agente riceve un obiettivo, non una singola domanda." },
          { ico: "🔍", nm: "Gather context", ds: "legge file, cerca, recupera", cap: "Raccoglie il contesto: legge file, cerca nel codice, recupera dati." },
          { ico: "⚙️", nm: "Take action", ds: "usa strumenti, modifica", cap: "Agisce con gli strumenti: modifica file, esegue comandi." },
          { ico: "✅", nm: "Verify", ds: "test, build, lint", cap: "Verifica il risultato: test, build, lint, screenshot." },
          { ico: "↺", nm: "Ripeti / Fine", ds: "fino a obiettivo completo", cap: "Se non è finito, torna a raccogliere contesto e itera. Altrimenti, completa." },
        ],
        cycle: true,
      },
    };
    let mode = "chat", step = -1;

    function paint() {
      const flow = flows[mode];
      stage.innerHTML = "";
      const row = el("div", "loop-row");
      flow.nodes.forEach((n, i) => {
        const node = el("div", "loop-node" + (i === step ? " on" : i < step ? " done" : ""));
        node.innerHTML = `<div class="ico">${n.ico}</div><div class="nm">${n.nm}</div><div class="ds">${n.ds}</div>`;
        row.appendChild(node);
        if (i < flow.nodes.length - 1) row.appendChild(el("span", "loop-arrow", "→"));
      });
      if (flow.cycle) { const a = el("span", "loop-arrow cycle", "⟲"); a.title = "loop"; row.appendChild(a); }
      stage.appendChild(row);
      caption.textContent = step >= 0 ? flow.nodes[step].cap : (mode === "chat"
        ? "Modalità chatbot: input → output, in linea retta. Premi «Passo successivo»."
        : "Modalità agente: un loop. Premi «Passo successivo» per percorrerlo.");
    }
    $$("#loop-mode button").forEach((b) => b.addEventListener("click", () => {
      mode = b.dataset.mode; step = -1;
      $$("#loop-mode button").forEach((x) => x.classList.toggle("on", x === b));
      paint();
    }));
    $("#loop-step").addEventListener("click", () => {
      const len = flows[mode].nodes.length;
      step = (step + 1) % (len + (flows[mode].cycle ? 0 : 0));
      if (step >= len) step = flows[mode].cycle ? 1 : 0;
      paint();
    });
    $("#loop-reset").addEventListener("click", () => { step = -1; paint(); });
    paint();
  })();

  /* ========================================================================
     WIDGET 4 · PROMPT BUILDER
     ===================================================================== */
  (function promptBuilder() {
    const out = $("#prompt-out");
    if (!out) return;
    const fields = $$("#w-prompt [data-pf]");
    const fill = $("#prompt-score-fill"), score = $("#prompt-score");
    const order = ["Obiettivo", "Contesto", "Vincoli", "Formato", "Criteri", "Evita"];
    function paint() {
      const data = {};
      fields.forEach((f) => data[f.dataset.pf] = f.value.trim());
      let txt = "";
      order.forEach((k) => { if (data[k]) txt += `${k}: ${data[k]}\n`; });
      out.textContent = txt || "(compila i campi qui sopra…)";
      const filled = order.filter((k) => data[k]).length;
      score.textContent = `${filled} / 6`;
      fill.style.width = (filled / 6 * 100) + "%";
      fill.style.background = filled >= 5 ? "var(--ok)" : filled >= 3 ? "var(--clay)" : "var(--gold)";
    }
    fields.forEach((f) => f.addEventListener("input", paint));
    paint();
  })();

  /* ========================================================================
     WIDGET 5 · CONTEXT COST METERS
     ===================================================================== */
  (function cost() {
    const range = $("#cost-range"), meters = $("#cost-meters"), label = $("#cost-tokens");
    if (!range) return;
    const defs = [
      { key: "cost", lbl: "💰 Costo (input)", color: "var(--clay)", fn: (k) => k / 200, val: (k) => `~${(k * 3).toFixed(0)}×` },
      { key: "lat", lbl: "⏱️ Latenza", color: "var(--gold)", fn: (k) => Math.min(1, 0.1 + k / 240), val: (k) => k < 30 ? "bassa" : k < 90 ? "media" : "alta" },
      { key: "drift", lbl: "🌀 Rischio drift/confusione", color: "var(--violet)", fn: (k) => Math.min(1, Math.pow(k / 200, 1.4)), val: (k) => k < 40 ? "basso" : k < 120 ? "medio" : "alto" },
      { key: "fit", lbl: "🪟 Riempimento context window", color: "var(--sage)", fn: (k) => Math.min(1, k / 200), val: (k) => `${Math.min(100, Math.round(k / 2))}%` },
    ];
    defs.forEach((d) => {
      const m = el("div", "meter");
      m.innerHTML = `<span class="mlbl">${d.lbl}</span><div class="mtrack"><div class="mfill" id="cm-${d.key}"></div></div><span class="mval" id="cv-${d.key}"></span>`;
      meters.appendChild(m);
    });
    function paint() {
      const k = parseInt(range.value, 10);
      label.textContent = k + "k token";
      defs.forEach((d) => {
        const f = clamp(d.fn(k), 0, 1);
        const fill = $("#cm-" + d.key);
        fill.style.width = (f * 100) + "%";
        fill.style.background = d.color;
        $("#cv-" + d.key).textContent = d.val(k);
      });
    }
    range.addEventListener("input", paint);
    paint();
  })();

  /* ========================================================================
     WIDGET 6 · SURFACES (Claude map)
     ===================================================================== */
  (function surfaces() {
    const grid = $("#surfaces");
    if (!grid) return;
    const data = [
      { ico: "💬", name: "Claude Chat", who: "tutti", out: "risposte, bozze, ragionamenti",
        body: ["Domande, testi, sintesi, brainstorming.", "Quando vuoi una risposta, una spiegazione o un gut check.", "Non produce un deliverable strutturato: è il punto di partenza."],
        src: ["Claude — Product overview", "https://claude.com/product/overview"] },
      { ico: "⌨️", name: "Claude Code", who: "developer / tecnico", out: "modifiche codice, PR, analisi, fix",
        body: ["Agente di coding: legge, cerca, modifica, esegue comandi, lancia test.", "Lavora nel loop: capisce → agisce → verifica.", "Concetti: permission modes, plan mode, CLAUDE.md, skills, subagents, MCP."],
        src: ["Claude Code — Overview", "https://code.claude.com/docs/en/overview"] },
      { ico: "🗂️", name: "Claude Cowork", who: "chi lavora con file, mail, docs, report", out: "documenti, report, deck, spreadsheet, briefing",
        body: ["Delegare task non tecnici multi-step che producono un file.", "Adatto quando: più input → un deliverable, è ripetibile, il lavoro centrale è noioso.", "Esempi: meeting prep, report periodici, screenshot → spreadsheet."],
        src: ["Claude — Product overview", "https://claude.com/product/overview"] },
      { ico: "🎨", name: "Claude Design", who: "designer, PM, marketing, founder", out: "canvas, prototipi, schermate, materiali visuali",
        body: ["Output visuali e iterabili: wireframe, mockup, prototipi, presentazioni.", "Non «fammi un'immagine»: un artefatto modificabile e iterabile.", "Si può passare tra design e codice; importare un design system."],
        src: ["Claude — Product overview", "https://claude.com/product/overview"] },
    ];
    data.forEach((d) => {
      const card = el("button", "surf");
      card.innerHTML = `
        <div class="s-top">
          <span class="s-ico">${d.ico}</span>
          <span><span class="s-name">${d.name}</span><br><span class="s-for">per ${d.who} · output: ${d.out}</span></span>
        </div>
        <div class="s-body"><div class="s-inner">
          <ul>${d.body.map((b) => `<li>${b}</li>`).join("")}</ul>
          <a class="src" href="${d.src[1]}" target="_blank" rel="noopener">${d.src[0]}</a>
        </div></div>`;
      card.addEventListener("click", () => {
        const open = card.classList.contains("open");
        $$(".surf", grid).forEach((c) => c.classList.remove("open"));
        if (!open) card.classList.add("open");
      });
      grid.appendChild(card);
    });
  })();

  /* ========================================================================
     WIDGET 7 · PERMISSION MODES
     ===================================================================== */
  (function permissions() {
    const seg = $("#perm-modes"), view = $("#perm-view"), desc = $("#perm-desc");
    if (!seg) return;
    const caps = ["Leggere file", "Modificare file", "Eseguire comandi", "Autonomia su task lunghi"];
    const modes = [
      { id: "default", desc: "Auto solo le letture; chiede conferma per modifiche e comandi. Ideale per iniziare e per lavoro sensibile.", flags: ["yes", "ask", "ask", "no"] },
      { id: "acceptEdits", desc: "Auto letture, modifiche ai file e comandi filesystem comuni. Meno interruzioni, più velocità.", flags: ["yes", "yes", "yes", "ask"] },
      { id: "plan", desc: "Esplora e propone un piano senza modificare nulla. Utile quando il rischio è medio/alto o il codice è sconosciuto.", flags: ["yes", "no", "no", "no"] },
      { id: "auto", desc: "Più autonomia per task lunghi, con safety check. Da usare con criteri di verifica chiari.", flags: ["yes", "yes", "yes", "yes"] },
      { id: "dontAsk", desc: "Esegue solo strumenti pre-approvati, senza chiedere ogni volta. Tutto il resto è bloccato.", flags: ["yes", "ask", "ask", "ask"] },
      { id: "bypassPermissions", desc: "Tutto senza prompt. Solo in container/VM isolati: è la modalità più rischiosa.", flags: ["yes", "yes", "yes", "yes"] },
    ];
    const mark = { yes: ["✓", "yes"], ask: ["?", "ask"], no: ["—", "no"] };
    let cur = 0;
    modes.forEach((m, i) => {
      const b = el("button", i === 0 ? "on" : "", m.id);
      b.addEventListener("click", () => { cur = i; paint(); });
      seg.appendChild(b);
    });
    function paint() {
      $$("#perm-modes button").forEach((b, i) => b.classList.toggle("on", i === cur));
      const m = modes[cur];
      desc.innerHTML = `<code>${m.id}</code> — ${m.desc}${m.id === "bypassPermissions" ? ' <span class="pill" style="color:var(--danger);border-color:var(--danger)">⚠ rischioso</span>' : ""}`;
      view.innerHTML = "";
      caps.forEach((c, i) => {
        const [sym, kind] = mark[m.flags[i]];
        const tile = el("div", "perm-cap " + kind, `<span class="mark">${sym}</span> ${c}`);
        view.appendChild(tile);
      });
    }
    paint();
  })();

  /* ========================================================================
     WIDGET 8 · CLI vs UI MATRIX
     ===================================================================== */
  (function matrix() {
    const table = $("#matrix-table"), seg = $("#matrix-profile");
    if (!table) return;
    const rows = [
      { s: "CLI", pro: "veloce, precisa, integrata col terminale", con: "richiede confidenza tecnica", when: "coding serio, repo locali, test, automazioni", rec: ["dev"] },
      { s: "IDE", pro: "dentro l'editor, naturale per chi sviluppa", con: "meno pulita per task lunghi", when: "modifiche mentre lavori nel codice", rec: ["dev"] },
      { s: "Desktop UI", pro: "visuale, accessibile, gestione sessioni", con: "meno scriptabile", when: "multitasking, review, cowork, design", rec: ["nontech"] },
      { s: "Web / Cloud", pro: "task offloadati, sessioni persistenti", con: "ambiente non identico al locale", when: "task lunghi, GitHub, lavoro asincrono", rec: ["dev"] },
      { s: "Cowork UI", pro: "pensata per non tecnici, task e deliverable", con: "non è per coding profondo", when: "report, briefing, documenti", rec: ["nontech"] },
      { s: "Design UI", pro: "canvas, preview, iterazione visuale", con: "non è terminale né IDE", when: "prototipi, schermate, deck", rec: ["nontech"] },
    ];
    let profile = "dev";
    function paint() {
      table.innerHTML = `<thead><tr><th>Superficie</th><th>Pro</th><th>Contro</th><th>Quando usarla</th></tr></thead><tbody></tbody>`;
      const body = $("tbody", table);
      rows.forEach((r) => {
        const tr = el("tr", r.rec.indexOf(profile) >= 0 ? "rec" : "");
        tr.innerHTML = `<td class="surf-name">${r.s}${r.rec.indexOf(profile) >= 0 ? ' <span class="pill clay">consigliata</span>' : ""}</td>
          <td>${r.pro}</td><td>${r.con}</td><td>${r.when}</td>`;
        body.appendChild(tr);
      });
    }
    $$("#matrix-profile button").forEach((b) => b.addEventListener("click", () => {
      profile = b.dataset.p;
      $$("#matrix-profile button").forEach((x) => x.classList.toggle("on", x === b));
      paint();
    }));
    paint();
  })();

  /* ========================================================================
     WIDGET 9 · 4D FRAMEWORK
     ===================================================================== */
  (function fourd() {
    const wrap = $("#fourd"), panel = $("#fourd-panel");
    if (!wrap) return;
    const ds = [
      { ico: "📤", nm: "Delegation", en: "delega", txt: "Capire se, quando e quanto delegare all'AI. Non tutto va delegato: scegli i task giusti." },
      { ico: "📝", nm: "Description", en: "descrizione", txt: "Descrivere bene obiettivo, contesto, vincoli, formato e criteri di qualità. È il cuore del prompt." },
      { ico: "🧐", nm: "Discernment", en: "discernimento", txt: "Valutare l'output: accuratezza, rischi, adeguatezza. Riconoscere quando una risposta è plausibile ma sbagliata." },
      { ico: "🛡️", nm: "Diligence", en: "diligenza", txt: "Restare responsabili: verificare, proteggere i dati, mantenere fiducia e standard. L'AI accelera, tu rispondi del risultato." },
    ];
    panel.innerHTML = '<span style="color:var(--muted-2)">Clicca una delle 4 D per la spiegazione.</span>';
    ds.forEach((d, i) => {
      const c = el("button", "dcard");
      c.innerHTML = `<div class="d-ico">${d.ico}</div><div class="d-nm">${d.nm}</div><div class="d-en">${d.en}</div>`;
      c.addEventListener("click", () => {
        $$(".dcard", wrap).forEach((x) => x.classList.remove("on"));
        c.classList.add("on");
        panel.innerHTML = `<strong>${d.ico} ${d.nm}</strong> — ${d.txt}`;
      });
      wrap.appendChild(c);
    });
  })();

  /* ========================================================================
     WIDGET 9b · STEERING HELPER (CLAUDE.md / Skill / Subagent / MCP / Hook…)
     ===================================================================== */
  (function steer() {
    const seg = $("#steer-scenarios"), out = $("#steer-result");
    if (!seg) return;
    const cases = [
      { sc: "Claude sbaglia due volte la stessa convenzione", pick: "CLAUDE.md",
        why: "Contesto sempre caricato nelle sessioni: scrivi lì comandi, convenzioni, stile e gotcha del progetto.",
        src: ["Claude Code — Memory", "https://code.claude.com/docs/en/memory"] },
      { sc: "Ripeti sempre lo stesso prompt / playbook", pick: "Skill",
        why: "Istruzioni, script e risorse caricati on demand: incapsuli la procedura una volta e Claude la richiama quando serve.",
        src: ["Lessons — skills", "https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills"] },
      { sc: "Serve un worker che esplora molto senza sporcare il contesto", pick: "Subagent",
        why: "Assistente isolato per side task/esplorazioni: lavora a parte e torna solo un summary, tenendo pulito il thread principale.",
        src: ["Anthropic — Subagents", "https://docs.anthropic.com/en/docs/claude-code/sub-agents"] },
      { sc: "Devi collegarti a dati o tool esterni (GitHub, Figma, DB)", pick: "MCP / Connector",
        why: "Standard aperto + integrazione concreta per leggere e agire dove vivono i dati, senza copia/incolla.",
        src: ["Claude Code — MCP", "https://code.claude.com/docs/en/mcp"] },
      { sc: "Vuoi un'automazione deterministica a un evento (es. lint a ogni modifica)", pick: "Hook",
        why: "Automazione deterministica agganciata a un evento: gira sempre allo stesso modo, non dipende dal giudizio del modello.",
        src: ["Claude Code — Hooks", "https://docs.anthropic.com/en/docs/claude-code/hooks"] },
      { sc: "Vuoi cambiare il tono / stile delle risposte", pick: "Output style",
        why: "Regola lo stile con cui Claude risponde, senza toccare la logica del task.",
        src: ["Steering Claude Code", "https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more"] },
    ];
    out.innerHTML = '<span style="color:var(--muted-2)">Scegli una situazione qui sopra per la raccomandazione.</span>';
    cases.forEach((c, i) => {
      const b = el("button", "", c.sc);
      b.style.textAlign = "left";
      b.addEventListener("click", () => {
        $$("#steer-scenarios button").forEach((x) => x.classList.toggle("on", x === b));
        out.innerHTML = `<div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap">
          <span class="pill clay">→ ${c.pick}</span>
          <strong>${c.sc}</strong></div>
          <p style="margin:10px 0 0">${c.why}</p>
          <div class="src-row"><a class="src" href="${c.src[1]}" target="_blank" rel="noopener">${c.src[0]}</a></div>`;
      });
      seg.appendChild(b);
    });
  })();

  /* ========================================================================
     WIDGET 9c · CONNECTORS MAP
     ===================================================================== */
  (function connectors() {
    const grid = $("#conn-grid"), panel = $("#conn-panel");
    if (!grid) return;
    const items = [
      { ico: "🐙", nm: "GitHub", txt: "Leggere issue e PR, navigare il repo, aprire pull request: il lavoro su codice resta dove già vive." },
      { ico: "🎨", nm: "Figma", txt: "Leggere un design e usarlo come riferimento, fino a generare codice a partire dal file." },
      { ico: "💬", nm: "Slack", txt: "Leggere thread e messaggi per produrre riassunti, briefing o azioni di follow-up." },
      { ico: "✉️", nm: "Gmail", txt: "Leggere e fare triage delle email, preparare bozze di risposta a partire dal contesto." },
      { ico: "🗄️", nm: "Database", txt: "Interrogare i dati dove risiedono, senza esportarli a mano in un foglio." },
      { ico: "🚨", nm: "Sentry / Monitoring", txt: "Leggere errori e tracce per indagare un problema e proporre una correzione." },
    ];
    panel.innerHTML = '<span style="color:var(--muted-2)">Clicca un sistema per vedere cosa può farci Claude.</span>';
    items.forEach((it) => {
      const c = el("button", "dcard");
      c.innerHTML = `<div class="d-ico">${it.ico}</div><div class="d-nm">${it.nm}</div>`;
      c.addEventListener("click", () => {
        $$(".dcard", grid).forEach((x) => x.classList.remove("on"));
        c.classList.add("on");
        panel.innerHTML = `<strong>${it.ico} ${it.nm}</strong> — ${it.txt}`;
      });
      grid.appendChild(c);
    });
  })();

  /* ========================================================================
     WIDGET 9d · CLI SESSION STEPPER
     ===================================================================== */
  (function cli() {
    const term = $("#cli-term"), prog = $("#cli-progress");
    if (!term) return;
    const lines = [
      { cls: "cmd", txt: '<span class="prompt">$</span> cd progetto-web && claude', tag: "avvio" },
      { cls: "out", txt: "Claude Code è attivo nella cartella del progetto." },
      { cls: "user", txt: '<span class="prompt">&gt;</span> Spiegami cosa fa @src/auth.ts', tag: "contesto con @" },
      { cls: "out", txt: "Letto il file: gestisce login, refresh token e logout…" },
      { cls: "user", txt: '<span class="prompt">&gt;</span> Trova il bug che fa fallire il login e proponi un piano', tag: "plan mode" },
      { cls: "out", txt: "Piano (nessuna modifica): 1) token scaduto non gestito · 2) fix in verifyToken() · 3) test" },
      { cls: "user", txt: '<span class="prompt">&gt;</span> Procedi, poi lancia i test' },
      { cls: "out", txt: "Modificato src/auth.ts · eseguo: npm test" },
      { cls: "ok", txt: "✓ 14 test verdi — bug del login risolto", tag: "verify" },
    ];
    let shown = 0;
    function paint() {
      term.innerHTML = '<div class="tbar"><i></i><i></i><i></i></div>' +
        lines.slice(0, shown).map((l) =>
          `<div class="term-line ${l.cls}">${l.txt}${l.tag ? `<span class="tag">${l.tag}</span>` : ""}</div>`).join("") +
        (shown === 0 ? '<div class="term-line out">Premi «Passo successivo» per simulare una sessione.</div>' : "");
      prog.textContent = shown >= lines.length ? "sessione completa · obiettivo raggiunto" : `passo ${shown} / ${lines.length}`;
    }
    $("#cli-step").addEventListener("click", () => { if (shown < lines.length) shown++; paint(); });
    $("#cli-reset").addEventListener("click", () => { shown = 0; paint(); });
    paint();
  })();

  /* ========================================================================
     WIDGET 11 · GLOSSARY
     ===================================================================== */
  (function glossary() {
    const list = $("#gloss-list"), search = $("#gloss-search");
    if (!list) return;
    const terms = [
      ["Token", "Unità minima di testo (pezzo di parola, parola corta, simbolo) con cui il modello legge e scrive.", "Anthropic — Glossary", "https://docs.anthropic.com/en/docs/resources/glossary"],
      ["LLM", "Modello addestrato su grandi testi che genera linguaggio prevedendo il token successivo più probabile.", "Anthropic — Glossary", "https://docs.anthropic.com/en/docs/resources/glossary"],
      ["Context window", "La memoria di lavoro della sessione: istruzioni, file, tool result e cronologia che il modello ha davanti. Ha un limite.", "Anthropic — Context windows", "https://docs.anthropic.com/en/docs/build-with-claude/context-windows"],
      ["Temperatura", "Parametro che regola quanto l'output è prevedibile (bassa) o vario/creativo (alta), modulando le probabilità.", "Google ML Crash Course", "https://developers.google.com/machine-learning/crash-course/llm/transformers"],
      ["Transformer", "L'architettura (self-attention) alla base degli LLM moderni, introdotta in «Attention Is All You Need» (2017).", "Vaswani et al. — arXiv", "https://arxiv.org/abs/1706.03762"],
      ["Hallucination", "Output convincente ma errato: nasce dall'incrocio di predizione e lacune di conoscenza.", "Anthropic — Mapping the Mind", "https://www.anthropic.com/research/mapping-mind-language-model"],
      ["Agente", "Sistema in cui il modello dirige dinamicamente processo e strumenti per perseguire un obiettivo multi-step.", "Anthropic — Building effective agents", "https://www.anthropic.com/engineering/building-effective-agents"],
      ["Workflow", "Sistema con passi predefiniti (a differenza dell'agente, dove è il modello a decidere il percorso).", "Anthropic — Building effective agents", "https://www.anthropic.com/engineering/building-effective-agents"],
      ["Prompt engineering", "Scrivere istruzioni efficaci: ruolo, obiettivo, contesto, vincoli, esempi, formato, criteri di successo.", "Anthropic — Prompt engineering", "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"],
      ["Context engineering", "Gestire cosa metti, mantieni, recuperi, comprimi o isoli nel contesto disponibile al modello durante un task.", "Anthropic — Context engineering", "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"],
      ["Tool use", "La capacità del modello di chiamare strumenti esterni (funzioni, API) per agire oltre il testo.", "Anthropic — Tool use", "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview"],
      ["Claude Code", "Agente di coding che legge/modifica file, esegue comandi e verifica, nel loop capisci→agisci→verifica.", "Claude Code — Overview", "https://code.claude.com/docs/en/overview"],
      ["CLAUDE.md", "File di istruzioni persistenti rilette nelle sessioni di Claude Code (comandi, convenzioni, stile, gotcha).", "Claude Code — Memory", "https://code.claude.com/docs/en/memory"],
      ["Permission modes", "Livelli di autonomia di Claude Code (default, acceptEdits, plan, auto, dontAsk, bypassPermissions).", "Claude Code — Permission modes", "https://code.claude.com/docs/en/permission-modes"],
      ["Skills", "Cartelle con istruzioni, script e risorse che Claude carica on demand quando rilevanti.", "Lessons from building Claude Code — skills", "https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills"],
      ["Subagents", "Assistenti isolati per side task/esplorazioni: tengono pulito il contesto principale e tornano un summary.", "Anthropic — Subagents", "https://docs.anthropic.com/en/docs/claude-code/sub-agents"],
      ["MCP", "Model Context Protocol: standard aperto per collegare Claude a strumenti, dati e API esterni.", "Claude Code — MCP", "https://code.claude.com/docs/en/mcp"],
      ["Compaction", "Riassunto automatico del contesto quando la context window si riempie.", "Claude Code — Context window", "https://code.claude.com/docs/en/context-window"],
      ["Prompt caching", "Tecnica che migliora velocità e costi riusando parti di contesto; può essere invalidata da cambiamenti a tool/modello.", "Prompt caching is everything", "https://claude.com/blog/lessons-from-building-claude-code-prompt-caching-is-everything"],
      ["Artifact", "Contenuto sostanzioso e autonomo (documento, codice, sito HTML, SVG, diagramma, componente React) che Claude apre in una finestra dedicata: modificabile, versionabile e condivisibile.", "Claude — What are Artifacts", "https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them"],
      ["Hook", "Automazione deterministica agganciata a un evento (es. lint/test a ogni modifica): gira sempre allo stesso modo, non dipende dal giudizio del modello.", "Claude Code — Hooks", "https://docs.anthropic.com/en/docs/claude-code/hooks"],
    ].sort((a, b) => a[0].localeCompare(b[0]));

    function build(filter) {
      list.innerHTML = "";
      const f = (filter || "").toLowerCase();
      let shown = 0;
      terms.forEach(([t, d, sn, su]) => {
        if (f && t.toLowerCase().indexOf(f) === -1 && d.toLowerCase().indexOf(f) === -1) return;
        shown++;
        const det = el("details");
        det.innerHTML = `<summary>${t}<span class="g-plus"></span></summary>
          <div class="g-body">${d}<div class="src-row"><a class="src" href="${su}" target="_blank" rel="noopener">${sn}</a></div></div>`;
        list.appendChild(det);
      });
      if (!shown) list.innerHTML = '<p class="note">Nessun termine trovato.</p>';
    }
    search.addEventListener("input", () => build(search.value));
    build("");
  })();

  /* ========================================================================
     WIDGET 12 · BIBLIOGRAPHY
     ===================================================================== */
  (function biblio() {
    const box = $("#biblio");
    if (!box) return;
    const groups = [
      ["Basi: come funziona un LLM", [
        ["«Attention Is All You Need» (Transformer)", "https://arxiv.org/abs/1706.03762"],
        ["Google — ML Crash Course: LLM/Transformers", "https://developers.google.com/machine-learning/crash-course/llm/transformers"],
        ["Stanford CS324 — Large Language Models", "https://stanford-cs324.github.io/winter2022/"],
        ["Anthropic — Glossary", "https://docs.anthropic.com/en/docs/resources/glossary"],
        ["Anthropic — Mapping the Mind of a LLM", "https://www.anthropic.com/research/mapping-mind-language-model"],
      ]],
      ["Agenti", [
        ["Anthropic — Building effective agents", "https://www.anthropic.com/engineering/building-effective-agents"],
        ["Google Cloud — What are AI agents?", "https://cloud.google.com/discover/what-are-ai-agents"],
        ["Microsoft Learn — AI Agents for Beginners", "https://learn.microsoft.com/en-us/shows/ai-agents-for-beginners/"],
        ["OpenAI — Agents SDK guide", "https://developers.openai.com/api/docs/guides/agents"],
        ["OpenAI — MCP (server, trust &amp; permessi)", "https://developers.openai.com/api/docs/mcp"],
        ["Claude Code in large codebases (harness)", "https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start"],
      ]],
      ["Prompt & Context engineering", [
        ["Anthropic — Prompt engineering overview", "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"],
        ["Anthropic — Effective context engineering", "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"],
        ["OpenAI — Prompt engineering", "https://developers.openai.com/api/docs/guides/prompt-engineering"],
        ["Google — Gemini prompt design strategies", "https://ai.google.dev/gemini-api/docs/prompting-strategies"],
        ["Anthropic — Context windows", "https://docs.anthropic.com/en/docs/build-with-claude/context-windows"],
      ]],
      ["Claude Code", [
        ["Claude Code — Overview", "https://code.claude.com/docs/en/overview"],
        ["How Claude Code works", "https://code.claude.com/docs/en/how-claude-code-works"],
        ["Best practices", "https://code.claude.com/docs/en/best-practices"],
        ["Context window", "https://code.claude.com/docs/en/context-window"],
        ["Memory", "https://code.claude.com/docs/en/memory"],
        ["Permission modes", "https://code.claude.com/docs/en/permission-modes"],
        ["Common workflows", "https://code.claude.com/docs/en/common-workflows"],
        ["MCP", "https://code.claude.com/docs/en/mcp"],
        ["Subagents", "https://docs.anthropic.com/en/docs/claude-code/sub-agents"],
        ["Hooks", "https://docs.anthropic.com/en/docs/claude-code/hooks"],
        ["Steering Claude Code (blog)", "https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more"],
        ["Skills (blog)", "https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills"],
        ["Prompt caching (blog)", "https://claude.com/blog/lessons-from-building-claude-code-prompt-caching-is-everything"],
      ]],
      ["Claude · Chat, Cowork, Design", [
        ["Claude — Product overview", "https://claude.com/product/overview"],
        ["Anthropic — Intro to Claude", "https://docs.anthropic.com/en/docs/intro-to-claude"],
        ["Anthropic — Tool use overview", "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview"],
        ["Claude — What are Artifacts", "https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them"],
      ]],
    ];
    groups.forEach(([title, links]) => {
      const g = el("div", "bgroup");
      g.innerHTML = `<h4>${title}</h4>` + links.map(([n, u]) =>
        `<a href="${u}" target="_blank" rel="noopener">${n}<span>${u.replace(/^https?:\/\//, "")}</span></a>`).join("");
      box.appendChild(g);
    });
  })();

  /* ============================================================= INIT */
  render();
})();
