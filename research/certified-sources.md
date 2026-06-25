# Fonti certificate per corso Claude, agenti e LLM

Data verifica: 2026-06-22

## Criteri di selezione

Fonti accettate:

- documentazione ufficiale di Anthropic/Claude, OpenAI, Google, Microsoft;
- help center ufficiali dei prodotti;
- paper primari o corsi universitari/istituzionali;
- blog engineering/research ufficiali delle aziende che sviluppano i prodotti.

Fonti escluse dalla base principale:

- Medium, Reddit, LinkedIn, forum community;
- news e articoli giornalistici non necessari;
- tutorial YouTube non ufficiali;
- post SEO o vendor non primari, salvo eventuale uso secondario futuro.

## Claude

Fonti primarie:

- Anthropic docs, Intro to Claude: https://docs.anthropic.com/en/docs/intro-to-claude
- Claude product overview: https://claude.com/product/overview
- Claude prompt engineering overview: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Claude prompting best practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- Claude context windows: https://docs.anthropic.com/en/docs/build-with-claude/context-windows
- Tool use with Claude: https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview
- Anthropic glossary, LLM/Claude definitions: https://docs.anthropic.com/en/docs/resources/glossary
- Claude Artifacts, what they are and how to use them (support): https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them

Per cosa usarle:

- definire Claude come piattaforma/modelli;
- spiegare uso base, prompting, tool use e context window;
- evitare definizioni prese da blog non ufficiali.

## Claude Code

Fonti primarie:

- Claude Code overview: https://code.claude.com/docs/en/overview
- How Claude Code works: https://code.claude.com/docs/en/how-claude-code-works
- Claude Code best practices: https://code.claude.com/docs/en/best-practices
- Claude Code context window: https://code.claude.com/docs/en/context-window
- Claude Code memory: https://code.claude.com/docs/en/memory
- Claude Code permission modes: https://code.claude.com/docs/en/permission-modes
- Claude Code common workflows: https://code.claude.com/docs/en/common-workflows
- Claude Code MCP: https://code.claude.com/docs/en/mcp
- Claude Code subagents: https://docs.anthropic.com/en/docs/claude-code/sub-agents
- Claude Code hooks: https://docs.anthropic.com/en/docs/claude-code/hooks
- Claude Code plugins (creare ed estendere): https://code.claude.com/docs/en/plugins
- Claude Code discover and install plugins (marketplace): https://code.claude.com/docs/en/discover-plugins

Fonti di approfondimento ufficiali:

- Steering Claude Code with skills, hooks, rules, subagents: https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more
- Claude Code in large codebases: https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start
- Lessons from building Claude Code, skills: https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills
- Prompt caching in Claude Code: https://claude.com/blog/lessons-from-building-claude-code-prompt-caching-is-everything

Per cosa usarle:

- spiegare "agentic coding tool";
- introdurre loop gather context / act / verify;
- parlare di memoria, contesto, permessi, skills, subagents, MCP.

## Modelli e inferenza

Data verifica aggiuntiva: 2026-06-25

Fonti primarie:

- Anthropic models overview: https://docs.anthropic.com/en/docs/about-claude/models/overview
- Anthropic pricing: https://docs.anthropic.com/en/docs/about-claude/pricing
- Anthropic extended thinking: https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking
- Anthropic glossary (definizione di inferenza/modello): https://docs.anthropic.com/en/docs/resources/glossary

Per cosa usarle:

- spiegare l'inferenza (il modello già addestrato genera output un token alla volta; latenza e costo per richiesta);
- spiegare che Claude è una famiglia di modelli (linee Opus / Sonnet / Haiku) e il compromesso capacità / velocità / costo;
- introdurre extended/adaptive thinking come leva qualità ↔ costo ↔ latenza.

## Claude Cowork

Data verifica: 2026-06-25. Solo domini certificati (claude.com, support.claude.com, anthropic.com).

Fonti primarie:

- Claude — Cowork (product): https://claude.com/product/cowork
- Get started with Claude Cowork: https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork
- Best practices for getting started with Cowork: https://claude.com/blog/best-practices-for-getting-started-with-claude-cowork
- Customize Claude Cowork: https://claude.com/resources/tutorials/customize-claude-cowork
- Schedule recurring tasks in Cowork: https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork
- Use Claude Cowork safely: https://support.claude.com/en/articles/13364135-use-claude-cowork-safely
- Use connectors to extend Claude: https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities
- Claude — Plugins: https://claude.com/plugins

Punti verificati:

