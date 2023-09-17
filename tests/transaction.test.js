//const Transaction = require('../src/transaction');
import {Transaction,UnsignedTransaction,Coinbase} from '../src/transaction';
import UTXO from '../src/UTXO';
//import { generatePassword,generateKeyPair,generatePem,
//    generatePublicPem,loadPublicKey,
//    loadPrivatePem,generatePrivatePemString,
//    generatePublicPemString,sign,verify } from '../src/cryptography'; 
const hashing = require('../src/hashing'); 
const cryptoModule = require('../src/cryptography');
    

const Password1 = cryptoModule.generatePassword();
const KeyPair1 = cryptoModule.generateKeyPair();
const publicKey1 = KeyPair1.publicKey;
const privateKey1 = KeyPair1.privateKey;

//const PEM1 = generatePem(KeyPair1.privateKey,Password1);
//const PublicPEM1 = generatePublicPem(KeyPair1.publicKey);

//const PrivPEMString1 = generatePrivatePemString(Password1);
//const PrivPEMString1 = 'PPS1';
const message = '50';
//const signaturebase64 = sign(PrivPEMString1, Password1, message);
//const signaturebase64 = 'signature';
const signaturebase64 = cryptoModule.sign(privateKey1, Password1, message);

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
            const sampleTransaction = new Transaction(sampleUTXOs, sampleReceiverPublicKey, message, signaturebase64);
            
            // Verify that the transaction was created successfully
            expect(sampleTransaction).toBeInstanceOf(Transaction.Transaction);
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
            expect(() => new Transaction(utxos, receiver_public_keys, messages, signature)).toThrowError('Invalid input parameters');
        });
        
        // Test case 3: Invalid UTXOs
        it('should throw an error for invalid UTXOs', () => {
            // Invalid data: UTXOs with different public_key values
            const utxos = [new UTXO('publicKey1', 1), new UTXO('publicKey2', 2)];
            const receiver_public_keys = ['receiverPublicKey'];
            const messages = ['message'];
            const signature = 'validSignature';
            
            // Verify that creating a transaction with invalid UTXOs throws an error
            expect(() => new Transaction(utxos, receiver_public_keys, messages, signature)).toThrowError('Invalid UTXOs');
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
            const transaction = new Transaction(utxos, receiver_public_keys, messages, signature);
            
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

    describe('getJson', () => {
        it('should return the correct JSON representation', () => {
            // Sample data
            const utxos = [UTXOObj1,UTXOObj2];
            const receiver_public_keys = ['receiverPublicKey1', 'receiverPublicKey2'];
            const messages = ['message1', 'message2'];
            const signature = 'validSignature';
    
            // Create a transaction
            const transaction = new Transaction(utxos, receiver_public_keys, messages, signature);
    
            // Calculate the expected JSON representation
            const expectedJson = JSON.stringify(transaction.getDict());
    
            // Verify that the getJson method returns the expected JSON
            expect(transaction.getJson()).toBe(expectedJson);
        });
    });

    describe('getHash', () => {
        it('should return the correct hash', () => {
            // Sample data
            const utxos = [UTXOObj1,UTXOObj2];
            const receiver_public_keys = ['receiverPublicKey1', 'receiverPublicKey2'];
            const messages = ['message1', 'message2'];
            const signature = 'validSignature';
    
            // Create a transaction
            const transaction = new Transaction(utxos, receiver_public_keys, messages, signature);
    
            // Calculate the expected hash
            const expectedHash = _hash(transaction.getJson()); // Replace with your actual hash function
    
            // Verify that the getHash method returns the expected hash
            expect(transaction.getHash()).toBe(expectedHash);
        });
    });

    describe('getFullJson', () => {
        it('should return the correct JSON representation with signature', () => {
            // Sample data
            const utxos = [UTXOObj1,UTXOObj2];
            const receiver_public_keys = ['receiverPublicKey1', 'receiverPublicKey2'];
            const messages = ['message1', 'message2'];
            const signature = 'validSignature';
    
            // Create a transaction
            const transaction = new Transaction(utxos, receiver_public_keys, messages, signature);
    
            // Calculate the expected dictionary representation
            const expectedDict = transaction.getDict();
            expectedDict.signature = signature;
    
            // Calculate the expected JSON representation with signature
            const expectedJson = JSON.stringify(expectedDict);
    
            // Verify that the getFullJson method returns the expected JSON
            expect(transaction.getFullJson()).toBe(expectedJson);
        });
    });

    describe('isValid', () => {
        it('should return true for a valid transaction', () => {
            // Sample data for a valid transaction
            const utxos = [UTXOObj1,UTXOObj2];
            const receiver_public_keys = ['receiverPublicKey1', 'receiverPublicKey2'];
            const messages = [10, 20]; 
            const signature = 'validSignature';
    
            // Create a transaction
            const transaction = new Transaction(utxos, receiver_public_keys, messages, signature);
    
            // Verify that the isValid method returns true for a valid transaction
            expect(transaction.isValid()).toBe(true);
        });
    
        it('should return false for an invalid transaction', () => {
            // Sample data for an invalid transaction (e.g., incorrect signature or amount)
            const utxos = [/* Provide valid UTXO instances here */];
            const receiver_public_keys = ['receiverPublicKey1', 'receiverPublicKey2'];
            const messages = [10, 30]; 
            const signature = 'invalidSignature';
    
            // Create a transaction
            const transaction = new Transaction(utxos, receiver_public_keys, messages, signature);
    
            // Verify that the isValid method returns false for an invalid transaction
            expect(transaction.isValid()).toBe(false);
        });
    });
    
});

