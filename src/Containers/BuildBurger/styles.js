import { makeStyles } from '@mui/styles'

export const styles = makeStyles({
    main : {
        overflow : 'hidden',
        scrollBehavior : 'smooth'
    },

    firstItem : {
        backgroundColor : '#110f12',
        position : 'relative',
        height : '100vh',
    },
    backgroundCover : {
        position : 'absolute',
        backgroundColor : '#f9b826',
        height : '100%',
        borderRadius : '0 50% 50% 0/0 100% 100% 0',
        transform : 'scaleY(1.5)'
    },
    burgerContainer : {
        position : 'absolute',
        height : '100%', 
        width : '100%', 
        overflow : 'hidden'
    },
    secondItem : {
        backgroundColor : '#110f12',
        overflow : 'hidden'
    },

    // ------ responsive --------
    '@media (max-width : 899px)' : {
        backgroundCover : {
            display : 'none'
        },
        firstItem : {
            backgroundColor : '#f9b826',
            height : '100vh'
        },
        secondItem : {
            height : '100vh',
            width : '100vw'
        }
    },
    '@media (max-height : 600px)' : {
        secondItem : {
            height : 700
        }
    },
    '@media (max-height : 565px)' : {
        firstItem : {
            height : 900
        },
        secondItem : {
            height : 700
        }
    }
})