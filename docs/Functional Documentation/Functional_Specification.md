# SRS-001: Software Requirements & Functional Specification for Blockchain Implementation

## Status

Proposed (in review)

## Part 1: Purpose

Building a Blockchain functional prototype quickly and effectively.

1. Definitions

Blockchain: A distributed and decentralized digital ledger technology that maintains a tamper-evident and immutable record of transactions across a network of nodes.
Blocks: The continuously growing ordered records linked in a chain using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, transaction data, and a nonce.
Node: A participant in the blockchain network that maintains a copy of the entire blockchain and participates in transaction validation and consensus.
Consensus mechanism: A protocol used to achieve agreement among nodes in a distributed network, ensuring the validity and consistency of the blockchain.
Cryptography: Methods to secure communication and data in the presence of malicious third-parties known as adversaries. Encryption uses an algorithm and a key to transform an input (plaintext) into an encrypted output (ciphertext).

2. Background

The Zigurat Institute's Master's in Blockchain Technologies aims to provide students with a comprehensive understanding of blockchain principles, applications, and technical implementations. This Software Requirements Specification (SRS) pertains to a JavaScript codebase developed as a core part of the program's Technical Path. The codebase is designed to implement fundamental elements of a blockchain, including blocks and transaction handling, wallets, consensus mechanisms, cryptographic security, management of blocks and the blockchain itself, along with the main entry point to the app for users.

3. System Overview

The JavaScript codebase outlined in this Software Requirements Specification (SRS) represents a practical implementation of foundational blockchain components. As a critical learning resource within the Technical Path of the Master's in Blockchain Technologies, this codebase offers students the opportunity to gain hands-on experience with key concepts and principles of blockchain technology.

The primary objectives of this codebase are as follows:

Transaction Management: The codebase will facilitate the creation, validation, and inclusion of transactions in the blockchain. It will define transaction structures and ensure the integrity of data being added to the blockchain.

Consensus Mechanism: The codebase will implement a consensus algorithm that enables nodes in the network to agree on the state of the blockchain. This mechanism will ensure that all nodes have a consistent record of the ledger.

Cryptography: The codebase will utilize cryptographic techniques to secure transactions, ensure data privacy, and protect the integrity of the blockchain. It will also handle key generation, digital signatures, and validation.

Node Interaction: The codebase will enable nodes to interact within the blockchain network. This includes broadcasting transactions, participating in the consensus process, and maintaining a synchronized copy of the blockchain.

**Smart Contract Infrastructure: While not an exhaustive smart contract implementation, the codebase will provide a foundation for understanding the concept of smart contracts. It may include basic functions that mimic the behavior of smart contracts.** for module 9

By studying and working with this codebase, students will acquire practical insights into the inner workings of blockchain technology. They will develop a solid foundation for more advanced topics in the Master's program. This codebase serves as a stepping stone for future modules and projects that delve deeper into blockchain protocols and applications.

## Part 2: Overall Description


## Part 3: Specific Requirements

The codebase will be written in JavaScript as per decision made in [ADR-001](https://github.com/Zigurat-blockchain-masters/blockchain-core/blob/main/docs/Architectural%20Decision%20Records/adr-001-roman.md).

1. **Functional Description**

1.a. Cryptography

1.b. Blocks



1.c. Transactions

1.d Wallets

1.e Blockchain

1.f Entry point (main)

1.g Consensus mechanism

1.h networking

1.i Front-End

