import { UTXO } from 'UTXO';
import { block } from 'block';
import { miningTarget } from 'CONFIG';
import { transaction } from 'transaction';
import { genesisCoinbase } from 'genesisCoinbase';

let currentBlockchain

export const getBlockchain = () => {
  if (currentBlockchain === undefined) {
    currentBlockchain = new Blockchain()
  }
  return currentBlockchain
}

class Blockchain{
  constructor(){
    this.chain = [genesisCoinbase]
  }


  insertBlock(block) {
    if (!(block instanceof Block)) {
      return false;
    }   
    for (let tx of block.transactions) {
      if (!tx.isValid()) {
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
    for(let i = 1; i < this.chain.length; i++){
      if (this.chain.length === 1) {throw new Error("Chain only contains the genesis block")}

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
    const blocks = this.chain.map(block => block.toJSON());
    return JSON.stringify({
      blocks
    });
  }
}
