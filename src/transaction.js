import { verify } from 'crypto'; // Assuming crypto module is available
import { hash as _hash } from './hashing'; // Assuming hashing module is available
import UTXO from './UTXO'; // Assuming UTXO module is available

class Transaction {
    constructor(utxos, receiver_public_keys, messages, signature) {
        if (!Array.isArray(receiver_public_keys) || !Array.isArray(messages) ||
            receiver_public_keys.length !== messages.length || receiver_public_keys.length === 0 ||
            !Array.isArray(utxos) || utxos.length === 0) {
            throw new Error("Invalid input parameters");
        }
        
        for (const i of utxos) {
            if (!(i instanceof UTXO) || i.public_key !== utxos[0].public_key) {
                throw new Error("Invalid UTXOs");
            }
        }
        
        this.utxos = utxos;
        this.receiver_public_keys = receiver_public_keys;
        this.messages = messages;
        this.signature = signature;
        
        if (!this.isValid()) {
            throw new Error("Transaction is not valid");
        }
    }

    getDict() {
        const utxos_json = this.utxos.map(i => i.getDict());
        const data = {
            "utxos": utxos_json,
            "receiver_public_keys": this.receiver_public_keys,
            "messages": this.messages
        };
        return data;
    }

    getJson() {
        return JSON.stringify(this.getDict());
    }

    getHash() {
        return _hash(this.getJson());
    }

    getFullJson() {
        const dictionary = this.getDict();
        dictionary["signature"] = this.signature;
        return JSON.stringify(dictionary);
    }

    isValid() {
        const signature_valid = verify(this.utxos[0].public_key, this.signature, this.getHash());
        let spent = 0;
        for (const msg of this.messages) {
            spent += msg;
        }
        let balance = 0;
        for (const utxo of this.utxos) {
            balance += utxo.message;
        }
        const amount_enough = balance === spent;
        return signature_valid && amount_enough;
    }
}

class UnsignedTransaction {
    constructor(utxos, receiver_public_keys, messages) {
        if (!Array.isArray(receiver_public_keys) || !Array.isArray(messages) ||
            receiver_public_keys.length !== messages.length || receiver_public_keys.length === 0 ||
            !Array.isArray(utxos) || utxos.length === 0) {
            throw new Error("Invalid input parameters");
        }
        
        for (const i of utxos) {
            if (!(i instanceof UTXO) || i.public_key !== utxos[0].public_key) {
                throw new Error("Invalid UTXOs");
            }
        }
        
        this.utxos = utxos;
        this.receiver_public_keys = receiver_public_keys;
        this.messages = messages;
    }

    getDict() {
        const utxos_json = this.utxos.map(i => i.getDict());
        const data = {
            "utxos": utxos_json,
            "receiver_public_keys": this.receiver_public_keys,
            "messages": this.messages
        };
        return data;
    }

    getJson() {
        return JSON.stringify(this.getDict());
    }

    getHash() {
        return hash(this.getJson());
    }

    sign(priv_key, password) {
        return _sign(priv_key, password, this.getHash());
    }
}

class Coinbase {
    constructor(receiver) {
        this.receiver_public_keys = [receiver];
        this.messages = [50];
    }

    getHash() {
        return hashing.hash(JSON.stringify({
            "receiver_public_keys": this.receiver_public_keys,
            "messages": this.messages
        }));
    }

    isValid() {
        return true;
    }

    getDict() {
        const data = {
            "receiver_public_keys": this.receiver_public_keys,
            "messages": this.messages
        };
        return data;
    }

    getJson() {
        return JSON.stringify(this.getDict());
    }
}


module.exports = {
    Transaction,
    UnsignedTransaction,
    Coinbase
}