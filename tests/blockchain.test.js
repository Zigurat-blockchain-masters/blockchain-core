
import { getBlockchain, Blockchain } from '../src/blockchain';
import Block from "../src/block"
import { Transaction } from "../src/transaction"
import { miningTarget } from '../src/CONFIG';

jest.mock('../src/transaction', () => {
    class MockTransaction {
      constructor(utxos, receiver_public_keys, messages, signature) {
        if (!Array.isArray(receiver_public_keys) || !Array.isArray(messages) ||
            receiver_public_keys.length !== messages.length || receiver_public_keys.length === 0 ||
            !Array.isArray(utxos) || utxos.length === 0) {
          throw new Error("Invalid input parameters");
        }
        this.utxos = utxos;
        this.receiverPublicKeys = receiver_public_keys;
        this.messages = messages;
        this.signature = signature;
        this.getHash = jest.fn(() => 'mockedHash');
      }
    }
  
    return {
      ...jest.requireActual('../src/transaction'), 
      Transaction: MockTransaction,
      genesisCoinbase: jest.fn(),
    };
  });

  
describe('Blockchain Module', () => {
    const mockGenesisCoinbase = 'mockedGenesisCoinbaseResult';
    require('../src/transaction').genesisCoinbase.mockReturnValue(mockGenesisCoinbase);
    const chain = getBlockchain();
        
    
    describe('getBlockchain function', () => {
        it('should return an instance of Blockchain', () => {
            expect(chain).toBeDefined();
            expect(chain).toBeInstanceOf(Blockchain);
        });
        it('should not create a new instance if there is an active one', () => {
            let newChain = getBlockchain();
            expect(newChain).toBe(chain);
        });
    });

    describe('insertBlock function', () => {
        it('should not receive inputs other than Blocks', () => {
            const newBlock = chain.insertBlock('test');
            expect(newBlock).toBe(false);
        });
        it('should throw an error for blocks with invalid transactions', () => {
            const insertInvalidBlock = () => {
                  chain.insertBlock(new Block("ZEvMflZDcwQJmarInnYi88px+6HZcv2Uoxw7+/JOOTg=", ["test"], 0));
                };  
                expect(insertInvalidBlock).toThrow("Invalid input parameters");
          });
    })


    describe('getLatestBlock function', () => {
        it('should return an instance of Block', () => {
            const block = chain.getLatestBlock();
            expect(block).toBeDefined();
            expect(block).toBeInstanceOf(Block);
        });
    });
    

    describe('checkAgainstTarget function', () => {
        it('should not receive inputs other than hashes', () => {
            const testString = chain.checkAgainstTarget(miningTarget, "testString");
            expect(testString).toBe(false);
        });
        it('should receive both arguments', () => {
            const testString = () => {
                chain.checkAgainstTarget("testString")
            };
            expect(testString).toThrow("Invalid arguments");
        });
        it('should fail with hashes that dont start with the miningTarget', () => {
          const testString = chain.checkAgainstTarget(miningTarget, "xxx");
          expect(testString).toBe(false);
        });
        it('should return success when a proper hash is used', () => {
            const hash = chain.checkAgainstTarget(miningTarget, "00xxx");
            expect(hash).toBe(true);
        });
    })


    describe('getUTXOs function', () => {
        it('should retrieve an array', () => {
            const tx = new Transaction(['tx_hash', 'public_key', 'message'], ['0x12345'], ['messages'], 'signature');
            const block = new Block('hash_previous_block', [tx], 'nonce');
            chain.chain.push(block);
            const utxos = chain.getUTXOs('0x12345');
            expect(utxos).toHaveLength(1);
        });
    });
    

    describe('getJson function', () => {
        it('should return a string', () => {
            const jsons = chain.getJson();

            expect(jsons).toBeDefined();
            expect(typeof jsons).toBe('string');
        });
    })
    
});
