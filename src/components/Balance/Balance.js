import React, { Component } from "react";
import { formatAmount } from "commons/utils";

export class Balance extends Component {
  render () {
    const { balance } = this.props;
    const formattedBalance = formatAmount(balance);
    return (
      balance ? <div>
        <p>Your balance is:</p>
        <h4>{formattedBalance}</h4>
      </div> : null
    );
  }
}
