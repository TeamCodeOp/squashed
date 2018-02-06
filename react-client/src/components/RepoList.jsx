import React, { Component } from 'react';
import { List, Header } from 'semantic-ui-react';
import RepoListItem from './RepoListItem.jsx';

const RepoList = ({ repos }) => (
  <div>
    <List divided relaxed floated="right">
      <Header as="h2">Featured from Github</Header>
      {repos.map((repo, i) =>
        <RepoListItem key={i} repo={repo} />
      )}
    </List>
  </div>
);

export default RepoList;
