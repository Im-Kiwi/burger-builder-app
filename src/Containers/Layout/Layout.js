import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@mui/material'
import { Routes, Route, Outlet, Redirect, useNavigate, useLocation } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebase-setup'
import { query, where, getDocs, collection, doc, getDoc } from 'firebase/firestore'

// ----------------- importing from other files -----------------
import Home from "../Home/Home"
import NavigationBar from '../../Components/NavigationBar/NavigationBar'
import BuildBurger from '../BuildBurger/BuildBurger'
import FullDialogs from '../../Components/FullDialogs/FullDialogs'
import { userFormActions } from '../../Store/reducer/userForm'
import OrderSummary from '../OrderSummary/OrderSummary'
import SignUp from '../../Components/SignUp/SignUp'
import LogIn from '../../Components/LogIn/LogIn'
import { dialogActions } from '../../Store/reducer/dialog'
import BuyBurger from '../BuyBurger/BuyBurger'
import DeliveryAddress from '../../Components/DeliveryAddress/DeliveryAddress'
import Payment from '../../Components/Payment/Payment'
import Cart from '../../Components/Cart/Cart'
import { cartActions } from '../../Store/reducer/cart'
import { basePriceActions } from '../../Store/reducer/basePrice'

const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const token = useSelector(state => state.userForm.currentUser.token)
    const userId = useSelector(state => state.userForm.currentUser.userId)
    const openDialog = useSelector(state => state.dialog.open)
    const isSignUpForm = useSelector(state => state.userForm.isSignUpForm)
    const cartItems = useSelector(state => state.cart.cartItems)

    // making sure user stays logged in once it logs in
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            const userData = { // data is stored in a seperate object to avoid storing non seriealizable data inside redux store
                email : currentUser.email,
                token : currentUser.accessToken,
                userId : currentUser.uid
            }            
            dispatch(userFormActions.updateCurrentUser(userData))  
        }
    })

    // to close the fullscreen dialog box
    const closeDialogHandler = (flag) => {
        dispatch(dialogActions.updateOpen(false))
        if (flag && token) {
            navigate(`/build-burger`)
        } else {
            navigate(pathname)
        }
    }

    return (
        <div>
            <Routes>
                <Route path = '/' element = {<Home />} /> 
                <Route path = 'build-burger' element = {token ? <BuildBurger closeDialogHandler = {closeDialogHandler} /> : null}>
                    <Route path = 'buy' element = {<BuyBurger />}>
                        <Route path = 'delivery-address' element = {<DeliveryAddress />} />
                        <Route path = 'order-summary' element = {<OrderSummary />} />
                        <Route path = 'payment' element = {<Payment />} />
                    </Route>
                </Route>
                <Route path = 'cart' element = {<BuildBurger closeDialogHandler = {closeDialogHandler}/>}>
                    <Route index element = {<Cart />} />
                    <Route path = 'buy' element = {<BuyBurger />}>
                        <Route path = 'delivery-address' element = {<DeliveryAddress />} />
                        <Route path = 'order-summary' element = {<OrderSummary />} />
                        <Route path = 'payment' element = {<Payment />} />
                    </Route>
                </Route>
            </Routes>

            {pathname === '/' ?
                <FullDialogs closeDialogHandler = {closeDialogHandler}>
                    <Box sx = {{mt:10}}>
                        {isSignUpForm ? 
                            <SignUp />
                        :
                            <LogIn />   
                        }
                    </Box>
                </FullDialogs>
            : null
            }
        </div>
    )
}

export default Layout