import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Stack, Typography, List, ListItem, Table, TableCell, TableContainer, TableRow, TableHead, TableBody, Paper, ListItemText } from '@mui/material'
import { Button } from '@mui/material'
import { CheckRounded, CloseRounded } from '@mui/icons-material'
import { v4 as uniqueKey } from 'uuid'


// -------------- importing from other files ------------
import Burger from '../../Components/Burger/Burger'
import { stepperActions } from '../../Store/reducer/stepper'

const OrderSummary = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const ingredients = useSelector(state => state.ingredients)
    const burgerName = useSelector(state => state.ingredients.burgerName)
    const activeStep = useSelector(state => state.stepper.activeStep)

    const ingredientsKey = Object.keys(ingredients).slice(0,6) // collecting first six keys of object as first 6 keys are the ingredients with value quantity 

    // taking ingredients properties and pushing it into an array
    let ingredientsArr = []

    for (let key of ingredientsKey) {
        ingredientsArr.push({name : ingredients[key].name, qty : ingredients[key].qty})
    }

    const confirmBurgerHandler = () => {
        navigate('/build-burger/buy/delivery-address')
        
        if (activeStep >= 2) {
            dispatch(stepperActions.updateActiveStep(1))            
        }
    }
    
    return (                
        <Box sx = {{mt : 5}} display = 'flex' flexDirection = 'column' alignItems = 'center'>
            <Typography className = 'text-center mb-3' variant = 'h5'>{burgerName}</Typography>
            <Stack 
                direction = 'row'  
                alignItems = 'flex-end'
            >
                <Burger ingredients = {ingredients} width = '50px' />
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
                                        <TableRow key = {uniqueKey()} sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
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
                                {ingredients.Coke.status ?
                                    <CheckRounded />
                                :
                                    <CloseRounded />
                                }
                                <ListItemText>Coke</ListItemText>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Stack direction = 'row' alignItems = 'center' spacing = {2}>
                                {ingredients.Sauce.status ?
                                    <CheckRounded />
                                :
                                    <CloseRounded />
                                }
                                <ListItemText>Sauce</ListItemText>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Stack direction = 'row' alignItems = 'center' spacing = {2}>
                                {ingredients.FrenchFries.status ?
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
        </Box>                
    )
}

export default OrderSummary
