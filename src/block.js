import { hash } from './hashing'; // Replace with the actual path

export default class Block {
    constructor(hash_previous_block, transactions, nonce) {
        this.transactions = transactions;
        this.hash_previous_block = hash_previous_block;
        this.nonce = nonce;
    }

    getHash() {
        const data = this.getDict();
        const json_data = JSON.stringify(data);
        return hash(json_data);
    }

    getDict() {
        const transaction_hashes = this.transactions.map(tx => tx.getHash());

        return {
            transaction_hashes,
            hash_previous_block: this.hash_previous_block,
            nonce: this.nonce,
        };
    }
}