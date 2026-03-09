# 🧠 Cuba-Thinking

**Advanced sequential thinking for AI agents** — A Model Context Protocol (MCP) server that enhances AI reasoning with a 6-stage cognitive engine, semantic embeddings, anti-hallucination, graph-of-thought, NLI contradiction detection, MCTS quality enforcement, ROSCOE faithfulness scoring, information gain analysis, source grounding, and cross-MCP memory symbiosis.

1 tool. Zero configuration. Mathematically verified.

---

## Why Cuba-Thinking?

AI agents think in flat, unstructured sequences. Cuba-Thinking gives them:

- **A cognitive engine** — 6-stage state machine (Bloom's Taxonomy) that guides thinking from DEFINE → SYNTHESIZE
- **Semantic embeddings** — Local BGE-small-en-v1.5 (384d) for thought similarity, stagnation, and contradiction detection
- **6D quality metrics** — TTR clarity, clause depth, structural logic, noun breadth, semantic relevance, and concrete actionability
- **Anti-hallucination** — Assumption tracking, NLI-verified contradiction detection, confidence calibration, Chain-of-Verification
- **NLI Cross-Encoder** — DeBERTa-v3-xsmall (22M params) for semantic contradiction detection that negation-counting misses
- **MCTS Forced Backtracking** — Protocol-level quality enforcement with budget-aware thresholds
- **Memory Symbiosis** — Cross-MCP bridge to cuba-memorys via formatted recall/consolidation instructions
- **Metacognitive analysis** — Filler detection, claim density scoring, fallacy detection, dialectical reasoning checks
- **Bias detection** — Identifies 5 cognitive biases with actionable suggestions
- **Graph-of-Thought** — DAG edge registry with topology analysis (orphan detection, linearity ratio)
- **Anti-overthinking** — EWMA stagnation detection, early stopping signals, fatigue monitoring

### v1.2 — New in this release

- **Step Transition Coherence (V1)** — ROSCOE STC detects topic jumps between consecutive thoughts
- **Evidence Accumulation (V2)** — Flags unsupported confidence increases (Wald Sequential Analysis)
- **Verbosity Detection (V3)** — Content-word ratio catches filler-heavy thoughts (Coh-Metrix)
- **Adaptive EWMA (V4)** — Budget-aware α floor prevents sluggish EWMA in long chains (Roberts 1959)
- **Stage-Weighted Contradictions (V5)** — Progressive strictness from DEFINE (permissive) to SYNTHESIZE (strict)
- **Quality Gate (V6)** — Budget-aware quality floor triggers early exit on low quality (Optimal Stopping)
- **Semantic Novelty (V7)** — Detects redundant thoughts via divergent thinking originality score (Guilford 1967)
- **Reasoning Chain Depth (V8)** — Tracks backward references to prior conclusions (Bloom's Taxonomy)
- **Stopword Filtering (V9)** — Improves keyword similarity precision by +16% MAP (Kaur 2023)
- **6-Signal EWMA Reward (V10)** — Composite reward includes E1/E4/E6 signals (Shannon DPI)
- **Sliding-Window Relevance (V11)** — Compares against last-3 thoughts instead of always thought #1
- **Budget-Aware MCTS (V12)** — Fast mode exploits (50%), exhaustive explores (30%) (UCB1)
- **CoVe +1 Checkpoint (V13)** — Added RESEARCH→ANALYZE verification transition
- **Compact Output (V14)** — New metrics displayed only when actionable
- **Warmup Guard (V15)** — Suppresses false stagnation/overthinking alarms for thoughts 1-2

| Feature | Cuba-Thinking | Official Sequential Thinking |
|---------|:------------:|:----------------------------:|
| 6-stage cognitive engine (Bloom's) | ✅ | ❌ |
| Semantic embeddings (BGE-384d neural) | ✅ | ❌ |
| 6D quality metrics + EWMA reward | ✅ | ❌ |
| NLI contradiction detection (DeBERTa) | ✅ | ❌ |
| MCTS forced backtracking (isError) | ✅ | ❌ |
| Cross-MCP memory symbiosis | ✅ | ❌ |
| Anti-hallucination (9 checks) | ✅ | ❌ |
| Bias detection (5 types) | ✅ | ❌ |
| Budget modes (4 levels) | ✅ | ❌ |
| Step coherence / semantic novelty | ✅ | ❌ |
| Evidence accumulation tracking | ✅ | ❌ |
| Verbosity / reasoning chain analysis | ✅ | ❌ |
| ROSCOE Faithfulness scoring | ✅ | ❌ |
| Information Gain (Shannon) | ✅ | ❌ |
| Source Grounding detection | ✅ | ❌ |
| Graph-of-Thought with topology | ✅ | ❌ |
| Chain-of-Verification (CoVe) | ✅ | ❌ |
| Anti-overthinking + early stopping | ✅ | ❌ |
| Fatigue monitoring | ✅ | ❌ |
| Confidence calibration per stage | ✅ | ❌ |
| Reasoning type classification | ✅ | ❌ |
| Graceful degradation | ✅ | ❌ |
| **Total features** | **38** | **3** |
| Dependencies | **3** | 2 |

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

## MCTS Forced Backtracking

When the EWMA step reward drops below the budget-aware threshold (after thought #3), the MCP tool call is **rejected at the protocol level** with `isError: true`.

```
Budget thresholds (V12 — UCB1, Kocsis 2006):
  fast:       50%  (exploit — cut losses early)
  balanced:   40%  (default)
  thorough:   35%
  exhaustive: 30%  (explore — give chains room)
```

The system identifies the thought with the highest quality score and forces branching:

```
⛔ MCTS BACKTRACK — EWMA Reward 39% < 40% threshold
Thought #12 REJECTED at protocol level.
Rollback to thought #2 (quality: 75%).
You MUST branch with: branchFromThought: 2
```

---

## NLI Cross-Encoder — DeBERTa-v3-xsmall

Two-stage contradiction detection pipeline:

```
Stage 1: Cosine similarity > threshold?   (~1ms, embedding-based)
  V5: Threshold varies by stage — 0.80 (DEFINE) → 0.45 (SYNTHESIZE)
  ↓ Yes
Stage 2: DeBERTa NLI classification       (~200ms, text-classification)
  ↓ contradiction score > 0.85
  → NLI-verified contradiction
```

The model is `Xenova/nli-deberta-v3-xsmall` (22M parameters, ONNX quantized q8), running locally with zero API calls.

If the NLI model fails to load, the system falls back to negation polarity detection.

---

## Cortex-Hippocampus Symbiosis

Cross-MCP memory bridge between cuba-thinking and [cuba-memorys](https://github.com/lENADRO1910/cuba-memorys):

| Stage | Trigger | Injected Instruction |
|-------|---------|---------------------|
| **DEFINE** (thought ≤ 2) | Problem definition | `cuba_faro(query:...)` — search past knowledge |
| | | `cuba_expediente(query:...)` — check past errors |
| **SYNTHESIZE** (!nextThought) | Conclusion | `cuba_cronica(action:"add", ...)` — consolidate lesson |

This creates a cognitive loop: **recall before reasoning, consolidate after conclusion** — analogous to the cortex-hippocampus consolidation cycle (McClelland et al., 1995).

---

## 6D Quality Metrics

Each dimension uses empirically validated linguistic measures:

| Dimension | Method | Basis |
|-----------|--------|-------|
| **Clarity** | Type-Token Ratio (unique/total words) + sentence diversity | Templin (1957) |
| **Depth** | Subordinate clause counting + causal keyword density | Hunt (1965) |
| **Breadth** | Unique noun ratio + topic diversity markers | Lexical diversity |
| **Logic** | Connective type diversity + conditional chain depth + conclusion presence | ROSCOE (Golovneva et al., 2023) |
| **Relevance** | Cosine similarity with sliding-window (V11) or keyword fallback | Salton (1975) |
| **Actionability** | Imperative verbs + units/measurements + specificity vs. vagueness | GRACE (Guan et al., 2024) |

### EWMA Step Reward — Roberts (1959)

```
EWMA_t = α · reward_t + (1 - α) · EWMA_{t-1}
α = max(2/(n+1), α_floor)    — V4: budget-aware floor

reward = 0.40·quality + 0.20·coherence + 0.10·(1 - contradictions/t)
       + 0.10·faithfulness + 0.10·informationGain + 0.10·grounding
                                                    ↑ V10: 6-signal composite
```

---

## Anti-Hallucination

Nine verification layers that require zero LLM calls:

1. **Assumption Tracking** — Semantic dedup across all thoughts
2. **Contradiction Detection** — Two-stage pipeline (embedding + NLI cross-encoder)
3. **Stage-Weighted Thresholds (V5)** — Progressive strictness from DEFINE → SYNTHESIZE
4. **Confidence Calibration** — Per-stage expected ranges
5. **Chain-of-Verification (V13)** — 3 stage transitions (RESEARCH→ANALYZE, ANALYZE→HYPOTHESIZE, HYPOTHESIZE→SYNTHESIZE)
6. **Evidence Accumulation (V2)** — Flags unsupported confidence increases
7. **Claim Density Scoring** — Verifiable assertions per sentence
8. **Source Grounding (E6)** — Grounded vs. ungrounded claim ratio
9. **MCTS Quality Enforcement** — Protocol-level rejection of low-quality thoughts

---

## Advanced Reasoning Metrics (v1.2)

### Step Transition Coherence (V1) — Golovneva et al. (2023)

```
STC(n) = cos_sim(thought_{n-1}, thought_n)
STC < 30% → "Topic jump without explicit branching"
```

### Evidence Accumulation (V2) — Wald (1945)

```
Δ_confidence > 10% AND evidence_strength < 3%
  → "Unsupported confidence increase"
```

### Verbosity (V3) — Graesser (2004)

```
CWR = content_words / total_words
CWR < 40% → "High verbosity — be more concise"
```

### Semantic Novelty (V7) — Guilford (1967)

```
novelty = 1 - max(sim(thought_n, thought_i))  ∀i < n
novelty < 15% → "Semantic redundancy — explore a different angle"
```

### Reasoning Chain Depth (V8) — Anderson & Krathwohl (2001)

```
chain_score = backward_references / (n - 1)
chain_score < 10% after thought 3 → "Reference earlier findings"
```

### ROSCOE Faithfulness (E1)

```
F(sₙ) = (1/n) · Σᵢ cos_sim(sₙ, sᵢ)
F < 95% → semantic drift warning
```

### Information Gain (E4) — Shannon (1948)

```
IG = new_concepts / total_concepts
```

### Source Grounding (E6)

```
G = grounded / (grounded + ungrounded)
G < 30% with ≥ 2 ungrounded → "Add sources/references"
```

---

## Graph-of-Thought (GoT-lite) — Besta et al. (2024)

| Edge Type | Created By | Meaning |
|-----------|-----------|---------|
| `extends` | `branchFromThought` | Thought branches from another |
| `revises` | `revisesThought` | Thought revises a previous one |
| `merges` | `parentThoughts[]` | Thought merges multiple parents |

Graph coherence = average similarity across all edges. Topology analysis detects orphan thoughts and evaluates graph linearity.

---

## Budget Modes

| Mode | EWMA α Floor | MCTS Threshold | Quality Gate |
|------|:------------:|:--------------:|:------------:|
| `fast` | 0.30 | 50% | 30% |
| `balanced` | — | 40% | 25% |
| `thorough` | 0.20 | 35% | 20% |
| `exhaustive` | 0.15 | 30% | 15% |

---

## Silent by Default

All features only appear when they detect actionable conditions:

| Feature | Only Appears When |
|---------|------------------|
| Shannon Stability | < 60% (unbalanced reasoning) |
| EWMA Reward | Always (core metric) |
| Claim Density | Claims detected |
| Metacognition Warning | > 30% filler ratio |
| Fallacy Warning | Hasty generalization detected |
| Dialectical Warning | VERIFY/SYNTHESIZE without counter-arguments |
| Confidence Variance | σ > 0.25 |
| Anti-Overthinking | 3+ stagnant thoughts (V15: suppressed for t≤2) |
| Early Stopping | Quality > 0.7 and progress > 70% |
| CoVe Checkpoint | Stage transitions with open assumptions |
| Fatigue | 3+ consecutive quality drops |
| MCTS Backtracking | EWMA < threshold after thought #3 |
| Memory Recall/Consolidation | DEFINE/SYNTHESIZE stages |
| NLI Contradiction | Cross-encoder score > 0.85 |
| **Step Coherence (V1)** | STC < 30% |
| **Evidence Warning (V2)** | Unsupported confidence Δ |
| **Verbosity Warning (V3)** | CWR < 40% |
| **Semantic Novelty (V7)** | novelty < 15% |
| **Reasoning Chain (V8)** | chain < 10% after t=3 |
| Faithfulness (E1) | < 95% alignment |
| Information Gain (E4) | > 0% new concepts |
| Grounding Warning (E6) | < 30% grounded claims |

---

## Architecture

```
cuba-thinking/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts                          # MCP server + MCTS backtracking (V12)
    ├── types.ts                          # Zod schemas + TypeScript interfaces
    ├── formatter.ts                      # Response rendering + memory symbiosis (V14)
    └── services/
        ├── cognitive-processor.ts        # Central orchestrator (V6, V15 + wiring)
        ├── embedding.service.ts          # BGE-384d + keyword fallback (V9, V11)
        ├── nli.service.ts                # DeBERTa NLI text-classification (B2)
        ├── stage-engine.service.ts       # 6-stage FSM
        ├── quality-metrics.service.ts    # 6D + EWMA + V1-V4 + V7-V8 + V10
        ├── anti-hallucination.service.ts # 9-layer verification (V5, V13)
        ├── bias-detector.service.ts      # 5-bias detection
        └── transformers-loader.ts        # Shared HuggingFace module loader
```

### Dependencies (3 total)

| Package | Purpose |
|---------|---------|
| `@modelcontextprotocol/sdk` | MCP protocol server |
| `@huggingface/transformers` | Local BGE embeddings + NLI cross-encoder (lazy init) |
| `zod` | Input validation |

### Graceful Degradation

If models fail to load, Cuba-Thinking automatically falls back to keyword-based similarity and negation polarity detection. All features continue working — model-dependent features degrade to heuristic equivalents.

---

## Mathematical Verification

Every formula is verified with Wolfram Alpha:

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
| **Cuba-Thinking** | Sequential reasoning — cognitive engine, quality metrics, NLI contradictions, MCTS enforcement, memory symbiosis |

Together, they give AI agents **memory + reasoning** — the two fundamental capabilities for reliable AI assistance.

---

## Academic References

| # | Citation | Used For |
|---|----------|----------|
| 1 | Shannon (1948). "A Mathematical Theory of Communication" | Entropy stability, Information Gain (E4, V10) |
| 2 | Besta et al. (2024). "Graph of Thoughts" — ETH Zurich | DAG structure + topology |
| 3 | Dhuliawala et al. (2023). "CoVe Reduces Hallucination" — Meta AI | Verification questions (V13) |
| 4 | Lightman et al. (2023). "Let's Verify Step by Step" — OpenAI | Step reward (EWMA) |
| 5 | DeepSeek (2025). "Thoughtology" | Anti-overthinking + early stopping |
| 6 | Flavell (1979). "Metacognition and Cognitive Monitoring" | Metacognitive filler detection |
| 7 | Roberts (1959). "EWMA Control Charts" | Adaptive EWMA smoothing (V4) |
| 8 | Anderson & Krathwohl (2001). "Revised Bloom's Taxonomy" | Cognitive stages, Reasoning Chain (V8) |
| 9 | Salton (1975). "Vector Space Model" | Cosine similarity |
| 10 | Gauss (1795). "Method of Least Squares" | OLS trend analysis |
| 11 | Kahneman & Tversky (1974). "Judgment Under Uncertainty" | Bias detection |
| 12 | Templin (1957). "Certain Language Skills in Children" | TTR clarity metric |
| 13 | Hunt (1965). "Grammatical Structures" | Clause depth analysis |
| 14 | Golovneva et al. (2023). "ROSCOE: Reasoning Scores" — ICLR | STC (V1), Faithfulness (E1), Logic |
| 15 | Guan et al. (2024). "GRACE: Generative Reasoning Assessment" | Actionability scoring |
| 16 | Shewhart (1931). "Economic Control of Quality" | Confidence variance, Warmup guard (V15) |
| 17 | Coulom (2006). "Efficient Selectivity in MCTS" | Forced backtracking |
| 18 | He et al. (2021). "DeBERTa" | NLI cross-encoder |
| 19 | McClelland et al. (1995). "Complementary Learning Systems" | Memory symbiosis |
| 20 | Green & Swets (1966). "Signal Detection Theory" | Stage-weighted thresholds (V5) |
| 21 | Wald (1945). "Sequential Analysis" | Evidence accumulation (V2), Quality gate (V6) |
| 22 | Graesser et al. (2004). "Coh-Metrix" | Verbosity detection (V3) |
| 23 | Guilford (1967). "Divergent Thinking" | Semantic novelty (V7) |
| 24 | Kaur & Buttar (2023). "Stopword Removal Impact" — Springer | Stopword filtering (V9) |
| 25 | Mitra et al. (1998). "Improving Automatic Query Expansion" | Sliding-window relevance (V11) |
| 26 | Kocsis & Szepesvári (2006). "UCB Applied to Trees" | Budget-aware MCTS (V12) |
| 27 | Zangari (1994). "EWMA for Risk Management" | Adaptive alpha floor (V4) |

---

## License

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — Free to use and modify, **not for commercial use**.

---

## Author

**Leandro Pérez G.**

- GitHub: [@lENADRO1910](https://github.com/lENADRO1910)
- Email: [leandropatodo@gmail.com](mailto:leandropatodo@gmail.com)
