import { Stack, Box, Grid, Typography, Button, Container } from '@mui/material';
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom';
import { Image } from 'react-bootstrap'
import { motion } from 'framer-motion'

// ------------- importing from files -------------------
import classes from './Home.module.css'
import { dialogActions } from '../../Store/reducer/dialog';
import { userFormActions } from '../../Store/reducer/userForm';
import FullDialogs from '../../Components/FullDialogs/FullDialogs';
import { Burger, Girl } from '../../path-to-assets/pathToImages'


const Home = (props) => {
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const prevPath = localStorage.getItem('prevPath') // stores the previous path from where user navigated from
    const token = localStorage.getItem('token')

    // this method will open the login and signup modal
    const dialogHandler = () => {
        dispatch(dialogActions.updateShowCanvas(true))
        dispatch(userFormActions.updateIsSignUpForm(true))
    }

    // config transition 
    const transitionEffect = {
        duration : 0.7, 
        type : 'spring'
    }

    // config animation of second Col of grid consist of Heading and 'girl eating burger' image
    const secondColAnime = {
        initial : {
            x : '100vw', 
            opacity : 0,
        },
        animate : {
            x : 0, 
            opacity : 1,
            zIndex : 10,
            transition : transitionEffect
        },
        animateGirl : {
            x : 0,
            opacity : 0.1,
            zIndex : 5,
            transition : transitionEffect
        },
        exit : {
            x : '100vw', 
            opacity : 0,
            transition : transitionEffect
        },
        
    }

    return (
        <Container maxWidth = 'xl'>
            <Box className = {classes.main} sx = {{overflow : 'hidden'}}>
                <Grid container sx = {{overflow : 'hidden'}}>
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
                        <Stack 
                            direction = 'row' 
                            justifyContent = 'center'
                            alignItems = 'center'
                            sx = {{height : 'inherit'}}>    
                            <motion.div 
                                initial = {{x : '-100vw'}}
                                animate = {{x : 0,}}
                                exit = {{x : '-100vw'}}
                                transition = {{duration : 0.7, type : 'spring'}}>
                                <Image fluid src = {Burger} />                                          
                            </motion.div>                                     
                        </Stack>
                    </Grid>
                    <Grid 
                        xs = {5} item 
                        className = {classes.secondItem}>
                        <Box 
                            display = 'flex'
                            flexDirection = 'column'
                            justifyContent = 'center'
                            sx = {{
                            position : 'relative',
                            width : '100%',
                            height : '100%'                
                            }}>
                            <motion.div className = 'text-center'
                                variants = {secondColAnime}
                                initial = 'initial'
                                animate = 'animate'
                                exit = 'exit'>
                                <Box sx = {{zIndex : 10}}>
                                    <Typography 
                                        variant = 'h2' 
                                        sx = {{
                                            color : '#f9b826', 
                                            fontFamily : 'Bebas Neue, cursive',
                                            fontSize : '5rem'}}>
                                        CLARISH
                                    </Typography> 
                                    <Typography 
                                        variant = 'h2' 
                                        sx = {{
                                            color : '#f9b826', 
                                            fontFamily : 'Bebas Neue, cursive',
                                            fontSize : '5rem'}}>
                                        BURGERS
                                    </Typography>
                                    {!token && 
                                        <Button                                         
                                            sx = {{mt : 5, width : 200}} 
                                            variant = 'contained' 
                                            className = {classes.register}
                                            color = 'yellowish'
                                            onClick = {dialogHandler}>       
                                                Sign Up
                                        </Button>
                                    } 
                                </Box>
                            </motion.div>
                            <motion.img
                                variants = {secondColAnime}
                                initial = 'initial'
                                animate = 'animateGirl'
                                exit = 'exit'
                                style = {{
                                    position : 'absolute',
                                    zIndex : 5,                                    
                                    opacity : 0.1
                                    }} 
                                src = {Girl} 
                                width = {'100%'} 
                                alt = 'girl eating burger' />
                        </Box>
                    </Grid>                
                </Grid>
                {pathname === '/your-orders' || pathname === '/manage-addresses' || pathname === '/security-settings' ? 
                    <Outlet />
                    : 
                    <FullDialogs title = 'My Cart' closeDialogHandler = {props.closeDialogHandler} priceInfo = {props.priceInfo}>
                        <Outlet />
                    </FullDialogs>
                }           
            </Box>
        </Container>
    )
}

export default Home;