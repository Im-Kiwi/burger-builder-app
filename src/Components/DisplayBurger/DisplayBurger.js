import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Stack, Typography, Grid, IconButton, Box, Switch } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPesoSign, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

// ------------importing from other files---------
import Burger from '../Burger/Burger'
import { styles, CustomSwitch } from './styles'

const DisplayBurger = (props) => {
    const classes = styles()

    const totalPrice = useSelector(state => state.ingredients.totalPrice)
    const ingredients = useSelector(state => state.ingredients)    

    const [isRupee, setIsRupee] = useState(false)

    let convertPrice

    // converting the price from rupee to pesos (philippine currency)
    if (isRupee) {
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

    const underlineAnime = {
        initial : {
            width : 0
        },
        animate : {
            width : 10,
            transition : {
                duration : 0.15,
                ease : 'easeIn'
            }
        },
        exit : {
            width : 0,
            transition : {
                duration : 0.15,
                ease : 'easeIn'
            }
        }
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
                            icon = {isRupee ? faIndianRupeeSign : faPesoSign}
                            className = {classes.currencyIcon}
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
                    <Box display = 'flex' gap = {1} alignItems = 'center'>
                        <Stack position = 'relative'>
                            <FontAwesomeIcon 
                                icon = {faPesoSign} 
                                className = {classes.selectCurrIcon}
                            />
                                <AnimatePresence exitBeforeEnter>
                                    {!isRupee &&
                                        <motion.div
                                            variants = {underlineAnime}
                                            initial = 'initial'
                                            animate = 'animate'  
                                            exit = 'exit'
                                            className = {classes.underline}
                                        ></motion.div>                                                                    
                                    }
                                </AnimatePresence>
                        </Stack>
                        <CustomSwitch 
                            checked = {isRupee}
                            onChange = {() => setIsRupee(v => !v)}
                            size = 'small'                           
                        />                        
                        <Stack position = 'relative'>
                            <FontAwesomeIcon  
                                icon = {faIndianRupeeSign} 
                                className = {classes.selectCurrIcon}
                            />
                                <AnimatePresence exitBeforeEnter>
                                    {isRupee &&
                                        <motion.div
                                            variants = {underlineAnime}
                                            initial = 'initial'
                                            animate = 'animate'
                                            exit = 'exit'                                                
                                            className = {classes.underline}
                                        ></motion.div>                                                                
                                    }                                                             
                                </AnimatePresence>  
                        </Stack>
                    </Box>
                </motion.div>
            </Grid>
        </Grid>
    )
}

export default DisplayBurger