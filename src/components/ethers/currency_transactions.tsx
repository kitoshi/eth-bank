import { ethers } from 'ethers'
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  useContext,
  useEffect,
  useState
} from 'react'
import DaiContract from '../../contracts/dai'
import USDCContract from '../../contracts/usdc'

export default function CurrencyTransaction(props: any) {
  const [provider, setProvider] = useState<any>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  /*  async function createERC20TokenInformation(ERC20Token: string) {
    const name = await provider[ERC20Token].name()
    const balance = provider[ERC20Token].address
    console.log(name)
    console.log(balance)
  }
 */
  useEffect(() => {
    if (props.provider === undefined) {
      console.log('nothing')
      setLoaded(false)
    } else {
      console.log('connected')
      setProvider([DaiContract(props.provider), USDCContract(props.provider)])
      /*       for (const item in provider) {
        createERC20TokenInformation(item)
      } */
      setLoaded(true)
    }
  }, [props.provider])

  const listItem: React.FunctionComponent = () => {
    if (loaded === false) {
      return (
        <>
          <li>loading</li>
        </>
      )
    } else {
      return (
        <>
          <li key={provider[0].ERC20Token.name()}>
            {provider[0].ERC20Token.name()}
          </li>
        </>
      )
    }
  }

  /*   const ERC20TokenInformation = provider.map(
    (
      item:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | ReactFragment
        | null
        | undefined
    ) => (
      <li key={item}>
        <h2>{item}</h2>
      </li>
    )
  ) */
  return (
    <>
      <ul>
        <li>{listItem(props)}</li>
      </ul>
    </>
  )
}
