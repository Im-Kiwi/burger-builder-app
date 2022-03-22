import { Nav, Navbar } from 'react-bootstrap'
import { Box, Container, Typography, Button, Stack } from '@mui/material'
import { ClassNames } from '@emotion/react'
import { Link, useLocation } from 'react-router-dom'

// ------ importing from files -------------
import classes from './NavigationBar.module.css'

const NavigationBar = () => {

    return (
        <Navbar fixed = 'top' className = {classes.navbar} expand = 'lg'>
            <Container maxWidth = 'xl'>
                <Stack className = 'w-100' direction = 'row' alignItems = 'center'>
                    <Navbar.Brand>
                        <Typography variant = 'h5' className = 'text-dark'>LOGO</Typography>                    
                    </Navbar.Brand>
                    <Nav className = 'w-100'>
                        <Stack className = 'w-100' direction = 'row' justifyContent = 'flex-end'>
                            <Link to = '/' className = {[classes.link, 'me-3'].join(' ')}>
                                Home
                            </Link>                        
                            <Link to = '/build-burger' className = {[classes.link, 'me-3'].join(' ')}>
                                Build
                            </Link>
                            <Link to = '/log-in' className = {classes.link}>
                                Sign In
                            </Link>                            
                        </Stack>
                    </Nav>
                </Stack>
            </Container>
        </Navbar>
    )
}

export default NavigationBar