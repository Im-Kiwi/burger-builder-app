import { useState } from 'react'
import { Container, Tabs, Tab, Paper, Box } from "@mui/material";
import * as yup from 'yup';

// ------------- importing from other files ----------------------
import SignUp from "../../Components/SignUp/SignUp";
import LogIn from "../../Components/LogIn/LogIn";

const CreateAccount = () => {

    const [tabValue, setTabValue] = useState(0)
    console.log(tabValue)

    // to change the tab
    const changeTabHandler = (event, newValue) => {
        setTabValue(newValue)
    }

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

    return (
        <Container maxWidth = 'sm'>
            <Paper sx = {{mt : 10}} elevation = {2}>
                <Box>
                    <Tabs value = {tabValue} variant = 'fullWidth' onChange = {changeTabHandler}>
                        <Tab label = 'Sign Up' value = {0} />
                        <Tab label = 'Log In' value = {1}/>
                    </Tabs>
                </Box>
                <Box>
                    {tabValue === 0 ? 
                        <SignUp signUpSchema = {signUpSchema} />
                    :
                        <LogIn logInSchema = {logInSchema} />
                    }
                </Box>
            </Paper>
        </Container>
    );
}

export default CreateAccount;