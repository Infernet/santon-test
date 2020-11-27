import React from 'react';
import './modal.scss';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        const {closeModal} = props;
        if (typeof closeModal !== 'function')
            throw new Error('closeModal is not defined or not a function');
    }

    render() {
        const {closeModal, children} = this.props;

        return (
            <div className='modal'>
                <button type='button' className='modal__popup' onClick={closeModal}/>
                <div className="modal__wrapper">
                    <button
                        type="button"
                        className="modal__close"
                        onClick={closeModal}>
                        <span className="modal__close__cross">&#10006;</span>
                    </button>
                    <div className="modal__body">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}
