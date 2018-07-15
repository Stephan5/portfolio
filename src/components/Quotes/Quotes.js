import React, { Component, Fragment } from "react";
import styles from "./Quotes.scss";
import Loading from "react-loading-components";

export class Quotes extends Component {

  render () {
    const { quote, resetQuote } = this.props;

    return (
      <div className={styles.component}>
        <h2>A random quote</h2>
        {quote && quote.content ? <Fragment>
                                  <h4>"{quote.content}"</h4>
                                  <p className={styles.author}>{quote.author}</p>
                                  <button onClick={() => resetQuote()}>Get another</button>
                                  <br/>
                                  <p className={styles.note}>Quotes retrieved from <a
                                    href='https://market.mashape.com/andruxnet/random-famous-quotes'>here</a></p>
                                </Fragment>
                                : <Loading type='puff' width={100} height={100} fill='#ffffff'/>}
      </div>
    );
  }
}

