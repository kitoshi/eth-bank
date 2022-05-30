/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import handleError from '../../scripts/errors'
import CurrencyTransaction from './currency_transactions'
import styles from './wallet_transactions.module.css'
import Web3Modal from 'web3modal'

export default function WalletTransactions(): JSX.Element {
  const [providerConnection, setProviderConnection] = useState(false)
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()
  const [signer, setSigner] = useState<ethers.Signer>()
  const [lockWallet, setLockWallet] = useState(false)
  const [targetWallet, setTargetWallet] = useState('')

  const providerOptions = {
    /* See Provider Options Section */
  }

  const web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true, // optional
    providerOptions // required
  })

  async function connectMetaMask(): Promise<ethers.providers.Web3Provider> {
    try {
      const instance = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(instance)
      const signer = provider.getSigner()
      //const connectMetaMask = await loadProvider()
      //const signer = connectMetaMask.getSigner()
      setSigner(signer)
      setProviderConnection(true)
      setProvider(provider)
      return provider
    } catch (error) {
      setProviderConnection(false)
      handleError(error)
      throw error
    }
  }

  function handleTargetWallet(e: React.ChangeEvent<HTMLInputElement>): void {
    const address = e.target.value
    setTargetWallet(address)
  }

  function handleResetTargetButton(): void {
    setTargetWallet('')
    setLockWallet(false)
  }

  function handleSetTargetButton(): void {
    if (!lockWallet) {
      setLockWallet(true)
    } else {
      setLockWallet(false)
    }
  }

  useEffect((): void => {
    connectMetaMask()
  }, [])

  return (
    <>
      <section
        style={providerConnection ? { display: 'none' } : { display: 'block' }}
        className={styles.section}
      >
        <p>Please Install MetaMask</p>
        <p>Connection is {providerConnection ? 'true' : 'broken.'}</p>
        <button onClick={connectMetaMask}>Retry</button>
      </section>
      <section
        className={styles.section}
        style={providerConnection ? { display: 'block' } : { display: 'none' }}
      >
        <label>Target Wallet</label>
        <input
          value={targetWallet}
          onChange={handleTargetWallet}
          type='text'
          disabled={lockWallet}
        />
        <button onClick={handleSetTargetButton} disabled={lockWallet}>
          Set
        </button>
        <button type='reset' onClick={handleResetTargetButton}>
          Clear
        </button>
      </section>
      <CurrencyTransaction
        provider={provider}
        signer={signer}
        targetWallet={targetWallet}
        lockWallet={lockWallet}
      />
    </>
  )
}
