import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from  'react-router-dom'
import { Grid, Typography, IconButton, Stack, Box, Checkbox, TextField, Button } from '@mui/material'
import { ThemeProvider } from '@mui/material'
import { getDoc, doc, addDoc, collection } from 'firebase/firestore'

// ------------ importing from files -----------------
import { db } from '../../firebase-setup'
import Controls from './Controls/Controls'
import { ingredientsActions } from '../../Store/reducer/ingredients'
import { userFormTheme } from '../../theme/mui-theme'
import { dialogActions } from '../../Store/reducer/dialog'
import { cartActions } from '../../Store/reducer/cart'
import { stepperActions } from '../../Store/reducer/stepper'

const BurgerController = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [basePrice, setBasePrice] = useState({}) // It contains the base prices of the ingredients

    const ingredients = useSelector(state => state.ingredients) // contains the ingredients object
    const burgerName = useSelector(state => state.ingredients.burgerName)
    const userId = useSelector(state => state.userForm.currentUser.userId)

    // fetching the base prices of ingredients from the database
    useEffect(() => {
        (async () => {
            const basePriceRef = doc(db, 'basePrice', 'ZvNaPbzoxkh6dwxJfzJR')
            const getBasePrice = await getDoc(basePriceRef)
            setBasePrice({...getBasePrice.data()})
        })();
    }, [])

    // method to add slices on the burger
    const addIngredient = (ingName) => {
        if (ingredients[ingName].qty < 3) {
            dispatch(ingredientsActions.updateIngredient({ingName : ingName, qty : 1, price : basePrice[ingName] }))
        }
    }

    // method to remove slices from the burger
    const removeIngredient = (ingName) => {
        if (ingredients[ingName].qty > 0) {
            dispatch(ingredientsActions.updateIngredient({ingName : ingName, qty : -1, price : -basePrice[ingName]}))
        }
    }

    // method to control checkboxes
    const checkBoxHandler = (name) => {
        if (ingredients[name].status) {
            dispatch(ingredientsActions.updateAddExtras({name : name, value : false}))    
        } else if (!ingredients[name].status) {
            dispatch(ingredientsActions.updateAddExtras({name : name, value : true}))    
        }
    }

    // it will reset the ingredients and total price
    const resetHandler = () => {
        dispatch(ingredientsActions.updateReset())
        dispatch(dialogActions.updateOpenModal(true))
    }

    // this method will navigate to the order summary page
    const buyHandler = () => {
        dispatch(dialogActions.updateOpen(true)) // to open the full screen dialog(modal)  
        dispatch(cartActions.updateCurrentItem(ingredients))      
        dispatch(cartActions.updateInstantBuy(true)) // to update the instantBuy value to true means user buying directly not adding the item to the cart
        dispatch(stepperActions.resetStepper()) // to reset the stepper
        console.log(pathname)
        navigate('/buy/delivery-address', {state : pathname})
    }

    // method to add item into cart
    const addToCartHandler = async () => {
        const cartItem = {
            ...ingredients,
            userId
        }
        console.log(cartItem)
        try {
            await addDoc(collection(db, 'cart'), cartItem)
            resetHandler()
        } catch (err) {
            console.log('cant add to the cart')
        }
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
                ingredient = {ingredients.Lettuce} 
                addIngredient = {addIngredient} 
                removeIngredient = {removeIngredient} />
            <Controls 
                ingredient = {ingredients.Cheese} 
                addIngredient = {addIngredient} 
                removeIngredient = {removeIngredient} />
            <Controls 
                ingredient = {ingredients.Onion} 
                addIngredient = {addIngredient} 
                removeIngredient = {removeIngredient} />
            <Controls 
                ingredient = {ingredients.Tomato} 
                addIngredient = {addIngredient} 
                removeIngredient = {removeIngredient} />
            <Controls 
                ingredient = {ingredients.Meat} 
                addIngredient = {addIngredient} 
                removeIngredient = {removeIngredient} />
            <Controls 
                ingredient = {ingredients.Bacon} 
                addIngredient = {addIngredient} 
                removeIngredient = {removeIngredient} /> 
            <Box className = 'text-light'>
                <Typography>Include Extras</Typography>                                                             
                <Stack direction = 'row' alignItems = 'center'>
                    <Checkbox 
                        checked = {ingredients.Coke.status} 
                        onChange = {() => checkBoxHandler(ingredients.Coke.name)} 
                        className = 'text-light' />
                    <Typography>Coke</Typography>                                                             
                </Stack>               
                <Stack direction = 'row' alignItems = 'center'>
                    <Checkbox 
                        checked = {ingredients.FrenchFries.status} 
                        className = 'text-light' 
                        onChange = {() => checkBoxHandler(ingredients.FrenchFries.name)} />
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
                    sx = {{borderRadius : 0, mr : 2}} 
                    variant = 'contained' 
                    size = 'large' 
                    color = 'warning'
                    onClick = {buyHandler}
                >
                    Buy Now
                </Button>
                <Button 
                    sx = {{borderRadius : 0}} 
                    variant = 'contained' 
                    size = 'large' 
                    color = 'warning'
                    onClick = {addToCartHandler}
                >
                    Add to Cart
                </Button>
            </Box>
        </Stack>
    )
}

export default BurgerController 