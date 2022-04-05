import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import { styled } from '@mui/styles'

// ---------- importing from other files -----------
import { CustomRadio, CustomFormLabel } from './style.js'

const Payment = () => {

    return (
        <Grid container justifyContent = 'center' sx = {{mt : 5}} spacing = {2}>
            <Grid item xs = {6} sx = {{}}>
                <Paper sx = {{ padding : 3, backgroundColor : '#110f12', height : 300}}>
                    <Stack alignItems = 'center'>
                        <FormControl>
                            <CustomFormLabel id = 'payment method'>Choose payment method</CustomFormLabel>
                            <RadioGroup aria-labelledby='payment method' sx = {{mt : 2}}>
                                <FormControlLabel  sx = {{color : '#f9b826'}} label = 'Debit Card' value = 'Debit Card' control = {<CustomRadio />} />
                                <FormControlLabel  sx = {{color : '#f9b826'}} label = 'Credit Card' value = 'Credit Card' control = {<CustomRadio />} />
                                <FormControlLabel  sx = {{color : '#f9b826'}} label = 'Paypal' value = 'Paypal' control = {<CustomRadio />} />
                                <FormControlLabel  sx = {{color : '#f9b826'}} label = 'Cash on Delivery' value = 'Cash on Delivery' control = {<CustomRadio />} />
                            </RadioGroup>
                        </FormControl>                        
                    </Stack>
                </Paper>
            </Grid>
            <Grid item xs = {6}>
                <Paper sx = {{ padding : 3, backgroundColor : '#110f12', height : 300}}>
                    <Typography className = 'text-center' sx = {{color : '#f9b826'}} variant = 'h4'>Price Details</Typography>
                    <Grid sx = {{mt : 2, mb : 2}} container justifyContent = 'center'>
                        <Grid item xs = {5}>
                            <Typography sx = {{color : '#f9b826'}}>Burger</Typography>
                        </Grid>
                        <Grid item xs = {1}>
                            <Typography sx = {{color : '#f9b826'}}>$5</Typography>                    
                        </Grid>
                    </Grid>
                    <Grid container justifyContent = 'center' sx = {{mb: 2}}> 
                        <Grid item xs = {5}>
                            <Typography sx = {{color : '#f9b826'}}>Coke</Typography>
                        </Grid>
                        <Grid item xs = {1}>
                            <Typography sx = {{color : '#f9b826'}}>$2</Typography>
                        </Grid>
                    </Grid>     
                    <Divider sx = {{borderColor : '#f9b826', mb : 2}} />
                    <Grid container justifyContent = 'center'> 
                        <Grid item xs = {5}>
                            <Typography sx = {{color : '#f9b826'}}>Total</Typography>
                        </Grid>
                        <Grid item xs = {1}>
                            <Typography sx = {{color : '#f9b826'}}>$7</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs = {12}>
                <Box className = 'text-center'>
                    <Button sx = {{mt : 2}} variant = 'outlined' color = 'primary'>Click here to pay</Button>
                </Box>
            </Grid>            
        </Grid>
    )
}

export default Payment