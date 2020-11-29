import {Store} from '../common/store/store';
import {Registry} from '../common/store/registry';

export const LOGIN = 'ACCOUNT_LOGIN';
export const LOGOUT = 'ACCOUNT_LOGOUT';

const ProductsStore = new Store('account', {
    data: {
        login: null,
        isAuth: false,
    },
    options: {},
    reducers: [
        {
            type: LOGIN,
            action(state, payload) {
                const {isAuth} = state;
                const {login, password, callback} = payload;

                if (!isAuth && login && password) {
                    if (typeof callback === 'function') callback();
                    return {...state, isAuth: true, login};
                } else return state;
            },
        },
        {
            type: LOGOUT,
            action(state, payload) {
                if (typeof payload === 'function') payload();
                return {...state, isAuth: false, login: null};
            },
        },
    ],
});

Registry.addStore(ProductsStore);

export {ProductsStore};
