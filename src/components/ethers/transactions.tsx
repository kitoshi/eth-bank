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

export default function Transactions() {
  const [provider, setProvider] = useState<boolean>(false)
  const [targetWallet, setTargetWallet] = useState<string>('')
  const walletAddress = useRef<HTMLInputElement>(null)

  async function connectMetaMask(): Promise<ethers.providers.Web3Provider> {
    try {
      const connectMetaMask = await loadProvider()
      setProvider(true)
      return connectMetaMask
    } catch (error) {
      setProvider(false)
      window.open('https://metamask.io/', '_blank', 'popup')
      handleError(error)
      throw error
    }
  }
  connectMetaMask()

  return (
    <>
      <section style={provider ? { display: 'none' } : { display: 'block' }}>
        <p>Please Sign in on MetaMask</p>
        <p>Connection is {provider ? 'true' : 'false'}</p>
        <button onClick={connectMetaMask}>Retry</button>
      </section>
      <section>
        <form>
          <label>Target Wallet</label>
          <input
            onChange={(e) => setTargetWallet(e.target.value)}
            type='text'
          />
          <button>Set</button>
          <button type='reset'>Clear</button>
        </form>
      </section>
    </>
  )
}
