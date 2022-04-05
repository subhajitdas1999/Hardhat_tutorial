const { expect } = require("chai");
// const { ethers } = require("hardhat");
// const { ethers } = require("hardhat");

describe("Token Contract", function () {
  let add1;
  let add2;
  let owner;
  let addrs;
  let Token;
  let hardhatToken;

  beforeEach(async () => {
    [owner, add1, add2, ...addrs] = await ethers.getSigners(); //ethers form hardhat is globally available
    Token = await ethers.getContractFactory("Token");

    hardhatToken = await Token.deploy();
  });
  it("deployer account should have the all initial balances", async () => {
    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("able to transfer tokens between accounts", async () => {
    //transfer, add1 50 tokens
    await hardhatToken.transfer(add1.address, 50);

    //transfer 10 tokens from add1 to add2

    await hardhatToken.connect(add1).transfer(add2.address, 10);

    expect(await hardhatToken.balanceOf(add2.address)).to.equal(10);
  });

  it("should be revert if sender have less balance", async () => {
    await expect(
      hardhatToken.connect(add1).transfer(owner.address, 1007)
    ).to.be.revertedWith("Not enough tokens");
  });

  it("should update balance after token transfer",async()=>{
    const initialBalance = await hardhatToken.balanceOf(owner.address);

    //transfer 10 tokens to add1
    await hardhatToken.transfer(add1.address,10);

    const finalbalance = await hardhatToken.balanceOf(owner.address);

    expect(finalbalance).to.be.equal(initialBalance-10);
  });
});
