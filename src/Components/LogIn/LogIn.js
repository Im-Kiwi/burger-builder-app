import { useDispatch, useSelector } from 'react-redux'
import { TextField, Container, Button, Box, Typography, Alert, AlertTitle } from "@mui/material";
import { Spinner } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, updateEmail, updatePassword, deleteUser, signOut } from "firebase/auth";
import { doc, deleteDoc, } from 'firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup'
import { auth } from "../../firebase-setup";
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom'

//  ------------- importing from other files ----------------
import { db } from '../../firebase-setup';
import { dialogActions } from '../../Store/reducer/dialog';
import { securityActions } from '../../Store/reducer/security';
import { userFormActions } from '../../Store/reducer/userForm';
import { loadingActions } from '../../Store/reducer/loading';
import { errorsActions } from '../../Store/reducer/errors';

const LogIn = props => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // fetching values from redux store
    const navigationIndex = useSelector(state => state.security.navigationIndex) // contains nav id to navigate (this is of Security component)
    const newEmailOrPass = useSelector(state => state.security.newEmailOrPass) // contains the input for new email and pass input element
    const logInError = useSelector(state => state.errors.logInError) // sets errorFlag true if error occurs while logging in
    const loading = useSelector(state => state.loading.loading) // to enable/disable the spinner
    const toDeleteAcc = useSelector(state => state.userForm.toDeleteAcc) // if true will lead to deleting account
    const userDbId = useSelector(state => state.userForm.currentUser.dbId) // user's firebase database id

    // creating schema for input validation
    const logInSchema = yup.object().shape({
        emailAddress : yup.string().required('email address is not mentioned'),
        password : yup.string().required('password is required')
    });

    // this will help to handle validation in the form
    const { register, formState : {errors}, handleSubmit } = useForm({
        resolver : yupResolver(logInSchema)
    });

    // method to click the input element 
    // this will remove the error message which will occur due to wrong ceredential error 
    const clickFormHandler = () => {
        dispatch(errorsActions.updateLogInError({status : false, message : ''}))
    }

    // this method will make user to log in
    const submitForm = async (data) => {
        dispatch(loadingActions.updateLoading(true)) // enables the loading spinner
        try {
            await signInWithEmailAndPassword(auth, data.emailAddress, data.password)
            dispatch(loadingActions.updateLoading(false)) // disable the loading spinner
            dispatch(dialogActions.updateShowCanvas(false)) // the log in side drawer will close
            dispatch(errorsActions.updateLogInError({status : false, message : ''})) // set the errorFlag to false
            navigate(`/build-burger`)

        } catch(err) {
            console.log(err.code)
            dispatch(securityActions.updateSuccessFlag(false)) // if fail to login then success flag will be false
            dispatch(errorsActions.updateLogInError({status : true, message : err.code.slice(5,err.code.length)})) // set the error flag to true
            dispatch(loadingActions.updateLoading(false)) // disable the loading spinner
        }
    }

    // this will make user to re login during changing of email and password
    const reSubmitForm = async (data) => {
        dispatch(loadingActions.updateLoading(true))
        try {
            // signing in
            await signInWithEmailAndPassword(auth, data.emailAddress, data.password)
            if (toDeleteAcc) { // to delete user account
                console.log('deleting')
                await deleteUser(auth.currentUser)
                await deleteDoc(doc(db, 'users', userDbId))
                await signOut(auth) // method to sign out the user from the firebase
                localStorage.removeItem('token') // to remove token from local storage
                navigate('/') // navigate to home page
                dispatch(dialogActions.updateDelAccModal(false)) // to close modal
                dispatch(userFormActions.updateCurrentUser({})) // resetting the current user info as user logged out
                dispatch(userFormActions.updateDeleteAccount(false)) // once acc is deleted the value will set to false
            } else if (navigationIndex === 0) { 
                await updateEmail(auth.currentUser, newEmailOrPass) // to update email address
                dispatch(securityActions.updateStartValidation(false)) // turn the validation flag to false
            } else if (navigationIndex === 1) {
                await updatePassword(auth.currentUser, newEmailOrPass) // to update password
                dispatch(securityActions.updateStartValidation(false))
            }
            dispatch(securityActions.updateSuccessFlag(true))  // success status to true  
            dispatch(errorsActions.updateLogInError({status : false, message : ''}))
            dispatch(loadingActions.updateLoading(false))
        } catch(err) {
            dispatch(securityActions.updateSuccessFlag(false)) 
            dispatch(errorsActions.updateLogInError({status : true, message : err.code.slice(5,err.code.length)}))
            dispatch(loadingActions.updateLoading(false))
        }
    }

    return (
        <Container 
            maxWidth = 'xs' 
            className = 'mt-3' 
            sx = {{zIndex : 20}}>
            {!props.reAuth ?
                // login form to log in
                <Box>
                    <form className = 'p-3' onSubmit = {handleSubmit(submitForm)}>
                        <Typography 
                            className = 'text-center' 
                            variant = 'h5'
                            sx = {{fontFamily : 'Righteous, cursive'}}>
                            LOG IN
                        </Typography>
                        <TextField fullWidth 
                            error = {Boolean(errors.emailAddress)}
                            helperText = {errors.emailAddress?.message}
                            className = 'mb-3 noInputBorder'
                            type = 'text'
                            label = 'Email Address'
                            {...register('emailAddress')}
                            size = 'small'         
                            variant = 'standard'   
                            color = 'blackish'
                            onClick = {clickFormHandler} />
                        <TextField fullWidth 
                            error = {Boolean(errors.password)}
                            helperText = {errors.password?.message}
                            className = 'mb-3 noInputBorder'
                            type = 'password'
                            label = 'Password'
                            {...register('password')}
                            size = 'small'     
                            variant = 'standard'
                            color = 'blackish'
                            onClick = {clickFormHandler}/>
                        <Button 
                            className = 'mb-3' 
                            type = 'submit' 
                            variant = 'contained' 
                            color = 'blackish'
                            sx = {{
                                borderRadius : 0, 
                                width : 90,
                                height : 35,
                                color : '#f9b826',
                                fontFamily : 'Montserrat Alternates, sans-serif'}}>
                            {loading ? 
                                <Spinner animation='border' size = 'sm' /> : 
                                'Log In' }
                        </Button>
                        {logInError.status &&
                            <Alert severity = 'error' color = 'error' variant = 'filled'>
                                <AlertTitle>
                                    <strong>Something wrong :(</strong>
                                </AlertTitle>
                                <strong>{logInError.message}</strong>
                            </Alert>
                        }
                    </form>
                </Box>
            :
            // this log in form display when user wants to change the security of its account like changing email and password
                <form className = 'p-3' onSubmit = {handleSubmit(reSubmitForm)}>
                    <Typography 
                        className = 'text-center' 
                        variant = 'h5'
                        sx = {{fontFamily : 'Righteous, cursive'}}>
                        LOG IN
                    </Typography>
                    <TextField fullWidth 
                        error = {Boolean(errors.emailAddress)}
                        helperText = {errors.emailAddress?.message}
                        className = 'mb-3 noInputBorder'
                        type = 'text'
                        label = 'Email Address'
                        {...register('emailAddress')}
                        size = 'small'         
                        variant = 'standard'  
                        color = 'blackish'         
                    />
                    <TextField fullWidth 
                        error = {Boolean(errors.password)}
                        helperText = {errors.password?.message}
                        className = 'mb-3 noInputBorder'
                        type = 'password'
                        label = 'Password'
                        {...register('password')}
                        size = 'small'     
                        variant = 'standard' 
                        color = 'blackish'/>
                    <Button 
                        sx = {{
                            borderRadius : 0, 
                            width : 90,
                            height : 35,
                            color : '#f9b826',
                            fontFamily : 'Montserrat Alternates, sans-serif'}}
                        className = 'mb-3' 
                        type = 'submit' 
                        variant = 'contained' 
                        color = 'blackish'>
                        {loading ? 
                            <Spinner animation='border' size = 'sm' /> : 
                            'Log In' }
                    </Button>
                    {logInError.status &&
                        <Alert severity = 'error' color = 'error' variant = 'filled'>
                            <AlertTitle>
                                <strong>Something wrong :(</strong>
                            </AlertTitle>
                            <strong>{logInError.message}</strong>
                        </Alert>
                    }
                </form>
            }
        </Container>
    );
}

export default LogIn;