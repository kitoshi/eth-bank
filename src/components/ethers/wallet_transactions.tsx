import {
  useEffect,
  useState,
  EffectCallback,
  useRef,
  useContext,
  useCallback,
  useLayoutEffect
} from 'react'
import { ethers } from 'ethers'
import loadProvider from '../../services/provider'
import handleError from '../../scripts/errors'
import CurrencyTransaction from './currency_transactions'

export default function WalletTransactions() {
  const [providerConnection, setProviderConnection] = useState<boolean>(false)
  const [provider, setProvider] = useState<any>()
  const [lockWallet, setLockWallet] = useState<boolean>(false)
  const [targetWallet, setTargetWallet] = useState<string>('')

  async function connectMetaMask(): Promise<ethers.providers.Web3Provider> {
    try {
      const connectMetaMask = await loadProvider()
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

  function handleTargetWallet(e: React.ChangeEvent<HTMLInputElement>) {
    const address = e.target.value
    setTargetWallet(address)
  }

  function handleResetTargetButton() {
    setTargetWallet('')
    setLockWallet(false)
  }

  function handleSetTargetButton() {
    if (lockWallet === false) {
      setLockWallet(true)
    } else {
      setLockWallet(false)
    }
  }

  useEffect(() => {
    connectMetaMask()
  }, [])

  return (
    <>
      <section
        style={providerConnection ? { display: 'none' } : { display: 'block' }}
      >
        <p>Please Sign in on MetaMask</p>
        <p>Connection is {providerConnection ? 'true' : 'false'}</p>
        <button onClick={connectMetaMask}>Retry</button>
      </section>
      <section>
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
      <CurrencyTransaction provider={provider} />
    </>
  )
}