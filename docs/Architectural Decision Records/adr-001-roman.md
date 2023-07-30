# ADR-001: Choice of Programming Language and libraries for Blockchain Implementation

## Status

<!--- Proposed | Accepted | Deprecated | Declined | Superseded --->

Proposed 💡(in review)


## Context

Our team is working on implementing a simple blockchain to explore the basic components and concepts of blockchain technology. The primary goal is to build a functional prototype quickly and effectively.

## Decision

After evaluating different programming languages, the proposed decision is to use **JavaScript** for implementing the blockchain.


## Consideration of Alternative Languages

While JavaScript is an excellent choice for simplicity and rapid prototyping, we have also considered **Rust** and **C++** as alternative languages for implementing the blockchain. Both Rust and C++ offer high performance, low-level control, and enhanced security, making them ideal choices for blockchain projects with stringent performance and security requirements.

**Rust** stands out for its focus on safety, memory safety guarantees, and zero-cost abstractions. It offers strong support for concurrent programming, which is valuable in blockchain applications with multiple nodes and transactions.

**C++** provides efficient memory management and extensive libraries, allowing for fine-tuning performance-critical components in the blockchain application.

However, we have decided to proceed with JavaScript due to its ease of use, quick prototyping capabilities, and our project's focus on simplicity and exploration of blockchain concepts.

## Consequences

By choosing JavaScript, we prioritize quick development and simplicity, enabling us to build a functional prototype of the blockchain efficiently. However, we may experience some performance limitations compared to low-level languages like Rust or C++. If the project requires scalability and performance improvements, we may consider optimizing performance-critical parts of the blockchain with Rust or C++ modules while retaining the overall application logic in JavaScript.


## Libraries Used

The following JavaScript libraries will be used for implementing the simple blockchain:

1. **crypto-js**: For cryptographic operations like hashing.
2. **express**: To create an HTTP server for blockchain interaction.
3. **body-parser**: For parsing JSON data in HTTP requests.
4. **uuid**: To generate unique identifiers for transactions and blocks.


When UI interface is required, we will use the following libraries:

1. **react**: For building the UI.
2. **react-bootstrap**: For styling the UI.
3. **react-router-dom**: For routing between different pages in the UI.
4. **axios**: For making HTTP requests to the blockchain server.


## Additional Notes

It is essential to conduct thorough testing and security audits of the blockchain implementation to ensure its stability and security. The choice of language does not affect the rigorous testing and security practices that we will adhere to during the development process.

For detailed descriptions of Rust and C++ as alternative languages, please refer to the sections on "Consideration of Alternative Languages" in the project documentation.
