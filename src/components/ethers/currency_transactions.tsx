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
  targetWallet: string
  lockWallet: boolean
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
  const [address, setAddress] = useState('')

  async function tokenAttributeGeneration(
    item: ethers.Contract,
    index: number,
    signer: ethers.Signer,
    targetWallet: string
  ): Promise<tokenAttributes> {
    const decimalUnits = [21, 13]
    // have to look at the contract to find out decimal points for ERC-20 contract bigint
    const provider = item
    const tokenName: string = await provider.name()
    // balance of metamask wallet address
    const tokenBalance: string = ethers.utils.formatUnits(
      await provider.balanceOf(provider.address),
      decimalUnits[index]
    )
    const address = await signer.getAddress()
    setAddress(address)
    // default value with empty input field
    if (targetWallet === '') {
      return {
        name: tokenName,
        balance: tokenBalance,
        allowance: '0.0'
      }
    } else {
      const allowance = await provider.allowance(targetWallet, provider.address)
      // allowance to address provided
      const allowanceBalance = ethers.utils.formatUnits(
        allowance,
        decimalUnits[index]
      )
      return {
        name: tokenName,
        balance: tokenBalance,
        allowance: allowanceBalance
      }
    }
  }

  useEffect((): void => {
    if (!props.provider || !props.signer) {
      setLoaded(false)
    } else {
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
          if (signer === undefined) {
            // signer is loading
          } else {
            const tokenAttributes = await tokenAttributeGeneration(
              token,
              contract.indexOf(token),
              signer,
              props.targetWallet
            )
            tokenAttributesList.push(tokenAttributes)
          }
        }
        setAttributes(tokenAttributesList)
      } catch (err) {
        handleError(err)
      }
    }
    getTokenAttributes()
  }, [loaded, props.targetWallet])

  return (
    <>
      <ul className={styles.ul}>
        {loaded ? (
          <CurrencyList
            attributes={attributes}
            provider={contract}
            signer={props.signer}
            targetWallet={props.targetWallet}
            address={address}
            lockWallet={props.lockWallet}
          />
        ) : (
          'loading'
        )}
      </ul>
    </>
  )
}
