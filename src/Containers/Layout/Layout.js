import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@mui/material'
import { Routes, Route, Outlet, Redirect, useNavigate, useLocation } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase-setup'

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

const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const token = useSelector(state => state.userForm.currentUser.token)  
    const openDialog = useSelector(state => state.dialog.open)
    const isSignUpForm = useSelector(state => state.userForm.isSignUpForm)

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
        if (flag) {
            navigate('/build-burger')
        } else {
            navigate('/')
        }
    }

    return (
        <div>
            <NavigationBar />
            <Routes>
                <Route path = '/'>
                    <Route index element = {<Home />}/>
                    <Route path = 'build-burger' element = {<BuildBurger />}/>
                    <Route path = 'order-summary' element = {<BuildBurger />} />
                    
                </Route>
            </Routes>
            {pathname === '/order-summary' || pathname === '/delivery-address' ? 
                <FullDialogs isOrderSummary = {true} closeDialogHandler = {closeDialogHandler}>
                    <BuyBurger />
                </FullDialogs>
            : null
            }
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