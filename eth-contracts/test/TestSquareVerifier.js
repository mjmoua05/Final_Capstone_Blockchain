var Verifier = artifacts.require('Verifier');
let realProof = require('./proof'); //proof file has been copied over to this test folder location

contract('Verifier', account => {
  const account_one = account[0];
    
  describe('Test verification with correct proof', function () {
    beforeEach(async function () {

        try {
            this.contract = await Verifier.new({from: account_one});
        }
        catch (e) {
            console.log(e);
        }
    });

    it('verification with correct proof', async function () {
      let result = await this.contract.verifyTx.call(realProof.proof.a, realProof.proof.b, realProof.proof.c, realProof.inputs,{ from: account_one });
      assert.equal(result, true, "Unexpected verification result");
    });

    // Test verification with incorrect proof
    it('Test verification with incorrect proof', async function () {
      let inputs = [5, 5]
      let result = await this.contract.verifyTx.call(realProof.proof.a, realProof.proof.b, realProof.proof.c, inputs,{ from: account_one });
      assert.equal(result, false, "The proof is not correct");
    })
  })
})