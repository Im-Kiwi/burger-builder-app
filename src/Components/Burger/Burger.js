import { useSelector } from 'react-redux'
import { Stack } from '@mui/material'
import { Image } from 'react-bootstrap'
import { v4 as uniqueId } from 'uuid'

// -------- importing from other files ----------------
import { burgerBase, burgerTop, Cheese, Coke, Lettuce, Meat, Bacon,Tomato, Sauce, Fries, Onion } from '../../path-to-assets/pathToImages'

const Burger = (props) => {

    const checkCoke = useSelector(state => state.ingredients.Coke.status)
    const checkSauce = useSelector(state => state.ingredients.Sauce.status)
    const checkFries = useSelector(state => state.ingredients.FrenchFries.status)
    
    let ingredients = {
        Lettuce : {...props.ingredients.Lettuce, img : Lettuce},
        Cheese : {...props.ingredients.Cheese, img : Cheese},
        Onion : {...props.ingredients.Onion, img : Onion},
        Tomato : {...props.ingredients.Tomato, img : Tomato},
        Meat : {...props.ingredients.Meat, img : Meat},
        Bacon : {...props.ingredients.Bacon, img : Bacon}
    }

    let allSlices = []
    for (let ing in ingredients) {
        for (let i=0; i <= ingredients[ing].qty - 1; i++) {
            allSlices.push({name : ingredients[ing].name, img : ingredients[ing].img})
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