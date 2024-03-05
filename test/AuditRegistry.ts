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
		return await AuditRegistry.deploy();
	}
});
