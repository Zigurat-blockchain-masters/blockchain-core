const crypto = require('crypto');

function hash(string) {
    try {
        const sha = crypto.createHash('sha3-256');
        sha.update(string, 'utf-8');
        return sha.digest('base64');
    } catch (error) {
        throw new Error(`Failed to hash the string: ${error.message}`);
    }
}

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
