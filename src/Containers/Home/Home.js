import { Stack, Box, Grid, Paper, Container, Tabs, Tab } from '@mui/material';
import { Carousel } from 'react-bootstrap';

// ------------- importing from files -------------------
import homeStyles from './HomeStyles';
import CreateAccount from '../CreateAccount/CreateAccount';

const Home = () => {

    const classes = homeStyles();

    return (
        <Box className = {classes.main}>
            <Grid container>
                <Grid xs = {6} item className = {classes.firstItem}>
                    <Stack direction = 'column' justifyContent = 'center' className = {[classes.carouselContainer].join(' ')}>
                        {/* <Carousel>
                            <Carousel.Item>
                                Clarish Burger Shop
                            </Carousel.Item>
                            <Carousel.Item>
                                50% off on your first purchase
                            </Carousel.Item>
                        </Carousel> */}
                    </Stack>
                </Grid>
                <Grid xs = {6} item>
                    <CreateAccount />
                </Grid>
                
            </Grid>
        </Box>
    )
}

export default Home;