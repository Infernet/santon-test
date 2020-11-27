import React from "react";
import './app.scss';

import {Header, Main} from '..';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <Main/>
      </div>
    );
  }
}
