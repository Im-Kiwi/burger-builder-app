import { Image } from 'react-bootstrap'

const Slice = props => {

    return (
        <div>
            <Image src = {props.image} alt = {props.description} width = '240px' />
        </div>
    )
}

export default Slice