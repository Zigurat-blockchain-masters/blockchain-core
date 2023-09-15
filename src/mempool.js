let mempool = null;

export default class Mempool {
  constructor() {
    this.tx = [];
  }

  insertTransaction(receivedTx) {
    if (!(receivedTx.isValid)) {
      throw new Error("Invalid transaction");
    }
    this.tx.push(receivedTx);
  }
}

function getMempool() {
  if (mempool === null) {
    mempool = new Mempool();
  }
  return mempool;
}