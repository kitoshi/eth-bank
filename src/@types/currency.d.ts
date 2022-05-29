export interface CurrencyListProps {
  attributes: tokenAttributes[]
  provider?: ethers.Contract[]
  signer?: ethers.Signer
  targetWallet: string
  address: string
  lockWallet: boolean
}

export interface CurrencyTransactionProps {
  provider?: ethers.providers.Web3Provider
  signer?: ethers.Signer
  targetWallet: string
  lockWallet: boolean
}

export interface tokenAttributes {
  name: string
  decimals: number
  balance: string
  allowance: string
}
