import { useDispatch, useSelector } from 'react-redux'
import { Nav, Navbar, Image } from 'react-bootstrap'
import { Container, Typography, Button, Stack, Badge, IconButton, Box, useMediaQuery } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

// ------ importing from files -------------
import { styles, hoverAnime } from './styles'
import { userFormActions } from '../../Store/reducer/userForm'
import { dialogActions } from '../../Store/reducer/dialog'
import UserProfile from '../UserProfile/UserProfile'
import { animationActions } from '../../Store/reducer/animation'
import { Logo } from '../../path-to-assets/pathToImages'
import Hamburger from '../Hamburger/Hamburger'
import { paths } from '../../identifiers/identifiers'

const NavigationBar = () => {
    const classes = styles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const prevPath = localStorage.getItem('prevPath')

    // css breakpoints
    const break_1015 = useMediaQuery('(min-width : 1015px)')
    const break_899 = useMediaQuery('(max-width : 899px)')

    const cartItems = useSelector(state => state.cart.cartItems)
    const token = localStorage.getItem('token')

    let navColor, buttonColor, buttonBgColor // this will store the color dynamically
    
    const trackingPrevPathHandler = () => {
        localStorage.setItem('prevPath', pathname)
        // also disabling animation specially the coke, fries, slices of burger 
        dispatch(animationActions.updateBeginAnime(false)) 
    }

    const logoClickHandler = () => {
        navigate('/')
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

    // transitioning nav text color, user icon signIn button depending upon the path
    if (pathname === paths.pricing || pathname === paths.aboutUs) {
        navColor = '#110f12'
        buttonColor = '#f9b826'
        buttonBgColor = '#110f12'
    } else if (pathname === paths.buildBurger && break_899) {
        navColor = '#110f12'
        buttonColor = '#f9b826'
        buttonBgColor = '#110f12'
    } else if (pathname === paths.yourOrders || pathname === paths.manageAddresses || pathname === paths.security) {
        if (prevPath === paths.pricing || prevPath === paths.aboutUs || (prevPath === paths.buildBurger && break_899)) {
            navColor = '#110f12'
            buttonColor = '#f9b826'
            buttonBgColor = '#110f12'
        } else if (prevPath === paths.home || prevPath === paths.buildBurger) {
            buttonColor = '#110f12'
            buttonBgColor = '#f9b826'
        }
    } else {
        navColor = '#f9b826'
        buttonColor = '#110f12'
        buttonBgColor = '#f9b826'
    }

    // to change navlinks, user icon or sign in button 

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

    const logIn = (
        <motion.div 
            variants = {animateButton}
            initial = 'initial'
            animate = 'animate'>
            <Button
                variant = 'contained' 
                size = 'small' 
                onClick = {openLogInHandler} 
                className = {classes.signIn}>
                Log In
            </Button>                            
        </motion.div>
    )

    const cart = (
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
                            animate = 'animate'>
                            <FontAwesomeIcon 
                                icon = {faCartShopping} />
                        </motion.div>
                    </Badge>
                </IconButton>
        </Link>
    )

    return (
        <Navbar 
            className = {classes.navbar} 
            expand = 'lg'>
            <Container maxWidth = 'xl'>
                <Stack 
                    className = 'w-100' 
                    direction = 'row' 
                    alignItems = 'center'>
                    <Navbar.Brand>
                        <Box 
                            component = 'button' 
                            className = {classes.logo}
                            onClick = {logoClickHandler}>
                            <Typography 
                                variant = 'body1'
                                className = {classes.logoTitle}>
                                CLARISH
                            </Typography>                       
                            <Image src = {Logo} fluid width = {90} alt = 'logo' />                                                
                        </Box> 
                    </Navbar.Brand>
                    <Nav className = 'w-100'>
                        <Stack
                            sx = {{width : 'inherit'}} 
                            direction = 'row' 
                            justifyContent = 'flex-end' 
                            alignItems = 'center'>
                            {break_1015 ? 
                                <>
                                    <Link 
                                        to = '/' 
                                        className = {[classes.link, 'me-4'].join(' ')}
                                        onClick = {trackingPrevPathHandler}>
                                        <motion.div
                                            initial = 'initial'
                                            whileHover = 'homeHover'>
                                            <motion.p
                                                variants = {animateNav} 
                                                animate = 'animate'
                                                style = {{marginTop : 10}}>
                                                Home
                                            </motion.p>
                                            <motion.div
                                                variants = {hoverAnime}
                                                animate = {{width : pathname === '/' ? 43 : 0}}
                                                style = {{
                                                    backgroundColor : pathname === '/pricing' || pathname === '/about-us' ? '#110f12' : '#f9b826',
                                                    position : 'relative',
                                                    height : 2,
                                                    bottom : 15,
                                                    borderRadius : 10
                                                }}></motion.div>
                                        </motion.div>
                                    </Link> 
                                    {token && 
                                        <Link 
                                            to = '/build-burger' 
                                            className = {[classes.link, 'me-4'].join(' ')}
                                            onClick = {trackingPrevPathHandler}>
                                            <motion.div
                                                initial = 'initial'
                                                whileHover = 'buildHover'>
                                                <motion.p 
                                                    variants = {animateNav}
                                                    animate = 'animate'                                        
                                                    style = {{marginTop : 10}}>
                                                    Build
                                                </motion.p>
                                                <motion.div
                                                    variants = {hoverAnime}
                                                    animate = {{width : pathname === '/build-burger' ? 37 : 0}}
                                                    style = {{
                                                        backgroundColor : pathname === '/pricing' || pathname === '/about-us' ? '#110f12' : '#f9b826',
                                                        position : 'relative',
                                                        height : 2,
                                                        bottom : 15,
                                                        borderRadius : 10
                                                    }}></motion.div>
                                            </motion.div>
                                        </Link>
                                    }                       
                                    <Link 
                                        to = '/pricing' 
                                        className = {[classes.link, 'me-4'].join(' ')}
                                        onClick = {trackingPrevPathHandler}>
                                        <motion.div
                                            initial = 'initial'
                                            whileHover = 'pricingHover'>
                                            <motion.p 
                                                variants = {animateNav}
                                                animate = 'animate'
                                                style = {{marginTop : 10}}>
                                                Pricing
                                            </motion.p>
                                            <motion.div
                                                variants = {hoverAnime}
                                                animate = {{width : pathname === '/pricing' ? 51 : 0}}
                                                style = {{
                                                    backgroundColor : pathname === '/pricing' || pathname === '/about-us'  ? '#110f12' : '#f9b826',
                                                    position : 'relative',
                                                    height : 2,
                                                    bottom : 15,
                                                    borderRadius : 10
                                                }}></motion.div>
                                        </motion.div>
                                    </Link>
                                    <Link 
                                        to = '/about-us' 
                                        className = {[classes.link, 'me-4'].join(' ')}
                                        onClick = {trackingPrevPathHandler}>
                                        <motion.div
                                            initial = 'initial'
                                            whileHover = 'aboutUsHover'>
                                            <motion.p
                                                variants = {animateNav}
                                                animate = 'animate' 
                                                style = {{marginTop : 10}}>
                                                About Us
                                            </motion.p>
                                            <motion.div
                                                variants = {hoverAnime}
                                                animate = {{width : pathname === '/about-us' ? 64 : 0}}
                                                style = {{
                                                    backgroundColor : pathname === '/pricing' || pathname === '/about-us' ? '#110f12' : '#f9b826',
                                                    position : 'relative',
                                                    height : 2,
                                                    bottom : 15,
                                                    borderRadius : 10
                                            }}></motion.div>
                                        </motion.div>
                                    </Link>
                                    {token ? <UserProfile animateButton = {animateButton} /> : logIn}
                                    {token && cart}
                                </>
                            :
                                <>
                                    <Hamburger />
                                    {token ? <UserProfile animateButton = {animateButton} /> : logIn}
                                    {token && cart}
                                </>
                            }
                            </Stack>
                        </Nav>
                    </Stack>
            </Container>
        </Navbar>
    )
}

export default NavigationBar