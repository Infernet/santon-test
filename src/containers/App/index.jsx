import React from 'react';
import {LOGIN, LOGOUT} from '../../state/stores/AccountStore';
import './app.scss';

import {Header, Main} from '..';
import {withStore} from '../../state/withStore';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(login, password, callback = null) {
        if (login && password)
            this.props.dispatch(LOGIN, {login, password, callback});
    }

    logout(callback = null) {
        const {isAuth, dispatch} = this.props;
        if (isAuth) dispatch(LOGOUT, callback);
    }

    render() {
        const {login, isAuth} = this.props;
        return (
            <div className="app">
                <Header
                    loginAction={this.login}
                    logoutAction={this.logout}
                    isAuth={isAuth}
                    login={login}
                />
                <Main isAuth={isAuth}/>
            </div>
        );
    }
}


export default withStore('account', (data) => data)(App);
