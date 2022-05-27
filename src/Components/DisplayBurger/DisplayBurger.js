import { useSelector } from 'react-redux'
import { Stack, Typography, Grid, Box } from '@mui/material'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPesoSign, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

// ------------importing from other files---------
import Burger from '../Burger/Burger'
import useSwitchCurrency from '../../Hooks/useSwitchCurrency'
import SwitchCurrency from '../SwitchCurrency/SwitchCurrency'

const DisplayBurger = (props) => {

    const ingredients = useSelector(state => state.ingredients) 
    const totalPrice = useSelector(state => state.ingredients.totalPrice)

    const [switchCurr, switchCurrHandler] = useSwitchCurrency()
    
    let convertPrice

    // converting the price from rupee to pesos (philippine currency)
    if (switchCurr) {
        convertPrice = totalPrice.toFixed(0)
    } else {
        const temp = totalPrice*0.67
        convertPrice = temp.toFixed(0)
    }

    // object to handle animation
    const animation = {
        initial : {
            x : props.noTransition ? 0 : '-100vw'
        },
        animate : {
            x : 0,
            transition : {
                type : 'spring',
                duration : 0.7
            }
        },
        exit : {
            x : props.noTransition ? 0 : '-100vw',
        },                
    }

    return (
        <Grid 
            position = 'absolute'
            container
            justifyContent = 'center'
            sx = {{mt : 5}}
            spacing = {10}
        >
            <Grid item xs = {12} display = 'flex' justifyContent = 'center'>
                <Stack 
                    sx = {{height : 500}} 
                    direction = 'row'  
                    alignItems = 'flex-end'
                >
                    <motion.div
                        variants = {animation}
                        initial = 'initial'
                        animate = 'animate'
                        exit = 'exit'                                                
                    >
                        <Burger 
                            ingredients = {ingredients} 
                            width = '200px'
                            plateWidth = '650px' 
                            cokeWidth = {250}
                            friesWidth = {250}
                        />                
                    </motion.div>
                </Stack>
            </Grid>
            <Grid item xs = {12} 
                display = 'flex' 
                flexDirection = 'column' 
                alignItems = 'center'
            >
                <motion.div
                    variants = {animation}
                    initial = 'initial'
                    animate = 'animate'
                    exit = 'exit'
                >
                    <Stack 
                        direction = 'row' 
                        sx = {{mb:2}} 
                        spacing = {1} 
                        justifyContent = 'center' 
                        alignItems = 'center'
                    >
                        <FontAwesomeIcon  
                            icon = {switchCurr ? faIndianRupeeSign : faPesoSign}
                            style = {{
                                color : '#110f12',
                                fontSize : '1.3rem'
                            }}
                        />
                        <Typography 
                            variant = 'body1'
                            sx={{
                                color : '#110f12',
                                fontSize : '1.5rem'
                            }} 
                        >
                            {convertPrice}
                        </Typography>
                    </Stack>
                    <SwitchCurrency
                        switchCurr = {switchCurr}
                        switchCurrHandler = {switchCurrHandler}
                        convertPrice = {convertPrice}
                    />                        
                </motion.div>
            </Grid>
        </Grid>
    )
}

export default DisplayBurger