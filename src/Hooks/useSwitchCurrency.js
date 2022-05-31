import { useSelector, useDispatch } from 'react-redux'

// ----- importing from other files ---------
import { switchCurrActions } from '../Store/reducer/switchCurrency'

const useSwitchCurrency = () => {
    const dispatch = useDispatch()

    const switchCurr = useSelector(state => state.switchCurr.switchCurr)

    // this method will control the switch component
    const switchCurrHandler = () => {
        if (switchCurr) {
            dispatch(switchCurrActions.updateSwitchCurr(false))
        } else {
            dispatch(switchCurrActions.updateSwitchCurr(true))
        }
    }

    return [
        switchCurr,
        switchCurrHandler
    ]
}

export default useSwitchCurrency