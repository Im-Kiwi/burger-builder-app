import { Modal, Image, Spinner } from 'react-bootstrap'   
import { Box, Button, Stack, Typography, Alert } from '@mui/material'
import { auth, db } from '../../firebase-setup'
import { deleteUser, signOut } from 'firebase/auth'
import { deleteDoc, doc } from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// ----- importing from other files -----------
import { dialogActions } from '../../Store/reducer/dialog'
import { userFormActions } from '../../Store/reducer/userForm'
import { loadingActions } from '../../Store/reducer/loading'
import { Sad } from '../../path-to-assets/pathToImages'

const DeleteAccount = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // fetching data from redux store
    const showModal = useSelector(state => state.dialog.openDeleteAccModal)
    const userDbId = useSelector(state => state.userForm.currentUser.dbId)
    const loading = useSelector(state => state.loading.loading)

    // this method will delete the user account
    const confirmHandler = async () => {
        dispatch(loadingActions.updateLoading(true)) // enable the loading spinner
        try {
            await deleteUser(auth.currentUser)
            await deleteDoc(doc(db, 'users', userDbId))
            await signOut(auth) // method to sign out the user from the firebase
            navigate('/') // navigate to home page
            dispatch(dialogActions.updateDelAccModal(false)) // to close modal
            dispatch(userFormActions.updateCurrentUser({})) // resetting the current user info as user logged out
            dispatch(loadingActions.updateLoading(false)) // disable the loading spinner
        } catch (err) {
            dispatch(loadingActions.updateLoading(false))
            console.log('unable to delete account')
        }
    }

    // to close the modal
    const closeModalHandler = () => {
        dispatch(dialogActions.updateDelAccModal(false)) // will close the modal
    }

    return (
        <Modal 
            style = {{marginTop : 100}} 
            show = {showModal} 
            onHide = {closeModalHandler}>
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

        </Modal>
    )
}

export default DeleteAccount