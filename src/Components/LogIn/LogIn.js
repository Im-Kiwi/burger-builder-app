import { useDispatch } from 'react-redux'
import { TextField, Container, Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from '@hookform/resolvers/yup'
import { auth } from "../../firebase-setup";
import * as yup from 'yup';
import { ThemeProvider } from '@mui/material/styles'

//  ------------- importing from other files ----------------
import { userFormTheme } from "../../mui-theme";
import { userFormActions } from "../../Store/reducer/userForm";

const LogIn = props => {
    const dispatch = useDispatch()

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

        } catch(err) {
            console.log('login failed!')

        }
    }

    return (
        <Container maxWidth = 'xs' className = 'mt-3'>
            <Paper elevation = {2} sx = {{backgroundColor : '#110f12'}}>
                <form className = 'p-3' onSubmit = {handleSubmit(submitForm)}>
                    <Typography className = 'text-light text-center' variant = 'h5'>Log In</Typography>
                    <ThemeProvider theme = {userFormTheme}>
                        <TextField fullWidth 
                            error = {Boolean(errors.emailAddress)}
                            helperText = {errors.emailAddress?.message}
                            className = 'mb-3 noInputBorder'
                            type = 'text'
                            label = 'Email Address'
                            {...register('emailAddress')}
                            size = 'small'         
                            variant = 'standard'           
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
                        />
                    </ThemeProvider>
                    <Button className = 'mb-3' type = 'submit' variant = 'contained' color = 'error'>
                        Log In
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default LogIn;