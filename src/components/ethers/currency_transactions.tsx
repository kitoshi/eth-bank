import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import DaiContract from '../../contracts/dai'
import USDCContract from '../../contracts/usdc'
import handleError from '../../scripts/errors'
import CurrencyList from './currency_list'
import styles from './currency_transactions.module.css'

interface CurrencyTransactionProps {
  provider?: ethers.providers.Web3Provider
  signer?: ethers.Signer
}

export interface tokenAttributes {
  name: string
  balance: string
  allowance: string
}

export default function CurrencyTransaction(props: CurrencyTransactionProps) {
  const [contract, setContract] = useState<ethers.Contract[]>([])
  const [signer, setSigner] = useState<ethers.Signer>()
  const [loaded, setLoaded] = useState(false)
  const [attributes, setAttributes] = useState<tokenAttributes[]>([])

  async function tokenAttributeGeneration(
    item: ethers.Contract,
    index: number,
    signer: ethers.Signer
  ): Promise<tokenAttributes> {
    const decimalUnits = [21, 13]
    // have to look at the contract to find out decimal points for ERC-20 contract bigint
    console.log(item)
    const provider = item
    const tokenName: string = await provider.name()
    const tokenBalance: string = ethers.utils.formatUnits(
      await provider.balanceOf(provider.address),
      decimalUnits[index]
    )
    console.log(signer)

    const address = await signer.getAddress()
    const allowanceBalance: string = ethers.utils.formatUnits(
      await provider.allowance(provider.address, address)
    )
    console.log(tokenBalance)
    console.log(tokenName)
    return {
      name: tokenName,
      balance: tokenBalance,
      allowance: '0'
    }
  }

  useEffect((): void => {
    if (!props.provider) {
      console.log('nothing')
      setLoaded(false)
    } else {
      console.log('connected')
      setContract([DaiContract(props.provider), USDCContract(props.provider)])
      setSigner(props.signer)
      setLoaded(true)
    }
  }, [props.provider, props.signer])

  useEffect(() => {
    const getTokenAttributes = async (): Promise<void> => {
      try {
        const tokenAttributesList = []
        for (const token of contract) {
          const tokenAttributes = await tokenAttributeGeneration(
            token,
            contract.indexOf(token),
            signer
          )
          console.log(tokenAttributes)
          tokenAttributesList.push(tokenAttributes)
        }
        setAttributes(tokenAttributesList)
      } catch (err) {
        handleError(err)
      }
    }
    getTokenAttributes()
  }, [loaded])

  return (
    <>
      <ul className={styles.ul}>
        {loaded ? <CurrencyList attributes={attributes} /> : 'loading'}
      </ul>
    </>
  )
}
