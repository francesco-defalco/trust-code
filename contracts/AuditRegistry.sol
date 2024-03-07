// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AuditRegistry is AccessControl, Ownable {
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    struct Audit {
        uint256 id;
        address auditor;
        string company;
        string project;
        uint256 startDate;
        uint256 endDate;
        string githubCommit;
        uint256 highSeverity;
        uint256 mediumSeverity;
        uint256 lowSeverity;
        bool certified;
    }

    mapping(uint256 => Audit) public audits;
    uint256 public nextId = 0;

    constructor() Ownable(msg.sender) {
    }

    function addAuditor(address auditor) public onlyOwner {
        grantRole(AUDITOR_ROLE, auditor);
    }

    function recordAudit(
        string memory company,
        string memory project,
        uint256 startDate,
        uint256 endDate,
        string memory githubCommit,
        uint256 highSeverity,
        uint256 mediumSeverity,
        uint256 lowSeverity
    ) public onlyRole(AUDITOR_ROLE) {
        audits[nextId] = Audit({
            id: nextId,
            auditor: msg.sender,
            company: company,
            project: project,
            startDate: startDate,
            endDate: endDate,
            githubCommit: githubCommit,
            highSeverity: highSeverity,
            mediumSeverity: mediumSeverity,
            lowSeverity: lowSeverity,
            certified: false
        });

        nextId++;
    }

    function certifyAudit(
        uint256 id, 
        uint256 endDate, 
        uint256 highSeverity, 
        uint256 mediumSeverity, 
        uint256 lowSeverity
    ) public {
        require(hasRole(AUDITOR_ROLE, msg.sender), "Only the auditor can certify the audit");
        Audit storage audit = audits[id];
        audit.endDate = endDate;
        audit.highSeverity = highSeverity;
        audit.mediumSeverity = mediumSeverity;
        audit.lowSeverity = lowSeverity;
        audit.certified = true;
    }

    function getAudit(uint256 id) public view returns (
    uint256, 
    address, 
    string memory, 
    string memory, 
    uint256, 
    uint256, 
    string memory, 
    uint256, 
    uint256, 
    uint256, 
    bool
) {
    Audit storage audit = audits[id];
    return (
        audit.id, 
        audit.auditor, 
        audit.company, 
        audit.project, 
        audit.startDate, 
        audit.endDate, 
        audit.githubCommit, 
        audit.highSeverity, 
        audit.mediumSeverity, 
        audit.lowSeverity, 
        audit.certified
    );
}
}