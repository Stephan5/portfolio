import React, { Component, Fragment } from "react";
import { fetchQuote } from "services/quoteService";
import "styles/core.scss";
import { getBalance, getTransasctions, postToken } from "services/starlingService";
import { isEmpty, validationPresent } from "commons/utils";
import { AccessTokenForm } from "components/AccessTokenForm/AccessTokenForm";
import { Balance } from "components/Balance/Balance";
import { Container } from "semantic-ui-react";
import { Social } from "components/Social/Social";
import { getRepoDetails } from "services/githubService";
import { Cookies, withCookies } from "react-cookie";
import PropTypes from "prop-types";
import MenuBar from "components/MenuBar/MenuBar";
import { Transactions } from "components/Transactions/Transactions";

class AppContainer extends Component {
  static propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      quote: null,
      form: {
        token: ""
      },
      tokenId: props.cookies.get("tokenId"),
      errors: null,
      balance: null,
      transactions: null,
      activeMenuItem: "starling"
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
      balance
    });
  };

  setTransactions = (transactions) => {
    this.setState({
      transactions
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

  fetchTransactions = () => {
    const {
      tokenId
    } = this.state;

    if (!tokenId) return;

    getTransasctions(tokenId)
      .then(response => {
        this.setTransactions(response.data.transactions);
      })
      .catch(e => {
        if (validationPresent(e)) {
          this.setFormError(e.validationCodes[ 0 ]);
        }
      });
  };

  setRepoDetails = (repo) => {
    this.setState({
      github: {
        forks: repo.forks_count,
        stars: repo.stargazers_count
      }
    });
  };

  fetchRepoDetails = () => {
    getRepoDetails()
      .then(response => {
        this.setRepoDetails(response.data);
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
    this.props.cookies.set("tokenId", tokenId, { path: "/" });
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

  handleMenuItemClick = (doNotUse, { name }) => { // eslint-disable-line no-unused-vars
    this.setState({ activeMenuItem: name });
  };

  logOut = () => {
    this.props.cookies.remove("tokenId");
    this.setState({
      tokenId: null
    });
  };

  render () {
    const { form, errors, balance, transactions, tokenId, github, activeMenuItem } = this.state;
    return (
      <div className='siteContainer'>
        <MenuBar tokenId={tokenId} activeMenuItem={activeMenuItem} logOut={this.logOut}
                 handleMenuItemClick={this.handleMenuItemClick}/>
        <br/>
        <Container textAlign='left' style={{ width: "500px" }}>
          {tokenId ? null : <AccessTokenForm errors={errors}
                                             token={form.token}
                                             handleTokenChange={this.handleTokenChange}
                                             postToken={this.postToken}/>}
          {tokenId ? <Fragment>

                     <Balance balance={balance}
                              fetchBalance={this.fetchBalance}/>

                     <Transactions transactions={transactions} fetchTransactions={this.fetchTransactions}/>
                   </Fragment>

                   : null}
        </Container>
        <Social fetchRepoDetails={this.fetchRepoDetails} github={github}/>
      </div>
    );
  }
}

export default withCookies(AppContainer);
