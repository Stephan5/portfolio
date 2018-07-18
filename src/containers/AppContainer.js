import React, { Component } from "react";
import { fetchQuote } from "services/quoteService";
import "styles/core.scss";
import { getBalance, postToken } from "services/starlingService";
import { isEmpty, validationPresent } from "commons/utils";
import { AccessTokenForm } from "components/AccessTokenForm/AccessTokenForm";
import { Balance } from "components/Balance/Balance";
import { Container, Divider, Header, Icon } from "semantic-ui-react";

class AppContainer extends Component {
  constructor () {
    super();
    this.state = {
      quote: null,
      form: {
        token: ""
      },
      tokenId: "",
      errors: null,
      balance: null
    };
  }

  componentDidMount () {
    // this.getQuote();
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
      form: { token: newValue }
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

  fetchBalance = () => {
    const {
      tokenId
    } = this.state;

    if (!tokenId) return;

    getBalance(tokenId)
      .then(response => {
        this.setBalance(response.data.effectiveBalance);
      })
      .catch(e => {
        if (validationPresent(e)) {
          this.setFormError(e.validationCodes[ 0 ]);
        }
      });
  };

  postToken = (ev) => {
    ev.preventDefault();
    const {
      form: { token }
    } = this.state;

    let errors = {};
    this.clearFormErrors();

    if (!token) {
      errors.token = "Please enter your personal access token.";
    } else if (token.length !== 64) {
      errors.token = "Access tokens should be 64 characters long.";
    }

    if (!isEmpty(errors)) {
      this.setFormError(errors);
    } else {
      postToken(token)
        .then(response => {
          console.warn(response.data);
          this.setTokenId(response.data.accessTokenId);
        })
        .catch(e => {
          if (validationPresent(e)) {
            this.setFormError(e.validationCodes[ 0 ]);
          }
        });
    }
  };

  setTokenId = (tokenId) => {
    this.setState({ tokenId });
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
    const { form, errors, balance, tokenId } = this.state;
    return (
      <div className='siteContainer'>
        <Header as='h1' inverted textAlign='center'>
          <Icon name='globe'/>
          <Header.Content>Stephan's World</Header.Content>
        </Header>
        <Divider/>
        <br/>
        <Container textAlign='left' style={{ width: "500px" }}>
          {tokenId ? null : <AccessTokenForm errors={errors}
                                             token={form.token}
                                             handleTokenChange={this.handleTokenChange}
                                             postToken={this.postToken}/>}
          {tokenId ? <Balance balance={balance}
                              fetchBalance={this.fetchBalance}/> : null}
        </Container>
      </div>
    );
  }
}

export default AppContainer;
