import { makeStyles } from '@mui/styles'

export const styles = makeStyles({    
    orderSummary : {
        marginTop : 45,
        overflowX : 'hidden'
    },
    pay : {
        marginRight : 20, 
        fontFamily : 'DM Serif Text, serif', 
        fontSize : '1.3rem',
        color : '#f9b826'
    },
    price : {
        fontFamily : 'Comfortaa, cursive', 
        fontWeight : 600, 
        fontSize : '1.3rem',    
        color : '#f9b826'
    },
    deliveryAddress : {
        padding : 10, 
        backgroundColor : '#110f12', 
        borderRadius : 2,
        textAlign : 'center'
    },
    currencyIcon : {
        fontSize : '1.3rem', 
        color : '#f9b826'
    },
    addressHeading : {
        color : '#f9b826', 
        fontFamily : 'DM Serif Text, serif',
        textAlign : 'center'
    },
    addressText : {
        fontFamily : 'BIZ UDMincho, serif', 
        fontSize : '1.2rem'
    },
    zipCodeText : {
        fontFamily : 'BIZ UDMincho, serif', 
        fontSize : '1.2rem'
    },

    // ---------- responsive -------

    '@media (max-width : 331px)' : {
        orderSummary : {
            width : '105%'
        }
    }
})