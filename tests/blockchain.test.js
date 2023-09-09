import { getBlockchain, Blockchain } from '../src/blockchain'; // Adjust the path as needed
import Block from "../src/block"
import transaction from "../src/transaction"

let miningTarget = 2

describe('Blockchain Module', () => {
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

    describe('isChainValid function', () => {
        it('should not receive inputs other than Blocks', () => {
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
                chain.checkAgainstTarget( "testString")};  
            expect(testString).toThrow("Invalid arguments");
        });
        it('should not receive hashes that dont comply with the miningTarget', () => {
            const testString = chain.checkAgainstTarget(miningTarget, "xxx");
            expect(testString).toBe(false);            
            const testString1 = chain.checkAgainstTarget(miningTarget, "0xxx");
            expect(testString1).toBe(false);            
        });
        it('should return success when a proper hash is used', () => {
            const hash = chain.checkAgainstTarget(miningTarget, "00xxx");
            expect(hash).toBe(true);          
        });
    })

    // describe('getUTXOs function', () => {
    //     it('should not receive inputs other than Blocks', () => {
    //     });
    // })

    
    // describe('isValidUTXO function', () => {
    //     it('should not receive inputs other than Blocks', () => {
    //     });
    // })

    describe('getJson function', () => {
        it('should return a string', () => {
            const jsons = chain.getJson();
            
            expect(jsons).toBeDefined();
            expect(typeof jsons).toBe('string');
        });
    })

});
