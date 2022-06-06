import { Offcanvas, Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Box, IconButton, useMediaQuery } from '@mui/material'
import { motion } from 'framer-motion'

// --------- importing contents from other files -----------
import SignUp from '../SignUp/SignUp'
import LogIn from '../LogIn/LogIn'
import { dialogActions } from '../../Store/reducer/dialog'
import { userFormActions } from '../../Store/reducer/userForm'
import { BackgroundBurger } from '../../path-to-assets/pathToImages'
import { Close } from '@mui/icons-material'

const Canvas = () => {
    const dispatch = useDispatch()

    // creating css breakpoints
    const break_899 = useMediaQuery('(max-width : 899px)')

    // fetching values from redux store
    const isSignUpForm = useSelector(state => state.userForm.isSignUpForm)
    const showCanvas = useSelector(state => state.dialog.showCanvas)

    // this method will close the side drawer
    const closeCanvasHandler = () => {
        dispatch(dialogActions.updateShowCanvas(false))
        dispatch(userFormActions.updateErrorFlag(false))
    }

    return (
        <Offcanvas 
            placement = 'end' 
            show = {showCanvas} 
            onHide = {closeCanvasHandler}
            style = {{width : break_899 && '100%'}}>
            <Box 
                sx = {{
                    height : '100%', 
                    width : '100%', 
                    backgroundColor : '#f9b826'}} 
                display = 'flex' 
                alignItems = 'center'
                justifyContent = 'center'>
                <Image 
                    style = {{
                        position : 'absolute', 
                        zIndex : 10,
                        opacity : 0.2}} 
                    src = {BackgroundBurger} 
                    fluid 
                    alt = 'burger' />
                <IconButton
                    component = {motion.button}
                    whileHover = {{rotate : 90}}
                    sx = {{
                        position : 'absolute', 
                        top : 10, 
                        left : 10}}
                    onClick = {closeCanvasHandler}>
                    <Close sx = {{color : '#110f12', fontSize : '2rem'}} />
                </IconButton>
                {isSignUpForm ? <SignUp /> : <LogIn /> }
            </Box>
        </Offcanvas>
    )
}

export default Canvas