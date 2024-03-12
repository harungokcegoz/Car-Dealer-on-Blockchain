import Web3 from 'web3';
import ContractForTrading from '../../../contracts/build/contracts/CarRegistry.json'; 

let web3: Web3;
let contract: any;

// Function to initialize Web3 and contract instance
export const initWeb3 = async () => {
    // Check if Web3 has been injected by the browser (MetaMask)
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        // Use MetaMask provider
        web3 = new Web3(window.ethereum);
        try {
            // Request account access
            await window.ethereum.enable();
        } catch (error) {
            console.error("User denied account access", error);
        }
    } else {
        // Fallback to local provider
        web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545')); // Update with your local provider address
    }

    // Get the network ID
    const networkId: string = await web3.eth.net.getId();

    // Get the contract ABI and address
    const contractABI = ContractForTrading.abi;
    const contractAddress = ContractForTrading.networks.development;

    // Instantiate the contract
    contract = new web3.eth.Contract(contractABI, contractAddress);
}

// Function to get the current account address
export const getCurrentAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    return accounts[0]; // Assuming first account is used
}

// Function to call a method on the contract
export const callContractMethod = async (methodName: string, ...args: any[]) => {
    try {
        const account = await getCurrentAccount();
        const method = contract.methods[methodName](...args);
        const gas = await method.estimateGas({ from: account });
        const result = await method.send({ from: account, gas });
        return result;
    } catch (error) {
        console.error("Error calling contract method:", error);
        throw error;
    }
}

// Export the contract instance for external use
export default contract;
