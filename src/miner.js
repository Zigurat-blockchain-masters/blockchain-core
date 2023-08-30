const hashing = require("./hashing"); // Replace with actual path
const { mempool, getMempool } = require("./mempool").default; // Replace with actual path
const block = require("./block"); // Replace with actual path
const { getBlockchain } = require("./blockchain"); // Replace with actual path
const { coinbase, transaction } = require("./transaction"); // Replace with actual path
const { miningTarget } = require("./CONFIG"); // Replace with actual path

class Miner {
  constructor(minerPublicKey) {
    this.publicKey = minerPublicKey;
    this.mine();
  }

  checkAgainstTarget(hashString) {
    const hex = hashing.stringToHex(hashString);
    for (let i = 1; i <= miningTarget; i++) {
      if (hex[i] !== "0") {
        return false;
      }
    }
    return true;
  }

  mine() {
    const topmostBlock = getBlockchain().getTopmostBlock();
    if (!(topmostBlock instanceof Block)) {
      throw new Error("Invalid topmost block");
    }

    const hash_prev = topmostBlock.getHash();

    const txs = getMempool().tx;

    txs.forEach((tx) => {
      if (
        !(tx instanceof transaction || tx instanceof coinbase) ||
        !tx.isValid()
      ) {
        txs.splice(txs.indexOf(tx), 1);
      }
    });

    const coinbase = new Coinbase(this.publicKey);

    txs.unshift(coinbase);

    while (true) {
      const block = new block(
        hashPrev,
        txs,
        Math.floor(Math.random() * 9999999999999999999999999999)
      );

      const hash = block.getHashes();
      const check = this.checkAgainstTarget(hash);

      if (check) {
        const success = getBlockchain().insertBlock(block);
        if (success) {
          console.log(JSON.stringify(getBlockchain().getJson()));
        }
        break;
      }
    }
  }
}

const miner = new Miner("your_public_key"); // TODO replace with your public key
