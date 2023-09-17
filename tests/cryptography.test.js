const cryptoModule = require('../src/cryptography');

describe('Crypto Module', () => {
    describe('generatePassword function', () => {
        it('should generate a random password', () => {
            const password = cryptoModule.generatePassword();
            expect(password).toBeDefined();
            expect(typeof password).toBe('string');
            expect(password.length).toBeGreaterThan(0);
        });

        it('should handle errors when generating a password', () => {
            // Mock crypto.randomBytes to throw an error
            jest.spyOn(cryptoModule.crypto, 'randomBytes').mockImplementationOnce(() => {
                throw new Error('Mocked randomBytes error');
            });

            expect(() => cryptoModule.generatePassword()).toThrowError('Error while generating password');
        });
    });

    describe('generateRandomString function', () => {
        it('should generate a random string of the specified length', () => {
            const length = 16;
            const randomString = cryptoModule.generateRandomString(length);
            expect(randomString).toBeDefined();
            expect(typeof randomString).toBe('string');
            expect(randomString.length).toBe(length * 2); // Each byte becomes two hex characters
        });

        it('should handle errors when generating a random string', () => {
            // Mock crypto.randomBytes to throw an error
            jest.spyOn(cryptoModule.crypto, 'randomBytes').mockImplementationOnce(() => {
                throw new Error('Mocked randomBytes error');
            });

            expect(() => cryptoModule.generateRandomString(16)).toThrowError('Error while generating random string');
        });
    });

    describe('generateKeyPair function', () => {
        it('should generate a valid key pair', () => {
            const keyPair = cryptoModule.generateKeyPair();
            expect(keyPair).toBeDefined();
            expect(keyPair.privateKey).toBeDefined();
            expect(keyPair.publicKey).toBeDefined();
        });

        it('should handle errors when generating a key pair', () => {
            expect(() => cryptoModule.generateKeyPair()).toThrowError('Error while generating key pair');
        });
    });

    describe('loadPrivatePem function', () => {
        it('should load a private key from a PEM-encoded string with a password', () => {
            const password = cryptoModule.generatePassword();
            const privatePem = cryptoModule.generateKeyPair().privateKey;
            const privateKey = cryptoModule.loadPrivatePem(privatePem, password);
            expect(privateKey).toBeDefined();
        });

        it('should handle errors when loading a private key', () => {
            const password = cryptoModule.generatePassword();
            const privatePem = 'privateKey';

            expect(() => cryptoModule.loadPrivatePem(privatePem, password)).toThrowError('Error while loading private key');
        });
    });

    describe('sign and verify functions', () => {
        it('should sign and verify a message correctly', () => {
            const password = cryptoModule.generatePassword();
            const keyPair = cryptoModule.generateKeyPair();
            const privatePem = keyPair.privateKey;
            const publicPem = keyPair.publicKey
            const message = 'Sign me now';

            // Sign the message
            const signature = cryptoModule.sign(privatePem, password, message);

            // Verify the signature
            const isVerified = cryptoModule.verify(publicPem, signature, message);
            expect(isVerified).toBe(true);
        });

        it('should handle invalid signature verification', () => {
            const password = cryptoModule.generatePassword();
            const keyPair = cryptoModule.generateKeyPair();
            const privatePem = keyPair.privateKey;
            const publicPem = keyPair.publicKey
            const message1 = 'Sign me now';
            const message2 = 'Modified message!';

            // Sign the original message
            const signature = cryptoModule.sign(privatePem, password, message1);

            // Verify the signature with a different message
            const isVerified = cryptoModule.verify(publicPem, signature, message2);
            expect(isVerified).toBe(false);
        });

        it('should handle errors when signing', () => {
            const password = cryptoModule.generatePassword();
            const keyPair = cryptoModule.generateKeyPair();
            const privatePem = keyPair.privateKey;
            const message = 'Sign me now';

            // Mock crypto.createSign to throw an error
            jest.spyOn(cryptoModule.crypto, 'createSign').mockImplementationOnce(() => {
                throw new Error('Mocked createSign error');
            });

            expect(() => cryptoModule.sign(privatePem, password, message)).toThrowError('Error while signing');
        });

        it('should handle errors when verifying', () => {
            const keyPair = cryptoModule.generateKeyPair();
            const publicPem = keyPair.publicKey
            const signature = 'your_invalid_signature_here';
            const message = 'Sign me now';

            // Mock crypto.createVerify to throw an error
            jest.spyOn(cryptoModule.crypto, 'createVerify').mockImplementationOnce(() => {
                throw new Error('Mock error');
            });

            expect(() => cryptoModule.verify(publicPem, signature, message)).toThrowError('Error while verifying');
        });
    });
});
