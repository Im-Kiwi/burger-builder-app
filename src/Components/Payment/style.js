import { styled } from "@mui/styles"
import { Radio, FormLabel } from '@mui/material'

// css style for radio button
export const CustomRadio = styled(Radio)({
    color : '#f9b826',
    '&.Mui-checked' : {
        color : '#f9b826'
    }
})

// css style for label of radio group
export const CustomFormLabel = styled(FormLabel)({
    color : '#f9b826',
    '&.Mui-focused' : {
        color : '#f9b826'
    }
})