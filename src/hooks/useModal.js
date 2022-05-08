import React from 'react'

const useModal = () => {
    const [openModal, setOpenModal] = React.useState(false)

    const openModalHandler = () => {
        setOpenModal(true)
    }

    const closeModalHandler = () => {
        setOpenModal(false)
    }

    return [
        openModal,
        openModalHandler,
        closeModalHandler
    ]
}

export default useModal