import { makeStyles } from '@mui/styles'

export const styles = makeStyles({
    closeButton : {
        position : 'absolute', 
        left : 10, 
        top : 10
    },
    link : {
        color: 'inherit',
        fontSize: '2rem !important',
        textDecoration: 'none !important',
        fontFamily : 'Pathway Gothic One, sans-serif',
        '&:hover' : {
            color : 'inherit'
        }
    },
    navButton : {
        '&:hover' : {
            background : 'none'
        }
    }
})