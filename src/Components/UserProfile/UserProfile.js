import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IconButton, Avatar, Popover, MenuItem } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase-setup'

// -------- importing from other files ---------------
import { userFormActions } from '../../Store/reducer/userForm'
import { CustomMenuItem } from './style.js'

const UserProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null)

    const openPopoverHandler = (event) => {
        setAnchorEl(event.target)
    }

    const closePopoverHandler = () => {
        setAnchorEl(null)
    }

    const logoutHandler = async() => {
        await signOut(auth)
        navigate('/')
        setAnchorEl(null)
        dispatch(userFormActions.updateCurrentUser({}))
    }

    return (
        <div>
            <IconButton onClick = {(event) => openPopoverHandler(event)}>
                <Avatar sx = {{backgroundColor : '#f9b826'}}>
                    <FontAwesomeIcon style = {{color : '#110f12'}} icon = {faUser} />
                </Avatar>
            </IconButton>
            <Popover 
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
            >
                <CustomMenuItem>Settings</CustomMenuItem>
                <CustomMenuItem>Manage Addresses</CustomMenuItem>
                <CustomMenuItem onClick = {logoutHandler}>Sign Out</CustomMenuItem>
            </Popover>
        </div>
    )
}

export default UserProfile