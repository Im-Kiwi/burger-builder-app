import { useSelector } from 'react-redux'
import { Typography, Card, Grid, Box, Stack,  } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { v4 as uniqueId } from 'uuid'
import { faUser, faMobileRetro, faHouse, faCity } from '@fortawesome/free-solid-svg-icons'

// -------------- importing from other files ------------
import Burger from '../../Components/Burger/Burger'

const OrderSummary = (props) => {
    
    const instantBuy = useSelector(state => state.cart.instantBuy)
    const items = useSelector(state => !instantBuy ? state.cart.cartItems : state.cart.currentItem)
    const address = useSelector(state => state.orders.deliveryAddress)
    console.log(address)

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

    return (                
        <Grid container sx = {{mt : 5, overflowY : 'auto', maxHeight : 590}} display = 'flex' justifyContent = 'center' spacing = {2} alignItems = 'center'>
            <Grid xs = {12} item display = 'flex' container flexWrap = 'wrap' justifyContent = 'center' spacing = {1}>
                {ingredientsArr.map(ing => {
                    return (
                        <Grid item key = {uniqueId()}>
                            <Card  sx = {{p:2, width : 300, borderRadius : 0}}>
                                <Grid container alignItems = 'center'>
                                    <Grid item xs = {8} display = 'flex' justifyContent = 'center'>
                                        <Burger ingredients = {ing} width = '80px' />
                                    </Grid>
                                    <Grid item xs = {4} display = 'flex' flexDirection = 'column' justifyContent = 'center'>
                                        <Grid container display = 'flex' flexDirection = 'row'>
                                            <Grid item xs = {10}>
                                                <Typography>{ing.Lettuce.name}</Typography>
                                            </Grid>
                                            <Grid item xs = {2}>
                                                <Typography>{ing.Lettuce.qty}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container display = 'flex' flexDirection = 'row'>
                                            <Grid item xs = {10}>
                                                <Typography>{ing.Cheese.name}</Typography>
                                            </Grid>
                                            <Grid item xs = {2}>
                                                <Typography>{ing.Cheese.qty}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container display = 'flex' flexDirection = 'row'>
                                            <Grid item xs = {10}>
                                                <Typography>{ing.Onion.name}</Typography>
                                            </Grid>
                                            <Grid item xs = {2}>
                                                <Typography>{ing.Onion.qty}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container display = 'flex' flexDirection = 'row'>
                                            <Grid item xs = {10}>
                                                <Typography>{ing.Tomato.name}</Typography>
                                            </Grid>
                                            <Grid item xs = {2}>
                                                <Typography>{ing.Tomato.qty}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container display = 'flex' flexDirection = 'row'>
                                            <Grid item xs = {10}>
                                                <Typography>{ing.Meat.name}</Typography>
                                            </Grid>
                                            <Grid item xs = {2}>
                                                <Typography>{ing.Meat.qty}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container display = 'flex' flexDirection = 'row'>
                                            <Grid item xs = {10}>
                                                <Typography>{ing.Bacon.name}</Typography>
                                            </Grid>
                                            <Grid item xs = {2}>
                                                <Typography>{ing.Bacon.qty}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container display = 'flex' flexDirection = 'row'>
                                            <Grid item xs = {10}>
                                                <Typography>{ing.Bacon.name}</Typography>
                                            </Grid>
                                            <Grid item xs = {2}>
                                                <Typography>{ing.Bacon.qty}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container display = 'flex' flexDirection = 'row'>
                                            <Grid item xs = {10}>
                                                <Typography>{ing.Bacon.name}</Typography>
                                            </Grid>
                                            <Grid item xs = {2}>
                                                <Typography>{ing.Bacon.qty}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container display = 'flex' flexDirection = 'row'>
                                            <Grid item xs = {10}>
                                                <Typography>{ing.Bacon.name}</Typography>
                                            </Grid>
                                            <Grid item xs = {2}>
                                                <Typography>{ing.Bacon.qty}</Typography>
                                            </Grid>
                                        </Grid>                                                                       
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            <Grid item xs = {12} className = 'text-center' container>
                <Grid item xs = {12} sx = {{mb:2}}>
                    <Typography>display address</Typography>
                </Grid>
                <Grid item xs = {12} display = 'flex' justifyContent = 'center' >
                    <Box sx = {{width : '60%'}} display = 'flex' flexDirection = 'column' alignItems = 'center'>
                        <Stack direction = 'row' spacing = {5} justifyContent = 'flex-start' sx = {{width : 300}}>
                            <Stack direction = 'row' justifyContent= 'center' spacing = {1}  alignItems = 'center'>
                                <FontAwesomeIcon icon = {faUser} style = {{fontSize : '1.5rem', color : '#110f12'}} />
                                <Typography sx = {{color : '#110f12'}}>{address.firstName} {address.lastName}</Typography>
                            </Stack>
                            <Stack direction = 'row' spacing = {1} alignItems = 'center' >
                                <FontAwesomeIcon icon = {faMobileRetro} style = {{fontSize : '1.5rem', color : '#110f12'}} />
                                <Typography sx = {{color : '#110f12'}}>{address.phoneNumber}</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction = 'row' spacing = {2} sx = {{mt:2, width : 300}} justifyContent= 'flex-start' alignItems = 'center'>
                            <FontAwesomeIcon icon = {faHouse} style = {{fontSize : '1.5rem', color : '#110f12'}} />
                            <Typography sx = {{color : '#110f12'}}>{address.address}</Typography>
                        </Stack>
                        <Stack direction = 'row' sx = {{mt:2, width : 300}} spacing = {2}>
                            <FontAwesomeIcon icon = {faCity} style = {{fontSize : '1.5rem', color : '#110f12'}} />
                            <Typography sx = {{color : '#110f12'}}>{address.city}, {address.state}, {address.country}</Typography>
                        </Stack>
                        <Box sx = {{width : 300}} display = 'flex' justifyContent = 'flex-start'>
                            <Typography sx = {{color : '#110f12', mt:2}}><strong>zip code:</strong> {address.pinCode} </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Grid>                
    )
}

export default OrderSummary
