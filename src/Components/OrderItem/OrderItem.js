import { Paper, Grid, Box, Typography, Divider, Stack, Chip, IconButton} from '@mui/material'
import { DoneRounded, CloseRounded } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

// ----------- importing from other files -----------
import Burger from '../Burger/Burger'
import { styles } from './styles'

const OrderItem = ({ing, thisIsCart, deleteCartItemHandler}) => {
    const classes = styles()

    return (
        <Grid container alignItems = 'center'>
            <Grid item xs = {2} display = 'flex' justifyContent = 'center'>                        
                <Burger
                    ingredients = {ing} 
                    width = {45} 
                    plateWidth = {120} 
                    cokeWidth = {60}
                    friesWidth = {60}
                    isOrder = {true} />
            </Grid>
            <Grid item xs = {7}
                display = 'flex' 
                flexDirection = 'column' 
                sx = {{color : '#110f12'}}>
                <Stack 
                    direction = 'row' 
                    alignItems = 'center' 
                    spacing = {2} 
                    sx = {{mb:1}}>
                    <Typography>
                        <strong>Ingredients:</strong> 
                    </Typography>
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
                </Stack>
                <Stack direction = 'row' spacing = {2}>
                    <Typography>
                        <strong>Extras:</strong>
                    </Typography>
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
                </Stack>
            </Grid>
            {thisIsCart &&
                <Grid xs = {1} item display = 'flex' justifyContent = 'center'>
                    {thisIsCart &&
                        <Typography 
                            variant = 'body1'
                            sx = {{
                                fontFamily : 'Comfortaa, cursive', 
                                fontSize : '1.5rem', 
                                fontWeight : 600}}>
                            ${ing.totalPrice}
                        </Typography>
                    }
                </Grid>
            }
            {thisIsCart && 
                <Grid xs = {1} item display = 'flex' justifyContent = 'center'>
                        <motion.div
                            whileTap = {{transform : 'translateY(5px)'}}
                            transition = {{ease : 'easeOut', duration : 0.1}}>
                            <IconButton
                                onClick = {() => deleteCartItemHandler(ing.id)} 
                                size = 'small'>
                                <FontAwesomeIcon 
                                    style = {{color : '#011627', fontSize : '1.2rem'}}
                                    icon = {faTrashCan} />                
                            </IconButton>
                        </motion.div>
                </Grid>                    
            }
        </Grid>
    )
}

export default OrderItem