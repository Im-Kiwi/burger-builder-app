import { Stack, Box, Grid, Typography, Button, Container, useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom';
import { Image } from 'react-bootstrap'
import { motion } from 'framer-motion'

// ------------- importing from files -------------------
import { styles, clarishTextAnime, burgerTextAnime } from './styles'
import { paths } from '../../identifiers/identifiers';
import { dialogActions } from '../../Store/reducer/dialog';
import { userFormActions } from '../../Store/reducer/userForm';
import FullDialogs from '../../Components/FullDialogs/FullDialogs';
import { Burger, Girl } from '../../path-to-assets/pathToImages'


const Home = (props) => {
    const classes = styles()
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const prevPath = localStorage.getItem('prevPath') // stores the previous path from where user navigated from
    const token = localStorage.getItem('token') // fetching token from local storage

    // creating css breakpoints
    const break_899 = useMediaQuery('(max-width : 899px)')

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
        <Container disableGutters = {break_899 && true} maxWidth = 'xl'>
            <Box className = {classes.main} sx = {{overflow : 'hidden'}}>
                <Grid container sx = {{overflow : 'hidden'}}>
                    <Grid 
                        xs = {12} md = {7} item 
                        order = {{xs:2, md:1}}
                        className = {classes.firstItem}>
                        {/* the curvy yellow background */}
                        <motion.div 
                            className = {classes.backgroundCover}
                            initial = {{width : prevPath === paths.pricing || prevPath === paths.aboutUs ? '100vw' : '100%'}}
                            animate = {{width : '100%'}}></motion.div>                        
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
                                <Stack 
                                    direction = 'column'
                                    alignItems = 'center'>
                                    <Image fluid src = {Burger} style = {{width : '100%'}} />  
                                    <Typography 
                                        className = 'text-center'
                                        variant = 'h5'
                                        sx = {{mt:2, fontFamily : 'Titan One, cursive'}}>                                        
                                        "A burger without a cheese
                                        <br />
                                        is like a hug without a squeeze"                                        
                                    </Typography>
                                </Stack>
                            </motion.div>                                     
                        </Stack>
                    </Grid>
                    <Grid 
                        xs = {12} md = {5} item 
                        order = {{xs:1,md:2}}
                        className = {classes.secondItem}>
                        <Box 
                            component = {motion.div}
                            variants = {secondColAnime}
                            initial = 'initial'
                            animate = 'animate'
                            exit = 'exit'
                            className = {classes.mainTitleContainer}
                            display = 'flex'
                            flexDirection = 'column'
                            justifyContent = 'center'>                            
                            <Box sx = {{zIndex : 10}}>
                                <Typography 
                                    variant = 'h2' 
                                    className = {classes.mainTitle}
                                    component = {motion.p}
                                    variants = {clarishTextAnime}
                                    animate = 'animate'>
                                    CLARISH
                                </Typography> 
                                <Typography 
                                    variant = 'h2' 
                                    className = {classes.mainTitle}
                                    component = {motion.p}
                                    variants = {burgerTextAnime}
                                    animate = 'animate'>
                                    BURGERS
                                </Typography>
                                <Typography
                                    variant = 'body1'
                                    className = {classes.textContent}>
                                    Feeling Hungry ? 
                                    <br />
                                    Build your perfect burger and get it within 20 min
                                </Typography>
                                {!token && 
                                    <Button                                         
                                        className = {classes.register}                                            
                                        variant = 'contained' 
                                        color = 'yellowish'
                                        onClick = {dialogHandler}>       
                                            Sign Up
                                    </Button>                                            
                                } 
                            </Box>
                            <motion.img
                                className = {classes.girlImg}
                                variants = {secondColAnime}
                                initial = 'initial'
                                animate = 'animateGirl'
                                exit = 'exit'
                                src = {Girl} 
                                width = {'100%'} 
                                alt = 'girl eating burger' />
                        </Box>
                    </Grid>                
                </Grid>
                {pathname === '/your-orders' || pathname === '/manage-addresses' || pathname === '/security-settings' ? 
                    <Outlet />
                    : 
                    <FullDialogs 
                        title = 'My Cart' 
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

export default Home;