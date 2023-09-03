import { existsSync, readFileSync, writeFileSync } from 'fs'; // Import the fs module for file operations
import { GetMempool } from './Mempool';
import { Transaction, UnsignedTransaction } from './Transaction';


class Wallet {
    constructor() {
        if (existsSync('private_key.json')) {
            const { PrivateKey, Password } = this.loadFromFile();
            this.PrivateKey = PrivateKey;
            this.Password = Password;
        } else {
            this.Password = this.generatePassword();
            this.PrivateKey = this.generatePrivatePemString(this.password);
            this.saveToFile();
        }
        this.PublicKey = this.generatePublicPemString(this.PrivateKey, this.Password);
    }

    sendMoney(ReceiverPks, Msgs) {
        let MoneyToSend = 0;
        for (const m of Msgs) {
            MoneyToSend += m;
        }
        const Tx = this.createTransaction(this.getUTXOs(MoneyToSend), ReceiverPks, Msgs);
        this.insertToMempool(Tx);
    }

    getUTXOs(Money) {
        const Blockchain = getBlockchain();
        const utxos = Blockchain.getUTXOs(this.generatePublicPemString(this.PrivateKey, this.Password));

        if (Array.isArray(utxos)) {
            console.log("UTXOs are inside list")
        } else {
            console.log("UTXOs are not a list")
        }

        const ListOfValidUTXO = utxos.filter(i => Blockchain.isValidUTXO(i));

        const NeededUTXOs = [];
        let TotalAmount = 0;

        for (const i of valid_utxos) {
            NeededUTXOs.push(i);
            TotalAmount += i.amount;

            if (TotalAmount >= Money) {
                break;
            }
        }

        return NeededUTXOs;
    }

    createTransaction(utxos, ReceiverPks, Msgs) {
        const Unsigned = new UnsignedTransaction({ utxos, receiver_public_keys: ReceiverPks, messages: Msgs });
        const Signature = Unsigned.sign({ priv_key: this.private_key, password: this.password });
        return new Transaction({ utxos, receiver_public_keys: ReceiverPks, messages: Msgs, Signature });
    }

    insertToMempool(tx) {
        GetMempool().insertTransaction(tx);
    }

    saveToFile() {
        const Data = {
            PrivateKey: this.PrivateKey,
            Password: this.Password
        };
        try {
            writeFileSync('private_key.json', JSON.stringify(Data));
        }
        catch (error) {
            console.log("There was an error while saving the file to disk")
            console.log(error)
        }
    }

    loadFromFile() {
        try {
            const FileData = readFileSync('private_key.json', 'utf8');
            const Data = JSON.parse(FileData);
            return { private_key: Data.PrivateKey, Password: Data.Password };
        } catch (error) {
            console.log("There was an error while loading the file")
            console.log(error)
        }
    }
}
