import { Box, Button, Divider, FormControl, FormControlLabel, Grid, Paper, RadioGroup, Stack, Typography, Container, Fab } from '@mui/material'
import { useSelector } from 'react-redux'

// ---------- importing from other files -----------
import { CustomRadio, CustomFormLabel } from './style.js'

const Payment = () => {

    const currentItem = useSelector(state => state.cart.currentItem)
    const cartItems = useSelector(state => state.cart.cartItems) 
    const instantBuy = useSelector(state => state.cart.instantBuy)
    
    let totalPrice

    // total price depends upon whether user buying one item or more then 1 items
    if (instantBuy) {
        totalPrice = currentItem[0].totalPrice.toFixed(1)
    } else {
        totalPrice = cartItems.reduce((total, price) => {
            return total + price
        }).toFixed(1)
    }

    return (
        <Grid container justifyContent = 'center' sx = {{mt : 5}} spacing = {2}>
            <Grid item xs = {6} sx = {{}}>
                <Paper sx = {{ padding : 3, backgroundColor : '#110f12', height : 300}}>
                    <Stack alignItems = 'center'>
                        <FormControl>
                            <CustomFormLabel id = 'payment method'>Choose payment method</CustomFormLabel>
                            <RadioGroup aria-labelledby='payment method' sx = {{mt : 2}}>
                                <FormControlLabel  
                                    sx = {{color : '#f9b826'}} 
                                    label = 'Debit Card' 
                                    value = 'Debit Card' 
                                    control = {<CustomRadio />}
                                />
                                <FormControlLabel  
                                    sx = {{color : '#f9b826'}} 
                                    label = 'Credit Card' 
                                    value = 'Credit Card' 
                                    control = {<CustomRadio />} 
                                />
                                <FormControlLabel  
                                    sx = {{color : '#f9b826'}} 
                                    label = 'Paypal' 
                                    value = 'Paypal' 
                                    control = {<CustomRadio />} 
                                />
                                <FormControlLabel  
                                    sx = {{color : '#f9b826'}} 
                                    label = 'Cash on Delivery' 
                                    value = 'Cash on Delivery' 
                                    control = {<CustomRadio />} 
                                />
                            </RadioGroup>
                        </FormControl>                        
                    </Stack>
                </Paper>
            </Grid>
            <Grid item xs = {6}>
                <Paper 
                    sx = {{ 
                        padding : 3, 
                        backgroundColor : '#110f12', 
                        height : 300
                    }}
                >
                    <Typography 
                        className = 'text-center' 
                        sx = {{color : '#f9b826'}} 
                        variant = 'h4'
                    >
                        Price Details
                    </Typography>  
                    <Container>
                        <Grid sx = {{mt : 2, mb : 2}} container justifyContent = 'space-evenly'>
                            <Grid item xs = {8}>
                                <Typography sx = {{color : '#f9b826', ml : 6}}>
                                    {instantBuy ? `${currentItem.length} item` : `${cartItems.length} items`}
                                </Typography>
                            </Grid>
                            <Grid item xs = {4}>
                                <Typography sx = {{color : '#f9b826', ml : 6}}>
                                    ${totalPrice}
                                </Typography>                    
                            </Grid>                        
                        </Grid>
                        <Grid container justifyContent = 'center' sx = {{mb: 2}}> 
                            <Grid item xs = {8}>
                                <Typography sx = {{color : '#f9b826', ml:6}}>
                                    Delivery Charges
                                </Typography>
                            </Grid>
                            <Grid item xs = {4}>
                                <Typography sx = {{color : '#f9b826', ml:6}}>$0</Typography>
                            </Grid>
                        </Grid>     
                        <Divider sx = {{borderColor : '#f9b826', mb : 2}} />
                        <Grid container justifyContent = 'center'> 
                            <Grid item xs = {8}>
                                <Typography sx = {{color : '#f9b826', ml:6}}>Total</Typography>
                            </Grid>
                            <Grid item xs = {4}>
                                <Typography sx = {{color : '#f9b826', ml:6}}>${totalPrice}</Typography>
                            </Grid>
                        </Grid>                
                    </Container>                 
                </Paper>
            </Grid>
            <Grid item xs = {12}>
                <Box className = 'text-center' sx = {{mt:10}}>
                    <Fab 
                        sx = {{
                            mt : 2, 
                            borderRadius : 0, 
                            border : 'solid 3px #110f12', 
                            backgroundColor : '#fca311', 
                            color : '#110f12',
                            "&:hover" : {
                                backgroundColor : '#fca311',                                 
                            }
                        }}
                        variant = 'extended' color = 'primary'><strong>Click here to pay</strong></Fab>
                </Box>
            </Grid>         
        </Grid>
    )
}

export default Payment