import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { Image } from 'react-bootstrap'

// ------- importing from files -------------
import classes from './BuildBurger.module.css'
import BurgerController from '../../Components/BurgerController/BurgerController'
import DisplayBurger from '../../Components/DisplayBurger/DisplayBurger'

const BuildBurger = () => {

    return (
        <Box className = {classes.main}>
            <Grid container>
                <Grid xs = {7} item className = {[classes.firstItem].join(' ')}>
                    <Box display = 'flex' justifyContent = 'center' className = {classes.burgerContainer}>
                        <DisplayBurger />
                    </Box>
                </Grid>
                <Grid xs = {5} item className = {classes.secondItem}>
                    <BurgerController />
                </Grid>
            </Grid>
        </Box>        
    )
}

export default BuildBurger