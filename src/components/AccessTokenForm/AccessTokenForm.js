import React, { Component } from "react";
import { FormError } from "components/FormError/FormError";

export class AccessTokenForm extends Component {

  render () {
    const { fetchBalance, accessToken, handleTokenChange, errors } = this.props;
    return (
      <div className='flexCenter'>
        <form
          onSubmit={e => fetchBalance(e)}
          className={[ "flexCenter flexColumn fw" ].join(" ")}>
          <h2>Starling Bank API</h2>
          <div className='flexCenter flexColumn'>
            <p style={{ alignSelf: "flex-start" }}>Personal Access Token:</p>
            <input
              autoFocus={true}
              autoCorrect='off'
              autoComplete='off'
              placeholder='token'
              value={accessToken}
              onChange={handleTokenChange}
              type='text'
            />
          </div>
          <button type='submit'>Get balance</button>
          <br/>
          <FormError errors={errors}/>
        </form>
      </div>
    );
  }
}
