import React from 'react';
import './product.scss';

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
    }

    remove() {
        if (this.props.isAuth)
            this.props.remove(this.props.product.id);
    }

    render() {
        const {product, isAuth} = this.props;
        const price = product.price.toLocaleString('ru', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            currency: 'RUB',
            style: 'currency',
        });

        return (
            <div className="product">
                <p className="product__title">
                    {product.title} - {product.id}
                </p>
                <div className="product__image-frame">
                    <img
                        className="product__image"
                        src={product.image}
                        alt=""
                    />
                </div>
                <p className="product__description">{product.description}</p>
                <div className="product__wrapper">
                    <span className="product__price">{price}</span>
                    {isAuth && (
                        <button
                            type="button"
                            className="button button_danger"
                            onClick={this.remove}>
                            Удалить
                        </button>
                    )}
                </div>
            </div>
        );
    }
}
