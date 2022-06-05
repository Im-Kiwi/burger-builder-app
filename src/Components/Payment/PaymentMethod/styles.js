import { styled, makeStyles } from "@mui/styles"
import { Radio, FormLabel } from '@mui/material'

export const styles = makeStyles({
    paymentContainer : {
        padding : 30, 
        backgroundColor : '#f9b826', 
        height : 300,
        borderRadius : '10px 0 0 10px',
        border : 'solid 2px #110f12'
    },
    formControl : {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
    },
    formLabel : {
        color : '#110f12',
        '& .MuiFormControlLabel-label' : {
            fontWeight : 400,
            fontSize : '1.2rem',
            fontFamily : 'Karla, sans-serif'                                            
        }
    },

    // -------- responsive --------------
    '@media (max-width : 705px)' : {
        paymentContainer : {
            borderRadius : '10px 10px 0 0'
        }
    }
    
})

// css style for radio button
export const CustomRadio = styled(Radio)({
    color : '#110f12',
    '&.Mui-checked' : {
        color : '#110f12'
    }
})

// css style for label of radio group
export const CustomFormLabel = styled(FormLabel)({
    color : '#110f12',
    '&.Mui-focused' : {
        color : '#110f12'
    }
})