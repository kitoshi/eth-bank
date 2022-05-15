import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import DaiContract from '../../contracts/dai'
import USDCContract from '../../contracts/usdc'

interface CurrencyTransactionProps {
  provider?: ethers.providers.Web3Provider
}

export default function CurrencyTransaction(props: CurrencyTransactionProps) {
  const [contract, setContract] = useState<ethers.Contract[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect((): void => {
    if (!props.provider) {
      console.log('nothing')
      setLoaded(false)
    } else {
      console.log('connected')
      setContract([DaiContract(props.provider), USDCContract(props.provider)])
      setLoaded(true)
    }
  }, [props.provider])

  async function tokenAttributeGeneration(): Promise<string> {
    const tokenName: string = await contract[0].name()
    return tokenName
  }

  return (
    <>
      <ul>
        <li>{loaded ? 'typescript hell' : 'loading'}</li>
      </ul>
    </>
  )
}
