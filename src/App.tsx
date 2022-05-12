import React from 'react'
import './App.css'
import Wallet from './components/ethers/wallet'
import MetaMask from './components/ethers/metamask'
import Transactions from './components/ethers/transactions'
import TestFunc from './components/ethers/testfile'
function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Transact DAI and USDC</h1>
      </header>
      <main>
        <Transactions />
      </main>
    </div>
  )
}

export default App
