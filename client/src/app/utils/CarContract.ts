import { ethers } from "ethers";

// Replace with your actual deployed contract address
const contractAddress = "0x1036579cb3F48894dc65D595c53C0dfabFF331C4";

// Replace with your compiled contract ABI
const contractABI = [
  // ... your contract ABI here
];

// Function to connect to the contract, handling different providers
const getContract = async (provider: ethers.providers.JsonRpcProvider | ethers.Wallet): Promise<ethers.Contract> => {
  let signer: ethers.Signer | null = null;

  if (provider instanceof ethers.providers.JsonRpcProvider) {
    signer = provider.getSigner();
  } else {
    // Handle Wallet provider (e.g., injected MetaMask)
    signer = provider;
  }

  if (!signer) {
    throw new Error("No signer available for contract connection");
  }

  return new ethers.Contract(contractAddress, contractABI, signer);
};

// Interface for Car data type (optional, for improved type safety)
interface Car {
  licensePlate: string;
  chassisNumber: string;
  brand: string;
  carType: string;
  color: string;
  mileage: number;
  owner: string;
  askingPrice: number;
  forSale: boolean;
}

// Example functions for interacting with the smart contract:

// Fetch car details by ID
const getCarDetails = async (provider: ethers.providers.JsonRpcProvider | ethers.Wallet, carId: number): Promise<Car> => {
  const contract = await getContract(provider);
  const carData = await contract.getCar(carId);
  return {
    licensePlate: carData[0],
    chassisNumber: carData[1],
    brand: carData[2],
    carType: carData[3],
    color: carData[4],
    mileage: carData[5].toNumber(),
    owner: carData[6],
    askingPrice: carData[7].toNumber(),
    forSale: carData[8],
  };
};

// Register a new car (consider adding access control modifiers)
const registerCar = async (
  provider: ethers.providers.JsonRpcProvider | ethers.Wallet,
  licensePlate: string,
  chassisNumber: string,
  brand: string,
  carType: string,
  color: string
): Promise<ethers.ContractTransaction> => {
  const contract = await getContract(provider);
  const tx = await contract.registerCar(licensePlate, chassisNumber, brand, carType, color);
  return tx;
};

// Update car mileage (consider adding access control modifiers)
const updateMileage = async (
  provider: ethers.providers.JsonRpcProvider | ethers.Wallet,
  carId: number,
  newMileage: number
): Promise<ethers.ContractTransaction> => {
  const contract = await getContract(provider);
  const tx = await contract.updateMileage(carId, newMileage);
  return tx;
};

// List a car for sale (consider adding access control modifiers)
const listCarForSale = async (
  provider: ethers.providers.JsonRpcProvider | ethers.Wallet,
  carId: number,
  askingPrice: number
): Promise<ethers.ContractTransaction> => {
  const contract = await getContract(provider);
  const tx = await contract.listCarForSale(carId, askingPrice);
  return tx;
};

// Buy a car (consider adding payment handling and access control modifiers)
const buyCar = async (provider: ethers.providers.JsonRpcProvider | ethers.Wallet, carId: number): Promise<ethers.ContractTransaction> => {
  const contract = await getContract(provider);
  const tx = await contract.buyCar(carId, { value: ethers.utils.parseEther("1.0") }); // Replace with actual payment logic
  return tx;
};

// Add additional functions as needed for owner management, image storage, etc.

export { getContract, getCarDetails, registerCar, updateMileage, listCarForSale, buyCar };
