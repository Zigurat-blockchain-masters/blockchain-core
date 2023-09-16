import { genesisCoinbase } from './Genesis';
import Block from './block';
import UTXO from './UTXO'
import {miningTarget} from './CONFIG'
import {Transaction} from "./transaction"

let currentBlockchain

export const getBlockchain = () => {
  return currentBlockchain ? currentBlockchain : (currentBlockchain = new Blockchain());
};


export class Blockchain{
  constructor(){
    this.chain = [new Block("ZEvMflZDcwQJmarInnYi88px+6HZcv2Uoxw7+/JOOTg=", [genesisCoinbase()], 0)]
  }


  insertBlock(block) {
    if (!(block instanceof Block)) {
      return false;
    }   
    for (let tx of block.transactions) {
      const newTx = new Transaction(tx);
      if (!newTx.isValid()) {
        return false;
      }
      // temporarily removed, cant compare UTXOs with UTXOs on the blockchain if the block hasn't been added, will always FALSE
      // if (tx instanceof Transaction) {
      //   for (let utxo of tx.utxos) {
      //     if (!this.isValidUTXO(utxo)) {
      //       return false;
      //     }
      //   }
      // }
    }
    if (!this.checkAgainstTarget(miningTarget, block.getHash())) {
      return false;
    }
    this.chain.push(block);
    return true;
  }
 

  getLatestBlock(){
    return this.chain[this.chain.length - 1]
  }


  checkAgainstTarget(miningTarget, hash) {
    if (typeof miningTarget !== 'number' || miningTarget <= 0 || typeof hash !== 'string') {
      throw new Error('Invalid arguments');
    }
    const targetPrefix = '0'.repeat(miningTarget);
    return hash.startsWith(targetPrefix);
  }

  
  getUTXOs(publicKey) {
    const utxos = [];
    for (let i = 1; i < this.chain.length; i++) {
      const block = this.chain[i];
      for (const tx of block.transactions) {
        let counter = 0;
        for (const pk of tx.receiverPublicKeys) {
          if (pk === publicKey) {
            const utxo = new UTXO(tx.getHash(), publicKey, tx.messages[counter]);
            utxos.push(utxo);
          }
          counter++;
        }
      }
    }
    return utxos;
  }


  isValidUTXO(UTXO) {
    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.getHash() === UTXO.txHash) {
          const index = tx.receiverPublicKeys.indexOf(UTXO.publicKey);
          if (index !== -1 && UTXO.message === tx.messages[index]) {
            return true;
          }
        }
      }
    }
    return false;
  }
  

  getJson() {
    const blocks = this.chain.map(block => JSON.stringify(block));
    return JSON.stringify({
      blocks
    });
  }
}
