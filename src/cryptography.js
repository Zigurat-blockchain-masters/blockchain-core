const crypto = require('crypto');

/**
 * Generates a pair of cryptographic keys (private and public).
 * @returns {Object} An object containing private and public keys.
 * @throws {Error} Throws an error if generation fails.
 */
function generateKeyPair() {
    try {
        return crypto.generateKeyPairSync('rsa', {
            modulusLength: 8192,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        });
    } catch (error) {
        throw new Error(`Error while generating key pair: ${error.message}`);
    }
}

/**
 * Loads a private key from a PEM-encoded string with a password.
 * @param {string} privatePem - The PEM-encoded private key as a string.
 * @param {string} password - The password for decryption.
 * @returns {KeyObject} The loaded private key as a string.
 * @throws {Error} Throws an error if loading fails.
 */
function loadPrivatePem(privatePem, password) {
    try {
        return crypto.createPrivateKey({ key: privatePem, format: 'pem', type: 'pkcs8', passphrase: password });
    } catch (error) {
        throw new Error(`Error while loading private key: ${error.message}`);
    }
}


/**
 * Signs a message using a private key and password, returning the signature as a base64-encoded string.
 * @param {string} privatePemString - The PEM-encoded private key as a string.
 * @param {string} password - The password for decryption.
 * @param {string} message - The message to be signed.
 * @returns {string} The base64-encoded signature.
 * @throws {Error} Throws an error if signing fails.
 */
function sign(privatePemString, password, message) {
    try {
        const privateKey = privatePemString; // No additional processing required for the private key
        const sign = crypto.createSign('RSA-SHA256');
        sign.update(message);
        return sign.sign(privateKey, 'base64');
    } catch (error) {
        throw new Error(`Error while signing: ${error.message}`);
    }
}

/**
 * Verifies the authenticity of a signature for a given message using a public key and the original message.
    * @param {string} publicPemString - The PEM-encoded public key as a string.
 * @param {string} signature - The base64-encoded signature.
 * @param {string} message - The original message.
 * @returns {boolean} True if the signature is valid, false otherwise.
 * @throws {Error} Throws an error if verification fails.
 * @throws {Error} Throws an error if the public key is invalid.
 * @throws {Error} Throws an error if the signature is invalid.
 * @throws {Error} Throws an error if the message is invalid.
 * @throws {Error} Throws an error if the signature is not valid for the message.
 * @throws {Error} Throws an error if the signature is not valid for the public key.
 * @throws {Error} Throws an error if the signature is not valid for the algorithm.
 * @throws {Error} Throws an error if the signature is not valid for the key type.
 * @throws {Error} Throws an error if the signature is not valid for the key size.
 * @throws {Error} Throws an error if the signature is not valid for the hash function.
 * @throws {Error} Throws an error if the signature is not valid for the padding scheme.
 */
function verify(publicPemString, signature, message) {
    try {
        const publicKey = publicPemString; // No additional processing required for the public key
        const verify = crypto.createVerify('RSA-SHA256');
        verify.update(message);
        return verify.verify(publicKey, signature, 'base64');
    } catch (error) {
        throw new Error(`Error while verifying: ${error.message}`);
    }
}

module.exports = {
    generateKeyPair,
    loadPrivatePem,
    sign,
    verify,
};