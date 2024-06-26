import Web3 from 'web3';
import ContractForTrading from '../../../contracts/build/contracts/CarRegistry.json';

let web3: Web3;
let contract: any;

export const initWeb3 = async () => {
  if (typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined') {
    web3 = new Web3((window as any).ethereum);
    try {
      await (window as any).ethereum.enable();
    } catch (error) {
      console.error('User denied account access', error);
    }
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
  }

  const networkId: string = (await web3.eth.net.getId()).toString();
  const contractABI = ContractForTrading.abi;
  const contractAddress = ContractForTrading.networks['5777'].address;

  contract = new web3.eth.Contract(contractABI, contractAddress);
};

export const getCurrentAccount = async () => {
  const accounts = await web3.eth.getAccounts();
  return String(accounts[0]);
};

export const callContractMethod = async (methodName: string, ...args: any[]) => {
  try {
    const account = await getCurrentAccount();
    const method = contract.methods[methodName](...args);
    const gas = await method.estimateGas({ from: account });
    const result = await method.send({ from: account, gas });
    return await method.call();
  } catch (error) {
    console.error('Error calling contract method:', error);
    throw error;
  }
};

export const requestPurchaseFromContract = async (
  carId: number,
  askingPriceInEther: number,
  currentEtherPrice: number
) => {
  try {
    if (!askingPriceInEther) {
      return;
    }
    initWeb3();
    const weiValue = await web3.utils.toWei(askingPriceInEther, 'ether');
    await contract.methods.requestPurchase(carId, currentEtherPrice.toFixed(0)).send({
      from: await getCurrentAccount(),
      value: weiValue,
    });
  } catch (error) {
    console.error('Error depositing money:', error);
    throw error;
  }
};

export const confirmPurchaseFromContract = async (carId: number, currentEtherPrice: number) => {
  try {
    if (!currentEtherPrice) {
      return;
    }
    initWeb3();
    await contract.methods.confirmPurchase(carId, currentEtherPrice.toFixed(0)).send({
      from: await getCurrentAccount(),
    });
  } catch (error) {
    console.error('Error depositing money:', error);
    throw error;
  }
};

export const confirmMileageFromContract = async (carId: number, newMileage: number) => {
  try {
    if (!newMileage) {
      return;
    }
    initWeb3();
    await contract.methods.confirmMileageUpdate(carId, newMileage).send({
      from: await getCurrentAccount(),
    });
  } catch (error) {
    console.error('Error confirming the new mileage:', error);
    throw error;
  }
};

export const requestMileageUpdateFromContract = async (carId: number) => {
  try {
    if (!carId) {
      return;
    }
    initWeb3();
    await contract.methods.requestMileageUpdate(carId).send({
      from: await getCurrentAccount(),
    });
  } catch (error) {
    console.error('Error requesting APK:', error);
    throw error;
  }
};

export default contract;
