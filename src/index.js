import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'
import { sepolia, mainnet, bsc } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import App from './App'
import reportWebVitals from './reportWebVitals'
import '@rainbow-me/rainbowkit/styles.css'
import './index.css'

const { chains, publicClient } = configureChains(
  [mainnet, bsc, sepolia],
  [publicProvider()]
)

// const { connectors } = getDefaultWallets({
//   chains,
// })

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [metaMaskWallet({ chains })],
  },
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
)

reportWebVitals()
