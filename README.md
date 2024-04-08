# Vehicle Marketplace Application

The process of buying and selling a vehicle is quite painful, especially in countries where cars are quite expensive. In this market, many individuals engage in various types of fraudulent activities, including tampering with vehicle odometers to reduce mileage, conducting repairs on vehicles without documenting the damage, and assembling "new" cars from parts of different junk cars to inflate or maintain their value unfairly.

## Purpose

In order to prevent fraud and protect all market stakeholders' rights, a decentralized application (dApp - Next.js-Tailwind-Solidity) on the Ethereum blockchain has been developed. This solution stores vehicle records on a transparent and immutable ledger instead of a centralized database, preventing unauthorized alterations by third parties and making it accessible to everyone. Although this Proof of Concept can't address all potential issues, it effectively demonstrates that such comprehensive information can be securely maintained on a decentralized ledger.

## Stakeholders

In this Proof of Concept (PoC), there are three key stakeholders: the Seller, Potential Buyer, and Dealer (Approver), and the application provides 3 different UI and UX for each type of user. All users are required to log in to the system using their MetaMask crypto asset wallets for authentication.

<img width="753" alt="Screenshot 2024-04-08 at 04 12 32" src="https://github.com/harungokcegoz/Car-Dealer-on-Blockchain/assets/94520965/08bcd048-9b72-4624-9d21-bc0ec9b068da">

### Seller

- Registers the car intended for sale into the system
- Sends maintenance requests which are forwarded to the Dealer

  ![DevTools localhost](https://github.com/harungokcegoz/Car-Dealer-on-Blockchain/assets/94520965/f90c6435-ac34-4d04-af21-43dd37735586)


### Dealer

- Records the current mileage status of cars within the system
- Confirms car trades
  
![DevTools localhost (2)](https://github.com/harungokcegoz/Car-Dealer-on-Blockchain/assets/94520965/99aad585-7ad7-49b6-80d2-4497a5874132)
![DevTools (2)](https://github.com/harungokcegoz/Car-Dealer-on-Blockchain/assets/94520965/74793c3a-2c0d-46dc-8f56-cfd4b6e3d73a)

  

### Buyer

- Views cars ready for sale on the Buyer Account
- Purchase a car through the smart contract

![DevTools (1)](https://github.com/harungokcegoz/Car-Dealer-on-Blockchain/assets/94520965/5ca851e2-af71-48b0-86b7-316ccb13b7ad)
