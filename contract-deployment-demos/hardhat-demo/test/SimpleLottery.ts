import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("SimpleLottery", function () {
  let manager: Signer;
  let participant: Signer;
  let lotteryContract: any;

  async function deployLotteryFixture() {
    const [manager, participant] = await ethers.getSigners();
    console.log(manager.address)
    console.log(.address)
    const SimpleLottery = await ethers.getContractFactory("SimpleLottery");
    const lotteryContract = await SimpleLottery.deploy();
    //await lotteryContract.deployed();

    return { manager, participant, lotteryContract };
  }

  beforeEach(async function () {
    ({ manager, participant, lotteryContract } = await loadFixture(deployLotteryFixture));
  });

  describe("Entry", function () {
    it("Should allow a participant to enter the lottery", async function () {
      await expect(lotteryContract.connect(participant).enter({ value: ethers.parseEther("0.00002") }))
    });

    it("Should revert if contribution is not exactly 0.2 ether", async function () {
      await expect(lotteryContract.connect(participant).enter({ value: ethers.parseEther("0.00001") })).to.be.revertedWith("Contribution must be exactly 0.2 ether");
    });

    it("Should revert if maximum participants reached", async function () {
      await lotteryContract.connect(participant).enter({ value: ethers.parseEther("0.00002") });
      await expect(lotteryContract.connect(manager).enter({ value: ethers.parseEther("0.00002") })).to.be.revertedWith("Maximum participants reached");
    });
  });

  describe("Winner selection", function () {
    it("Should pick a winner when maximum participants is reached", async function () {
      await lotteryContract.connect(participant).enter({ value: ethers.parseEther("0.00002") });
      await lotteryContract.connect(manager).enter({ value: ethers.parseEther("0.00002") });

      await expect(lotteryContract.pickWinner())
        .to.emit(lotteryContract, "WinnerSelected")
        .withArgs(await manager.getAddress());
    });

    it("Should revert if not enough participants to pick a winner", async function () {
      await expect(lotteryContract.pickWinner()).to.be.revertedWith("Not enough participants yet");
    });
  });

  describe("Prize distribution", function () {
    it("Should transfer prize to winner and owner after selecting winner", async function () {
      await lotteryContract.connect(participant).enter({ value: ethers.parseEther("0.00002") });
      await lotteryContract.connect(manager).enter({ value: ethers.parseEther("0.00002") });

      const balanceBeforeWinner = await ethers.provider.getBalance(await manager.getAddress());
      const balanceBeforeOwner = await ethers.provider.getBalance(await manager.getAddress());

      await lotteryContract.pickWinner();

      const balanceAfterWinner = await ethers.provider.getBalance(await manager.getAddress());
      const balanceAfterOwner = await ethers.provider.getBalance(await manager.getAddress());

      expect(balanceAfterWinner).to.be.gt(balanceBeforeWinner);
      expect(balanceAfterOwner).to.be.gt(balanceBeforeOwner);
    });
  });
});
