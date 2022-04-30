import { styled, makeStyles } from '@mui/styles'
import { Paper } from '@mui/material'
import { NoEncryption } from '@mui/icons-material'


export const addressBox = makeStyles({
    addressBox : {
        color : 'inherit', 
        cursor : 'pointer',
        border : 0,
        background : 'none'       
    },

    addressContainer : {
        padding : 10,
        backgroundColor : '#110f12',
        border : 'solid 1px #f9b826',
        color : '#f9b826',
        width : 340,
        height : 200, 
    },

    clickedAddress : {
        color : '#110f12',
        backgroundColor : '#f9b826' 
    },

    editBox : {
        display : 'none',
        cursor : 'default',
        position : 'absolute',
        bottom :  0,
        left : 0,
        width : '100%',
        height : 60,
        gap : 20,
        '&::before' : {
            content : '""',
            position : 'absolute',
            width : '100%',
            height : 60,
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