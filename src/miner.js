require('dotenv').config();
const hashing = require('../src/hashing');
// import { getBlockchain } from './blockchain';
// import { Block } from '../src/Block';
const {getMempool} = require('../src/mempool');
const {getBlockchain} = require('../src//blockchain');
const {coinbase, transaction} = require('../src/transaction');
const randomNonce = Math.floor(Math.random() * 16)
const publicKey = process.env.PUBLIC_KEY;
const {Block} = require('../src/block');

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
            const latestBlock = getBlockchain().getLatestBlock();

            if (!(latestBlock === Block)) {
                throw new Error("Invalid latest block");
            }

            const hashPrev = latestBlock.getHash();

            const mempool = getMempool();

            const filteredTxs = mempool.tx.filter((tx) => {
                return (tx instanceof transaction || tx instanceof coinbase) && tx.isValid();
            });

            const coinbaseInstance = new coinbase(this.publicKey);

            filteredTxs.unshift(coinbaseInstance);

            while (true) {
                const block = new block(
                    hashPrev,
                    filteredTxs,
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
        } catch (exception) {
            throw new Error(exception);
        }
    }
}

const miner = new Miner(publicKey);
