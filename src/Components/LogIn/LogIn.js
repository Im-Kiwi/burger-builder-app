import { useDispatch, useSelector } from 'react-redux'
import { TextField, Container, Button, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, updateEmail, updatePassword } from "firebase/auth";
import { yupResolver } from '@hookform/resolvers/yup'
import { auth } from "../../firebase-setup";
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom'

//  ------------- importing from other files ----------------
import { dialogActions } from '../../Store/reducer/dialog';
import { securityActions } from '../../Store/reducer/security';

const LogIn = props => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // fetching values from redux store
    const navigationIndex = useSelector(state => state.security.navigationIndex)
    const newEmailOrPass = useSelector(state => state.security.newEmailOrPass)

    // creating schema for input validation
    const logInSchema = yup.object().shape({
        emailAddress : yup.string().required('email address is not mentioned'),
        password : yup.string().required('password is required')
    });

    // this will help to handle validation in the form
    const { register, formState : {errors}, handleSubmit } = useForm({
        resolver : yupResolver(logInSchema)
    });

    // this method will make user to log in
    const submitForm = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.emailAddress, data.password)
            dispatch(dialogActions.updateShowCanvas(false))
            navigate(`/build-burger`)

        } catch(err) {
            console.log('login failed!')
        }
    }

    // this will make user to re login during changing of email and password
    const reSubmitForm = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.emailAddress, data.password)
            if (navigationIndex === 0) {
                await updateEmail(auth.currentUser, newEmailOrPass)
                dispatch(securityActions.updateStartValidation(false))

            } else if (navigationIndex === 1) {
                await updatePassword(auth.currentUser, newEmailOrPass)
                dispatch(securityActions.updateStartValidation(false))
            }   
            dispatch(securityActions.updateSuccessFlag(true))         
        } catch(err) {
            dispatch(securityActions.updateSuccessFlag(false))
        }
    }

    return (
        <Container maxWidth = 'xs' className = 'mt-3'>
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
                            color = 'blackish' />
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
                            className = 'mb-3' 
                            type = 'submit' 
                            variant = 'contained' 
                            color = 'blackish'
                            sx = {{
                                borderRadius : 0, 
                                color : '#f9b826',
                                fontFamily : 'Montserrat Alternates, sans-serif'}}>
                            Log In
                        </Button>
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
                            color : '#f9b826',
                            fontFamily : 'Montserrat Alternates, sans-serif'}}
                        className = 'mb-3' 
                        type = 'submit' 
                        variant = 'contained' 
                        color = 'blackish'>
                        Log In
                    </Button>
                </form>
            }
        </Container>
    );
}

export default LogIn;