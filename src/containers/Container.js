import React, { Component } from "react";
import "styles/core.scss";
import WorkInProgress from "components/WorkInProgress/WorkInProgress";

class Container extends Component {
  constructor () {
    super();
    this.state = {
      wip: true
    };
  }

  render () {
    const { wip } = this.state;
    return (
      <div className='siteContainer'>
        {wip ? <WorkInProgress/> : null}
      </div>
    );
  }
}

export default Container;
