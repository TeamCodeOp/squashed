import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

const RepoListItem = ({ repo }) => (
  <List.Item>
    <List.Icon name='github' size='large' verticalAlign='middle' />
    <List.Content>
      <List.Header as='a'>{repo.name}</List.Header>
      <List.Description as='a'>{repo.description}</List.Description>
    </List.Content>
  </List.Item>
);

export default RepoListItem;
