import { ethers } from 'ethers'
export default function DaiContract(
  provider: ethers.providers.Web3Provider
): ethers.Contract {
  const daiAbi = [
    // Some details about the token
    'function name() view returns (string)',
    'function symbol() view returns (string)',

    // Get the account balance
    'function balanceOf(address) view returns (uint)',

    // Send some of your tokens to someone else
    'function transfer(address to, uint amount)',

    // See allowance from ERC20 contract
    'function allowance(address owner, address spender) view returns (uint)',

    // Allow spender to withdraw from account up to the tokens amount
    'function approve(address spender, uint amount) public returns (bool success)',

    // Allow contracts to send tokens on your behalf
    'function transferFrom(address from, address to, uint amount) public returns (bool success)',

    // An event triggered whenever anyone transfers to someone else
    'event Transfer(address indexed from, address indexed to, uint amount)'
  ]

  const daiAddress = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa'
  const daiContract = new ethers.Contract(daiAddress, daiAbi, provider)
  return daiContract
}
