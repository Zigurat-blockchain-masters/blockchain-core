const { transaction } = require("./transaction"); // Replace with actual path

let mempool = null;

export default class Mempool {
  constructor() {
    this.tx = [];
  }

  insertTransaction(tx) {
    if (!(tx instanceof transaction) || !tx.isValid()) {
      throw new Error("Invalid transaction");
    }
    this.tx.push(tx);
  }
}

function getMempool() {
  if (mempool === null) {
    mempool = new Mempool();
  }
  return mempool;
}