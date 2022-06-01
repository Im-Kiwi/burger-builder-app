import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Stack, Box } from '@mui/material'
import { Image } from 'react-bootstrap'
import { v4 as uniqueId } from 'uuid'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { TransitionGroup } from 'react-transition-group'

// -------- importing from other files ----------------
import { burgerBase, burgerTop, Cheese, Coke, Lettuce, Meat, Bacon, Tomato, Fries, Onion, Plate } from '../../path-to-assets/pathToImages'
import { animationActions } from '../../Store/reducer/animation'

const Burger = (props) => {
    const dispatch = useDispatch()

    const checkCoke = props.ingredients.Coke.status
    const checkFries = props.ingredients.FrenchFries.status
    
    // this value will make sure that slices, coke and fries only animates when controlled by the user
    // thus it will prevent the unnecessary animation when whole components gets unmounted
    const beginAnime = useSelector(state => state.animation.beginAnime)
    
    // creating object which containes ingredients of the burger
    let ingredients = {
        Lettuce : {...props.ingredients.Lettuce, img : Lettuce},
        Cheese : {...props.ingredients.Cheese, img : Cheese},
        Onion : {...props.ingredients.Onion, img : Onion},
        Tomato : {...props.ingredients.Tomato, img : Tomato},
        Meat : {...props.ingredients.Meat, img : Meat},
        Bacon : {...props.ingredients.Bacon, img : Bacon}
    }

    // now spreading the ingredients on the array
    // also making sure that it also contains repetitive ingredients depending upon the quantity of each ingredients
    let allSlices = []
    for (let ing in ingredients) {
        for (let i=0; i <= ingredients[ing].qty - 1; i++) {
            allSlices.push({name : ingredients[ing].name, img : ingredients[ing].img, id : `${ingredients[ing].name}_${i}`})
        }
    }
    
    return (
        <Stack>
            <Stack 
                direction = 'row' 
                justifyContent = 'center' 
                alignItems = 'flex-end'
                sx = {{position : 'relative'}}
            > 
                <AnimatePresence>
                    {checkCoke &&
                        <motion.div 
                            layout
                            initial = {{x: beginAnime ? -150 : 0, opacity : 0}}
                            animate = {{x: 0, opacity : 1}}
                            exit = {{x: -150, opacity : 0}}
                            transition = {{type : 'spring', stiffness : 110}}
                            style ={{zIndex : 10, position : 'absolute', left : props.isOrder ? '5%' :'16%'}}>
                            <Image 
                                fluid 
                                src = {Coke} 
                                alt = 'Coke' 
                                width = {props.cokeWidth} />                
                        </motion.div>
                    }
                </AnimatePresence>
                <Stack 
                    direction = 'column' 
                    alignItems = 'center' 
                    sx = {{zIndex : 11}}>   
                    <LayoutGroup>
                        <motion.div layout>
                            <Image src = {burgerTop} width = {props.width} style = {{transform : 'scale(1.2, 1.2)'}} />
                        </motion.div>
                        <Stack>
                            <AnimatePresence>
                                {allSlices.map(({name, img, id}) => {                         
                                    return ( 
                                        <motion.img
                                            layout
                                            key = {id}  
                                            style = {{width : props.width}}
                                            initial = {{scale : beginAnime ? 0 : 1.2}}
                                            animate = {{scale : 1.2}}  
                                            exit = {{scale : 0}}
                                            src = {img} 
                                            alt = {`${name} slice`} 
                                        />
                                    )
                                })}
                            </AnimatePresence>
                        </Stack>
                        <Image src = {burgerBase} width = {props.width} style ={{transform : 'scale(1.2, 1.2)'}} />
                    </LayoutGroup>
                </Stack>                
                <AnimatePresence>
                    {checkFries &&
                        <motion.div 
                            style = {{zIndex : 9, position : 'absolute', right : props.isOrder ? '7%' : '16%'}}
                            initial = {{x: beginAnime ? 150 : 0, opacity : 0}}
                            animate = {{x: 0, opacity : 1}}
                            exit = {{x: 150, opacity : 0}}
                            transition = {{type : 'spring', stiffness : 110}}
                        >
                            <Image 
                                fluid 
                                src = {Fries} 
                                alt = 'French Fries' 
                                width = {props.friesWidth} 
                            />
                        </motion.div>
                    }        
                </AnimatePresence>                    
            </Stack>
            <Image 
                style = {{position : 'relative', bottom : 1}} 
                src = {Plate} 
                width = {props.plateWidth} 
                alt = 'plate'
            />
        </Stack>
    )
}

export default React.memo(Burger)