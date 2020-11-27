import React from 'react';
import {LoginModal} from '../../components';
import './header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isModalActive: false};

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }


    closeModal() {
        this.setState({isModalActive: false});
    }

    openModal() {
        this.setState({isModalActive: true});
    }

    render() {
        const {isModalActive} = this.state;
        const {openModal, closeModal} = this;

        return (
            <header className="header">
                <div className="header__wrapper">
                    <p className="header__title">Список товаров</p>
                </div>
                <div className="header__wrapper">
                    <button
                        type="button" className="button button_primary" onClick={openModal}>Авторизация
                    </button>
                    <button
                        type="button" className="button button_secondary">Выход
                    </button>
                </div>
                {isModalActive && <LoginModal closeModal={closeModal}/>}
            </header>
        );
    }
}


export default Header;
