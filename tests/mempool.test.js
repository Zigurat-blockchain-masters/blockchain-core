const { Mempool } = require('../src/mempool.js');

describe('Mempool Module', () => {
    beforeEach(() => {
        mempool = new Mempool();
    });

    afterEach(() => {
        mempool = null;
    });

    // Test case 1: Insert a valid transaction
    it('should insert a valid transaction into the mempool', () => {
        const validTransaction = {
            isValid: () => true, // A mock for isValid that returns true
        };

        mempool.insertTransaction(validTransaction);

        expect(mempool.tx).toContain(validTransaction);
    });

    // Test case 2: Insert an invalid transaction
    it('should throw an error when inserting an invalid transaction', () => {
        const invalidTransaction = {
            isValid: () => false
        };

        expect(() => mempool.insertTransaction(invalidTransaction)).toThrowError('Invalid transaction');
        expect(mempool.tx).toHaveLength(0);
    });
});
