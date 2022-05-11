import { useEffect, useState, EffectCallback, useRef } from 'react'
import { ethers } from 'ethers'

export default function Wallet() {
  const [metaBalance, updateMetaBalance] = useState<string>()
  const [daiBalance, updateDaiBalance] = useState<string>()
  const [USDCBalance, updateUSDCBalance] = useState<string>()
  const [sendAmount, updateSendAmount] = useState<BigInt>()
  const [sendTargetAddress, updateSendTargetAddress] = useState<string>()
  const ethereumForm = useRef<HTMLFormElement>(null)
  const daiForm = useRef<HTMLFormElement>(null)
  const usdcForm = useRef<HTMLFormElement>(null)

  async function getBalance(): Promise<ethers.BigNumber> {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum as Window['ethereum']
    )
    const accounts = await provider.send('eth_requestAccounts', [])
    const balance = await provider.getBalance(accounts[0])
    return balance
  }

  async function getDaiBalance(): Promise<ethers.BigNumber> {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum as Window['ethereum']
    )
    const daiAbi = [
      // Some details about the token
      'function name() view returns (string)',
      'function symbol() view returns (string)',

      // Get the account balance
      'function balanceOf(address) view returns (uint)',

      // Send some of your tokens to someone else
      'function transfer(address to, uint amount)',

      // An event triggered whenever anyone transfers to someone else
      'event Transfer(address indexed from, address indexed to, uint amount)'
    ]

    const daiAddress = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa'
    const daiContract = new ethers.Contract(daiAddress, daiAbi, provider)
    const balance = await daiContract.balanceOf(daiAddress)
    return balance
  }

  async function getUSDCBalance(): Promise<ethers.BigNumber> {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum as Window['ethereum']
    )
    const USDCAbi = [
      // Some details about the token
      'function name() view returns (string)',
      'function symbol() view returns (string)',

      // Get the account balance
      'function balanceOf(address) view returns (uint)',

      // Send some of your tokens to someone else
      'function transfer(address to, uint amount)',

      // An event triggered whenever anyone transfers to someone else
      'event Transfer(address indexed from, address indexed to, uint amount)'
    ]

    const USDCAddress = '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b'
    const USDCContract = new ethers.Contract(USDCAddress, USDCAbi, provider)
    const balance = await USDCContract.balanceOf(USDCAddress)
    return balance
  }

  useEffect((): ReturnType<EffectCallback> => {
    const makeBlockChainCall = async () => {
      const number = Promise.resolve(getBalance())
      number.then(function (number) {
        updateMetaBalance(ethers.utils.formatEther(number))
      })
    }
    const makeContractCall = async () => {
      const number = Promise.resolve(getDaiBalance())
      number.then(function (number) {
        updateDaiBalance(ethers.utils.formatUnits(number, 21))
      })
    }
    const makeUSDCCall = async () => {
      const number = Promise.resolve(getUSDCBalance())
      number.then(function (number) {
        updateUSDCBalance(ethers.utils.formatUnits(number, 13))
      })
    }
    makeBlockChainCall()
    makeContractCall()
    makeUSDCCall()
  }, [])

  function handleFormSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      amount: { value: BigInt }
      address: { value: string }
    }
    const amount = target.amount.value // typechecks!
    const address = target.address.value // typechecks!
    updateSendAmount(amount)
    updateSendTargetAddress(address)
    async function sendEthereumTransaction() {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as Window['ethereum']
      )
      const signer = provider.getSigner()
      await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(amount.toString())
      })
    }
    async function sendDaiTransaction() {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as Window['ethereum']
      )
      const signer = provider.getSigner()
      const daiAbi = [
        // Some details about the token
        'function name() view returns (string)',
        'function symbol() view returns (string)',

        // Get the account balance
        'function balanceOf(address) view returns (uint)',

        // Send some of your tokens to someone else
        'function transfer(address to, uint amount)',

        // An event triggered whenever anyone transfers to someone else
        'event Transfer(address indexed from, address indexed to, uint amount)'
      ]

      const daiAddress = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa'
      const daiContract = new ethers.Contract(daiAddress, daiAbi, provider)
      const daiWithSigner = daiContract.connect(signer)
      await daiWithSigner.transfer(
        address,
        ethers.utils.parseUnits(amount.toString(), 18)
      )
    }
    async function sendUSDCTransaction() {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as Window['ethereum']
      )
      const signer = provider.getSigner()
      const USDCAbi = [
        // Some details about the token
        'function name() view returns (string)',
        'function symbol() view returns (string)',

        // Get the account balance
        'function balanceOf(address) view returns (uint)',

        // Send some of your tokens to someone else
        'function transfer(address to, uint amount)',

        // An event triggered whenever anyone transfers to someone else
        'event Transfer(address indexed from, address indexed to, uint amount)'
      ]

      const USDCAddress = '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b'
      const USDCContract = new ethers.Contract(USDCAddress, USDCAbi, provider)
      const usdcWithSigner = USDCContract.connect(signer)
      await usdcWithSigner.transfer(
        address,
        ethers.utils.parseUnits(amount.toString(), 6)
      )
    }
    console.log(e.currentTarget.innerHTML)
    switch (e.currentTarget.id) {
      case 'ethereum':
        sendEthereumTransaction()
        break
      case 'dai':
        sendDaiTransaction()
        break
      case 'usdc':
        sendUSDCTransaction()
    }

    // etc...
  }

  return (
    <section>
      <h2>MetaMask Balance</h2>
      <form id='wallet' onSubmit={handleFormSubmit}>
        <label>Target Wallet</label>
        <input type='text'></input>
        <button>Set</button>
        <button>Clear</button>
      </form>
      <h2>MetaMask Balance</h2>

      <h4>Balance: {String(daiBalance)} DAI</h4>
      <p>Send DAI</p>
      <form id='dai' onSubmit={handleFormSubmit} ref={daiForm}>
        <label>Target Address</label>
        <input type='text' id='address'></input>
        <label>Amount</label>
        <input type='text' id='amount'></input>
        <button type='submit'>Approve</button>
        <button type='submit'>Transfer</button>
      </form>
      <h4>Balance: {String(USDCBalance)} USDC</h4>
      <p>Send USDC</p>
      <form id='usdc' onSubmit={handleFormSubmit} ref={usdcForm}>
        <label>Target Address</label>
        <input type='text' id='address'></input>
        <label>Amount</label>
        <input type='text' id='amount'></input>
        <button type='submit' form='usdc'>
          Transfer
        </button>
      </form>
      <h3>Balance: {String(metaBalance)} ETH</h3>
      <p>Send Ethereum</p>
      <form id='ethereum' onSubmit={handleFormSubmit} ref={ethereumForm}>
        <label>Target Address</label>
        <input type='text' id='address'></input>
        <label>Amount</label>
        <input type='text' id='amount'></input>
        <button type='submit' form='ethereum'>
          Transfer
        </button>
      </form>
    </section>
  )
}
