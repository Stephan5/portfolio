import React, { Component } from "react";
import Header from "components/Header/Header";
import { fetchQuote } from "services/quoteService";
import { Spacer } from "components/Spacer/Spacer";
import "styles/core.scss";
import { getBalance, postToken } from "services/starlingService";
import { isEmpty, validationPresent } from "commons/utils";
import { AccessTokenForm } from "components/AccessTokenForm/AccessTokenForm";
import { Balance } from "components/Balance/Balance";

class Container extends Component {
  constructor () {
    super();
    this.state = {
      quote: null,
      accessToken: "",
      errors: null,
      balance: null
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

  handleTokenChange = (event) => {
    if (!event || !event.target || event.target.value === null || event.target.value === undefined) return;
    const newValue = event.target.value;
    this.setState({
      accessToken: newValue
    });
  };

  resetQuote = () => {
    this.setState({
      quote: null
    });
    this.getQuote();
  };

  setFormError = (newErrors) => {
    this.setState(prevState => {
      const allErrors = Object.assign({}, prevState.errors, newErrors);
      console.warn(allErrors);
      return {
        errors: allErrors
      };
    });
  };

  clearFormErrors = () => {
    this.setState({
      errors: {}
    });
  };

  setBalance = (balance) => {
    this.setState({
      balance: balance
    });
  };

  fetchBalance = (ev) => {
    ev.preventDefault();
    const {
      accessToken
    } = this.state;

    let errors = {};
    this.clearFormErrors();

    if (!accessToken) {
      errors.token = "This is not a valid access token.";
    } else if (accessToken.length !== 64) {
      errors.token = "Access tokens should be 64 characters long.";
    }

    if (!isEmpty(errors)) {
      this.setFormError(errors);
    } else {
      getBalance(accessToken)
        .then(response => {
          this.setBalance(response.data.balance);
        })
        .catch(e => {
          if (validationPresent(e)) {
            this.setFormError(e.validationCodes[ 0 ]);
          }
        });
    }
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
    const { accessToken, errors, balance } = this.state;
    return (
      <div className='siteContainer'>
        <Header/>
        <Spacer/>
        <AccessTokenForm errors={errors}
                         accessToken={accessToken}
                         handleTokenChange={this.handleTokenChange}
                         fetchBalance={this.fetchBalance}/>
        <Balance balance={balance}/>
      </div>
    );
  }
}

export default Container;
