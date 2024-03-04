import { expect } from "chai";
import { ethers } from "hardhat";
const {
	time,
	loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("AuditRegistry", function () {
	let AuditRegistry: any,
		auditRegistry: any,
		owner: any,
		auditor: any,
		addr1: any;

	beforeEach(async () => {
		AuditRegistry = await ethers.getContractFactory("AuditRegistry");
		[owner, auditor, addr1] = await ethers.getSigners();
		auditRegistry = await AuditRegistry.deploy();
		await auditRegistry.deployed();
	});

	it("Should allow owner to add an auditor", async function () {
		await auditRegistry.connect(owner).addAuditor(auditor.address);
		expect(
			await auditRegistry.hasRole(
				auditRegistry.AUDITOR_ROLE(),
				auditor.address
			)
		).to.equal(true);
	});

	it("Should allow auditor to record an audit", async function () {
		await auditRegistry.connect(owner).addAuditor(auditor.address);
		await auditRegistry
			.connect(auditor)
			.recordAudit(
				"Company",
				"Project",
				Date.now(),
				Date.now(),
				0,
				"githubCommit",
				0,
				0,
				0
			);
		const audit = await auditRegistry.audits(1);
		expect(audit.auditor).to.equal(auditor.address);
	});
});
