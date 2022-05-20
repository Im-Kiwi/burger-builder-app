import { Modal } from 'react-bootstrap'   
import { Box, Button, Stack, Typography, ThemeProvider } from '@mui/material'
import { auth, db } from '../../firebase-setup'
import { deleteUser, signOut } from 'firebase/auth'
import { deleteDoc, doc } from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// ----- importing from other files -----------
import { dialogActions } from '../../Store/reducer/dialog'
import { userFormActions } from '../../Store/reducer/userForm'
import { mainColors } from '../../theme/mui-theme'

const DeleteAccount = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // fetching data from redux store
    const showModal = useSelector(state => state.dialog.openDeleteAccModal)
    const userDbId = useSelector(state => state.userForm.currentUser.dbId)

    // this method will delete the user account
    const confirmHandler = async () => {
        try {
            await deleteUser(auth.currentUser)
            await deleteDoc(doc(db, 'users', userDbId))
            await signOut(auth) // method to sign out the user from the firebase
            navigate('/') // navigate to home page
            dispatch(dialogActions.updateDelAccModal(false)) // to close modal
            dispatch(userFormActions.updateCurrentUser({})) // resetting the current user info as user logged out
        } catch (err) {
            console.log('unable to delete account')
        }
    }

    // to close the modal
    const closeModalHandler = () => {
        dispatch(dialogActions.updateDelAccModal(false))
    }

    return (
        <Modal style = {{marginTop : 100}} show = {showModal} onHide = {closeModalHandler}>
            <Box sx = {{backgroundColor : '#f9b826', p:5}}>
                <Typography variant = 'h6'>
                    Are you sure that u wanna delete your account ?
                </Typography>
                <Stack direction = 'row' sx = {{mt:2, color: '#f9b826'}} justifyContent = 'flex-end' spacing = {2}>
                    <ThemeProvider theme = {mainColors}>
                        <Button 
                            size = 'small'
                            variant = 'contained'
                            color = 'blackish'
                            sx = {{borderRadius : 0}}
                            onClick = {confirmHandler}
                        >
                            Yes
                        </Button>
                        <Button 
                            variant = 'contained'
                            color = 'blackish'
                            size = 'small'
                            sx = {{borderRadius : 0}}
                            onClick = {closeModalHandler}
                        >
                            No
                        </Button>
                    </ThemeProvider>
                </Stack>
            </Box>

        </Modal>
    )
}

export default DeleteAccount