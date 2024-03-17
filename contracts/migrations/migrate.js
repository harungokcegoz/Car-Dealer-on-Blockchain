const Contract = artifacts.require("ContractFoTrading.sol");

module.exports = function (deployer) {
  deployer.deploy(Contract);
};
