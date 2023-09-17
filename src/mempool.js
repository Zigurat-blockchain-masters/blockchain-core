import Transaction from "./transaction"; // Replace with the actual path

let mempool = null;

export default class Mempool {
    constructor() {
        this.transactions = [];
    }

    insertTransaction(transaction) {
        this.transactions.push(transaction);
    }
}

export function getMempool() {
    if (mempool === null) {
        mempool = new Mempool();
    }
    return mempool;
}