const hashing = require('../src/hashing');

describe('Hashing Module', () => {
    describe('hash function', () => {
        it('should hash a string correctly', () => {
            const hash = hashing.hash('test');
            expect(hash).toBeDefined();
            expect(typeof hash).toBe('string');
            expect(hash).toBe('NvAoWAuwLMgnKpoCD0IA40bidq5mTkXugHRVdOL1q4A=');
        });

        it('should handle empty string', () => {
            const hash = hashing.hash('');
            expect(hash).toBeDefined();
            expect(typeof hash).toBe('string');
            expect(hash).toBe('p//G+L8e12ZRwUdWoGHWYvWA/03kO0n6gtgKS4D4Q0o=');
        });

        it('should handle non-ASCII characters', () => {
            const hash = hashing.hash('你好'); // Chinese characters
            expect(hash).toBeDefined();
            expect(typeof hash).toBe('string');
            expect(hash).toBe('AQDmmnFX86gUo89olfT8zWthC5lHIksqqnqhHdDcqDM=');
        });

        it('should handle special characters', () => {
            const hash = hashing.hash('@#$%^&*()'); // Special characters
            expect(hash).toBeDefined();
            expect(typeof hash).toBe('string');
            expect(hash).toBe('5rVXR0WENeIzt2LDuCQkXpezHevhfutznLaN+UQQy4w=');
        });

        it('should handle long strings', () => {
            const longString = 'a'.repeat(1000); // A long string
            const hash = hashing.hash(longString);
            expect(hash).toBeDefined();
            expect(typeof hash).toBe('string');
            expect(hash).toBe('jzk05vehVpj+DzlrldjERAkpqPpurhQBccBotFSfv4E=');
        });
    });

    describe('stringToHex function', () => {
        it('should convert a string to hexadecimal correctly', () => {
            const hex = hashing.stringToHex('test');
            expect(hex).toBeDefined();
            expect(typeof hex).toBe('string');
            expect(hex).toBe('74657374');
        });

        it('should handle empty string', () => {
            const hex = hashing.stringToHex('');
            expect(hex).toBeDefined();
            expect(typeof hex).toBe('string');
            expect(hex).toBe('');
        });

        it('should handle non-ASCII characters', () => {
            const hex = hashing.stringToHex('你好'); // Chinese characters
            expect(hex).toBeDefined();
            expect(typeof hex).toBe('string');
            expect(hex).toBe('e4bda0e5a5bd');
        });

        it('should handle special characters', () => {
            const hex = hashing.stringToHex('@#$%^&*()'); // Special characters
            expect(hex).toBeDefined();
            expect(typeof hex).toBe('string');
            expect(hex).toBe('402324255e262a2829');
        });

        it('should handle long strings', () => {
            const longString = 'a'.repeat(1000); // A long string
            const hex = hashing.stringToHex(longString);
            expect(hex).toBeDefined();
            expect(typeof hex).toBe('string');
            expect(hex).toBe('61'.repeat(1000));
        });
    });
});