- Cowork: superficie agentica di Claude Desktop per lavoro non-coding; «porti Claude al tuo lavoro», con accesso a file locali e connettori; piani Pro/Max/Team/Enterprise (macOS, Windows).
- Ordine di setup consigliato: connettori → Instructions/contesto → skill (dopo qualche ripetizione) → plugin per il team.
- Connettori ufficiali citati: Slack, Gmail, Google Drive, Google Calendar, Microsoft 365, Jira, Linear, Salesforce, Chrome.
- 5 «ingredienti» del task adatto: più input, deliverable in output, ricorrente, formato noto, lavoro «di mezzo» delegabile.
- Permessi: «Ask before acting» (consigliato) vs «Act without asking» (aumenta il rischio di prompt injection); cancellazione file sempre con permesso esplicito.
- Task schedulati via /schedule o sidebar Scheduled; girano solo a computer acceso e app aperta.
- Governance: computer use senza sandbox; i connettori ereditano i permessi dell'utente; l'utente resta responsabile delle azioni.

NON VERIFICATO (non asserito nel corso): un connettore GitHub dedicato per Cowork; un modello di default consigliato per le sessioni interattive (la scelta del modello è confermata solo come campo opzionale nei task schedulati).

## Orchestrazione di agenti

Data verifica: 2026-06-25. Solo domini certificati Anthropic/Claude.

Fonti primarie:

- Anthropic — Building effective agents: https://www.anthropic.com/engineering/building-effective-agents
- Anthropic — Multi-agent research system: https://www.anthropic.com/engineering/multi-agent-research-system
- Building agents with the Claude Agent SDK: https://claude.com/blog/building-agents-with-the-claude-agent-sdk
- Claude Code — Agents: https://code.claude.com/docs/en/agents
- Claude Code — Agent teams: https://code.claude.com/docs/en/agent-teams
- Claude Agent SDK — Subagents: https://code.claude.com/docs/en/agent-sdk/subagents

Punti verificati (citazioni dalla fonte ufficiale):

- Cinque pattern di workflow: prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer.
- Orchestrator-workers: «un LLM centrale scompone dinamicamente il task, delega a worker LLM e ne sintetizza i risultati»; i sottotask non sono predefiniti.
- Workflow vs agente: i workflow sono «orchestrati con percorsi di codice predefiniti»; gli agenti «dirigono dinamicamente il proprio processo e l'uso degli strumenti».
- Sistema multi-agente reale: lead agent + subagent specializzati in parallelo (pattern orchestrator-worker).
- Costo: gli agenti usano «circa 4× più token» di una chat; i sistemi multi-agente «circa 15× più token».
- Superfici Claude Code: subagents; agent teams (sperimentale: lead + teammate, task list condivisa, messaggi diretti); dynamic workflows / Workflow tool (orchestra da decine a centinaia di agenti fuori dal contesto).

Nota: la data del blog Managed Agents («new in Claude Managed Agents») è stata estratta dal fetch (≈ maggio 2026) e non riverificata sull'header — citata con cautela.

## Memoria in Claude Cowork

Data verifica: 2026-06-25. Solo domini certificati per le capacità di Claude; obsidian.md solo per definire cos'è Obsidian.

Fonti primarie:

- Get started with Claude Cowork: https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork
- Cowork — Projects: https://claude.com/docs/cowork/guide/projects
- Organize your tasks with projects: https://support.claude.com/en/articles/14116274-organize-your-tasks-with-projects-in-claude-cowork
- Use Claude Cowork safely: https://support.claude.com/en/articles/13364135-use-claude-cowork-safely
- Anthropic — Memory tool (API/agenti, superficie diversa): https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool
- Obsidian (solo definizione, non una capacità di Claude): https://obsidian.md/

Punti verificati:

- File/cartelle locali: «Claude può leggere e scrivere i tuoi file locali senza upload o download manuali»; legge file fino a 50 MB l'uno → qualsiasi cartella collegata è archivio durevole.
- Folder instructions: contesto per-cartella che «Claude può anche aggiornare da solo durante una sessione».
- Memoria dei Project: «un memory store dedicato che persiste tra le sessioni», ma «scoped al progetto» e «non mantenuta tra le sessioni standalone».
- Instructions globali/di progetto: standing context impostato dall'utente.
- Memory tool API (`/memories`): superficie diversa da Cowork (sviluppatori/agenti), stessa idea «file che persistono tra le conversazioni».
- Rischi: Claude può cancellare definitivamente i file; usare una cartella di lavoro dedicata, tenere backup, evitare dati sensibili.

