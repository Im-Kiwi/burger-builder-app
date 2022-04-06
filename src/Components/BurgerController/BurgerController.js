import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Grid, Typography, IconButton, Stack, Box, Checkbox, TextField, Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { ThemeProvider } from '@mui/material'

// ------------ importing from files -----------------
import Controls from './Controls/Controls'
import { ingredientsActions } from '../../Store/reducer/ingredients'
import * as global from '../../identifiers/identifiers'
import { userFormTheme } from '../../theme/mui-theme'
import { dialogActions } from '../../Store/reducer/dialog'

const PRICE = {
    Lettuce : 0.20,
    Meat : 1.20,
    Cheese : 0.40,
    Bacon : 0.70,
    Tomato : 0.30,
    Onion : 0.30,
    coke : 0.7,
    fries : 1
}

const BurgerController = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const ingredientsQty = useSelector(state => state.ingredients) // contains the ingredients object
    const openDialog = useSelector(state => state.dialog.open)
    const burgerName = useSelector(state => state.ingredients.burgerName)

    // method to add slices on the burger
    const addIngredient = (ingName) => {
        if (ingredientsQty[ingName] < 5) {
            dispatch(ingredientsActions.updateIngredient({ingName : ingName, qty : 1, price : PRICE[ingName] }))
        }
    }

    // method to remove slices from the burger
    const removeIngredient = (ingName) => {
        if (ingredientsQty[ingName] > 0) {
            dispatch(ingredientsActions.updateIngredient({ingName : ingName, qty : -1, price : -PRICE[ingName]}))
        }
    }

    // method to control checkboxes
    const checkBoxHandler = (name) => {
        if (ingredientsQty[name]) {
            dispatch(ingredientsActions.updateAddExtras({name : name, value : false}))    
        } else if (!ingredientsQty[name]) {
            dispatch(ingredientsActions.updateAddExtras({name : name, value : true}))    
        }
    }

    // it will reset the ingredients, total price
    const resetHandler = () => {
        dispatch(ingredientsActions.updateReset())
    }

    // this method will navigate to the order summary page
    const toOrderSummary = () => {
        dispatch(dialogActions.updateOpen(true))        
        navigate('/build-burger/buy/order-summary')
    }


    return (
        <Stack className = 'h-100' direction = 'column' justifyContent = 'center' alignItems = 'center' spacing = {2}>
            <ThemeProvider theme = {userFormTheme}>
                <TextField 
                    variant = 'filled' 
                    size = 'small' 
                    label = 'Name your burger'
                    value = {burgerName}
                    onChange = {(event) => dispatch(ingredientsActions.updateBurgerName(event.target.value))}
                />
            </ThemeProvider>
            <Controls 
                qty = {ingredientsQty} 
                ingredient = {global.lettuce} 
                addIngredient = {addIngredient} 
                removeIngredient = {removeIngredient} />
            <Controls 
                qty = {ingredientsQty} 
                ingredient = {global.cheese} 
                addIngredient = {addIngredient} 
                removeIngredient = {removeIngredient} />
            <Controls 
                qty = {ingredientsQty} 
                ingredient = {global.onion} 
                addIngredient = {addIngredient} 
                removeIngredient = {removeIngredient} />
            <Controls 
                qty = {ingredientsQty} 
                ingredient = {global.tomato} 
                addIngredient = {addIngredient} 
                removeIngredient = {removeIngredient} />
            <Controls 
                qty = {ingredientsQty} 
                ingredient = {global.meat} 
                addIngredient = {addIngredient} 
                removeIngredient = {removeIngredient} />
            <Controls 
                qty = {ingredientsQty} 
                ingredient = {global.bacon} 
                addIngredient = {addIngredient} 
                removeIngredient = {removeIngredient} /> 
            <Box className = 'text-light'>
                <Typography>Include Extras</Typography>                                                             
                <Stack direction = 'row' alignItems = 'center'>
                    <Checkbox 
                        checked = {ingredientsQty.Coke} 
                        onChange = {() => checkBoxHandler(global.coke)} 
                        className = 'text-light' />
                    <Typography>Coke</Typography>                                                             
                </Stack>
                <Stack direction = 'row' alignItems = 'center'>
                    <Checkbox 
                        checked = {ingredientsQty.Sauce} 
                        className = 'text-light' 
                        onChange = {() => checkBoxHandler(global.sauce)} />
                    <Typography>Sauce</Typography>                                                             
                </Stack>
                <Stack direction = 'row' alignItems = 'center'>
                    <Checkbox 
                        checked = {ingredientsQty.FrenchFries} 
                        className = 'text-light' 
                        onChange = {() => checkBoxHandler(global.frenchFries)} />
                    <Typography>French Fries</Typography>                                                             
                </Stack>
            </Box>
            <Box className = 'mt-5'>
                <Button 
                    onClick = {resetHandler} 
                    sx = {{borderRadius : 0, mr : 2}} 
                    variant = 'outlined' 
                    size = 'large' 
                    color = 'warning'
                >
                    Reset
                </Button>
                <Button 
                    sx = {{borderRadius : 0}} 
                    variant = 'contained' 
                    size = 'large' 
                    color = 'warning'
                    onClick = {toOrderSummary}
                >
                    Buy
                </Button>
            </Box>
        </Stack>
    )
}

export default BurgerController 