import { useState } from 'react'
import { Stack, Box, Typography, Button, Paper, TextField, MenuItem, IconButton, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel  } from '@mui/material'
import { CloseRounded } from '@mui/icons-material'

// -------- importing from other files -------------

const DeliveryAddress = (props) => {

    const [openForm, setOpenForm] = useState(false)
    const [selectAddressType, setSelectAddressType] = useState('Home')

    return (
        <Box sx = {{mt : 5}} display = 'flex' flexDirection = 'column' alignItems = 'center' >
            <Typography className = 'text-center'></Typography>
            { !openForm ? 
                <Box>
                    <Button 
                        variant = 'contained'
                        sx = {{backgroundColor : '#110f12', borderRadius : 0, '&:hover' : {backgroundColor : '#110f12'}}}
                        onClick = {() => setOpenForm(true)}
                    >
                        Add Address
                    </Button>
                </Box>
            :
                <Box sx = {{mt : 2}}>
                    <Paper sx = {{padding : 5, backgroundColor : '#f9b826', border : 'solid 1px #110f12', borderRadius : 0}} elevation = {3}>
                        <IconButton 
                            sx = {{float : 'right', position : 'relative', bottom : 25, left : 20}} 
                            className = 'text-dark'
                            onClick = {() => setOpenForm(false)}
                        >
                            <CloseRounded />
                        </IconButton>
                        <form>
                            <Stack direction = 'column'>
                                <Stack direction = 'row'>
                                    <TextField variant='filled' className = 'noInputBorder' 
                                        sx = {{mr : 2, input : {borderColor : 'red'}}} 
                                        size = 'small' 
                                        label = 'First Name' />
                                    <TextField variant='filled' className = 'noInputBorder' label = 'Last Name' size = 'small' />
                                </Stack>
                                <Box sx = {{mt : 2}}>
                                    <TextField variant='filled' className = 'noInputBorder' type = 'number' label = 'Phone Number' size = 'small' />
                                </Box>
                                <TextField 
                                    variant='filled' 
                                    className = 'noInputBorder' 
                                    sx = {{mt : 2}} 
                                    fullWidth multiline rows={4} 
                                    size = 'small' 
                                    label = 'Your Address' />
                                <Stack direction = 'row' sx = {{mt : 2}}>
                                    <TextField variant='filled' className = 'noInputBorder' sx = {{mr : 2}} label = 'City/District/Town' size = 'small' />
                                    <TextField variant='filled' className = 'noInputBorder' sx = {{mr : 2}} label = 'State' size = 'small' />
                                    <TextField variant='filled' className = 'noInputBorder' label = 'Country' size = 'small' />
                                </Stack>
                                <Box>
                                    <TextField variant='filled' className = 'noInputBorder' sx = {{mt:2}} label = 'Pin code' type = 'number' size = 'small' />
                                </Box>                            
                                <FormControl sx = {{mt:2}}>
                                    <FormLabel 
                                        id = 'address-type' 
                                        sx = {{'& .Mui-focused' : {color : 'rgba(0, 0, 0, 0.6)'}}}
                                    >
                                        Address Type
                                    </FormLabel>
                                    <RadioGroup row
                                        aria-labelledby='address-type'  
                                        value = {selectAddressType} 
                                        onChange = {(event) => setSelectAddressType(event.target.value)}
                                    >
                                        <FormControlLabel label = 'Home' value = 'Home' control = {<Radio color = 'secondary' />} />
                                        <FormControlLabel label = 'Office' value = 'Office' control = {<Radio />} />
                                    </RadioGroup>
                                </FormControl>
                            </Stack>                        
                            <Button 
                                sx = {{mt : 2, borderRadius : 0, backgroundColor : '#110f12', '&:hover' : {backgroundColor : '#110f12'}}} 
                                variant = 'contained' 
                            >
                                Save
                            </Button>
                        </form>
                    </Paper>
                </Box>            
            }
        </Box>
    )
}

export default DeliveryAddress