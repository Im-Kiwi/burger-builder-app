import { useDispatch, useSelector } from 'react-redux'
import { Nav, Navbar } from 'react-bootstrap'
import { Box, Container, Typography, Button, Stack, Avatar, IconButton } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'


// ------ importing from files -------------
import classes from './NavigationBar.module.css'
import { userFormActions } from '../../Store/reducer/userForm'
import { dialogActions } from '../../Store/reducer/dialog'
import UserProfile from '../UserProfile/UserProfile'

const NavigationBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const token = useSelector(state => state.userForm.currentUser.token)

    const openLogInHandler = () => {
        if (!token) { // login form will appear if unauthenticated user try to click on 'Build' navigation button
            dispatch(userFormActions.updateIsSignUpForm(false))
            dispatch(dialogActions.updateOpen(true))
        }
    }

    const openCartHandler = () => {
        dispatch(dialogActions.updateOpen(true))
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
                            <Link to = '/' className = {[classes.link, 'me-4'].join(' ')}>
                                Home
                            </Link> 
                            {token ? 
                                <Link to = '/build-burger' className = {[classes.link, 'me-4'].join(' ')}>
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
                                <Link to = '/cart' state = {pathname} onClick = {openCartHandler} className = {[classes.link, 'me-4'].join(' ')}>
                                    Cart
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