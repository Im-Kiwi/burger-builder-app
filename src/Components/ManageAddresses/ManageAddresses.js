import { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Fab, useMediaQuery } from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
// ---------- importing from other files --------
import { dialogActions } from '../../Store/reducer/dialog'
import DeliveryAddress from '../../Containers/DeliveryAddress/DeliveryAddress'

const ManageAddresses = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // creating css breakpoints
    const break_575 = useMediaQuery('(max-width : 575px)')

    // values fetched from the redux store
    const showModal = useSelector(state => state.dialog.openUserProfModal)

    // this will stay the modal open even when user reload the page
    useEffect(() => {
        dispatch(dialogActions.updateUserProfModal(true))
    }, [])

    // to close modal 
    const closeModalHandler = () => {
        navigate(localStorage.getItem('prevPath')) // this will navigate the user to the previous page where he/she came from 
        dispatch(dialogActions.updateUserProfModal(false)) // this will close the modal
        localStorage.removeItem('prevPath') // to remove the previous path information from the local storage
    }

    return (
        <Modal 
            size = 'xl' 
            centered 
            show = {showModal} 
            onHide = {closeModalHandler}>
            <Fab
                size = 'small' 
                aria-label = 'close button'
                onClick = {closeModalHandler}
                sx = {{
                    position : 'absolute', 
                    right : break_575 ? -8 : -15, 
                    top : break_575 ? -8 : -20, 
                    zIndex : 10,
                    backgroundColor : '#ffb600',
                    '&:hover' : {
                        backgroundColor : '#ffb600'
                    }}}>
                <CloseRounded />
            </Fab>
            <Box 
                sx = {{
                    width : 'inherit', 
                    height : 700, 
                    overflowX : 'hidden',
                    backgroundColor : '#f9b826'
                }}>
                <DeliveryAddress manageAddressFlag = {true} />
            </Box>
        </Modal>
    )
}

export default ManageAddresses