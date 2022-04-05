// const { ethers } = require("hardhat")

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const Token = await ethers.getContractFactory("Token");
  const hardhatToken = await Token.deploy();

  console.log("Deployed at: ", hardhatToken.address);
};

main()
  .then(() => process.exit(0))
  .catch((err) => console.log(err));
