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
