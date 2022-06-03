import { makeStyles } from '@mui/styles'

export const styles = makeStyles({
    checkbox : {
        '&.MuiCheckbox-root' : {
            color : '#fef9ef',
            '&.Mui-disabled' : {
                opacity : 0.3
            }
        }
    },
    extraText : {
        color : '#f9b826', 
        fontFamily : 'Comfortaa, cursive',
    },
    button : {
        borderRadius : 0, 
        fontFamily : 'DM Serif Text, serif'
    },
    disableButton : {
        '&.Mui-disabled' : {
            color : '#110f12',
            backgroundColor : '#f9b826',
            opacity : 0.4}
    }
})