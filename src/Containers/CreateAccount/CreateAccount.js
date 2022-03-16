import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase-setup';
import { onAuthStateChanged } from 'firebase/auth';
import { Container, Tabs, Tab, Paper, Box } from "@mui/material";
import * as yup from 'yup';

// ------------- importing from other files ----------------------
import SignUp from "../../Components/SignUp/SignUp";
import LogIn from "../../Components/LogIn/LogIn";
import { userFormActions } from '../../Store/reducer/userForm';

const CreateAccount = () => {

    const dispatch = useDispatch();

    const userEmail = useSelector(state => state.userForm.currentUser.email);

    const [tabValue, setTabValue] = useState(0);

    // creating schema for input validation
    const signUpSchema = yup.object().shape({
        userName : yup.string().required('please add user name').max(8, 'user name should not exceed 8 characters'),
        emailAddress : yup.string().required('please add email address').matches(/^[a-z]+[.a-z]+[a-z]+@[a-z]+[.]+[a-z]+[a-z]$/, 'invalid email'),
        password : yup.string().required('mention password').min(6, 'password must be 6 character long').max(12, 'password must be less then 12 characters'),
        confirmPassword : yup.string().required().oneOf([yup.ref('password')], 'password does not match')        
    });
    const logInSchema = yup.object().shape({
        emailAddress : yup.string().required('email address is not mentioned'),
        password : yup.string().required('password is required')
    });

     // making sure user stayed logged in once it logs in
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            const userData = { // data is stored in a seperate object to avoid storing non seriealizable data inside redux store
                email : currentUser.email,
                token : currentUser.accessToken,
                userId : currentUser.uid
            }            
            dispatch(userFormActions.updateCurrentUser(userData));  
        }
    });



    // to change the tab
    const changeTabHandler = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Container maxWidth = 'sm'>
            <Paper sx = {{mt : 10}} elevation = {2}>
                <Box>
                    <Tabs value = {tabValue} variant = 'fullWidth' indicatorColor = 'primary' onChange = {changeTabHandler}>
                        <Tab label = 'Sign Up' sx = {{fontWeight : 600, fontSize : '1rem'}} value = {0} />
                        <Tab label = 'Log In' sx = {{fontWeight : 600, fontSize : '1rem'}} value = {1} />
                    </Tabs>
                </Box>
                <Box>
                    {tabValue === 0 ? 
                        <SignUp 
                            signUpSchema = {signUpSchema} 
                        />
                    :
                        <LogIn 
                            logInSchema = {logInSchema} 
                        />
                    }
                </Box>
                <p>{userEmail}</p>
            </Paper>
        </Container>

    );
};

export default CreateAccount;