import { styled } from '@mui/styles'
import { Grid, Stack, Box, Chip } from '@mui/material'


export const CustomBox = styled(Box)({
    marginTop : 10, 
    marginBottom : 30, 
    borderRadius : 60, 
    height : 100,
})

export const CustomStack = styled(Stack)({
    minHeight : 100,
    maxHeight : 100,
    borderRadius : 50, 
    paddingLeft:30,
    paddingRight:30, 
    paddingTop:5,
})

export const CustomChip = styled(Chip)({
    marginLeft : 20,
    marginBottom : 10,
    borderRadius : 0,
    backgroundColor : '#621708',
    color : '#fdf0d5'
}) 