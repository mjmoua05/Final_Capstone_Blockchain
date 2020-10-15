# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

Steps to run and test code:
Download files and sources.

Get/install modules:
>npm install 

Compile contracts:
>truffle compile

Test files/configurations:
>truffle test

Upload to Rinkeby network:
>truffle migrate --reset --network rinkeby

You can go check the following below link with the contract addresses to find the contracts that got deployed:
https://rinkeby.etherscan.io/address/
SolnSquareVerifier Contract Address: 0xBe2D3484E40c9B38790967DCE5f995f51Ff016B4
Verifier Contract Address: 0x2cE6997101F0445B326Cf908C2150F2E603e48A2

To mint tokens, I used:
myetherwallet.com
Steps to mint:
Go to "Interact with a Contract"
Input the contract address for SolnSquareVerifier. (listed above)
Input the ABI (ABI: Found in file titled './ABI' in this repository)
Hit Continue.
Fill in parameters for minting the token.

Listed tokens in OpenSea:
OpenSea link: https://rinkeby.opensea.io/storefront/mjtoken-v2


