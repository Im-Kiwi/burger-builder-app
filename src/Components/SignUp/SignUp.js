import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Container, Stack, TextField, Button, Paper, Typography, MenuItem } from '@mui/material'
import { Image } from 'react-bootstrap'
import { useForm  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-setup';
import * as yup from 'yup';
import { ThemeProvider } from '@mui/material/styles'
import { db } from '../../firebase-setup'
import { addDoc, collection, query, where, getDocs, arrayUnion, setDoc, doc } from 'firebase/firestore'

//  ----------------- importing from other files ------------------
import { userFormActions } from '../../Store/reducer/userForm';
import { userFormTheme } from '../../theme/mui-theme';
import { dialogActions } from '../../Store/reducer/dialog';
import { Phili, Ind } from '../../path-to-assets/pathToImages'

const SignUp = props => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // this will record the selection of nation by the user
    const [selectNation, setSelectNation] = useState('')

    // fetching values from the redux store
    const isUserNameExist = useSelector(state => state.userForm.isUserNameExist)
    const userId = useSelector(state => state.userForm.currentUser.userId)

     // creating schema for sign up validation
    const signUpSchema = yup.object().shape({
        userName : yup.string().required('please add user name').max(8, 'user name should not exceed 8 characters'),
        emailAddress : yup.string().required('please add email address').matches(/^[a-z]+[.a-z]+[a-z]+@[a-z]+[.]+[a-z]+[a-z]$/, 'invalid email'),
        nationality : yup.string().required('Mention the nationality'),        
        password : yup.string().required('mention password').min(6, 'password must be 6 character long').max(12, 'password must be less then 12 characters'),
        confirmPassword : yup.string().required().oneOf([yup.ref('password')], 'password does not match')        
    });

    // this will help to handle validation of the form
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
            // sending the sign up form information to firebase which will result in success of creating account
            const response = await createUserWithEmailAndPassword(auth, data.emailAddress, data.password)
            const userData = {
                userName : data.userName,
                nationality : data.nationality,
                email : response._tokenResponse.email,
                userId : response._tokenResponse.localId
            }

            try {
                // adding document in users collection in database after successfully sign up
                // document is the information of the user
                await addDoc(collection(db, 'users'), userData)
                dispatch(dialogActions.updateShowCanvas(false))
                navigate('/build-burger')
            } catch (err) {
                console.log(err)
            }
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
                        <TextField select
                            error = {Boolean(errors.nationality)}
                            helperText = {errors.nationality?.message}
                            aria-hidden = 'false'
                            label = 'Nationality'
                            size = 'small'
                            variant = 'standard'
                            className = 'mb-4 noInputBorder w-100'
                            {...register('nationality')}
                            onChange = {(event) => setSelectNation(event.target.value)}
                            value = {selectNation}
                        >
                            <MenuItem  value = 'Philippine'>
                                <Stack direction = 'row' spacing = {1}>
                                    <Image src = {Phili} alt = 'philippine flag' width = {30} />
                                    <Typography>Philippine</Typography>
                                </Stack>
                            </MenuItem>
                            <MenuItem value = 'India'>
                                <Stack direction = 'row' spacing = {1}>
                                    <Image fluid src = {Ind} alt = 'indian flag' width= {30} />
                                    <Typography>India</Typography>
                                </Stack>    
                            </MenuItem>
                        </TextField>
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