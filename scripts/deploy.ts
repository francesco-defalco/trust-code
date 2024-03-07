import { AuditRegistry } from "./../typechain-types/contracts/AuditRegistry";
import { ethers } from "hardhat";

async function main() {
	const auditRegistry = await ethers.deployContract("AuditRegistry");

	await auditRegistry.waitForDeployment();

	console.log("AuditRegistry deployed to:", auditRegistry.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
