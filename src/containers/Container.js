import React, { Component } from "react";
import "styles/core.scss";
import Header from "components/Header/Header";
import { Quotes } from "components/Quotes/Quotes";
import { fetchQuote } from "services/quoteService";

class Container extends Component {
  constructor () {
    super();
    this.state = {
      quote: null
    };
  }

  componentDidMount () {
    this.getQuote();
  }

  getQuote = () => {
    fetchQuote()
      .then(response => {
        this.setQuote(response);
      })
      .catch(e => {
        console.error(e ? e.validationCodes : "Unknown  error");
      });
  };

  resetQuote = () => {
    this.setState({
      quote: null
    });
    this.getQuote();
  };

  setQuote = (response) => {
    this.setState({
      quote: {
        content: response.data[ 0 ].quote,
        author: response.data[ 0 ].author
      }
    });
  };

  render () {
    const { quote } = this.state;
    return (
      <div className='siteContainer'>
        <Header/>
        <Quotes quote={quote} resetQuote={this.resetQuote}/>
      </div>
    );
  }
}

export default Container;
