import { Stack, Box, Grid, Typography, Button, TextField, MenuItem, Container } from '@mui/material';
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom';
import { Image } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'

// ------------- importing from files -------------------
import classes from './Home.module.css'
import { dialogActions } from '../../Store/reducer/dialog';
import { userFormActions } from '../../Store/reducer/userForm';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import FullDialogs from '../../Components/FullDialogs/FullDialogs';
import { Burger } from '../../path-to-assets/pathToImages'


const Home = (props) => {
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const prevPath = localStorage.getItem('prevPath') // stores the previous path from where user navigated from

    // this method will open the login and signup modal
    const dialogHandler = () => {
        dispatch(dialogActions.updateShowCanvas(true))
        dispatch(userFormActions.updateIsSignUpForm(true))
    }

    return (
        <Container maxWidth = 'xl'>
            <Box sx = {{overflow : 'hidden'}}>
                <Grid container>
                    <Grid xs = {7} item className = {classes.firstItem}>
                        <motion.div 
                            initial = {{width : prevPath === '/pricing' || prevPath === '/about-us' ? '100vw' : '100%'}}
                            animate = {{width : '100%'}}
                            style = {{
                                position : 'absolute',
                                backgroundColor : '#f9b826',
                                height : '100%',
                                borderRadius : '0 50% 50% 0/0 100% 100% 0',
                                transform : 'scaleY(1.5)'                                
                            }}>
                        </motion.div>                        
                        <Stack 
                            direction = 'row' 
                            justifyContent = 'center'
                            alignItems = 'center'
                            sx = {{height : 'inherit'}}>    
                            <motion.div 
                                initial = {{x : '-100vw'}}
                                animate = {{x : 0,}}
                                exit = {{x : '-100vw'}}
                                transition = {{duration : 0.7, type : 'spring'}}>
                                <Image fluid src = {Burger} />                                          
                            </motion.div>                                     
                        </Stack>
                    </Grid>
                    <Grid 
                        xs = {5} item 
                        className = {classes.secondItem} 
                        display = 'flex'
                        flexDirection = 'column'
                        justifyContent = 'center'
                        alignItems = 'center'>
                        <motion.div className = 'text-center'
                            initial = {{x : '100vw', opacity : 0}}
                            animate = {{x : 0, opacity : 1}}
                            exit = {{x : '100vw', opacity : 0}}
                            transition = {{duration : 0.7, type : 'spring'}}>
                            <Typography variant = 'h2' sx = {{color : '#f9b826'}}>CLARISH</Typography> 
                            <Typography variant = 'h2' sx = {{color : '#f9b826'}}>BURGERS</Typography> 
                            <Button 
                                sx = {{mt : 5, width : 200}} 
                                variant = 'contained' 
                                className = {classes.register}
                                color = 'yellowish'
                                onClick = {dialogHandler}>       
                                    Sign Up
                            </Button>
                        </motion.div>
                    </Grid>                
                </Grid>
                {pathname === '/your-orders' || pathname === '/manage-addresses' || pathname === '/security-settings' ? 
                    <Outlet />
                    : 
                    <FullDialogs title = 'My Cart' closeDialogHandler = {props.closeDialogHandler} priceInfo = {props.priceInfo}>
                        <Outlet />
                    </FullDialogs>
                }           
            </Box>
        </Container>
    )
}

export default Home;