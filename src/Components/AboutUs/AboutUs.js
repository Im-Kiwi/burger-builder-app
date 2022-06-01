import { Container, Box, Typography, Grid } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faPersonBiking, faCity, faUsers } from '@fortawesome/free-solid-svg-icons'

// ----- importing from other files --------
import FullDialogs from '../FullDialogs/FullDialogs'
import { styles } from './styles'
import { Staff, WorldMap } from '../../path-to-assets/pathToImages'

const AboutUs = (props) => {
    const { pathname } = useLocation()
    const classes = styles()
    const prevPath = localStorage.getItem('prevPath')

    // dynamically setting the animation property, depending upon the previous path from where user navigated from
    let initial, animate
    if (prevPath === '/pricing') {
        initial = {
            borderRadius : '0 0 0 0/0 100% 100% 0',
            width : '100%'
        }        
    } else {
        initial = {
            borderRadius : '0 50% 50% 0/0 100% 100% 0'
        }
        animate = {
            borderRadius : [
                '0 50% 50% 0/0 100% 100% 0', 
                '0 30% 30% 0/0 100% 100% 0', 
                '0 15% 15% 0/0 100% 100% 0', 
                '0 0 0 0/0 100% 100% 0'
            ],
            width : '100%',
            transition : {
                duration : 0.2,
                type : 'tween'
            }
        }
    }

    // framer-motion variant
    const animation = {
        initial,
        animate
    }

    return (
        <Container maxWidth = 'xl'>
            <Box 
                position = 'relative'
                sx = {{
                    backgroundColor : '#110f12',
                    width : '100%'}}>
                <motion.div 
                    className = {classes.aboutUsContainer}
                    variants = {animation}
                    initial = 'initial'
                    animate = 'animate'>                    
                </motion.div>
                <Box
                    component = {motion.div}
                    initial = {{x:-200, opacity : 0}}
                    animate = {{x:0, opacity:1}}
                    transition = {{delay:0.1}}
                    sx = {{
                        display : 'flex',
                        justifyContent : 'center',
                        zIndex:10, 
                        mt:'150px !important', 
                        width : '100%',
                        position : 'absolute'
                    }}>                   
                    <Box
                        display = "flex"
                        flexDirection = 'column'
                        alignItems = 'center' 
                        sx = {{zIndex : 11, color : '#252422'}}>
                        <Container maxWidth = 'md'>
                            <FontAwesomeIcon style = {{fontSize : '3rem'}} icon = {faQuoteLeft} />
                            <Typography 
                                className = 'text-center'
                                variant = 'body1' 
                                sx = {{fontSize : '2.7rem', fontFamily : 'Passion One, cursive'}}>
                                Following your heart will always lead you to clarish burgers 
                            </Typography>   
                        </Container>
                        <div 
                            style = {{
                                width : 500, 
                                height : 2, 
                                borderRadius : '50%', 
                                marginTop : 20,
                                backgroundColor : '#343a40'}}></div>                    
                        <Grid container
                            alignItems = 'center'
                            className = 'shadow-sm' 
                            sx = {{
                                borderRadius : 3,
                                mt:5, mb:5,
                                overflow : 'hidden',
                                textAlign : 'center'}}>
                            <Grid 
                                item xs = {6} 
                                sx = {{
                                    backgroundColor : '#eb5e28', 
                                    height : '100%',
                                    width : '100%'}}>
                                <Image 
                                    fluid 
                                    width = {500}
                                    style = {{marginTop : 10, marginBottom : 10}}
                                    src = {Staff}  
                                    alt = 'staff'/>
                            </Grid>
                            <Grid item xs = {6} sx = {{p:10, color : '#fffcf2', backgroundColor : '#252422'}}>
                                <Typography variant = 'h3' sx = {{mb:5, fontFamily : 'Anton, sans-serif', fontSize : '2.5rem'}}>
                                    Who are we ?                                    
                                </Typography>
                                <Typography variant = 'body1' sx = {{fontFamily : 'Poppins, sans-serif', fontSize : '1.4rem'}}>
                                    We Clarish team has sole purpose to provide yummy burgers to our customers with our quick delivery system.
                                    <br />
                                    Giving control to our customers to build their favourite burger and we make sure to prepare and deliver on their door step quickly as possible
                                    <br />
                                    Build your burger then sit and relax and let us handle the rest XD
                                </Typography>
                            </Grid>                                                        
                        </Grid>
                        <Grid 
                            container 
                            justifyContent = 'space-between' 
                            spacing = {5}
                            sx = {{mb:10, mt:4, color : '#252422'}}>
                            <Grid 
                                xs = {4}
                                item 
                                display = 'flex' 
                                flexDirection = 'column'
                                alignItems = 'center'>
                                    <FontAwesomeIcon icon = {faUsers} style = {{fontSize : '3rem'}} />
                                    <Typography variant = 'body1' sx = {{fontFamily : 'Anton, sans-serif', fontSize : '1.7rem'}}>1M+ customers</Typography>                                
                            </Grid>
                            <Grid 
                                xs = {4}
                                item
                                display = 'flex'
                                flexDirection = 'column'
                                alignItems = 'center'>
                                <FontAwesomeIcon icon = {faCity} style = {{fontSize : '3rem'}} />
                                <Typography variant = 'body1' sx = {{fontFamily : 'Anton, sans-serif', fontSize : '1.7rem'}}>
                                    services available in 40+ cities                            
                                </Typography>
                            </Grid>
                            <Grid 
                                xs = {4}
                                item
                                display = 'flex'
                                flexDirection = 'column'
                                alignItems = 'center'>
                                <FontAwesomeIcon icon = {faPersonBiking} style = {{fontSize : '3rem'}} />
                                <Typography variant = 'body1' sx = {{fontFamily : 'Anton, sans-serif', fontSize : '1.7rem'}}>
                                    Door to door fast delivery system
                                </Typography>
                            </Grid>
                        </Grid>
                        <Box sx = {{mb:3}}>
                            <Typography 
                                className = 'text-center mb-3'
                                variant = 'h3' 
                                sx = {{fontFamily : 'Anton, sans-serif', fontSize : '2.5rem'}}>
                                Where are we located ?
                            </Typography>
                            <Container maxWidth = 'md'>
                                <Typography 
                                    className = 'text-center mb-3'
                                    variant = 'body1' 
                                    sx = {{fontFamily : 'Poppins, sans-serif', fontSize : '1.4rem'}}>
                                    Currently our centers are located in two countries, India and philippine, but we looking forward to expand our territory further :)
                                </Typography>
                            </Container>
                            <Container maxWidth = 'lg'>
                                <Image src = {WorldMap} fluid alt = 'world map' />
                            </Container>
                            <Container maxWidth = 'md'>
                                <Typography
                                    className = 'text-center'
                                    variant = 'body1'
                                    sx = {{fontFamily : 'Poppins, sans-serif', fontSize : '1.4rem'}}>
                                    We covered all the major cities of these countries, but still if you wanna know whether our services are availale in your area
                                    then fill up the address form while adding your address and check whether ur city is mentioned in 'Select City' options
                                </Typography>
                            </Container>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {pathname === '/your-orders' || pathname === '/manage-addresses' || pathname === '/security-settings' ?
                <Outlet />
            :
                <FullDialogs 
                    title = 'My Cart' 
                    closeDialogHandler = {props.closeDialogHandler} 
                    priceInfo = {props.priceInfo}
                    cartPrice = {props.cartPrice}
                    totalItems = {props.totalItems}>
                    <Outlet />
                </FullDialogs>
            }
        </Container>
    )
}

export default AboutUs