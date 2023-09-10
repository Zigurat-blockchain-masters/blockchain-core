import { existsSync, readFileSync, writeFileSync } from 'fs';
import { getMempool } from './Mempool';
import { Transaction, UnsignedTransaction } from './Transaction';
import { getBlockchain } from './Blockchain';

export default class Wallet {
    constructor() {
        this.loadOrCreateWallet();
    }

    loadOrCreateWallet() {
        if (existsSync('private_key.json')) {
            const { privateKey, password } = this.loadFromFile();
            this.privateKey = privateKey;
            this.password = password;
        } else {
            this.password = this.generatePassword();
            this.privateKey = this.generatePrivatePemString(this.password);
            this.saveToFile();
        }
        this.publicKey = this.generatePublicPemString(this.privateKey, this.password);
    }

    sendMoney(receiverPks, msgs) {
        const moneyToSend = msgs.reduce((total, m) => total + m, 0);
        const utxos = this.getUTXOs(moneyToSend);
        const tx = this.createTransaction(utxos, receiverPks, msgs);
        this.insertToMempool(tx);
    }

    getUTXOs(money) {
        const publicKey = this.generatePublicPemString(this.privateKey, this.password);
        const blockchain = getBlockchain();
        const utxos = blockchain.getUTXOs(publicKey);

        if (!Array.isArray(utxos)) {
            console.error("UTXOs are not a list");
            return [];
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
        const unsigned = new UnsignedTransaction(utxos, receiverPks, msgs);
        const signature = unsigned.sign(this.privateKey, this.password);
        return new Transaction(utxos, receiverPks, msgs, signature);
    }

    insertToMempool(tx) {
        getMempool().insertTransaction(tx);
    }

    saveToFile() {
        const data = {
            privateKey: this.privateKey,
            password: this.password
        };

        if (!data.privateKey || !data.password) {
            throw new Error("Private key or password is empty. Cannot save to file.");
        }

        try {
            writeFileSync('private_key.json', JSON.stringify(data));
        } catch (error) {
            console.error(`Could not write file to disk, error: ${error.message}`);
            throw error;
        }
    }

    loadFromFile() {
        try {
            const fileData = readFileSync('private_key.json', 'utf8');
            const data = JSON.parse(fileData);
            return { privateKey: data.privateKey, password: data.password };
        } catch (error) {
            console.error(`Could not load the file from disk, error: ${error.message}`);
            throw error;
        }
    }

    generatePassword() {
        // TODO reuse hashing.js
    }

    generatePrivatePemString(password) {
        // TODO reuse hashing.js
    }

    generatePublicPemString(privateKey, password) {
        // TODO reuse hashing.js
    }
}