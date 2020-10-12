// Test if a new solution can be added for contract - SolnSquareVerifier
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
let Verifier = artifacts.require('Verifier');
let SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

let realProof = require('./proof'); //proof file has been copied over to this test folder location

contract('TestSolnVerifier', accounts => {
  const account_one = accounts[0];
  const account_two = accounts[1];
  const account_three = accounts[2];


  describe('Test if a new solution can be added for contract - SolnSquareVerifier', function () {
    beforeEach(async function () {
        const sqVerifier = await Verifier.new({from: account_one});
        this.contract = await SolnSquareVerifier.new();
    })

    it('can add new solution', async function () {
      let result = await this.contract.addSolution(realProof.proof.a, realProof.proof.b, realProof.proof.c, realProof.inputs,{from: account_one});
      assert.equal(result.logs[0].args[1], account_two,"Solution address doesn't match senders!");
      try{
        let result2 = await this.contract.addSolution(realProof.proof.a, realProof.proof.b, realProof.proof.c, realProof.inputs,{from: account_one});
        throw(result2)
      }catch(error){
        assert.equal(error.reason,"Solution already exists!","Was able to make two identical solutions");
      }
    });
});

  describe('Test if an ERC721 token can be minted for contract - SolnSquareVerifier', function () {
    beforeEach(async function () {
      const sqVerifier = await Verifier.new({from: account_one});
        this.contract = await SolnSquareVerifier.new();
    })

    it('can mint new ERC721 token', async function () {
      let result = await this.contract.addSolution(realProof.proof.a, realProof.proof.b, realProof.proof.c, realProof.inputs,{from:account_one});
      assert.equal(result.logs[0].args[1], account_one,"Solution address doesn't match senders adddress");
      await this.contract.mintToken(realProof.inputs[0], realProof.inputs[1], account_three,{from:account_one});
      let balance = await this.contract.balanceOf(account_three);
      assert.equal(parseInt(balance), 1, "Incorrect token balance");

      let uri = await this.contract.tokenURI(0,{from:account_one});
      assert.equal(uri, originalURI," Incorrect uri");


    });
  });

});