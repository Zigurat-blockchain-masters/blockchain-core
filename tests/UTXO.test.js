import UTXO from '../src/UTXO'; 
const hashing = require('../src/hashing');

const sampleTxHash = 'sampleTxHash'; 
const samplePublicKey = 'samplePublicKey'; 
const sampleMessage = 'sampleMessage'; 
const UTXOObj = new UTXO(sampleTxHash, samplePublicKey, sampleMessage); 

describe('UTXO', () => { 
    describe('UTXO creation (constructor)', () => { 
        it('should create a UTXO object', () => { 
            expect(UTXOObj).toBeDefined(); 
            expect(typeof UTXOObj).toBe('object'); 
        }); 

        it('should create a UTXO when TX hash is empty', () => { 
            const UTXOObj = new UTXO('', samplePublicKey, sampleMessage); 
            expect(UTXOObj).toBeDefined(); 
            expect(typeof UTXOObj).toBe('object'); 
        }); 
        
        it('should create a UTXO when public key is empty', () => { 
            const UTXOObj = new UTXO(sampleTxHash, '', sampleMessage); 
            expect(UTXOObj).toBeDefined(); 
            expect(typeof UTXOObj).toBe('object'); 
        }); 

        it('should create a UTXO when message is empty', () => { 
            const UTXOObj = new UTXO(sampleTxHash, samplePublicKey, ''); 
            expect(UTXOObj).toBeDefined(); 
            expect(typeof UTXOObj).toBe('object'); 
        });
        
        it('should return an error if transaction hash is incorrect', () => { 
            // TODO - implement this test when constructor includes error handling for transaction hash check
        });

        it('should return an error if public key are incorrect', () => { 
            // TODO - implement this test when constructor includes error handling for publick key check
        });

        it('should return an error if message is incorrect', () => { 
            // TODO - implement this test when constructor includes error handling for message check
        });
    });

    describe('getHash function', () => {
        it('should calculate the correct hash of a UTXO', () => {

            // Create data that is expected from applying getHash to UTXO object
            const expectedData = hashing.hash(JSON.stringify(UTXOObj));
            
            //Verify that the getHash method returns the expected hash
            expect(UTXOObj.getHash()).toBeDefined(); 
            expect(typeof UTXOObj.getHash()).toBe('string');
            expect(UTXOObj.getHash()).toEqual(expectedData);
        });
    });

}); 