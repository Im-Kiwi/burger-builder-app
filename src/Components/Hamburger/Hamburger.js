import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, IconButton, Stack, Button } from '@mui/material'
import { Offcanvas } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBurger } from '@fortawesome/free-solid-svg-icons'
import { Close } from '@mui/icons-material'
import { motion } from 'framer-motion'

// --------- importing from other files ------------
import { styles } from './styles'
import { dialogActions } from '../../Store/reducer/dialog'

const Hamburger = () => {
    const classes = styles()
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    let hamIconColor, sideMenuColor, navColor

    // fetching values from redux store
    const showSideMenu = useSelector(state => state.dialog.showSideMenu)

    // getting token from the local storage
    const token = localStorage.getItem('token')

    // this method will open the side menu drawer
    const showSideMenuHandler = () => {
        dispatch(dialogActions.updateShowSideMenu(true))
    }

    // this method will close the side menu drawer
    const closeSideMenuHandler = () => {
        dispatch(dialogActions.updateShowSideMenu(false))
    }

    // dynamically changing the background color, hamburger icon color and nav link text color
    switch (pathname) {
        case '/':
            hamIconColor = '#f9b826'
            sideMenuColor = '#f9b826'
            navColor = '#110f12'
            break;
        case '/build-burger':
            hamIconColor = '#110f12'
            sideMenuColor = '#110f12'
            navColor = '#f9b826'
            break;
        default:
            hamIconColor = '#110f12'
            sideMenuColor = '#110f12'
            navColor = '#f9b826'
            break;
    }  
    
    // horizonta line which will appear under the clicked nav link
    const horizontalLine = (
        <div
            style = {{
                backgroundColor : pathname === '/' ? '#110f12' : '#f9b826',
                position : 'relative',
                height : 2,
                bottom : 7,
                borderRadius : 10}}></div>
    )
    

    return (
        <Box>
            <IconButton
                onClick = {showSideMenuHandler}
                sx = {{fontSize : '2rem'}}>
                <FontAwesomeIcon 
                    icon = {faBurger}
                    style = {{color : hamIconColor}} />
            </IconButton>
            <Offcanvas 
                placement = 'end' 
                show = {showSideMenu}
                onHide = {closeSideMenuHandler}
                style = {{width : '100vw', backgroundColor : sideMenuColor}}>
                <IconButton 
                    component = {motion.div}
                    whileHover = {{rotate : 90}}
                    color = 'warning'
                    className = {classes.closeButton}
                    onClick = {closeSideMenuHandler}>
                    <Close sx = {{fontSize : '2rem', color : navColor}} />
                </IconButton>
                <Stack 
                    spacing = {5}
                    sx = {{height : '100%', color : navColor}} 
                    alignItems = 'center'
                    justifyContent = 'center'>
                    <Link 
                        to = '/'
                        className = {classes.link}
                        onClick = {closeSideMenuHandler}>
                        Home
                        {pathname === '/' && horizontalLine}
                    </Link>
                    {token && 
                        <Link 
                            to = '/build-burger'
                            className = {classes.link}
                            onClick = {closeSideMenuHandler}>
                            Build
                            {pathname === '/build-burger' && horizontalLine}
                        </Link>
                    }
                    <Link 
                        to = '/pricing'
                        className = {classes.link}
                        onClick = {closeSideMenuHandler}>
                        Pricing
                        {pathname === '/pricing' && horizontalLine}
                    </Link>
                    <Link 
                        to = '/about-us'
                        className = {classes.link}
                        onClick = {closeSideMenuHandler}>
                        About us
                        {pathname === '/about-us' && horizontalLine}
                    </Link>
                </Stack>
            </Offcanvas>
        </Box>
    )
}

export default Hamburger