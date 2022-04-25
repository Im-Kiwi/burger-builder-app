import { useSelector } from 'react-redux'
import { Typography, Card, Grid, Box, Stack, Paper, Divider  } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { v4 as uniqueId } from 'uuid'
import { faUser, faMobileRetro, faHouse, faCity, faCheck } from '@fortawesome/free-solid-svg-icons'

// -------------- importing from other files ------------
import Burger from '../../Components/Burger/Burger'

const OrderSummary = (props) => {
    
    const instantBuy = useSelector(state => state.cart.instantBuy)
    const items = useSelector(state => !instantBuy ? state.cart.cartItems : state.cart.currentItem)
    const address = useSelector(state => state.orders.deliveryAddress)
    
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
        <Grid container sx = {{mt : 5, maxHeight : 590}} display = 'flex' justifyContent = 'center' alignItems = 'center'>
            <Grid xs = {12} md = {8} item  display = 'flex'  flexWrap = 'wrap' justifyContent = 'center' gap = {2}>
                {ingredientsArr.map(ing => {
                    return (
                            <Paper key = {uniqueId()}  sx = {{width : 300, height: 250, borderRadius : 0, backgroundColor : '#403d39'}}>                                    
                                <Grid container sx = {{width : 300, height : 250}} columnSpacing = {1}>
                                    <Grid item xs = {8} display = 'flex' alignItems = 'center' justifyContent = 'center' position = 'relative'>  
                                    <Box sx = {{                                                                                        
                                            position : 'absolute',
                                            backgroundColor : "#f9b826",
                                            width : '100%',
                                            height : 250,
                                            border : 'solid 3px #110f12',
                                            transform : 'scaleY(1.09) !important',
                                            left : 0,
                                            zIndex : 1
                                    }}></Box>
                                            <Box sx = {{zIndex : 10}}>
                                                <Burger ingredients = {ing} width = '80px' />
                                            </Box>
                                    </Grid>
                                    <Grid item 
                                        xs = {4} 
                                        display = 'flex' 
                                        flexDirection = 'column' 
                                        justifyContent = 'center' 
                                        sx = {{color : '#f9b826', fontSize : '0.8rem'}}
                                    >
                                        <Grid container display = 'flex' flexDirection = 'row'>
                                            <Grid item xs = {10}>
                                                <Typography sx = {{fontSize : '0.9rem'}}>{ing.Lettuce.name}</Typography>
                                            </Grid>
                                            <Grid item xs = {2}>
                                                <Typography sx = {{fontSize : '0.9rem'}}>{ing.Lettuce.qty}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container display = 'flex' flexDirection = 'row'>
                                            <Grid item xs = {10}>
                                                <Typography sx = {{fontSize : '0.9rem'}}>{ing.Cheese.name}</Typography>
                                            </Grid>
                                            <Grid item xs = {2}>
                                                <Typography sx = {{fontSize : '0.9rem'}}>{ing.Cheese.qty}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container display = 'flex' flexDirection = 'row'>
                                            <Grid item xs = {10}>
                                                <Typography sx = {{fontSize : '0.9rem'}}>{ing.Onion.name}</Typography>
                                            </Grid>
                                            <Grid item xs = {2}>
                                                <Typography sx = {{fontSize : '0.9rem'}}>{ing.Onion.qty}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container display = 'flex' flexDirection = 'row'>
                                            <Grid item xs = {10}>
                                                <Typography sx = {{fontSize : '0.9rem'}}>{ing.Tomato.name}</Typography>
                                            </Grid>
                                            <Grid item xs = {2}>
                                                <Typography sx = {{fontSize : '0.9rem'}}>{ing.Tomato.qty}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container display = 'flex' flexDirection = 'row'>
                                            <Grid item xs = {10}>
                                                <Typography sx = {{fontSize : '0.9rem'}}>{ing.Meat.name}</Typography>
                                            </Grid>
                                            <Grid item xs = {2}>
                                                <Typography sx = {{fontSize : '0.9rem'}}>{ing.Meat.qty}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs = {10}>
                                                <Typography sx = {{fontSize : '0.9rem'}}>{ing.Bacon.name}</Typography>
                                            </Grid>
                                            <Grid item xs = {2}>
                                                <Typography sx = {{fontSize : '0.9rem'}}>{ing.Bacon.qty}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider sx = {{mt: 1, mb:1}} />
                                        <Grid container>
                                            <Grid item xs = {3}>
                                                <FontAwesomeIcon icon = {faCheck} />
                                            </Grid>
                                            <Grid item xs = {8}>
                                                <Typography sx = {{fontSize : '0.9rem'}}>{ing.Coke.name}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container display = 'flex' flexDirection = 'row'>
                                            <Grid item xs = {3}>
                                                <FontAwesomeIcon icon = {faCheck} />
                                            </Grid>
                                            <Grid item xs = {8}>
                                                <Typography sx = {{fontSize : '0.9rem'}}>French Fries</Typography>
                                            </Grid>
                                        </Grid>                                                                                                              
                                    </Grid>
                                </Grid>
                            </Paper>
                    )
                })}
            </Grid>
            <Grid item container 
                xs = {12} md = {4} 
                className = 'text-center'  
                display = 'flex' 
                flexDirection = 'column' 
                justifyContent = 'flex-start'
            >
                <Grid item  sx = {{mb:2}}>
                    <Typography>display address</Typography>
                </Grid>
                <Grid item  display = 'flex' justifyContent = 'center' >
                    <Box 
                        sx = {{width : '60%'}} 
                        display = 'flex' 
                        flexDirection = 'column' 
                        alignItems = 'center'
                    >
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
                        <Stack 
                            direction = 'row' 
                            spacing = {2} 
                            sx = {{mt:2, width : 300}} 
                            justifyContent= 'flex-start' 
                            alignItems = 'center'
                        >
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
