const hashing = require('../src/hashing');

export default class Block {
    constructor(hash_previous_block, transactions, nonce) {
        this.transactions = transactions;
        this.hash_previous_block = hash_previous_block;
        this.nonce = nonce;
    }

    getHash() {
        const data = this.getDict();
        const json_data = JSON.stringify(data);
        return hashing.hash(json_data);
    }

    getDict() {
        const transaction_hash_list = [];
        for (let i = 0; i < this.transactions.length; i++) {
            transaction_hash_list.push(hashing.hash(this.transactions[i]));
        }
        return {
            "transaction_hashes": transaction_hash_list,
            "hash_previous_block": this.hash_previous_block,
            "nonce": this.nonce
        };
    }  
}