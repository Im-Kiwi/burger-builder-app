import { Stack, Box } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPesoSign, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

// ----- importing from other files ---------
import { CustomSwitch, styles } from './styles'


const SwitchCurrency = ({switchCurr, switchCurrHandler}) => {
    const classes = styles()

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
        <Box display = 'flex' gap = {1} alignItems = 'center'>
            <Stack position = 'relative'>
                <FontAwesomeIcon 
                    icon = {faPesoSign} 
                    className = {classes.selectCurrIcon}
                />
                    <AnimatePresence exitBeforeEnter>
                        {!switchCurr &&
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
                checked = {switchCurr}
                onChange = {switchCurrHandler}
                size = 'small'                           
            />                        
            <Stack position = 'relative'>
                <FontAwesomeIcon  
                    icon = {faIndianRupeeSign} 
                    className = {classes.selectCurrIcon}
                />
                    <AnimatePresence exitBeforeEnter>
                        {switchCurr &&
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
    )
}

export default SwitchCurrency