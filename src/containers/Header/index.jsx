import React from 'react';
import {LoginModal} from '../../components';
import './header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isModalActive: false};

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }


    closeModal() {
        this.setState({isModalActive: false});
    }

    openModal() {
        this.setState({isModalActive: true});
    }

    login({login, password}) {
        if (login && password)
            this.props.loginAction(login, password, this.closeModal);
    }

    logout() {
        this.props.logoutAction();
    }

    render() {
        const {isModalActive} = this.state;
        const {login, isAuth} = this.props;

        return (
            <header className="header">
                <div className="header__wrapper">
                    <div className="header__content">
                        <h1 className="header__title">Список товаров</h1>
                    </div>
                    <div className="header__content">
                        {isAuth ? (
                            <>
                                <p className="header__text">Добро пожаловать, {login}</p>
                                <button
                                    type="button"
                                    className="button button_secondary"
                                    onClick={this.logout}>
                                    Выход
                                </button>
                            </>
                        ) : (<button
                                type="button"
                                className="button button_primary"
                                onClick={this.openModal}
                            >
                                Авторизоваться
                            </button>
                        )}
                    </div>
                </div>
                {isModalActive &&
                <LoginModal
                    closeModal={this.closeModal}
                    loginAction={this.login}
                />}
            </header>
        );
    }
}


export default Header;
