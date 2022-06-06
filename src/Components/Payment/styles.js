import { styled, makeStyles } from "@mui/styles"
import { Fab } from '@mui/material'

export const styles = makeStyles({
    success : {
        marginTop : 30,
        fontFamily : 'Abril Fatface, cursive'
    },
    successMsg : {
        fontFamily : 'Concert One, cursive',
        fontSize : '1.4rem'
    }
})

export const CustomFab = styled(Fab)({
    marginTop : 20,
    borderRadius : 50,
    width : 270,
    height : 50,
    border : 'solid 3px #110f12', 
    backgroundColor : '#fca311', 
    fontSize : '1.1rem',
    fontFamily : 'Concert One, cursive',
    color : '#110f12',
    "&:hover" : {
        backgroundColor : '#fca311',                                 
    }
}) 