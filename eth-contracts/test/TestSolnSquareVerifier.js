// Test if a new solution can be added for contract - SolnSquareVerifier
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
let Verifier = artifacts.require('Verifier');
let SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var SHA256 = require("crypto-js/sha256");

let realProof = require('./proof'); //proof file has been copied over to this test folder location

contract('TestSolnSquareVerifier', accounts => {
  const account_one = accounts[0];
  const account_two = accounts[1];

  describe('Test if a new solution can be added for contract - SolnSquareVerifier', function () {
    beforeEach(async function () {
        const sqVerifier = await Verifier.new({from: account_one});
        this.contract = await SolnSquareVerifier.new(sqVerifier.address);
        
    })

    it('can add new solution', async function () {
      let result = await this.contract.addSolution(realProof.proof.a, realProof.proof.b, realProof.proof.c, realProof.inputs, {from: account_one});
      assert.equal(result.logs[0].event, 'SolutionAdded', "Solution not added!");
    });
});

  describe('Test if an ERC721 token can be minted for contract - SolnSquareVerifier', function () {
    beforeEach(async function () {
      const sqVerifier = await Verifier.new({from: account_one});
      this.contract = await SolnSquareVerifier.new(sqVerifier.address);
      
    })

    it('can mint new ERC721 token', async function () {
      let mint = true;
      try{
        await this.contract.mintToken(account_two, 2, realProof.proof.a, realProof.proof.b, realProof.proof.c [2,4], {from:account_one});
      }catch {
        mint = false;
      }
      assert.equal(mint, true,"Cannot mint Token!");
      

    });
  });

});