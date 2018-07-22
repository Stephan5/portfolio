import React, { Component } from "react";
import { formatAmount } from "commons/utils";
import Loading from "react-loading-components";
import { Container, Header, Icon, Segment, Statistic } from "semantic-ui-react";

export class Balance extends Component {
  componentDidMount () {
    this.props.fetchBalance();
  }

  render () {
    const { balance } = this.props;
    const formattedBalance = formatAmount(balance);

    return (
      <Segment inverted raised style={{ margin: "15px", minHeight: "150px" }}>
        <Container textAlign='center' style={{ maxWidth: "300px" }}>
          <Header as='h2' inverted textAlign='center'>
            <Icon name='gbp'/>
            <Header.Content>Balance</Header.Content>
          </Header>
          {balance ? <Statistic size='small' inverted>
                     <Statistic.Value>{formattedBalance}</Statistic.Value>
                     <Statistic.Label>Available Balance</Statistic.Label>
                   </Statistic>
                   : <Loading type='puff' width={50} height={50} fill='#ffffff'/>}
          <br/>
        </Container>
      </Segment>
    );
  }
}
