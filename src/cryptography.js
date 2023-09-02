const crypto = require('crypto');

function generatePassword() {
    try {
        const randomness = crypto.randomBytes(128);
        return randomness.toString('base64');
    } catch (error) {
        console.error('Error while generating password:', error.message);
        throw new Error('Failed to generate a random password.');
    }
}

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

function generatePublicPem(publicKey) {
    try {
        return publicKey.export({ type: 'spki', format: 'pem' });
    } catch (error) {
        console.error('Error while generating PEM-encoded public key:', error.message);
        throw new Error('Failed to generate a PEM-encoded public key.');
    }
}

function loadPublicKey(publicPem) {
    try {
        return crypto.createPublicKey({ key: publicPem, format: 'pem' });
    } catch (error) {
        console.error('Error while loading public key:', error.message);
        throw new Error('Failed to load a public key from PEM.');
    }
}

function loadPrivatePem(privatePem, password) {
    try {
        return crypto.createPrivateKey({ key: privatePem, format: 'pem', passphrase: password });
    } catch (error) {
        console.error('Error while loading private key:', error.message);
        throw new Error('Failed to load a private key from PEM with password.');
    }
}

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