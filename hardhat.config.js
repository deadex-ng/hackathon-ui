/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("@nomiclabs/hardhat-ethers");
const { REACT_APP_PRIVATE_KEY_ONE } = process.env;
module.exports = {
  defaultNetwork: "PolygonMumbai",
  networks: {
    hardhat: {
    },
     PolygonMumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [REACT_APP_PRIVATE_KEY_ONE]
    }
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}