// SPDX-License-Identifier: MIT
pragma solidity >=0.5.1 <0.9.0;
pragma experimental ABIEncoderV2;

contract CarRegistry {
    struct Car {
        uint256 carId;
        string licensePlate;
        string brand;
        string imageUrl;
        string color;
        uint256 mileage;
        address owner;
        uint256 askingPrice;
        bool mileageUpdateRequested;
        address dealer;
        bool forSale;
        bool purchaseRequested;
    }

    mapping(uint256 => Car) public cars;
    mapping(address => bool) public owners;
    mapping(uint256 => address) public carBuyers;
    uint256 public carCount;

    event CarRegistered(uint256 indexed carId, address indexed owner);
    event MileageUpdated(uint256 indexed carId, uint256 mileage);
    event CarListedForSale(uint256 indexed carId, uint256 askingPrice);
    event CarSold(uint256 indexed carId, address indexed oldOwner, address indexed newOwner, uint256 sellingPrice);
    event MileageUpdateRequested(uint256 indexed carId, address indexed requester);
    event PurchaseRequested(uint256 indexed carId, address indexed buyer, uint256 toBetransferredEth);
    event PurchaseConfirmed(uint256 indexed carId, address indexed buyer, uint256 transferedEthOldOwner);

    modifier onlyCarOwner(uint256 _carId) {
        require(cars[_carId].owner == msg.sender, "Only the owner can perform this action");
        _;
    }

    modifier onlyDealer(uint256 _carId) {
        require(cars[_carId].dealer == msg.sender, "Only the dealer can perform this action");
        _;
    }

    constructor() payable {
        // owners[msg.sender] = true;
    }

    function registerCar(
        string calldata _licensePlate,
        string calldata _brand,
        string calldata _imageUrl,
        string calldata _color,
        uint256 _mileage,
        uint256 _askingPrice,
        address _dealer
    ) external {
        cars[carCount] = Car({
            carId: carCount,
            licensePlate: _licensePlate,
            brand: _brand,
            imageUrl: _imageUrl,
            color: _color,
            mileage: _mileage,
            owner: msg.sender,
            askingPrice: _askingPrice,
            mileageUpdateRequested: false,
            dealer: _dealer,
            forSale: true,
            purchaseRequested: false
        });

        emit CarRegistered(carCount, msg.sender);
        carCount++;
    }

    function requestMileageUpdate(uint256 _carId) external onlyCarOwner(_carId) {
        cars[_carId].mileageUpdateRequested = true;
        emit MileageUpdateRequested(_carId, msg.sender);
    }

    function confirmMileageUpdate(uint256 _carId, uint256 _newMileage) external onlyDealer(_carId) {
        require(cars[_carId].mileageUpdateRequested, "Mileage update not requested");
        require(_newMileage > cars[_carId].mileage, "New mileage must be greater than current mileage");

        cars[_carId].mileage = _newMileage;
        cars[_carId].mileageUpdateRequested = false;
        emit MileageUpdated(_carId, _newMileage);
    }

    function requestPurchase(uint256 _carId, uint256 _currentEtherPrice) public payable {
        uint256 askingPriceInWei = getAskingPriceInWei(cars[_carId].askingPrice, _currentEtherPrice);

        require(cars[_carId].forSale, "Car is not listed for sale");
        require(msg.value >= askingPriceInWei, "Insufficient balance to make purchase request");

        cars[_carId].purchaseRequested = true;
        carBuyers[_carId] = msg.sender;

        emit PurchaseRequested(_carId, msg.sender, msg.value);
    }

    function confirmPurchase(uint256 _carId, uint256 _currentEtherPrice) external onlyDealer(_carId) {
        require(cars[_carId].purchaseRequested, "No purchase request pending");
        require(carBuyers[_carId] != address(0), "No buyer for this car");

        uint256 askingPriceInWei = getAskingPriceInWei(cars[_carId].askingPrice, _currentEtherPrice);

        address payable owner = payable(cars[_carId].owner);
        owner.transfer(askingPriceInWei);

        cars[_carId].owner = carBuyers[_carId];
        cars[_carId].forSale = false;
        cars[_carId].purchaseRequested = false;

        emit CarSold(_carId, cars[_carId].owner, carBuyers[_carId], cars[_carId].askingPrice);
        emit PurchaseConfirmed(_carId, carBuyers[_carId], askingPriceInWei);

        delete carBuyers[_carId];
    }

    function getAskingPriceInWei(uint256 _askingPrice, uint256 _currentEtherPrice) internal pure returns (uint256){
        uint256 askingPriceInEther = _askingPrice / _currentEtherPrice;
        return askingPriceInEther * 1 ether;
    }


    function getCarsCount() external view returns (uint256) {
        return carCount;
    }

    function getAllCars() external view returns (Car[] memory) {
        Car[] memory carArray = new Car[](carCount);
        for (uint256 i = 0; i < carCount; i++) {
            carArray[i] = cars[i];
        }
        return carArray;
    }

    function getCarsOwnedByAddress(address _owner) external view returns (Car[] memory) {
        Car[] memory ownedCars = new Car[](carCount);

        for (uint i = 0; i < carCount; i++) {
            if (cars[i].owner == _owner) {
                ownedCars[i] = cars[i];
            }
        }

        return ownedCars;
    }

    function getRequestedMileageUpdateCars() external view returns (Car[] memory) {
        Car[] memory requestedCars = new Car[](carCount);
        uint256 count = 0;

        for (uint256 i = 0; i < carCount; i++) {
            if (cars[i].mileageUpdateRequested) {
                requestedCars[count] = cars[i];
                count++;
            }
        }

        Car[] memory result = new Car[](count);
        for (uint256 j = 0; j < count; j++) {
            result[j] = requestedCars[j];
        }

        return result;
    }

    function getPurchaseRequestedCars() external view returns (Car[] memory) {
        Car[] memory requestedCars = new Car[](carCount);
        uint256 count = 0;

        for (uint256 i = 0; i < carCount; i++) {
            if (cars[i].purchaseRequested) {
                requestedCars[count] = cars[i];
                count++;
            }
        }

        Car[] memory result = new Car[](count);
        for (uint256 j = 0; j < count; j++) {
            result[j] = requestedCars[j];
        }

        return result;
    }
}