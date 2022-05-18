import { tokenAttributes } from './currency_transactions'
import styles from './currency_list.module.css'
import { ethers } from 'ethers'
import { useState } from 'react'
import handleError from '../../scripts/errors'

interface CurrencyListProps {
  attributes: tokenAttributes[]
  provider?: ethers.Contract[]
  signer?: ethers.Signer
  targetWallet: string
  address: string
  lockWallet: boolean
}

export default function CurrencyList(props: CurrencyListProps) {
  const [amount, setAmount] = useState<[string, string][]>(
    Array(props.provider?.length).fill(['name', '0'])
  )

  async function handleTransactionButton(
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
    amount: string
  ) {
    try {
      if (!props.provider || !props.signer) {
        console.log('undefined transfer')
      } else {
        const decimalUnits = [18, 6]
        const withSigner = props.provider[index].connect(props.signer)
        if (e.currentTarget.name === 'transfer') {
          withSigner.transfer(
            props.targetWallet,
            ethers.utils.parseUnits(amount, decimalUnits[index])
          )
        } else {
          withSigner.approve(
            props.targetWallet,
            ethers.utils.parseUnits(amount, decimalUnits[index])
          )
        }
      }
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  function handleAmountInputChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    // scalable input fields
    const updatedAmounts = [...amount]
    updatedAmounts.splice(parseInt(e.target.id), 1, [
      e.target.name,
      e.target.value
    ])
    setAmount(updatedAmounts)
  }

  const listItems = props.attributes.map((attribute, index) => (
    // each token passed through here
    <li key={attribute.name} className={styles.li}>
      <h4 className={styles.h4}>
        {attribute.name}: {parseFloat(attribute.balance).toFixed(4)}
      </h4>
      <h5>Allowance: {attribute.allowance}</h5>
      <label className={styles.label}>
        Amount:
        <input
          onChange={handleAmountInputChange}
          value={amount[index][1]}
          id={index.toString()}
          name={attribute.name}
        />
      </label>
      <button
        className={styles.button}
        onClick={(e) => handleTransactionButton(e, index, amount[index][1])}
        name='approve'
        disabled={props.lockWallet === false}
      >
        Approve
      </button>
      <button
        className={styles.button}
        onClick={(e) => handleTransactionButton(e, index, amount[index][1])}
        name='transfer'
        disabled={props.lockWallet === false}
      >
        Transfer
      </button>
    </li>
  ))
  return <>{listItems}</>
}
