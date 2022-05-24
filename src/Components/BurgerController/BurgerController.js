import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from  'react-router-dom'
import { Typography, Stack, Box, Checkbox, Button } from '@mui/material'
import { getDoc, doc, addDoc, collection } from 'firebase/firestore'
import { motion } from 'framer-motion'

// ------------ importing from files -----------------
import { db } from '../../firebase-setup'
import Controls from './Controls/Controls'
import { ingredientsActions } from '../../Store/reducer/ingredients'
import { dialogActions } from '../../Store/reducer/dialog'
import { cartActions } from '../../Store/reducer/cart'
import { stepperActions } from '../../Store/reducer/stepper'
import { animationActions } from '../../Store/reducer/animation'
import { LettuceIco, CheeseIco, MeatIco, TomatoIco, OnionIco, BaconIco } from '../../path-to-assets/pathToImages'

const BurgerController = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [basePrice, setBasePrice] = useState({}) // It contains the base prices of the ingredients

    const ingredients = useSelector(state => state.ingredients) // contains the ingredients object
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
            dispatch(animationActions.updateBeginAnime(true)) // to animate slice
            dispatch(animationActions.updateAnimeAtEnd(false))
        }
    }

    // method to remove slices from the burger
    const removeIngredient = (ingName) => {
        if (ingredients[ingName].qty > 0) {
            dispatch(ingredientsActions.updateIngredient({ingName : ingName, qty : -1, price : -basePrice[ingName]}))
            dispatch(animationActions.updateBeginAnime(false))
            dispatch(animationActions.updateAnimeAtEnd(true))
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
        dispatch(ingredientsActions.updateReset())
        dispatch(dialogActions.updateOpenModal(false))
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

        try {
            await addDoc(collection(db, 'cart'), cartItem)  
            resetHandler()
        } catch (err) {
            console.log('cant add to the cart')
        }
    }


    return (
        <Stack className = 'h-100' direction = 'column' justifyContent = 'center' alignItems = 'center'>
            <motion.div
                initial = {!props.noTransition && {x : '100vw'}}
                animate = {!props.noTransition && {x : 0}}
                exit = {!props.noTransition && {x : '100vw'}}
                transition = {!props.noTransition && {duration : 0.7, type : 'spring'}}
            >
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
                        <Typography sx = {{color : '#f9b826'}}>
                            <strong>Include Extras</strong>
                        </Typography>                                                             
                        <Stack direction = 'row' alignItems = 'center'>
                            <Checkbox 
                                checked = {ingredients.Coke.status} 
                                onChange = {() => checkBoxHandler(ingredients.Coke.name)} 
                                sx = {{'&.MuiCheckbox-root' : {
                                    color : '#fef9ef'
                                }}}
                            />
                            <Typography sx = {{color : '#f9b826'}}>Coke</Typography>                                                             
                        </Stack>               
                        <Stack direction = 'row' alignItems = 'center'>
                            <Checkbox 
                                checked = {ingredients.FrenchFries.status} 
                                onChange = {() => checkBoxHandler(ingredients.FrenchFries.name)}
                                sx = {{'&.MuiCheckbox-root' : {
                                    color : '#fef9ef'
                                }}}
                            />
                            <Typography sx = {{color : '#f9b826'}}>French Fries</Typography>                                                             
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
            </motion.div>
        </Stack>
    )
}

export default BurgerController 