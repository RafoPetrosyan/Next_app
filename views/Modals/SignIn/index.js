import React from 'react';
import {Modal} from "antd";

const SignIn = ({onClose}) => {
    return (
        <Modal title="Basic Modal" open onCancel={onClose}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    );
};

export default SignIn;
