import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, TextField, InputBase, Button } from '@mui/material';
import { Form } from 'react-bootstrap';
import { useForm  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase-setup';
import * as yup from 'yup';

//  ----------------- importing from other files ------------------
import { userFormActions } from '../../Store/reducer/userForm';

const SignUp = props => {

    const dispatch = useDispatch()

    // this will help to handle validation in the form
    const { register, handleSubmit, formState : {errors} } = useForm({
        resolver : yupResolver(props.signUpSchema)
    })

    // sending the sign up form info to the firebase server
    const submitForm = async data => {
        try {
            const signUpResponse = await createUserWithEmailAndPassword(auth, data.emailAddress, data.password)           
            dispatch(userFormActions.updateIsLogIn(true))
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <Container className = 'mt-3' maxWidth = 'xs'>
            <form className = 'p-3' onSubmit = {handleSubmit(submitForm)}>
                <TextField 
                    error = {Boolean(errors.userName)}
                    helperText = {errors.userName?.message}
                    fullWidth
                    label = 'User Name'
                    variant = 'standard'
                    className = 'mb-3 noInputBorder'
                    size = 'small'
                    type = 'text'
                    {...register('userName')}
                />
                <TextField 
                    error = {Boolean(errors.emailAddress)}
                    helperText = {errors.emailAddress?.message}
                    fullWidth
                    label = 'Email Address'
                    variant = 'standard'
                    className = 'mb-3 noInputBorder'
                    size = 'small'
                    type = 'text'
                    {...register('emailAddress')}
                />
                <TextField 
                    error = {Boolean(errors.password)}
                    helperText = {errors.password?.message}
                    fullWidth
                    label = 'Password'
                    className = 'mb-3 noInputBorder'
                    variant = 'standard'
                    size = 'small'
                    type = 'password'
                    {...register('password')}
                />
                <TextField 
                    error = {Boolean(errors.confirmPassword)}
                    helperText = {errors.confirmPassword?.message}
                    fullWidth
                    label = 'Confirm Password'
                    className = 'mb-3 noInputBorder'
                    variant = 'standard'
                    size = 'small'
                    type = 'password'
                    {...register('confirmPassword')}
                />
                <Button type = 'submit' variant = 'contained' color = 'success'>
                    Sign Up
                </Button>
            </form>            
        </Container>
    )
}

export default SignUp