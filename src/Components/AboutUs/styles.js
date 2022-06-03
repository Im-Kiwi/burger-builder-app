import { makeStyles } from "@mui/styles"

export const styles = makeStyles({
    aboutUsContainer : {
        zIndex : 1,
        height : '100vh', 
        backgroundColor : '#f9b826',
        borderRadius : '0 50% 50% 0/0 100% 100% 0',
        width : '56.5%',
        height : '100vh',
        position : 'fixed',
        transform : 'scaleY(1.5)'
    },
    aboutUs : {
        display : 'flex',
        justifyContent : 'center',
        zIndex:10, 
        marginTop:'150px !important', 
        width : '100%',
        position : 'absolute'
    },    
    quote : {
        fontSize : '3rem',
        fontFamily : 'Passion One, cursive',
        textAlign : 'center'
    },
    horizontalLine : {
        width : '50%', 
        height : 2, 
        borderRadius : '50%', 
        marginTop : 20,
        backgroundColor : '#343a40'
    },
    introContainer : {
        marginTop : 50,
        marginBottom : 50,
        textAlign : 'center',
        backgroundColor : '#252422'
    },
    introTextContainer : {
        padding : '50px !important',
        color : '#fffcf2',
        backgroundColor : '#252422'
    },
    introHeading : {
        marginBottom : 45, 
        fontFamily : 'Anton, sans-serif', 
        fontSize : '2.5rem'
    },
    introText : {
        fontFamily : 'Poppins, sans-serif', 
        fontSize : '1.4rem',
    },
    shortSummary : {
        fontFamily : 'Anton, sans-serif', 
        fontSize : '1.7rem', 
        textAlign : 'center',
    },

    // --------- responsive ---------

    '@media (max-width : 550px)' : {
        quote : {
            fontSize : '2rem',        
        },
        introHeading : {
            fontSize : '2rem'
        },
        introText : {
            fontSize : '1.2rem'
        },
        shortSummary : {
            fontSize : '1.4rem'
        }
    }
})