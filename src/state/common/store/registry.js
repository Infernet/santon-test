const { Store } = require("./store");

class Registry {
  constructor() {
    this.stores = {};

    this.dispatch = this.dispatch.bind(this);
  }

  addStore(store) {
    if (!store instanceof Store) {
      throw new Error("Given value is not a store instance!");
    }

    this.stores[store.name] = store;
  }

  getStore(storeName) {
    return this.stores[storeName];
  }

  dispatch(type, payload) {
    for (const key of Object.keys(this.stores)) {
      this.stores[key].dispatch(type, payload);
    }
  }
}

const instance = new Registry();

export { instance as Registry };
