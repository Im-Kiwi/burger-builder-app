import { useSelector } from 'react-redux'
import { Stack } from '@mui/material'
import { Image } from 'react-bootstrap'
import { v4 as uniqueId } from 'uuid'

// -------- importing from other files ----------------
import { burgerBase, burgerTop, Cheese, Coke, Lettuce, Meat, Bacon,Tomato, Sauce, Fries, Onion } from '../../path-to-assets/pathToImages'
import * as global from '../../identifiers/identifiers'

const Burger = (props) => {

    const ingredientsQty = useSelector(state => state.ingredients)
    const checkCoke = useSelector(state => state.ingredients.Coke)
    const checkSauce = useSelector(state => state.ingredients.Sauce)
    const checkFries = useSelector(state => state.ingredients.FrenchFries)
    
    const keyIngredient = Object.keys(ingredientsQty).slice(0,6) // collecting first six keys of object as first 6 keys are the ingredients with value quantity 

    let slicesArr = [] 
    // by using the keys of ingredientsQty, object is pushed inside slicesArr 
    // each object consist the info of each slices like name, qty and image of that slice
    for (let ing of keyIngredient) {
        let img
        switch (ing) { // switch statement is used to dynamically assign image to the specific slice
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
            case global.onion:
                img = Onion
                break;
            default:
                img = null
        }
        slicesArr.push({name : ing, qty : ingredientsQty[ing], img : img})
    }

    // here all slices are shown depending upon the quantity
    let allSlices = []
    for (let slice of slicesArr) {
        if (slice.qty) {
            for (let i=0; i<slice.qty; i++) {
                allSlices.push(slice)
            }
        }
    }

    return (
        <>
            {checkCoke ?
                <Image fluid src = {Coke} alt = 'Coke' width = {props.width} />                
            : null
            }                
            <Stack direction = 'column'>
                <Image src = {burgerTop} width = {props.width}/>
                {allSlices.map((slice) => {                           
                    return (
                        <Image                        
                            key = {uniqueId()}
                            src = {slice.img} 
                            alt = {`${slice.name} slice`} 
                            width = {props.width}
                            />
                    )
                    })
                }
                <Image src = {burgerBase} width = {props.width} />
            </Stack>
            {checkSauce ?
                <Image fluid src = {Sauce} alt = 'Sauce' width = {props.width} />
            : null
            }
            {checkFries ? 
                <Image fluid src = {Fries} alt = 'French Fries' width = {props.width}  />
            : null
            }        
        </>
    )
}

export default Burger