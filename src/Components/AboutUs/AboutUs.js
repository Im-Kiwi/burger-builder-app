import { Container, Box, Typography, Grid } from '@mui/material'
import { useMediaQuery } from '@mui/material'
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

    // creating @media breakpoints
    const break_1199 = useMediaQuery('(max-width : 1199px)')
    const break_899 = useMediaQuery('(max-width : 899px)')
    const break_600 = useMediaQuery('(max-width : 550px)')

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
        <Container disableGutters = {break_899 && true} maxWidth = 'xl'>
            {/* the background */}
            <Box  
                position = 'relative'
                sx = {{backgroundColor : '#110f12', width : '100%'}}>
                {/* below component is placed on the top of background with yellow color, its position is absolute and rest of the 
                 contents are placed above this below component  */}
                <motion.div 
                    className = {classes.aboutUsContainer}
                    variants = {animation}
                    initial = 'initial'
                    animate = 'animate'>                    
                </motion.div>
                {/* main content of this component begins here */}
                <Box
                    component = {motion.div}
                    initial = {{x:-200, opacity : 0}}
                    animate = {{x:0, opacity:1}}
                    transition = {{delay:0.1}}
                    className = {classes.aboutUs}>                   
                    <Box
                        display = "flex"
                        flexDirection = 'column'
                        alignItems = 'center' 
                        sx = {{zIndex : 11, color : '#252422'}}>
                        <Container maxWidth = 'md'>
                            <FontAwesomeIcon 
                                style = {{fontSize : break_600 ? '2rem' : '3rem'}} 
                                icon = {faQuoteLeft} />
                            <Typography 
                                variant = 'body1' 
                                className = {classes.quote}>
                                Following your heart will always lead you to clarish burgers 
                            </Typography>   
                        </Container>
                        <div className = {classes.horizontalLine}></div>                    
                        <Grid 
                            container                        
                            alignItems = 'center'
                            className = {classes.introContainer}>
                            <Grid 
                                item xs = {12} lg = {6} 
                                className = {classes.introTextContainer}>
                                <Typography 
                                    variant = 'h3' 
                                    className = {classes.introHeading}>
                                    Who are we ?                                    
                                </Typography>
                                <Typography 
                                    variant = 'body1' 
                                    className = {classes.introText}>
                                    We Clarish team has sole purpose to provide yummy burgers to our customers with our quick delivery system.
                                    <br />
                                    Giving control to our customers to build their favourite burger and we make sure to prepare and deliver on their door step quickly as possible
                                    <br />
                                    Build your burger then sit and relax and let us handle the rest XD
                                </Typography>
                            </Grid>
                            <Grid 
                                item xs = {12} lg = {6} 
                                sx = {{width : '100%', backgroundColor : '#eb5e28'}}>
                                <Image 
                                    fluid 
                                    width = {break_1199 ? 600 : 500}
                                    style = {{marginTop : 10, marginBottom : 10}}
                                    src = {Staff}  
                                    alt = 'staff'/>
                            </Grid>                                                                                    
                        </Grid>
                        <Grid 
                            container 
                            justifyContent = 'space-between' 
                            spacing = {5}
                            sx = {{mb:10, mt:4, color : '#252422'}}>
                            <Grid 
                                xs = {12} md = {4}
                                item 
                                display = 'flex' 
                                flexDirection = 'column'
                                alignItems = 'center'>
                                    <FontAwesomeIcon 
                                        icon = {faUsers} 
                                        style = {{fontSize : break_600 ? '2rem' : '3rem'}} />
                                    <Typography 
                                        variant = 'body1' 
                                        className = {classes.shortSummary}>
                                        1M+ customers
                                    </Typography>                                
                            </Grid>
                            <Grid 
                                xs = {12} md = {4}
                                item
                                display = 'flex'
                                flexDirection = 'column'
                                alignItems = 'center'>
                                <FontAwesomeIcon 
                                    icon = {faCity} 
                                    style = {{fontSize : break_600 ? '2rem' : '3rem'}} />
                                <Typography 
                                    variant = 'body1' 
                                    className = {classes.shortSummary}>
                                    services available in 40+ cities                            
                                </Typography>
                            </Grid>
                            <Grid 
                                xs = {12} md = {4}
                                item
                                display = 'flex'
                                flexDirection = 'column'
                                alignItems = 'center'>
                                <FontAwesomeIcon 
                                    icon = {faPersonBiking} 
                                    style = {{fontSize : break_600 ? '2rem' :'3rem'}} />
                                <Typography 
                                    variant = 'body1' 
                                    className = {classes.shortSummary}>
                                    Door to door fast delivery system
                                </Typography>
                            </Grid>
                        </Grid>
                        <Box sx = {{mb:3}}>
                            <Typography 
                                variant = 'h3' 
                                className = {[classes.introHeading, 'text-center mb-3'].join(' ')}>
                                Where are we located ?
                            </Typography>
                            <Container maxWidth = 'md'>
                                <Typography 
                                    className = 'text-center mb-3'
                                    variant = 'body1' 
                                    sx = {{
                                        fontFamily : 'Poppins, sans-serif', 
                                        fontSize : break_600 ? '1.2rem' : '1.4rem'}}>
                                    Currently our centers are located in two countries, India and philippine, but we looking forward to expand our territory further :)
                                </Typography>
                            </Container>
                            <Container maxWidth = 'lg'>
                                <Image src = {WorldMap} fluid alt = 'world map' />
                            </Container>
                            <Container maxWidth = 'md'>
                                <Typography
                                    variant = 'body1'
                                    className = {[classes.introText, 'text-center'].join(' ')}>
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