import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { Container, TextField, Button, Box, Typography, Alert, AlertTitle } from '@mui/material'
import { useForm  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-setup';
import * as yup from 'yup';
import { db } from '../../firebase-setup'
import { addDoc, collection, query, where, getDocs} from 'firebase/firestore'

//  ----------------- importing from other files ------------------
import { userFormActions } from '../../Store/reducer/userForm';
import { dialogActions } from '../../Store/reducer/dialog';
import { user_name, email, password, confirmPass } from '../../identifiers/identifiers'
import { loadingActions } from '../../Store/reducer/loading';
import { errorsActions } from '../../Store/reducer/errors';

const SignUp = props => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // fetching values from the redux store
    const isUserNameExist = useSelector(state => state.userForm.isUserNameExist) // tells whether user name exist or not in the database
    const signUpForm = useSelector(state => state.userForm.signUpForm) // contains input data by the user in signup form
    const loading = useSelector(state => state.loading.loading) // to enable/disable the spinner
    const signUpError = useSelector(state => state.errors.signUpError) // contains the status of error and error message for signup form

     // creating schema for sign up validation
    const signUpSchema = yup.object().shape({
        userName : yup.string().trim().required('please add user name').max(8, 'user name should not exceed 8 characters'),
        emailAddress : yup.string().required('please add email address').matches(/^[a-z0-9]+(\.[a-z0-9]|[a-z0-9])+@[a-z]+\.com$/, 'invalid email'),
        password : yup.string().required('mention password').min(6, 'password must be 6 character long').max(12, 'password must be less then 12 characters'),
        confirmPassword : yup.string().required().oneOf([yup.ref('password')], 'password does not match')        
    });

    // to control the input elements in signup form
    const changeHandler = (event, label) => {
        switch (label) {
            case user_name:
                dispatch(userFormActions.updateUserName(event.target.value.trim()))
                break;
            case email:
                dispatch(userFormActions.updateEmail(event.target.value.trim()))
                break;
            case password:
                dispatch(userFormActions.updatePassword(event.target.value.trim()))
                break;
            case confirmPass:
                dispatch(userFormActions.updateConfirmPass(event.target.value.trim()))
                break;
            default:
                break;
        }
    }

    // this will help to handle validation of the form
    const { register, handleSubmit, formState : {errors} } = useForm({
        resolver : yupResolver(signUpSchema)
    })

    // sending the sign up form info to the firebase server
    const submitForm = async data => {
        dispatch(loadingActions.updateLoading(true)) // enable the spinner
        dispatch(errorsActions.updateSignUpError({status : false, message : ''}))
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
                email : response._tokenResponse.email,
                userId : response._tokenResponse.localId
            }
            try {
                // adding document in users collection in database after successfully sign up
                // document contains the information of the user
                await addDoc(collection(db, 'users'), userData)
                dispatch(dialogActions.updateShowCanvas(false))
                dispatch(userFormActions.updateResetSignUp())
                navigate(`/build-burger`)
            } catch (err) {
                console.log(err)
                dispatch(errorsActions.updateSignUpError({status : true, message : err.code.slice(5,err.code.length)}))
            }
        } catch (err) {
            console.log(err.message)
            dispatch(errorsActions.updateSignUpError({status : true, message : err.code.slice(5,err.code.length)}))
        }
        dispatch(loadingActions.updateLoading(false))
    }

    return (
        <Container maxWidth = 'xs' sx = {{zIndex : 20}}>
            <Box>
                <Typography 
                    className = 'text-center p-3' 
                    variant = 'h5'
                    sx = {{
                        color : '#110f12',
                        fontFamily : 'Righteous, cursive'}}>
                    SIGN UP
                </Typography>
                <form className = 'p-3' onSubmit = {handleSubmit(submitForm)}>
                    <TextField 
                        error = {Boolean(errors.userName) || isUserNameExist}
                        helperText = {isUserNameExist ? 'user name taken' : errors.userName?.message}
                        fullWidth
                        color = 'blackish'
                        label = 'User Name'
                        variant = 'standard'
                        className = 'mb-4'
                        size = 'small'
                        type = 'text'
                        {...register('userName')}
                        value = {signUpForm.userName}
                        onChange = {(event) => changeHandler(event, user_name)} />
                    <TextField 
                        error = {Boolean(errors.emailAddress)}
                        helperText = {errors.emailAddress?.message}
                        fullWidth
                        color = 'blackish'
                        label = 'Email Address'
                        variant = 'standard'
                        className = 'mb-4'
                        size = 'small'
                        type = 'text'
                        {...register('emailAddress')}
                        value = {signUpForm.emailAddress}
                        onChange = {event => changeHandler(event, email)} />
                    <TextField 
                        error = {Boolean(errors.password)}
                        helperText = {errors.password?.message}
                        fullWidth
                        label = 'Password'
                        className = 'mb-4'
                        color = 'blackish'
                        variant = 'standard'
                        size = 'small'
                        type = 'password'
                        {...register('password')}
                        value = {signUpForm.password}
                        onChange = {event => changeHandler(event, password)}
                    />
                    <TextField 
                        error = {Boolean(errors.confirmPassword)}
                        helperText = {errors.confirmPassword?.message}
                        fullWidth
                        label = 'Confirm Password'
                        color = 'blackish'
                        className = 'mb-4'
                        variant = 'standard'
                        size = 'small'
                        type = 'password'
                        {...register('confirmPassword')}
                        value = {signUpForm.confirmPass}
                        onChange = {event => changeHandler(event, confirmPass)}
                    />
                    <Button 
                        type = 'submit' 
                        variant = 'contained' 
                        color = 'blackish'
                        sx = {{
                            color : '#f9b826',
                            borderRadius : 0,
                            width : 100,
                            height : 35,
                            fontFamily : 'Montserrat Alternates, sans-serif'}}>
                        {loading ? <Spinner animation = 'border' size = 'sm'/> : 'Sign Up' }
                    </Button>
                    {signUpError.status &&
                        <Alert 
                            severity='error' 
                            variant='filled' 
                            color = 'error'
                            sx = {{mt:2}}>
                            <AlertTitle>Something's wrong :(</AlertTitle>
                            {signUpError.message}
                        </Alert>
                    }
                </form>            
            </Box>
        </Container>
    )
}

export default SignUp