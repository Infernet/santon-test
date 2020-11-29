import { Store } from "../common/store/store";
import { Registry } from "../common/store/registry";
import {DEFAULT_IMAGE_URL} from '../../constant';

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

const ProductsStore = new Store("products", {
  data: {
    products: [],
  },
  options: {
    shouldInitFromState: true,
    stateKey: "products",
  },
  reducers: [
    {
      type: ADD_PRODUCT,
      action(state, {product:{description,imageLink,...rest},callback}) {
        const data={
          description:description!==null?description:'',
          image:imageLink!==null?imageLink:DEFAULT_IMAGE_URL,
          ...rest
        }

        const products = [...state.products, data];
        if(typeof callback ==='function')
          callback();
        return {
          ...state,
          products,
        };
      },
    },
    {
      type: REMOVE_PRODUCT,
      action(state, payload) {
        const { id } = payload;

        const products = [...state.products];
        const index = products.findIndex((product) => product.id === id);

        if (index !== -1) {
          products.splice(index, 1);
        }

        return {
          ...state,
          products,
        };
      },
    },
  ],
});

Registry.addStore(ProductsStore);

export { ProductsStore };
