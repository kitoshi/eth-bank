import { useEffect, useState, useCallback, EffectCallback } from 'react'
import readBlockChain from '../../services/meta_api_call'

export default function Wallet() {
  const [blockNumber, updateBlockNumber] = useState<number>(0)

  useEffect((): ReturnType<EffectCallback> => {
    const makeBlockChainCall = async () => {
      const number = readBlockChain()
      return number
    }
    console.log(makeBlockChainCall())
  }, [])

  return (
    <>
      <h2>MetaMask Balance</h2>
      <p>balance:</p>
    </>
  )
}
