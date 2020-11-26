import React from "react";
import { Registry } from "./common/store/registry";

export function withStore(storeName, fill) {
  const store = Registry.getStore(storeName);

  return function (Component) {
    return class extends React.Component {
      static displayName = Component.displayName;

      constructor(props) {
        super(props);

        this.state = { data: store ? store.data : {} };

        this.handleStoreUpdate = this.handleStoreUpdate.bind(this);
      }

      handleStoreUpdate(data) {
        this.setState({data});
      }

      componentDidMount() {
        store.subscribe(this.handleStoreUpdate);
      }

      componentWillUnmount() {
        store.unsubscribe(this.handleStoreUpdate);
      }

      render() {
        return (
          <Component
            {...this.props}
            {...fill(this.state.data)}
            dispatch={Registry.dispatch}
          />
        );
      }
    };
  };
}
