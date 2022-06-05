import { makeStyles } from '@mui/styles'
import { Fab } from '@mui/material'

const useStyle = makeStyles({

    both : {
        zIndex : 2000,
        position : 'fixed',
        top : 20,
        paddingLeft : 15,
        paddingRight : 15,
        color : '#110f12',
        backgroundColor : '#f9b826',
        '&:hover' : {
            backgroundColor : '#f9b826'
        }
    },
    back : {
        left : '15%',
    },
    next : {
        right : '15%'
    },

    // --------- responsive ----------
    '@media (max-width : 550px)' : {
        both : {
            bottom : 15
        }
    }


})

export default useStyle