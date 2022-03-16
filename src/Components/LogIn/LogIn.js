import { TextField, Container, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from '@hookform/resolvers/yup'
import { auth } from "../../firebase-setup";


const LogIn = props => {

    // this will help to handle validation in the form
    const { register, formState : {errors}, handleSubmit } = useForm({
        resolver : yupResolver(props.logInSchema)
    });

    // this method will make user to log in
    const submitForm = async (data) => {
        try {
            const logInData = await signInWithEmailAndPassword(auth, data.emailAddress, data.password)
        } catch(err) {
            console.log('login failed!')
        }
    }

    return (
        <Container maxWidth = 'xs' className = 'mt-3'>
            <form className = 'p-3' onSubmit = {handleSubmit(submitForm)}>
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
                <Button className = 'mb-3' type = 'submit' variant = 'contained' color = 'error'>
                    Log In
                </Button>
            </form>
        </Container>
    );
}

export default LogIn;