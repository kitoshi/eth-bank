import { tokenAttributes } from './currency_transactions'
import styles from './currency_list.module.css'
import { ethers, providers } from 'ethers'
import { useEffect, useState } from 'react'
import handleError from '../../scripts/errors'

interface CurrencyListProps {
  attributes: tokenAttributes[]
  provider?: ethers.Contract[]
  signer?: ethers.Signer
  targetWallet: string
  address: string
}

export default function CurrencyList(props: CurrencyListProps) {
  const [amount, setAmount] = useState<{ name: string; value: string }[]>(
    Array(props.provider?.length).fill(0)
  )

  async function allowanceToken(
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) {
    try {
      e.preventDefault()
      if (!props.provider) {
        console.log('undefined allowance')
      } else {
        props.provider[index].allowance(props.address, props.targetWallet)
      }
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  async function transferToken(
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
    amount: string
  ) {
    try {
      e.preventDefault()
      if (!props.provider || !props.signer) {
        console.log('undefined transfer')
      } else {
        const decimalUnits = [18, 6]
        const withSigner = props.provider[index].connect(props.signer)
        withSigner.transfer(
          props.targetWallet,
          ethers.utils.parseUnits(amount[index], decimalUnits[index])
        )
      }
    } catch (error) {
      handleError(error)
      throw error
    }
  }

  function handleAmountInputChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    // fix here
    const { name, value } = e.target
    const updatedAmounts = [...amount, { name, value }]
    setAmount({ name, value })
  }

  const listItems = props.attributes.map((attribute, index) => (
    <li key={attribute.name} className={styles.li}>
      <h4 className={styles.h4}>
        {attribute.name}: {parseFloat(attribute.balance).toFixed(4)}
      </h4>
      <h5>Allowance: {attribute.allowance}</h5>
      <label className={styles.label}>
        Amount:
        <input
          onChange={handleAmountInputChange}
          value={amount[index].value}
          name={attribute.name}
        />
      </label>
      <button
        className={styles.button}
        onClick={(e) => allowanceToken(e, index)}
      >
        Approve
      </button>
      <button
        className={styles.button}
        onClick={(e) => transferToken(e, index, amount[index].value)}
      >
        Transfer
      </button>
    </li>
  ))
  return <>{listItems}</>
}
