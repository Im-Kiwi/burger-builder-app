import { useSelector } from 'react-redux'
import { Routes, Route, Outlet, Redirect } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
// ----------------- importing from other files -----------------
import Home from "../Home/Home"

const Layout = () => {
    
    const token = useSelector(state => state.userForm.currentUser.token)    

    return (
        <div>
            <Routes>
                <Route path = '/' element = {<Home />} />
                <Route path = '/logout' element = {<div>logout page</div>} />
                <Redirect path = '/logout' />    
            </Routes>
            {/* <div>Inside home</div> */}
        </div>
    )
}

export default Layout