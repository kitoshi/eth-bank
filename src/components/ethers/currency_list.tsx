import { tokenAttributes } from './currency_transactions'
import styles from './currency_list.module.css'
import { ethers, providers } from 'ethers'
import { useEffect } from 'react'
import handleError from '../../scripts/errors'

interface CurrencyListProps {
  attributes: tokenAttributes[]
  provider?: ethers.Contract[]
  signer?: ethers.Signer
  targetWallet: string
  address: string
}

export default function CurrencyList(props: CurrencyListProps) {
  async function allowanceToken(index: number): Promise<boolean> {
    if (!props.provider) {
      console.log(props.provider)
    } else {
      try {
        const reply = props.provider[index].allowance(
          props.address,
          props.targetWallet
        )
        return reply
      } catch (error) {
        handleError(error)
      }
    }
  }

  const listItems = props.attributes.map((attribute, index) => (
    <li key={attribute.name} className={styles.li}>
      <h4 className={styles.h4}>
        {attribute.name}: {parseFloat(attribute.balance).toFixed(2)}
      </h4>
      <h5>Allowance: {attribute.allowance}</h5>
      <label className={styles.label}>
        Amount:
        <input></input>
      </label>
      <button className={styles.button} onClick={allowanceToken(index)}>
        Approve
      </button>
      <button className={styles.button}>Transfer</button>
    </li>
  ))
  return <>{listItems}</>
}
