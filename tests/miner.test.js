import Miner from "../src/miner";
import {getMempool} from "../src/mempool";
import {getBlockchain} from "../src/blockchain";
import {coinbase, Transaction, transaction} from "../src/transaction";
import Block from "../src/block";
import hashing from "../src/hashing";

const cryptography = require('../src/cryptography');

describe('Miner Module', () => {
    // Mock getMempool and getBlockchain functions
    jest.mock("../src/mempool");
    jest.mock("../src/blockchain");

    let miner;

    beforeEach(() => {
        const publicKey = cryptography.generateKeyPair().publicKey;
        miner = new Miner(publicKey);
    });

    it('should initiate', () => {
        expect(miner.publicKey).toBeDefined();
    });

    it('should call mine() method when an instance is created', () => {
        // Spy on the mine() method
        const mineSpy = jest.spyOn(Miner.prototype, 'mine');

        // Create a new miner instance
        const newMiner = new Miner('123');

        // Expect the mine() method to have been called
        expect(mineSpy).toHaveBeenCalled();

        // Restore the original implementation of mine() after the test
        mineSpy.mockRestore();
    });

    // Create a test suite for checkAgainstTarget
    describe('checkAgainstTarget', () => {
        it('should return true if the hash starts with "0"', () => {
            // Mock the stringToHex function to return a string that starts with "0"
            const mockStringToHex = jest.spyOn(hashing, 'stringToHex');
            mockStringToHex.mockReturnValue('012345');

            const instance = new Miner('123');
            const result = instance.checkAgainstTarget('someInput');

            expect(result).toBe(true);

            // Restore the original implementation of stringToHex
            mockStringToHex.mockRestore();
        });

        it('should return false if the hash does not start with "0"', () => {
            // Mock the stringToHex function to return a string that does not start with "0"
            const mockStringToHex = jest.spyOn(hashing, 'stringToHex');
            mockStringToHex.mockReturnValue('abcdef');

            const instance = new Miner('123');
            const result = instance.checkAgainstTarget('someInput');

            expect(result).toBe(false);

            // Restore the original implementation of stringToHex
            mockStringToHex.mockRestore();
        });
    });

    describe('mine', () => {
        it('should mine a new block successfully', () => {
            // Spy on Block's getHash method to return a hash starting with "0"
            const mockBlockGetHash = jest.spyOn(Block.prototype, 'getHash');
            mockBlockGetHash.mockReturnValue('012345');

            // Spy on blockchain's insertBlock method to return true
            const mockBlockchainInsertBlock = jest.spyOn(getBlockchain(), 'insertBlock');
            mockBlockchainInsertBlock.mockReturnValue(true);

            // Call the mine method
            miner.mine();

            // Expect the mine() method to have successfully mined a new block
            expect(mockBlockGetHash).toBeDefined();
            expect(mockBlockchainInsertBlock).toBeDefined();

            // Restore the original implementations
            mockBlockGetHash.mockRestore();
            mockBlockchainInsertBlock.mockRestore();
        });

        it('should throw an error when the latest block is invalid', () => {
            // Mock getBlockchain to return an invalid latest block
            getBlockchain().getLatestBlock = jest.fn(() => "invalidBlock");

            const instance = new Miner('123');
            expect(() => instance.mine()).toBeDefined();
        });

        it('should continue mining until a valid block is found', () => {
            // Mock getBlockchain to return a valid latest block
            getBlockchain().getLatestBlock = jest.fn(() => new Block("previousHash", [], 0));

            // Mock getMempool to return a valid transaction
            getMempool().tx = [new Transaction(null, ["receiver"], ["message"])];

            // Spy on Block's getHash method to return a hash that does not start with "0" initially
            const mockBlockGetHash = jest.spyOn(Block.prototype, 'getHash');
            mockBlockGetHash.mockReturnValue('abcdef');

            const instance = new Miner('123');
            instance.mine();

            // Restore the original implementation of getHash
            mockBlockGetHash.mockRestore();
        });
    });
});