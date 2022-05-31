import { Offcanvas } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@mui/material'

// --------- importing contents from other files -----------
import SignUp from '../SignUp/SignUp'
import LogIn from '../LogIn/LogIn'
import { dialogActions } from '../../Store/reducer/dialog'

const Canvas = () => {
    const dispatch = useDispatch()

    const isSignUpForm = useSelector(state => state.userForm.isSignUpForm)
    const showCanvas = useSelector(state => state.dialog.showCanvas)

    const closeCanvasHandler = () => {
        dispatch(dialogActions.updateShowCanvas(false))
    }

    return (
        <Offcanvas placement = 'end' show = {showCanvas} onHide = {closeCanvasHandler}>
            <Box sx = {{height : '100%', width : '100%', backgroundColor : '#f9b826'}} display = 'flex' alignItems = 'center'>
                {isSignUpForm ?
                    <SignUp />
                :   <LogIn />
                }
            </Box>
        </Offcanvas>
    )
}

export default Canvas