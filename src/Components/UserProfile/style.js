import { styled } from '@mui/styles'
import { MenuItem } from '@mui/material'

export const CustomMenuItem = styled(MenuItem)({
    backgroundColor : '#f9b826',
    '&:hover' : {
        backgroundColor : '#110f12',
        color : '#f9b826'
    }
})