import { QualityMetricsService } from '../quality-metrics.service.js';
import type { ThinkingStage, BudgetMode } from '../../types.js';

describe('QualityMetricsService', () => {
  let service: QualityMetricsService;

  beforeEach(() => {
    service = new QualityMetricsService();
  });

  describe('Initialization', () => {
    it('should be created successfully', () => {
      expect(service).toBeDefined();
    });

    it('should have an empty history initially', () => {
      expect(service.getHistory()).toEqual([]);
    });
  });

  describe('calculate', () => {
    it('should calculate scores and return overall quality', () => {
      const thought = 'This is a clear, concise thought. Because it has reasoning, it is logical. Furthermore, it explores breadth.';
      const stage: ThinkingStage = 'RESEARCH';

      const scores = service.calculate(thought, stage);

      expect(scores).toHaveProperty('clarity');
      expect(scores).toHaveProperty('depth');
      expect(scores).toHaveProperty('breadth');
      expect(scores).toHaveProperty('logic');
      expect(scores).toHaveProperty('actionability');
      expect(scores).toHaveProperty('overall');

      // Values should be between 0 and 1
      expect(scores.overall).toBeGreaterThanOrEqual(0);
      expect(scores.overall).toBeLessThanOrEqual(1);

      // History should be updated
      expect(service.getHistory().length).toBe(1);
      expect(service.getHistory()[0]).toBe(scores.overall);
    });

    it('should incorporate manual metrics when provided', () => {
      const thought = 'Simple thought';
      const manualMetrics = { clarity: 5, depth: 3 }; // out of 5

      const scores = service.calculate(thought, 'RESEARCH', manualMetrics);

      expect(scores.clarity).toBe(1); // 5/5
      expect(scores.depth).toBe(0.6); // 3/5
    });
  });

  describe('getTrend', () => {
    it('should return stable if history has less than 3 points', () => {
      service.calculate('t1', 'RESEARCH');
      service.calculate('t2', 'RESEARCH');
      expect(service.getTrend()).toBe('stable');
    });

    it('should return declining if quality goes down', () => {
      service.calculate('great thought', 'RESEARCH', { clarity: 5, depth: 5, logic: 5, breadth: 5 });
      service.calculate('mediocre thought', 'RESEARCH', { clarity: 3, depth: 3, logic: 3, breadth: 3 });
      service.calculate('bad thought', 'RESEARCH', { clarity: 1, depth: 1, logic: 1, breadth: 1 });

      expect(service.getTrend()).toBe('declining');
    });

    it('should return improving if quality goes up', () => {
      service.calculate('bad thought', 'RESEARCH', { clarity: 1, depth: 1, logic: 1, breadth: 1 });
      service.calculate('mediocre thought', 'RESEARCH', { clarity: 3, depth: 3, logic: 3, breadth: 3 });
      service.calculate('great thought', 'RESEARCH', { clarity: 5, depth: 5, logic: 5, breadth: 5 });

      expect(service.getTrend()).toBe('improving');
    });

    it('should return unstable if quality fluctuates', () => {
      // Need 5 data points, where direction changes >= 5 * 0.6 = 3 times
      service.calculate('bad', 'RESEARCH', { clarity: 1, depth: 1, logic: 1, breadth: 1 });
      service.calculate('great', 'RESEARCH', { clarity: 5, depth: 5, logic: 5, breadth: 5 });
      service.calculate('bad', 'RESEARCH', { clarity: 1, depth: 1, logic: 1, breadth: 1 });
      service.calculate('great', 'RESEARCH', { clarity: 5, depth: 5, logic: 5, breadth: 5 });
      service.calculate('bad', 'RESEARCH', { clarity: 1, depth: 1, logic: 1, breadth: 1 });

      expect(service.getTrend()).toBe('unstable');
    });
  });

  describe('updateEwma', () => {
    it('should initialize ewma on first update', () => {
      const ewma = service.updateEwma(0.8, 0.7, 0.1);
      expect(ewma).toBeGreaterThan(0);
    });

    it('should apply alpha floor based on budgetMode', () => {
      const budgetModeFast: BudgetMode = 'fast';
      const firstEwma = service.updateEwma(0.8, 0.7, 0.1, 1, 0.5, 1, budgetModeFast);
      const secondEwma = service.updateEwma(0.2, 0.2, 0.5, 1, 0.5, 1, budgetModeFast);
      expect(secondEwma).toBeLessThan(firstEwma);
    });
  });

  describe('measureClaimDensity', () => {
    it('should calculate density correctly', () => {
      const thought = 'It works 100% of the time. Always happens. Shows great results.';
      const { density, claimCount } = service.measureClaimDensity(thought);
      expect(claimCount).toBe(3); // 100%, Always, Shows
      expect(density).toBe(1); // 3 claims / 3 sentences
    });

    it('should handle zero sentences', () => {
      const { density, claimCount } = service.measureClaimDensity('   ');
      expect(density).toBe(0);
      expect(claimCount).toBe(0);
    });
  });

  describe('measureMetacognition', () => {
    it('should calculate metacognition ratio and return warning if high', () => {
      const thought = 'Let me think. I should consider this. Maybe I am wrong. Okay so let me try.';
      const { ratio, warning } = service.measureMetacognition(thought);
      expect(ratio).toBeGreaterThan(0);
      expect(warning).toContain('High metacognition');
    });

    it('should return low ratio for substantial thoughts', () => {
      const thought = 'The implementation uses a binary tree. This provides O(log n) search time.';
      const { ratio, warning } = service.measureMetacognition(thought);
      expect(ratio).toBe(0);
      expect(warning).toBeUndefined();
    });
  });

  describe('detectFallacies', () => {
    it('should detect hasty generalizations', () => {
      const thought = 'This one example always fails.';
      const warning = service.detectFallacies(thought);
      expect(warning).toContain('hasty generalization');
    });

    it('should return undefined if no fallacy', () => {
      const thought = 'The data shows a consistent trend across multiple tests.';
      expect(service.detectFallacies(thought)).toBeUndefined();
    });
  });

  describe('measureDialectical', () => {
    it('should return low score and warning if no dialectical features in SYNTHESIZE', () => {
      const thought = 'The solution is clear. We should implement it.';
      const result = service.measureDialectical(thought, 'SYNTHESIZE');
      expect(result.score).toBeLessThan(0.33);
      expect(result.warning).toContain('Low dialectical reasoning');
    });

    it('should return high score if dialectical features exist', () => {
      const thought = 'However, there is a drawback. Despite this, overall it works.';
      const result = service.measureDialectical(thought, 'VERIFY');
      expect(result.score).toBeGreaterThan(0.66);
    });
  });

  describe('measureInformationGain', () => {
    it('should measure new concepts introduced', () => {
      // Empty cumulative vocab initially
      const gain1 = service.measureInformationGain('Database uses PostgreSQL with JSONB.');
      expect(gain1).toBe(1); // all concepts new

      // Repeated concepts should yield 0 or low gain
      const gain2 = service.measureInformationGain('Database uses PostgreSQL with JSONB.');
      expect(gain2).toBe(0);
    });
  });

  describe('measureGrounding', () => {
    it('should give low score and warning for ungrounded claims', () => {
      const thought = 'Obviously this works. Everyone knows it is the best.';
      const result = service.measureGrounding(thought);
      expect(result.score).toBe(0);
      expect(result.warning).toContain('Low grounding');
    });

    it('should give high score for grounded claims', () => {
      const thought = 'According to research, this works. Based on data, it is effective.';
      const result = service.measureGrounding(thought);
      expect(result.score).toBe(1);
      expect(result.warning).toBeUndefined();
    });
  });

  describe('measureVerbosity', () => {
    it('should give warning for high verbosity', () => {
      const thought = 'It is the thing that I think we should do and it is also very good.';
      const result = service.measureVerbosity(thought);
      expect(result.warning).toContain('High verbosity');
    });
  });

  describe('measureReasoningChain', () => {
    it('should track backward references', () => {
      const result1 = service.measureReasoningChain('Initial thought', 1);
      expect(result1.score).toBe(1); // First thought is 1

      const result2 = service.measureReasoningChain('Based on this, we can conclude...', 2);
      expect(result2.score).toBe(1); // Has back ref

      const result3 = service.measureReasoningChain('A completely new topic with no connection.', 3);
      expect(result3.score).toBe(0.5); // 1 ref / 2 opportunities
    });
  });

  describe('Early stopping and overthinking', () => {
    it('checkEarlyStopping should recommend stop if converged and high quality', () => {
      service.calculate('t', 'SYNTHESIZE', { clarity: 5, depth: 5, logic: 5, breadth: 5, relevance: 5, actionability: 5 });
      service.calculate('t', 'SYNTHESIZE', { clarity: 5, depth: 5, logic: 5, breadth: 5, relevance: 5, actionability: 5 });
      service.calculate('t', 'SYNTHESIZE', { clarity: 5, depth: 5, logic: 5, breadth: 5, relevance: 5, actionability: 5 });

      service.updateEwma(1, 1, 0); // converge ewma

      const recommendation = service.checkEarlyStopping(10, 10, 0.9, 0.9);
      expect(recommendation).toContain('Early stopping recommended');
    });

    it('checkOverthinking should detect stagnation', () => {
      service.calculate('t', 'RESEARCH', { clarity: 1 });
      service.calculate('t', 'RESEARCH', { clarity: 1 });
      service.calculate('t', 'RESEARCH', { clarity: 1 });
      service.calculate('t', 'RESEARCH', { clarity: 1 });
      service.calculate('t', 'RESEARCH', { clarity: 1 }); // STAGNATION_CONSECUTIVE is 3

      // We must call it multiple times, history grows.
      service.checkOverthinking(1);
      service.checkOverthinking(2);
      service.checkOverthinking(3);
      service.checkOverthinking(4);
      const recommendation = service.checkOverthinking(5);

      expect(recommendation).toContain('Stagnation detected');
    });
  });

  describe('reset', () => {
    it('should clear all history and state', () => {
      service.calculate('t', 'RESEARCH');
      service.measureInformationGain('New Concept');

      service.reset();

      expect(service.getHistory()).toEqual([]);
      expect(service.measureInformationGain('New Concept')).toBe(1); // Vocab is cleared
    });
  });
});
