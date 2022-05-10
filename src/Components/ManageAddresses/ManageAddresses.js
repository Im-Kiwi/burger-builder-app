import { Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
// ---------- importing from other files --------
import { dialogActions } from '../../Store/reducer/dialog'
import DeliveryAddress from '../../Containers/DeliveryAddress/DeliveryAddress'

const ManageAddresses = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // values fetched from the redux store
    const showModal = useSelector(state => state.dialog.openUserProfModal)

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
            onHide = {closeModalHandler} 
        >
            <Box 
                sx = {{
                    width : 'inherit', 
                    height : 'inherit', 
                    backgroundColor : '#f9b826'
                }}
            >
                <DeliveryAddress />
            </Box>
        </Modal>
    )
}

export default ManageAddresses