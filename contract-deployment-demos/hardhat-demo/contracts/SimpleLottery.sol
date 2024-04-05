// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SimpleLottery {
    address public manager;
    address[] public participants;
    address public winner;
    uint256 public constant MAX_PARTICIPANTS = 1;
    uint256 public constant MIN_CONTRIBUTION = 0.00002 ether;

    event WinnerSelected(address winner, uint256 prize);

    constructor() {
        manager = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == manager, "Only the manager can call this function");
        _;
    }

    function enter() public payable {
        require(msg.value >= MIN_CONTRIBUTION, "Contribution must be exactly 0.00002 ether");
        require(participants.length < MAX_PARTICIPANTS, "Maximum participants reached");

        participants.push(msg.sender);

        if (participants.length == MAX_PARTICIPANTS) {
            pickWinner();
        }
    }

    function pickWinner() internal {
        require(participants.length == MAX_PARTICIPANTS, "Not enough participants yet");

        // Select a random winner using an external source of randomness
        uint256 index = getRandomIndex(participants.length);
        winner = participants[index];

        // Transfer prizes
        uint256 prizeAmount = address(this).balance;
        uint256 winnerPrize = prizeAmount * 2 / 3;
        uint256 managerPrize = prizeAmount - winnerPrize;
        payable(winner).transfer(winnerPrize);
        payable(manager).transfer(managerPrize);

        // Reset participants for the next round
        delete participants;
        
        emit WinnerSelected(winner, winnerPrize);
    }

    function getParticipants() public view returns (address[] memory) {
        return participants;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getRandomIndex(uint256 max) internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp, msg.sender))) % max;
    }
}
