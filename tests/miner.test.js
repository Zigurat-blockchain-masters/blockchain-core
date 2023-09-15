const { mine, miner } = require('../src/miner');
const { transaction, coinbase } = require('../src/transaction');
const { block } = require('../src/block');
const { getMempool } = require('../src/mempool');
const { getBlockchain } = require('../src/blockchain');
// import Blockchain from "../src/blockchain";
// const { miningtarget } = require('../src/CONFIG');
// import miningtarget from "../src/CONFIG";

const hashing = {
    stringToHex: jest.fn(),
};

describe('Miner Module', () => {
    // Initialize a new mock miner instance for each test
    let mockMiner;

    beforeEach(() => {
        jest.mock('../src/block', () => ({
            block: jest.fn(),
            getHash: jest.fn()
        }));

        jest.mock('../src/mempool', () => ({
            getMempool: jest.fn(),
        }));

        jest.mock('../src/transaction', () => ({
            coinbase: jest.fn(),
            transaction: jest.fn(),
        }));

        jest.mock('../src/blockchain', () => ({
            getBlockchain: jest.fn(),
        }));

        mockMiner = new miner(1);
    });

    // Test case 1: hashString meets the mining target
    it('should return true when hashString meets the mining target', () => {
        // GIVEN
        hashing.stringToHex.mockReturnValue('0000abcdef');

        // WHEN
        const result = mockMiner.checkAgainstTarget('some-hash-string');

        // THEN
        expect(result).toBe(true);
    });

    // Test case 2: hashString does not meet the mining target
    it('should return false when hashString does not meet the mining target', () => {
        // GIVEN
        hashing.stringToHex.mockReturnValue('1234abcdef');

        // WHEN
        const result = mockMiner.checkAgainstTarget('some-hash-string');

        // THEN
        expect(result).toBe(false);
    });

    describe('mine', () => {
        // Test case 1: it mines
        it('should mine a block and insert it into the blockchain', () => {
            // GIVEN
            const topmostBlockMock = new block();
            const mempoolMock = { tx: [new transaction(), new coinbase()] };
            const blockchainMock = {
                getTopmostBlock: jest.fn().mockReturnValue(topmostBlockMock),
                insertBlock: jest.fn().mockReturnValue(true),
                getJson: jest.fn().mockReturnValue({}),
            };

            getBlockchain.mockReturnValue(blockchainMock);
            getMempool.mockReturnValue(mempoolMock);

            const miner = {
                publicKey: '1',
                checkAgainstTarget: jest.fn().mockReturnValue(true),
            };

            // WHEN
            mine.call(miner);

            // THEN
            expect(blockchainMock.getTopmostBlock).toHaveBeenCalled();
            expect(blockchainMock.insertBlock).toHaveBeenCalled();
            expect(blockchainMock.getJson).toHaveBeenCalled();
        });
    });
});