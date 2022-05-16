import React from 'react'
import Transactions from './components/ethers/wallet_transactions'
import styles from './App.module.css'
function App() {
  return (
    <div className={styles.div}>
      <header className='App-header'>
        <h1 className={styles.h1}>Transact DAI and USDC</h1>
      </header>
      <main>
        <Transactions />
      </main>
    </div>
  )
}

export default App
