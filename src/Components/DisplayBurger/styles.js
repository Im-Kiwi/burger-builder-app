import { makeStyles, styled } from "@mui/styles";
import { Switch } from '@mui/material'


export const styles = makeStyles({
    currencyIcon : {
        color : '#110f12',
        fontSize : '1.3rem'
    },
    selectCurrIcon : {
        fontSize : '1.2rem', 
        color : '#110f12',
        opacity : 0.7
    },
    underline : {
        position : 'absolute',
        width : 10, 
        height : 2, 
        borderRadius : 10, 
        backgroundColor : 'black',
        bottom : -5,
        opacity : 0.5        
    }    
})

export const CustomSwitch = styled(Switch)({
    '& .MuiSwitch-switchBase' : {
        color : '#3d405b',
        '&.Mui-checked' : {
            color : '#197278',
            '& + .MuiSwitch-track' : {
                backgroundColor : '#197278',
                opacity : 0.7
            }
        },
    },
    '& .MuiSwitch-thumb' : {
        color : '#3d405b'
    },                                
    '& .MuiSwitch-track' : {
        backgroundColor : '#197278',
        opacity : 0.7
    }
})