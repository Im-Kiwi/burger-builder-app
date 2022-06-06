import { getScopedCssBaselineUtilityClass } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const styles = makeStyles({
    main : {
        overflow : 'hidden'
    },
    firstItem : {
        height : '100vh',
        position : 'relative',
        backgroundColor : '#110f12'
    },
    backgroundCover : {
        position : 'absolute',
        backgroundColor : '#f9b826',
        height : '100%',
        borderRadius : '0 50% 50% 0/0 100% 100% 0',
        transform : 'scaleY(1.5)'
    }, 
    secondItem : {
        backgroundColor : '#110f12',
        overflow : 'hidden',
        height: '100vh'
    },
    mainTitleContainer : {
        position : 'relative',
        width : '100%',
        height : '100%',
        textAlign : 'center'
    },
    mainTitle : {
        color : '#f9b826', 
        fontFamily : 'Bebas Neue, cursive',
        fontSize : '5rem'
    },
    textContent : {
        color : '#f9b826',
        fontSize : '1.7rem',
        fontFamily : 'Amatic SC, cursive'
    },
    register : {
        marginTop : 45,
        width : 200,
        borderRadius : 50,
        fontSize : '1.5rem',
        color : '#110f12',
        fontFamily : 'Righteous, cursive',
        '&:hover' : {
            backgroundColor : '#f9b826'
        }
    },
    girlImg : {
        position : 'absolute',
        zIndex : 5,                                    
        opacity : 0.1
    },

    // ------ responsive ----------
    '@media(max-width : 899px)' : {
        firstItem : {
            backgroundColor : '#f9b826',
            width : '100vw',
            height : '100vh'
        }, 
        secondItem : {
            width : '100vw'
        },
        backgroundCover : {
            display : 'none'
        },
        main : {
            overflow : 'auto'
        },        
    }
})

