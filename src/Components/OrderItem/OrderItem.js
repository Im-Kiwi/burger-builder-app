import { Paper, Grid, Box, Typography, Divider, Stack, Chip} from '@mui/material'
import { DoneRounded, CloseRounded } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { v4 as uniqueId } from 'uuid'

// ----------- importing from other files -----------
import Burger from '../Burger/Burger'
import { CustomChip, styles } from './styles'

const OrderItem = ({ing}) => {
    const classes = styles()

    return (
        <Box>
            <Box>
                <Grid container gap = {2}>
                    <Grid item>                        
                        <Burger
                            ingredients = {ing} 
                            width = {45} 
                            plateWidth = {120} 
                            cokeWidth = {60}
                            friesWidth = {60}
                            isOrder = {true} />
                    </Grid>
                    <Grid item 
                        display = 'flex' 
                        flexDirection = 'column' 
                        sx = {{color : '#110f12'}}>
                        <Stack 
                            direction = 'row' 
                            alignItems = 'center' 
                            spacing = {2} 
                            sx = {{mb:1}}>
                            <Typography>
                                <strong>Ingredients</strong> 
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
                                <strong>Extras</strong>
                            </Typography>
                            <Chip
                                className = {classes.extrasChip}
                                size = 'small'
                                variant = 'outlined'
                                icon = {
                                    ing.Coke.status ? 
                                    <DoneRounded sx = {{color : '#333533 !important'}} /> : 
                                    <CloseRounded sx = {{color : '#333533 !important'}} />}
                                label = {`${ing.Coke.name}`}/>
                            <Chip
                                className = {classes.extrasChip}
                                size = 'small' 
                                variant = 'outlined'
                                icon = {
                                    ing.FrenchFries.status ? 
                                    <DoneRounded sx = {{color : '#333533 !important'}} /> : 
                                    <CloseRounded sx = {{color : '#333533 !important'}} />}
                                label = 'French Fries'/>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Box>        
    )
}

export default OrderItem