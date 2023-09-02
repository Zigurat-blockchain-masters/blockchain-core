const crypto = require('crypto');

function hash(string) {
    try {
        const sha = crypto.createHash('sha3-256');
        sha.update(string, 'utf-8');
        return sha.digest('base64');
    } catch (error) {
        console.error('Error while hashing:', error.message);
        throw new Error('Failed to hash the string.');
    }
}

function stringToHex(string) {
    try {
        return Buffer.from(string, 'utf-8').toString('hex');
    } catch (error) {
        console.error('Error while converting to hex:', error.message);
        throw new Error('Failed to convert the string to hexadecimal.');
    }
}

module.exports = {
    hash,
    stringToHex,
};
