import { makeStyles } from "@mui/styles";

const homeStyles = makeStyles({
    main : {
        height : '100%',        
    },
    firstItem : {
        height : '100vh',
        backgroundColor : '#110F12',
        overflowY : 'hidden !important'
    },
    headerContainer : {
        height : '100%',
        '&::before' : {
            content : '""',
            width : '100%',
            height : '100%',
            position : 'relative',
            top : 0,
            left : 0,
            backgroundColor : '#F9B826', //yellow
            borderRadius : '0 50% 50% 0/0 100% 100% 0',
            transform : 'scaleY(1.5)',
        },        
    },
    header : {
        zIndex : 10,
        position : 'absolute',
        textAlign : 'center'
    },
    secondItem : {
        backgroundColor : '#110F12'
    },

    register : {
        borderRadius : '50px !important',
        fontSize : '1.5rem !important',
        backgroundColor : '#110F12 !important',
        '&:hover' : {
            backgroundColor : '#110F12 !important',
        }
    }
})

export default homeStyles