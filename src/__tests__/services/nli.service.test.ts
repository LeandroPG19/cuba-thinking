import { jest } from '@jest/globals';
import { NLIService } from '../../services/nli.service.js';
import * as loader from '../../services/transformers-loader.js';

// Mock the transformers loader
jest.mock('../../services/transformers-loader.js', () => ({
  loadTransformersModule: jest.fn()
}));

const mockLoadTransformersModule = loader.loadTransformersModule as jest.MockedFunction<typeof loader.loadTransformersModule>;

describe('NLIService', () => {
  let service: NLIService;
  let mockPipeline: any;
  let mockClassifier: any;

  beforeEach(() => {
    // Reset state before each test
    service = new NLIService();
    mockClassifier = jest.fn();
    mockPipeline = jest.fn().mockImplementation(async () => mockClassifier);

    mockLoadTransformersModule.mockReset();

    // We need to reset the internal pipeline of nli.service since it's a module level variable
    // but we can't do it directly easily. Instead, we mock what loadTransformersModule returns.
    // The loadTransformersModule returns an object with a pipeline property.
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('ensureReady', () => {
    it('returns false when transformers module fails to load', async () => {
      mockLoadTransformersModule.mockResolvedValue(null);

      const result = await service.ensureReady();

      expect(result).toBe(false);
      expect(service.isAvailable).toBe(false);
    });

    it('returns false when transformers module loads but pipeline is missing', async () => {
      mockLoadTransformersModule.mockResolvedValue({}); // No pipeline

      const result = await service.ensureReady();

      expect(result).toBe(false);
      expect(service.isAvailable).toBe(false);
    });

    it('returns true and initializes classifier when pipeline is present', async () => {
      mockLoadTransformersModule.mockResolvedValue({
        pipeline: mockPipeline
      } as any);

      const result = await service.ensureReady();

      expect(result).toBe(true);
      expect(service.isAvailable).toBe(true);
      expect(mockPipeline).toHaveBeenCalledWith(
        'text-classification',
        'Xenova/nli-deberta-v3-xsmall',
        { dtype: 'q8', top_k: 3 }
      );
    });

    it('returns false if pipeline throws during initialization', async () => {
      mockPipeline.mockRejectedValue(new Error('Model load failed'));
      mockLoadTransformersModule.mockResolvedValue({
        pipeline: mockPipeline
      } as any);

      const result = await service.ensureReady();

      expect(result).toBe(false);
      expect(service.isAvailable).toBe(false);
    });

    it('returns true immediately on subsequent calls', async () => {
      mockLoadTransformersModule.mockResolvedValue({
        pipeline: mockPipeline
      } as any);

      await service.ensureReady();
      expect(service.isAvailable).toBe(true);

      mockLoadTransformersModule.mockClear();
      mockPipeline.mockClear();

      const result2 = await service.ensureReady();
      expect(result2).toBe(true);
      expect(mockLoadTransformersModule).not.toHaveBeenCalled();
      expect(mockPipeline).not.toHaveBeenCalled();
    });
  });

  describe('classify', () => {
    beforeEach(async () => {
      mockLoadTransformersModule.mockResolvedValue({
        pipeline: mockPipeline
      } as any);
    });

    it('returns null if service is not ready', async () => {
      const result = await service.classify('premise', 'hypothesis');
      expect(result).toBeNull();
    });

    it('processes dominant contradiction correctly', async () => {
      mockClassifier.mockResolvedValue([
        { label: 'contradiction', score: 0.956 },
        { label: 'neutral', score: 0.04 },
        { label: 'entailment', score: 0.004 }
      ]);
      await service.ensureReady();

      const result = await service.classify('premise', 'hypothesis');

      expect(result).toEqual({
        label: 'contradiction',
        contradictionScore: 0.96 // Rounded to 2 decimals
      });
      expect(mockClassifier).toHaveBeenCalledWith('premise [SEP] hypothesis');
    });

    it('processes dominant entailment correctly', async () => {
      mockClassifier.mockResolvedValue([
        { label: 'entailment', score: 0.85 },
        { label: 'neutral', score: 0.10 },
        { label: 'contradiction', score: 0.05 }
      ]);
      await service.ensureReady();

      const result = await service.classify('premise', 'hypothesis');

      expect(result).toEqual({
        label: 'entailment',
        contradictionScore: 0.05
      });
    });

    it('processes dominant neutral correctly (uppercase labels)', async () => {
      mockClassifier.mockResolvedValue([
        { label: 'NEUTRAL', score: 0.70 },
        { label: 'CONTRADICTION', score: 0.20 },
        { label: 'ENTAILMENT', score: 0.10 }
      ]);
      await service.ensureReady();

      const result = await service.classify('premise', 'hypothesis');

      expect(result).toEqual({
        label: 'neutral',
        contradictionScore: 0.20
      });
    });

    it('ignores unknown labels', async () => {
      mockClassifier.mockResolvedValue([
        { label: 'UNKNOWN', score: 0.90 },
        { label: 'contradiction', score: 0.10 }
      ]);
      await service.ensureReady();

      const result = await service.classify('premise', 'hypothesis');

      expect(result).toEqual({
        label: 'contradiction', // dominant out of known ones
        contradictionScore: 0.10
      });
    });

    it('returns null when classifier throws an error', async () => {
      mockClassifier.mockRejectedValue(new Error('Inference error'));
      await service.ensureReady();

      const result = await service.classify('premise', 'hypothesis');

      expect(result).toBeNull();
    });
  });

  describe('reset', () => {
    it('is a no-op but does not throw', () => {
      expect(() => service.reset()).not.toThrow();
    });
  });
});
