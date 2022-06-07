import { Container, Grid, Stack, Typography } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import { Image } from 'react-bootstrap'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { v4 as uniqueId } from 'uuid'

// ------- importing from other files ------------
import FullDialogs from '../FullDialogs/FullDialogs'
import { styles } from './styles'
import { BaconIco, CheeseIco, MeatIco, TomatoIco, OnionIco, LettuceIco, Coke, Fries, PickBurger, Fries_Coke, Customers } from '../../path-to-assets/pathToImages'
import useSwitchCurrency from '../../Hooks/useSwitchCurrency'
import SwitchCurrency from '../SwitchCurrency/SwitchCurrency'


const Pricing = (props) => {
    const { pathname } = useLocation()
    const classes = styles()
    const prevPath = localStorage.getItem('prevPath')

    // creating @media breakpoints
    const break_899 = useMediaQuery('(max-width : 899px)')
    const break_800 = useMediaQuery('(min-width : 800px)')
    const break_410 = useMediaQuery('(min-width : 410px)')

    const [switchCurr, switchCurrHandler] = useSwitchCurrency() // this will handle the currency switch

    // conversion of price depending upon the switch currency value 
    const priceDetails = [
        {name : 'Lettuce', price : switchCurr ? 5 : (5*0.67).toFixed(0), img : LettuceIco},
        {name : 'Cheese', price : switchCurr ? 10 : (10*0.67).toFixed(0), img : CheeseIco},
        {name : 'Tomato', price : switchCurr ? 5 : (5*0.67).toFixed(0), img : TomatoIco},
        {name : 'Onion', price : switchCurr ? 5 : (5*0.67).toFixed(0), img : OnionIco},
        {name : 'Meat', price : switchCurr ? 30 : (30*0.67).toFixed(0), img : MeatIco},
        {name : 'Bacon', price : switchCurr ? 25 : (25*0.67).toFixed(0), img : BaconIco},
        {name : 'Coke', price : switchCurr ? 30 : (30*0.67).toFixed(0), img : Coke},
        {name : 'French Fries', price : switchCurr ? 60 : (60*0.67).toFixed(0), img : Fries},
    ]

    // dynamically setting the animation property, depending upon the previous path from where user navigated from
    let initial, animate
    if (prevPath === '/about-us') {
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

    // framer motion variant
    const animation = {
        initial,
        animate
    }


    return (
        <Container disableGutters = {break_899 && true} maxWidth = 'xl'>
            <div className = {classes.pricingContainer}>
                <motion.div 
                    className = {classes.pricingBackdrop}
                    variants = {animation}
                    initial = 'initial'
                    animate = 'animate'>                    
                </motion.div>
                <motion.div
                    className = {classes.pricingMain}                     
                    initial = {{x:-200, opacity:0}}
                    animate = {{x:0, opacity:1}}
                    transition = {{delay:0.1}}>
                    <Grid 
                        container 
                        display = 'flex' 
                        flexDirection = 'column'>
                        <Grid item xs = {12} 
                            display = 'flex'
                            flexDirection = {break_800 ? 'row' : 'column'}
                            justifyContent = 'space-evenly' 
                            alignItems = 'center'
                            gap ={1}>
                            <Stack 
                                alignItems = 'center' 
                                justifyContent = 'center'
                                sx = {{width : 250}}>
                                <Image 
                                    src = {Customers} 
                                    width = {120} 
                                    fluid 
                                    alt = 'customers' />
                                <Typography 
                                    className = 'text-center'
                                    sx = {{fontSize : '1.3rem', fontFamily : 'Anton, sans-serif'}}>
                                    We let our customers to chose what ingredients they want inside the burger by which they can control the price
                                </Typography>
                            </Stack> 
                            {break_800 && <div className = {classes.verticalLine}></div>}
                            <Stack
                                alignItems = 'center'
                                justifyContent = 'center'
                                sx = {{width : 250}}>
                                <Image 
                                    src = {PickBurger} 
                                    width = {80} 
                                    fluid 
                                    alt = 'customers' />
                                <Typography 
                                    className = 'text-center'
                                    sx = {{fontFamily : 'Anton, sans-serif', fontSize : '1.3rem'}}>
                                    Each ingredient of burger has a fixed price, depends what and what quantity of ingredient customer want inside their burger
                                </Typography>
                            </Stack>
                            {break_800 && <div className = {classes.verticalLine}></div>}
                            <Stack
                                justifyContent = 'center'
                                alignItems = 'center'
                                sx = {{width : 250}}>
                                <Image 
                                    src = {Fries_Coke} 
                                    width = {100} 
                                    fluid 
                                    alt = 'customers' />
                                <Typography 
                                    className = 'text-center'
                                    sx = {{fontFamily : 'Anton, sans-serif', fontSize : '1.3rem'}}>
                                    Some extra items also included like coke and french fries, just to make snack more lets say complete XD
                                </Typography>
                            </Stack>                                
                        </Grid>
                        <Grid item xs = {12}
                            display = 'flex' 
                            flexDirection = 'column' 
                            justifyContent = 'center' 
                            alignItems = 'center'>
                            <Typography 
                                variant = 'h6'
                                className = 'text-center'
                                sx = {{mt:5, mb:2, fontFamily : 'Fjalla One, sans-serif'}}>
                                Below are the price details of the slices and extra items
                            </Typography>
                            <SwitchCurrency
                                switchCurr = {switchCurr}
                                switchCurrHandler = {switchCurrHandler}/>
                            <Grid 
                                container 
                                justifyContent = 'center'
                                gap = {2}
                                sx = {{width : '100%', mt:4, mb:3}}>
                                    {priceDetails.map(item => {
                                        return (                                            
                                            <Grid item xs = {!break_410 && 12}
                                                container 
                                                key = {uniqueId()}
                                                alignItems = 'center' 
                                                justifyContent = 'space-between'
                                                gap = {1}
                                                sx = {{width : '50%'}}>
                                                <Grid item 
                                                    display = 'flex' 
                                                    flexDirection = 'row' 
                                                    justifyContent = 'flex-start'
                                                    alignItems = 'center'
                                                    gap = {1}>
                                                    <Image 
                                                        src = {item.img} 
                                                        fluid 
                                                        width = {40} 
                                                        alt = 'lettuce' />
                                                    <Typography sx = {{fontSize : '1.1rem', fontFamily : 'Concert One, cursive'}}>
                                                        <strong>{item.name}</strong>
                                                    </Typography>
                                                </Grid>                                    
                                                <Grid item display = 'flex' justifyContent = 'center'>
                                                    <Typography sx = {{fontSize : '1.1rem' ,fontFamily : 'Concert One, cursive'}}>
                                                        {item.price}
                                                    </Typography>                                                    
                                                </Grid>
                                            </Grid>
                                        )
                                    })}
                            </Grid>
                        </Grid>
                    </Grid>
                </motion.div>
            </div>
            {pathname === '/your-orders' || pathname === '/manage-addresses' || pathname === '/security-settings' ?
                <Outlet />
            :
                <FullDialogs 
                    title = 'My Cart' 
                    closeDialogHandler = {props.closeDialogHandler}
                    cartPrice = {props.cartPrice}
                    totalItems = {props.totalItems}>
                    <Outlet />
                </FullDialogs>
            }
        </Container>
    )
}

export default Pricing