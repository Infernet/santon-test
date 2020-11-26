import { Store } from "../common/store/store";
import { Registry } from "../common/store/registry";

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
      action(state, payload) {
        const { product } = payload;

        const products = [...state.products, product];

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

        const products = [...state.product];
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
