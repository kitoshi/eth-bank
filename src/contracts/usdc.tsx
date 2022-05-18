import { ethers } from 'ethers'
export default function USDCContract(
  provider: ethers.providers.Web3Provider
): ethers.Contract {
  const USDCAbi = [
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
    'function approve(adress spender, uint amount) public returns (bool success)',

    // Allow contracts to send tokens on your behalf
    'function transferFrom(address from, address to, uint amount) public returns (bool success)',

    // An event triggered whenever anyone transfers to someone else
    'event Transfer(address indexed from, address indexed to, uint amount)'
  ]

  const USDCAddress = '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b'
  const USDCContract = new ethers.Contract(USDCAddress, USDCAbi, provider)
  return USDCContract
}
