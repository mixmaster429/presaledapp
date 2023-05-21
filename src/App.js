import { ConnectButton } from '@rainbow-me/rainbowkit'
import {
  Grid,
  Box,
  Container,
  Typography,
  Button,
  InputBase,
} from '@mui/material'
import ETHLOGO from './assets/images/eth.svg'
import USDTLOGO from './assets/images/usdt.svg'
import BNBLOGO from './assets/images/bnb.svg'
import './App.css'

function App() {
  return (
    <div className='App'>
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
              <Grid container>
                <Grid item sm={3}>
                  <Button variant='outlined'>
                    <img src={ETHLOGO} alt='' srcSet='' />
                    <Grid>
                      <Typography>ETH</Typography>
                    </Grid>
                  </Button>
                </Grid>
                <Grid item sm={3}>
                  <Button variant='outlined'>
                    <img src={USDTLOGO} alt='' srcSet='' />
                    <Grid>
                      <Typography>USDT</Typography>
                      <Typography>ERC20</Typography>
                    </Grid>
                  </Button>
                </Grid>
                <Grid item sm={3}>
                  <Button variant='outlined'>
                    <img src={BNBLOGO} alt='' srcSet='' />
                    <Grid>
                      <Typography>BNB</Typography>
                    </Grid>
                  </Button>
                </Grid>
                <Grid item sm={3}>
                  <Button variant='outlined'>
                    <img src={USDTLOGO} alt='' srcSet='' />
                    <Grid>
                      <Typography>USDT</Typography>
                      <Typography>BEP20</Typography>
                    </Grid>
                  </Button>
                </Grid>
              </Grid>

              <Grid>
                <Typography>ETH balance: 0</Typography>
              </Grid>

              <Grid container>
                <Grid sm={6}>
                  <Typography>Amount in ETH you pay</Typography>
                  <InputBase></InputBase>
                </Grid>
                <Grid sm={6}>
                  <Typography>Amount in AICX you receive</Typography>
                  <InputBase></InputBase>
                </Grid>
              </Grid>

              <Grid>
                <Typography>
                  0.015 ETH is reserved for gas. The actual amount used will
                  depend on the network.
                </Typography>
              </Grid>

              <Grid>
                <Button variant='contained' fullWidth>
                  Buy
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default App
