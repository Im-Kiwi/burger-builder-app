import { Stack, Box, Grid, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom';

// ------------- importing from files -------------------
import classes from './Home.module.css'
import { dialogActions } from '../../Store/reducer/dialog';
import { userFormActions } from '../../Store/reducer/userForm';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import FullDialogs from '../../Components/FullDialogs/FullDialogs';


const Home = (props) => {
    const dispatch = useDispatch()

    const dialogHandler = () => {
        dispatch(dialogActions.updateOpen(true))
        dispatch(userFormActions.updateIsSignUpForm(true))
    }

    return (
        <Box className = {classes.main}>
            <NavigationBar />
            <Grid container>
                <Grid xs = {6} item className = {[classes.firstItem, ''].join(' ')} >
                    <Stack 
                        direction = 'row' 
                        justifyContent = 'center' 
                        className = {classes.headerContainer}
                        alignItems = 'center'
                    >
                        <Box className = {classes.header}>
                            <Typography variant = 'h3'>CLARISH BURGERS</Typography> 
                            <Button 
                                sx = {{mt : 5}} 
                                variant = 'contained' 
                                size = 'large' 
                                className = {classes.register}
                                onClick = {dialogHandler}
                            >Register</Button>
                        </Box>
                    </Stack>
                </Grid>
                <Grid xs = {6} item className = {classes.secondItem}>
                </Grid>                
            </Grid>
            <FullDialogs closeDialogHandler = {props.closeDialogHandler}>
                <Outlet />
            </FullDialogs>
        </Box>
    )
}

export default Home;