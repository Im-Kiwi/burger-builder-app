import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Outlet, Redirect } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase-setup'

// ----------------- importing from other files -----------------
import Home from "../Home/Home"
import NavigationBar from '../../Components/NavigationBar/NavigationBar'
import BuildBurger from '../BuildBurger/BuildBurger'
import FullDialogs from '../../Components/FullDialogs/FullDialogs'
import { userFormActions } from '../../Store/reducer/userForm'

const Layout = () => {
    const dispatch = useDispatch()

    const token = useSelector(state => state.userForm.currentUser.token)  
    const openDialog = useSelector(state => state.dialog.open)
    
    // making sure user stayed logged in once it logs in
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

    return (
        <div>
            <NavigationBar />
            <Routes>
                <Route path = '/'>
                    <Route index element = {<Home />}/>
                    <Route path = 'build-burger' element = {<BuildBurger />}/>
                </Route>
            </Routes>
            <FullDialogs />
        </div>
    )
}

export default Layout