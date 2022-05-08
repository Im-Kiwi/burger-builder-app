import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Grid, List, ListItem, ListItemButton, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { v4 as uniqueId } from 'uuid'

// ----------- importing from other files --------------
import { dialogActions } from '../../Store/reducer/dialog'
import OrderItem from '../OrderItem/OrderItem'

const YourOrders = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [selectListItem, setSelectListItem] = useState(0)

    const orders = useSelector(state => state.orders.orders)
    const showModal = useSelector(state => state.dialog.openUserProfModal)

    useEffect(() => {
        dispatch(dialogActions.updateUserProfModal(true))
    }, [])

    
    // method to close modal
    const closeModalHandler = () => {
        navigate(localStorage.getItem('prevPath')) // it will navigate to the previous path from where user came from before opening the 'Your orders' modal
        dispatch(dialogActions.updateUserProfModal(false)) // to close the modal
        localStorage.removeItem('prevPath') // removing the previous path info from local storage
    }
    
    // method to navigate between 'Recent orders' and 'Orders history'
    // and it will also select the list item ('Recent Orders' and 'Orders History')
    const selectListItemHandler = (index) => {
        setSelectListItem(index)
    }

    // filtering the order by recent order and order history
    const filteringOrders = (recent) => {
        const prevDay = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()

        return orders.filter(order => {
            if (recent && order.orderedOn > prevDay) {
                return order
            } else if (!recent && order.orderedOn < prevDay) {
                return order
            }
            return
        })     
    }

    const recentOrders = filteringOrders(true)
    const orderHistory = filteringOrders(false)

    const ordersDisplayMethod = (ordersToDisplay) => {
        return ordersToDisplay.map(order => {
            const ordersKeys = Object.keys(order)
            const filterKeys = ordersKeys.filter((_, index) => index < ordersKeys.length - 3)
        
            return (
                <Accordion key = {uniqueId()} sx = {{mb : 1, p:1, position : 'relative', backgroundColor : '#110f12'}}>
                    <AccordionSummary sx = {{color : '#f9b826'}} expandIcon = {<ExpandMore sx = {{color : '#f9b826'}} />}>
                        {new Date(order.orderedOn).getDate()}/{new Date(order.orderedOn).getMonth()}/{new Date(order.orderedOn).getFullYear()}
                    </AccordionSummary>
                    <AccordionDetails sx = {{backgroundColor : '#f9b826', p:2}}>
                        <Grid container spacing = {2}>
                            {filterKeys.map(objKey => {
                                return (
                                    <Grid key = {uniqueId()} item>
                                        <OrderItem ing = {order[objKey]} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            )
        })
    }
    
    const displayRecentOrders = ordersDisplayMethod(recentOrders)
    const displayingOrderHistory = ordersDisplayMethod(orderHistory)


    return (
        <Modal size = 'xl' centered show = {showModal} onHide = {closeModalHandler}>
            <Box sx = {{width : 'inherit', height : 700, backgroundColor : '#f9b826'}}>
                <Grid container sx = {{height : 'inherit'}}>
                    <Grid item xs = {3} sx = {{backgroundColor : '#110f12'}}>
                            <List >
                                <ListItemButton 
                                    selected = {selectListItem === 0}                                    
                                    onClick = {() => selectListItemHandler(0)}
                                >
                                    <ListItem sx = {{color : '#f9b826'}}>
                                        Recent Orders
                                    </ListItem>
                                </ListItemButton>                                    
                                <ListItemButton 
                                    selected = {selectListItem === 1}
                                    onClick = {() => selectListItemHandler(1)}
                                >
                                    <ListItem sx = {{color : '#f9b826'}}>                                    
                                        Order History
                                    </ListItem>
                                </ListItemButton>
                            </List>
                    </Grid>
                    <Grid item xs = {9} sx = {{p:1, overflowY : 'auto', height : 'inherit'}}>
                        {selectListItem === 0 ?
                            <Box>
                                {displayRecentOrders}
                            </Box>
                        :
                            <Box>{displayingOrderHistory}</Box>
                        }
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default YourOrders