import { Box, Grid, Container, useMediaQuery } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

// ------- importing from files -------------
import { styles } from './styles'
import BurgerController from '../../Components/BurgerController/BurgerController'
import DisplayBurger from '../../Components/DisplayBurger/DisplayBurger'
import FullDialogs from '../../Components/FullDialogs/FullDialogs'

const BuildBurger = (props) => {
    const classes = styles()
    const { pathname } = useLocation()
    const prevPath = localStorage.getItem('prevPath')

    // creating css breakpoints
    const break_899 = useMediaQuery('(max-width : 899px)')

    return (
        <Container disableGutters = {break_899 && true} maxWidth = 'xl'>
            <Box className = {classes.main} sx = {{overflow : 'hidden'}}>
                <Grid container>
                    <Grid item
                        xs = {12} md = {7}  
                        className = {classes.firstItem}>
                        <motion.div 
                            className = {classes.backgroundCover}
                            initial = {{width : prevPath === '/pricing' || prevPath === '/about-us' ? '100vw' : '100%'}}
                            animate = {{width : '100%'}}></motion.div>
                        <Box 
                            display = 'flex' 
                            justifyContent = 'center' 
                            alignItems = 'center'
                            sx = {{height : '100%'}}>
                            <DisplayBurger noTransition = {props.noTransition} /> {/* burger will display here */}
                        </Box>
                    </Grid>
                    <Grid item
                        xs = {12} md = {5}  
                        className = {classes.secondItem}>
                        <BurgerController noTransition = {props.noTransition} /> {/* this will display the burger controller with the help of which user can add ingredients on the burger */}
                    </Grid>
                </Grid>            
                {/* below is the condition to show the modal and full screen modal depending upon the url */}
                {pathname === '/your-orders' || pathname === '/manage-addresses' || pathname === '/security-settings' ? 
                    <Outlet />
                    :
                    <FullDialogs 
                        title = {props.title} 
                        isOrderSummary = {true} 
                        closeDialogHandler = {props.closeDialogHandler}
                        cartPrice = {props.cartPrice}
                        totalItems = {props.totalItems}>
                    <Outlet />
                </FullDialogs>
                }
            </Box>        
        </Container>
    )
}

export default BuildBurger