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
            console.error("User denied account access", error);
        }
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545')); 
    }

    const networkId: string = (await web3.eth.net.getId()).toString();
    const contractABI = ContractForTrading.abi;
    const contractAddress = ContractForTrading.networks['5777'].address;

    contract = new web3.eth.Contract(contractABI, contractAddress);    
}

export const getCurrentAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    window.localStorage.setItem('currentAccount', String(accounts[0]));
    return String(accounts[0]);
}

export const callContractMethod = async (methodName: string, ...args: any[]) => {
    try {
        const account = await getCurrentAccount();
        const method = contract.methods[methodName](...args);
        const gas = await method.estimateGas({ from: account });
        const result = await method.send({ from: account, gas });
        return await method.call();
    } catch (error) {
        console.error("Error calling contract method:", error);
        throw error;
    }
}


export default contract;
