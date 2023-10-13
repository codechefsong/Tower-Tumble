//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract TowerTumble {
  using Counters for Counters.Counter;
  Counters.Counter public numberOfMatches;

  address public immutable owner;
  Match[] public matchList;
  mapping(uint256 => mapping(address => uint256)) public timeLeft;

  struct Match {
    uint256 id;
    uint256 numberOfPlayers;
    uint256 prizePool;
    uint256 blocks;
    address[] players;
    bool isFinish;
  }

  // Constructor: Called once on contract deployment
  // Check packages/hardhat/deploy/00_deploy_your_contract.ts
  constructor(address _owner) {
    owner = _owner;
  }

  function getMatches() public view returns (Match[] memory){
    return matchList;
  }

  function getMatcheByID(uint256 _matchId) public view returns (Match memory){
    return matchList[_matchId];
  }

  function getPlayerByMatchID(uint256 _matchId) public view returns (address[] memory){
    return matchList[_matchId].players;
  }

  function getBlockTime() public view returns (uint256){
    return block.timestamp;
  }

  function createMatch() external {
    uint256 newMatchId = numberOfMatches.current();
    matchList.push(Match(newMatchId, 0, 0, 0, new address[](0), false));
    numberOfMatches.increment();
  }

  function joinMatch(uint256 _matchId) external {
    matchList[_matchId].numberOfPlayers += 1;
    matchList[_matchId].players.push(msg.sender);
    timeLeft[_matchId][msg.sender] = block.timestamp + 30;
  }

  function stackBlock(uint256 _matchId) external {
    require(timeLeft[_matchId][msg.sender] >= block.timestamp, "Time up");
    require(!matchList[_matchId].isFinish, "Game Over");
    timeLeft[_matchId][msg.sender] = block.timestamp + 60;
    matchList[_matchId].blocks += 1;
    uint _randomNumber = uint(keccak256(abi.encode(block.timestamp, block.difficulty, msg.sender))) % 9;
    if (_randomNumber == 1) {
      matchList[_matchId].isFinish = true;
    }
  }

  // Modifier: used to define a set of rules that must be met before or after a function is executed
  // Check the withdraw() function
  modifier isOwner() {
    // msg.sender: predefined variable that represents address of the account that called the current function
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  /**
   * Function that allows the owner to withdraw all the Ether in the contract
   * The function can only be called by the owner of the contract as defined by the isOwner modifier
   */
  function withdraw() public isOwner {
    (bool success, ) = owner.call{ value: address(this).balance }("");
    require(success, "Failed to send Ether");
  }

  /**
   * Function that allows the contract to receive ETH
   */
  receive() external payable {}
}
