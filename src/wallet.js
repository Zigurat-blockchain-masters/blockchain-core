const fs = require('fs');
const crypto = require('crypto');

let privateKey = null;
let publicKey = null;

// Mempool and UTXOs simulation
const mempool = [];
const utxos = [];

// Generate keys and save to file
function generateKeys() {
  const { privateKey: privKey, publicKey: pubKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });

  privateKey = privKey;
  publicKey = pubKey;

  fs.writeFileSync('private_key.pem', privateKey);
  fs.writeFileSync('public_key.pem', publicKey);
}

// Load keys from file
function loadKeys() {
  privateKey = fs.readFileSync('private_key.pem', 'utf-8');
  publicKey = fs.readFileSync('public_key.pem', 'utf-8');
}

// Send money and insert transaction into mempool
function sendMoney(senderPrivateKey, recipientPublicKey, amount) {
  const transaction = {
    sender: senderPrivateKey,
    recipient: recipientPublicKey,
    amount: amount,
    signature: null,
  };

  mempool.push(transaction);
  return transaction;
}

// Retrieve a list of UTXOs and validate them
function getUTXOs() {
  return utxos.filter((utxo) => {
    // Add validation logic here
    return true;
  });
}

// Create and sign a transaction
function createTransaction(senderPrivateKey, recipientPublicKey, amount) {
  const transaction = sendMoney(senderPrivateKey, recipientPublicKey, amount);
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(JSON.stringify(transaction));
  transaction.signature = sign.sign(privateKey, 'base64');
  return transaction;
}

// Insert transaction into mempool
function insertToMempool(transaction) {
  mempool.push(transaction);
}

// Main logic
if (!fs.existsSync('private_key.pem') || !fs.existsSync('public_key.pem')) {
  generateKeys();
} else {
  loadKeys();
}

const senderPrivateKey = privateKey;
const recipientPublicKey = publicKey;

const transaction = createTransaction(senderPrivateKey, recipientPublicKey, 10);
console.log('Transaction created and signed:', transaction);

// Simulate processing mempool
insertToMempool(transaction);
console.log('Transaction inserted into mempool:', mempool);

// Simulate checking UTXOs
const validatedUTXOs = getUTXOs();
console.log('Validated UTXOs:', validatedUTXOs);




