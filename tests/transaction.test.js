//const Transaction = require('../src/transaction');
import Transaction from '../src/transaction';
import UTXO from '../src/UTXO';
import { generatePassword,generateKeyPair,generatePem,
    generatePublicPem,loadPublicKey,
    loadPrivatePem,generatePrivatePemString,
    generatePublicPemString,sign,verify } from '../src/cryptography'; 
    

const Password1 = generatePassword();
const KeyPair1 = generateKeyPair();
//const PEM1 = generatePem(KeyPair1.privateKey,Password1);
//const PublicPEM1 = generatePublicPem(KeyPair1.publicKey);

const PrivPEMString1 = generatePrivatePemString(Password1);
const message = 50;
const signaturebase64 = sign(PrivPEMString1, Password1, message);

const sampleTxHash1 = 'sampleTxHash'; 
const samplePublicKey1 = 'samplePublicKey'; 
const sampleMessage1 = 'sampleMessage'; 
const UTXOObj1 = new UTXO(sampleTxHash1, samplePublicKey1, sampleMessage1);

const sampleTxHash2 = 'sampleTxHash'; 
const samplePublicKey2 = 'samplePublicKey'; 
const sampleMessage2 = 'sampleMessage'; 
const UTXOObj2 = new UTXO(sampleTxHash2, samplePublicKey2, sampleMessage2);

const sampleUTXOs = [UTXOObj1, UTXOObj2]; 
const sampleReceiverPublicKey = ['receiverPublicKey1', 'receiverPublicKey2']; 
const sampleMessages = ['message1', 'message2']; 
const sampleSignature = 'validSignature';

describe('Transaction', () => {
    describe('Transaction creation (constructor)', () => {
        // Test case 1: Valid input parameters
        it('should create a transaction with valid input parameters', () => {
            
            // Create a transaction with valid input
            const sampleTransaction = new Transaction.Transaction(sampleUTXOs, sampleReceiverPublicKey, message, signaturebase64);
            
            // Verify that the transaction was created successfully
            expect(sampleTransaction).toBeInstanceOf(Transaction);
            expect(sampleTransaction).toBeDefined(); 
            expect(typeof sampleTransaction).toBe('object'); 
        });
        
        // Test case 2: Invalid input parameters
        it('should throw an error for invalid input parameters', () => {
            // Invalid data: Empty receiver_public_keys
            const utxos = [UTXOObj1];
            const receiver_public_keys = [];
            const messages = [];
            const signature = 'validSignature';
            
            // Verify that creating a transaction with invalid input parameters throws an error
            expect(() => new Transaction.Transaction(utxos, receiver_public_keys, messages, signature)).toThrowError('Invalid input parameters');
        });
        
        // Test case 3: Invalid UTXOs
        it('should throw an error for invalid UTXOs', () => {
            // Invalid data: UTXOs with different public_key values
            const utxos = [new UTXO('publicKey1', 1), new UTXO('publicKey2', 2)];
            const receiver_public_keys = ['receiverPublicKey'];
            const messages = ['message'];
            const signature = 'validSignature';
            
            // Verify that creating a transaction with invalid UTXOs throws an error
            expect(() => new Transaction.Transaction(utxos, receiver_public_keys, messages, signature)).toThrowError('Invalid UTXOs');
        });
    });

    describe('getDict', () => {
        it('should return the correct dictionary representation', () => {
            // Sample data
            const utxos = [UTXOObj1,UTXOObj2];
            const receiver_public_keys = ['receiverPublicKey1', 'receiverPublicKey2'];
            const messages = ['message1', 'message2'];
            const signature = 'validSignature';
            
            // Create a transaction
            const transaction = new Transaction.Transaction(utxos, receiver_public_keys, messages, signature);
            
            // Calculate the expected dictionary representation
            const expectedData = {
                utxos: utxos.map(utxo => utxo.getDict()),
                receiver_public_keys,
                messages,
            };
            
            // Verify that the getDict method returns the expected dictionary
            expect(transaction.getDict()).toEqual(expectedData);
        });
    });
    
});
