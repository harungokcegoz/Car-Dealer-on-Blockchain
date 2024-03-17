const CarRegistry = artifacts.require("CarRegistry.sol");

module.exports = function (deployer) {
  // Deploy the contract and pass the fee wallet address
  deployer.deploy(CarRegistry);
};
