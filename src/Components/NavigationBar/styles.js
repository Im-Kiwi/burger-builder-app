import { makeStyles } from '@mui/styles'

export const styles = makeStyles({
    navbar : {
        background: 'none',
        position: 'absolute',
        top: 0,
        left:0,
        zIndex: 11,
        width: '100%'
    },
    navButton : {
        '&:hover' : {
            background : 'none'
        }
    },
    logo : {
        position : 'absolute',
        top : 0,
        background : 'none',
        border : 'none'
    },
    logoTitle : {
        textAlign : 'center', 
        position : 'relative', 
        top : 4, 
        color : '#110f12',
        fontWeight : 600,
        fontFamily : 'Yuji Mai, serif'
    },
    linkContainer : {
        position : 'relative',
        right : 0
    },
    link : {
        color: '#f9b826',
        fontSize: '1.5rem !important',
        textDecoration: 'none !important',
        fontFamily : 'Pathway Gothic One, sans-serif',
        '&:hover' : {
            color : 'inherit'
        }
    },
    signIn : {
        backgroundColor : 'inherit',
        color: 'inherit',
        borderRadius: 0,
        fontSize: '1rem',
        fontFamily : 'Righteous, cursive',
        '&:hover' : {
            backgroundColor : 'inherit'
        }
    },    
})

// to give transition effect to the horizontal line while hovering over nav links
export const hoverAnime = {
    initial : {
        width : 0,
    },
    homeHover : {
        width : 43,
        transition : {
            duration : 0.2,
            type : 'tween'
        }
    },
    buildHover : {
        width : 37,
        transition : {
            duration : 0.2,
            type : 'tween'
        }
    },
    pricingHover : {
        width : 51,
        transition : {
            duration : 0.2,
            type : 'tween'
        }
    },
    aboutUsHover : {
        width : 64,
        transition : {
            duration : 0.2,
            type : 'tween'
        }
    }     
}