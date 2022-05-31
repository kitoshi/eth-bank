/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import handleError from '../../scripts/errors'
import CurrencyTransaction from './currency_transactions'
import styles from './wallet_transactions.module.css'
import loadProvider from '../../services/provider'

export default function WalletTransactions(): JSX.Element {
  const [providerConnection, setProviderConnection] = useState(false)
  const [providerInstance, setProviderInstance] =
    useState<ethers.providers.Web3Provider>()
  const [signer, setSigner] = useState<ethers.Signer>()
  const [lockWallet, setLockWallet] = useState(false)
  const [targetWallet, setTargetWallet] = useState('')
  const [account, setAccount] = useState('')

  async function connectMetaMask(): Promise<void> {
    try {
      const provider = await loadProvider()
      const signer = provider.getSigner()
      setSigner(signer)
      setProviderConnection(true)
      setProviderInstance(provider)
      // account listener not triggering
      provider.on('accountsChanged', (accounts: string[]) => {
        console.log(accounts[0])
      })
      provider.on('chainChanged', (chainId) => {
        console.log(chainId)
      })
      setAccount(await signer.getAddress())
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

  useEffect(() => {
    connectMetaMask()
    return () => {
      if (!providerInstance) {
        //do nothing
      } else {
        providerInstance.off
      }
    }
  }, [account])

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
        provider={providerInstance}
        signer={signer}
        targetWallet={targetWallet}
        lockWallet={lockWallet}
      />
    </>
  )
}
