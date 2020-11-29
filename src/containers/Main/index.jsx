import React from 'react';
import {ProductList} from '../../components';
import {withStore} from '../../state/withStore';
import {ADD_PRODUCT, REMOVE_PRODUCT} from '../../state/stores/ProductsStore';
import './main.scss';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.removeProduct = this.removeProduct.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }


    removeProduct(id = null) {
        if (id !== null && this.props.isAuth)
            this.props.dispatch(REMOVE_PRODUCT, {id});
    }

    addProduct(product = null, callback = null) {
        if (product && this.props.isAuth)
            this.props.dispatch(ADD_PRODUCT, {product, callback});
    }

    render() {
        const {products, isAuth} = this.props;
        return (
            <main className="main">
                <div className="main__wrapper">
                    <ProductList
                        isAuth={isAuth}
                        removeProduct={this.removeProduct}
                        addProduct={this.addProduct}
                        products={products}
                    />
                </div>
            </main>
        );
    }
}

export default withStore('products', (data) => data)(Main);
