import { useEffect, useState, EffectCallback } from 'react'
import { ethers } from 'ethers'

export default function Wallet() {
  const [blockNumber, updateBlockNumber] = useState<number>()
  const [metaBalance, updateMetaBalance] = useState<string>()

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

  return (
    <>
      <h2>MetaMask Balance</h2>
      <h3>Balance: {String(metaBalance)} ETH</h3>
      <p>Current Etherium Block Number:{String(blockNumber)} </p>
    </>
  )
}
