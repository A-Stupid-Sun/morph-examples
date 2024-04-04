import { ethers } from "hardhat";

async function main() {
  const SimpleLottery = await ethers.getContractFactory("SimpleLottery");
  const lotteryContract = await SimpleLottery.deploy();
  await lotteryContract.waitForDeployment();;
  const address = await lotteryContract.getAddress(); // 等待 getAddress() 函数返回结果
  console.log(`SimpleLottery deployed to: ${address}`);
  const curUser=await lotteryContract.getParticipants()
  console.log(`Current participant: ${curUser}`)
  const msg=await lotteryContract.enter({ value: ethers.parseEther("0.00002") })
  console.log(msg)
  const curUser2=await lotteryContract.getParticipants()
  console.log(`Current participant: ${curUser2}`)
  const curBalence=await lotteryContract.getContractBalance()
  console.log(`Current participant: ${curBalence}`)
  
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
