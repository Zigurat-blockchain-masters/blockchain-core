const crypto = require('crypto');

export function hash(string) {
    const sha = crypto.createHash('sha3-256');
    sha.update(string, 'utf-8');
    return sha.digest('base64');
}

export function stringToHex(string) {
    return Buffer.from(string, 'utf-8').toString('hex');
}