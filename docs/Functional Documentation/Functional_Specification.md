# SRS-001: Software Requirements & Functional Specification for Blockchain Implementation

## Status

Proposed (in progress)

## Part 1: Purpose

Building a Blockchain functional prototype quickly and effectively.

#### Definitions

1.  _**Blockchain:**_ A distributed and decentralized digital ledger technology that maintains a tamper-evident and immutable record of transactions across a network of nodes.
2.  _**Blocks:**_ The continuously growing ordered records linked in a chain using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, transaction data, and a nonce.
3.  _**Node:**_ A participant in the blockchain network that maintains a copy of the entire blockchain and participates in transaction validation and consensus.
4.  _**Consensus mechanism:**_ A protocol used to achieve agreement among nodes in a distributed network, ensuring the validity and consistency of the blockchain.
5.  _**Cryptography:**_ Methods to secure communication and data in the presence of malicious third-parties known as adversaries. Encryption uses an algorithm and a key to transform an input (plaintext) into an encrypted output (ciphertext).
6.  _**UTXO:**_ The abbreviation "UTXO" typically stands for "Unspent Transaction Output" and is commonly used in blockchain systems. A UTXO represents a certain amount of cryptocurrency that has been authorized by a sender and is available to be spent by a recipient. https://en.wikipedia.org/wiki/Unspent_transaction_output

#### Background

The Zigurat Institute's Master's in Blockchain Technologies aims to provide students with a comprehensive understanding of blockchain principles, applications, and technical implementations. This Software Requirements Specification (SRS) pertains to a JavaScript codebase developed as a core part of the program's Technical Path. The codebase is designed to implement fundamental elements of a blockchain, including blocks and transaction handling, wallets, consensus mechanisms, cryptographic security, management of blocks and the blockchain itself, along with the main entry point to the app for users.

#### System Overview

The JavaScript codebase outlined in this Software Requirements Specification (SRS) represents a practical implementation of foundational blockchain components. As a critical learning resource within the Technical Path of the Master's in Blockchain Technologies, this codebase offers students the opportunity to gain hands-on experience with key concepts and principles of blockchain technology.

The primary objectives of this codebase are as follows:

- _**Transaction Management:**_ The codebase will facilitate the creation, validation, and inclusion of transactions in the blockchain. It will define transaction structures and ensure the integrity of data being added to the blockchain.
- _**Consensus Mechanism:**_ The codebase will implement a consensus algorithm that enables nodes in the network to agree on the state of the blockchain. This mechanism will ensure that all nodes have a consistent record of the ledger.
- _**Cryptography:**_ The codebase will utilize cryptographic techniques to secure transactions, ensure data privacy, and protect the integrity of the blockchain. It will also handle key generation, digital signatures, and validation.
- _**Node Interaction:**_ The codebase will enable nodes to interact within the blockchain network. This includes broadcasting transactions, participating in the consensus process, and maintaining a synchronized copy of the blockchain.

#### Smart Contract Infrastructure

While not an exhaustive smart contract implementation, the codebase will provide a foundation for understanding the concept of smart contracts. It may include basic functions that mimic the behavior of smart contracts for module 9.

By studying and working with this codebase, students will acquire practical insights into the inner workings of blockchain technology. They will develop a solid foundation for more advanced topics in the Master's program. This codebase serves as a stepping stone for future modules and projects that delve deeper into blockchain protocols and applications.

## Part 2: Overall Description

## Part 3: Specific Requirements

