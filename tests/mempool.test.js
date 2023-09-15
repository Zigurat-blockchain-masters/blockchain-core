import Mempool from '../src/mempool';
import getMempool from '../src/mempool';
import Transaction from "../src/transaction";

jest.mock('../src/transaction'); // Replace './Transaction' with the actual path to your Transaction module

// Create a custom mock implementation of the Transaction class
const mockTransaction = jest.fn().mockImplementation((utxos, receiver_public_keys, messages, signature) => {
    return new Transaction(utxos, receiver_public_keys, messages, signature);
});

describe('Mempool', () => {
    let mempool;

    beforeEach(() => {
        mempool = new Mempool();

        // Assign the mockTransaction to the Transaction class
        jest.mock('../src/transaction', () => {
            return {
                Transaction: mockTransaction,
                isValid: jest.fn().mockReturnValue(true), // Mock the isValid method to return true
            };
        });
    });

    it('should initiate', () => {
        expect(mempool.tx).toBeDefined();
    });

    it('should insert a valid transaction', () => {
        const tx = Transaction.Transaction.prototype;

        mempool.insertTransaction(tx);

        expect(mempool.tx).toContain(tx);
    });

    it('should throw an error if transaction is invalid', () => {
        const tx = {};

        expect(() => mempool.insertTransaction(tx)).toThrowError('Invalid transaction');
    });

    describe('getMempool', () => {
        let mempool;

        // Define a beforeEach function to reset the mempool before each test
        beforeEach(() => {
            // Reset the mempool to null before each test
            mempool = new Mempool();
        });

        it('should return an instance of Mempool when mempool is null', () => {
            const result = new getMempool();
            expect(result).toBeInstanceOf(Mempool);
        });

        it('should return the same mempool instance if it is not null', () => {
            // Create a mock Mempool instance
            const mockMempool = new Mempool();

            // Set the mempool to the mock instance
            mempool = mockMempool;

            const result = new getMempool();
            expect(result).toStrictEqual(mockMempool);
        });

        it('should return a non-null mempool after the first call', () => {
            const result = new getMempool();
            expect(result).not.toBeNull();
        });

        it('should return the same mempool instance on subsequent calls', () => {
            const result1 = new getMempool();
            const result2 = new getMempool();
            expect(result1).toStrictEqual(result2);
        });
    });
});
