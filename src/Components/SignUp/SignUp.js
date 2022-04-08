import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Container, Box, TextField, InputBase, Button, Paper, Typography } from '@mui/material';
import { useForm  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-setup';
import * as yup from 'yup';
import { ThemeProvider } from '@mui/material/styles'
import { db } from '../../firebase-setup'
import { doc, addDoc, collection, query, where, getDocs } from 'firebase/firestore'

//  ----------------- importing from other files ------------------
import { userFormActions } from '../../Store/reducer/userForm';
import { userFormTheme } from '../../theme/mui-theme';
import { dialogActions } from '../../Store/reducer/dialog';

const SignUp = props => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isUserNameExist = useSelector(state => state.userForm.isUserNameExist)

     // creating schema for sign up validation
    const signUpSchema = yup.object().shape({
        userName : yup.string().required('please add user name').max(8, 'user name should not exceed 8 characters'),
        emailAddress : yup.string().required('please add email address').matches(/^[a-z]+[.a-z]+[a-z]+@[a-z]+[.]+[a-z]+[a-z]$/, 'invalid email'),
        password : yup.string().required('mention password').min(6, 'password must be 6 character long').max(12, 'password must be less then 12 characters'),
        confirmPassword : yup.string().required().oneOf([yup.ref('password')], 'password does not match')        
    });

    // this will help to handle validation in the form
    const { register, handleSubmit, formState : {errors} } = useForm({
        resolver : yupResolver(signUpSchema)
    })

    // sending the sign up form info to the firebase server
    const submitForm = async data => {

        // checking whether the user name already exist in the database
        const readUsers = collection(db, 'users')
        const findUser = query(readUsers, where('userName', '==', data.userName))
        const fetchData = await getDocs(findUser)
        let userNameExist = false
        fetchData.forEach((doc) => {
            if (doc.data()) {
                userNameExist = true
            }
        })
        if (userNameExist) {
            dispatch(userFormActions.updateIsUserNameExist(true))
        }

        try {
            const response = await createUserWithEmailAndPassword(auth, data.emailAddress, data.password)
            try {
                const userData = {
                    userName : data.userName,
                    email : response._tokenResponse.email,
                    userId : response._tokenResponse.localId
                }

                const cartData = {
                    userName : data.userName,
                    userId : response._tokenResponse.localId,
                    cartItems : []
                } 

                // adding document in users and cart collection in database after successfully sign up
                await addDoc(collection(db, 'users'), userData)
                await addDoc(collection(db, 'cart'), cartData)
            } catch(err) {
                console.log('error in creating account')
            }   
            dispatch(dialogActions.updateOpen(false))
            navigate('/build-burger')
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <Container maxWidth = 'xs'>
            <Paper elevation = {2} sx = {{backgroundColor : '#110f12'}}>
                <Typography className = 'text-center text-light p-3' variant = 'h5'>Sign Up</Typography>
                <form className = 'p-3' onSubmit = {handleSubmit(submitForm)}>
                    <ThemeProvider theme = {userFormTheme}>
                        <TextField 
                            error = {Boolean(errors.userName) || isUserNameExist}
                            helperText = {isUserNameExist ? 'user name taken' : errors.userName?.message}
                            fullWidth
                            label = 'User Name'
                            variant = 'standard'
                            className = 'mb-4 noInputBorder'
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
                            className = 'mb-4 noInputBorder'
                            size = 'small'
                            type = 'text'
                            {...register('emailAddress')}
                        />
                        <TextField 
                            error = {Boolean(errors.password)}
                            helperText = {errors.password?.message}
                            fullWidth
                            label = 'Password'
                            className = 'mb-4 noInputBorder'
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
                            className = 'mb-4 noInputBorder'
                            variant = 'standard'
                            size = 'small'
                            type = 'password'
                            {...register('confirmPassword')}
                        />
                    </ThemeProvider>
                    <Button className = 'mx-auto' type = 'submit' variant = 'contained' color = 'success'>
                        Sign Up
                    </Button>
                </form>            
            </Paper>
        </Container>
    )
}

export default SignUp