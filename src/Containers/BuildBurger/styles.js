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
        overflow : 'hidden'
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
            height : '100vh'
        }
    }
})