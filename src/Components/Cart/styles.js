import { styled } from '@mui/styles'
import { Grid, Paper, Stack } from '@mui/material'


export const CustomPaper = styled(Paper)({
    marginTop : 10, 
    marginBottom : 30, 
    borderRadius : 60, 
    height : 100,
    backgroundColor: '#110f12'
})

export const CustomGrid = styled(Grid)({
    position : 'relative', 
    borderRadius: 50, 
    width : 'inherit', 
    height: 'inherit'
})

export const CustomStack = styled(Stack)({
    minHeight : 100,
    maxHeight : 100,
    backgroundColor : '#f9b826',
    borderRadius : 50, 
    border : 'solid 2px #805b10',
    paddingLeft:30,
    paddingRight:30, 
    paddingTop:5,
    paddingBottom:8,
    transform : 'scale(1.15,1.15)',
    overflow: 'hidden'
})