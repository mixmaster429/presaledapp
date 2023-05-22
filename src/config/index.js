import ETHLOGO from '../assets/images/eth.svg'
import USDTLOGO from '../assets/images/usdt.svg'
import BNBLOGO from '../assets/images/bnb.svg'

export const appConfig = {
  walletAddress: '0x61dd554Db8A5939987AC0D90d9B110895eE1B530',
  sellTokens: [
    {
      icon: ETHLOGO,
      symbol: 'SEP',
      type: '',
      chainId: 11155111,
      tokenAddress: null,
      fee: 0.015,
      rate: 7000,
      coin: 'SEP',
    },
    {
      icon: USDTLOGO,
      symbol: 'USDT',
      type: 'ERC20',
      chainId: 1,
      tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      fee: 0.015,
      rate: 30,
      coin: 'ETH',
    },
    {
      icon: BNBLOGO,
      symbol: 'BNB',
      type: '',
      chainId: 56,
      tokenAddress: null,
      fee: 0.0025,
      rate: 1000,
      coin: 'BNB',
    },
    {
      icon: USDTLOGO,
      symbol: 'USDT',
      type: 'BEP20',
      chainId: 56,
      tokenAddress: '0x55d398326f99059ff775485246999027b3197955',
      fee: 0.0025,
      rate: 30,
      coin: 'BNB',
    },
  ],
}
