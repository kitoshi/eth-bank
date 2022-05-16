import { tokenAttributes } from './currency_transactions'
import styles from './currency_list.module.css'

interface CurrencyListProps {
  attributes: tokenAttributes[]
}

export default function CurrencyList(props: CurrencyListProps) {
  const listItems = props.attributes.map((attribute) => (
    <li key={attribute.name} className={styles.li}>
      <h4 className={styles.h4}>{attribute.name}</h4>
      <h5>Allowance: {attribute.balance}</h5>
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
