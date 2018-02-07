import React, { Component } from 'react';
import { List, Header } from 'semantic-ui-react';
import RepoListItem from './RepoListItem.jsx';

const RepoList = ({ repos }) => (
  <div style={{ margin: 'auto', width: '500px', marginTop: '5em' }}>
    <List divided relaxed >
      <Header as="h2" style={{ textAlign: 'center' }}>Featured from Github</Header>
      {repos.map((repo, i) =>
        <RepoListItem key={i} repo={repo} style={{width: '250px'}}/>
      )}
    </List>
  </div>
);

export default RepoList;
