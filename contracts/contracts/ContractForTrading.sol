// SPDX-License-Identifier: MIT
pragma solidity >=0.5.1 <0.9.0;

contract CarRegistry {
    struct Car {
        string licensePlate;
        string chassisNumber;
        string brand;
        string carType;
        string color;
        uint256 mileage;
        address owner;
        uint256 askingPrice;
        bool forSale;
    }

    mapping(uint256 => Car) public cars;
    uint256 public carCount;
    mapping(address => bool) public owners;

    event CarRegistered(uint256 indexed carId, address indexed owner);
    event MileageUpdated(uint256 indexed carId, uint256 mileage);
    event CarListedForSale(uint256 indexed carId, uint256 askingPrice);
    event CarSold(uint256 indexed carId, address indexed oldOwner, address indexed newOwner, uint256 sellingPrice);

    modifier onlyOwner() {
        require(owners[msg.sender], "Only the contract owner can perform this action");
        _;
    }

    modifier onlyCarOwner(uint256 _carId) {
        require(cars[_carId].owner == msg.sender, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owners[msg.sender] = true;
    }

    function registerCar(
        string memory _licensePlate,
        string memory _chassisNumber,
        string memory _brand,
        string memory _carType,
        string memory _color
        ) external {
        cars[carCount] = Car({
            licensePlate: _licensePlate,
            chassisNumber: _chassisNumber,
            brand: _brand,
            carType: _carType,
            color: _color,
            mileage: 0,
            owner: msg.sender,
            askingPrice: 0,
            forSale: false
        });

        emit CarRegistered(carCount, msg.sender);
        carCount++;
    }

    function updateMileage(uint256 _carId, uint256 _mileage) external onlyCarOwner(_carId) {
        require(_mileage > cars[_carId].mileage, "New mileage must be greater than current mileage");

        cars[_carId].mileage = _mileage;
        emit MileageUpdated(_carId, _mileage);
    }

    function listCarForSale(uint256 _carId, uint256 _askingPrice) external onlyCarOwner(_carId) {
        cars[_carId].forSale = true;
        cars[_carId].askingPrice = _askingPrice;

        emit CarListedForSale(_carId, _askingPrice);
    }

    function buyCar(uint256 _carId) external payable {
        require(cars[_carId].forSale, "Car is not listed for sale");
        require(msg.value >= cars[_carId].askingPrice, "Insufficient payment");

        address payable oldOwner = payable(cars[_carId].owner);
        oldOwner.transfer(msg.value);
        cars[_carId].owner = msg.sender;
        cars[_carId].forSale = false;

        emit CarSold(_carId, oldOwner, msg.sender, msg.value);
    }

    function getCar(uint256 _carId) external view returns (
        string memory licensePlate,
        string memory chassisNumber,
        string memory brand,
        string memory carType,
        string memory color,
        uint256 mileage,
        address owner,
        uint256 askingPrice,
        bool forSale
    ) {
        Car memory car = cars[_carId];
        return (
            car.licensePlate,
            car.chassisNumber,
            car.brand,
            car.carType,
            car.color,
            car.mileage,
            car.owner,
            car.askingPrice,
            car.forSale
        );
    }

    function addOwner(address _newOwner) external onlyOwner {
        owners[_newOwner] = true;
    }

    function removeOwner(address _owner) external onlyOwner {
        require(_owner != msg.sender, "Cannot remove yourself as an owner");
        owners[_owner] = false;
    }
}
