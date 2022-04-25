import { styled, makeStyles } from '@mui/styles'
import { Paper } from '@mui/material'


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
        width : 340,
        height : 200
    },

    clickedAddress : {
        color : '#110f12',
        backgroundColor : '#f9b826' 
    }
})