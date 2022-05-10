import { addDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "../firebase-setup"

// this method to check whether user name exist or not in the firebase database
// if user name doesnt exist then it will add or update the username in the database
export const addOrUpdateUserName = async (userName, toUpdate, userData) => {
    const q = query(collection(db, 'users'), where('userName', '==', userName))
    const findUser = await getDocs(q)

    let userNameExist = false
    let firebaseUserId = null
    findUser.forEach(user => {
        if (user.data()) {
            userNameExist = true
            firebaseUserId = user.id
        }
    })

    if (!userNameExist && toUpdate) {
        const docRef = doc(db, 'users', firebaseUserId)
        await updateDoc(docRef, { userName : userName})
    } else if (!userNameExist && !toUpdate) {
        await addDoc(collection(db, 'users'), userData)
    }
}