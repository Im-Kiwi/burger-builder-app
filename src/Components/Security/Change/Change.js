import { Box, Stack, Button, TextField, Typography, Alert, AlertTitle } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

// ------ importing from other files ----------
import { securityActions } from '../../../Store/reducer/security'

const Change = (props) => {
    const dispatch = useDispatch()

    // fetching values from redux store
    const newEmailOrPass = useSelector(state => state.security.newEmailOrPass) // email or password mentioned by the user
    const newUserName = useSelector(state => state.security.newUserName) // new user name mentioned by the user
    const confirmPass = useSelector(state => state.security.confirmPass) // to confirm new password
    const startValidation = useSelector(state => state.security.startValidation) // to begin validation process once user click on confirm button
    const navigationIndex = useSelector(state => state.security.navigationIndex) // contains navigation id of the page
    const userNameExist = useSelector(state => state.security.userNameExist) // will tell whether user name exist or not
    const successFlag = useSelector(state => state.security.successFlag) // whether the request is a success or not

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
            sx = {{mt:5}}>
                
            <form onSubmit = {event => props.submitHandler(event, navigationIndex)}>
                <Stack spacing = {2} alignItems = 'center'>
                    <Typography 
                        variant = 'h6'
                        sx = {{fontFamily : 'DM Serif Text, serif', mb:2}}>
                        {props.title}
                    </Typography>
                    <TextField 
                        sx = {{width : props.width}}
                        type = {props.type} 
                        label = {props.label}
                        size = 'small' 
                        variant = 'filled'
                        color = 'blackish'
                        onChange = {event => props.changeHandler(event)}
                        value = {props.value}
                        error = {errorFlag && startValidation}
                        helperText = {startValidation ? errorMsg : null}/> 
                    {navigationIndex === 1 ? 
                        <TextField                             
                            size = 'small'
                            type = 'password'
                            label = 'Confirm Password'
                            variant = 'filled'
                            color = 'blackish'
                            sx = {{width : props.width}}
                            onChange = {event => changeConfirmPassHandler(event)}
                            value = {confirmPass}
                            error = {(confirmPass.length === 0 || confirmPass.length !== newEmailOrPass.length) && startValidation} 
                            helperText = {confirmPass.length !== newEmailOrPass.length ? 'Password didnt match' : null} />
                    : null
                    }                    
                    <Button 
                        variant='contained'
                        size = "small"
                        type = 'submit'
                        sx = {{
                            backgroundColor : '#110f12',
                            fontFamily : 'Montserrat Alternates, sans-serif',
                            width : 100,
                            borderRadius : 0,
                            "&:hover" : {
                                backgroundColor : '#110f12'
                            }}}>
                        confirm
                    </Button>
                    {/* success message, once user successfully changed their email or password or username */}
                    {successFlag &&
                        <Alert severity = 'success' color = 'success' variant = 'outlined' >
                            <AlertTitle>Success</AlertTitle>
                            {props.successMsg}
                        </Alert>
                    }
                </Stack>
            </form>
        </Box>
    )
}

export default Change