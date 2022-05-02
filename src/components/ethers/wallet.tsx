import { useEffect, useState, EffectCallback } from 'react'
import { ethers } from 'ethers'

export default function Wallet() {
  const [blockNumber, updateBlockNumber] = useState<number>()
  const [metaBalance, updateMetaBalance] = useState<string>()
  const [sendAmount, updateSendAmount] = useState<BigInt>()
  const [sendTargetAddress, updateSendTargetAddress] = useState<string>()

  async function readBlockChain(): Promise<number> {
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

  async function getBalance(): Promise<ethers.BigNumber> {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum as Window['ethereum']
    )

    // MetaMask requires requesting permission to connect users accounts
    const accounts = await provider.send('eth_requestAccounts', [])

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    // const signer = provider.getSigner()

    const balance = await provider.getBalance(accounts[0])
    return balance
  }

  useEffect((): ReturnType<EffectCallback> => {
    const makeBlockChainCall = async () => {
      const number = Promise.resolve(readBlockChain())
      number.then(function (number) {
        updateBlockNumber(number)
      })
    }
    makeBlockChainCall()
  }, [])

  useEffect((): ReturnType<EffectCallback> => {
    const makeBlockChainCall = async () => {
      const number = Promise.resolve(getBalance())
      number.then(function (number) {
        updateMetaBalance(ethers.utils.formatEther(number))
      })
    }
    makeBlockChainCall()
  }, [])

  function handleFormSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      amount: { value: BigInt }
      address: { value: string }
    }
    const amount = target.amount.value // typechecks!
    const address = target.address.value // typechecks!
    updateSendAmount(amount)
    updateSendTargetAddress(address)
    async function sendEthereumTransaction() {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as Window['ethereum']
      )
      const signer = provider.getSigner()
      await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(amount.toString())
      })
    }
    sendEthereumTransaction()

    // etc...
  }

  return (
    <>
      <h2>MetaMask Balance</h2>
      <h3>Balance: {String(metaBalance)} ETH</h3>
      <p>Current Ethereum Block Number:{String(blockNumber)} </p>
      <p>Send Ethereum</p>
      <form id='form-send' onSubmit={handleFormSubmit}>
        <label>Target Address</label>
        <input type='text' id='address'></input>
        <label>Amount</label>
        <input type='text' id='amount'></input>
        <button type='submit' form='form-send'>
          Submit
        </button>
      </form>
    </>
  )
}
