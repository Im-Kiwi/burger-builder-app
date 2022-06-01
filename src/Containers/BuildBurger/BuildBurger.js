import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, Button, Grid, Stack, Typography, Container } from '@mui/material'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

// ------- importing from files -------------
import classes from './BuildBurger.module.css'
import BurgerController from '../../Components/BurgerController/BurgerController'
import DisplayBurger from '../../Components/DisplayBurger/DisplayBurger'
import FullDialogs from '../../Components/FullDialogs/FullDialogs'
import NavigationBar from '../../Components/NavigationBar/NavigationBar'

const BuildBurger = (props) => {
    const { pathname } = useLocation()
    const prevPath = localStorage.getItem('prevPath')

    return (
        <Container maxWidth = 'xl'>
            <Box sx = {{overflow : 'hidden'}}>
                <Grid container>
                    <Grid xs = {7} item className = {classes.firstItem}>
                        <motion.div 
                            initial = {{width : prevPath === '/pricing' || prevPath === '/about-us' ? '100vw' : '100%'}}
                            animate = {{width : '100%'}}
                            style = {{
                                position : 'absolute',
                                backgroundColor : '#f9b826',
                                height : '100%',
                                borderRadius : '0 50% 50% 0/0 100% 100% 0',
                                transform : 'scaleY(1.5)'                                
                            }}>
                        </motion.div>
                        <Box display = 'flex' justifyContent = 'center'>
                            <DisplayBurger noTransition = {props.noTransition} /> {/* burger will display here */}
                        </Box>
                    </Grid>
                    <Grid xs = {5} item className = {classes.secondItem}>
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