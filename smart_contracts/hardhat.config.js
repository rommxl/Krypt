require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.9",
  networks:{
    sepolia:{
      url: "https://eth-sepolia.g.alchemy.com/v2/RliDHWbgSVuoiE_3SIigPFH4KE4b8SGN",
      accounts: ['134dcb9be55f609938adc6bb8dce7c8cefd94293c62479328aa2650ae1340cf0']
    }
  }
}

// 0x45F81d274902C618bB33470524aEAB6bB4a1e0b9