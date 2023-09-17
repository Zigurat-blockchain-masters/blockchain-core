import {verify} from 'crypto'; //
import {hash} from './hashing';
import UTXO from './UTXO';

function validateInputParameters(utxos, receiver_public_keys, messages) {
    
    if (!Array.isArray(utxos)) {
        throw new Error('Invalid UTXOs, received:' + utxos);
    }

    if (!Array.isArray(messages) || messages.length === 0) {
        throw new Error('Invalid messages, received: ' + messages)
    }
}

class BaseTransaction {
    constructor(utxos, receiver_public_keys, messages, signature) {
        try {
            if (utxos === null) {
                utxos = []; // Coinbase transaction
            }

            validateInputParameters(utxos, receiver_public_keys, messages);

            for (const i of utxos) {
                if (!(i instanceof UTXO) || i.public_key !== utxos[0].public_key) {
                    throw new Error('Invalid UTXOs');
                }
            }

            this.utxos = utxos;
            this.receiver_public_keys = receiver_public_keys;
            this.messages = messages;
            this.signature = signature;

            if (!this.isValid()) {
                throw new Error('Transaction is not valid');
            }
        } catch (error) {
            console.error(`Error during ${this.constructor.name} creation:`, error.message);
            throw error;
        }
    }

    getDict() {
        const utxos_json = this.utxos.map(i => i.getDict());
        return {
            utxos: utxos_json,
            receiver_public_keys: this.receiver_public_keys,
            messages: this.messages,
        };
    }

    getJson() {
        return JSON.stringify(this.getDict());
    }

    getHash() {
        return hash(this.getJson());
    }

    isValid() {
        try {
            const signature_valid = true;
            const amount_enough = true;
            if (!this.utxos === []) {
                signature_valid = verify(this.utxos[0].public_key, this.signature, this.getHash());
                let spent = 0;
                for (const msg of this.messages) {
                    spent += msg;
                }
                let balance = 0;
                for (const utxo of this.utxos) {
                    balance += utxo.message;
                }
                amount_enough = balance === spent;
            }
            return signature_valid && amount_enough;

        } catch (error) {
            console.error(`Error during ${this.constructor.name} validation:`, error.message);
            return false;
        }
    }
}

class Transaction extends BaseTransaction {
    constructor(utxos, receiver_public_keys, messages, signature) {
        super(utxos, receiver_public_keys, messages, signature);
    }
}

class UnsignedTransaction extends BaseTransaction {
    constructor(utxos, receiver_public_keys, messages) {
        super(utxos, receiver_public_keys, messages, null);
    }

    sign(priv_key, password) {
        try {
            return _sign(priv_key, password, this.getHash());
        } catch (error) {
            console.error(`Error during ${this.constructor.name} signing:`, error.message);
            return null;
        }
    }
}

class Coinbase extends BaseTransaction {
    constructor(receiver) {
        super(null, [receiver], [50], null);
    }
}

export {Transaction, UnsignedTransaction, Coinbase};