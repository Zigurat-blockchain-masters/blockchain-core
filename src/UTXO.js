import { hash } from './hashing'; // Assuming hashing module is available

export default class UTXO {
    constructor(tx_hash, public_key, message) {
        this.tx_hash = tx_hash;
        this.public_key = public_key;
        this.message = message;
    }

    getHash() {
        return hash(JSON.stringify(this));
    }
}