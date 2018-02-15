import React, { Component } from 'react';
import { List, Header } from 'semantic-ui-react';
import RepoListItem from './RepoListItem.jsx';

const FeedGithub = ({ repos }) => (
  <div>
    <List divided relaxed >
      <Header>Featured on Github</Header>
      {repos.map((repo, i) =>
        <RepoListItem key={repo.repo_id} repo={repo} />
      )}
    </List>
  </div>
);

export default FeedGithub;