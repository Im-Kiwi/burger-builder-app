import { Stack, Box, Grid, Typography, Button } from '@mui/material';

// ------------- importing from files -------------------
import CreateAccount from '../CreateAccount/CreateAccount';
import classes from './Home.module.css'

const Home = () => {

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
                            <Button sx = {{mt : 5}} variant = 'contained' size = 'large' className = {classes.register}>Register</Button>
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