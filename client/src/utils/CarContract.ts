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

    contract.events.allEvents((error: any, event: any) => {
        if (error) {
            console.error('Error with event subscription:', error);
        } else {
            console.log('Received event:', event);
            switch (event.event) {
                case 'CarRegistered':
                    updateCarListings(event.returnValues.carId);
                    break;
                default:
                    console.warn('Unrecognized event type:', event.event);
                    break;
            }
        }
    });

    contract.getPastEvents('CarRegistered', { fromBlock: 0, toBlock: 'latest' }, (error: any, events: any) => {
        if (error) {
            console.error('Error fetching past CarRegistered events:', error);
        } else {
            console.log('Past CarRegistered events:', events);
        }
    });
    
}

export const getCurrentAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
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

const updateCarListings = (carId: number) => {
    contract.methods.getCar(carId).call((error: any, carDetails: any) => {
        if (error) {
            console.error('Error fetching car details:', error);
        } else {
            const { licensePlate, chassisNumber, brand, carType, color, mileage, owner, askingPrice, forSale } = carDetails;

            console.log('Newly registered car details:', carDetails);

        }
    });
};


export default contract;
