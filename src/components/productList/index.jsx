import React from "react";
import '../../state/stores/ProductsStore';
import { withStore } from "../../state/withStore";
import {Product} from "..";
import "./product-list.scss";

class ProductList extends React.Component {
  render() {
    const { products } = this.props;

    return (
      <div className="product-list">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    );
  }
}

export default withStore("products", (data) => data)(ProductList);
