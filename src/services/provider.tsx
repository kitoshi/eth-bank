import { ethers } from 'ethers'

export default async function loadProvider(): Promise<ethers.providers.Web3Provider> {
  const provider = new ethers.providers.Web3Provider(
    window.ethereum as Window['ethereum']
  )
  return provider
}
