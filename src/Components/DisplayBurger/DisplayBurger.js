import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Stack, Box, Typography } from '@mui/material'
import { Image } from 'react-bootstrap'

// ------------importing from other files---------
import { burgerBase, burgerTop, Cheese, Coke, Lettuce, Meat, Bacon,Tomato } from '../../path-to-assets/pathToImages'
import classes from './DisplayBurger.module.css'
import Slice from './Slice/Slice'
import * as global from '../../identifiers/identifiers'

const DisplayBurger = () => {

    const ingredientsQty = useSelector(state => state.ingredients)
    const keyIngredient = Object.keys(ingredientsQty).slice(0,5)
    console.log(keyIngredient)

    let slicesArr = [] 

    for (let ing of keyIngredient) {
        let img
        switch (ing) {
            case global.lettuce:
                img = Lettuce
                break;
            case global.cheese:
                img = Cheese
                break;
            case global.meat:
                img = Meat
                break;
            case global.bacon:
                img = Bacon
                break;
            case global.tomato:
                img = Tomato
                break;
            default:
                img = null
        }
        slicesArr.push({name : ing, qty : ingredientsQty[ing], img : img})
    }

    console.log(slicesArr)

    return (
        <Stack 
            direction = 'row' 
            position = 'absolute' 
            className = {['text-center h-100'].join(' ')}
            alignItems = 'center'
        >
            <Stack direction = 'column' className = {classes.burger} justifyContent = 'center'>
                    <Image fluid src = {burgerTop} width = '250px'/>
                    {slicesArr.map(slice => {
                        return [...Array(slice.qty)].map(() => {
                            
                            return <Image src = {slice.img} alt = {`${slice.name} slice`} />
                        })
                    })}
                    
                    <Image className = {classes.burgerBase} fluid src = {burgerBase} width = '250px'/>
                    <Image className = {[classes.coke].join(' ')} fluid src = {Coke} width = '250px' />
            </Stack>
        </Stack>
    )
}

export default DisplayBurger