import Miner from "../src/miner";
const hashing = require('../src/hashing');

// import { Miner as miner } from "../src/miner";
import { Block as block } from "../src/block";
import { Blockchain as blockchain, getBlockchain } from "../src/blockchain";
import { Mempool as mempool } from"../src/mempool";

describe('Miner Module', () => {

    let miner;
    let block;
    let blockchain;
    let mempool;

    beforeEach(() => {
        jest.mock('../src/block', () => ({
            Block: jest.fn() }));

        jest.mock('../src/blockchain', () => ({
            blockchain: jest.fn(),
            getBlockchain: jest.fn() }));

        jest.mock('../src/mempool', () => ({
            mempool: jest.fn() }));

        miner = new Miner('123');
    });

    it('should initiate', () => {
        expect(miner.publicKey).toBeDefined();
    });

    it('should call mine() method when an instance is created', () => {
        // Spy on the mine() method
        const mineSpy = jest.spyOn(Miner.prototype, 'mine');

        // Expect the mine() method to have been called
        expect(mineSpy).toHaveBeenCalled();

        // Restore the original implementation of mine() after the test
        mineSpy.mockRestore();
    });

    // Create a test suite for checkAgainstTarget
    describe('checkAgainstTarget', () => {
        // HAPPYFLOW
        it('should return true if the hash starts with "0"', () => {
            // Mock the stringToHex function to return a string that starts with "0"
            const mockStringToHex = jest.spyOn(hashing, 'stringToHex');
            mockStringToHex.mockReturnValue('012345');

            const instance = new Miner();
            const result = instance.checkAgainstTarget('someInput');

            expect(result).toBe(true);

            // Restore the original implementation of stringToHex
            mockStringToHex.mockRestore();
        });

        // BADFLOW
        it('should return false if the hash does not start with "0"', () => {
            // Mock the stringToHex function to return a string that does not start with "0"
            const mockStringToHex = jest.spyOn(hashing, 'stringToHex');
            mockStringToHex.mockReturnValue('abcdef');

            const instance = new Miner();
            const result = instance.checkAgainstTarget('someInput');

            expect(result).toBe(false);

            // Restore the original implementation of stringToHex
            mockStringToHex.mockRestore();
        });
    });
});