import { Grid, Typography, IconButton, Container } from '@mui/material'
import { Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'

// this component contains the controls to control the addition and removal of ingredients from the burger
const Controls = (props) => {

    return (
        <Container>
            <Grid container 
                justifyContent = 'center' 
                alignItems = 'center' 
                sx = {{color : '#f9b826'}}>
                <Grid item 
                    xs = {6}  
                    display = 'flex' 
                    gap = {1}>
                    <Image src = {props.icon} fluid width = {40} />
                    <Typography 
                        sx = {{fontFamily : 'Comfortaa, cursive'}}>
                        {props.ingredient.name}
                    </Typography>
                </Grid>
                <Grid item 
                    xs = {2} 
                    display = 'flex' 
                    justifyContent= 'center'>
                    <IconButton 
                        disabled = {props.ingredient.qty === 0 && true}
                        onClick = {() => props.removeIngredient(props.ingredient.name)} 
                        sx = {{
                            color : '#fef9ef',
                            '&.Mui-disabled' : {
                                color : '#fef9ef',
                                opacity : 0.3
                            }}}>
                        <FontAwesomeIcon icon={faCircleMinus} />
                    </IconButton>
                </Grid>
                <Grid xs = {1} item>
                    <Typography 
                        className = 'text-center'
                        sx = {{color : '#fef9ef', fontFamily : 'Josefin Slab, serif'}}>
                        {props.ingredient.qty}
                    </Typography>
                </Grid>
                <Grid item
                    xs = {2}
                    display = 'flex' 
                    justifyContent = 'center'>
                    <IconButton
                        disabled = {props.ingredient.qty >= 3 ? true : false} 
                        onClick = {() => props.addIngredient(props.ingredient.name)} 
                        sx = {{
                            color : '#fef9ef',
                            '&.Mui-disabled' : {
                                opacity : 0.3,
                                color : '#fef9ef'
                            }}}>
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </IconButton>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Controls