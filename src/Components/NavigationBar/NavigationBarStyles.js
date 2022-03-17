import { PhotoSizeSelectActualOutlined } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'

const navigationBarStyles = makeStyles({
    navbar : {
        background : 'none !important',
        height : '50px !important',
        width : '100% !important',
        position : 'absolute',
        zIndex: 11        
    },
    
    nav : {
        width : '100% !important',
    },
    
    navButton : {
        color : '#F9B826 !important',
        fontSize : '1.1rem !important',
        '&:hover' : {
            background : 'none !important',
        }
    }
})


export default navigationBarStyles
