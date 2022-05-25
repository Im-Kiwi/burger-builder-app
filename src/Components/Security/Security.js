import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Grid, List, ListItem, ListItemButton, Box, TextField, Button, Stack } from '@mui/material'
import { getAuth, updateEmail, updatePassword } from 'firebase/auth'
import { collection, getDocs, updateDoc, query, where, doc } from 'firebase/firestore'

// ------- importing from other files ----------
import { dialogActions } from '../../Store/reducer/dialog'
import Change from './Change/Change'
import LogIn from '../LogIn/LogIn'
import { securityActions } from '../../Store/reducer/security'
import { db } from '../../firebase-setup'

const Security = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = getAuth()


    const [isLogIn, setIsLogIn] = useState(false) // to control the login form 

    // fetching data from the redux store
    const showModal = useSelector(state => state.dialog.openUserProfModal)
    const newEmailOrPass = useSelector(state => state.security.newEmailOrPass)
    const confirmPass = useSelector(state => state.security.confirmPass)
    const navigationIndex = useSelector(state => state.security.navigationIndex)
    const newUserName = useSelector(state => state.security.newUserName)
    const currentUser = useSelector(state => state.userForm.currentUser)

    // to make sure when user reloads the page the modal stays open
    useEffect(() => {
        dispatch(dialogActions.updateUserProfModal(true))
    }, [])

    // to handle the click event on list item
    const clickListHandler = (index) => {
        dispatch(securityActions.updateNavigationIndex(index))
        dispatch(securityActions.updateNewEmailOrPass(''))
        dispatch(securityActions.updateConfirmPass(''))
        dispatch(securityActions.updateStartValidation(false))
    }

    // this method to handler the change in input tag
    const changeHandler = (event) => {
        if (navigationIndex === 2) {
            dispatch(securityActions.updateNewUserName(event.target.value))
        } else {
            dispatch(securityActions.updateNewEmailOrPass(event.target.value))
        }
    }

    // to close the modal
    const closeModalHandler = () => {
        navigate(localStorage.getItem('prevPath')) // navigating to the previous page from where the user came from
        dispatch(dialogActions.updateUserProfModal(false)) // this will close the modal
        localStorage.removeItem('prevPath') // removing the previous path info from local storage 
        dispatch(securityActions.updateStartValidation(false))
        dispatch(securityActions.updateNewEmailOrPass(''))
        dispatch(securityActions.updateConfirmPass(''))
    }

    const submitHandler = async (event, navIndex) => {
        dispatch(securityActions.updateStartValidation(true))
        setIsLogIn(false) 
        event.preventDefault() // to prevent default behaviour of onSubmit event
        try {
            if (newEmailOrPass.length !== 0 && navIndex === 0) { 
                await updateEmail(auth.currentUser, newEmailOrPass) // this will update the email address
                dispatch(securityActions.updateNewEmailOrPass(''))
                dispatch(securityActions.updateStartValidation(false))
            } else if (newEmailOrPass.length !== 0 && confirmPass === newEmailOrPass && navIndex === 1) { 
                await updatePassword(auth.currentUser, newEmailOrPass) // this will update the password
                dispatch(securityActions.updateNewEmailOrPass(''))
                dispatch(securityActions.updateConfirmPass(''))
                dispatch(securityActions.updateStartValidation(false))
            } else if (newUserName.length !==0 && navIndex === 2) {
                // first we need to search whether the given new userName already exist in the database
                const q = query(collection(db, 'users'), where('userName', '==', newUserName))
                const findUser =  await getDocs(q)
                let userExist = false
                
                findUser.forEach(user => {
                    if(user.data()) {
                        userExist = true
                    }
                })
                if (!userExist) { // if userName doesnt exist then we can update the userName with the new userName
                    try {
                        await updateDoc(doc(db, 'users', currentUser.dbId), { userName : newUserName})
                        dispatch(securityActions.updateNewUserName(''))
                        dispatch(securityActions.updateUserNameExist(false))
                        dispatch(securityActions.updateStartValidation(false))
                        dispatch(securityActions.updateSuccessFlag(true))
                    } catch (err) {
                        console.log('unable to update')
                        dispatch(securityActions.updateSuccessFlag(false))
                    }
                } else {
                    dispatch(securityActions.updateUserNameExist(true))
                }
            }
            
        } catch (err) {
            dispatch(securityActions.updateSuccessFlag(false))
            if (err.code === 'auth/requires-recent-login') {
                setIsLogIn(true) // this will open the login form to re authenticate user
            }
        }
    }

    // form will change depending upon the navigation of user
    // for ex: if user navigate to change email, then email form will open, where user can change their email address
    let content
    switch(navigationIndex) {
        case 0:
            content = (
                <Change 
                    width = {250}
                    type = 'text'
                    label = 'Enter your new email address'
                    value = {newEmailOrPass}
                    submitHandler = {submitHandler} 
                    changeHandler = {changeHandler} 
                    errorMsg = 'Mention Email Address'
                />
            )
            break;
        case 1:
            content = (
                <Change
                    width = {210} 
                    type = 'password'
                    label = 'Enter your new Password'
                    value = {newEmailOrPass}
                    submitHandler = {submitHandler} 
                    changeHandler = {changeHandler} 
                    errorMsg = 'Mention Password'
                />
            )
            break;
        case 2:
            content = (
                <Change 
                    width = {200}
                    type = 'text'
                    label = 'Enter your new User name'
                    value = {newUserName}
                    changeHandler = {changeHandler}
                    submitHandler = {submitHandler}
                    
                />
            )
    }

    return (
        <Modal centered size = 'lg' show = {showModal} onHide = {closeModalHandler}>
            <Grid container sx = {{height : 500, backgroundColor : '#f9b826'}}>
                <Grid item xs = {3} sx = {{backgroundColor : '#110f12'}}>
                    <List sx = {{color : '#f9b826'}}>
                        <ListItemButton 
                            selected = {navigationIndex === 0}
                            onClick = {() => clickListHandler(0)}
                        >
                            <ListItem>Change Email</ListItem>                            
                        </ListItemButton>
                        <ListItemButton 
                            selected = {navigationIndex === 1}
                            onClick = {() => clickListHandler(1)}
                        >
                            <ListItem>Change Password</ListItem>                            
                        </ListItemButton>
                        <ListItemButton 
                            selected = {navigationIndex === 2}
                            onClick = {() => clickListHandler(2)}
                        >
                            <ListItem>Change user name</ListItem>                            
                        </ListItemButton>
                    </List>
                </Grid>
                <Grid item xs = {9}>
                    {!isLogIn ? 
                        content
                    : 
                        <LogIn reAuth = {true} />
                    }
                </Grid>
            </Grid>
        </Modal>
    )
}

export default Security