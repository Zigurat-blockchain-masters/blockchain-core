import dotenv from 'dotenv';
import hashing from './hashing';
import { getMempool } from './mempool';
import Block from './block';
import { getBlockchain } from './blockchain';
import { Coinbase, Transaction } from './transaction';
import { miningTarget } from './CONFIG';

dotenv.config();

class Miner {
  constructor(minerPublicKey) {
    this.publicKey = minerPublicKey;
    this.mine();
  }

  checkAgainstTarget(hashString) {
    const hex = hashing.stringToHex(hashString);
    return hex.startsWith('0'.repeat(miningTarget));
  }

  mine() {
    try {
      const topmostBlock = getBlockchain().getTopmostBlock();
      if (!(topmostBlock instanceof Block)) {
        throw new Error('Invalid topmost block');
      }

      const hashPrev = topmostBlock.getHash();

      const mempool = getMempool();

      const filteredTxs = mempool.transactions.filter((tx) => {
        return (tx instanceof Transaction || tx instanceof Coinbase) && tx.isValid();
      });

      const coinbaseInstance = new Coinbase(this.publicKey);

      filteredTxs.unshift(coinbaseInstance);

      let foundValidBlock = false;
      for (let randomNonce = 0; !foundValidBlock && randomNonce < 16; randomNonce++) {
        const newBlock = new Block(hashPrev, filteredTxs, randomNonce);

        const hash = newBlock.getHash();
        const check = this.checkAgainstTarget(hash);

        if (check) {
          foundValidBlock = getBlockchain().insertBlock(newBlock);
          if (foundValidBlock) {
            console.log(JSON.stringify(getBlockchain().getJson()));
          }
        }
      }
    } catch (error) {
      console.error('Error during mining:', error.message);
    }
  }
}

const publicKey = process.env.PUBLIC_KEY;
const miner = new Miner(publicKey);
