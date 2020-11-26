import { state } from "./state";

export class Store {
  constructor(name, initialConfig = {}) {
    if (!name) {
      throw new Error("Could not create store without name!");
    }

    const config = {
      options: this.getOptions(initialConfig.options),
      reducers: this.getReducers(initialConfig.reducers),
    };

    this.name = name;
    this.listeners = [];
    this.config = config;
    this.data = initialConfig.data || {};

    if (this.config.options.shouldInitFromState) {
      if (!this.config.options.stateKey) {
        throw new Error(
          "shouldInitFromState is true, but stateKey is not stated!"
        );
      }

      this.initFromGlobalState();
    }
  }

  getOptions(options = {}) {
    const defaultOptions = {
      shouldEmitAfterSubscription: true,
      shouldInitFromState: false,
      stateKey: undefined,
    };

    return {
      ...defaultOptions,
      ...options,
    };
  }

  getReducers(reducers = []) {
    const defaultReducers = [];

    return [...defaultReducers, ...reducers];
  }

  initFromGlobalState() {
    const storeData = state[this.config.options.stateKey] || {};

    this.data = { ...this.data, ...storeData };
  }

  dispatch(type, payload) {
    for (const reducer of this.reducers) {
      if (reducer.type === type) {
        if (typeof reducer.action === "function") {
          this.data = reducer.action(this.data, payload);
        } else {
          throw new Error("Action function must be specified on reducer!");
        }
      }
    }

    this.__emit();
  }

  subscribe(listener) {
    if (this.listeners.findIndex((_l) => _l === listener) !== -1) {
      return;
    }

    this.listeners.push(listener);

    if (this.config.options.shouldEmitAfterSubscription) {
      listener(this.data);
    }
  }

  unsubscribe(listener) {
    const index = this.listeners.findIndex((_l) => _l === listener);

    if (index === -1) {
      return;
    }

    this.listeners.splice(index, 1);
  }

  __emit() {
    for (const listener of this.listeners) {
      if (typeof listener === "function") {
        listener(this.data);
      } else {
        console.warn("listener is not a function!");
      }
    }
  }
}
