# Trust-Code

Trust-Code is an Ethereum smart contract written in Solidity. Its main purpose is to record and certify code security audits.

## Features

-   **Audit Registration**: Auditors can record audit results, including the number of vulnerabilities found and the severity of each vulnerability.
-   **Audit Certification**: Auditors can certify audit results. Once certified, an audit cannot be modified.
-   **Auditor Management**: Only the contract owner can add new auditors. Only approved auditors can record and certify audits.

## Data Structure

The audit is represented as a structure with the following fields:

-   `id`: A unique identifier for the audit.
-   `auditor`: The Ethereum address of the auditor who performed the audit.
-   `company`: The company that performed the audit.
-   `project`: The project that was audited.
-   `startDate`: The start date of the audit.
-   `endDate`: The end date of the audit.
-   `vulnerabilitiesFound`: The number of vulnerabilities found during the audit.
-   `githubCommit`: The GitHub commit that the audit was performed on.
-   `highSeverity`: The number of high severity vulnerabilities found.
-   `mediumSeverity`: The number of medium severity vulnerabilities found.
-   `lowSeverity`: The number of low severity vulnerabilities found.
-   `certified`: A flag indicating whether the audit has been certified.

## Installation and Use

To use this smart contract, you need to have an Ethereum environment set up, such as Truffle or Hardhat. After cloning the repository, you can deploy the contract to the Ethereum network of your choice using the appropriate migration command for your environment.

## License

This project is released under the Apache-2.0 license.
