import Wallet from '../src/Wallet'; // Import your Wallet class from the appropriate path
import { getMempool } from '../src/Mempool'; // Import the getMempool function from the appropriate path
import { getBlockchain } from '../src/Blockchain'; // Import the getBlockchain function from the appropriate path

jest.mock('fs'); // Mock the fs module to simulate file operations

describe('Wallet', () => {
    let wallet;

    describe('Constructor', () => {
        it('should initialize with privateKey and password when a private key file exists', () => {
            // Ensure that the wallet instance is properly initialized when a private key file exists
            expect(wallet.privateKey).toBeDefined();
            expect(wallet.password).toBeDefined();
        });

        it('should generate privateKey and password when a private key file does not exist', () => {
            // Mock the existsSync function to simulate the file not existing
            const existsSyncMock = jest.spyOn(require('fs'), 'existsSync');
            existsSyncMock.mockReturnValue(false);

            wallet = new Wallet();

            // Ensure that the wallet instance is properly initialized when a private key file does not exist
            expect(wallet.privateKey).toBeDefined();
            expect(wallet.password).toBeDefined();

            existsSyncMock.mockRestore(); // Restore the original existsSync function
        });
    });

    describe('sendMoney', () => {
        it('should send money and insert a transaction into the mempool', () => {
            const receiverPks = ['receiverPublicKey'];
            const msgs = [10, 20, 30];

            wallet.sendMoney(receiverPks, msgs);

            // Check if the money was sent properly and a transaction was added to the mempool
            const mempool = getMempool(); // Mocked mempool object
            expect(mempool.transactions.length).toBe(1);
        });
    });

    describe('getUTXOs', () => {
        it('should properly fetch and filter UTXOs', () => {
            // Mock the blockchain object and its getUTXOs method
            const blockchain = getBlockchain(); // Mocked blockchain object
            const utxos = [
                { amount: 10, publicKey: wallet.publicKey },
                { amount: 20, publicKey: wallet.publicKey },
            ];

            jest.spyOn(blockchain, 'getUTXOs').mockReturnValue(utxos);

            const money = 15;
            const utxosResult = wallet.getUTXOs(money);

            // Ensure that the correct UTXOs were returned
            expect(utxosResult.length).toBe(2);
            expect(utxosResult[0].amount).toBe(10);
            expect(utxosResult[1].amount).toBe(20);
        });
    });

    describe('createTransaction', () => {
        it('should properly create a transaction', () => {
            const utxos = [];
            const receiverPks = ['receiverPublicKey'];
            const msgs = [10, 20, 30];

            const tx = wallet.createTransaction(utxos, receiverPks, msgs);

            // Ensure that the transaction was created properly
            expect(tx).toBeDefined();
            expect(tx.utxos).toEqual(utxos);
            expect(tx.receiverPublicKey).toEqual(receiverPks);
            expect(tx.messages).toEqual(msgs);
            expect(tx.Signature).toBeDefined();
        });
    });

    describe('insertToMempool', () => {
        it('should insert a transaction into the mempool', () => {
            const tx = {}; // Mocked transaction object
            wallet.insertToMempool(tx);

            // Ensure that the transaction was inserted properly into the mempool
            const mempool = getMempool(); // Mocked mempool object
            expect(mempool.transactions.length).toBe(1);
            expect(mempool.transactions[0]).toBe(tx);
        });
    });

    describe('saveToFile', () => {
        it('should save data to a file', () => {
            const writeFileSyncMock = require('fs').writeFileSync;

            wallet.saveToFile();

            // Ensure that the file was written properly
            // You can use Jest's mocking to check if writeFileSync was called with the correct arguments
            expect(writeFileSyncMock).toHaveBeenCalledWith(
                'private_key.json',
                JSON.stringify({ privateKey: wallet.privateKey, password: wallet.password })
            );
        });
    });

    describe('loadFromFile', () => {
        it('should load data from a file', () => {
            // Mock the fs.readFileSync function to simulate reading a file
            const readFileSyncMock = require('fs').readFileSync;
            readFileSyncMock.mockReturnValue(JSON.stringify({ privateKey: 'loadedPrivateKey', password: 'loadedPassword' }));

            const loadedData = wallet.loadFromFile();

            // Ensure that data was loaded and parsed correctly
            expect(loadedData.privateKey).toBe('loadedPrivateKey');
            expect(loadedData.password).toBe('loadedPassword');
        });
    });
});