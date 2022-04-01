import { useSelector, useDispatch } from 'react-redux'
import { Box, Stack, Typography, List, ListItem, Table, TableCell, TableContainer, TableRow, TableHead, TableBody, Paper, ListItemText } from '@mui/material'
import { Fab } from '@mui/material'
import { CheckRounded, CloseRounded } from '@mui/icons-material'


// -------------- importing from other files ------------
import Burger from '../../Components/Burger/Burger'

const OrderSummary = (props) => {
    const dispatch = useDispatch()

    const ingredients = useSelector(state => state.ingredients)
    const burgerName = useSelector(state => state.ingredients.burgerName)

    const ingredientsKey = Object.keys(ingredients).slice(0,6) // collecting first six keys of object as first 6 keys are the ingredients with value quantity 

    // taking ingredients properties and pushing it into an array
    let ingredientsArr = []
    for (let key of ingredientsKey) {
        ingredientsArr.push({name : key, qty : ingredients[key]})
    }

    
    return (                
        <Box sx = {{mt : 5}} display = 'flex' flexDirection = 'column' alignItems = 'center'>
            <Typography className = 'text-center mb-3' variant = 'h5'>{burgerName}</Typography>
            <Stack 
                direction = 'row'  
                alignItems = 'flex-end'
            >
                <Burger width = '150px' />
            </Stack>
            <Box sx = {{mt : 5}}>            
                <Stack direction = 'row' justifyContent = 'center' alignItems = 'center' spacing = {10}>
                    <TableContainer sx = {{backgroundColor : '#f9b826', }} component={Paper}>
                        <Table size = 'small'>
                            <TableHead>
                                <TableRow sx = {{backgroundColor : '#110f12', border : 0}} >
                                    <TableCell sx = {{color : '#f9b826', border : 0}}>Ingredients</TableCell>
                                    <TableCell sx = {{color : '#f9b826', border : 0}}>Qty</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ingredientsArr.map(ing => {
                                    return (
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                                            <TableCell sx = {{color : '#110f12', border : 0}}>{ing.name}</TableCell>
                                            <TableCell sx = {{color : '#110f12', border : 0}}>{ing.qty}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <List>
                        <ListItem>
                            <Stack direction = 'row' alignItems = 'center' spacing = {2}>
                                {ingredients.Coke ?
                                    <CheckRounded />
                                :
                                    <CloseRounded />
                                }
                                <ListItemText>Coke</ListItemText>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Stack direction = 'row' alignItems = 'center' spacing = {2}>
                                {ingredients.Sauce ?
                                    <CheckRounded />
                                :
                                    <CloseRounded />
                                }
                                <ListItemText>Sauce</ListItemText>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Stack direction = 'row' alignItems = 'center' spacing = {2}>
                                {ingredients.FrenchFries ?
                                    <CheckRounded />
                                :
                                    <CloseRounded />
                                }
                                <ListItemText sx = {{whiteSpace : 'nowrap'}}>French Fries</ListItemText>
                            </Stack>
                        </ListItem>
                    </List>
                </Stack>
            </Box>
            <Fab 
                sx = {{position : 'fixed', bottom : 50, right : '15%', padding : 2}} 
                variant = 'extended' 
                size = 'small'
                onClick = {props.confirmBurgerHandler}
            >
                Confirm
            </Fab>
        </Box>                
    )
}

export default OrderSummary
