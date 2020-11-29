import React from 'react';
import {CustomInput, Modal} from '..';
import './loginModal.scss';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                value: null,
                error: null,
            },
            password: {
                value: null,
                error: null,
            },
        };

        const {closeModal, loginAction} = props;
        if (typeof closeModal !== 'function')
            throw new Error('closeModal not defined or is not a function');
        if (typeof loginAction !== 'function')
            throw new Error('loginAction not defined or is not a function');

        this.handleForm = this.handleForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleForm(event) {
        event.preventDefault();
        const {login: {value: login}, password: {value: password}} = this.state;
        if (login !== null && password !== null)
            this.props.loginAction({login, password});
        else {
            let error = {};
            if (!login) error.login = {
                value: null,
                error: 'Поле обязательно для заполнения'
            };
            if (!password) error.password = {
                value: null,
                error: 'Поле обязательно для заполнения'
            };
            if (Object.keys(error).length) this.setState(error);
        }
    }

    handleInput(name, value) {
        const formatted = value.replace(/\s+/g, '');
        switch (name) {
            case 'login':
                if (formatted.length > 0)
                    this.setState({login: {value: formatted, error: null}});
                else
                    this.setState({
                        login: {
                            value: null,
                            error: 'Поле обязательно для заполнения'
                        }
                    });
                break;
            case 'password':
                if (formatted.length >= 6)
                    this.setState({password: {value: formatted, error: null}});
                else if (formatted.length > 0)
                    this.setState({
                        password: {
                            value: null,
                            error: 'Пароль должен быть не менее 6 символов'
                        },
                    });
                else
                    this.setState({
                        password: {
                            value: null,
                            error: 'Поле обязательно для заполнения',
                        }
                    });
                break;
            default:
                throw new Error(`Unknown attribute name:${name}`);
        }
    }

    render() {
        const {handleInput, handleForm} = this;
        const {closeModal} = this.props;
        const {login: {error: loginError}, password: {error: passwordError}} = this.state;

        return (
            <Modal closeModal={closeModal}>
                <form onSubmit={handleForm} className="login-modal">
                    <h1 className="login-modal__title">Авторизация</h1>
                    <div className="login-modal__form">
                        <CustomInput
                            title={'Логин'}
                            type={'text'}
                            name={'login'}
                            error={loginError}
                            onChange={handleInput}/>
                        <CustomInput
                            title={'Пароль'}
                            type={'password'}
                            name={'password'}
                            error={passwordError}
                            onChange={handleInput}/>
                    </div>
                    <button type="submit" className="button button_primary login-modal__submit">Войти</button>
                </form>
            </Modal>
        );
    }
}

export default LoginModal;
