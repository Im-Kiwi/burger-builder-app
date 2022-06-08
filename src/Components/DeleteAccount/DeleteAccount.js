import { useState } from 'react'
import { Modal, Image, Spinner } from 'react-bootstrap'   
import { Box, Button, Stack, Typography, Alert } from '@mui/material'
import { auth, db } from '../../firebase-setup'
import { deleteUser, signOut } from 'firebase/auth'
import { deleteDoc, doc } from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LogIn from '../LogIn/LogIn'

// ----- importing from other files -----------
import { dialogActions } from '../../Store/reducer/dialog'
import { userFormActions } from '../../Store/reducer/userForm'
import { loadingActions } from '../../Store/reducer/loading'
import { Sad } from '../../path-to-assets/pathToImages'

const DeleteAccount = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLogIn, setIsLogIn] = useState(false) // to enable/disable the login form

    // fetching data from redux store
    const showModal = useSelector(state => state.dialog.openDeleteAccModal)
    const userDbId = useSelector(state => state.userForm.currentUser.dbId)
    const loading = useSelector(state => state.loading.loading)

    // this method will delete the user account
    const confirmHandler = async () => {
        setIsLogIn(false)
        dispatch(loadingActions.updateLoading(true)) // enable the loading spinner
        try {
            await deleteDoc(doc(db, 'users', userDbId))
            await deleteUser(auth.currentUser)
            await signOut(auth) // method to sign out the user from the firebase
            localStorage.removeItem('token') // to remove token from local storage
            navigate('/') // navigate to home page
            dispatch(dialogActions.updateDelAccModal(false)) // to close modal
            dispatch(userFormActions.updateCurrentUser({})) // resetting the current user info as user logged out
            dispatch(loadingActions.updateLoading(false)) // disable the loading spinner
            dispatch(userFormActions.updateDeleteAccount(false)) // once acc is deleted the value will set to false
        } catch (err) {
            console.log(err)
            if (err.code === 'auth/requires-recent-login') {
                setIsLogIn(true)
                dispatch(userFormActions.updateDeleteAccount(true)) // delete acc flag set to true which help to delete acc once user re-auth successfully
            }
            dispatch(loadingActions.updateLoading(false))
        }
    }

    // to close the modal
    const closeModalHandler = () => {
        dispatch(dialogActions.updateDelAccModal(false)) // will close the modal
        setIsLogIn(false)
    }

    return (
        <Modal 
            style = {{marginTop : 100}} 
            show = {showModal} 
            onHide = {closeModalHandler}>
            {!isLogIn ?
                <Box
                    display = 'flex'
                    flexDirection = 'column'
                    alignItems = 'center' 
                    gap = {2}
                    sx = {{backgroundColor : '#f9b826', p:5}}>
                    <Image 
                        src = {Sad} 
                        fluid 
                        alt = 'sad' />
                    <Typography 
                        variant = 'h6' 
                        sx = {{fontFamily : 'Concert One, cursive'}}>
                        Are you sure to delete your account ?
                    </Typography>
                    <Alert 
                        severity = 'warning' 
                        variant = 'filled'>
                        You won't be able to recover your account once deleted
                    </Alert>
                    <Stack 
                        direction = 'row' 
                        sx = {{mt:2, color: '#f9b826'}} 
                        justifyContent = 'flex-end' 
                        spacing = {2}>
                        <Button 
                            size = 'small'
                            variant = 'contained'
                            color = 'blackish'
                            sx = {{
                                borderRadius : 0, 
                                fontFamily : 'Montserrat Alternates, sans-serif',
                                width : 60,
                                height : 33}}
                            onClick = {confirmHandler}>
                            {loading ? <Spinner animation = 'border' size = 'sm' /> : 'YES'}                        
                        </Button>
                        <Button 
                            variant = 'contained'
                            color = 'blackish'
                            size = 'small'
                            sx = {{
                                borderRadius : 0, 
                                fontFamily : 'Montserrat Alternates, sans-serif',
                                width : 60,
                                height : 33}}
                            onClick = {closeModalHandler}>
                            NO
                        </Button>
                    </Stack>
                </Box>
            : 
                <Box sx = {{backgroundColor : '#f9b826'}}>
                    <Typography 
                        variant = 'h5'
                        className = 'text-center mt-3'
                        sx = {{fontFamily : 'DM Serif Text, serif'}}>Re-login for the last time :'(</Typography>
                    <LogIn />                
                </Box>
            }

        </Modal>
    )
}

export default DeleteAccount