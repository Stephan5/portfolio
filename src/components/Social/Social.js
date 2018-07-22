import React, { Component } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { GITHUB_REPO_URL } from "commons/constants";

export class Social extends Component {
  componentDidMount () {
    this.props.fetchRepoDetails();
  }

  render () {

    const { github } = this.props;
    if (!github) return null;
    const { stars, forks } = github;

    return <div style={{ position: "absolute", bottom: "50px", left: "30%" }}>
      <Button as='div' inverted labelPosition='right'>
        <Button basic color='yellow'>
          <Icon name='star'/>
          Star
        </Button>
        <Label as='a' href={GITHUB_REPO_URL} target='_blank' color='yellow' pointing='left'>
          {stars}
        </Label>
      </Button>
      <Button as='div' labelPosition='right'>
        <Button basic color='blue'>
          <Icon name='fork'/>
          Fork
        </Button>
        <Label as='a' href={GITHUB_REPO_URL} target='_blank' basic color='blue' pointing='left'>
          {forks}
        </Label>
      </Button>
    </div>;
  }
}
