import React from 'react';
import MODAL_COMPONENTS from 'views/ModalRoot/modalComponents';
import {useDispatch} from "react-redux";
import {hideModal} from "store/modal";

const ModalRoot = ({ modalType = '', modalProps = {} }) => {
    const dispatch = useDispatch();
    if (!modalType) return;
    const hideModalHandler = () => {
        dispatch(hideModal());
    }
    const SpecificModal = MODAL_COMPONENTS[modalType];
    return <SpecificModal onClose={hideModalHandler} {...modalProps} />;
};

export default ModalRoot;
