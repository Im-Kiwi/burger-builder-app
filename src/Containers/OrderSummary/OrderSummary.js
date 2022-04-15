import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Stack, Typography, List, ListItem, Table, TableCell, TableContainer, TableRow, TableHead, TableBody, Paper, ListItemText } from '@mui/material'
import { Button, Card, CardContent, Grid } from '@mui/material'
import { CheckRounded, CloseRounded } from '@mui/icons-material'
import { v4 as uniqueId } from 'uuid'


// -------------- importing from other files ------------
import Burger from '../../Components/Burger/Burger'
import { stepperActions } from '../../Store/reducer/stepper'

const OrderSummary = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const ingredients = useSelector(state => state.ingredients)
    const instantBuy = useSelector(state => state.cart.instantBuy)
    const items = useSelector(state => !instantBuy ? state.cart.cartItems : state.cart.currentItem)
    const burgerName = useSelector(state => state.ingredients.burgerName)
    const activeStep = useSelector(state => state.stepper.activeStep)

    const ingredientsKey = Object.keys(items[0]).slice(0,6) // collecting first six keys of object as first 6 keys are the ingredients with value quantity 

    const ingredientsArr = items.map(item => {
        return {
            Lettuce : item.Lettuce,
            Cheese : item.Cheese,
            Onion : item.Onion,
            Tomato : item.Tomato,
            Meat : item.Meat,
            Bacon : item.Bacon,
            Coke : item.Coke,
            Sauce : item.Sauce,
            FrenchFries : item.FrenchFries
        }
    })
    // // taking ingredients properties and pushing it into an array
    // let ingredientsArr = []

    // for (let key of ingredientsKey) {
    //     ingredientsArr.push({name : items[0][key].name, qty : items[0][key].qty})
    // }

    return (                
        <Box sx = {{mt : 5}} display = 'flex' flexDirection = 'column' alignItems = 'center'>
            {ingredientsArr.map(ing => {
                return (
                    <Card key = {uniqueId()}>
                        <Grid container>
                            <Grid item xs = {6}>
                                <Burger ingredients = {ing} width = '50px' />
                            </Grid>
                            <Grid item xs = {6}>

                            </Grid>
                        </Grid>
                    </Card>
                )
            })}
            {/* <Typography className = 'text-center mb-3' variant = 'h5'>{burgerName}</Typography>
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
                                {items[0].Coke.status ?
                                    <CheckRounded />
                                :
                                    <CloseRounded />
                                }
                                <ListItemText>Coke</ListItemText>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Stack direction = 'row' alignItems = 'center' spacing = {2}>
                                {items[0].Sauce.status ?
                                    <CheckRounded />
                                :
                                    <CloseRounded />
                                }
                                <ListItemText>Sauce</ListItemText>
                            </Stack>
                        </ListItem>
                        <ListItem>
                            <Stack direction = 'row' alignItems = 'center' spacing = {2}>
                                {items[0].FrenchFries.status ?
                                    <CheckRounded />
                                :
                                    <CloseRounded />
                                }
                                <ListItemText sx = {{whiteSpace : 'nowrap'}}>French Fries</ListItemText>
                            </Stack>
                        </ListItem>
                    </List>
                </Stack>
            </Box>             */}
        </Box>                
    )
}

export default OrderSummary
