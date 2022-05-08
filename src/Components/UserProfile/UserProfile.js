import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { IconButton, Avatar, Menu } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase-setup'

// -------- importing from other files ---------------
import { userFormActions } from '../../Store/reducer/userForm'
import { CustomMenuItem } from './style.js'
import { dialogActions } from '../../Store/reducer/dialog'

const UserProfile = () => {
    const navigate = useNavigate() 
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const [anchorEl, setAnchorEl] = useState(null) // to control the popover

    // to open the popover when click on the user profile icon
    const openPopoverHandler = (event) => {
        setAnchorEl(event.target)
    }

    // to close the popover
    const closePopoverHandler = () => {
        setAnchorEl(null)
    }

    // method to open the your orders modal
    const yourOrdersHandler = () => {
        setAnchorEl(null) // to close the popover when click on the 'Your Orders' menu
        dispatch(dialogActions.updateUserProfModal(true)) // storing the current path when clicking on the 'Your Orders' menu
        localStorage.setItem('prevPath', pathname) // storing the current path when clicking on the 'Your Addresses' menu
        navigate('/your-orders')  // opens the modal
    }
    
    // method to open 'your addresses' modal
    const yourAddressesHandler = () => {
        setAnchorEl(null) 
        dispatch(dialogActions.updateUserProfModal(true)) 
        localStorage.setItem('prevPath', pathname) 
        navigate('/your-addresses') 
    }

    // method to logout
    const logoutHandler = async() => {
        await signOut(auth) // method to sign out the user from the firebase
        navigate('/') // navigate the user to the home page
        setAnchorEl(null) // close the popover
        dispatch(userFormActions.updateCurrentUser({})) // resetting the current user info as user loggin out
    }


    return (
        <div>
            {/* user Icon button */}
            <IconButton id = 'userProfile' onClick = {(event) => openPopoverHandler(event)}>
                <Avatar sx = {{backgroundColor : '#f9b826'}}>
                    <FontAwesomeIcon style = {{color : '#110f12'}} icon = {faUser} />
                </Avatar>
            </IconButton>

            {/* menu popover after clicking on the user profile button */}
            <Menu
                    aria-labelledby = 'userProfile' 
                    open = {Boolean(anchorEl)} 
                    anchorEl = {anchorEl} 
                    onClose = {closePopoverHandler}
                    anchorOrigin = {{
                        vertical : 'bottom',
                        horizontal : 'center'
                    }}
                    transformOrigin = {{
                        horizontal : 'right',
                        vertical : 'top'
                    }}
                    sx = {{ '.MuiList-root':{background : '#f9b826 !important'}}}
            >
                <CustomMenuItem onClick = {yourOrdersHandler}>Your Orders</CustomMenuItem>
                <CustomMenuItem onClick = {yourAddressesHandler}>Your Addresses</CustomMenuItem>
                <CustomMenuItem>Security settings</CustomMenuItem>
                <CustomMenuItem>Delete Account</CustomMenuItem>
                <CustomMenuItem  onClick = {logoutHandler}>Sign Out</CustomMenuItem>
            </Menu>            
        </div>
    )
}

export default UserProfile