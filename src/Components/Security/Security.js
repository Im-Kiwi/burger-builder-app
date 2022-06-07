import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Grid, List, ListItem, ListItemButton, FormControl, Select, useMediaQuery, MenuItem } from '@mui/material'
import { getAuth, updateEmail, updatePassword } from 'firebase/auth'
import { collection, getDocs, updateDoc, query, where, doc } from 'firebase/firestore'

// ------- importing from other files ----------
import { dialogActions } from '../../Store/reducer/dialog'
import Change from './Change/Change'
import LogIn from '../LogIn/LogIn'
import { securityActions } from '../../Store/reducer/security'
import { db } from '../../firebase-setup'
import { userFormActions } from '../../Store/reducer/userForm'

const Security = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = getAuth()

    // creating css breakpoints
    const break_991 = useMediaQuery('(max-width : 991px)')

    const [isLogIn, setIsLogIn] = useState(false) // to enable/disable the login form

    // fetching data from the redux store
    const showModal = useSelector(state => state.dialog.openUserProfModal) // this contains value to open/close modal
    const newEmailOrPass = useSelector(state => state.security.newEmailOrPass) // new email or pass mentioned by the user
    const confirmPass = useSelector(state => state.security.confirmPass) // confirm pass to confirm the new pass
    const navigationIndex = useSelector(state => state.security.navigationIndex) // navigation id 
    const newUserName = useSelector(state => state.security.newUserName) // new user name mentioned by the user
    const currentUser = useSelector(state => state.userForm.currentUser) // contains info or current authenticated user
    const successFlag = useSelector(state => state.security.successFlag) // whether request is success or not

    // to make sure when user reloads the page the modal stays open
    useEffect(() => {
        dispatch(dialogActions.updateUserProfModal(true))
    }, [])

    // to handle the click event on list item and also handle the change event in select tag
    const clickListHandler = (index) => {
        dispatch(securityActions.updateNavigationIndex(index)) // to update the navigation index when user navigate from one to another
        dispatch(securityActions.updateNewEmailOrPass('')) // reset the input tag
        dispatch(securityActions.updateConfirmPass('')) // to reset the confirm pass input tag
        dispatch(securityActions.updateStartValidation(false)) // reset the validation process
        dispatch(securityActions.updateSuccessFlag(false)) // to close the success message under log in form
        dispatch(userFormActions.updateErrorFlag(false)) // setting the error flag to false which will remove the error msg in login form
        setIsLogIn(false) // to close the re-login form
    }

    // to control select element
    const selectHandler = (event) => {
        dispatch(securityActions.updateNavigationIndex(event.target.value))
        dispatch(securityActions.updateNewEmailOrPass(''))
        dispatch(securityActions.updateConfirmPass(''))
        dispatch(securityActions.updateStartValidation(false))
        dispatch(securityActions.updateSuccessFlag(false))
        dispatch(userFormActions.updateErrorFlag(false))
        setIsLogIn(false)
    }

    // this method to handler the change in input tag
    const changeHandler = (event) => {
        dispatch(securityActions.updateSuccessFlag(false))
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
        dispatch(securityActions.updateSuccessFlag(false))
        dispatch(userFormActions.updateErrorFlag(false)) 
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
                    title = 'Change your Email address'
                    width = {250}
                    type = 'text'
                    label = 'Enter your new email address'
                    value = {newEmailOrPass}
                    submitHandler = {submitHandler} 
                    changeHandler = {changeHandler} 
                    errorMsg = 'Mention Email Address'
                    successMsg = 'Your email changed successfully'
                />
            )
            break;
        case 1:
            content = (
                <Change
                    title = 'Change your password'
                    width = {210} 
                    type = 'password'
                    label = 'Enter your new Password'
                    value = {newEmailOrPass}
                    submitHandler = {submitHandler} 
                    changeHandler = {changeHandler} 
                    errorMsg = 'Mention Password'
                    successMsg = 'Your password changed successfully'
                />
            )
            break;
        case 2:
            content = (
                <Change 
                    title = 'Change your user name'
                    width = {220}
                    type = 'text'
                    label = 'Enter your new User name'
                    value = {newUserName}
                    changeHandler = {changeHandler}
                    submitHandler = {submitHandler}
                    successMsg = 'Your user name changed successfully'
                />
            )
    }

    return (
        <Modal centered size = 'lg' show = {showModal} onHide = {closeModalHandler}>
            <Grid container sx = {{height : 500, backgroundColor : '#f9b826'}}>
                {!break_991 &&
                    <Grid item xs = {3} sx = {{backgroundColor : '#110f12'}}>
                        <List sx = {{color : '#f9b826', fontSize : '1.2rem', fontFamily : 'Pathway Gothic One, sans-serif'}}>
                            <ListItemButton 
                                selected = {navigationIndex === 0}
                                onClick = {() => clickListHandler(0)}>
                                <ListItem>Change Email</ListItem>                            
                            </ListItemButton>
                            <ListItemButton 
                                selected = {navigationIndex === 1}
                                onClick = {() => clickListHandler(1)}>
                                <ListItem>Change Password</ListItem>                            
                            </ListItemButton>
                            <ListItemButton 
                                selected = {navigationIndex === 2}
                                onClick = {() => clickListHandler(2)}>
                                <ListItem>Change user name</ListItem>                            
                            </ListItemButton>
                        </List>
                    </Grid>
                }
                <Grid item xs = {break_991 ? 12 : 9}
                    display = 'flex'
                    flexDirection = 'column'
                    alignItems = 'center'>
                    {break_991 &&
                        <FormControl
                            sx = {{mt:8, width : 200}}
                            variant = 'standard'
                            color = 'blackish'>
                            <Select
                                size = 'small'
                                onChange = {event => selectHandler(event)}
                                value = {navigationIndex}>
                                <MenuItem value = {0}>Change email</MenuItem>
                                <MenuItem value = {1}>Change password</MenuItem>
                                <MenuItem value = {2}>Change user name</MenuItem>
                            </Select>
                        </FormControl>
                    }
                    {!isLogIn || successFlag ? 
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