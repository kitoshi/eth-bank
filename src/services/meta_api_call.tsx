import { ethers } from 'ethers'

export default async function readBlockChain(): Promise<number> {
  const provider = new ethers.providers.Web3Provider(
    window.ethereum as Window['ethereum']
  )

  // MetaMask requires requesting permission to connect users accounts
  await provider.send('eth_requestAccounts', [])

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  // const signer = provider.getSigner()

  // Look up the current block number
  const currentBlockNumber = await provider.getBlockNumber()
  return currentBlockNumber
}

// 14467379

// Get the balance of an account (by address or ENS name, if supported by network)
// const balance = await provider.getBalance('ethers.eth')
// { BigNumber: "82826475815887608" }

// Often you need to format the output to something more user-friendly,
// such as in ether (instead of wei)
// ethers.utils.formatEther(balance)
// '0.082826475815887608'

// If a user enters a string in an input field, you may need
// to convert it from ether (as a string) to wei (as a BigNumber)
// ethers.utils.parseEther('1.0')
// { BigNumber: "1000000000000000000" }
