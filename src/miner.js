require('dotenv').config();
const hashing = require('../src/hashing');
const {getMempool} = require('../src/mempool');
const {getBlockchain} = require('../src//blockchain');
// const {coinbase, transaction} = require('../src/transaction');
const randomNonce = Math.floor(Math.random() * 16)
const publicKey = process.env.PUBLIC_KEY;
import Block from '../src/block';
import {Coinbase, Transaction} from '../src/transaction';


export default class Miner {
    constructor(minerKey) {
        this.publicKey = minerKey;
        this.mine();
    }

    checkAgainstTarget(hashString) {
        const hex = hashing.stringToHex(hashString);
        return hex.startsWith("0".repeat(1));
    }

    mine() {
        const latestBlock = getBlockchain().getLatestBlock();

        if (!(latestBlock instanceof Block)) {
            throw new Error("Invalid latest block");
        }

        const hashPrev = latestBlock.getHash();

        const mempool = getMempool();

        const filteredTxs = mempool.transactions.filter((tx) => {
            return (tx instanceof Transaction || tx instanceof Coinbase) && tx.isValid();
        });

        const coinbaseInstance = new Coinbase(this.publicKey);

        filteredTxs.unshift(coinbaseInstance);

        while (true) {
            const block = new Block(
                hashPrev,
                filteredTxs,
                randomNonce
            );

            const hash = block.getHash();

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