describe('Unsigned Transaction', () => {
    describe('Unsigned Transaction creation (constructor)', () => {
        // Test case 1: Valid input parameters
        it('should create a transaction with valid input parameters', () => {
            
            // Create a transaction with valid input
            const sampleTransaction = new UnsignedTransaction(sampleUTXOs, sampleReceiverPublicKey, message, signaturebase64);
            
            // Verify that the transaction was created successfully
            expect(sampleTransaction).toBeInstanceOf(Transaction.UnsignedTransaction);
            expect(sampleTransaction).toBeDefined(); 
            expect(typeof sampleTransaction).toBe('object'); 
        });
        
        // Test case 2: Invalid input parameters
        it('should throw an error for invalid input parameters', () => {
            // Invalid data: Empty receiver_public_keys
            const utxos = [UTXOObj1];
            const receiver_public_keys = [];
            const messages = [];
            
            // Verify that creating a transaction with invalid input parameters throws an error
            expect(() => new UnsignedTransaction(utxos, receiver_public_keys, messages)).toThrowError('Invalid input parameters');
        });
        
        // Test case 3: Invalid UTXOs
        it('should throw an error for invalid UTXOs', () => {
            // Invalid data: UTXOs with different public_key values
            const utxos = [new UTXO('publicKey1', 1), new UTXO('publicKey2', 2)];
            const receiver_public_keys = ['receiverPublicKey'];
            const messages = ['message'];
            const signature = 'validSignature';
            
            // Verify that creating a transaction with invalid UTXOs throws an error
            expect(() => new UnsignedTransaction(utxos, receiver_public_keys, messages)).toThrowError('Invalid UTXOs');
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
            const transaction = new UnsignedTransaction(utxos, receiver_public_keys, messages);
            
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

describe('Coinbase Transaction', () => {
    // Sample data
    const receiver = 'receiverPublicKey';
    const coinbase = new Coinbase(receiver);

    describe('Coinbase - Constructor', () => {
        it('should initialize Coinbase with the provided receiver', () => {
    
            // Verify that the Coinbase instance was created with the provided receiver
            expect(coinbase.receiver_public_keys).toEqual([receiver]);
            expect(coinbase.messages).toEqual([50]);
        });
    });

    describe('Coinbase - getHash', () => {
        it('should return the correct hash', () => {
    
            // Calculate the expected hash
            const expectedHash = hashing.hash(JSON.stringify({
                "receiver_public_keys": [receiver],
                "messages": [50],
            }));
    
            // Verify that the getHash method returns the expected hash
            expect(coinbase.getHash()).toBe(expectedHash);
        });
    });

    describe('Coinbase - getDict', () => {
        it('should return the correct dictionary representation', () => {
    
            // Calculate the expected dictionary representation
            const expectedDict = {
                "receiver_public_keys": [receiver],
                "messages": [50],
            };
    
            // Verify that the getDict method returns the expected dictionary
            expect(coinbase.getDict()).toEqual(expectedDict);
        });
    });

    describe('Coinbase - getJson', () => {
        it('should return the correct JSON representation', () => {

            // Calculate the expected JSON representation
            const expectedJson = JSON.stringify({
                "receiver_public_keys": [receiver],
                "messages": [50],
            });
    
            // Verify that the getJson method returns the expected JSON
            expect(coinbase.getJson()).toBe(expectedJson);
        });
    });

    describe('Coinbase - isValid', () => {
        it('should always return true for Coinbase transactions', () => {

            // Verify that the isValid method always returns true for Coinbase transactions
            expect(coinbase.isValid()).toBe(true);
        });
    });
});