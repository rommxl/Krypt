const main = async () => {
    const kycFactory = await hre.ethers.getContractFactory("KYC");
    const kycContract = await kycFactory.deploy("qwert123");
  
    await kycContract.deployed();
  
    console.log("Contract deplyed at address: ", kycContract.address);
};
const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
runMain();