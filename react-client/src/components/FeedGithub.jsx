import React, { Component } from 'react';
import { List, Header } from 'semantic-ui-react';
import RepoListItem from './RepoListItem.jsx';

const FeedGithub = ({ repos }) => (
  <div style={{ margin: 'auto', width: '40%', marginTop: '5em', borderRadius: '10px', border: '1px solid rgba(34,36,38,.15)', padding: '2em' }}>
    <List divided relaxed >
      <Header as="h2" style={{ textAlign: 'center' }}>Featured from Github</Header>
      {repos.map((repo, i) =>
        <RepoListItem key={i} repo={repo} style={{width: '500px'}}/>
      )}
    </List>
  </div>
);

export default FeedGithub;