import { useState, useEffect } from 'react'
import {
  Grid,
  Box,
  Container,
  Typography,
  Button,
  TextField,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import {
  useConnect,
  useAccount,
  useNetwork,
  useSwitchNetwork,
  useBalance,
} from 'wagmi'
import { appConfig } from './config'
import './App.css'

function App() {
  const [sellBalance, setSellBalance] = useState('')
  const [buyBalance, setBuyBalance] = useState('')
  const [selectedToken, setSelectedToken] = useState(appConfig?.sellTokens[0])
  const [insufficientBalance, setInsufficientBalance] = useState(false)

  const { isConnected, address } = useAccount()
  const useConnectObjects = useConnect()
  const { connect, connectors } = useConnectObjects
  const connecting = useConnectObjects.isLoading
  const { chain } = useNetwork()
  const { chains, isLoading, switchNetwork } = useSwitchNetwork()

  const correctNetwork = chains.some((element) => element.id === chain?.id)

  const { data } = useBalance({
    address,
    token:
      selectedToken.chainId === chain?.id ? selectedToken.tokenAddress : null,
  })

  const handleAmountChange = (value) => {
    if (Number(value) + selectedToken.fee >= data?.formatted)
      setInsufficientBalance(true)
    else setInsufficientBalance(false)
    if (Number(value) > 0) {
      setSellBalance(Number(value))
      setBuyBalance(Number(value) * selectedToken?.rate)
    }
    if (value === '0') {
      setSellBalance(0)
      setBuyBalance('')
    }
    if (value === '') {
      setSellBalance('')
      setBuyBalance('')
    }
  }

  const changeSymbol = (token) => {
    switchNetwork?.(token?.chainId)
    setSelectedToken(token)
  }

  const buy = () => {
    // const provider = new ethers
  }

  useEffect(() => {
    setSellBalance('')
    setBuyBalance('')
    setInsufficientBalance(false)
  }, [chain, chains])

  useEffect(() => {
    if (correctNetwork) {
      const token = appConfig.sellTokens.filter((token) => {
        return token.chainId === chain?.id
      })
      setSelectedToken(token[0])
    }
  }, [])

  return (
    <div className='presale-wrapper'>
      <Container>
        <Grid container justifyContent='center' marginTop={10}>
          <Grid item xs={12} sm={8} md={6} lg={6}>
            <Box
              sx={{
                backgroundColor: '#0b1d33',
                padding: 2,
                borderRadius: 3,
              }}
            >
              <Grid container spacing={1}>
                {appConfig?.sellTokens.map((token, index) => {
                  return (
                    <Grid item xs={6} sm={3} key={index}>
                      <Button
                        variant='outlined'
                        fullWidth
                        className={
                          chain?.id === token?.chainId &&
                          selectedToken.symbol === token?.symbol
                            ? 'active'
                            : ''
                        }
                        onClick={() => changeSymbol?.(token)}
                      >
                        <img
                          src={token.icon}
                          alt=''
                          srcSet=''
                          className='token-logo'
                        />
                        <Grid>
                          <Typography fontSize={14} lineHeight={1}>
                            {token.symbol}
                          </Typography>
                          {token.type && (
                            <Typography fontSize={10}>{token.type}</Typography>
                          )}
                        </Grid>
                      </Button>
                    </Grid>
                  )
                })}
              </Grid>

              <Grid marginTop={2}>
                <Typography textAlign={'center'}>
                  Balance:{' '}
                  {correctNetwork ? (
                    <>
                      {data?.formatted} {data?.symbol}
                    </>
                  ) : (
                    <>0</>
                  )}
                </Typography>
              </Grid>

              <Grid container marginTop={1} spacing={1}>
                <Grid xs={12} sm={6} item>
                  <Typography>Amount in {data?.symbol} you pay:</Typography>
                  <TextField
                    InputProps={{
                      endAdornment: <img src={selectedToken?.icon} alt='' />,
                    }}
                    type='number'
                    error={insufficientBalance}
                    className='amount-box'
                    sx={{
                      '&.Mui-error': {
                        border: 1,
                        borderColor: '#ff7474',
                      },
                    }}
                    placeholder='0.0000'
                    value={sellBalance}
                    disabled={!correctNetwork}
                    onChange={(e) => handleAmountChange(e.target.value)}
                  ></TextField>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <Typography>Amount in AICX you receive:</Typography>
                  <TextField
                    // InputProps={{
                    //   endAdornment: <img src={selectedToken?.icon} alt='' />,
                    // }}
                    value={buyBalance > 0 ? Number(buyBalance).toFixed(4) : ''}
                    className='amount-box'
                  ></TextField>
                </Grid>
              </Grid>

              <Grid marginTop={2}>
                <Typography textAlign={'center'} fontSize={14}>
                  0.015 {selectedToken?.coin} is reserved for gas. The actual
                  amount used will depend on the network.
                </Typography>
              </Grid>

              <Grid marginTop={2}>
                {isConnected ? (
                  <>
                    {correctNetwork ? (
                      <Button
                        variant='contained'
                        fullWidth
                        disabled={
                          insufficientBalance || Number(data?.formatted) === 0
                        }
                      >
                        Buy
                      </Button>
                    ) : (
                      <LoadingButton
                        variant='contained'
                        loading={isLoading}
                        fullWidth
                        onClick={() => switchNetwork?.(chains[0].id)}
                      >
                        Change network
                      </LoadingButton>
                    )}
                  </>
                ) : (
                  <LoadingButton
                    variant='contained'
                    loading={connecting}
                    fullWidth
                    onClick={() => connect({ connector: connectors[0] })}
                  >
                    Connect Wallet
                  </LoadingButton>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default App
