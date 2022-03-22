import { Stack, Box, Grid, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux'

// ------------- importing from files -------------------
import CreateAccount from '../CreateAccount/CreateAccount';
import classes from './Home.module.css'
import { dialogActions } from '../../Store/reducer/dialog';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const dialogHandler = () => {
        navigate('/sign-up')
    }

    return (
        <Box className = {classes.main}>
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
                    {/* <CreateAccount /> */}
                </Grid>                
            </Grid>
        </Box>
    )
}

export default Home;