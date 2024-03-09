import {
	time,
	loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("AuditRegistry", function () {
	async function deployAuditRegistry() {
		// Contracts are deployed using the first signer/account by default
		const [owner, otherAccount] = await ethers.getSigners();

		const AuditRegistry = await ethers.getContractFactory("AuditRegistry");

		const auditRegistry = await AuditRegistry.deploy();

		return { auditRegistry, owner, otherAccount };
	}

	describe("Deployment", function () {
		it("should deploy AuditRegistry contract", async function () {
			const { auditRegistry } = await loadFixture(deployAuditRegistry);

			const contractAddress = await auditRegistry.getAddress();
			expect(contractAddress).to.be.properAddress;

			console.log("AuditRegistry deployed to:", contractAddress);
		});
	});
});

describe("Test Roles", function () {
	async function deployAuditRegistry() {
		const [owner, auditor, otherAccount] = await ethers.getSigners();
		const AuditRegistry = await ethers.getContractFactory("AuditRegistry");
		const auditRegistry = await AuditRegistry.deploy();
		console.log("owner address:", owner.address);
		console.log("Auditor address:", auditor.address);
		await auditRegistry.connect(owner).addAuditor(auditor.address);

		return { auditRegistry, owner, auditor, otherAccount };
	}

	describe("recordAudit", function () {
		it("should allow auditor to record an audit", async function () {
			const { auditRegistry, auditor } = await loadFixture(
				deployAuditRegistry
			);
			await expect(
				auditRegistry
					.connect(auditor)
					.recordAudit(
						"Company",
						"Project",
						Date.now(),
						Date.now(),
						"GithubCommit",
						1,
						2,
						3
					)
			).to.not.be.reverted;
		});

		it("should not allow non-auditor to record an audit", async function () {
			const { auditRegistry, otherAccount } = await loadFixture(
				deployAuditRegistry
			);
			await expect(
				auditRegistry
					.connect(otherAccount)
					.recordAudit(
						"Company",
						"Project",
						Date.now(),
						Date.now(),
						"GithubCommit",
						1,
						2,
						3
					)
			).to.be.revertedWith("Caller is not an auditor");
		});

		it("should increment nextId after recording an audit", async function () {
			const { auditRegistry, auditor } = await loadFixture(
				deployAuditRegistry
			);
			// ...

			const nextIdBefore = auditRegistry.nextId();
			await auditRegistry
				.connect(auditor)
				.recordAudit(
					"Company",
					"Project",
					Date.now(),
					Date.now(),
					"GithubCommit",
					1,
					2,
					3
				);
			const nextIdAfter = await auditRegistry.nextId();
			expect(nextIdAfter).to.equal(nextIdBefore);
		});
	});
});
