pragma solidity ^0.8.9;
 
contract Lottery {
    // global variable to store manager address
    address public manager;
     // global variable to store players addresses which are payable
    address payable[] public players;

    constructor() {
         // manager is the person who deployed the contract
        manager = msg.sender;
    }

    /** Function to return all players separated by a comma **/
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    /** Function to return the amount of eth in the lottery contract **/
    function getPrize() public view returns (uint) {
        return address(this).balance;
    }

    /** Function to enter in the lottery **/
    function enter() public payable {
        // check if the player hasn't already registered to the lottery
        for (uint i = 0; i < players.length; i++) require(msg.sender != players[i], '409: the player has already registered to the lottery.');
 
        // check if we send the good amount of ether to enter in the lottery
        require(msg.value >= 0.01 ether, '402: the amount to participate is 0.01 ether.');
 
        // add the address of the player in the array
        players.push(payable (msg.sender));
    }

    /** Function to generate random number **/
    function random() private view returns (uint) {
       return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    /** Function to pick the winner **/
    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
    }

    /** Modifier function to check if the user is the manager **/
    modifier restricted() {
          require(msg.sender == manager, '403: call restricted to manager.');
         _;
    }

}