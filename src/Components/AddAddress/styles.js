import { styled } from '@mui/styles'
import { Button } from '@mui/material'

export const CustomButton = styled(Button)({
    borderRadius : 0,
    backgroundColor : '#f9b826',
    color : '#110f12',
    '&:hover' : {
        backgroundColor : '#f9b826'
    }
})