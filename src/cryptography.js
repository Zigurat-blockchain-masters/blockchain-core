const crypto = require('crypto');

function generatePassword() {
    const randomness = crypto.randomBytes(128);
    return randomness.toString('base64');
}

function generateKeyPair() {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });
}

function generatePublicPemString(passwordString) {
    const keyPair = generateKeyPair();
    const publicKey = keyPair.publicKey;
    const publicPem = generatePublicPem(publicKey);
    return publicPem.toString();
}

function generatePem(privateKey, password) {
    return privateKey.export({
        type: 'pkcs8',
        format: 'pem',
        passphrase: password,
    });
}

function generatePublicPem(publicKey) {
    return publicKey.export({ type: 'spki', format: 'pem' });
}

function loadPublicKey(publicPem) {
    return crypto.createPublicKey({ key: publicPem, format: 'pem' });
}

function loadPrivatePem(privatePem, password) {
    return crypto.createPrivateKey({ key: privatePem, format: 'pem', passphrase: password });
}

function generatePrivatePemString(passwordString) {
    const privateKey = generateKeyPair().privateKey;
    const pem = generatePem(privateKey, passwordString);
    return pem.toString();
}

function sign(privatePemString, password, message) {
    const privateKey = loadPrivatePem(privatePemString, password);
    const sign = crypto.createSign('RSA-SHA3-256');
    sign.update(message, 'utf-8');
    return sign.sign(privateKey, 'base64');
}

function verify(publicPemString, signature, message) {
    const publicKey = loadPublicKey(publicPemString);
    const verify = crypto.createVerify('RSA-SHA3-256');
    verify.update(message, 'utf-8');
    return verify.verify(publicKey, signature, 'base64');
}

module.exports = {
    generatePassword,
    generatePrivatePemString,
    sign,
    verify,
};
