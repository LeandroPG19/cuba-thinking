import { keywordSimilarity } from '../embedding.service.js';

describe('keywordSimilarity', () => {
  it('should return 1.0 for exact matches', () => {
    expect(keywordSimilarity('hello world', 'hello world')).toBe(1.0);
  });

  it('should return 0.0 for completely different strings', () => {
    expect(keywordSimilarity('hello world', 'completely different')).toBe(0.0);
  });

  it('should return 0.0 for empty or whitespace-only strings', () => {
    expect(keywordSimilarity('', 'hello')).toBe(0.0);
    expect(keywordSimilarity('hello', '   ')).toBe(0.0);
    expect(keywordSimilarity('   ', '   ')).toBe(0.0);
  });

  it('should be case-insensitive', () => {
    expect(keywordSimilarity('Hello World', 'hello world')).toBeCloseTo(1.0);
  });

  it('should ignore punctuation', () => {
    expect(keywordSimilarity('hello, world!', 'hello world')).toBeCloseTo(1.0);
  });

  it('should ignore stopwords', () => {
    // Both 'the' and 'is' are stopwords.
    // "the book is great" vs "the book is terrible"
    // Tokens: ['book', 'great'] vs ['book', 'terrible']
    // Overlap: 'book' (1)
    // Norm A: sqrt(1^2 + 1^2) = sqrt(2)
    // Norm B: sqrt(1^2 + 1^2) = sqrt(2)
    // Similarity: 1 / 2 = 0.5
    expect(keywordSimilarity('the book is great', 'the book is terrible')).toBeCloseTo(0.5);
  });

  it('should return 0.0 if all tokens are stopwords', () => {
    expect(keywordSimilarity('the is a', 'the is a')).toBe(0.0);
  });

  it('should return 0.0 if one string has no valid tokens after filtering', () => {
    expect(keywordSimilarity('hello world', 'the is a')).toBe(0.0);
  });

  it('should handle partial overlaps correctly', () => {
    // "quick brown fox" -> tokens: quick, brown, fox
    // "fast brown fox" -> tokens: fast, brown, fox
    // Overlap: brown, fox (2)
    // Norm A: sqrt(3)
    // Norm B: sqrt(3)
    // Sim: 2 / 3
    expect(keywordSimilarity('quick brown fox', 'fast brown fox')).toBeCloseTo(2 / 3);
  });
});
