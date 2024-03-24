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
    }

    mapping(uint256 => Car) public cars;
    uint256 public carCount;
    mapping(address => bool) public owners;

    event CarRegistered(uint256 indexed carId, address indexed owner);
    event MileageUpdated(uint256 indexed carId, uint256 mileage);
    event CarListedForSale(uint256 indexed carId, uint256 askingPrice);
    event CarSold(uint256 indexed carId, address indexed oldOwner, address indexed newOwner, uint256 sellingPrice);
    event MileageUpdateRequested(uint256 indexed carId, address indexed requester);

    modifier onlyOwner() {
        require(owners[msg.sender], "Only the contract owner can perform this action");
        _;
    }

    modifier onlyCarOwner(uint256 _carId) {
        require(cars[_carId].owner == msg.sender, "Only the owner can perform this action");
        _;
    }

    constructor() public {
        owners[msg.sender] = true;
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
            dealer: _dealer
        });

        emit CarRegistered(carCount, msg.sender);
        carCount++;
    }

    function requestMileageUpdate(uint256 _carId) external {
        cars[_carId].mileageUpdateRequested = true;
        emit MileageUpdateRequested(_carId, msg.sender);
    }

    function confirmMileageUpdate(uint256 _carId, uint256 _newMileage) external {
        require(cars[_carId].mileageUpdateRequested, "Mileage update not requested");
        require(cars[_carId].dealer == msg.sender, "Only the dealer can confirm the mileage update");
        require(_newMileage > cars[_carId].mileage, "New mileage must be greater than current mileage");

        cars[_carId].mileage = _newMileage;
        cars[_carId].mileageUpdateRequested = false;
        emit MileageUpdated(_carId, _newMileage);
    }

    // function buyCar(uint256 _carId) external payable {
    //     require(cars[_carId].forSale, "Car is not listed for sale");
    //     require(msg.value >= cars[_carId].askingPrice, "Insufficient payment");

    //     address payable oldOwner = address(uint160(cars[_carId].owner));
    //     oldOwner.transfer(msg.value);

    //     cars[_carId].owner = msg.sender;
    //     cars[_carId].forSale = false;

    //     emit CarSold(_carId, oldOwner, msg.sender, msg.value);
    // }

    // function addOwner(address _newOwner) external onlyOwner {
    //     owners[_newOwner] = true;
    // }

    // function removeOwner(address _owner) external onlyOwner {
    //     require(_owner != msg.sender, "Cannot remove yourself as an owner");
    //     owners[_owner] = false;
    // }

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

        // Trim the array to remove any empty slots
        Car[] memory result = new Car[](count);
        for (uint256 j = 0; j < count; j++) {
            result[j] = requestedCars[j];
        }

        return result;
    }


}