NON VERIFICATO / ESEMPIO ILLUSTRATIVO: nessuna fonte certificata cita Obsidian; ciò che è supportato è «leggere/scrivere una cartella Markdown locale». Una vault Obsidian come cartella di memoria è un esempio editoriale, non un'integrazione ufficiale.

## Codex

Fonti primarie OpenAI:

- Codex overview: https://developers.openai.com/codex
- Codex product page: https://openai.com/codex/
- Codex manual markdown: https://developers.openai.com/codex/codex-manual.md
- Codex best practices: https://developers.openai.com/codex/learn/best-practices
- Codex CLI: https://developers.openai.com/codex/cli
- Codex IDE extension: https://developers.openai.com/codex/ide
- Codex web/cloud: https://developers.openai.com/codex/cloud
- Codex AGENTS.md: https://developers.openai.com/codex/guides/agents-md
- Codex skills: https://developers.openai.com/codex/skills
- Codex subagents: https://developers.openai.com/codex/subagents
- Codex authentication: https://developers.openai.com/codex/auth
- Codex changelog: https://developers.openai.com/codex/changelog
- OpenAI Help Center, using Codex with ChatGPT plan: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan

Punti verificati nel manuale ufficiale:

- Codex e' l'agente di coding di OpenAI per scrivere, capire, rivedere, debuggare e automatizzare task di sviluppo.
- Prompt efficace: goal, context, constraints, done when.
- `AGENTS.md` e' il posto per istruzioni durable di repo/team.
- Codex puo essere usato via app, CLI, IDE extension, web/cloud.

## ChatGPT

Fonti primarie OpenAI:

- ChatGPT product overview: https://openai.com/chatgpt/overview/
- ChatGPT main page: https://openai.com/chatgpt/
- What is ChatGPT? Help Center: https://help.openai.com/en/articles/6783457-what-is-chatgpt
- ChatGPT release notes: https://help.openai.com/en/articles/6825453-chatgpt-release-notes
- Projects in ChatGPT: https://help.openai.com/en/articles/10169521-projects-in-chatgpt
- GPTs in ChatGPT: https://help.openai.com/en/articles/8554407-gpts-in-chatgpt
- Creating and editing GPTs: https://help.openai.com/en/articles/8554397-creating-and-editing-gpts
- Apps in ChatGPT: https://help.openai.com/en/articles/11487775-apps-in-chatgpt
- ChatGPT apps with sync: https://help.openai.com/en/articles/10847137-chatgpt-apps-with-sync
- Company knowledge in ChatGPT: https://help.openai.com/en/articles/12628342-company-knowledge-in-chatgpt-business-enterprise-and-edu
- ChatGPT agent: https://help.openai.com/en/articles/11752874-chatgpt-agent
- Introducing ChatGPT agent: https://openai.com/index/introducing-chatgpt-agent/
- Introducing workspace agents in ChatGPT: https://openai.com/index/introducing-workspace-agents-in-chatgpt/

Nota:

- Per feature recenti, usare sempre release notes e Help Center.
- La pagina "What is ChatGPT?" e' utile per FAQ e limiti generali, ma per feature e modelli correnti conviene preferire release notes e pagine prodotto.

## OpenAI API, Agents SDK e tool use

Fonti primarie OpenAI:

- OpenAI prompt engineering: https://developers.openai.com/api/docs/guides/prompt-engineering
- Responses API, migration/overview: https://developers.openai.com/api/docs/guides/migrate-to-responses
- Tools in OpenAI API: https://developers.openai.com/api/docs/guides/tools
- Agents SDK guide: https://developers.openai.com/api/docs/guides/agents
- OpenAI SDKs and Agents SDK: https://developers.openai.com/api/docs/libraries#use-the-agents-sdk
- MCP servers for ChatGPT Apps and API integrations: https://developers.openai.com/api/docs/mcp
- ChatGPT Apps SDK UI: https://developers.openai.com/apps-sdk/build/chatgpt-ui

Punti verificati:

- Responses API e' l'interfaccia OpenAI per applicazioni agent-like con built-in tools, multi-turn e multimodale.
- Agents SDK serve quando l'applicazione possiede orchestration, tool execution, approvals, state, tracing, handoffs e guardrails.
- MCP collega modelli/app a strumenti e dati esterni; richiede attenzione a trust, prompt injection e permessi.

## Agenti AI

Fonti primarie/serie:

