import { Grid, Typography, IconButton } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'

const Controls = (props) => {

    return (
        <Grid container justifyContent = 'center' alignItems = 'center'>
            <Grid xs = {5} item>
                <Typography className = 'text-light'>{props.ingredient}</Typography>
            </Grid>
            <Grid xs = {1} item>
                <IconButton className = 'text-light mx-auto'>
                    <FontAwesomeIcon icon={faCircleMinus} />
                </IconButton>
            </Grid>
            <Grid xs = {1} item>
                <Typography className = 'text-light text-center'>{props.slices}</Typography>
            </Grid>
            <Grid xs = {1} item>
                <IconButton className = 'text-light mx-auto'>
                    <FontAwesomeIcon icon={faCirclePlus} />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default Controls