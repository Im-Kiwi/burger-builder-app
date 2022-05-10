import { Box, Stack, Button, TextField } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

// ------ importing from other files ----------
import { securityActions } from '../../../Store/reducer/security'

const Change = (props) => {
    const dispatch = useDispatch()

    // fetching values from redux store
    const newEmailOrPass = useSelector(state => state.security.newEmailOrPass)
    const newUserName = useSelector(state => state.security.newUserName)
    const confirmPass = useSelector(state => state.security.confirmPass)
    const startValidation = useSelector(state => state.security.startValidation)
    const navigationIndex = useSelector(state => state.security.navigationIndex)
    const userNameExist = useSelector(state => state.security.userNameExist)

    // method to control the 'confirm password' input tag
    const changeConfirmPassHandler = (event) => {
        dispatch(securityActions.updateConfirmPass(event.target.value))
    }

    // to dynamically show errors below the input tag
    let errorFlag = false
    let errorMsg = ''
    switch (navigationIndex) {
        case 0:
            if (newEmailOrPass.length === 0) {
                errorFlag = true
                errorMsg = 'Mention Email Address'
            }
            break;
        case 1:
            if (newEmailOrPass.length === 0) {
                errorFlag = true
                errorMsg = 'Mention Password'
            } else if (newEmailOrPass.length <= 5) {
                errorFlag = true
                errorMsg = 'Password must be at least 6 characters'                
            }
            break;
        case 2:
            if (newUserName.length === 0) {
                errorFlag = true
                errorMsg = 'Mention new user name'
            } else if (userNameExist) {
                errorFlag = true
                errorMsg = 'User name already exist'
            }
            break;
        default:
            errorFlag = false
            errorMsg = ''
    }

    return (
        <Box 
            display = 'flex' 
            justifyContent = 'center' 
            sx = {{mt:5}}
        >
            <form onSubmit = {event => props.submitHandler(event, navigationIndex)}>
                <Stack spacing = {2} alignItems = 'center'>
                    <TextField 
                        sx = {{width : props.width}}
                        type = {props.type} 
                        label = {props.label}
                        size = 'small' 
                        variant = 'filled'
                        onChange = {event => props.changeHandler(event)}
                        value = {props.value}
                        error = {errorFlag && startValidation}
                        helperText = {startValidation ? errorMsg : null}
                    /> 
                    {navigationIndex === 1 ? 
                        <TextField                             
                            size = 'small'
                            type = 'password'
                            label = 'Confirm Password'
                            variant = 'filled'
                            sx = {{width : props.width}}
                            onChange = {event => changeConfirmPassHandler(event)}
                            value = {confirmPass}
                            error = {(confirmPass.length === 0 || confirmPass.length !== newEmailOrPass.length) && startValidation} 
                            helperText = {confirmPass.length !== newEmailOrPass.length ? 'Password didnt match' : null}                           
                        />
                    : null
                    }                    
                    <Button 
                        variant='contained'
                        size = "small"
                        type = 'submit'
                        sx = {{
                            backgroundColor : '#110f12',
                            width : 100,
                            borderRadius : 0,
                            "&:hover" : {
                                backgroundColor : '#110f12'
                            }
                        }}
                        
                    >
                        confirm
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}

export default Change