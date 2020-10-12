var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    console.log("Acct one:"+account_one);
    console.log("Acct two:"+account_two);
    console.log("Acct three:"+account_three);

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            this.contract.mint(account_two, 1, {from: account_one})
            this.contract.mint(account_two, 2, {from: account_one});
            this.contract.mint(account_three, 3, {from: account_one});
            this.contract.mint(account_three, 4, {from: account_one});
        })

        it('should return total supply', async function () { 
            let totalTokenSupply = await this.contract.totalSupply.call();
            console.log(parseInt(totalTokenSupply));
            assert.equal(parseInt(totalTokenSupply), 4, "Incorrect supply");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf.call(account_two);
            console.log(balance);
            assert.equal(parseInt(balance), 2, "Incorrect token supply count");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.baseTokenURI();
            console.log(tokenURI);
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/");
        })

        it('should transfer token from one owner to another', async function () { 
            let tokenId = 2;
            //let tokenOwner = await this.contract.ownerOf(2);
            //console.log("Previous Account owner:"+tokenOwner);
            await this.contract.transferFrom(account_two, account_three, tokenId, {from: account_two});
            let newOwner = await this.contract.ownerOf(2);
            console.log("NEW Account owner:"+newOwner);
            assert.equal(newOwner, account_three, "Incorrect owner after transfer!");
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let mintStatusFailed = false;
            try {
                await this.contract.mint(account_three, 5, {from: account_one});
                console.log("Mint SUCCEEDED.");
            }catch{
                mintStatusFailed=true;
                console.log("Mint FAILED.");
            }
            assert.equal(mintStatusFailed, false, "Caller is not the contract owner!");

        })

        it('should return contract owner', async function () { 
            let contractOwner = await this.contract.owner();
            assert.equal(contractOwner, account_one, "Contract owner and account do not match!");
        })

    });
})