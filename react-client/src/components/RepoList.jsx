import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import RepoListItem from './RepoListItem.jsx';

const RepoList = ({ repos }) => (
  <List divided relaxed>
    {repos.map((repo, i) =>
      <RepoListItem key={i} repo={repo} />
    )}
  </List>
);

export default RepoList;
