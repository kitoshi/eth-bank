import React from 'react'
import './App.css'
import Wallet from './components/ethers/wallet'
import MetaMask from './components/ethers/metamask'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>very cool blockchain app</h1>
      </header>
      <MetaMask />
      <Wallet />
    </div>
  )
}

export default App
