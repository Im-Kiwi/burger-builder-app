import { Paper, Grid, Box, Typography, Divider} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { v4 as uniqueId } from 'uuid'

// ----------- importing from other files -----------
import Burger from '../Burger/Burger'

const OrderItem = ({ing}) => {

    return (
        <Paper sx = {{width : 300, height: 250, borderRadius : 0, backgroundColor : '#403d39'}}>                                    
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
                    <Grid 
                        container 
                        display = 'flex' 
                        flexDirection = 'row'
                    >
                        <Grid item xs = {10}>
                            <Typography sx = {{fontSize : '0.9rem'}}>
                                {ing.Lettuce.name}
                            </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                            <Typography sx = {{fontSize : '0.9rem'}}>
                                {ing.Lettuce.qty}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid 
                        container 
                        display = 'flex' 
                        flexDirection = 'row'
                    >
                        <Grid item xs = {10}>
                            <Typography sx = {{fontSize : '0.9rem'}}>
                                {ing.Cheese.name}
                            </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                            <Typography sx = {{fontSize : '0.9rem'}}>
                                {ing.Cheese.qty}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid 
                        container 
                        display = 'flex' 
                        flexDirection = 'row'
                    >
                        <Grid item xs = {10}>
                            <Typography sx = {{fontSize : '0.9rem'}}>
                                {ing.Onion.name}
                            </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                            <Typography sx = {{fontSize : '0.9rem'}}>
                                {ing.Onion.qty}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid 
                        container 
                        display = 'flex' 
                        flexDirection = 'row'
                    >
                        <Grid item xs = {10}>
                            <Typography sx = {{fontSize : '0.9rem'}}>
                                {ing.Tomato.name}
                            </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                            <Typography sx = {{fontSize : '0.9rem'}}>
                                {ing.Tomato.qty}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid 
                        container 
                        display = 'flex' 
                        flexDirection = 'row'
                    >
                        <Grid item xs = {10}>
                            <Typography sx = {{fontSize : '0.9rem'}}>
                                {ing.Meat.name}
                            </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                            <Typography sx = {{fontSize : '0.9rem'}}>
                                {ing.Meat.qty}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs = {10}>
                            <Typography sx = {{fontSize : '0.9rem'}}>
                                {ing.Bacon.name}
                            </Typography>
                        </Grid>
                        <Grid item xs = {2}>
                            <Typography sx = {{fontSize : '0.9rem'}}>
                                {ing.Bacon.qty}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx = {{mt: 1, mb:1}} />
                    <Grid container>
                        <Grid item xs = {3}>
                            <FontAwesomeIcon icon = {faCheck} />
                        </Grid>
                        <Grid item xs = {8}>
                            <Typography sx = {{fontSize : '0.9rem'}}>
                                {ing.Coke.name}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container display = 'flex' flexDirection = 'row'>
                        <Grid item xs = {3}>
                            <FontAwesomeIcon icon = {faCheck} />
                        </Grid>
                        <Grid item xs = {8}>
                            <Typography sx = {{fontSize : '0.9rem'}}>
                                French Fries
                            </Typography>
                        </Grid>
                    </Grid>                                                                                                              
                </Grid>
            </Grid>
        </Paper>
    )
}

export default OrderItem