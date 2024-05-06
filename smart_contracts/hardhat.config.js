require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.9",
  networks:{
    sepolia:{
      url: "https://eth-sepolia.g.alchemy.com/v2/BPvp68GLNRGFMpHWbpl5o54p4Zwfmtdb",
      accounts: ['134dcb9be55f609938adc6bb8dce7c8cefd94293c62479328aa2650ae1340cf0']
    }
  }
}

// 0xC6E7469594a316a9978FAEc093506D4921D6C591