//import { expect } from 'chai';
import Block from '../src/block'; 
const hashing = require('../src/hashing');

const prevHashBlock = 'hash_previous_block'; 
const transactions = 'transactions'; 
const nonce = 'nonce'; 
const blockObj = new Block(prevHashBlock, transactions, nonce); 

describe('Block', () => { 
    describe('Block creation (constructor)', () => { 
        it('should create a block object', () => { 
            expect(blockObj).toBeDefined(); 
            expect(typeof blockObj).toBe('object'); 
        }); 

        it('should create a block when prev. hash is empty', () => { 
            const block = new Block('', transactions, nonce); 
            expect(block).toBeDefined(); 
            expect(typeof block).toBe('object'); 
        }); 
        
        it('should create a block when transactions is empty', () => { 
            const block = new Block(prevHashBlock, '', nonce); 
            expect(block).toBeDefined(); 
            expect(typeof block).toBe('object'); 
        }); 

        it('should create a block when nonce is empty', () => { 
            const block = new Block(prevHashBlock, transactions, ''); 
            expect(block).toBeDefined(); 
            expect(typeof block).toBe('object'); 
        });
        
        it('should return error if previous hash block is incorrect', () => { 
            // TODO - implement this test when constructor includes error handling for prev has block check
        });

        it('should return error if transactions are incorrect', () => { 
            // TODO - implement this test when constructor includes error handling for transaction check
        });

        it('should return error if nonce is incorrect', () => { 
            // TODO - implement this test when constructor includes error handling for nonce check
        });
    });

    describe('getHash function', () => { 
        it('should calculate the correct hash for a block', () => {
            // Create a sample block
            const sampleTransactions = 'sampleTransaction';
            const samplePreviousHash = 'previousHash';
            const sampleNonce = 123;

            const block = new Block(samplePreviousHash, sampleTransactions, sampleNonce);

            // get its Dictionary description
            const expectedData = block.getDict();
            const expectedJsonData = JSON.stringify(expectedData);
            const expectedHash = hashing.hash(expectedJsonData);

            // Verify that the getHash method returns the expected hash
            expect(block.getHash()).toBeDefined(); 
            expect(typeof block.getHash()).toBe('string');
            expect(block.getHash()).toBe(expectedHash);
        });
    });
    
    describe('getDict function', () => { 
        it('should return the correct dictionary representation of a block', () => {
            // Create a sample block
            const sampleTransactions = ['sampleTransaction0','sampleTransaction1'];
            const samplePreviousHash = 'previousHash';
            const sampleNonce = 123;

            const block = new Block(samplePreviousHash, sampleTransactions, sampleNonce);
            

            // Build the expected dictionary representation
            const expectedData = {
                "transaction_hashes": [hashing.hash(sampleTransactions[0]),hashing.hash(sampleTransactions[1])],
                "hash_previous_block": samplePreviousHash,
                "nonce": sampleNonce,
            };

            // Verify that the getDict method returns the expected dictionary
            expect(block.getDict()).toBeDefined(); 
            expect(typeof block.getDict()).toBe('object');
            expect(block.getDict()).toEqual(expectedData);
        });
    });
}); 
// Block // getHash function // should return hash // should return error