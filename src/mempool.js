let mempool = null;

export default class Mempool {
  constructor() {
    this.tx = [];
  }

  insertTransaction(receivedTx) {
    try {
      if (!(receivedTx.isValid)) {
        throw new Error("Invalid transaction");
      }
      this.tx.push(receivedTx);

    } catch (exception) {
      throw new Error(exception);
    }

  }
}

function getMempool() {
  try {
    if (mempool === null) {
      mempool = new Mempool();
    }

    return mempool;

  } catch (exception) {
    return  new Error(exception);
  }
}