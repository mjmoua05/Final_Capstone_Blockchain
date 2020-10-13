const HDWalletProvider = require('truffle-hdwallet-provider')
const web3 = require('web3')
const fs = require('fs');
const MNEMONIC = fs.readFileSync("mm.secret").toString().trim();
const INFURA_KEY = "de0786ec5b414595ae3254071d18451c"
const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS
const NFT_CONTRACT_ADDRESS = "0x5EA06220806adD381Fd8BA04d34c30d81126130B"
const OWNER_ADDRESS="0xd64ce22602252743f0748618ef0c13669d1a33c0"
const NETWORK = "rinkeby"
const NUM_CREATURES = 12
const NUM_LOOTBOXES = 4
const DEFAULT_OPTION_ID = 0
const LOOTBOX_OPTION_ID = 2



if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error(
    'Please set a mnemonic, infura key, owner, network, and contract address.'
  )
  return
}

const NFT_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
    ],
    name: 'mintTo',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const FACTORY_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: '_optionId',
        type: 'uint256',
      },
      {
        name: '_toAddress',
        type: 'address',
      },
    ],
    name: 'mint',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

async function main() {
  const network =
    NETWORK === 'mainnet' || NETWORK === 'live' ? 'mainnet' : 'rinkeby'
  const provider = new HDWalletProvider(
    MNEMONIC,
    `https://${network}.infura.io/v3/${INFURA_KEY}`
  )
  const web3Instance = new web3(provider)

  if (NFT_CONTRACT_ADDRESS) {
    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS,
      { gasLimit: '1000000' }
    )

    // Creatures issued directly to the owner.
    for (var i = 0; i < NUM_CREATURES; i++) {
      const result = await nftContract.methods
        .mintTo(OWNER_ADDRESS)
        .send({ from: OWNER_ADDRESS })
      console.log('Minted creature. Transaction: ' + result.transactionHash)
    }
  } else if (FACTORY_CONTRACT_ADDRESS) {
    const factoryContract = new web3Instance.eth.Contract(
      FACTORY_ABI,
      FACTORY_CONTRACT_ADDRESS,
      { gasLimit: '1000000' }
    )

    // Creatures issued directly to the owner.
    for (var i = 0; i < NUM_CREATURES; i++) {
      const result = await factoryContract.methods
        .mint(DEFAULT_OPTION_ID, OWNER_ADDRESS)
        .send({ from: OWNER_ADDRESS })
      console.log('Minted creature. Transaction: ' + result.transactionHash)
    }

    // Lootboxes issued directly to the owner.
    for (var i = 0; i < NUM_LOOTBOXES; i++) {
      const result = await factoryContract.methods
        .mint(LOOTBOX_OPTION_ID, OWNER_ADDRESS)
        .send({ from: OWNER_ADDRESS })
      console.log('Minted lootbox. Transaction: ' + result.transactionHash)
    }
  } else {
    console.error(
      'Add NFT_CONTRACT_ADDRESS or FACTORY_CONTRACT_ADDRESS to the environment variables'
    )
  }
}

main()