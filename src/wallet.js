const fs = require('fs'); // Import the fs module for file operations
const getMempool = require('./mempool');
const transaction = require('./transaction');
const crypto = require('./cryptography');

export default class Wallet {
    constructor() {
        if (fs.existsSync('private_key.json')) {
            const { privateKey, password } = this.loadFromFile();
            this.privateKey = privateKey;
            this.password = password;
        } else {
            this.password = crypto.generatePassword();
            this.privateKey = crypto.generatePrivatePemString(this, this.password);
            this.saveToFile();
        }
        this.publicKey = crypto.generatePublicPemString(this.privateKey, this.password);
    }

    sendMoney(receiverPks, msgs) {
        let moneyToSend = 0;
        for (const m of msgs) {
            moneyToSend += m;
        }
        const tx = this.createTransaction(this.getUTXOs(moneyToSend), receiverPks, msgs);
        this.insertToMempool(tx);
    }

    getUTXOs(money) {
        const blockchain = getBlockchain();
        const utxos = blockchain.getUTXOs(this.generatePublicPemString(this.privateKey, this.password));

        if (Array.isArray(utxos)) {
            console.log("UTXOs are inside list");
        } else {
            console.log("UTXOs are not a list");
        }

        const listOfValidUTXO = utxos.filter(i => blockchain.isValidUTXO(i));

        const neededUTXOs = [];
        let totalAmount = 0;

        for (const i of listOfValidUTXO) {
            neededUTXOs.push(i);
            totalAmount += i.amount;

            if (totalAmount >= money) {
                break;
            }
        }

        return neededUTXOs;
    }

    createTransaction(utxos, receiverPks, msgs) {
        const unsigned = new unsignedTransaction({ utxos, receiverPublicKey: receiverPks, messages: msgs });
        const signature = unsigned.sign({ priv_key: this.privateKey, password: this.password });
        return new Transaction({ utxos, receiverPublicKey: receiverPks, messages: msgs, Signature: signature });
    }

    insertToMempool(tx) {
        getMempool().insertTransaction(tx);
    }

    saveToFile() {
        const data = {
            password : crypto.generatePassword(),
            privateKey : crypto.generatePrivatePemString(this, this.password)
        };

        // Check if private key and password are not empty before saving to file
        if (!data.privateKey || !data.password) {
            console.error("Private key or password is empty. Cannot save to file.");
            return;
        }

        try {
            fs.writeFileSync('private_key.json', JSON.stringify(data));
        } catch (error) {
            console.error("Could not write file to disk");
            console.error(error); // Print the error details for debugging
        }
    }

    loadFromFile() {
        try {
            const fileData = fs.readFileSync('private_key.json', 'utf8');
            const data = JSON.parse(fileData);
            return { privateKey: data.privateKey, password: data.password };
        } catch (error) {
            console.error("Could not load the file from disk");
        }
    }
}


const wallet = new Wallet();