import { Container, Box } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

// ----- importing from other files --------
import FullDialogs from '../FullDialogs/FullDialogs'
import { styles } from './styles'

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
                    className = {classes.pricingContainer}
                    variants = {animation}
                    initial = 'initial'
                    animate = 'animate'>                    
                </motion.div>
                <Box sx = {{zIndex:10, mt:9, position : 'absolute'}}>
                    enter ur content here
                    Burger Pricing
                </Box>
            </Box>
            {pathname === '/your-orders' || pathname === '/manage-addresses' || pathname === '/security-settings' ?
                <Outlet />
            :
                <FullDialogs title = 'My Cart' closeDialogHandler = {props.closeDialogHandler} priceInfo = {props.priceInfo}>
                    <Outlet />
                </FullDialogs>
            }
        </Container>
    )
}

export default AboutUs