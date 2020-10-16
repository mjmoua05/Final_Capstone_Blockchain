pragma solidity >=0.5.0;
import "./ERC721Mintable.sol";
import "./Verifier.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {

}
// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token {
  SquareVerifier public verifierContract;
  constructor(address verifierAddress) CustomERC721Token() public{
    verifierContract = SquareVerifier(verifierAddress);
  }

  // TODO define a solutions struct that can hold an index & an address
  struct Solution {
    uint256 index;
    address to;
    bytes32 hash;
  }

  // TODO define an array of the above struct
  uint256 solCount = 0;

  // TODO define a mapping to store unique solutions submitted
  mapping(bytes32 => Solution) public uniqueSolutions;

  // TODO Create an event to emit when a solution is added
  event SolutionAdded(address to, uint256 index, bytes32 hash);

  // TODO Create a function to add the solutions to the array and emit the event
  function addSolution(uint[2] memory a, uint[2][2] memory b, uint[2] memory c,
  uint[2] memory input) public {
        bytes32 hash = keccak256(abi.encodePacked(a, b, c, input));
        require(uniqueSolutions[hash].index == 0, "Solution already exsits");
        uniqueSolutions[hash] = Solution({index: solCount, to: msg.sender, hash:hash});
        solCount+=1;
        emit SolutionAdded(msg.sender, solCount, hash);
    }

  // TODO Create a function to mint new NFT only after the solution has been verified
  //  - make sure the solution is unique (has not been used before)
  //  - make sure you handle metadata as well as tokenSupply
  function mintToken(address _to, uint256 _index,
  uint[2] memory a, uint[2][2] memory b, uint[2] memory c,
  uint[2] memory input) public {
    bytes32 hash = keccak256(abi.encodePacked(a, b, c, input));
    require(uniqueSolutions[hash].to == address(0), "Solution already exists!");
    addSolution(a, b, c, input);
    emit SolutionAdded(msg.sender, solCount, hash);
    mint(_to, _index);
       
  }
  

}