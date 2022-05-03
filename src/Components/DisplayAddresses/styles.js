import { styled, makeStyles } from '@mui/styles'
import { Paper, Box } from '@mui/material'
import { CenterFocusStrong } from '@mui/icons-material'


export const addressBox = makeStyles({
    addressBox : {
        color : 'inherit', 
        cursor : 'pointer',
        border : 0,
        background : 'none',  
        width : '100%',
        height : '100%'     
    },

    addressContainer : {
        padding : 10,
        backgroundColor : '#110f12',
        color : '#f9b826',
        width : 340,
        height : 200, 
    },

    clickedAddress : {
        color : '#110f12',
        backgroundColor : '#f9b826' 
    },

    editBox : {
        cursor : 'default',
        display : 'none',
        position : 'absolute',
        width : 200,
        bottom : 10,
        left : 70,
        height : 55,
        '&::before' : {
            content : '""',
            borderRadius : 50,
            position : 'absolute',
            width : '100%',
            height : 55,
            backgroundColor : '#110f12',
            opacity : 0.95
        }
    },

})

export const CustomPaper = styled(Paper)({
    position : 'relative',
    borderRadius : 0,
    "&:hover #configAddress" : {
        display : 'block'
    }
})

export const AddAddress = styled(Box)({
    width : '100%',
    height : '100%',
    background : 'none',
    border : 0
})