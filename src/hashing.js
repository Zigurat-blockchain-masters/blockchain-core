const crypto = require('crypto');

/**
 * Hashes a string using SHA3-256 algorithm and returns the result in base64 encoding.
 * @param {string} string - The string to be hashed.
 * @returns {string} The base64-encoded hash of the input string.
 * @throws {Error} Throws an error if hashing fails.
 */
function hash(string) {
    try {
        const sha = crypto.createHash('sha3-256');
        sha.update(string, 'utf-8');
        return sha.digest('base64');
    } catch (error) {
        throw new Error(`Failed to hash the string: ${error.message}`);
    }
}

/**
 * Converts a string to its hexadecimal representation.
 * @param {string} string - The string to be converted.
 * @returns {string} The hexadecimal representation of the input string.
 * @throws {Error} Throws an error if conversion fails.
 */
function stringToHex(string) {
    try {
        return Buffer.from(string, 'utf-8').toString('hex');
    } catch (error) {
        throw new Error(`Failed to convert the string to hexadecimal: ${error.message}`);
    }
}

module.exports = {
    hash,
    stringToHex,
};
