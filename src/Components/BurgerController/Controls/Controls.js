import { Grid, Typography, IconButton, Container } from '@mui/material'
import { AddCircleRounded } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'

// this component contains the controls to control the addition and removal of ingredients from the burger
const Controls = (props) => {


    return (
        <Container>
            <Grid container justifyContent = 'center' alignItems = 'center'>
                <Grid xs = {6} item>
                    <Typography className = 'text-light'>{props.ingredient.name}</Typography>
                </Grid>
                <Grid display = 'flex' justifyContent= 'center' xs = {2} item>
                    <IconButton className = 'text-light' onClick = {() => props.removeIngredient(props.ingredient.name)}>
                        <FontAwesomeIcon icon={faCircleMinus} />
                    </IconButton>
                </Grid>
                <Grid xs = {1} item>
                    <Typography className = 'text-light text-center'>{props.ingredient.qty}</Typography>
                </Grid>
                <Grid display = 'flex' justifyContent = 'center' xs = {2} item>
                    <IconButton onClick = {() => props.addIngredient(props.ingredient.name)} className = 'text-light'>
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </IconButton>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Controls