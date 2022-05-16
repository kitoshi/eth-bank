import { tokenAttributes } from './currency_transactions'
import styles from './currency_list.module.css'
import { ethers } from 'ethers'

interface CurrencyListProps {
  attributes: tokenAttributes[]
  provider?: ethers.providers.Web3Provider
  signer?: ethers.Signer
}

export default function CurrencyList(props: CurrencyListProps) {
  const listItems = props.attributes.map((attribute) => (
    <li key={attribute.name} className={styles.li}>
      <h4 className={styles.h4}>
        {attribute.name}: {parseFloat(attribute.balance).toFixed(2)}
      </h4>
      <h5>Allowance: {attribute.allowance}</h5>
      <label className={styles.label}>
        Amount:
        <input></input>
      </label>
      <button className={styles.button}>Approve</button>
      <button className={styles.button}>Transfer</button>
    </li>
  ))
  return <>{listItems}</>
}
