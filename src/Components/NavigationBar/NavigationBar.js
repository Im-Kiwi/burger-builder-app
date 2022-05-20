import { useDispatch, useSelector } from 'react-redux'
import { Nav, Navbar } from 'react-bootstrap'
import { Container, Typography, Button, Stack, Badge, IconButton } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'


// ------ importing from files -------------
import classes from './NavigationBar.module.css'
import { userFormActions } from '../../Store/reducer/userForm'
import { dialogActions } from '../../Store/reducer/dialog'
import UserProfile from '../UserProfile/UserProfile'
import { animationActions } from '../../Store/reducer/animation'

const NavigationBar = () => {
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const token = useSelector(state => state.userForm.currentUser.token)
    const cartItems = useSelector(state => state.cart.cartItems)

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
        localStorage.setItem('prevPath', pathname)
    }

    return (
        <Navbar fixed = 'top' className = {classes.navbar} expand = 'lg'>
            <Container maxWidth = 'xl'>
                <Stack className = 'w-100' direction = 'row' alignItems = 'center'>
                    <Navbar.Brand>
                        <Typography variant = 'h5' className = 'text-dark'>LOGO</Typography>                    
                    </Navbar.Brand>
                    <Nav className = 'w-100'>
                        <Stack className = 'w-100' direction = 'row' justifyContent = 'flex-end' alignItems = 'center'>
                            <Link to = '/' state = {pathname} className = {[classes.link, 'me-4'].join(' ')}>
                                Home
                            </Link> 
                            {token ? 
                                <Link to = '/build-burger' state = {pathname} className = {[classes.link, 'me-4'].join(' ')}>
                                    Build
                                </Link>
                            : null
                            }                       
                            <Link to = '#' className = {[classes.link, 'me-4'].join(' ')}>
                                Pricing
                            </Link>
                            <Link to = '#' className = {[classes.link, 'me-4'].join(' ')}>
                                About Us
                            </Link>
                            {token ? 
                                <UserProfile />
                                :
                                <Button variant = 'contained' size = 'small' onClick = {openLogInHandler} className = {classes.signIn}>
                                    Sign In
                                </Button>                            
                            }
                            {token ? 
                                <Link to = '/cart' onClick = {openCartHandler} className = {[classes.link, 'me-4'].join(' ')}>
                                    <IconButton sx = {{color : '#f9b826'}}>
                                        <Badge badgeContent = {cartItems.length} color = 'error'>
                                            <FontAwesomeIcon icon = {faCartShopping} />
                                        </Badge>
                                    </IconButton>
                                </Link>
                            : null
                            }
                        </Stack>
                    </Nav>
                </Stack>
            </Container>
        </Navbar>
    )
}

export default NavigationBar