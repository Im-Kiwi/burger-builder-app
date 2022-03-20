import { Grid, Typography, IconButton, Stack, Box, Checkbox } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

// ------------ importing from files -----------------
import Controls from './Controls/Controls'

const BurgerController = () => {

    return (
        <Stack className = 'h-100' direction = 'column' justifyContent = 'center' alignItems = 'center' spacing = {2}>
            <Controls ingredient = 'Lettuce' slices = {0} />
            <Controls ingredient = 'Cheese' slices = {0} />
            <Controls ingredient = 'Meat' slices = {0} />
            <Controls ingredient = 'Tomato' slices = {0} />
            <Controls ingredient = 'Bacon' slices = {0} /> 
            <Box className = 'text-light'>
                <Typography>Include Extras</Typography>                                                             
                <Stack direction = 'row' alignItems = 'center'>
                    <Checkbox className = 'text-light' />
                    <Typography>Coke</Typography>                                                             
                </Stack>
                <Stack direction = 'row' alignItems = 'center'>
                    <Checkbox className = 'text-light' />
                    <Typography>Sauce</Typography>                                                             
                </Stack>
                <Stack direction = 'row' alignItems = 'center'>
                    <Checkbox className = 'text-light' />
                    <Typography>French Fries</Typography>                                                             
                </Stack>
            </Box>
        </Stack>
    )
}

export default BurgerController 