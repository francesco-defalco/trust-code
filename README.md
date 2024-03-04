# Trust-Code

Trust-Code è uno smart contract Ethereum scritto in Solidity. Il suo scopo principale è di registrare e certificare gli audit di sicurezza del codice.

## Funzionalità

-   **Registrazione degli audit**: Gli auditor possono registrare i risultati degli audit, inclusi il numero di vulnerabilità trovate e la gravità di ciascuna vulnerabilità.
-   **Certificazione degli audit**: Gli auditor possono certificare i risultati degli audit. Una volta certificato, un audit non può essere modificato.
-   **Gestione degli auditor**: Solo l'owner del contratto può aggiungere nuovi auditor. Solo gli auditor approvati possono registrare e certificare gli audit.

## Struttura dei dati

L'audit è rappresentato come una struttura con i seguenti campi:

-   `id`: Un identificatore univoco per l'audit.
-   `auditor`: L'indirizzo Ethereum dell'auditor che ha eseguito l'audit.
-   `company`: La società che ha eseguito l'audit.
-   `project`: Il progetto che è stato auditato.
-   `startDate`: La data di inizio dell'audit.
-   `endDate`: La data di fine dell'audit.
-   `vulnerabilitiesFound`: Il numero di vulnerabilità trovate durante l'audit.
-   `githubCommit`: Il commit di GitHub su cui è stato effettuato l'audit.
-   `highSeverity`: Il numero di vulnerabilità di alta gravità trovate.
-   `mediumSeverity`: Il numero di vulnerabilità di media gravità trovate.
-   `lowSeverity`: Il numero di vulnerabilità di bassa gravità trovate.
-   `certified`: Un flag che indica se l'audit è stato certificato.

## Installazione e utilizzo

Per utilizzare questo smart contract, è necessario avere un ambiente Ethereum configurato, come Truffle o Hardhat. Dopo aver clonato il repository, è possibile implementare il contratto sulla rete Ethereum di tua scelta utilizzando il comando di migrazione appropriato per il tuo ambiente.

## Licenza

Questo progetto è rilasciato sotto la licenza MIT.
