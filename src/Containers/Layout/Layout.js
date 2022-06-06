import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from '@mui/material'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
import { query, where, collection, onSnapshot, getDocs, updateDoc, doc } from 'firebase/firestore'

// ----------------- importing other components -----------------
import Home from "../Home/Home"
import BuildBurger from '../BuildBurger/BuildBurger'
import OrderSummary from '../OrderSummary/OrderSummary'
import BuyBurger from '../BuyBurger/BuyBurger'
import DeliveryAddress from '../DeliveryAddress/DeliveryAddress'
import Payment from '../../Components/Payment/Payment'
import Cart from '../../Components/Cart/Cart'
import YourOrders from '../../Components/YourOrders/YourOrders'
import ManageAddresses from '../../Components/ManageAddresses/ManageAddresses'
import Security from '../../Components/Security/Security'
import DeleteAccount from '../../Components/DeleteAccount/DeleteAccount'
import Canvas from '../../Components/Canvas/Canvas'
import NavigationBar from '../../Components/NavigationBar/NavigationBar'
import Pricing from '../../Components/Pricing/Pricing'
import AboutUs from '../../Components/AboutUs/AboutUs'

// --------- importing redux actions ------------
import { userFormActions } from '../../Store/reducer/userForm'
import { ordersActions } from '../../Store/reducer/orders'
import { dialogActions } from '../../Store/reducer/dialog'
import { deliveryAddressActions } from '../../Store/reducer/deliveryAddress'
import { cartActions } from '../../Store/reducer/cart'

// ----------- importing others ------------
import { auth, db } from '../../firebase-setup'
import { onTheWay, delivered } from '../../identifiers/identifiers'

