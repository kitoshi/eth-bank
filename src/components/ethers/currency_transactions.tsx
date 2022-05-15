import { ethers } from 'ethers'
import {
  useEffect,
  useState
} from 'react'
import DaiContract from '../../contracts/dai'
import USDCContract from '../../contracts/usdc'

interface CurrencyTransactionProps<T> {
   
}
 
export default function CurrencyTransaction(props: CurrencyTransactionProps) {
  const [provider, setProvider] = useState<any>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (props.provider === undefined) {
      console.log('nothing')
      setLoaded(false)
    } else {
      console.log('connected')
      setProvider([DaiContract(props.provider), USDCContract(props.provider)])

      setLoaded(true)
    }
  }, [props.provider])

  async function tokenAttributeGeneration(): Promise<string> {
    const tokenName = await provider[0].name()
    return tokenName
  }

  const listItem = async (): Promise<JSX.Element> => {
    if (loaded === false) {
      return (
        <>
          <li>loading</li>
        </>
      )
    } else {
      return (
        <>
          <li>typescript hell</li>
        </>
      )
    }
  }

  return (
    <>
      <ul>{listItem}</ul>
    </>
  )
}
