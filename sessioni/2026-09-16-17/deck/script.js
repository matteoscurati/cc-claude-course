/* =========================================================================
   Update settembre 2026 · modelli, harness, orchestrazione, Claude Design
   Engine del deck (copiato da ../../../site/script.js con tre ritocchi:
   timer con data-target, checkpoint orario da data-start, hash routing)
   + widget della sessione. Vanilla JS, nessuna dipendenza.
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

  /* ======================================================================
     DATA · tutti i numeri del deck, con fonte e stato di verifica.
     status: "verified" = letto su sito ufficiale / Hugging Face il giorno
     indicato; "check" = un dato (di solito la data) viene da fonti terze,
     da confermare la mattina del 16 o da togliere.
     ====================================================================== */
  const DATA = {
    verified: "2026-09-14",
    tiers: [
      { id: "frontier", name: "Frontiera", price: "≈ $10 / $50", note: "il massimo disponibile; effort low→max; disponibilità a rischio" },
      { id: "high", name: "Alta", price: "≈ $4–5 / $20–25", note: "vicina alla frontiera a metà prezzo: il default per il lavoro difficile" },
      { id: "mid", name: "Media", price: "≈ $2 / $10–12", note: "il cavallo di battaglia: esecuzione, produzione, alto volume" },
      { id: "low", name: "Economica", price: "< $1 / < $5", note: "classificazione, estrazione, worker di massa; qui vive l'open weight" },
    ],
    models: [
      { tier: "frontier", vendor: "anthropic", name: "Claude Fable 5.1", date: "set 2026", inp: 10, out: 50, ctx: "1M", effort: "low → max", note: "Cache read $0,25. Su Pro e Max via usage credits. Safety classifier: alcune richieste vengono rifiutate e reindirizzate a Opus.", src: ["Anthropic — Fable 5.1", "https://www.anthropic.com/claude-fable-and-mythos-5-1"], status: "verified" },
      { tier: "frontier", vendor: "openai", name: "GPT-6 Astra", date: "set 2026", inp: 10, out: 50, ctx: "1,05M", effort: "low → max", note: "`gpt-6-astra`, cached input $1. Modello primario di Codex. Rollout iniziale limitato, poi Plus/Pro/Business/Enterprise, API, Azure, Bedrock.", src: ["OpenAI — GPT-6 Astra", "https://developers.openai.com/api/docs/models/gpt-6-astra"], status: "check", why: "data GA (3 set) da fonte terza" },
      { tier: "high", vendor: "anthropic", name: "Claude Opus 5", date: "24 lug 2026", inp: 5, out: 25, ctx: "1M", effort: "low → max", note: "Default su Max, il più forte su Pro. Disponibile in Claude Code, Cowork e Design.", src: ["Anthropic — Opus 5", "https://www.anthropic.com/news/claude-opus-5"], status: "verified" },
      { tier: "high", vendor: "openai", name: "GPT-5.6 Sol", date: "lug 2026", inp: 4, out: 20, ctx: "1,05M", effort: "none → max", note: "Prezzo promozionale almeno fino al 21 novembre 2026 (cached $0,40). Era il flagship prima di Astra.", src: ["OpenAI — pricing", "https://developers.openai.com/api/docs/pricing"], status: "check", why: "data GA (9 lug) da fonte terza" },
      { tier: "high", vendor: "xai", name: "Grok 4.6", date: "ago 2026", inp: 2, out: 6, ctx: "500k", effort: "—", note: "Flagship xAI per codice e chat; long context $4 / $12. Grok Build 0.1 (coding) $1 / $2.", src: ["xAI — Models", "https://docs.x.ai/docs/models"], status: "check", why: "data (12 ago) da fonte terza" },
      { tier: "high", vendor: "cn", name: "Kimi K3 · Moonshot", date: "lug 2026", inp: 3, out: 15, ctx: "1M", effort: "—", ow: true, note: "2,8T parametri totali, 104B attivi, multimodale. Pesi aperti con Kimi K3 License. Cache hit $0,30.", src: ["Kimi — pricing", "https://platform.kimi.ai/docs/pricing/chat"], status: "verified" },
      { tier: "mid", vendor: "anthropic", name: "Claude Sonnet 5", date: "30 giu 2026", inp: 2, out: 10, ctx: "1M", effort: "low → max", note: "«Il Sonnet più agentico»: finisce task dove i Sonnet precedenti si fermavano. Vicino a Opus 4.8 a prezzo inferiore.", src: ["Anthropic — Sonnet 5", "https://www.anthropic.com/news/claude-sonnet-5"], status: "verified" },
      { tier: "mid", vendor: "openai", name: "GPT-5.6 Terra", date: "lug 2026", inp: 2, out: 12, ctx: "1,05M", effort: "none → max", note: "Il tier intermedio di GPT-5.6; cached $0,20.", src: ["OpenAI — pricing", "https://developers.openai.com/api/docs/pricing"], status: "verified" },
      { tier: "mid", vendor: "google", name: "Gemini 3.1 Pro", date: "preview", inp: 2, out: 12, ctx: "≤200k a questo prezzo", effort: "thinking", note: "Sopra 200k token: $4 / $18. I modelli Pro sono a pagamento dal 1 aprile 2026.", src: ["Gemini API — pricing", "https://ai.google.dev/gemini-api/docs/pricing"], status: "verified" },
      { tier: "mid", vendor: "cn", name: "GLM-5.3 · Z.ai", date: "ago 2026", inp: 1.4, out: 4.4, ctx: "1M", effort: "—", ow: true, note: "753B, «il modello open weight più capace per il coding» secondo Z.ai; forte su agentic e cyber. Cached $0,26.", src: ["Z.ai — pricing", "https://docs.z.ai/guides/overview/pricing"], status: "check", why: "data (14 ago) da fonte terza" },
      { tier: "mid", vendor: "cn", name: "DeepSeek V4 Pro", date: "ago 2026", inp: 1.32, out: 3.96, ctx: "1M", effort: "—", ow: true, note: "Checkpoint 0813. Fuori punta costa la metà.", src: ["DeepSeek — pricing", "https://api-docs.deepseek.com/quick_start/pricing"], status: "verified" },
      { tier: "low", vendor: "anthropic", name: "Claude Haiku 4.5", date: "2025", inp: 1, out: 5, ctx: "200k", effort: "—", note: "Cache read $0,10. Classificazione, estrazione, worker.", src: ["Claude — pricing", "https://claude.com/pricing"], status: "verified" },
      { tier: "low", vendor: "openai", name: "GPT-5.6 Luna", date: "lug 2026", inp: 0.2, out: 1.2, ctx: "1,05M", effort: "none → max", note: "Il tier economico di GPT-5.6; cached $0,02. Prezzo tagliato dell'80% il 30 luglio.", src: ["OpenAI — pricing", "https://developers.openai.com/api/docs/pricing"], status: "verified" },
      { tier: "low", vendor: "google", name: "Gemini 3.8 Flash", date: "set 2026", inp: 0.75, out: 3.75, ctx: "1M", effort: "thinking", note: "«Latest»; prezzo introduttivo fino al 31 dicembre 2026, poi $1,50 / $7,50. Gemini 2.5 Flash-Lite resta a $0,10 / $0,40.", src: ["Gemini API — pricing", "https://ai.google.dev/gemini-api/docs/pricing"], status: "verified" },
      { tier: "low", vendor: "cn", name: "DeepSeek V4.1 Flash", date: "10 set 2026", inp: 0.3, out: 1.2, ctx: "1M", effort: "—", ow: true, note: "`deepseek-flash`, MoE 552B, multimodale, output fino a 384k. Fuori punta $0,15 / $0,60. Pesi su Hugging Face.", src: ["DeepSeek — V4.1 Flash", "https://api-docs.deepseek.com/news/news260910/"], status: "verified" },
      { tier: "low", vendor: "cn", name: "MiniMax M3", date: "giu 2026", inp: 0.3, out: 1.2, ctx: "1M", effort: "—", ow: true, note: "428B totali / 23B attivi, sparse attention per contesti da 1M, multimodale. Cache read $0,06.", src: ["MiniMax — pricing", "https://platform.minimax.io/docs/guides/pricing-paygo"], status: "verified" },
      { tier: "low", vendor: "cn", name: "GLM-5.3-Flash", date: "ago 2026", inp: 0.15, out: 0.5, ctx: "1M", effort: "—", ow: true, note: "La versione compatta di GLM-5.3; cached $0,03.", src: ["Z.ai — pricing", "https://docs.z.ai/guides/overview/pricing"], status: "verified" },
      { tier: "low", vendor: "cn", name: "Qwen3.8 27B · Alibaba", date: "14 ago 2026", inp: null, out: null, ctx: "262k", effort: "—", ow: true, note: "Pesi aperti (Apache-2.0); il fratello Qwen3.8-2.4T-A95B porta un modello «Max-class» in open release. Prezzo: dipende da chi lo serve.", src: ["Qwen3.8 — repo", "https://github.com/QwenLM/Qwen3.8"], status: "verified" },
      { tier: "high", vendor: "cn", name: "Hy4-preview · Tencent", date: "ago 2026", inp: null, out: null, ctx: "—", effort: "—", ow: true, note: "770B totali / 49B attivi, Apache 2.0, «open-source frontier» secondo Tencent. Prezzo: dipende da chi lo serve.", src: ["Hy4-preview — Hugging Face", "https://huggingface.co/tencent/Hy4-preview"], status: "check", why: "data (28 ago) da fonte terza" },
    ],
    vendors: { anthropic: "Anthropic", openai: "OpenAI", google: "Google", xai: "xAI", cn: "Cina (open weight)" },
  };

  /* ============================================================= DECK NAV */
  const slides = $$(".slide");
  const total = slides.length;
  let idx = 0;

  const progressbar = $("#progressbar");
  const navCur = $("#nav-cur"), navName = $("#nav-name"), navTotal = $("#nav-total"), navPlan = $("#nav-plan");
  const navPrev = $("#nav-prev"), navNext = $("#nav-next");
  const dotsWrap = $("#dots");
  const ovGrid = $("#ov-grid");

  navTotal.textContent = total;

  slides.forEach((s, i) => {
    const d = el("button", i === 0 ? "on" : "");
    d.title = s.dataset.title || `Sezione ${i + 1}`;
    d.addEventListener("click", () => go(i));
    dotsWrap.appendChild(d);

    const c = el("button", "ov-card" + (i === 0 ? " on" : ""));
    c.innerHTML = `<div class="ov-n">${String(i).padStart(2, "0")}${s.dataset.start ? ` · ${s.dataset.start}` : ""}</div>
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
    updatePlan();
    if (location.hash !== "#s" + idx) history.replaceState(null, "", "#s" + idx);
    if (!document.body.classList.contains("scrollmode")) window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }
  function go(i) { idx = clamp(i, 0, total - 1); render(); }
  function next() { go(idx + 1); }
  function prev() { go(idx - 1); }

  navPrev.addEventListener("click", prev);
  navNext.addEventListener("click", next);
  window.addEventListener("hashchange", () => {
    const m = /^#s(\d+)$/.exec(location.hash);
    if (m && parseInt(m[1], 10) !== idx) go(parseInt(m[1], 10));
  });

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

  /* ============================================================= TIMER + CHECKPOINT */
  const timerBox = $("#timer");
  const targetMin = parseInt(timerBox.dataset.target || "60", 10);
  let tStarted = null, tElapsed = 0, tTick = null;
  const fmt = (s) => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  const elapsedSec = () => tElapsed + (tStarted ? Math.floor((Date.now() - tStarted) / 1000) : 0);
  function paintTimer() {
    const sec = elapsedSec();
    $(".t-elapsed", timerBox).textContent = fmt(sec);
    const tgt = $(".t-target", timerBox);
    tgt.textContent = "/ " + fmt(targetMin * 60);
    tgt.style.color = sec > targetMin * 60 ? "var(--danger)" : sec > (targetMin - 10) * 60 ? "var(--gold)" : "var(--muted-2)";
    updatePlan();
  }
  timerBox.addEventListener("click", () => {
    if (tStarted) { tElapsed += Math.floor((Date.now() - tStarted) / 1000); tStarted = null; timerBox.classList.remove("running"); clearInterval(tTick); }
    else { tStarted = Date.now(); timerBox.classList.add("running"); tTick = setInterval(paintTimer, 1000); paintTimer(); }
  });
  timerBox.addEventListener("dblclick", () => { tStarted = null; tElapsed = 0; timerBox.classList.remove("running"); clearInterval(tTick); paintTimer(); });

  // Checkpoint: data-start è l'orario pianificato della sezione; il timer parte alle 11:30 (sezione 0).
  const startOf = (s) => { const m = /^(\d+):(\d+)$/.exec(s || ""); return m ? (parseInt(m[1], 10) * 60 + parseInt(m[2], 10)) : null; };
  const t0 = startOf(slides[0].dataset.start);
  function updatePlan() {
    if (!navPlan) return;
    const st = startOf(slides[idx].dataset.start);
    if (st == null || t0 == null) { navPlan.textContent = ""; return; }
    const planned = (st - t0) * 60;
    if (!tStarted && tElapsed === 0) { navPlan.className = "plan"; navPlan.textContent = `piano ${slides[idx].dataset.start}`; return; }
    const delta = Math.round((elapsedSec() - planned) / 60);
    const sign = delta > 0 ? "+" : delta < 0 ? "−" : "±";
    navPlan.className = "plan " + (delta > 3 ? "late" : delta > 0 ? "warn" : "ok");
    navPlan.textContent = `piano ${slides[idx].dataset.start} · ${sign}${Math.abs(delta)}′`;
  }

  /* ====================================================== helpers widget */
  const vendorPill = (v) => `<span class="pill v-${v}">${DATA.vendors[v] || v}</span>`;
  const srcLink = (s) => `<a class="src" href="${s[1]}" target="_blank" rel="noopener">${s[0]}</a>`;
  const stamp = (elId, extra) => { const e = $(elId); if (e) e.innerHTML = `verificato il ${DATA.verified} su fonti ufficiali${extra ? " · " + extra : ""}`; };
  const price = (m) => m.inp == null ? "pesi aperti" : `$${String(m.inp).replace(".", ",")} / $${String(m.out).replace(".", ",")}`;

  /* ========================================================================
     WIDGET 0 · TIMELINE giugno → settembre
     ===================================================================== */
  (function timeline() {
    const wrap = $("#timeline"), panel = $("#timeline-panel");
    if (!wrap) return;
    const items = [
      { d: "28 mag", v: "anthropic", n: "Dynamic workflows", t: "Claude Code scrive uno script che lancia decine o centinaia di subagent in parallelo (Workflow tool, «ultracode»).", s: ["Introducing dynamic workflows", "https://claude.com/blog/introducing-dynamic-workflows-in-claude-code"] },
      { d: "1 giu", v: "cn", n: "MiniMax M3", t: "428B / 23B attivi, contesto 1M con sparse attention, pesi aperti.", s: ["MiniMax-M3", "https://huggingface.co/MiniMaxAI/MiniMax-M3"] },
      { d: "9 → 12 giu", v: "anthropic", n: "Fable 5 esce e viene sospeso", t: "Uscito il 9, accesso sospeso il 12 dopo un bypass delle protezioni scoperto da ricercatori Amazon.", s: ["Redeploying Fable 5", "https://www.anthropic.com/news/redeploying-fable-5"] },
      { d: "18 giu", v: "google", n: "Gemini CLI → Antigravity CLI", t: "Gemini CLI smette di servire gli account individuali; il nuovo terminale è `agy`, stesso harness di Antigravity 2.0.", s: ["Transitioning Gemini CLI", "https://github.com/google-gemini/gemini-cli/discussions/27274"] },
      { d: "30 giu", v: "anthropic", n: "Claude Sonnet 5", t: "$2 / $10, «il Sonnet più agentico».", s: ["Introducing Sonnet 5", "https://www.anthropic.com/news/claude-sonnet-5"] },
      { d: "1 lug", v: "anthropic", n: "Fable 5 torna", t: "Ridistribuito con classifier migliorato; su Pro/Max/Team via usage credits.", s: ["Redeploying Fable 5", "https://www.anthropic.com/news/redeploying-fable-5"] },
      { d: "lug", v: "openai", n: "GPT-5.6 Sol / Terra / Luna", t: "Tre tier, contesto 1M, effort none→max; il 30 luglio Luna −80% e Terra −20%.", s: ["GPT-5.6", "https://openai.com/index/gpt-5-6/"], chk: true },
      { d: "15 lug", v: "xai", n: "Grok Build open source", t: "Il coding agent di xAI su GitHub: skills, plugin, hooks, MCP, subagent, local-first.", s: ["Grok Build open source", "https://x.ai/news/grok-build-open-source"] },
      { d: "lug", v: "cn", n: "Kimi K3", t: "2,8T parametri, pesi aperti, $3 / $15.", s: ["Kimi-K3", "https://huggingface.co/moonshotai/Kimi-K3"] },
      { d: "24 lug", v: "anthropic", n: "Claude Opus 5", t: "$5 / $25, vicino a Fable 5 a metà prezzo; default su Max.", s: ["Introducing Opus 5", "https://www.anthropic.com/news/claude-opus-5"] },
      { d: "11 ago", v: "xai", n: "Grok Bot", t: "«Team di agenti always-on con il proprio computer»: lavorano dentro le app e tornano solo per le approvazioni.", s: ["Introducing Grok Bot", "https://x.ai/news/introducing-grok-bot"] },
      { d: "ago", v: "cn", n: "Qwen3.8 · GLM-5.3 · Hy4", t: "Qwen3.8 (27B e 2.4T), GLM-5.3 e Flash, Hunyuan Hy4-preview: tre laboratori, pesi aperti in due settimane.", s: ["Qwen3.8", "https://github.com/QwenLM/Qwen3.8"], chk: true },
      { d: "set", v: "openai", n: "GPT-6 Astra", t: "$10 / $50, nuovo flagship e modello primario di Codex; rollout iniziale limitato.", s: ["GPT-6 Astra", "https://openai.com/index/gpt-6-astra/"], chk: true },
      { d: "10 set", v: "cn", n: "DeepSeek V4.1 Flash", t: "`deepseek-flash`, 552B MoE, 1M, multimodale, $0,30 / $1,20; pesi aperti.", s: ["DeepSeek V4.1 Flash", "https://api-docs.deepseek.com/news/news260910/"] },
      { d: "set", v: "anthropic", n: "Claude Fable 5.1", t: "Più veloce e più economico per task di Fable 5; a effort low/medium ≈ Fable 5 a costo molto minore; cache read $0,25.", s: ["Fable 5.1", "https://www.anthropic.com/claude-fable-and-mythos-5-1"] },
    ];
    panel.innerHTML = '<span style="color:var(--muted-2)">Clicca una tappa.</span>';
    items.forEach((it) => {
      const b = el("button", "tl");
      b.innerHTML = `<div class="d">${it.d}${it.chk ? ' <span class="chk">·check</span>' : ""}</div><div class="n">${it.n}</div><div class="v">${DATA.vendors[it.v]}</div>`;
      b.addEventListener("click", () => {
        $$(".tl", wrap).forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        panel.innerHTML = `<div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap"><strong>${it.n}</strong>${vendorPill(it.v)}<span class="pill">${it.d}</span></div><p style="margin:10px 0 0">${it.t}</p><div class="src-row">${srcLink(it.s)}</div>`;
      });
      wrap.appendChild(b);
    });
  })();

  /* ========================================================================
     WIDGET 1 · TIER LADDER (fasce × vendor)
     ===================================================================== */
  (function tierLadder() {
    const wrap = $("#tiers"), panel = $("#tier-panel"), legend = $("#tiers-legend");
    if (!wrap) return;
    panel.innerHTML = '<span style="color:var(--muted-2)">Clicca un modello per la scheda: data, prezzo, contesto, effort, note di disponibilità.</span>';
    DATA.tiers.forEach((t) => {
      const box = el("div", "tier");
      box.innerHTML = `<div class="t-head"><span class="t-name">${t.name}</span><span class="t-price">${t.price} per Mtok in / out</span><span class="w-hint">${t.note}</span></div><div class="t-models"></div>`;
      const row = $(".t-models", box);
      DATA.models.filter((m) => m.tier === t.id).forEach((m) => {
        const b = el("button", "m");
        b.innerHTML = `<i class="${m.vendor}"></i>${m.name}${m.ow ? ' <span class="pill ow">open</span>' : ""}${m.status === "check" ? ' <span class="chk">·check</span>' : ""}`;
        b.addEventListener("click", () => {
          $$(".m", wrap).forEach((x) => x.classList.remove("on"));
          b.classList.add("on");
          panel.innerHTML = `<div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap"><strong>${m.name}</strong>${vendorPill(m.vendor)}<span class="pill">${m.date}</span><span class="pill clay">${price(m)} / Mtok</span><span class="pill">contesto ${m.ctx}</span><span class="pill sage">effort ${m.effort}</span>${m.ow ? '<span class="pill ow">pesi aperti</span>' : ""}</div>
            <p style="margin:10px 0 0">${m.note}</p>
            ${m.status === "check" ? `<p class="note"><span class="chk">check</span>: ${m.why}.</p>` : ""}
            <div class="src-row">${srcLink(m.src)}</div>`;
        });
        row.appendChild(b);
      });
      wrap.appendChild(box);
    });
    legend.innerHTML = Object.keys(DATA.vendors).map((v) => `<span><i class="${v}" style="background:var(--${v === "anthropic" ? "clay" : v === "openai" ? "sage" : v === "google" ? "gold" : v === "xai" ? "muted-2" : "violet"})"></i>${DATA.vendors[v]}</span>`).join("") + '<span><span class="pill ow">open</span> pesi scaricabili</span>';
    stamp("#tiers-verified", "prezzi in dollari per milione di token, tariffa standard, senza sconti batch o fuori punta");
  })();

  /* ========================================================================
     WIDGET 1b · EFFORT LEVER (illustrativo)
     ===================================================================== */
  (function effortLever() {
    const r = $("#effort");
    if (!r) return;
    const lv = [
      { n: "low", tok: "×0,3", time: "×0,4", fit: "chat, classificazione, task di routine", note: "Meno chiamate a strumenti, meno preambolo, risposte più secche. Su Fable 5.1 «a effort low o medium risultati simili o migliori di Fable 5 a costo molto più basso»." },
      { n: "medium", tok: "×0,6", time: "×0,7", fit: "lavoro quotidiano, dove la qualità regge", note: "Il gradino di risparmio quando high è troppo: misura su un campione di richieste reali prima di alzare il default." },
      { n: "high", tok: "×1", time: "×1", fit: "default: coding, analisi, lavoro sensibile", note: "Il punto di equilibrio tra qualità e token. Equivale a non impostare nulla su Claude." },
      { n: "xhigh", tok: "×1,6", time: "×1,5", fit: "coding e agentic di lunga durata", note: "Il default di Claude Code e il livello «ultracode». Sui modelli recenti l'effort conta più che su qualunque generazione precedente." },
      { n: "max", tok: "×2,5", time: "×2,2", fit: "quando la correttezza vale più del costo", note: "Da usare quando la misura mostra margine sopra xhigh: pianificazione, verifica finale, sintesi tra tentativi." },
    ];
    function paint() {
      const l = lv[parseInt(r.value, 10)];
      $("#ef-tokens").textContent = l.tok;
      $("#ef-time").textContent = l.time;
      $("#ef-fit").textContent = l.n;
      $("#ef-note").innerHTML = `<strong>${l.n}</strong> · adatto a: ${l.fit}. ${l.note} <em>Moltiplicatori illustrativi rispetto a «high»; i livelli sono quelli esposti da Anthropic (low → max) e OpenAI (none → max).</em>`;
    }
    r.addEventListener("input", paint);
    paint();
  })();

  /* ========================================================================
     WIDGET 2 · HARNESS MATRIX (ingredienti × harness)
     ===================================================================== */
  (function harnessMatrix() {
    const table = $("#hm"), panel = $("#hm-panel");
    if (!table) return;
    const H = [
      { id: "cc", n: "Claude Code", v: "anthropic", model: "proprietario (Claude)", t: "CLI, desktop, IDE, web, Slack. Harness di default per il coding; con i workflow dinamici scrive harness su misura.", s: ["Claude Code — docs", "https://code.claude.com/docs/en/overview"] },
      { id: "cx", n: "Codex", v: "openai", model: "proprietario (GPT-6 Astra)", t: "CLI, IDE, cloud, GitHub, Slack. Sandbox a livello di sistema operativo; `/goal` per lavoro autonomo multi-step.", s: ["Codex — docs", "https://learn.chatgpt.com/docs"] },
      { id: "ag", n: "Antigravity CLI", v: "google", model: "proprietario (Gemini)", t: "`agy`, in Go; ha sostituito Gemini CLI il 18 giugno per gli account individuali. Stesso harness di Antigravity 2.0; workflow asincroni in background.", s: ["Antigravity CLI", "https://antigravity.google/blog/introducing-google-antigravity-cli"] },
      { id: "gk", n: "Grok Build + Bot", v: "xai", model: "Grok; Build è open source e punta anche a inferenza locale", t: "Grok Build: coding agent CLI open source dal 15 luglio. Grok Bot: agenti always-on con il proprio computer, memoria, approvazioni (11 agosto).", s: ["Grok Bot", "https://x.ai/news/introducing-grok-bot"] },
      { id: "he", n: "Hermes Agent", v: "cn", model: "agnostico: Nous, OpenRouter, OpenAI, endpoint proprio", t: "Nous Research, MIT, ~245k stelle. Daemon persistente, memoria tra sessioni, cron, gateway Telegram/Slack/WhatsApp/Discord/Signal/email, si scrive le skill da solo.", s: ["Hermes Agent", "https://github.com/NousResearch/hermes-agent"] },
    ];
    H[4].v = "openweight"; DATA.vendors.openweight = "open source";
    const ING = [
      { n: "File di istruzioni", cells: { cc: ["yes", "CLAUDE.md"], cx: ["yes", "AGENTS.md"], ag: ["yes", "istruzioni di progetto"], gk: ["yes", "config.toml + istruzioni"], he: ["yes", "profilo utente persistente"] } },
      { n: "Skills", cells: { cc: ["yes", "skills / plugin"], cx: ["yes", "skills"], ag: ["yes", "Agent Skills"], gk: ["yes", "skills"], he: ["yes", "skill auto-generate (agentskills.io)"] } },
      { n: "Hooks", cells: { cc: ["yes", "hooks"], cx: ["yes", "hooks"], ag: ["yes", "hooks"], gk: ["yes", "hooks"], he: ["part", "cron + eventi"] } },
      { n: "Subagent", cells: { cc: ["yes", "subagent, agent teams"], cx: ["yes", "subagent"], ag: ["yes", "subagent"], gk: ["yes", "subagent"], he: ["part", "delega via skill"] } },
      { n: "MCP / connettori", cells: { cc: ["yes", "MCP"], cx: ["yes", "MCP"], ag: ["yes", "plugin (ex extensions)"], gk: ["yes", "MCP server"], he: ["yes", "MCP + 16 piattaforme"] } },
      { n: "Sandbox / permessi", cells: { cc: ["yes", "permission modes"], cx: ["yes", "sandbox OS-level"], ag: ["part", "permessi"], gk: ["part", "local-first"], he: ["part", "self-hosted"] } },
      { n: "Memoria persistente", cells: { cc: ["part", "memory files"], cx: ["part", "AGENTS.md"], ag: ["part", "progetto"], gk: ["yes", "Grok Bot: memoria"], he: ["yes", "FTS5 + riassunti"] } },
      { n: "Orchestrazione", cells: { cc: ["yes", "Workflow tool, teams"], cx: ["yes", "/goal, cloud"], ag: ["yes", "workflow async"], gk: ["yes", "team di bot"], he: ["part", "daemon + cron"] } },
    ];
    const head = `<thead><tr><th></th>${H.map((h) => `<th class="col"><button class="c hdr" data-h="${h.id}">${h.n}</button></th>`).join("")}</tr></thead>`;
    const body = `<tbody>${ING.map((ing, ri) => `<tr><td class="row">${ing.n}</td>${H.map((h) => {
      const c = ing.cells[h.id]; return `<td class="cell"><button class="c ${c[0]}" data-r="${ri}" data-h="${h.id}">${c[0] === "no" ? "—" : c[1]}</button></td>`; }).join("")}</tr>`).join("")}</tbody>`;
    table.innerHTML = head + body;
    panel.innerHTML = '<span style="color:var(--muted-2)">Pieno = presente con quel nome; tratteggiato = parziale o ottenuto in altro modo. Clicca un\'intestazione per la scheda dell\'harness.</span>';
    $$(".c", table).forEach((b) => b.addEventListener("click", () => {
      $$(".c", table).forEach((x) => x.classList.remove("on", "hl"));
      const h = H.find((x) => x.id === b.dataset.h);
      $$(`.c[data-h="${h.id}"]`, table).forEach((x) => x.classList.add("hl"));
      b.classList.add("on");
      if (b.classList.contains("hdr")) {
        panel.innerHTML = `<div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap"><strong>${h.n}</strong>${vendorPill(h.v)}<span class="pill">modello: ${h.model}</span></div><p style="margin:10px 0 0">${h.t}</p><div class="src-row">${srcLink(h.s)}</div>`;
      } else {
        const ing = ING[parseInt(b.dataset.r, 10)]; const c = ing.cells[h.id];
        panel.innerHTML = `<div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap"><strong>${ing.n}</strong> in <strong>${h.n}</strong>${vendorPill(h.v)}<span class="pill ${c[0] === "yes" ? "sage" : ""}">${c[0] === "yes" ? "presente" : "parziale"}</span></div><p style="margin:10px 0 0">Nome nativo: <code>${c[1]}</code>. ${h.t}</p><div class="src-row">${srcLink(h.s)}</div>`;
      }
    }));
    stamp("#hm-verified", "le celle «parziale» sono una lettura di Cantiere delle docs, non una dichiarazione del vendor");
  })();

  /* ========================================================================
     WIDGET 3 · ORCHESTRATION LADDER per vendor + PATTERN
     ===================================================================== */
  (function orchLadder() {
    const grid = $("#orch"), panel = $("#orch-panel");
    if (!grid) return;
    const cols = ["Subagent", "Team", "Workflow"];
    const rows = [
      { v: "anthropic", n: "Claude Code", c: [
        ["Subagent", "worker isolato nella stessa sessione, torna un riassunto", "https://code.claude.com/docs/en/sub-agents"],
        ["Agent teams (sperimentale)", "lead + teammate con context window propri, task list condivisa, messaggi diretti", "https://code.claude.com/docs/en/agent-teams"],
        ["Workflow tool · «ultracode»", "uno script JS lancia decine-centinaia di subagent in parallelo o a stadi, in background, riprendibile", "https://claude.com/blog/introducing-dynamic-workflows-in-claude-code"] ] },
      { v: "openai", n: "Codex", c: [
        ["Subagent", "orchestrazione di subagent dentro la sessione", "https://learn.chatgpt.com/docs"],
        ["Multi-agent", "orchestrazione multi-agente nel harness Codex", "https://learn.chatgpt.com/docs"],
        ["/goal + cloud", "lavoro autonomo multi-step, anche in cloud e da GitHub/Slack", "https://learn.chatgpt.com/docs"] ] },
      { v: "google", n: "Antigravity", c: [
        ["Subagent", "subagent ereditati da Gemini CLI", "https://github.com/google-gemini/gemini-cli/discussions/27274"],
        ["Workstream paralleli", "task complessi spezzati in workstream gestiti da sub-agent specializzati", "https://antigravity.google/blog/introducing-google-antigravity-cli"],
        ["Workflow asincroni", "«asynchronous background workflows for complex tasks»", "https://github.com/google-gemini/gemini-cli/discussions/27274"] ] },
      { v: "xai", n: "xAI", c: [
        ["Subagent (Grok Build)", "subagent nell'agent loop open source", "https://x.ai/news/grok-build-open-source"],
        ["Team di bot (Grok Bot)", "più agenti always-on, ognuno con il proprio computer, tornano per le approvazioni", "https://x.ai/news/introducing-grok-bot"],
        ["—", "nessun equivalente dichiarato del Workflow tool", "https://x.ai/news/introducing-grok-bot"] ] },
      { v: "openweight", n: "Hermes Agent", c: [
        ["Skill che delegano", "delega tramite skill e strumenti", "https://github.com/NousResearch/hermes-agent"],
        ["—", "nessun team dichiarato", "https://github.com/NousResearch/hermes-agent"],
        ["Daemon + cron", "un agente persistente che programma e ripete task senza presidio", "https://github.com/NousResearch/hermes-agent"] ] },
    ];
    grid.innerHTML = `<div class="h"></div>${cols.map((c) => `<div class="h">${c}</div>`).join("")}` +
      rows.map((r, ri) => `<div class="v">${r.n}</div>` + r.c.map((c, ci) => `<button class="o" data-r="${ri}" data-c="${ci}"><span class="nm">${c[0]}</span><span class="ds">${c[1]}</span></button>`).join("")).join("");
    panel.innerHTML = '<span style="color:var(--muted-2)">Tre gradini: il subagent torna un risultato; il team si coordina; il workflow è uno script che orchestra fuori dal contesto. Clicca una cella.</span>';
    $$(".o", grid).forEach((b) => b.addEventListener("click", () => {
      $$(".o", grid).forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      const r = rows[parseInt(b.dataset.r, 10)], c = r.c[parseInt(b.dataset.c, 10)];
      panel.innerHTML = `<div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap"><strong>${c[0]}</strong>${vendorPill(r.v)}<span class="pill">${cols[parseInt(b.dataset.c, 10)]}</span></div><p style="margin:10px 0 0">${c[1]}.</p><div class="src-row"><a class="src" href="${c[2]}" target="_blank" rel="noopener">${r.n} — fonte</a></div>`;
    }));
  })();

  (function patterns() {
    const grid = $("#pat-grid"), panel = $("#pat-panel");
    if (!grid) return;
    const items = [
      { ico: "🔀", nm: "Classify-and-act", cure: "goal drift", txt: "Prima classifica ogni elemento, poi applica l'azione giusta per classe: il compito resta ancorato a un criterio esplicito." },
      { ico: "🌐", nm: "Fan-out-and-synthesize", cure: "laziness", txt: "Molti agenti coprono in parallelo pezzi diversi (file, moduli, fonti); uno sintetizza. Nessuno può «fermarsi prima» perché il perimetro è assegnato." },
      { ico: "⚔️", nm: "Adversarial verification", cure: "self-preferential bias", txt: "Un secondo agente prova a smentire il risultato del primo: la preferenza per il proprio output viene contestata da un giudice esterno." },
      { ico: "🧪", nm: "Generate-and-filter", cure: "self-preferential bias", txt: "Genera molte varianti, poi filtra con criteri o test: la scelta non dipende da chi ha generato." },
      { ico: "🏆", nm: "Tournament", cure: "self-preferential bias", txt: "Tentativi in competizione, giudicati a coppie o a girone: vince il migliore, non il primo." },
      { ico: "🔁", nm: "Loop-until-done", cure: "laziness · goal drift", txt: "Ripeti finché un criterio verificabile è soddisfatto (test verdi, lista di feature completata): il «finito» lo decide il criterio, non l'agente." },
    ];
    panel.innerHTML = '<span style="color:var(--muted-2)">Clicca un pattern per la spiegazione e la patologia che cura.</span>';
    items.forEach((it) => {
      const c = el("button", "dcard");
      c.innerHTML = `<div class="d-ico">${it.ico}</div><div class="d-nm">${it.nm}</div><div class="d-en">${it.cure}</div>`;
      c.addEventListener("click", () => {
        $$(".dcard", grid).forEach((x) => x.classList.remove("on"));
        c.classList.add("on");
        panel.innerHTML = `<div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap"><strong>${it.ico} ${it.nm}</strong><span class="pill clay">cura: ${it.cure}</span></div><p style="margin:10px 0 0">${it.txt}</p>`;
      });
      grid.appendChild(c);
    });
  })();

  (function ultraTerm() {
    const term = $("#ultra-term");
    if (!term) return;
    const lines = [
      { cls: "cmd", txt: '<span class="prompt">$</span> claude', tag: "11:20" },
      { cls: "user", txt: '<span class="prompt">&gt;</span> ultracode: review del diff su sicurezza, performance e test; ogni finding verificato da un secondo agente' },
      { cls: "out", txt: "Scrivo lo script del workflow: 3 reviewer (sonnet) → verifica adversarial (opus) per ogni finding…" },
      { cls: "out", txt: "Workflow wf_… avviato in background. /workflows per seguirlo." },
      { cls: "out", txt: "── 11:57 ──", tag: "demo" },
      { cls: "cmd", txt: '<span class="prompt">$</span> /workflows' },
      { cls: "ok", txt: "✓ review-pr-142 · 3 review + 11 verifiche · 7 finding confermati, 4 smentiti · 41 min · costo riportato nel pannello" },
    ];
    let shown = 0;
    function paint() {
      term.innerHTML = '<div class="tbar"><i></i><i></i><i></i></div>' +
        lines.slice(0, shown).map((l) => `<div class="term-line ${l.cls}">${l.txt}${l.tag ? `<span class="tag">${l.tag}</span>` : ""}</div>`).join("") +
        (shown === 0 ? '<div class="term-line out">Fallback della demo: premi «Mostra lo script». Lo script completo è in media/2026-09/ultracode-sample.txt.</div>' : "");
    }
    $("#ultra-step").addEventListener("click", () => { if (shown < lines.length) shown++; paint(); });
    $("#ultra-reset").addEventListener("click", () => { shown = 0; paint(); });
    paint();
  })();

  /* ========================================================================
     WIDGET 4 · DESIGN STEPPER (chat + canvas mock)
     ===================================================================== */
  (function designStepper() {
    const steps = $("#ds-steps"), chat = $("#ds-chat"), art = $("#ds-art"), prog = $("#ds-progress");
    if (!steps) return;
    const S = [
      { ico: "📝", nm: "Brief", ds: "cosa, per chi, dove", me: "One-pager A4 per la sessione del 16/09: titolo, tre messaggi, un invito ad agire. Pubblico interno.", ai: "Ho capito: un A4, tono interno, tre blocchi. Vuoi che usi il design system del repo?", art: "empty" },
      { ico: "🔗", nm: "Import", ds: "/design-sync · screenshot", me: "/design-sync github.com/cantiere/design-system", ai: "Design system importato: 24 componenti, 2 famiglie tipografiche, palette a 6 colori. Costruisco con i componenti veri.", art: "empty" },
      { ico: "✨", nm: "Genera", ds: "prima versione", me: "Vai.", ai: "Prima versione sul canvas: hero con il titolo, tre card, CTA in fondo. Dimmi cosa cambiare.", art: "v1" },
      { ico: "🔁", nm: "Itera", ds: "chat · commento · drag · slider", me: "(commento sull'hero) più aria sotto il titolo · (slider) spaziatura 62%", ai: "Aggiunto un controllo per la spaziatura verticale. Ho anche allineato le card alla griglia.", art: "iter" },
      { ico: "📤", nm: "Esporta", ds: "PDF · PPTX · HTML · link", me: "Esporta in PDF e dammi un link in sola lettura per il team.", ai: "PDF pronto. Link condiviso (view). Vuoi anche lo zip HTML?", art: "export" },
      { ico: "💻", nm: "Handoff", ds: "→ Claude Code", me: "Passa il progetto a Claude Code nel repo del sito.", ai: "Consegnato: componenti e layout nel branch design/one-pager. Da lì si implementa e si apre la PR.", art: "export" },
    ];
    let cur = 0;
    S.forEach((s, i) => {
      const n = el("div", "loop-node");
      n.innerHTML = `<div class="ico">${s.ico}</div><div class="nm">${s.nm}</div><div class="ds">${s.ds}</div>`;
      steps.appendChild(n);
      if (i < S.length - 1) steps.appendChild(el("span", "loop-arrow", "→"));
    });
    const nodes = $$(".loop-node", steps);
    function paintArt(kind) {
      art.className = "art" + (kind === "empty" ? " empty" : "") + (kind === "iter" ? " selected" : "");
      if (kind === "empty") { art.innerHTML = "il canvas è vuoto"; return; }
      art.innerHTML = `<div class="hero"></div><div class="txt"></div><div class="txt s"></div><div class="txt"></div><span class="cta">Partecipa</span>` +
        (kind === "iter" ? `<span class="comment">💬 più aria sotto il titolo</span><div class="slider">spaziatura verticale · 62%<b></b></div>` : "") +
        (kind === "export" ? `<div class="exp"><span class="pill sage">PDF</span><span class="pill">PPTX</span><span class="pill">HTML</span><span class="pill clay">→ Claude Code</span></div>` : "");
    }
    function paint() {
      nodes.forEach((n, i) => { n.classList.toggle("on", i === cur); n.classList.toggle("done", i < cur); });
      chat.innerHTML = S.slice(Math.max(0, cur - 1), cur + 1).map((s) => `<div class="msg me">${s.me}</div><div class="msg">${s.ai}</div>`).join("");
      paintArt(S[cur].art);
      prog.textContent = `passo ${cur + 1} / ${S.length} · ${S[cur].nm}`;
    }
    $("#ds-next").addEventListener("click", () => { cur = Math.min(S.length - 1, cur + 1); paint(); });
    $("#ds-reset").addEventListener("click", () => { cur = 0; paint(); });
    paint();
  })();

  /* ========================================================================
     WIDGET 5 · COMPARE MATRIX (Figma / Claude Design / skill design / alternative)
     ===================================================================== */
  (function compare() {
    const table = $("#cmp-table"), seg = $("#cmp-profile");
    if (!table) return;
    const cols = [
      { id: "figma", n: "Figma", rec: ["designer"] },
      { id: "cd", n: "Claude Design", rec: ["pm", "designer"] },
      { id: "skill", n: "skill design (Claude Code)", rec: ["dev"] },
      { id: "alt", n: "Alternative (Figma Make, Google Stitch)", rec: [] },
    ];
    const rows = [
      ["Cos'è", "strumento di design manuale, collaborativo", "app generativa Anthropic Labs: chat + canvas", "canvas artifact dentro Claude Code (early preview)", "Figma Make: prototipi da linguaggio naturale col design system; Stitch: canvas AI-native con design agent (Gemini)"],
      ["Dove gira", "web e desktop, file condivisi", "claude.ai (Pro, Max, Team, Enterprise)", "nel repo, con Claude Code", "Figma; stitch.withgoogle.com"],
      ["Input", "mano, componenti, variabili, plugin", "screenshot, DOCX/PPTX/XLSX, web, repo e design system (/design-sync)", "prompt e codice del repo", "prompt, immagini, DESIGN.md (Stitch)"],
      ["Precisione", "al pixel, libreria condivisa", "buona, con i componenti importati", "media: serve al prototipo, non alla consegna", "variabile"],
      ["Editing", "diretto, multiplayer", "chat, commento inline, drag/resize, slider", "click-to-select, pannello proprietà, testo inline", "chat + canvas (Stitch in tempo reale)"],
      ["Output", "file Figma, Dev Mode, prototipi", "prototipi, PPTX, PDF, HTML, zip, link con permessi", "PNG, PDF, artifact nel repo", "prototipo pubblicabile; export in Antigravity (Stitch), codice (Make)"],
      ["Handoff al codice", "via Figma MCP server (Claude Code, Codex, Cursor…)", "diretto a Claude Code", "è già nel repo", "Antigravity (Stitch) · codice esportabile (Make)"],
      ["Quando", "consegna finale, sistema di design, precisione", "esplorazione, deliverable rapido, deck", "prototipo contestuale al codice", "se il team vive già in Figma o in Gemini"],
    ];
    let profile = "designer";
    function paint() {
      table.innerHTML = `<thead><tr><th></th>${cols.map((c) => `<th class="${c.rec.indexOf(profile) >= 0 ? "rec-col" : ""}">${c.n}${c.rec.indexOf(profile) >= 0 ? ' <span class="pill clay">consigliato</span>' : ""}</th>`).join("")}</tr></thead>` +
        `<tbody>${rows.map((r) => `<tr><td>${r[0]}</td>${r.slice(1).map((v, i) => `<td class="${cols[i].rec.indexOf(profile) >= 0 ? "rec-col" : ""}">${v}</td>`).join("")}</tr>`).join("")}</tbody>`;
    }
    $$("button", seg).forEach((b) => b.addEventListener("click", () => {
      profile = b.dataset.p;
      $$("button", seg).forEach((x) => x.classList.toggle("on", x === b));
      paint();
    }));
    paint();
  })();

  /* ========================================================================
     WIDGET 6 · GLOSSARIO (solo termini nuovi) + BIBLIOGRAFIA
     ===================================================================== */
  (function glossary() {
    const list = $("#gloss-list"), search = $("#gloss-search");
    if (!list) return;
    const terms = [
      ["Fascia (tier)", "Gruppo di modelli con prezzo e capacità simili, uguale tra vendor: frontiera (~$10/$50 per Mtok), alta (~$4-5/$20-25), media (~$2/$10-12), economica (<$1). Si sceglie la fascia dal task, poi il modello.", "Claude — pricing", "https://claude.com/pricing"],
      ["Effort", "Livello di ragionamento che il modello spende prima di rispondere (low, medium, high, xhigh, max su Anthropic; none → max su OpenAI). Prima leva di costo e qualità, prima ancora del cambio di modello.", "Anthropic — Fable 5.1", "https://www.anthropic.com/claude-fable-and-mythos-5-1"],
      ["Costo per task", "Ciò che costa finire un lavoro, non un token: un modello economico che riprova può costare più di uno caro che chiude al primo colpo.", "Introducing dynamic workflows", "https://claude.com/blog/introducing-dynamic-workflows-in-claude-code"],
      ["Usage credits", "Modalità con cui Fable è disponibile su Pro, Max e Team: oltre una quota si paga a consumo, a tariffe API.", "Redeploying Fable 5", "https://www.anthropic.com/news/redeploying-fable-5"],
      ["Safety classifier / reroute", "Filtro che può rifiutare una richiesta al modello di frontiera e reindirizzarla a un modello Opus; sui prodotti si vede come un cambio di modello a metà lavoro.", "Anthropic — Fable 5.1", "https://www.anthropic.com/claude-fable-and-mythos-5-1"],
      ["Open weight", "Modello i cui pesi sono scaricabili e servibili da chiunque (Hugging Face), con licenza propria; il prezzo dipende da chi lo serve. Quasi tutti i modelli cinesi recenti lo sono.", "Hugging Face — Kimi-K3", "https://huggingface.co/moonshotai/Kimi-K3"],
      ["Harness", "Tutto ciò che sta intorno al modello e decide cosa vede, cosa può fare e come viene verificato: istruzioni, skills, hooks, subagent, MCP, sandbox, memoria, orchestrazione.", "A harness for every task", "https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code"],
      ["AGENTS.md", "L'equivalente di CLAUDE.md in Codex: file di istruzioni persistenti letto dall'agente nel repo.", "Codex — docs", "https://learn.chatgpt.com/docs"],
      ["Antigravity CLI (agy)", "Il terminale di Google che ha sostituito Gemini CLI per gli account individuali dal 18 giugno 2026; stesso harness di Antigravity 2.0.", "Antigravity CLI", "https://antigravity.google/blog/introducing-google-antigravity-cli"],
      ["Grok Build / Grok Bot", "Build: il coding agent CLI di xAI, open source. Bot: agenti always-on con il proprio computer che lavorano dentro le app e tornano per le approvazioni.", "Introducing Grok Bot", "https://x.ai/news/introducing-grok-bot"],
      ["Hermes Agent", "Agente open source di Nous Research, agnostico sul modello: daemon persistente, memoria tra sessioni, cron, messaggistica, skill auto-generate.", "Hermes Agent", "https://github.com/NousResearch/hermes-agent"],
      ["Progress file", "File che l'agente legge all'inizio di ogni sessione e aggiorna alla fine, per lavorare su task più lunghi di una context window.", "Effective harnesses for long-running agents", "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"],
      ["Agent team", "Più sessioni di Claude Code con context window propri: un lead coordina, i teammate si scambiano messaggi e condividono una task list. Sperimentale.", "Claude Code — Agent teams", "https://code.claude.com/docs/en/agent-teams"],
      ["Workflow tool / ultracode", "Claude scrive uno script che lancia decine o centinaia di subagent in parallelo o a stadi, fuori dal contesto della conversazione; si attiva con «ultracode» o su richiesta.", "Introducing dynamic workflows", "https://claude.com/blog/introducing-dynamic-workflows-in-claude-code"],
      ["Adversarial verification", "Pattern in cui un secondo agente prova a smentire il risultato del primo; cura la preferenza per il proprio output.", "A harness for every task", "https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code"],
      ["Routing", "Regola che assegna il modello (per fascia) a ogni ruolo: chi pianifica, chi esegue, chi revisiona, con quale effort.", "Claude Code — Agent teams", "https://code.claude.com/docs/en/agent-teams"],
      ["Canvas", "L'area di lavoro di Claude Design (a destra della chat) dove l'artefatto si modifica per commento, trascinamento o slider.", "Get started with Claude Design", "https://support.claude.com/en/articles/14604416-get-started-with-claude-design"],
      ["/design-sync", "Comando di Claude Design per importare componenti e design system da GitHub, file di design o codebase locale.", "Get started with Claude Design", "https://support.claude.com/en/articles/14604416-get-started-with-claude-design"],
      ["Figma MCP server", "Server MCP di Figma che permette agli agenti di leggere il contesto di design, scrivere sul canvas e usare Code Connect.", "Figma — MCP server", "https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server"],
    ].sort((a, b) => a[0].localeCompare(b[0]));
    function build(filter) {
      list.innerHTML = "";
      const f = (filter || "").toLowerCase();
      let shown = 0;
      terms.forEach(([t, d, sn, su]) => {
        if (f && t.toLowerCase().indexOf(f) === -1 && d.toLowerCase().indexOf(f) === -1) return;
        shown++;
        const det = el("details");
        det.innerHTML = `<summary>${t}<span class="g-plus"></span></summary><div class="g-body">${d}<div class="src-row"><a class="src" href="${su}" target="_blank" rel="noopener">${sn}</a></div></div>`;
        list.appendChild(det);
      });
      if (!shown) list.innerHTML = '<p class="note">Nessun termine trovato.</p>';
    }
    search.addEventListener("input", () => build(search.value));
    build("");
  })();

  (function biblio() {
    const box = $("#biblio");
    if (!box) return;
    const groups = [
      ["Modelli USA", [
        ["Anthropic — Introducing Claude Fable 5.1 and Mythos 5.1", "https://www.anthropic.com/claude-fable-and-mythos-5-1"],
        ["Anthropic — Introducing Claude Opus 5", "https://www.anthropic.com/news/claude-opus-5"],
        ["Anthropic — Introducing Claude Sonnet 5", "https://www.anthropic.com/news/claude-sonnet-5"],
        ["Anthropic — Redeploying Claude Fable 5", "https://www.anthropic.com/news/redeploying-fable-5"],
        ["Claude — pricing", "https://claude.com/pricing"],
        ["OpenAI — GPT-6 Astra", "https://openai.com/index/gpt-6-astra/"],
        ["OpenAI — GPT-6 Astra (model page)", "https://developers.openai.com/api/docs/models/gpt-6-astra"],
        ["OpenAI — GPT-5.6", "https://openai.com/index/gpt-5-6/"],
        ["OpenAI — API pricing", "https://developers.openai.com/api/docs/pricing"],
        ["Google — Gemini API pricing", "https://ai.google.dev/gemini-api/docs/pricing"],
        ["xAI — Models and pricing", "https://docs.x.ai/docs/models"],
      ]],
      ["Modelli Cina (pesi aperti)", [
        ["DeepSeek — V4.1 Flash", "https://api-docs.deepseek.com/news/news260910/"],
        ["DeepSeek — pricing", "https://api-docs.deepseek.com/quick_start/pricing"],
        ["Qwen3.8 — repo ufficiale", "https://github.com/QwenLM/Qwen3.8"],
        ["Moonshot — Kimi K3 (Hugging Face)", "https://huggingface.co/moonshotai/Kimi-K3"],
        ["Kimi — pricing", "https://platform.kimi.ai/docs/pricing/chat"],
        ["Z.ai — GLM-5.3 (Hugging Face)", "https://huggingface.co/zai-org/GLM-5.3"],
        ["Z.ai — pricing", "https://docs.z.ai/guides/overview/pricing"],
        ["MiniMax — M3 (Hugging Face)", "https://huggingface.co/MiniMaxAI/MiniMax-M3"],
        ["MiniMax — pricing", "https://platform.minimax.io/docs/guides/pricing-paygo"],
        ["Tencent — Hy4-preview (Hugging Face)", "https://huggingface.co/tencent/Hy4-preview"],
      ]],
      ["Harness e orchestrazione", [
        ["Claude Code — A harness for every task", "https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code"],
        ["Claude Code — Introducing dynamic workflows", "https://claude.com/blog/introducing-dynamic-workflows-in-claude-code"],
        ["Claude Code — Agent teams", "https://code.claude.com/docs/en/agent-teams"],
        ["Claude Code — Subagents", "https://code.claude.com/docs/en/sub-agents"],
        ["Anthropic — Effective harnesses for long-running agents", "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents"],
        ["Claude Code in large codebases", "https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start"],
        ["OpenAI — Codex docs", "https://learn.chatgpt.com/docs"],
        ["Google — Introducing Antigravity CLI", "https://antigravity.google/blog/introducing-google-antigravity-cli"],
        ["Google — Transitioning Gemini CLI to Antigravity CLI", "https://github.com/google-gemini/gemini-cli/discussions/27274"],
        ["xAI — Introducing Grok Bot", "https://x.ai/news/introducing-grok-bot"],
        ["xAI — Grok Build is now open source", "https://x.ai/news/grok-build-open-source"],
        ["Nous Research — Hermes Agent", "https://github.com/NousResearch/hermes-agent"],
      ]],
      ["Claude Design e alternative", [
        ["Anthropic — Introducing Claude Design", "https://www.anthropic.com/news/claude-design-anthropic-labs"],
        ["Claude Design — prodotto", "https://claude.com/product/design"],
        ["Get started with Claude Design (help center)", "https://support.claude.com/en/articles/14604416-get-started-with-claude-design"],
        ["Figma — Guide to the Figma MCP server", "https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server"],
        ["Figma Make", "https://www.figma.com/make/"],
        ["Google Stitch", "https://stitch.withgoogle.com/"],
        ["Google Stitch — real time design", "https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-updates/"],
      ]],
    ];
    groups.forEach(([title, links]) => {
      const g = el("div", "bgroup");
      g.innerHTML = `<h4>${title}</h4>` + links.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${n}<span>${u.replace(/^https?:\/\//, "")}</span></a>`).join("");
      box.appendChild(g);
    });
    stamp("#biblio-verified");
  })();

  /* ============================================================= INIT */
  (function init() {
    const m = /^#s(\d+)$/.exec(location.hash);
    if (m) idx = clamp(parseInt(m[1], 10), 0, total - 1);
    render();
    paintTimer();
  })();
})();
