const { transaction } = require("./transaction"); // Replace with actual path

let mempool = null;

class Mempool {
  constructor() {
    this.tx = [];
  }

  insert_transaction(tx) {
    if (!(tx instanceof transaction)) {
      throw new Error("Invalid transaction");
    }
    if (!tx.is_valid()) {
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

export default {
  transaction,
  mempool,
};
