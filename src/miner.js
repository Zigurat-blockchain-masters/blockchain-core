require('dotenv').config();
const hashing = require('./hashing');
const { getMempool } = require('./mempool');
const block = require('./block');
const { getBlockchain } = require('./blockchain');
const { coinbase, transaction } = require('./transaction');
const { miningTarget } = require('./CONFIG');
const randomNonce = Math.floor(Math.random() * 16)
const publicKey = process.env.PUBLIC_KEY;

export default class Miner {
  constructor(minerPublicKey) {
    this.publicKey = minerPublicKey;
    this.mine();
  }

  checkAgainstTarget(hashString) {
    const hex = hashing.stringToHex(hashString);
    return hex.startsWith("0".repeat(miningTarget));
  }

  mine() {
    const topmostBlock = getBlockchain().getTopmostBlock();
    if (!(topmostBlock instanceof block)) {
      throw new Error("Invalid topmost block");
    }

    const hashPrev = topmostBlock.getHash();

    const mempool = getMempool();

    const filteredTxs = mempool.tx.filter((tx) => {
      return (tx instanceof transaction || tx instanceof coinbase) && tx.isValid();
    });

    const coinbaseInstance = new coinbase(this.publicKey);

    txs.unshift(coinbaseInstance);

    while (true) {
      const block = new block(
          hashPrev,
          txs,
          randomNonce
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

const miner = new Miner(publicKey);
