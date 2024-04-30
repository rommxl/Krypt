// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract KYC {
    
    // Admin contract
    address public admin_address;
    string public admin_password;

    struct Admin {
        address adminAddress;
        string adminName;
    }

    mapping(address => Admin) public admins;

    modifier onlyAdmin() {
        require(msg.sender == admin_address, "Only admin can call this function");
        _;
    }

    function comparePassword(string memory _password) public view returns (bool) {
        return keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(admin_password));
    }

    function compareAdminAddress(address _address) public view returns (bool) {
        return _address == admin_address;
    }

    constructor(string memory _password) {
        admin_address = msg.sender;
        admin_password = _password;
        admins[msg.sender] = Admin(msg.sender, "Admin");
    }
    
    // Bank contract
    struct Bank {
        address bankAddress;
        string bankName;
        string regNumber;
        bool isVerified;
        address[] customers;
    }

    address [] public bankRequests;
    uint256 public bankCount;

    mapping(address => Bank) public banks;

    modifier onlyBank() {
        require(banks[msg.sender].bankAddress == msg.sender, "Only bank can call this function");
        _;
    }

    function createBank(string memory _name, string memory _regNumber) public {
        require(banks[msg.sender].bankAddress != msg.sender, "Bank already exists");
        banks[msg.sender] = Bank(msg.sender, _name, _regNumber, false, new address[](0));
        bankRequests.push(msg.sender);
    }

    function getBankRequests() public view onlyAdmin returns (address[] memory) {
        return bankRequests;
    }

    function verifyBank(address _address) public onlyAdmin {
        banks[_address].isVerified = true;
        bankCount++;
    }

    function addCustomer(address _address) public onlyBank {
        banks[msg.sender].customers.push(_address);
    }

    function getCustomers() public view onlyBank returns (address[] memory) {
        return banks[msg.sender].customers;
    }

    function getBankDetails(address _address) public view returns (string memory, string memory, bool) {
        return (banks[_address].bankName, banks[_address].regNumber, banks[_address].isVerified);
    }

    function getBankRequestsAllData() public view onlyAdmin returns (Bank [] memory) {
        Bank[] memory result = new Bank[](bankRequests.length);
        for (uint i = 0; i < bankRequests.length; i++) {
            if (!banks[bankRequests[i]].isVerified) {
                result[i] = banks[bankRequests[i]];
            }
        }
        return result;
    }

    function getCustomersinABank (address _address) public view onlyBank returns (Customer [] memory) {
        Customer[] memory result = new Customer[](banks[_address].customers.length);
        for (uint i = 0; i < banks[_address].customers.length; i++) {
            result[i] = customers[banks[_address].customers[i]];
        }
        return result;
       
    }

    function getVerifiedBanks () public view returns (Bank [] memory) {
        Bank[] memory result = new Bank[](bankCount);
        uint256 counter = 0;
        for (uint i = 0; i < bankRequests.length; i++) {
            if (banks[bankRequests[i]].isVerified) {
                result[counter] = banks[bankRequests[i]];
                counter++;
            }
        }
        return result;
    }

    
    // Customer contract
    struct Customer{
        address customerAddress;
        string customerName;
        string customerEmail;
        string password;
        string customerData;
        string isVerified;
        address bankAddress;
        string balance;
    }
    mapping(address => Customer) public customers;

    function getCustomer(address _address) public view returns(string memory, string memory, string memory, string memory,address ,string memory){
        return (customers[_address].customerName, customers[_address].customerEmail, customers[_address].password, customers[_address].customerData, customers[_address].bankAddress,customers[_address].balance);
    }

    function createCustomer(string memory _name, string memory _email, string memory _password, string memory _data,address  _bankAddress,string memory _balance) public {
        require(customers[msg.sender].customerAddress != msg.sender, "Customer already exists");
        customers[msg.sender] = Customer(msg.sender, _name, _email, _password, _data,"false",_bankAddress,_balance);
        banks[_bankAddress].customers.push(msg.sender);
    }

    function verifyCustomer(address _address) public onlyBank {
        customers[_address].isVerified = "true";
    }

    function updateBalace (address _address, string memory _balance) public onlyBank {
        customers[_address].balance = _balance;
    }
    
    function bankLogin (address _address) public view returns (string memory, string memory,  string memory, string memory, string memory) {
        require(banks[_address].bankAddress == _address, "Only bank can call this function");
        require(banks[_address].isVerified, "Bank not verified");
        return (banks[_address].bankName, banks[_address].regNumber, string(abi.encodePacked(banks[_address].customers.length)), string(abi.encodePacked(banks[_address].bankAddress)), string(abi.encodePacked(banks[_address].customers.length)));
    }


    // Transactions contract
    struct Transaction{
        address from;
        address to;
        uint256 amount;
        string transactionData;
    }
    Transaction[] public transactions;
    uint256 public transactionCount;

    function createTransaction(address _to, uint256 _amount, string memory _data) public {
        require(customers[msg.sender].customerAddress == msg.sender, "Only customer can call this function");
        require(customers[_to].customerAddress == _to, "Recipient does not exist");
        require(keccak256(abi.encodePacked(customers[_to].isVerified)) == keccak256(abi.encodePacked("true")), "Recipient not verified");
        require(banks[msg.sender].bankAddress != msg.sender, "Sender cannot be a bank");
        require(banks[_to].bankAddress != _to, "Recipient cannot be a bank");
        transactions.push(Transaction(msg.sender, _to, _amount, _data));
        transactionCount++;
    }

    function getTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

    function getCustomerTransaction() public view returns (Transaction [] memory){
        require(customers[msg.sender].customerAddress == msg.sender, "Only customer can call this function");
        Transaction[] memory result = new Transaction[](transactionCount);
        uint256 counter = 0;
        for (uint256 i = 0; i < transactionCount; i++) {
            if (transactions[i].from == msg.sender || transactions[i].to == msg.sender) {
                result[counter] = transactions[i];
                counter++;
            }
        }
        return result;
    }

    function rejectBank(address _address) public onlyAdmin {
        for (uint i = 0; i < bankRequests.length; i++) {
            if (bankRequests[i] == _address) {
                bankRequests[i] = bankRequests[bankRequests.length - 1];
                bankRequests.pop();
                break;
            }
        }
    }


 

    function rejectCustomer(address _address) public onlyBank {
        customers[_address].isVerified = "false";
    }

    

}


