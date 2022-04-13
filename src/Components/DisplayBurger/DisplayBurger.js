import { useSelector } from 'react-redux'
import { Stack, Typography, Grid } from '@mui/material'

// ------------importing from other files---------
import Burger from '../Burger/Burger'

const DisplayBurger = (props) => {

    const totalPrice = useSelector(state => state.ingredients.totalPrice)
    const ingredients = useSelector(state => state.ingredients)

    return (
        <Grid 
            position = 'absolute'
            container
            justifyContent = 'center'
            sx = {{mt : 5}}
            spacing = {10}
        >
            <Grid item xs = {12} display = 'flex' justifyContent = 'center'>
                <Stack 
                    sx = {{height : 500}} 
                    direction = 'row'  
                    alignItems = 'flex-end'
                >
                    <Burger ingredients = {ingredients} width = '250px' />                
                </Stack>
            </Grid>
            <Grid item xs = {12}>
                <Stack direction = 'row' justifyContent = 'center' spacing = {3} alignItems = 'center'>
                    <Typography variant = 'h5' className = 'text-dark'>${totalPrice.toFixed(2)}</Typography>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default DisplayBurger