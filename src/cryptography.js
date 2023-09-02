const crypto = require('crypto');

/**
 * Generates a random password for cryptographic operations.
 * @returns {string} A random password.
 * @throws {Error} Throws an error if generation fails.
 */
function generatePassword() {
    try {
        const randomness = crypto.randomBytes(128);
        return randomness.toString('base64');
    } catch (error) {
        console.error('Error while generating password:', error.message);
        throw new Error('Failed to generate a random password.');
    }
}

/**
 * Generates a pair of cryptographic keys (private and public).
 * @returns {object} An object containing private and public keys.
 * @throws {Error} Throws an error if generation fails.
 */
function generateKeyPair() {
    try {
        return crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        });
    } catch (error) {
        console.error('Error while generating key pair:', error.message);
        throw new Error('Failed to generate a key pair.');
    }
}

/**
 * Generates a PEM-encoded private key with password protection.
 * @param {object} privateKey - The private key.
 * @param {string} password - The password for encryption.
 * @returns {string} A PEM-encoded private key.
 * @throws {Error} Throws an error if generation fails.
 */
function generatePem(privateKey, password) {
    try {
        return privateKey.export({
            type: 'pkcs8',
            format: 'pem',
            passphrase: password,
        });
    } catch (error) {
        console.error('Error while generating PEM-encoded private key:', error.message);
        throw new Error('Failed to generate a PEM-encoded private key.');
    }
}

/**
 * Generates a PEM-encoded public key.
 * @param {object} publicKey - The public key.
 * @returns {string} A PEM-encoded public key.
 * @throws {Error} Throws an error if generation fails.
 */
function generatePublicPem(publicKey) {
    try {
        return publicKey.export({ type: 'spki', format: 'pem' });
    } catch (error) {
        console.error('Error while generating PEM-encoded public key:', error.message);
        throw new Error('Failed to generate a PEM-encoded public key.');
    }
}

/**
 * Loads a public key from a PEM-encoded string.
 * @param {string} publicPem - The PEM-encoded public key.
 * @returns {object} The loaded public key.
 * @throws {Error} Throws an error if loading fails.
 */
function loadPublicKey(publicPem) {
    try {
        return crypto.createPublicKey({ key: publicPem, format: 'pem' });
    } catch (error) {
        console.error('Error while loading public key:', error.message);
        throw new Error('Failed to load a public key from PEM.');
    }
}

/**
 * Loads a private key from a PEM-encoded string with password.
 * @param {string} privatePem - The PEM-encoded private key.
 * @param {string} password - The password used for encryption.
 * @returns {object} The loaded private key.
 * @throws {Error} Throws an error if loading fails.
 */
function loadPrivatePem(privatePem, password) {
    try {
        return crypto.createPrivateKey({ key: privatePem, format: 'pem', passphrase: password });
    } catch (error) {
        console.error('Error while loading private key:', error.message);
        throw new Error('Failed to load a private key from PEM with password.');
    }
}

/**
 * Generates a private key, PEM-encodes it with password, and returns as a string.
 * @param {string} passwordString - The password for encryption.
 * @returns {string} A PEM-encoded private key as a string.
 * @throws {Error} Throws an error if generation fails.
 */
function generatePrivatePemString(passwordString) {
    try {
        const privateKey = generateKeyPair().privateKey;
        const pem = generatePem(privateKey, passwordString);
        return pem.toString();
    } catch (error) {
        console.error('Error while generating private PEM string:', error.message);
        throw new Error('Failed to generate a PEM-encoded private key string.');
    }
}

/**
 * Generates a PEM-encoded public key from a private key string and password.
 * @param {string} privatePemString - The PEM-encoded private key as a string.
 * @param {string} password - The password for encryption.
 * @returns {string} A PEM-encoded public key as a string.
 * @throws {Error} Throws an error if generation fails.
 */
function generatePublicPemString(privatePemString, password) {
    try {
        const privateKey = loadPrivatePem(privatePemString, password);
        const publicKey = privateKey.publicKey;
        return generatePublicPem(publicKey).toString();
    } catch (error) {
        console.error('Error while generating public PEM string:', error.message);
        throw new Error('Failed to generate a PEM-encoded public key string.');
    }
}

/**
 * Signs a message using a private key and password, returning the signature as a base64-encoded string.
 * @param {string} privatePemString - The PEM-encoded private key as a string.
 * @param {string} password - The password used for decryption.
 * @param {string} message - The message to be signed.
 * @returns {string} The base64-encoded signature.
 * @throws {Error} Throws an error if signing fails.
 */
function sign(privatePemString, password, message) {
    try {
        const privateKey = loadPrivatePem(privatePemString, password);
        const signature = privateKey.sign(message, 'base64');
        return signature.toString('base64');
    } catch (error) {
        console.error('Error while signing:', error.message);
        throw new Error('Failed to sign the message.');
    }
}

/**
 * Verifies the authenticity of a signature for a given message using a public key and the original message.
 * @param {string} publicPemString - The PEM-encoded public key as a string.
 * @param {string} signature - The base64-encoded signature to be verified.
 * @param {string} message - The original message.
 * @returns {boolean} True if the signature is valid, false otherwise.
 * @throws {Error} Throws an error if verification fails.
 */
function verify(publicPemString, signature, message) {
    try {
        const publicKey = loadPublicKey(publicPemString);
        return publicKey.verify(message, signature, 'base64');
    } catch (error) {
        console.error('Error while verifying:', error.message);
        throw new Error('Failed to verify the signature.');
    }
}

module.exports = {
    generatePassword,
    generateKeyPair,
    generatePem,
    generatePublicPem,
    loadPublicKey,
    loadPrivatePem,
    generatePrivatePemString,
    generatePublicPemString,
    sign,
    verify,
};