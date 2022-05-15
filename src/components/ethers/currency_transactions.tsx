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
  const [attributes, setAttributes] = useState()

  async function tokenAttributeGeneration(
    item: ethers.Contract,
    index: number
  ): Promise<string> {
    const decimalUnits = [21, 13]

    console.log(item)
    const provider = item
    const tokenName: string = await provider.name()
    const tokenBalance: string = ethers.utils.formatUnits(
      await provider.balanceOf(provider.address),
      decimalUnits[index]
    )
    console.log(tokenBalance)
    console.log(tokenName)
    return tokenName
  }

  useEffect((): void => {
    if (!props.provider) {
      console.log('nothing')
      setLoaded(false)
    } else {
      console.log('connected')
      setContract([DaiContract(props.provider), USDCContract(props.provider)])
      const getName = async () => {
        try {
          for (const token of contract) {
            const tokenAttributes = await tokenAttributeGeneration(token, contract.indexOf(token))
            console.log(tokenAttributes)
          }
        } catch (err) {
          console.log(err)
        }
      }
      getName()
      setLoaded(true)
    }
  }, [props.provider])

  return (
    <>
      <ul>{loaded ? 'test' : 'loading'}</ul>
    </>
  )
}
