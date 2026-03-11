// src/engine/mod.rs
pub mod mcts_graph;
pub mod micro_prm;
pub mod sandbox;
pub mod shared_utils;

// ─── Phase 1: Cognitive Core (v3.0) ─────────────────────────────
pub mod stage_engine;
pub mod quality_metrics;
pub mod ewma_reward;
pub mod budget;
pub mod anti_hallucination;
pub mod bias_detector;
pub mod metacognition;
pub mod thought_graph;
pub mod memory_bridge;
pub mod formatter;

// ─── Phase 3: Semantics (v3.1) ──────────────────────────────────
pub mod semantic_similarity;
pub mod contradiction_detector;
pub mod novelty_tracker;
pub mod claim_grounding;

// ─── Phase 5: Deep Reasoning (v3.2) ─────────────────────────────
pub mod thought_session;
pub mod corrective_directives;
pub mod stage_validator;
