const UTXO = require('./UTXO');
import {miningTarget} from '../src/CONFIG'
import {Transaction} from "../src/transaction"
// const genesisCoinbase = require('./genesisCoinbase');
import Block from './block';


let currentBlockchain

export const getBlockchain = () => {
  return currentBlockchain ? currentBlockchain : (currentBlockchain = new Blockchain());
};


export class Blockchain{
  constructor(){
    this.chain = [new Block("ZEvMflZDcwQJmarInnYi88px+6HZcv2Uoxw7+/JOOTg=", ["test"], 0)]
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
      if (tx instanceof Transaction) {
        for (let utxo of tx.utxos) {
          if (!this.isValidUTXO(utxo)) {
            return false;
          }
        }
      }
    }
    if (!this.checkAgainstTarget(miningTarget, block.getHash())) {
      return false;
    }
    this.chain.push(block);
    return true;
  }

  isChainValid(){
    if (this.chain.length === 1) {throw new Error("Chain only contains the genesis block")}
    for(let i = 1; i < this.chain.length; i++){

      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1]

      if(!currentBlock.hasValidTransactions()){
        return false
      }   
      if(currentBlock.hash != currentBlock.calculateHash()){
        return false;
      }
      if(currentBlock.previousHash != previousBlock.hash){        
        return false;
      }
    return true
    }
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
    for (const block of this.chain) {
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
            // UTXO found with matching transaction hash, public key, and message
            return true;
          }
        }
      }
    }

    // UTXO not found in any transactions, invalid
    return false;
  }
  

  getJson() {
    const blocks = this.chain.map(block => JSON.stringify(block));
    return JSON.stringify({
      blocks
    });
  }
}
