import { makeStyles } from '@mui/styles'

export const styles = makeStyles({
    header : {
        backgroundColor : '#110f12', 
        color : '#f9b826'
    },
    dotShadow : {
        position : 'absolute',
        width : 10, 
        height : 10, 
        borderRadius : '50%', 
        filter : 'blur(4px)'
    },
    dot : {
        width : 9, 
        height : 9, 
        borderRadius : '50%', 
        zIndex : 10
    },
    closeButton : {
        position : 'absolute', 
        right : -15, 
        top : -20, 
        zIndex : 10,
        backgroundColor : '#ffb600',
        '&:hover' : {
            backgroundColor : '#ffb600'
        }
    },
    orders : {
        width : 'inherit', 
        height : 700, 
        backgroundColor : '#f9b826',
        padding : '15px 0 15px 0',
        overflowY: 'auto',
        position : 'relative',
    }
})