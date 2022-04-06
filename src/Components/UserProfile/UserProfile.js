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
                <MenuItem sx = {{backgroundColor : '#f9b826', '&:hover' : {backgroundColor : '#110f12', color : '#f9b826'}}}>Settings</MenuItem>
                <MenuItem sx = {{backgroundColor : '#f9b826', '&:hover' : {backgroundColor : '#110f12', color : '#f9b826'}}}>Manage Addresses</MenuItem>
                <MenuItem 
                    sx = {{backgroundColor : '#f9b826', '&:hover' : {backgroundColor : '#110f12', color : '#f9b826'}}}
                    onClick = {logoutHandler}
                >
                    Sign Out
                </MenuItem>
            </Popover>
        </div>
    )
}

export default UserProfile