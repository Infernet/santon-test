import React from 'react';
import {Modal} from '..';
import './loginModal.scss';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: null, password: null, loginError: null, passwordError: null};

        const {closeModal} = props;
        if (typeof closeModal !== 'function')
            throw new Error('closeModal not defined or is not a function');

        this.handleForm = this.handleForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleForm(event) {
        event.preventDefault();
        console.log('Login');
    }

    handleInput({target: {name, value}}) {
        const formatted = value.replace(/\s+/g, '');
        switch (name) {
            case 'login':
                if (formatted.length > 0)
                    this.setState({login: formatted, loginError: null});
                else
                    this.setState({login: null, loginError: 'Поле обязательно для заполнения'});
                break;
            case 'password':
                if (formatted.length >= 6)
                    this.setState({password: formatted, passwordError: null});
                else if (formatted.length === 0)
                    this.setState({password: null, passwordError: 'Пароль должен быть не менее 6 символов'});
                else
                    this.setState({password: null, passwordError: 'Поле обязательно для заполнения'});
                break;
            default:
                throw new Error(`Unknown attribute name:${name}`);
        }
    }

    render() {
        const {handleForm, handleInput} = this;
        const {closeModal} = this.props;
        const {loginError, passwordError} = this.state;

        return (
            <Modal closeModal={closeModal}>
                <form onSubmit={handleForm} className="login-modal">
                    <h1 className="login-modal__title">Авторизация</h1>
                    <div className="login-modal__form">
                        <div className="login-modal__field">
                            <label className="login-modal__field__label">
                                <p className="login-modal__field__title">Логин</p>
                                <input
                                    type="text"
                                    name="login"
                                    className={`login-modal__field__input${loginError ? ' login-modal__field__input_error' : ''}`}
                                    onChange={handleInput}/>
                            </label>
                            <p className="login-modal__field__error">{loginError}</p>
                        </div>
                        <div className="login-modal__field">
                            <label className="login-modal__field__label">
                                <p className="login-modal__field__title">Пароль</p>
                                <input
                                    type="password"
                                    name="password"
                                    className={`login-modal__field__input${passwordError ? ' login-modal__field__input_error' : ''}`}
                                    onChange={handleInput}/>
                            </label>
                            <p className="login-modal__field__error">{passwordError}</p>
                        </div>
                    </div>
                    <button type="submit" className="button button_primary login-modal__submit">Войти</button>
                </form>
            </Modal>
        );
    }
}

export default LoginModal;
