import { styled, makeStyles } from '@mui/styles'
import { Paper, Box } from '@mui/material'
import { CenterFocusStrong } from '@mui/icons-material'

export const addressBox = makeStyles({
    main : {
        position : 'absolute',
        height : '66vh',
        overflowY : 'auto'
    },
    addressBox : {
        color : 'inherit', 
        cursor : 'pointer',
        border : 0,
        background : 'none',  
        width : '100%',
        height : '100%',  
        overflowY : 'auto'   
    },
    addressContainer : {
        backgroundColor : '#110f12',
        border : 'solid 1px #110f12',
        color : '#f9a620',
        width : 340,
        height : 200,
    },
    clickedAddress : {
        color : '#110f12',
        backgroundColor : '#f9a620',
        border : 'solid 1px #110f12'
    },
    editBox : {
        cursor : 'default',
        display : 'none',
        position : 'absolute',
        width : 200,
        height : 55,
        marginLeft : 55,
        '&::before' : {
            content : '""',
            borderRadius : 50,
            position : 'absolute',
            width : '100%',
            height : 55,
            opacity : 0.95
        }
    },

    // ------ responsive ------------
    '@media (max-width : 550px)' : {
        main : {
            height : '44vh'
        }
    }
    
})

export const CustomPaper = styled(Paper)({
    position : 'relative',
    borderRadius : 0,
    overflow : 'hidden',
    "&:hover #configAddress" : {
        display : 'block'
    }
})

export const AddAddress = styled(Box)({
    width : '100%',
    height : '100%',
    background : 'none',
    border : 0
})

