import React, { Component } from "react";
import { Container, Form, Header, Icon, Input, Message, Segment } from "semantic-ui-react";

export class AccessTokenForm extends Component {
  /* This class allows the user to enter their personal access token for retrieving data from the Starling API.
   On submission, the token is validated by hitting the WHoAmI API which returns the permissions granted to the provided token.
   The token is then saved in state (separately from the form input) and used whenever API calls are prompted.
   */
  render () {
    const { postToken, handleTokenChange, token, errors } = this.props;
    return (
      <Segment inverted raised style={{ margin: "15px", minHeight: "150px" }}>
        <Header as='h2' inverted textAlign='center'>
          <Icon name='plug'/>
          <Header.Content>Starling Bank API</Header.Content>
        </Header>
        <br/>
        <Container textAlign='left' style={{ width: "400px" }}>
          <Form onSubmit={e => postToken(e)} inverted error={!!errors} size='huge'>
            <Form.Field
              control={Input}
              label='Personal access token'
              autoFocus={true}
              autoCorrect='off'
              autoComplete='off'
              placeholder='64 Character Token'
              value={token}
              onChange={handleTokenChange}
              type='text'/>
            <Form.Button primary size='huge'>Get access</Form.Button>
            <Message style={{ margin: 0 }} size='tiny' compact error content={errors && errors.token}/>
          </Form>
        </Container>
        <br/>
      </Segment>
    );
  }
}
