import { Nav, Navbar } from 'react-bootstrap'
import { Box, Container, Typography, Button, Stack } from '@mui/material'
import { ClassNames } from '@emotion/react'

// ------ importing from files -------------
import navigationBarStyles from './NavigationBarStyles'


const NavigationBar = () => {

    const classes = navigationBarStyles()
    
    return (
        <Box>
            <Navbar className = {classes.navbar}>
                <Navbar.Brand>
                    <Container>
                        <Typography variant = 'h5'>LOGO</Typography>                    
                    </Container>
                </Navbar.Brand>
                <Nav className = {classes.nav}>
                    <Container>
                        <Stack direction = 'row' justifyContent = 'flex-end'>
                            <Button className = {[classes.navButton, 'me-4'].join(' ')} disableRipple>Home</Button>
                            <Button className = {[classes.navButton, 'me-4'].join(' ')} disableRipple>BUILD</Button>
                            <Button className = {classes.navButton} disableRipple>Sign In</Button>
                        </Stack>
                    </Container>
                </Nav>
            </Navbar>
        </Box>
    )
}

export default NavigationBar