- Anthropic, Building effective agents: https://www.anthropic.com/engineering/building-effective-agents
- OpenAI Agents SDK: https://developers.openai.com/api/docs/guides/agents
- Google Cloud, What are AI agents?: https://cloud.google.com/discover/what-are-ai-agents
- Microsoft Learn, AI Agents for Beginners: https://learn.microsoft.com/en-us/shows/ai-agents-for-beginners/
- Microsoft Agent Framework overview: https://learn.microsoft.com/en-us/agent-framework/overview/

Concetti da tenere:

- Un agente non e' solo una chat: persegue obiettivi, pianifica, usa strumenti, mantiene stato/contesto e puo completare task multi-step.
- Anthropic distingue workflow e agenti: workflow = percorsi predefiniti; agenti = modello che dirige dinamicamente processo e tool use.
- Non sempre serve un agente: per molti casi basta una singola chiamata LLM ben contestualizzata con retrieval/esempi.

## AI e basi su come funziona un LLM

Fonti primarie/istituzionali:

- Paper originale Transformer, "Attention Is All You Need": https://arxiv.org/abs/1706.03762
- NeurIPS paper page, "Attention Is All You Need": https://papers.nips.cc/paper/7181-attention-is-all-you-need
- Stanford CS324, Large Language Models: https://stanford-cs324.github.io/winter2022/
- Stanford CS224N, NLP with Deep Learning: https://web.stanford.edu/class/cs224n/
- Google Machine Learning Crash Course, intro to LLMs/Transformers: https://developers.google.com/machine-learning/crash-course/llm/transformers
- Anthropic glossary: https://docs.anthropic.com/en/docs/resources/glossary
- Anthropic interpretability, Mapping the Mind of a Large Language Model: https://www.anthropic.com/research/mapping-mind-language-model
- Anthropic interpretability, Tracing the thoughts of a large language model: https://www.anthropic.com/research/tracing-thoughts-language-model

Concetti base da costruire da queste fonti:

- token;
- prediction/generazione sequenziale;
- Transformer e self-attention;
- parametri e training su grandi dataset;
- instruction tuning/RLHF;
- limiti: hallucination, bias, costo computazionale, context window.

## Context engineering

Fonti primarie/serie:

- Anthropic, Effective context engineering for AI agents: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Claude context windows: https://docs.anthropic.com/en/docs/build-with-claude/context-windows
- Claude Code context window: https://code.claude.com/docs/en/context-window
- Claude Code memory: https://code.claude.com/docs/en/memory
- OpenAI prompt engineering, context/RAG/context window section: https://developers.openai.com/api/docs/guides/prompt-engineering
- OpenAI tools, tool search and MCP: https://developers.openai.com/api/docs/guides/tools
- IBM, context window: https://www.ibm.com/think/topics/context-window
- LangChain, Context engineering for agents: https://www.langchain.com/blog/context-engineering-for-agents

Nota sul livello di fiducia:

- Anthropic e OpenAI sono fonti primarie.
- IBM e LangChain sono fonti serie ma secondarie rispetto ai vendor/model docs; utili per definizioni didattiche e pattern come write/select/compress/isolate.

Definizione operativa:

- Prompt engineering riguarda soprattutto come scrivi istruzioni.
- Context engineering riguarda cosa metti, mantieni, recuperi, comprimi o isoli nel contesto disponibile al modello durante un task.

## Prompt engineering

Fonti primarie:

- OpenAI prompt engineering: https://developers.openai.com/api/docs/guides/prompt-engineering
- OpenAI Help Center, API prompt engineering best practices: https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api
- Anthropic prompt engineering overview: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- Anthropic prompting best practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- Google Gemini prompt design strategies: https://ai.google.dev/gemini-api/docs/prompting-strategies
- Microsoft Foundry/Azure OpenAI prompt engineering: https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering

Concetti da usare:

- prompt engineering = scrivere istruzioni efficaci e verificabili;
- includere ruolo, obiettivo, contesto, vincoli, esempi, formato output, criteri di successo;
- usare eval/test per prompt importanti;
- per agenti e task lunghi, prompt engineering da solo non basta: serve context engineering, tool design, permessi e verifica.

## Fonti da usare con cautela o solo come contesto secondario

- LangChain blog: utile e serio per pattern applicativi, ma non fonte primaria sui prodotti Claude/OpenAI.
- IBM Think/Developer: buona fonte divulgativa enterprise, ma secondaria rispetto a paper, docs vendor e corsi universitari.
- News, Medium, Reddit, YouTube non ufficiali: esclusi dalla base del corso, eventualmente solo per esempi di percezione pubblica.

