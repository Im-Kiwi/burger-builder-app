import { makeStyles } from '@mui/styles'
import { Fab } from '@mui/material'

const useStyle = makeStyles({

    both : {
        position : 'fixed',
        paddingLeft : 15,
        paddingRight : 15,
        bottom : 50,
        color : '#f9b826',
        backgroundColor : '#110f12',
        '&:hover' : {
            backgroundColor : '#110f12'
        }
    },
    back : {
        left : '15%',
    },
    next : {
        right : '15%'
    }


})

export default useStyle