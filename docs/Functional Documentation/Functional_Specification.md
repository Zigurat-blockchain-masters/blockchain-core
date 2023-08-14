# SRS-001: Software Requirements & Functional Specification for Blockchain Implementation

## Status

Proposed (in progress)

## Part 1: Purpose

Building a Blockchain functional prototype quickly and effectively.

#### Definitions
   1. _**Blockchain:**_ A distributed and decentralized digital ledger technology that maintains a tamper-evident and immutable record of transactions across a network of nodes.
   2. _**Blocks:**_ The continuously growing ordered records linked in a chain using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, transaction data, and a nonce.
   3. _**Node:**_ A participant in the blockchain network that maintains a copy of the entire blockchain and participates in transaction validation and consensus.
   4. _**Consensus mechanism:**_ A protocol used to achieve agreement among nodes in a distributed network, ensuring the validity and consistency of the blockchain.
   5. _**Cryptography:**_ Methods to secure communication and data in the presence of malicious third-parties known as adversaries. Encryption uses an algorithm and a key to transform an input (plaintext) into an encrypted output (ciphertext).

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
1. Get Dictionary
   - Input: acts on Block
   - Output: Dictionary
   - Purpose: constructs and returns a dictionary containing the necessary data from the block: a list of hashes of transactions (transaction_hashes), the hash of the previous block (hash_previous_block), and the nonce (nonce).
2. Get hash
   - Input: acts on Block
   - Output: hashed JSON data
   - Purpose: This method calculates the current block's hash by first converting the block's data into a dictionary using the Get Dictionary method, then serializing that dictionary to a JSON-formatted string, and finally hashing the JSON string using the imported hash function. The resulting hash is the one associated with the current block.


##### 1.2.b Generation of the Genesis block with an initial value of Hash, Transaction, Nonce
<br>

#### 1.3 Transactions

#### 1.4 Wallets

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

#### 1.8 Networking

#### 1.9 Front-End
