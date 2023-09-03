import { existsSync, readFileSync, writeFileSync } from 'fs'; // Import the fs module for file operations
import { getMempool } from './Mempool';
import { transaction, unsignedTransaction } from './Transaction';


class Wallet {
    constructor() {
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
            console.log("UTXOs are inside list")
        } else {
            console.log("UTXOs are not a list")
        }

        const listOfValidUTXO = utxos.filter(i => Blockchain.isValidUTXO(i));

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
        const unsigned = new unsignedTransaction({utxos, receiverPublicKeys: receiverPks, messages: msgs });
        const signature = unsigned.sign({ privateKey: this.privateKey, password: this.password });
        return new transaction({ utxos, receiverPublicKeys: ReceiverPks, messages: msgs, signature });
    }

    insertToMempool(tx) {
        getMempool().insertTransaction(tx);
    }

    saveToFile() {
        const data = {
            privateKey: this.privateKey,
            password: this.password
        };
        try {
            writeFileSync('private_key.json', JSON.stringify(data));
        }
        catch (error) {
            console.log("There was an error while saving the file to disk")
            console.log(error)
        }
    }

    loadFromFile() {
        try {
            const fileData = readFileSync('private_key.json', 'utf8');
            const data = JSON.parse(fileData);
            return { privateKey: data.PrivateKey, password: data.password };
        } catch (error) {
            console.log("There was an error while loading the file")
            console.log(error)
        }
    }
}
