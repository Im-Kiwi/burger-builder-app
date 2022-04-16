import { styled, makeStyles } from '@mui/styles'
import { Paper } from '@mui/material'


export const CustomPaper = styled(Paper)({
    padding : 20,
    backgroundColor : '#110f12',
    cursor : 'pointer',
    border : 'solid 1px #f9b826',
    color : '#f9b826',

    '&:hover' :{
        transform : 'scale(1.01, 1.01)',        
    },
    // '&:focus' : {
    //     color : '#110f12',
    //     backgroundColor : '#f9b826'        
    // }

})

export const addressBox = makeStyles({
    addressBox : {
        color : 'inherit',        
    },

    addressContainer : {
        padding : 20,
        backgroundColor : '#110f12',
        cursor : 'pointer',
        border : 'solid 1px #f9b826',
        color : '#f9b826',
    },

    clickedAddress : {
        color : '#110f12',
        backgroundColor : '#f9b826' 
    }
})