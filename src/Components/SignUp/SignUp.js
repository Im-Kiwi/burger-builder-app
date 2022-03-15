import { Container, Box, TextField, InputBase, Button } from '@mui/material'
import { Form } from 'react-bootstrap';
import { useForm  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; // it is used to connect react hook form with yup
import * as yup from 'yup';

const SignUp = props => {

    const { register, handleSubmit, formState : {errors} } = useForm({
        resolver : yupResolver(props.signUpSchema)
    });

    const submitForm = async data => {
        console.log(data);
    }

    return (
        <Container className = 'mt-3' maxWidth = 'xs'>
            <form className = 'p-3' onSubmit = {handleSubmit(submitForm)}>
                <TextField 
                    error = {Boolean(errors.userName)}
                    helperText = {errors.userName ?.message}
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
                    helperText = {errors.emailAddress ?.message}
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
                    helperText = {errors.password ?.message}
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
                    helperText = {errors.confirmPassword ?.message}
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
    );
}

export default SignUp;