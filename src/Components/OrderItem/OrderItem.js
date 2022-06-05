import { Grid, Typography, Chip, IconButton, useMediaQuery, ThemeProvider, Box} from '@mui/material'
import { useSelector } from 'react-redux'
import { DoneRounded } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPesoSign, faIndianRupee } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

// ----------- importing from other files -----------
import Burger from '../Burger/Burger'
import { styles } from './styles'

const OrderItem = ({ing, thisIsCart, deleteCartItemHandler, firstBreak, secondBreak, thirdBreak}) => {
    const classes = styles()
    const { pathname } = useLocation()

    const switchCurr = useSelector(state => state.switchCurr.switchCurr)

    return (
        <Grid container 
            alignItems = 'center' 
            justifyContent = 'center' 
            spacing = {6}>
            <Grid item xs = {secondBreak ? 12 : 2} display = 'flex' justifyContent = 'center'>                        
                <Burger
                    ingredients = {ing} 
                    width = {45} 
                    plateWidth = {120} 
                    cokeWidth = {60}
                    friesWidth = {60}
                    isOrder = {true}
                    moveLeft = '5%'
                    moveRight = '7%' />
            </Grid>
            <Grid item container xs = {secondBreak ? 12 : 7 }
                display = 'flex'
                justifyContent = 'center'
                sx = {{color : '#110f12'}}
                spacing ={1}>
                <Grid item container 
                    xs = {firstBreak ? thisIsCart ? 6 : 5 : 12}           
                    display = 'flex'
                    flexDirection = {thirdBreak ? 'column' : 'row'}
                    alignItems = {firstBreak ? 'flex-start' : 'center'}                    
                    spacing = {firstBreak && !thirdBreak ? 10 : 2} >
                    <Grid item xs = {2}>
                        <Typography 
                            variant = 'body1'
                            sx = {{
                                fontFamily : 'Pathway Gothic One, sans-serif', 
                                fontSize : '1.2rem'}}>
                            <strong>Ingredients:</strong> 
                        </Typography>
                    </Grid>
                    <Grid item xs = {8} 
                        display = 'flex'
                        flexDirection = {firstBreak? 'column' : 'row'}
                        alignItems = 'flex-start' 
                        gap = {1}>
                        <Chip
                            className = {classes.ingredientChip}                                     
                            label = {`${ing.Lettuce.name} ${ing.Lettuce.qty}`} 
                            size = 'small'/>
                        <Chip
                            className = {classes.ingredientChip} 
                            label = {`${ing.Cheese.name} ${ing.Cheese.qty}`} 
                            size = 'small'/>
                        <Chip
                            className = {classes.ingredientChip} 
                            label = {`${ing.Onion.name} ${ing.Onion.qty}`}
                            size = 'small'/>
                        <Chip
                            className = {classes.ingredientChip} 
                            label = {`${ing.Tomato.name} ${ing.Tomato.qty}`} 
                            size = 'small' />
                        <Chip
                            className = {classes.ingredientChip} 
                            label = {`${ing.Meat.name} ${ing.Meat.qty}`} 
                            size = 'small'/>
                        <Chip
                            className = {classes.ingredientChip} 
                            label = {`${ing.Bacon.name} ${ing.Bacon.qty}`} 
                            size = 'small'/>
                    </Grid>
                </Grid>
                <Grid item container
                    xs = {firstBreak ? thisIsCart ? 6 : 7 : 12}
                    display = 'flex'
                    flexDirection = {thirdBreak ? 'column' : 'row'}                     
                    alignItems = {firstBreak ? 'flex-start' : 'center'}
                    spacing = {firstBreak && !thirdBreak ? 6 : 2}>
                    <Grid item xs = {2}>
                        <Typography
                            variant = 'body1'
                            sx = {{fontFamily : 'Pathway Gothic One, sans-serif', fontSize : '1.2rem'}}>
                            <strong>Extras:</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs = {8}
                        display = 'flex'
                        flexDirection = {firstBreak? 'column' : 'row'}
                        alignItems = 'flex-start'
                        gap = {1}>
                        {ing.Coke.status &&
                            <Chip
                                className = {classes.extrasChip}
                                size = 'small'
                                icon = {<DoneRounded sx = {{color : '#fefae0 !important'}} />}
                                label = {`${ing.Coke.name}`}/>                    
                        }
                        {ing.FrenchFries.status &&
                            <Chip
                                className = {classes.extrasChip}
                                size = 'small' 
                                icon = {<DoneRounded sx = {{color : '#fefae0 !important'}} />}
                                label = 'French Fries'/>                    
                        }
                    </Grid>
                </Grid>
            </Grid>
            {thisIsCart &&
                <Grid item
                    xs = {secondBreak ? 3 : 1}  
                    display = 'flex' 
                    justifyContent = 'center'
                    alignItems = 'center'>
                    {!switchCurr ?
                        <FontAwesomeIcon 
                            icon = {faPesoSign}
                            style = {{fontSize : '1.5rem'}} /> :
                        <FontAwesomeIcon 
                            icon = {faIndianRupee}
                            style = {{fontSize : '1.5rem'}} />
                    }
                    <Typography 
                        variant = 'body1'
                        sx = {{
                            fontFamily : 'Comfortaa, cursive', 
                            fontSize : '1.5rem', 
                            fontWeight : 600}}>
                        {!switchCurr ? (ing.totalPrice*0.67).toFixed(0) : ing.totalPrice}
                    </Typography>
                </Grid>
            }
            {thisIsCart && 
                <Grid item
                    xs = {secondBreak ? 3 : 1}
                    component = {motion.div} 
                    whileTap = {{transform : 'translateY(5px)'}}
                    transition = {{ease : 'easeOut', duration : 0.1}}
                    display = 'flex' 
                    justifyContent = 'center'>                        
                            <IconButton
                                onClick = {() => deleteCartItemHandler(ing.id)} 
                                size = 'small'>
                                <FontAwesomeIcon 
                                    style = {{color : '#011627', fontSize : '1.2rem'}}
                                    icon = {faTrashCan} />                
                            </IconButton>
                </Grid>                    
            }
        </Grid>
    )
}

export default OrderItem