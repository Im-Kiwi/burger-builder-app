import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Paper, Typography } from '@mui/material'
import { getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { v4 as uniqueId } from 'uuid'

// ----- importing from other files -----------
import { db } from '../../firebase-setup'

const DisplayAddresses = () => {

    const [AddressesStore, setAddressesStore] = useState([])
    
    const userId = useSelector(state => state.userForm.currentUser.userId)

    useEffect(() => {
        // fetching addresses from the database
        (async () => {
            const findAddresses = query(collection(db, 'addresses'), where('userId', '==', userId))
            const getAddresses = await getDocs(findAddresses)
            let AddressesArr = []
            
            getAddresses.forEach(doc => {
                AddressesArr.push(doc.data())
            })
            setAddressesStore([...AddressesArr])
        })();

    }, [])

    return (
        <Box display = 'flex' flexWrap = 'wrap' justifyContent = 'center' >
            {AddressesStore.map(address => {
                return (
                    <Paper variant = 'outlined' key = {uniqueId()} sx = {{m:1, p:2, backgroundColor : '#f9b826', cursor: 'pointer'}} >
                        <div>
                            <p>{address.firstName} {address.lastName}</p>
                            <p>{address.address}</p>
                            <p>{address.city}, {address.state}, {address.country}</p>
                            <p>zip code: {address.pinCode} Phone Number: {address.phoneNumber}</p>

                        </div>
                    </Paper>
                )
            })}
        </Box>
    )
}

export default DisplayAddresses