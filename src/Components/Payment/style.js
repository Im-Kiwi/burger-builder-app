import { styled } from "@mui/styles"
import { Radio, FormLabel, Fab } from '@mui/material'

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

export const CustomFab = styled(Fab)({
    marginTop : 20,
    borderRadius : 50,
    border : 'solid 3px #110f12', 
    backgroundColor : '#fca311', 
    fontSize : '1.1rem',
    fontFamily : 'Concert One, cursive',
    color : '#110f12',
    "&:hover" : {
        backgroundColor : '#fca311',                                 
    }
}) 