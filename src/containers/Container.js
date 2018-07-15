import React, { Component } from "react";
import "styles/core.scss";

class Container extends Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    return (
      <div className='siteContainer'>
        <header className='appHeader'>
          <h1 className='appTitle'>Stephan Blakeslee</h1>
          <p className='appSubtitle'>
            Site under construction
          </p>
        </header>
      </div>
    );
  }
}

export default Container;
