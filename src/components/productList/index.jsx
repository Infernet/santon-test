import React from 'react';
import {AddProductModal, Product} from '..';
import './product-list.scss';

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isModalActive: false};
        const {removeProduct, addProduct} = this.props;

        if (typeof removeProduct !== 'function')
            throw new Error('removeProduct not defined or is not a function');
        if (typeof addProduct !== 'function')
            throw new Error('addProduct not defined or is not a function');

        this.removeProduct = this.removeProduct.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }

    addProduct(product) {
        this.props.addProduct(product, this.closeModal);
    }

    removeProduct(id = null) {
        if (id)
            this.props.removeProduct(id);
    }

    openModal() {
        this.setState({isModalActive: true});
    }

    closeModal() {
        this.setState({isModalActive: false});
    }

    render() {
        const {removeProduct, openModal, closeModal, addProduct} = this;
        const {products, isAuth} = this.props;
        const {isModalActive} = this.state;

        return (
            <div className="product-list">
                <div className="product-list__list">
                    {products.map((product) => (
                        <Product
                            key={product.id}
                            product={product}
                            isAuth={isAuth}
                            remove={removeProduct}/>
                    ))}
                </div>
                {isAuth && <div className="product-list__controls">
                    <button
                        type="button"
                        className="button button_primary"
                        onClick={openModal}>
                        Добавить новый продукт
                    </button>
                </div>}
                {isModalActive &&
                <AddProductModal
                    products={products}
                    closeModal={closeModal}
                    addProduct={addProduct}/>}
            </div>
        );
    }
}

export default ProductList;
