//import { hash } from './hashing'; // Assuming hashing module is available
const hashing = require('../src/hashing');

export default class UTXO {
    constructor(tx_hash, public_key, message) {
        this.tx_hash = tx_hash;
        this.public_key = public_key;
        this.message = message;
    }

    getDict() {
        return {
            "tx_hash": this.tx_hash,
            "public_key": this.public_key,
            "message": this.message
        };
    }

    getHash() {
        return hashing.hash(JSON.stringify(this.getDict()));
    }
}