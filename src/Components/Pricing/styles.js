import { styled, makeStyles } from "@mui/styles"
import { Switch } from '@mui/material'

export const styles = makeStyles({

    pricingContainer : {
        position : 'relative',
        backgroundColor : '#110f12',
        width : '100%',
    },    
    pricingBackdrop : {
        zIndex : 1,
        height : '100vh', 
        backgroundColor : '#f9b826',
        borderRadius : '0 50% 50% 0/0 100% 100% 0',
        width : '56.5%',
        height : '100vh',
        position : 'fixed',
        transform : 'scaleY(1.5)'
    },
    pricingMain : {
        zIndex : 10,
        marginTop : 140,
        position : 'absolute',
        width : '100%'
    },
    verticalLine : {
        marginLeft : 10,
        marginRight : 10,
        width : 1,
        height: 100,
        backgroundColor : '#495057'
    },
})
