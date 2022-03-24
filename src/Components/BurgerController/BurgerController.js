import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography, IconButton, Stack, Box, Checkbox } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

// ------------ importing from files -----------------
import Controls from './Controls/Controls'
import { ingredientsActions } from '../../Store/reducer/ingredients'
import * as global from '../../identifiers/identifiers'

const BurgerController = () => {
    const dispatch = useDispatch()

    const ingredientsQty = useSelector(state => state.ingredients) // contains the ingredients object

    // method to add slices on the burger
    const addIngredient = (ingName) => {
        if (ingredientsQty[ingName] < 5) {
            dispatch(ingredientsActions.updateIngredient({ingName : ingName, qty : 1 }))
        }
    }

    // method to remove slices from the burger
    const removeIngredient = (ingName) => {
        if (ingredientsQty[ingName] > 0) {
            dispatch(ingredientsActions.updateIngredient({ingName : ingName, qty : -1}))
        }
    }

    const checkBoxHandler = (name) => {
        if (ingredientsQty[name]) {
            dispatch(ingredientsActions.updateAddExtras({name : name, value : false}))    
        } else if (!ingredientsQty[name]) {
            dispatch(ingredientsActions.updateAddExtras({name : name, value : true}))    
        }
    }

    return (
        <Stack className = 'h-100' direction = 'column' justifyContent = 'center' alignItems = 'center' spacing = {2}>
            <Controls qty = {ingredientsQty} ingredient = {global.lettuce} addIngredient = {addIngredient} removeIngredient = {removeIngredient} />
            <Controls qty = {ingredientsQty} ingredient = {global.cheese} addIngredient = {addIngredient} removeIngredient = {removeIngredient} />
            <Controls qty = {ingredientsQty} ingredient = {global.meat} addIngredient = {addIngredient} removeIngredient = {removeIngredient} />
            <Controls qty = {ingredientsQty} ingredient = {global.tomato} addIngredient = {addIngredient} removeIngredient = {removeIngredient} />
            <Controls qty = {ingredientsQty} ingredient = {global.bacon} addIngredient = {addIngredient} removeIngredient = {removeIngredient} /> 
            <Box className = 'text-light'>
                <Typography>Include Extras</Typography>                                                             
                <Stack direction = 'row' alignItems = 'center'>
                    <Checkbox onChange = {() => checkBoxHandler(global.coke)} className = 'text-light' />
                    <Typography>Coke</Typography>                                                             
                </Stack>
                <Stack direction = 'row' alignItems = 'center'>
                    <Checkbox className = 'text-light' onChange = {() => checkBoxHandler(global.sauce)} />
                    <Typography>Sauce</Typography>                                                             
                </Stack>
                <Stack direction = 'row' alignItems = 'center'>
                    <Checkbox className = 'text-light' onChange = {() => checkBoxHandler(global.frenchFries)} />
                    <Typography>French Fries</Typography>                                                             
                </Stack>
            </Box>
        </Stack>
    )
}

export default BurgerController 