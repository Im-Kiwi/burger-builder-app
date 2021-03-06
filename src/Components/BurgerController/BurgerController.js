import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from  'react-router-dom'
import { Typography, Stack, Box, Checkbox, Button, useMediaQuery } from '@mui/material'
import { getDoc, doc, addDoc, collection } from 'firebase/firestore'
import { motion } from 'framer-motion'

// ------------ importing from files -----------------
import { styles } from './styles'
import { db } from '../../firebase-setup'
import Controls from './Controls/Controls'
import { ingredientsActions } from '../../Store/reducer/ingredients'
import { dialogActions } from '../../Store/reducer/dialog'
import { cartActions } from '../../Store/reducer/cart'
import { stepperActions } from '../../Store/reducer/stepper'
import { animationActions } from '../../Store/reducer/animation'
import { basePriceActions } from '../../Store/reducer/basePrice'
import { LettuceIco, CheeseIco, MeatIco, TomatoIco, OnionIco, BaconIco } from '../../path-to-assets/pathToImages'

const BurgerController = (props) => {
    const classes = styles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    // creating css breakpoints
    const break_900 = useMediaQuery('(min-width : 900px) and (max-width : 938px)')
    const break_550 = useMediaQuery('(max-width : 550px)')
    const break_330 = useMediaQuery('(max-width : 330px)')


    // fetching values from the redux store
    const ingredients = useSelector(state => state.ingredients) // contains the ingredients object
    const userId = useSelector(state => state.userForm.currentUser.userId) // id of the user
    const basePrice = useSelector(state => state.basePrice.basePrice) // It contains the base prices of the ingredients
    // fetching the base prices of ingredients from the database
    useEffect(() => {
        (async () => {
            const basePriceRef = doc(db, 'basePrice', 'ZvNaPbzoxkh6dwxJfzJR')
            const getBasePrice = await getDoc(basePriceRef)
            dispatch(basePriceActions.updateBasePrice({...getBasePrice.data()}))
        })();
    }, [dispatch])

    // method to add slices on the burger
    const addIngredient = (ingName) => {
        if (ingredients[ingName].qty < 3) {
            dispatch(ingredientsActions.updateIngredient({ingName : ingName, qty : 1, price : basePrice[ingName] }))
            dispatch(animationActions.updateBeginAnime(true)) // to animate slice
        }
    }

    // method to remove slices from the burger
    const removeIngredient = (ingName) => {
        if (ingredients[ingName].qty > 0) {
            dispatch(ingredientsActions.updateIngredient({ingName : ingName, qty : -1, price : -basePrice[ingName]}))
            dispatch(animationActions.updateBeginAnime(false))
        }
    }

    // method to control checkboxes
    const checkBoxHandler = (name) => {
        if (ingredients[name].status) {
            dispatch(ingredientsActions.updateAddExtras({name : name, value : false, price : -basePrice[name]}))    
        } else if (!ingredients[name].status) {
            dispatch(ingredientsActions.updateAddExtras({name : name, value : true, price : basePrice[name]}))    
        }
        dispatch(animationActions.updateBeginAnime(true)) // to not animate the slice
    }

    // it will reset the ingredients and total price
    const resetHandler = () => {
        dispatch(ingredientsActions.updateReset()) // to reset the burger slices and extra items
        dispatch(dialogActions.updateOpenModal(false)) // close the modal
    }

    // this method will navigate to the order summary page
    const buyHandler = () => {
        dispatch(dialogActions.updateOpen(true)) // to open the full screen dialog(modal)      
        dispatch(cartActions.updateCurrentItem(ingredients))      
        dispatch(cartActions.updateInstantBuy(true)) // to update the instantBuy value to true means user buying directly not adding the item to the cart
        dispatch(stepperActions.resetStepper()) // to reset the stepper
        dispatch(animationActions.updateBeginAnime(false)) // this will disable the animation on burger & other items
        navigate('/buy/delivery-address', {state : pathname})
    }

    // method to add item into cart
    const addToCartHandler = async () => {
        const cartItem = {
            ...ingredients,
            userId
        }
        await addDoc(collection(db, 'cart'), cartItem)  // will add the cart items to the database
        resetHandler()
    }

    return (
        <Stack 
            component = {motion.div}
            initial = {!props.noTransition && {x : '100vw'}}
            animate = {!props.noTransition && {x : 0}}
            exit = {!props.noTransition && {x : '100vw'}}
            transition = {!props.noTransition && {duration : 0.7, type : 'spring'}}
            className = 'h-100' 
            direction = 'column' 
            justifyContent = 'center' 
            alignItems = 'center'>            
            <Typography 
                variant = 'h6' 
                className = 'text-center mb-2'
                sx = {{color : '#f9b826', fontFamily : 'DM Serif Text, serif'}}>
                Add Ingredients
            </Typography>
            <Stack spacing = {2} alignItems = 'center'>                   
                <Controls 
                    ingredient = {ingredients.Lettuce} 
                    addIngredient = {addIngredient} 
                    removeIngredient = {removeIngredient}
                    icon = {LettuceIco} />
                <Controls 
                    ingredient = {ingredients.Cheese} 
                    addIngredient = {addIngredient} 
                    removeIngredient = {removeIngredient}
                    icon = {CheeseIco} />
                <Controls 
                    ingredient = {ingredients.Onion} 
                    addIngredient = {addIngredient} 
                    removeIngredient = {removeIngredient}
                    icon = {OnionIco} />
                <Controls 
                    ingredient = {ingredients.Tomato} 
                    addIngredient = {addIngredient} 
                    removeIngredient = {removeIngredient}
                    icon = {TomatoIco} />
                <Controls 
                    ingredient = {ingredients.Meat} 
                    addIngredient = {addIngredient} 
                    removeIngredient = {removeIngredient}
                    icon = {MeatIco} />
                <Controls 
                    ingredient = {ingredients.Bacon} 
                    addIngredient = {addIngredient} 
                    removeIngredient = {removeIngredient}
                    icon = {BaconIco} /> 
                <Box>
                    <Typography 
                        variant = 'h6' 
                        sx = {{color : '#f9b826', fontFamily : 'DM Serif Text, serif'}}>
                        Include Extras
                    </Typography>                                                             
                    <Stack direction = 'row' alignItems = 'center'>
                        <Checkbox
                            className = {classes.checkbox} 
                            disabled = {!ingredients.totalPrice && true}
                            checked = {ingredients.Coke.status} 
                            onChange = {() => checkBoxHandler(ingredients.Coke.name)} />
                        <Typography 
                            variant = 'body1'
                            className = {classes.extraText}
                            sx = {{opacity : !ingredients.totalPrice ? 0.3 : 1}}>
                            Coke
                        </Typography>                                                             
                    </Stack>               
                    <Stack direction = 'row' alignItems = 'center'>
                        <Checkbox
                            className = {classes.checkbox} 
                            checked = {ingredients.FrenchFries.status} 
                            disabled = {!ingredients.totalPrice && true}
                            onChange = {() => checkBoxHandler(ingredients.FrenchFries.name)} />
                        <Typography
                            variant = 'body1' 
                            className = {classes.extraText}
                            sx = {{opacity : !ingredients.totalPrice ? 0.3 : 1}}>
                            French Fries
                        </Typography>                     
                    </Stack>
                </Box>
                <Box 
                    className = 'mt-5' 
                    display = 'flex' 
                    flexDirection = {break_330 ? 'column' : 'row'}
                    gap = {1}>
                    <Button 
                        className = {classes.button}
                        onClick = {resetHandler} 
                        variant = 'outlined' 
                        size = {break_900 || break_550 ? 'medium' : 'large' } 
                        color = 'yellowish'>
                        Reset
                    </Button>
                    <Button 
                        className = {[classes.button, classes.disableButton].join(' ')}
                        variant = 'contained'
                        disabled = {ingredients.totalPrice === 0 ? true : false}
                        size = {break_900 || break_550 ? 'medium' : 'large' }
                        color = 'yellowish'
                        onClick = {buyHandler}>
                        Buy Now
                    </Button>
                    <Button 
                        className = {[classes.button, classes.disableButton].join(' ')}
                        variant = 'contained' 
                        disabled = {ingredients.totalPrice === 0 ? true : false}
                        size = {break_900 || break_550 ? 'medium' : 'large' }
                        color = 'yellowish'
                        onClick = {addToCartHandler}>
                        Add to Cart
                    </Button>
                </Box>
            </Stack>
        </Stack>
    )
}

export default BurgerController 