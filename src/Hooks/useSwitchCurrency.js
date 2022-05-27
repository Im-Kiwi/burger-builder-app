import { useState } from 'react'
import { useSelector } from 'react-redux'

const useSwitchCurrency = () => {

    const [switchCurr, setSwitchCurr] = useState(false)


    // this method will control the switch component
    const switchCurrHandler = () => {
        setSwitchCurr(v => !v)
    }

    return [
        switchCurr,
        switchCurrHandler
    ]
}

export default useSwitchCurrency