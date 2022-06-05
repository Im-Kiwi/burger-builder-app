import { makeStyles } from '@mui/styles'

export const styles = makeStyles({
    container : {
        padding : 30, 
        backgroundColor : '#110f12', 
        borderRadius : '0 10px 10px 0',
        height : 300
    },
    heading : {
        color : '#f9b826',
        fontFamily : 'DM Serif Text, serif',
        textAlign : 'center'
    },
    icon : {
        fontSize : '1.3rem', 
        color : '#f9b826'
    },
    price : {
        color : '#f9b826', 
        fontFamily :  'Oswald, sans-serif',
        fontWeight : 600,
        fontSize : '1.3rem'
    },

    // ------------ responsive -----------
    '@media (max-width : 705px)' : {
        container : {
            borderRadius : '0 0 10px 10px'
        }
    }
})