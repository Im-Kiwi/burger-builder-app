import { useDispatch, useSelector } from 'react-redux'
import { Nav, Navbar } from 'react-bootstrap'
import { Container, Typography, Button, Stack, Badge, IconButton } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

// ------ importing from files -------------
import classes from './NavigationBar.module.css'
import { userFormActions } from '../../Store/reducer/userForm'
import { dialogActions } from '../../Store/reducer/dialog'
import UserProfile from '../UserProfile/UserProfile'
import { animationActions } from '../../Store/reducer/animation'

const NavigationBar = () => {
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const prevPath = localStorage.getItem('prevPath')

    const token = useSelector(state => state.userForm.currentUser.token)
    const cartItems = useSelector(state => state.cart.cartItems)

    let navColor, buttonColor, buttonBgColor // this will store the color dynamically
    
    const trackingPrevPathHandler = () => {
        localStorage.setItem('prevPath', pathname)
        // also disabling animation specially the coke, fries, slices of burger 
        dispatch(animationActions.updateBeginAnime(false)) 

    }

    // this will open the login form modal
    const openLogInHandler = () => {
        if (!token) { // login form will appear if unauthenticated user try to click on 'Build' navigation button
            dispatch(userFormActions.updateIsSignUpForm(false))
            dispatch(dialogActions.updateShowCanvas(true)) 
        }
    }
    
    // this will open the cart full screen dialog box
    const openCartHandler = () => {
        dispatch(dialogActions.updateOpen(true))
        dispatch(animationActions.updateBeginAnime(false))
        trackingPrevPathHandler()
    }

    if (pathname === '/pricing' || pathname === '/about-us' || 
        ((pathname === '/your-orders' || pathname === '/manage-addresses' || pathname === '/security-settings') && 
        (prevPath === '/pricing' || prevPath === '/about-us'))) {
            navColor = '#110f12'
            buttonColor = '#f9b826'
            buttonBgColor = '#110f12'
    } else {
        navColor = '#f9b826'
        buttonColor = '#110f12'
        buttonBgColor = '#f9b826'
    }

    // to animate the nav links ( changing colors while page transitioning)
    const animateNav = {   
        animate : {
            color : navColor,
            transition : {
                duration : 0.1,
                ease : 'easeOut'
            }
        }
    }

    // to animate the buttons (changing colors)
    const animateButton = {
        initial : {
            backgroundColor : buttonBgColor ,
            color : buttonColor
        },
        animate : {
            backgroundColor : buttonBgColor,
            color : buttonColor,
            transition : {
                duration : 0.01,
                delay : 0.1,
                ease : 'easeOut'
            }
        }
    }


    return (
        <Navbar 
            fixed = 'top' 
            className = {classes.navbar} 
            expand = 'lg'>
            <Container maxWidth = 'xl'>
                <Stack 
                    className = 'w-100' 
                    direction = 'row' 
                    alignItems = 'center'>
                    <Navbar.Brand>
                        <Typography 
                            variant = 'h5' 
                            className = 'text-dark'>
                                LOGO
                        </Typography>                    
                    </Navbar.Brand>
                    <Nav className = 'w-100'>
                        <Stack
                            sx = {{width : 'inherit'}} 
                            direction = 'row' 
                            justifyContent = 'flex-end' 
                            alignItems = 'center'>
                            <Link 
                                to = '/' 
                                state = {pathname} 
                                className = {[classes.link, 'me-4'].join(' ')}
                                onClick = {trackingPrevPathHandler}>
                                <motion.p
                                    variants = {animateNav} 
                                    animate = 'animate'
                                    style = {{marginTop : 10}}
                                    >
                                    Home
                                </motion.p>
                            </Link> 
                            {token && 
                                <Link 
                                    to = '/build-burger' 
                                    state = {pathname} 
                                    className = {[classes.link, 'me-4'].join(' ')}
                                    onClick = {trackingPrevPathHandler}>
                                    <motion.p 
                                        variants = {animateNav}
                                        animate = 'animate'
                                        style = {{marginTop : 10}}>
                                        Build
                                    </motion.p>
                                </Link>
                            }                       
                            <Link 
                                to = '/pricing' 
                                className = {[classes.link, 'me-4'].join(' ')}
                                onClick = {trackingPrevPathHandler}>
                                <motion.p 
                                    variants = {animateNav}
                                    animate = 'animate'
                                    style = {{marginTop : 10}}>
                                    Pricing
                                </motion.p>
                            </Link>
                            <Link 
                                to = '/about-us' 
                                className = {[classes.link, 'me-4'].join(' ')}
                                onClick = {trackingPrevPathHandler}>
                                <motion.p
                                    variants = {animateNav}
                                    animate = 'animate' 
                                    style = {{marginTop : 10}}>
                                    About Us
                                </motion.p>
                            </Link>
                            {token ? 
                                <UserProfile animateButton = {animateButton} />
                                :
                                <motion.div 
                                    variants = {animateButton}
                                    initial = 'initial'
                                    animate = 'animate'>
                                    <Button
                                        variant = 'contained' 
                                        size = 'small' 
                                        onClick = {openLogInHandler} 
                                        className = {classes.signIn}>
                                        Sign In
                                    </Button>                            
                                </motion.div>
                            }
                            {token && 
                                <Link 
                                    to = '/cart' 
                                    onClick = {openCartHandler} 
                                    className = {[classes.link, 'me-4'].join(' ')}>
                                        <IconButton sx = {{color : '#f9b826'}}>
                                            <Badge 
                                                badgeContent = {cartItems.length} 
                                                color = 'error'>
                                                <motion.div
                                                    variants = {animateNav}
                                                    initial = 'initial'
                                                    animate = 'animate'>
                                                    <FontAwesomeIcon icon = {faCartShopping} />
                                                </motion.div>
                                            </Badge>
                                        </IconButton>
                                </Link>
                            }
                        </Stack>
                    </Nav>
                </Stack>
            </Container>
        </Navbar>
    )
}

export default NavigationBar