const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation() 
    
    const token = useSelector(state => state.userForm.currentUser.token)
    const userId = useSelector(state => state.userForm.currentUser.userId)
    const cartItems = useSelector(state => state.cart.cartItems)

    let addressesArr = [] // will store the addresses created by the authenticated user
    let itemsInCart = [] // will store cart items of the authenticated user
    let ordersArr = [] // will store orders info
    let fallBack // this will help to return to the home screen if user navigate to a wrong URL

    // listening to addresses, cart, orders collection of firestore database 
    // this will autmaticaly run when there is a change in the collections of the firebase database
    useEffect(() => {
        if (userId) {      
            // selecting the collection to listen to   
            const addressToListen = query(collection(db, 'addresses'), where('userId', '==', userId))
            const cartToListen = query(collection(db, 'cart'), where('userId', '==', userId))
            const ordersToListen = query(collection(db, 'orders'), where('userId', '==', userId))

            // listening to addresses collection, if any change happens like deletion, update, adding of doc then this below method will run
            onSnapshot(addressToListen, (address) => {
                address.docChanges().forEach((change) => {
                    if (change.type === 'added') {
                        addressesArr.push({...change.doc.data(), id : change.doc.id})
                    } 
                    if (change.type === 'removed') {
                        const addressId = addressesArr.findIndex(adr => adr.id === change.doc.id)
                        addressesArr.splice(addressId, 1)
                    } 
                    if (change.type === 'modified') {

                        const addressId = addressesArr.findIndex(adr => adr.id === change.doc.id)
                        addressesArr.splice(addressId, 1, {...change.doc.data(), id : change.doc.id})
                    }
                })
                dispatch(deliveryAddressActions.updateAddressStore(addressesArr))            
            })

            // to listen the cart collection
            onSnapshot(cartToListen, (cartItem) => {
                cartItem.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        // const data = manageCartItems(change)
                        itemsInCart.push({...change.doc.data(), id : change.doc.id})
                    }
                    if (change.type === 'removed') {
                        const cartItemId = itemsInCart.findIndex(item => item.id === change.doc.id)
                        itemsInCart.splice(cartItemId, 1)
                    }
                })
                dispatch(cartActions.updateCartItems([...itemsInCart]))
            })

            // to listen orders collection
            onSnapshot(ordersToListen, orders => {
                orders.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        // fetching order data which is not older then 1 day
                        const expiryDate = new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate() - 1).getTime()
                        const order = {...change.doc.data()}
                        if (order.orderedOn > expiryDate) {
                            ordersArr.push({...change.doc.data(), id : change.doc.id})
                        }
                    }
                    if (change.type === 'removed') {
                        const ordersArrId = ordersArr.findIndex(order => order.id === change.doc.id)
                        ordersArr.splice(ordersArrId, 1)
                    }
                    if (change.type === 'modified') {
                        const ordersArrId = ordersArr.findIndex(order => order.id === change.doc.id)
                        ordersArr.splice(ordersArrId, 1, {...change.doc.data(), id : change.doc.id})
                    }
                })
                // sorting orders according to the order place time
                const sortedOrders = [...ordersArr].sort((a,b) => b.orderedOn - a.orderedOn)
                dispatch(ordersActions.updateOrders(sortedOrders))
            })            
        }
    }, [userId])

    // this will make sure that full dialog wont close when user try to reload the page
    useEffect(() => {
        let cartPath = '/cart'
        let buyPath = '/buy'

        const checkCartPath = pathname.match(cartPath)
        const checkBuyPath = pathname.match(buyPath) 
        
        if (checkBuyPath) {
            navigate('/build-burger')
            // dispatch(dialogActions.updateOpen(false))
        } else if (checkBuyPath && localStorage.getItem('nextPath') === '/cart') {
            dispatch(dialogActions.updateOpen(true))
            navigate('/cart')
        } else if (Boolean(checkCartPath)) {
            dispatch(dialogActions.updateOpen(true))
        }
    }, [])

    // making sure user stays logs in and stays log in
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            let userDbId, userName
            (async () => {
                const q = query(collection(db, 'users'), where('userId', '==', currentUser.uid))
                const getUser = await getDocs(q)
                getUser.forEach(user => {
                    userDbId = user.id
                    userName = user.data().userName
                })
                const userData = { // data is stored in a seperate object to avoid storing non seriealizable data inside redux store
                    userName : userName,
                    email : currentUser.email,
                    token : currentUser.accessToken,
                    userId : currentUser.uid,
                    dbId : userDbId
                }            
                dispatch(userFormActions.updateCurrentUser(userData)) 
                localStorage.setItem('token', currentUser.accessToken) 
            })();
        }
    })

    // this will redirect the user to the home page if user try to visit below paths without authentication
    if (!localStorage.getItem('token') && (
        pathname === '/build-burger' || 
        pathname === '/cart' ||
        pathname === '/buy/delivery-address' ||
        pathname === '/buy/order-summary' ||
        pathname === '/buy/payment'
    )) {
        fallBack = <Navigate to = '/' />
    }

    // to close the fullscreen dialog box
    const closeDialogHandler = (flag) => {
        dispatch(dialogActions.updateOpen(false))
        dispatch(ordersActions.updateDeliveryAddress({}))
        dispatch(ordersActions.updatePaymentMethod(''))
        dispatch(ordersActions.updatePaymentSuccess(false))
        localStorage.removeItem('id')
        if (flag && token) { // if user clicked on buy now button then closing the full dialog will navigate to /build-burger
            navigate('/build-burger')
        } else { // else it will navigate the user to the page from where it opened the full dialog
            navigate(localStorage.getItem('prevPath'))
        }
        localStorage.removeItem('prevPath')        
        localStorage.removeItem('nextPath')
    }

    // calculating the total price of cart items
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

    // storing the total price of cart items in a variable
    const cartInfo = {
        totalCartItems : cartItems.length,
        totalPrice : totalPrice
    }

    let dynamicElement
    // dynamically displaying components depending upon the pathname
    // below localStorage contains the previous path from where user navigate from, this will help in rendering the component assign to 'dynamicElement'
    switch (localStorage.getItem('prevPath')) {
        case `/build-burger`:
            dynamicElement = (
                <BuildBurger 
                    title = 'My Cart' 
                    closeDialogHandler = {closeDialogHandler}
                    cartPrice = {cartInfo.totalPrice()}
                    totalItems = {cartInfo.totalCartItems}
                    priceInfo = {cartInfo.totalPrice() && `Total Price (${cartInfo.totalCartItems} items) : ${cartInfo.totalPrice().toFixed(0)}`} />
            )
            break;
        case '/':
            dynamicElement = (
                <Home                     
                    closeDialogHandler = {closeDialogHandler} 
                    cartPrice = {cartInfo.totalPrice()}
                    totalItems = {cartInfo.totalCartItems}
                    priceInfo = {cartInfo.totalPrice() && `Total Price (${cartInfo.totalCartItems} items) : ${cartInfo.totalPrice().toFixed(0)}`} />
            )
            break; 
        case '/pricing':
            dynamicElement = (
                <Pricing 
                    closeDialogHandler = {closeDialogHandler}
                    cartPrice = {cartInfo.totalPrice()}
                    totalItems = {cartInfo.totalCartItems}
                    priceInfo = {cartInfo.totalPrice() && `Total Price (${cartInfo.totalCartItems} items) : ${cartInfo.totalPrice().toFixed(0)}`} />
            )
            break;
        case '/about-us':
            dynamicElement = (
                <AboutUs
                    closeDialogHandler = {closeDialogHandler}
                    cartPrice = {cartInfo.totalPrice()}
                    totalItems = {cartInfo.totalCartItems}
                    priceInfo = {cartInfo.totalPrice() && `Total Price (${cartInfo.totalCartItems} items) : ${cartInfo.totalPrice().toFixed(0)}`}/>
            )
        default:
            break;     
    }

    return (
        <>  
            <Container maxWidth = 'xl'>
                <NavigationBar />
            </Container>
            {fallBack}
            <Routes>
                <Route path = '/' element = {<Home />} />
                <Route path = 'build-burger' 
                    element = {token ? <BuildBurger closeDialogHandler = {closeDialogHandler} /> : null} /> 
                <Route path = 'pricing' element = {<Pricing />} />   
                <Route path = 'about-us'element = {<AboutUs />} />            
                <Route 
                    path = 'buy' 
                    element = {<BuildBurger noTransition = {true} closeDialogHandler = {closeDialogHandler} />}>
                    <Route index element = {<BuyBurger />} />
                    <Route path = 'delivery-address' element = {<BuyBurger />}>
                        <Route index element = {<DeliveryAddress />} />
                    </Route>
                    <Route path = 'order-summary' element = {<BuyBurger />}>
                        <Route index element = {<OrderSummary cartPrice = {cartInfo.totalPrice()} />} />
                    </Route>
                    <Route path = 'payment' element = {<BuyBurger />}>
                        <Route index element = {<Payment />} />
                    </Route>
                </Route>
                <Route path = 'cart' element = {dynamicElement}>
                    <Route index element = {<Cart />} />
                </Route>
                <Route  path = 'your-orders' element = {dynamicElement}>
                    <Route index element = {<YourOrders />} />
                </Route>
                <Route  path = 'manage-addresses' element = {dynamicElement}>
                    <Route index element = {<ManageAddresses />} />
                </Route>
                <Route  path = 'security-settings' element = {dynamicElement}>
                    <Route index element = {<Security />} />
                </Route>
                <Route path = '*' element = {<Navigate to = '/' />} />
            </Routes>
            {/* Below two components are modals */}
            <DeleteAccount />
            <Canvas />
        </>
    )
}

export default Layout