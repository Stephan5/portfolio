import React, { Component } from "react";
import { Header, Icon, Segment, Table } from "semantic-ui-react";
import { formatAmount } from "commons/utils";

export class Transactions extends Component {
  componentDidMount () {
    this.props.fetchTransactions();
  }

  render () {
    const { transactions } = this.props;

    const tableRows = transactions && transactions.map((transaction, i) =>
      <Table.Row key={i}>
        <Table.Cell>{transaction.narrative}</Table.Cell>
        <Table.Cell>{formatAmount(transaction.amount)}</Table.Cell>
      </Table.Row>);
    return (
      <Segment inverted>
        <Header as='h2' inverted textAlign='center'>
          <Icon name='gbp'/>
          <Header.Content>Transactions</Header.Content>
        </Header>
        <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tableRows}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}
