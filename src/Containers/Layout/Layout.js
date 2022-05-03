import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@mui/material'
import { Routes, Route, useNavigate, useLocation } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
import { query, where, getDocs, collection, onSnapshot } from 'firebase/firestore'

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
import { cartActions } from '../../Store/reducer/cart'

// ----------- importing others ------------
import { auth, db } from '../../firebase-setup'

const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation() 
    
    const token = useSelector(state => state.userForm.currentUser.token)
    const userId = useSelector(state => state.userForm.currentUser.userId)
    const isSignUpForm = useSelector(state => state.userForm.isSignUpForm)
    const cartItems = useSelector(state => state.cart.cartItems)

    let addressesArr = []
    let itemsInCart = []
    let ordersArr = []

    const manageCartItems = (data) => {
        return {
            Lettuce : {name : 'Lettuce', qty : data.doc.data().Lettuce},
            Cheese : {name : 'Cheese', qty : data.doc.data().Cheese},
            Onion : {name : 'Onion', qty : data.doc.data().Onion},
            Tomato : {name : 'Tomato', qty : data.doc.data().Tomato},
            Meat : {name : 'Meat', qty : data.doc.data().Meat},    
            Bacon : {name : 'Bacon', qty : data.doc.data().Bacon},
            Coke : {name : 'Coke', status : data.doc.data().Coke},
            FrenchFries : {name : 'FrenchFries', status : data.doc.data().FrenchFries},
            totalPrice : data.doc.data().totalPrice,
            burgerName : data.doc.data().burgerName,
            id : data.doc.id
        }
    }
    
    // listening to addresses collection of firestore database 
    useEffect(() => {
        if (userId) {            
            const addressToListen = query(collection(db, 'addresses'), where('userId', '==', userId))
            const cartToListen = query(collection(db, 'cart'), where('userId', '==', userId))
            const ordersToListen = query(collection(db, 'orders'))

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

            onSnapshot(cartToListen, (cartItem) => {
                cartItem.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        const data = manageCartItems(change)
                        itemsInCart.push(data)
                    }
                    if (change.type === 'removed') {
                        const cartItemId = itemsInCart.findIndex(item => item.id === change.doc.id)
                        itemsInCart.splice(cartItemId, 1)
                    }
                })
                dispatch(cartActions.updateCartItems([...itemsInCart]))
            })

            onSnapshot(ordersToListen, orders => {
                orders.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        ordersArr.push({...change.doc.data()})
                    }
                })
                console.log(ordersArr)
            })

        }
    }, [userId])

    useEffect(() => {
        // this will make sure that full dialog wont close when user try to reload the page
        let cartPath = '/cart'
        let buyPath = '/buy'

        const checkCartPath = pathname.match(cartPath)
        const checkBuyPath = pathname.match(buyPath) 

        if (Boolean(checkCartPath)) {
            dispatch(dialogActions.updateOpen(true))
        } else if (checkBuyPath && localStorage.getItem('nextPath') === '/cart') {
            dispatch(dialogActions.updateOpen(true))
            navigate('/cart')
        } else if (checkBuyPath) {
            navigate('/build-burger')
            dispatch(dialogActions.updateOpen(false))
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
            dynamicElement = (
                <Home 
                    closeDialogHandler = {closeDialogHandler} 
                    priceInfo = {cartInfo.totalPrice() ? `Total Price (${cartInfo.totalCartItems} items) : $ ${cartInfo.totalPrice().toFixed(2)}` : null}
                />
            )
            break; 
        default:
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