const UTXO = require('UTXO')
const Block = require('block')
const mining_target = require('CONFIG')
const Transaction = require('transaction')
const genesis_coinbase = require('genesis')

let current_blockchain

const get_blockchain = () => {
  if (current_blockchain === undefined) {
    current_blockchain = new Blockchain()
  }
  return current_blockchain
}

class Blockchain{
  constructor(){
    this.chain = [genesis_coinbase]
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
    if (!this.checkAgainstTarget(mining_target, block.getHash())) {
      return false;
    }
    this.chain.push(block);
    return true;
  }


  isChainValid(){
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


  checkAgainstTarget(mining_target, hash) {
    return hash.substring(0, mining_target) !== Array(mining_target + 1).join("0") ? true : false;   
  } 

  
  getUTXOs(publicKey) {
    const utxos = [];
    for (const block of this.chain) {
      for (const tx of block.transactions) {
        let counter = 0;
        for (const pk of tx.receiver_public_keys) {
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
    let valid = false;
    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.getHash() === UTXO.tx_hash) {
          let counter = 0;
          for (const pk of tx.receiver_public_keys) {
            if (pk === UTXO.public_key) {
              if (UTXO.message === tx.messages[counter]) {valid = true}
            } 
            counter++;
          }
        }
      }
    }
    if (!valid) {
      return false;
    }
    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx instanceof Transaction) {
          for (const tx_utxo of tx.utxos) {
            if (tx_utxo.getHash() === UTXO.getHash()) { return false }
          }
        }
      }
    }
    return valid;
  }
  

  getJson() {
    const blocks = [];
    for (const block of this.blocks) {
      blocks.push(block.toJSON());
    }
    return JSON.stringify({
      "blocks": blocks
    });
  }
}


module.exports.Blockchain = get_blockchain()