The codebase will be written in JavaScript as per decision made in [ADR-001](https://github.com/Zigurat-blockchain-masters/blockchain-core/blob/main/docs/Architectural%20Decision%20Records/adr-001-roman.md).

### Functional Description

#### 1.1 Cryptography

**Modules called:**

- Cryptography functions for key generation and management

**Functions:**

1. `generate_password`
   - Input: none
   - Output: password (string)
   - Purpose: Generates a random password for cryptographic operations.
   - Error handling: None required.


2. `generate_key_pair`
   - Input: none
   - Output: private key, public key
   - Purpose: Generates a pair of cryptographic keys (private and public).
   - Error handling: None required.

3. `generate_pem`
   - Input: private key, password
   - Output: PEM-encoded private key
   - Purpose: Generates a PEM-encoded private key with password protection.
   - Error handling: Validate inputs are not empty or invalid. Handle errors for invalid private key or password.

4. `generate_public_pem`
   - Input: public key
   - Output: PEM-encoded public key
   - Purpose: Generates a PEM-encoded public key.
   - Error handling: Validate input is not empty or invalid. Handle errors for invalid public key.

5. `load_public_key`
   - Input: public PEM
   - Output: public key
   - Purpose: Loads a public key from a PEM-encoded string.
   - Error handling: Validate input is not empty or invalid. Handle errors for invalid public PEM.

6. `load_private_key`
   - Input: private PEM, password
   - Output: private key
   - Purpose: Loads a private key from a PEM-encoded string with password.
   - Error handling: Validate inputs are not empty or invalid. Handle errors for invalid private PEM or password.


7. `generate_private_pem_string`
   - Input: password string
   - Output: private PEM string
   - Purpose: Generates a private key, PEM-encodes it with password, and returns as a string.
   - Error handling: Validate input password string is not empty or invalid. Handle errors for invalid password.


8. `generate_public_pem_string`
   - Input: private PEM string, password
   - Output: public PEM string
   - Purpose: Generates a public key from a private key, PEM-encodes it, and returns as a string.
   - Error handling: Validate inputs are not empty or invalid. Handle errors for invalid private PEM or password.


9. `sign`
   - Input: private PEM string, password, message
   - Output: signature (base64 encoded)
   - Purpose: Signs a message using a private key and password, returning the signature as a base64-encoded string.
   - Error handling: Validate inputs are not empty or invalid. Handle errors for invalid private PEM, password, or message.


10. `verify`
    - Input: public PEM string, signature, message
    - Output: boolean
    - Purpose: Verifies the authenticity of a signature for a given message using a public key and the original message.
    - Error handling: Validate inputs are not empty or invalid. Handle errors for invalid public PEM, signature, or message.



#### 1.2 Blocks

<br>

##### 1.2.a "Block" class

**Modules called:**

1. JSON encoder module
2. Module that provides a hash function:
   - encode string to UTF-8
   - hash object
   - encode to base64
   - decode to UTF-8

**Attributes:**

- Hash from previous block (binary string)
- Transactions
- Nonce

**Methods:**

1. `Get Dictionary`
   - Input: acts on Block
   - Output: Dictionary
   - Purpose: constructs and returns a dictionary containing the necessary data from the block: a list of hashes of transactions (transaction_hashes), the hash of the previous block (hash_previous_block), and the nonce (nonce).
   - Error handling: None   

2. `Get hash`
   - Input: acts on Block
   - Output: hashed JSON data
   - Purpose: This method calculates the current block's hash by first converting the block's data into a dictionary using the Get Dictionary method, then serializing that dictionary to a JSON-formatted string, and finally hashing the JSON string using the imported hash function. The resulting hash is the one associated with the current block.
   - Error handling: None

##### 1.2.b Generation of the Genesis block with an initial value of Hash, Transaction, Nonce

<br>

#### 1.3 Transactions

##### 1.3.a "UTXO" class

This code defines a UTXO class representing a type of transaction output commonly used in blockchain systems. The class has methods to obtain the UTXO's attributes as a dictionary and to calculate a hash value based on these attributes.

**Modules called:**

1. JSON encoder module
2. Module that provides a hash function:
   - encode string to UTF-8
   - hash object
   - encode to base64
   - decode to UTF-8

**Attributes:**

- Hash of transaction
- Public key
- Message

**Methods:**

1. `Get Dictionary`
   - Input: acts on UTXO
   - Output: Dictionary (originally: Python format)
   - Purpose: This method returns a dictionary containing the UTXO's attributes (tx_hash, public_key, and message) as key-value pairs. The method creates the dictionary using the current instance's attribute values.
   - Error handling: None

2. `Get Hash`
   - Input: acts on UTXO
   - Output: hashed value of UTXO's dictionary
   - Purpose: This method calculates a hash value for the dictionary representation of the UTXO. It calls the Get Dictionary (see 1. above) method to obtain the UTXO's attribute dictionary. It then converts the dictionary to a JSON string using json.dumps. The resulting JSON string is passed to the hashing.hash function (provided by the hashing module) to compute a hash value. The calculated hash value is returned as the result of the Get Hash method.
   - Error handling: None

##### 1.3.b "Unsigned Transaction" class

This code defines a Unsigned Transaction class for managing transactions in an unsigned state. It includes methods for generating a dictionary and JSON representation of the transaction data, calculating a hash, and signing the transaction with a digital signature. 

**Modules called:**

1. JSON encoder module
2. Module that provides a hash function:
   - encode string to UTF-8
   - hash object
   - encode to base64
   - decode to UTF-8
3. UTXO classes

**Attributes:**

The constructor takes several parameters:
   - UTXOs
   - receiver's public keys
   - messages

The constructor performs a series of assertions to ensure that the provided data meets certain conditions:
   - receiver's public keys and messages must be lists of the same length, both with a length greater than 0.
   - UTXOs must be a list of non-zero length containing instances of the UTXO class.
   - All UTXOs in the UTXOs list must have the same public key.
If the provided data passes these assertions, the constructor sets instance variables for the transaction.

**Methods:**

1. `Get Dictionary`
   - Input: acts on Transaction
   - Output: Dictionary (originally: Python format)
   - Purpose: This method converts the transaction's attributes into a dictionary format, which includes information about UTXOs, receiver public keys, and messages. It iterates through the utxos list and converts each UTXO into a dictionary using the Get Dictionary method of the UTXO class. The resulting dictionary contains the UTXO data, receiver public keys, and messages.
   - Error handling: None

2. `Get JSON`
   - Input: acts on Transaction
   - Output: JSON-formatted string
   - Purpose: This method converts the dictionary obtained from Get Dictionary method into a JSON-formatted string using json.dumps.
   - Error handling: None

3. `Get Hash`
   - Input: acts on Transaction
   - Output: hashed value of Get JSON result
   - Purpose: This method calculates a hash value for the JSON-formatted transaction data obtained from Get JSON.
   - Error handling: None

4. `Sign`
   - Input: Private Key and Password
   - Output: Signature
   - Purpose: It calculates the hash of the transaction using the Get Hash method. It then calls the crypto.sign function to create a digital signature of the transaction hash using the provided private key and password. The resulting signature is returned.
   - Error handling: Validate input private key and password strings are not empty or invalid. Handle errors for invalid key or password.


##### 1.3.c "Transaction" class

This code defines a Transaction class for managing and validating transactions involving UTXOs, digital signatures, and transaction data. The class includes methods to generate various representations of the transaction and to check its validity.

**Modules called:**

1. JSON encoder module
2. Module that provides a hash function:
   - encode string to UTF-8
   - hash object
   - encode to base64
   - decode to UTF-8
3. UTXO classes

**Attributes:**

The constructor takes several parameters:
   - UTXOs
   - receiver's public keys
   - messages
   - signature

The constructor performs a series of assertions to ensure that the provided data meets certain conditions:
   - receiver's public keys and messages must be lists of the same length, both with a length greater than 0.
   - UTXOs must be a list of non-zero length containing instances of the UTXO class.
   - All UTXOs in the UTXOs list must have the same public key.
If the provided data passes these assertions, the constructor sets instance variables for the transaction.

**Methods:**

1. `Get Dictionary`
   - Input: acts on Transaction
   - Output: Dictionary (originally: Python format)
   - Purpose: This method converts the transaction's attributes into a dictionary format, which includes information about UTXOs, receiver public keys, and messages. It iterates through the utxos list and converts each UTXO into a dictionary using the Get Dictionary method of the UTXO class. The resulting dictionary contains the UTXO data, receiver public keys, and messages.
   - Error handling: None

2. `Get JSON`
   - Input: acts on Transaction
   - Output: JSON-formatted string
   - Purpose: This method converts the dictionary obtained from Get Dictionary method into a JSON-formatted string using json.dumps.
   - Error handling: None

3. `Get Hash`
   - Input: acts on Transaction
   - Output: hashed value of Get JSON result
   - Purpose: This method calculates a hash value for the JSON-formatted transaction data obtained from Get JSON.
   - Error handling: None

4. `Get full JSON`
   - Input: acts on Transaction
   - Output: JSON-formatted dictionary
   - Purpose: This method builds upon the data from Get Dictionary by adding the signature attribute to the dictionary. The resulting dictionary is converted to a JSON-formatted string using json.dumps.
   - Error handling: None

5. `Validity Check`
   - Input: acts on Transaction
   - Output: Boolean
   - Purpose: This method checks the validity of the transaction. It uses the crypto.verify function to verify the digital signature of the transaction, which involves using the public key of the first UTXO and the calculated hash of the transaction. It calculates the total amount spent (sum of messages) and the total balance from the UTXOs (sum of message attribute of each UTXO). It checks if the balance is equal to the spent amount, ensuring that the transaction doesn't spend more than it has. The method returns True if the signature is valid and the amounts match, otherwise False.
   - Error handling: None

##### 1.3.d "Coinbase" class

This code defines a Coinbase class that represents a Coinbase transaction in a cryptocurrency system. Coinbase transactions reward miners with a specific amount of cryptocurrency for successfully mining a new block. This class provides methods for generating a dictionary and JSON representation of the coinbase transaction data, calculating a hash, and indicating that the transaction is always valid.

**Modules called:**

1. JSON encoder module
2. Module that provides a hash function:
   - encode string to UTF-8
   - hash object
   - encode to base64
   - decode to UTF-8
3. UTXO classes

**Attributes:**

The constructor takes one parameter:
   - receiver: which represents the public key of the receiver of the mining reward

It initializes two instance variables:
   - receiver_public_keys: A list containing the receiver's public key. In Coinbase transactions, there's typically only one receiver.
   - messages: A list containing the amount of the reward. In the original code, it is set to [50], which typically represents a 50-unit reward in the cryptocurrency (e.g., 50 bitcoins in Bitcoin).

**Methods:**

1. `get_hash`
   - Input: self
   - Output: hash of JSON-formatted Dictionary (originally: Python format)
   - Purpose: This method calculates a hash value for a JSON representation of the transaction data.
   It constructs a dictionary containing the receiver's public key and the reward amount. It converts this dictionary into a JSON-formatted string using json.dumps. Finally, it calculates the hash of this JSON string using the hashing.hash function and returns the result.
   - Error handling: None

2. `is_valid`
   - Input: self
   - Output: boolean
   - Purpose: This method always returns True. 
   - Error handling: None

3. `get_dict`
   - Input: self
   - Output: Dictionary
   - Purpose: This method constructs a dictionary containing the receiver's public key and the reward amount. It returns this dictionary.
   - Error handling: None

4. `get_json`
   - Input: self
   - Output: JSON-formatted dictionary
   - Purpose: This method converts the dictionary obtained from get_dict into a JSON-formatted string using json.dumps. It returns the JSON-formatted string.
   - Error handling: None


#### 1.4 Wallets

**Modules called:**
   - Crypto functions that generate private key, public key, and pem 


**Methods:**
1. Initialization: 
   - Input: -
   - Ouput: pair of private_key and password 
   - Purpose: Creates a pair of private_key and password and saves it locally in a json format

2. send_money: 
   - Inputs: receiver_public_keys, msg

   - Output: -
   - Purpose: Creates a tx and inserts it in the mempool

3. get_utxos: 

   - Input: money (in wallet)
   - Ouput: list of utxos needed
   - Purpose: Gets a list of utxos and checks their validity

4. create_tx:

   - Inputs: utxos, receiver_public_key, msg
   - Output: singed(tx)
   - Purpose: Creates an unsigned tx which is then signed and returned

5. insert_to_mempool: 

   - Input: tx
   - Output: -
   - Purpose: Inserts a singed tx on the mempool

6. save_to_file: 

   - Input: private_key & password in a json data object
   - Output: json file with private_key & password 
   - Purpose: Saves the created private_key + password locally in a json file

7. load_from_file: 

   - Input: saved json private_key + password
   - Output: -
   - Purpose: Provides the ability to load a saved pair of private_key and password in json format

#### 1.5 Blockchain


**Modules called:**

1. JSON encoder module
2. hashing, to verify validity of a block
3. config, brings the target used by mining (difficulty)
4. block, to verify validity, append to blockchain and generate history
5. genesis, to generate initial block
6. tx, validation
7. utxo, validation


**Attributes:**

* Genesis block

**Methods:**

1. get_blockchain
   * Input: none
   * Output: boolean
   * Purpose: returns current active blockchain or creates a new one.


2. insert block
   * Input: block
   * Output: boolean
   * Purpose: Appends a new block to the blockchain, after validating that the block itself is valid, as well as its transactions and UTXOs.


3. check against target 
   * Input: acts on blockchain (self), receives a hash_string 
   * Output: boolean
   * Purpose: checks whether or not a block 's hash_string is fulfills the requested difficulty by confirming a specified amount of zeroes at the beginning of its hash.


4. get UTXOs 
   * Input: acts on blockchain (self), receives a pk (public key)
   * Output: array of UTXOs (object, unspent outputs)
   * Purpose: returns a list of all UTXOs by public key.


5. get topmost block
   * Input: acts on blockchain (self)
   * Output: returns a block object
   * Purpose: Used by the mining module to receive the most recent block appended to the blockchain.


6. is valid UTXO
   * Input: acts on blockchain (self), receives a UTXO
   * Output: boolean
   * Purpose: validates a UTXO by confirming that the UTXO is valid. Confirms that it's not present in the blockchain (double spending)


7. get json
   * Input: acts on blockchain (self)
   * Output: array of Jsons
   * Purpose: Returns all appended blocks in the blockchain thus far

#### 1.6 Entry point (main)

#### 1.7 Consensus mechanism

##### 1.7.c "Mempool" class

**Modules called:**

1. Transaction

**Attributes:**

1. An array of transactions
2. The global mempool

**Methods:**

1. Get Mempool

   - Initiates the mempool if it is null.
   - Returns the global mempool.

2. Insert Transaction
   - Checks if the TX is a transaction.
   - Checks if the transaction is valid.

##### 1.7.b "Miner" class

**Modules called:**

1. Hashing & random and everything from the CONFIG
2. Mempool -> To get the mempool
3. Blockchain -> To get the blockchain
4. Block -> To get the block definition
5. Transaction -> To get the coinbase & transaction

**Attributes:**

None

**Methods:**

1. Init

   - Starts the miner node with a public key

2. Check against target

   - Checks whether the hash is correct to cement a new block

3. Mine
   - Adds transactions from the mempool to a new block with a random integer value.
   - Continuously checks whether the hash extends the current blockchain.
   - If successful the block with transactions are added (cemented) on the blockchain and the process starts again.

##### 1.7.c The mechanism

**Choices**

1. Proof of Work - As implemented in the python example and defined in chapter 1.7.a / b

   - The miner class takes transactions from the memory pool and checks whether they are valid transactions according to the nonce used. If valid, the TXs are added to the newly mined block and cemented on the chain.

2. Proof of Stake
   - It is entirely possible to pick another consensus mechanism such as PoW for the new implementation.

#### 1.8 Networking

#### 1.9 Front-End
