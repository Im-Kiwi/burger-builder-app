import { TextField, Container, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'


const LogIn = props => {

    const { register, formState : {errors}, handleSubmit } = useForm({
        resolver : yupResolver(props.logInSchema)
    });

    const submitForm = (data) => {
        console.log(data);
    }

    return (
        <Container maxWidth = 'xs' className = 'mt-3'>
            <form className = 'p-3' onSubmit = {handleSubmit(submitForm)}>
                <TextField fullWidth 
                    error = {Boolean(errors.emailAddress)}
                    helperText = {errors.emailAddress ?.message}
                    className = 'mb-3 noInputBorder'
                    type = 'text'
                    label = 'Email Address'
                    {...register('emailAddress')}
                    size = 'small'         
                    variant = 'standard'           
                />
                <TextField fullWidth 
                    error = {Boolean(errors.password)}
                    helperText = {errors.password ?.message}
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