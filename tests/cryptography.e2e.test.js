const cryptoModule = require('../src/cryptography'); // Replace with the actual path to your module

describe('End-to-End Cryptographic Operations', () => {

    it('should generate keyPair, sign and verify with the retrieved public and private keys', () => {
        const password = cryptoModule.generatePassword();
        const randomMessage = cryptoModule.generateRandomString(20);

        // Generate a key pair
        const keyPair = cryptoModule.generateKeyPair();
        expect(keyPair.privateKey).toBeTruthy();
        expect(keyPair.publicKey).toBeTruthy();

        // Sign the message
        const signature = cryptoModule.sign(keyPair.privateKey, password, randomMessage);
        expect(signature).toBeTruthy();

        // Verify the signature
        const isVerified = cryptoModule.verify(keyPair.publicKey, signature, randomMessage);
        expect(isVerified).toBe(true);
    });
});
