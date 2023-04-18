import React from 'react';
import { connect } from 'react-redux';
import ModalRootComponent from './component';
const ModalRoot = (props) => <ModalRootComponent {...props} />;

const mapStateToProps = (state) => ({
    modalType: state.modal.modalType,
    modalProps: state.modal.modalProps,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);