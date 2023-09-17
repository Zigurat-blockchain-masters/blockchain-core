require('dotenv').config();
const hashing = require('../src/hashing');
const {getMempool} = require('../src/mempool');
const {getBlockchain} = require('../src//blockchain');
const {coinbase, transaction} = require('../src/transaction');
const randomNonce = Math.floor(Math.random() * 16)
const publicKey = process.env.PUBLIC_KEY;
import Block from '../src/block';

export default class Miner {
    constructor(minerPublicKey) {
        this.publicKey = minerPublicKey;
        this.mine();
    }

    checkAgainstTarget(hashString) {
        const hex = hashing.stringToHex(hashString);
        return hex.startsWith("0".repeat(1));
    }

    mine() {
        try {
            const blockchain = getBlockchain();
            const latestBlock = blockchain.getLatestBlock();

            if (!(latestBlock instanceof Block)) {
                throw new Error("Invalid latest block");
            }

            const mempool = getMempool();
            if(mempool.tx === undefined) {
                return;
            }
            const validTxs = mempool.tx.filter((tx) => {
                return (tx instanceof transaction || tx instanceof coinbase) && tx.isValid();
            });

            const coinbaseInstance = new coinbase(this.publicKey);
            validTxs.unshift(coinbaseInstance);

            let nonce = 0;
            let block = null;
            let mining = true;

            while (mining) {
                block = new Block(
                    latestBlock.getHash(),
                    validTxs,
                    nonce
                );

                const hash = block.getHash();

                if (this.checkAgainstTarget(hash)) {
                    mining = false; // Stop mining when a valid block is found
                } else {
                    nonce++; // Increment nonce for the next iteration
                }
            }

            // Insert the mined block into the blockchain
            const success = blockchain.insertBlock(block);

            if (success) {
                console.log(JSON.stringify(blockchain.getJson()));
            }
        } catch (error) {
            console.error("Error while mining:", error.message);
        }
    }

}

const miner = new Miner(publicKey);
