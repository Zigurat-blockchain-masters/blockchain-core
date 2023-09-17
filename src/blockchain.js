import {genesisCoinbase} from './Genesis';
import Block from './block';
import UTXO from './UTXO'
import {miningTarget} from './CONFIG'
import {Transaction} from "./transaction"

let currentBlockchain;

export const getBlockchain = () => currentBlockchain ?? (currentBlockchain = new Blockchain());


export class Blockchain {
    constructor() {
        const initCoinbase = genesisCoinbase();
        this.chain = [new Block("ZEvMflZDcwQJmarInnYi88px+6HZcv2Uoxw7+/JOOTg=", [initCoinbase.getHash()], 0)]
    }


    insertBlock(block) {
        if (!(block instanceof Block)) {
            throw new Error("Invalid block type");
        }

        if (!Array.isArray(block.transactions)) {
            throw new Error("Missing or invalid transactions array");
        }

        for (let tx of block.transactions) {
            if (!(tx instanceof Transaction) || !tx.isValid()) {
                throw new Error("Invalid transaction");
            }

            for (let utxo of tx.utxos) {
                if (!this.isValidUTXO(utxo)) {
                    throw new Error("Invalid UTXO");
                }
            }
        }

        if (!this.checkAgainstTarget(miningTarget, block.getHash())) {
            throw new Error("Block does not meet mining target");
        }

        this.chain.push(block);
        return true; // Block successfully inserted
    }


    isChainValid() {
        const chainLength = this.chain.length;

        if (chainLength === 0) {
            return true; // An empty chain is considered valid
        }

        for (let i = 1; i < chainLength; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Check if currentBlock and previousBlock exist
            if (!currentBlock || !previousBlock) {
                return false; // Invalid block(s) in the chain
            }

            // Check block integrity
            if (!currentBlock.hasValidTransactions() ||
                currentBlock.hash !== currentBlock.calculateHash() ||
                currentBlock.previousHash !== previousBlock.hash) {
                return false; // Chain is invalid if any condition fails
            }
        }

        return true; // If all blocks are valid, the chain is valid
    }


    getLatestBlock() {
        return this.chain.length > 0 ? this.chain[this.chain.length - 1] : null;
    }

    checkAgainstTarget(miningTarget, hash) {
        const targetPrefix = '0'.repeat(miningTarget);
        return hash.startsWith(targetPrefix);
    }


    getUTXOs(publicKey) {
        try {
            return this.chain.reduce((utxos, block) => {
                block.transactions.forEach((tx) => {
                    tx.receiverPublicKeys.forEach((pk, index) => {
                        if (pk === publicKey) {
                            utxos.push(new UTXO(tx.getHash(), publicKey, tx.messages[index]));
                        }
                    });
                });
                return utxos;
            }, []);
        } catch (error) {
            console.error("An error occurred while retrieving UTXOs:", error);
            return []; // Return an empty array on error
        }
    }


    isValidUTXO(utxo) {
        try {
            for (const block of this.chain) {
                for (const tx of block.transactions) {
                    const index = tx.receiverPublicKeys.indexOf(utxo.publicKey);
                    if (tx.getHash() === utxo.txHash && index !== -1 && utxo.message === tx.messages[index]) {
                        return true; // UTXO found with matching properties
                    }
                }
            }
        } catch (error) {
            console.error("An error occurred while validating UTXO:", error);
        }

        return false; // UTXO not found in any transactions, invalid (or error thrown)
    }


    getJson() {
        const blocks = this.chain.map(block => block.getDict());
        return JSON.stringify({blocks});
    }
}
