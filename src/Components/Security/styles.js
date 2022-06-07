import { makeStyles } from '@mui/styles'

export const styles = makeStyles({
    closeButton : {
        position : 'absolute', 
        right : -15, 
        top : -20, 
        zIndex : 10,
        backgroundColor : '#ffb600',
        '&:hover' : {
            backgroundColor : '#ffb600'
        }
    }
})