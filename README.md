# 🧠 Cuba-Thinking

**Advanced sequential thinking for AI agents** — A Model Context Protocol (MCP) server that enhances AI reasoning with a 6-stage cognitive engine, semantic embeddings, anti-hallucination, graph-of-thought, and bias detection.

1 tool. Zero configuration. Mathematically verified.

---

## Why Cuba-Thinking?

AI agents think in flat, unstructured sequences. Cuba-Thinking gives them:

- **A cognitive engine** — 6-stage state machine (Bloom's Taxonomy) that guides thinking from DEFINE → SYNTHESIZE
- **Semantic embeddings** — Local BGE-small-en-v1.5 (384d) for thought similarity and stagnation detection
- **6D quality metrics** — Clarity, Depth, Breadth, Logic, Relevance, Actionability with EWMA trend analysis
- **Anti-hallucination** — Assumption tracking, contradiction detection, confidence calibration, Chain-of-Verification
- **Bias detection** — Identifies 5 cognitive biases with actionable suggestions
- **Graph-of-Thought** — DAG edge registry for branching, revision, and merge tracking
- **Anti-overthinking** — Shannon entropy stability and EWMA stagnation detection
- **Fatigue detection** — Consecutive quality drop monitoring with actionable suggestions

| Feature | Cuba-Thinking | Basic Thinking MCPs |
|---------|:------------:|:-------------------:|
| 6-stage cognitive engine (Bloom's) | ✅ | ❌ |
| Semantic embeddings (BGE-384d neural) | ✅ | ❌ |
| 6D quality metrics + EWMA reward | ✅ | 4D or less |
| Shannon Entropy stability | ✅ | ❌ |
| Graph-of-Thought (DAG edges) | ✅ | ❌ |
| Chain-of-Verification (CoVe) | ✅ | ❌ |
| Anti-overthinking detection | ✅ | ❌ |
| Fatigue monitoring | ✅ | ❌ |
| Assumption tracking + dedup | ✅ | ❌ |
| Contradiction detection | ✅ | ❌ |
| Confidence calibration per stage | ✅ | ❌ |
| 5-bias detector | ✅ | ❌ |
| Stagnation detection | ✅ | ❌ |
| Graceful degradation | ✅ | ❌ |
| Dependencies | **4** | 13+ |

---

## Quick Start

### 1. Prerequisites

- **Node.js 18+**

### 2. Install

```bash
git clone https://github.com/lENADRO1910/cuba-thinking.git
cd cuba-thinking
npm install
npm run build
```

### 3. Configure your AI editor

Add to your MCP configuration (e.g., `mcp_config.json`):

```json
{
  "mcpServers": {
    "cuba-thinking": {
      "command": "node",
      "args": ["/path/to/cuba-thinking/dist/index.js"]
    }
  }
}
```

Zero environment variables. Zero configuration. It just works.

---

## The Tool

### `cuba_thinking`

Advanced sequential thinking with 6-stage cognitive engine, semantic embeddings, anti-hallucination (assumption tracking, contradiction detection, confidence calibration), 6D quality metrics with trends, and bias detection.

**Required parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `thought` | string | Your current thinking step |
| `thoughtNumber` | number | Current thought number in the sequence |
| `totalThoughts` | number | Estimated total thoughts needed (adjustable) |
| `nextThoughtNeeded` | boolean | Whether another thought step is needed |

**Optional parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `thinkingStage` | string | `DEFINE`, `RESEARCH`, `ANALYZE`, `HYPOTHESIZE`, `VERIFY`, `SYNTHESIZE` (auto-detected if omitted) |
| `confidence` | number | 0.0–1.0, calibrated against stage expectations |
| `qualityMetrics` | object | Manual quality overrides (0–5 per dimension) |
| `assumptions` | string[] | Tracked and deduplicated across thoughts |
| `hypothesis` | string | Current hypothesis being tested |
| `isRevision` | boolean | Whether this revises a previous thought |
| `revisesThought` | number | Which thought is being revised |
| `branchFromThought` | number | Branching point for parallel exploration |
| `branchId` | string | Identifier for parallel reasoning paths |
| `parentThoughts` | number[] | Multiple parent thought references for GoT merge operations |
| `needsMoreThoughts` | boolean | Extend beyond initial estimate |
| `budgetMode` | string | `fast`, `balanced`, `thorough`, `exhaustive` |
| `budgetUsed` | number | Budget consumed (0–100%) |
| `biasDetected` | string | Agent-reported bias type |

---

## The 6 Cognitive Stages

Based on Bloom's Revised Taxonomy (Anderson & Krathwohl, 2001):

```
DEFINE ──→ RESEARCH ──→ ANALYZE ──→ HYPOTHESIZE ──→ VERIFY ──→ SYNTHESIZE
  📋          🔍          🔬           💡             ✅          🎯
```

| Stage | Focus | Confidence Range |
|-------|-------|:----------------:|
| DEFINE | Clarify scope, requirements | 0.30 – 0.60 |
| RESEARCH | Explore options, gather data | 0.30 – 0.70 |
| ANALYZE | Evaluate trade-offs, compare | 0.40 – 0.80 |
| HYPOTHESIZE | Propose solutions, predict | 0.50 – 0.85 |
| VERIFY | Test, validate, confirm | 0.60 – 0.90 |
| SYNTHESIZE | Conclude, recommend, summarize | 0.70 – 0.95 |

Each stage boosts different quality dimensions. DEFINE boosts **Clarity** (3×), ANALYZE boosts **Depth** (3×), SYNTHESIZE boosts **Actionability** (3×).

---

## Mathematical Foundations

Every formula is **verified with Wolfram Alpha** against analytical solutions.

### Shannon Entropy — Shannon (1948)

```
H = -Σ pᵢ·log₂(pᵢ)   where pᵢ = scoreᵢ / Σscores
stability = H / H_max  where H_max = log₂(6)
```

Measures reasoning balance across 6D quality dimensions. Stability < 0.60 triggers a warning that reasoning is lopsided (e.g., high clarity but zero depth).

**Verification:** Scores `{0.6, 0.55, 0.4, 0.57, 1.0, 0.4}` → `H = 2.5077, stability = 0.9701` ✅

### EWMA Step Reward — Roberts (1959)

```
EWMA_t = α · reward_t + (1 - α) · EWMA_{t-1}   where α = 0.3
reward = 0.6·quality + 0.3·coherence + 0.1·(1 - contradictions/t)
```

O(1) step-level reward signal that exponentially weights recent quality. More responsive than OLS for detecting rapid quality changes.

**Verification:** α=0.3 decay chain: `60% → 53% → 49% → 42% → 36% → 28%` ✅

### Cosine Similarity — Salton (1975)

```
cos(A, B) = (A · B) / (‖A‖ × ‖B‖)
```

Used for semantic similarity between thought embeddings (384-dimensional BGE vectors) and keyword-based fallback (TF frequency vectors).

**Verification:** `cos([1,2,3], [4,5,6]) = 32/√1078 ≈ 0.9746` ✅ Wolfram Alpha confirmed.

### OLS Linear Regression — Gauss (1795)

```
slope = (n·Σxy − Σx·Σy) / (n·Σx² − (Σx)²)
```

Trend analysis over a sliding window of quality scores. `slope > 0.02` → improving, `< -0.02` → declining.

**Verification:** `y = 0.3 + 0.1x` → `slope = 0.1` ✅ Wolfram Alpha confirmed.

### Weighted Mean — Quality Overall

```
overall = Σ(score_i × weight_i) / Σ(weight_i)
```

Stage-specific weights boost relevant dimensions. DEFINE: Clarity×3, ANALYZE: Depth×3, SYNTHESIZE: Actionability×3.

**Verification:** DEFINE scores `[0.8, 0.5, 0.4, 0.6, 0.7, 0.3]` → `0.6222` ✅ Wolfram Alpha confirmed.

---

## Anti-Hallucination

Four verification layers that require zero LLM calls:

### 1. Assumption Tracking

Accumulates and deduplicates assumptions across all thoughts. Semantic deduplication when embeddings are available (cosine > 0.85 → duplicate), exact match otherwise.

### 2. Contradiction Detection

Compares each new thought against all previous thoughts for semantic similarity + negation patterns:

```
contradiction = similarity(A, B) > 0.7 AND has_negation_difference(A, B)
```

### 3. Confidence Calibration

Flags overconfidence (high confidence in early stages) and underconfidence (low confidence in late stages).

### 4. Chain-of-Verification (CoVe) — Dhuliawala et al. (2023)

At critical stage transitions (`ANALYZE→HYPOTHESIZE` and `HYPOTHESIZE→SYNTHESIZE`), automatically generates verification questions from unverified assumptions:

```
Assumption: "Redis is available"  → ❓ Has "Redis is available" been confirmed?
Assumption: "Hit ratio > 80%"    → ❓ What evidence supports: "Hit ratio > 80%"?
```

Template-based question generation — no external LLM calls needed.

---

## Graph-of-Thought (GoT-lite) — Besta et al. (2024)

Tracks reasoning structure as a directed acyclic graph:

| Edge Type | Created By | Meaning |
|-----------|-----------|---------|
| `extends` | `branchFromThought` | Thought branches from another |
| `revises` | `revisesThought` | Thought revises a previous one |
| `merges` | `parentThoughts[]` | Thought merges multiple parents |

Graph coherence is computed as the average similarity across all edges:

```
coherence = (1/|E|) · Σ sim(thought_u, thought_v)
```

---

## Anti-Overthinking — DeepSeek (2025)

Based on DeepSeek's "Thoughtology" research: reasoning quality follows an inverted-U curve. Beyond the optimal point, rumination degrades quality.

```
stagnation = true if EWMA_diff < 2% for 3+ consecutive thoughts
```

When detected:
- Emits `⚡ Stagnation detected — consider concluding`
- In `fast` budgetMode: auto-reduces `totalThoughts`

---

## Fatigue Detection — Flavell (1979)

Monitors consecutive quality drops to detect cognitive fatigue:

| Consecutive Drops | Suggested Action |
|:-----------------:|:----------------:|
| < 3 | `continue` |
| 3–4 | `step_back` |
| ≥ 5 | `conclude` |

---

## Bias Detection

Identifies 5 cognitive biases with actionable suggestions:

| Bias | Detection Method | Trigger |
|------|:---------------:|---------| 
| **Confirmation** | History similarity > 0.7 for recent thoughts | Repeatedly reinforcing same conclusion |
| **Anchoring** | First quantitative reference dominates | Over-reliance on initial data point |
| **Availability** | Recency weighting of examples | Using recent/memorable examples disproportionately |
| **Overconfidence** | High confidence early in reasoning | Confidence > 0.8 before 50% progress |
| **Sunk Cost** | Late-stage reluctance to change | Keywords like "already invested" after 70% progress |

---

## Silent by Default

All features follow the **silent by default** principle — they only appear in output when they detect actionable conditions:

| Feature | Only Appears When |
|---------|------------------|
| Shannon Stability | < 60% (unbalanced reasoning) |
| EWMA Reward | Always (core quality metric) |
| Anti-Overthinking | 3+ stagnant thoughts |
| CoVe Checkpoint | Stage transitions with open assumptions |
| Fatigue | 3+ consecutive quality drops |
| Graph | When edges exist |

---

## Architecture

```
cuba-thinking/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts                     # MCP server entry point
    ├── types.ts                     # Zod schemas + TypeScript interfaces
    ├── formatter.ts                 # Structured response rendering
    └── services/
        ├── cognitive-processor.ts   # Central orchestrator
        ├── embedding.service.ts     # BGE-384d + keyword fallback
        ├── stage-engine.service.ts  # 6-stage FSM
        ├── quality-metrics.service.ts # 6D + EWMA + Shannon entropy
        ├── anti-hallucination.service.ts # 4-layer verification + CoVe
        └── bias-detector.service.ts # 5-bias detection
```

### Dependencies (4 total)

| Package | Purpose |
|---------|---------|
| `@modelcontextprotocol/sdk` | MCP protocol server |
| `@huggingface/transformers` | Local BGE embeddings (lazy init, ~80MB one-time download) |
| `zod` | Input validation |
| `chalk` | Terminal formatting |

### Graceful Degradation

If the embedding model fails to load, Cuba-Thinking automatically falls back to keyword-based cosine similarity. All features continue working — embedding-dependent features degrade to heuristic equivalents.

---

## How It Works in Practice

### 1. Structured reasoning with quality tracking

```
Agent: I need to analyze the caching options...
→ cuba_thinking(thought: "...", stage: "ANALYZE", confidence: 0.6)
← Stage: ANALYZE (50% progress)
  Quality: Clarity=0.72, Depth=0.85 (boosted 3×)
  EWMA Reward: 67%
  Trend: improving 📈
```

### 2. CoVe catches unverified assumptions at stage transitions

```
Stage transition: ANALYZE → HYPOTHESIZE
← ── Verification Checkpoint (ANALYZE→HYPOTHESIZE) ──────
   Open assumptions: 3
   ❓ Has "Redis is available" been confirmed?
   ❓ What evidence supports: "Hit ratio > 80%"?
```

### 3. Graph tracks reasoning structure

```
← ── Graph (3 edges) ──────
   1 →[extends]→ 2
   1 →[merges]→ 2
   1 →[revises]→ 3
   Coherence: 72%
```

### 4. Anti-overthinking prevents rumination

```
← ⚡ Stagnation detected: 3 consecutive thoughts with <2% quality improvement. Consider concluding.
← 🧠 Fatigue: 3 consecutive quality drops → step_back
```

---

## Part of the Cuba Ecosystem

| Project | Purpose |
|---------|---------|
| [Cuba-Memorys](https://github.com/lENADRO1910/cuba-memorys) | Persistent memory — knowledge graph, Hebbian learning, anti-hallucination grounding |
| **Cuba-Thinking** | Sequential reasoning — cognitive engine, quality metrics, graph-of-thought, bias detection |

Together, they give AI agents **memory + reasoning** — the two fundamental capabilities for reliable AI assistance.

---

## Academic References

| # | Citation | Used For |
|---|----------|----------|
| 1 | Shannon (1948). "A Mathematical Theory of Communication" | Entropy stability |
| 2 | Besta et al. (2024). "Graph of Thoughts" — ETH Zurich | DAG structure |
| 3 | Dhuliawala et al. (2023). "CoVe Reduces Hallucination" — Meta AI | Verification |
| 4 | Lightman et al. (2023). "Let's Verify Step by Step" — OpenAI | Step reward |
| 5 | DeepSeek (2025). "Thoughtology" | Anti-overthinking |
| 6 | Flavell (1979). "Metacognition and Cognitive Monitoring" | Fatigue detection |
| 7 | Roberts (1959). "EWMA Control Charts" | EWMA smoothing |
| 8 | Anderson & Krathwohl (2001). "Revised Bloom's Taxonomy" | Cognitive stages |
| 9 | Salton (1975). "Vector Space Model" | Cosine similarity |
| 10 | Gauss (1795). "Method of Least Squares" | OLS regression |
| 11 | Kahneman & Tversky (1974). "Judgment Under Uncertainty" | Bias detection |

---

## License

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — Free to use and modify, **not for commercial use**.

---

## Author

**Leandro Pérez G.**

- GitHub: [@lENADRO1910](https://github.com/lENADRO1910)
- Email: [leandropatodo@gmail.com](mailto:leandropatodo@gmail.com)
