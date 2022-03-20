import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { Image } from 'react-bootstrap'

// ------- importing from files -------------
import classes from './BuildBurger.module.css'
import { burgerBase, burgerTop, cheese, coke } from '../../pathToImages'
import BurgerController from '../../Components/BurgerController/BurgerController'

const BuildBurger = () => {


    return (
        <Box className = {classes.main}>
            <Grid container>
                <Grid xs = {7} item className = {[classes.firstItem, ''].join(' ')} >
                    <Box className = {classes.burgerContainer}>
                        <Stack 
                            direction = 'row' 
                            position = 'absolute' 
                            className = {['text-center h-100'].join(' ')}
                            justifyContent = 'center'
                            alignItems = 'center'    
                        >
                            <Image className = {classes.coke} fluid src = {coke} width = '250px' />
                            <Stack className = {classes.burger}>
                                <Image fluid src = {burgerTop} width = '250px'/>
                                <Image className = '' fluid src = {cheese} width = '250px'/>
                                {/* <Typography variant = 'h4'>Add Ingredients</Typography> */}
                                <Image fluid src = {burgerBase} width = '250px'/>
                            </Stack>
                        </Stack>
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