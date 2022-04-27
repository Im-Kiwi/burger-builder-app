import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@mui/material'
import { Routes, Route, useNavigate, useLocation } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
import { query, where, getDocs, collection } from 'firebase/firestore'

// ----------------- importing other components -----------------
import Home from "../Home/Home"
import BuildBurger from '../BuildBurger/BuildBurger'
import FullDialogs from '../../Components/FullDialogs/FullDialogs'
import OrderSummary from '../OrderSummary/OrderSummary'
import SignUp from '../../Components/SignUp/SignUp'
import LogIn from '../../Components/LogIn/LogIn'
import BuyBurger from '../BuyBurger/BuyBurger'
import DeliveryAddress from '../../Components/DeliveryAddress/DeliveryAddress'
import Payment from '../../Components/Payment/Payment'
import Cart from '../../Components/Cart/Cart'

// --------- importing redux actions ------------
import { userFormActions } from '../../Store/reducer/userForm'
import { ordersActions } from '../../Store/reducer/orders'
import { dialogActions } from '../../Store/reducer/dialog'
import { deliveryAddressActions } from '../../Store/reducer/deliveryAddress'

// ----------- importing others ------------
import { auth, db } from '../../firebase-setup'

const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname, state } = useLocation() // here the state will store the path from where the user opened full dialog component
    
    const token = useSelector(state => state.userForm.currentUser.token)
    const userId = useSelector(state => state.userForm.currentUser.userId)
    const isSignUpForm = useSelector(state => state.userForm.isSignUpForm)
    const cartItems = useSelector(state => state.cart.cartItems)

    useEffect(() => {
        // fetching addresses from the database
        (async () => {
            try {
                const findAddresses = query(collection(db, 'addresses'), where('userId', '==', userId))

                const getAddresses = await getDocs(findAddresses)
                let AddressesArr = []
                
                getAddresses.forEach(doc => {
                    AddressesArr.push(doc.data())
                })
                dispatch(deliveryAddressActions.updateAddressStore(AddressesArr))
            } catch (err) {
                console.log('unable to fetch data')
            }
        })();

    }, [userId])

    useEffect(() => {
        // this will make sure that full dialog wont close when user try to reload the page
        let cartPath = '/cart'
        let buyPath = '/buy'

        const checkCartPath = pathname.match(cartPath)
        const checkBuyPath = pathname.match(buyPath)    
        
        if (Boolean(checkCartPath) || Boolean(checkBuyPath)) {
            dispatch(dialogActions.updateOpen(true))
        }        
    }, [])

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
        dispatch(ordersActions.updateDeliveryAddress({}))
        localStorage.removeItem('id')
        if (flag && token) { // if user clicked on buy now button then closing the full dialog will navigate to /build-burger
            navigate('/build-burger')
        } else { // else it will navigate the user to the page from where it opened the full dialog
            navigate(state)        
        }
    }

    const totalPrice = () => {
        const priceArr = cartItems.map(item => {
            return item.totalPrice
        })

        if (cartItems.length !== 0) {
            return priceArr.reduce((total, price) => total + price)
        } else {
            return 0
        }
    }

    const cartInfo = {
        totalCartItems : cartItems.length,
        totalPrice : totalPrice
    }

    let dynamicElement

    // dynamically displaying components depending upon the pathname
    // below 'state' contains the previous path from where user navigate from, this will help in rendering the component assign to 'dynamicElement'
    switch (state) {
        case '/build-burger':
            dynamicElement = (
                <BuildBurger 
                    title = 'My Cart' 
                    priceInfo = {cartInfo.totalPrice() ? `Total Price (${cartInfo.totalCartItems} items) : $ ${cartInfo.totalPrice().toFixed(2)}` : null} 
                    closeDialogHandler = {closeDialogHandler}
                />
            )
            break;
        case '/':
            dynamicElement = <Home closeDialogHandler = {closeDialogHandler} />
            break;        
    }

    return (
        <div>
            <Routes>
                <Route path = '/' element = {<Home />} /> 
                <Route path = 'build-burger' element = {token ? <BuildBurger closeDialogHandler = {closeDialogHandler} /> : null} />
                <Route path = 'buy' element = {<BuildBurger closeDialogHandler = {closeDialogHandler} />}>
                    <Route index element = {<BuyBurger />} />
                    <Route path = 'delivery-address' element = {<BuyBurger />}>
                        <Route index element = {<DeliveryAddress />} />
                    </Route>
                    <Route path = 'order-summary' element = {<BuyBurger />}>
                        <Route index element = {<OrderSummary />} />
                    </Route>
                    <Route path = 'payment' element = {<BuyBurger />}>
                        <Route index element = {<Payment />} />
                    </Route>
                </Route>
                <Route path = 'cart' element = {dynamicElement}>
                    <Route index element = {<Cart />} />
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