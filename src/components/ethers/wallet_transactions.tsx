import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import loadProvider from '../../services/provider'
import handleError from '../../scripts/errors'
import CurrencyTransaction from './currency_transactions'
import styles from './wallet_transactions.module.css'

export default function WalletTransactions(): JSX.Element {
  const [providerConnection, setProviderConnection] = useState(false)
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()
  const [signer, setSigner] = useState<ethers.Signer>()
  const [lockWallet, setLockWallet] = useState(false)
  const [targetWallet, setTargetWallet] = useState('')

  async function connectMetaMask(): Promise<ethers.providers.Web3Provider> {
    try {
      const connectMetaMask = await loadProvider()
      const signer = connectMetaMask.getSigner()
      setSigner(signer)
      setProviderConnection(true)
      setProvider(connectMetaMask)
      return connectMetaMask
    } catch (error) {
      setProviderConnection(false)
      window.open('https://metamask.io/', '_blank', 'popup')
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
        <p>Please Sign in on MetaMask</p>
        <p>Connection is {providerConnection ? 'true' : 'false'}</p>
        <button onClick={connectMetaMask}>Retry</button>
      </section>
      <section className={styles.section}>
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
      <CurrencyTransaction provider={provider} signer={signer} targetWallet={targetWallet}/>
    </>
  )
}
