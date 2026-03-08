# 🧠 Cuba-Thinking

**Advanced sequential thinking for AI agents** — A Model Context Protocol (MCP) server that enhances AI reasoning with a 6-stage cognitive engine, semantic embeddings, anti-hallucination, graph-of-thought, and bias detection.

1 tool. Zero configuration. Mathematically verified.

---

## Why Cuba-Thinking?

AI agents think in flat, unstructured sequences. Cuba-Thinking gives them:

- **A cognitive engine** — 6-stage state machine (Bloom's Taxonomy) that guides thinking from DEFINE → SYNTHESIZE
- **Semantic embeddings** — Local BGE-small-en-v1.5 (384d) for thought similarity, stagnation, and contradiction detection
- **6D quality metrics** — TTR clarity, clause depth, structural logic, noun breadth, semantic relevance, and concrete actionability
- **Anti-hallucination** — Assumption tracking, contradiction detection with negation polarity, confidence calibration, Chain-of-Verification
- **Metacognitive analysis** — Filler detection, claim density scoring, fallacy detection, dialectical reasoning checks
- **Bias detection** — Identifies 5 cognitive biases with actionable suggestions
- **Graph-of-Thought** — DAG edge registry with topology analysis (orphan detection, linearity ratio)
- **Anti-overthinking** — EWMA stagnation detection, early stopping signals, fatigue monitoring

| Feature | Cuba-Thinking | Basic Thinking MCPs |
|---------|:------------:|:-------------------:|
| 6-stage cognitive engine (Bloom's) | ✅ | ❌ |
| Semantic embeddings (BGE-384d neural) | ✅ | ❌ |
| 6D quality metrics + EWMA reward | ✅ | 4D or less |
| TTR clarity (Templin 1957) | ✅ | ❌ |
| Clause depth analysis (Hunt 1965) | ✅ | ❌ |
| Structural logic scoring (ROSCOE) | ✅ | ❌ |
| Claim density scoring | ✅ | ❌ |
| Metacognitive filler detection | ✅ | ❌ |
| Fallacy detection (hasty generalization) | ✅ | ❌ |
| Dialectical reasoning check | ✅ | ❌ |
| Confidence variance tracking (Shewhart) | ✅ | ❌ |
| Shannon Entropy stability | ✅ | ❌ |
| Graph-of-Thought with topology analysis | ✅ | ❌ |
| Chain-of-Verification (CoVe) | ✅ | ❌ |
| Contradiction detection + negation polarity | ✅ | ❌ |
| Anti-overthinking + early stopping | ✅ | ❌ |
| Fatigue monitoring | ✅ | ❌ |
| Assumption tracking + dedup | ✅ | ❌ |
| Confidence calibration per stage | ✅ | ❌ |
| 5-bias detector | ✅ | ❌ |
| Stagnation detection | ✅ | ❌ |
| Reasoning type classification | ✅ | ❌ |
| Session statistics aggregation | ✅ | ❌ |
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

## 6D Quality Metrics

Each dimension uses empirically validated linguistic measures:

| Dimension | Method | Basis |
|-----------|--------|-------|
| **Clarity** | Type-Token Ratio (unique/total words) + sentence diversity | Templin (1957) |
| **Depth** | Subordinate clause counting + causal keyword density | Hunt (1965) |
| **Breadth** | Unique noun ratio + topic diversity markers | Lexical diversity |
| **Logic** | Connective type diversity + conditional chain depth + conclusion presence | ROSCOE (Golovneva et al., 2023) |
| **Relevance** | Cosine similarity to first thought (embedding) or keyword fallback | Salton (1975) |
| **Actionability** | Imperative verbs + units/measurements + specificity vs. vagueness | GRACE (Guan et al., 2024) |

### EWMA Step Reward — Roberts (1959)

```
EWMA_t = α_n · reward_t + (1 - α_n) · EWMA_{t-1}
α_n = 2 / (n + 1)        — adaptive smoothing
reward = 0.6·quality + 0.3·coherence + 0.1·(1 - contradictions/t)
```

Adaptive α reduces sensitivity to noise as the session progresses while maintaining fast initial responsiveness.

### Shannon Entropy Stability — Shannon (1948)

```
H = -Σ pᵢ·log₂(pᵢ)   where pᵢ = scoreᵢ / Σscores
stability = H / H_max  where H_max = log₂(6)
```

Stability < 0.60 triggers a warning that reasoning is lopsided.

### OLS Trend Analysis — Gauss (1795)

```
slope = (n·Σxy − Σx·Σy) / (n·Σx² − (Σx)²)
```

`slope > 0.02` → 📈 improving, `< -0.02` → 📉 declining.

---

## Anti-Hallucination

Five verification layers that require zero LLM calls:

### 1. Assumption Tracking

Accumulates and deduplicates assumptions across all thoughts. Semantic deduplication when embeddings are available (cosine > 0.85 → duplicate), keyword fallback otherwise.

### 2. Contradiction Detection + Negation Polarity

Compares each new thought against all previous thoughts for semantic similarity combined with negation polarity analysis:

```
contradiction = similarity(A, B) > 0.6
                AND |negations(A) - negations(B)| ≥ 2
```

Negation markers: `not`, `no`, `never`, `doesn't`, `can't`, `without`, `none`, etc. The polarity diff threshold filters false positives from merely similar (but non-contradictory) thoughts.

### 3. Confidence Calibration

Flags overconfidence (high confidence in early stages) and underconfidence (low confidence in late stages) with per-stage expected ranges.

### 4. Chain-of-Verification (CoVe) — Dhuliawala et al. (2023)

At critical stage transitions, generates targeted verification questions:
- **Quantitative assumptions** (containing numbers/percentages): "What measurement confirms: ...?"
- **Qualitative assumptions**: "What evidence supports: ...?"

### 5. Claim Density Scoring

Counts verifiable assertions per sentence (percentages, large numbers, absolutes, causal claims). High density signals text that needs more verification.

---

## Metacognitive Analysis

### Metacognitive Filler Detection — Flavell (1979)

Identifies "thinking about thinking" patterns that consume tokens without substance:

```
filler_ratio = filler_words / total_words
```

Patterns: "let me think", "well", "hmm", "I'm not sure", "maybe I should". Warning triggers at > 30% filler ratio.

### Fallacy Detection

Detects hasty generalization: absolute claims (`always`, `never`, `every`, `all`) near singular evidence (`one`, `single`, `this example`).

### Dialectical Reasoning — Stage-Aware

In VERIFY and SYNTHESIZE stages, checks for counter-argument markers (`however`, `on the other hand`, `admittedly`, `despite`). Absence triggers a warning to consider opposing viewpoints before finalizing conclusions.

### Reasoning Type Classification

Classifies dominant reasoning pattern (deductive, inductive, or abductive) and provides actionable feedback when reasoning is imbalanced.

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

### Topology Analysis

- **Orphan detection**: Counts thoughts with no incoming or outgoing edges
- **Linearity ratio**: `unique_nodes_with_edges / total_thoughts`. Low ratio indicates unexplored branches

---

## Confidence Variance — Shewhart (1931)

Tracks standard deviation of confidence values across the session:

```
σ = sqrt(Σ(x_i - μ)² / n)
```

σ > 0.25 triggers a stability warning — large confidence swings indicate the agent is oscillating rather than converging.

---

## Anti-Overthinking — DeepSeek (2025)

Based on DeepSeek's "Thoughtology" research: reasoning quality follows an inverted-U curve.

```
stagnation = true if EWMA_diff < 2% for 3+ consecutive thoughts
```

### Early Stopping Signal

When quality > 0.7 and progress > 70%, suggests concluding. In `fast` budgetMode, auto-reduces `totalThoughts`.

---

## Fatigue Detection

Monitors consecutive quality drops:

| Consecutive Drops | Suggested Action |
|:-----------------:|:----------------:|
| < 3 | `continue` |
| 3–4 | `step_back` |
| ≥ 5 | `conclude` |

---

## Bias Detection — Kahneman & Tversky (1974)

Identifies 5 cognitive biases with actionable suggestions:

| Bias | Detection Method | Trigger |
|------|:---------------:|---------|
| **Confirmation** | History similarity > 0.7 | Repeatedly reinforcing same conclusion |
| **Anchoring** | First quantitative reference dominates | Over-reliance on initial data point |
| **Availability** | Recency weighting of examples | Using recent/memorable examples disproportionately |
| **Overconfidence** | High confidence early in reasoning | Confidence > 0.8 before 50% progress |
| **Sunk Cost** | Late-stage reluctance to change | Keywords like "already invested" after 70% progress |

---

## Silent by Default

All features follow the **silent by default** principle — they only appear when they detect actionable conditions:

| Feature | Only Appears When |
|---------|------------------|
| Shannon Stability | < 60% (unbalanced reasoning) |
| EWMA Reward | Always (core quality metric) |
| Claim Density | Claims detected in text |
| Metacognition Warning | > 30% filler ratio |
| Fallacy Warning | Hasty generalization detected |
| Dialectical Warning | VERIFY/SYNTHESIZE without counter-arguments |
| Confidence Variance | σ > 0.25 |
| Anti-Overthinking | 3+ stagnant thoughts |
| Early Stopping | Quality > 0.7 and progress > 70% |
| CoVe Checkpoint | Stage transitions with open assumptions |
| Fatigue | 3+ consecutive quality drops |
| Graph | When edges exist |
| Topology Orphans | Orphan thoughts detected |

---

## Test Results

```
Test Suites: 7 passed, 7 total
Tests:       159 passed, 159 total
Failures:    0
```

### Coverage by Category

| Category | Tests | Coverage |
|----------|:-----:|----------|
| Quality Metrics (6D + EWMA + Shannon) | 42 | TTR, clause depth, structural logic, actionability, EWMA reward, entropy stability |
| Anti-Hallucination (contradictions + CoVe) | 28 | Assumption tracking, negation polarity, confidence calibration, CoVe questions |
| Cognitive Processor (orchestration) | 35 | Full pipeline integration, graph edges, fatigue, overthinking |
| Stage Engine (6-stage FSM) | 24 | Auto-detection, transitions, weights, confidence ranges |
| Embedding Service (BGE + fallback) | 18 | Cosine similarity, keyword fallback, cache, graceful degradation |
| Bias Detector (5 biases) | 12 | Confirmation, anchoring, availability, overconfidence, sunk cost |

### Nemesis Protocol (Adversarial Testing)

| Level | Tests | Description |
|-------|:-----:|-------------|
| 🟢 Normal | 25 | Valid inputs, happy paths |
| 🟡 Pessimistic | 14 | Empty strings, undefined, single words, no edges |
| 🔴 Extreme | 12 | Unicode attacks, SQL injection, XSS payloads, 5000-repeat strings, path traversal |

**Key invariant**: All quality scores stay in [0, 1] range for ALL inputs including adversarial payloads.

---

## Architecture

```
cuba-thinking/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts                        # MCP server entry point
    ├── types.ts                        # Zod schemas + TypeScript interfaces
    ├── formatter.ts                    # Structured response rendering
    └── services/
        ├── cognitive-processor.ts      # Central orchestrator
        ├── embedding.service.ts        # BGE-384d + keyword fallback
        ├── stage-engine.service.ts     # 6-stage FSM
        ├── quality-metrics.service.ts  # 6D + EWMA + metacognitive analysis
        ├── anti-hallucination.service.ts # 5-layer verification + CoVe
        └── bias-detector.service.ts    # 5-bias detection
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

## Mathematical Verification

Every formula is verified with Wolfram Alpha against analytical solutions:

| Formula | Input | Expected | Result |
|---------|-------|----------|--------|
| Shannon Entropy | `{0.6, 0.55, 0.4, 0.57, 1.0, 0.4}` | `H = 2.5077, stability = 0.9701` | ✅ |
| EWMA decay (α=0.3) | 5-step chain | `60% → 53% → 49% → 42% → 36% → 28%` | ✅ |
| Cosine similarity | `[1,2,3]·[4,5,6]` | `32/√1078 ≈ 0.9746` | ✅ |
| OLS slope | `y = 0.3 + 0.1x` | `slope = 0.1` | ✅ |
| Weighted mean (DEFINE) | `[0.8, 0.5, 0.4, 0.6, 0.7, 0.3]` | `0.6222` | ✅ |

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
| 2 | Besta et al. (2024). "Graph of Thoughts" — ETH Zurich | DAG structure + topology |
| 3 | Dhuliawala et al. (2023). "CoVe Reduces Hallucination" — Meta AI | Verification questions |
| 4 | Lightman et al. (2023). "Let's Verify Step by Step" — OpenAI | Step reward (EWMA) |
| 5 | DeepSeek (2025). "Thoughtology" | Anti-overthinking + early stopping |
| 6 | Flavell (1979). "Metacognition and Cognitive Monitoring" | Metacognitive filler detection |
| 7 | Roberts (1959). "EWMA Control Charts" | Adaptive EWMA smoothing |
| 8 | Anderson & Krathwohl (2001). "Revised Bloom's Taxonomy" | Cognitive stages |
| 9 | Salton (1975). "Vector Space Model" | Cosine similarity |
| 10 | Gauss (1795). "Method of Least Squares" | OLS trend analysis |
| 11 | Kahneman & Tversky (1974). "Judgment Under Uncertainty" | Bias detection |
| 12 | Templin (1957). "Certain Language Skills in Children" | TTR clarity metric |
| 13 | Hunt (1965). "Grammatical Structures" | Clause depth analysis |
| 14 | Golovneva et al. (2023). "ROSCOE: Reasoning Scores" | Structural logic evaluation |
| 15 | Guan et al. (2024). "GRACE: Generative Reasoning Assessment" | Actionability scoring |
| 16 | Shewhart (1931). "Economic Control of Quality" | Confidence variance |

---

## License

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — Free to use and modify, **not for commercial use**.

---

## Author

**Leandro Pérez G.**

- GitHub: [@lENADRO1910](https://github.com/lENADRO1910)
- Email: [leandropatodo@gmail.com](mailto:leandropatodo@gmail.com)
