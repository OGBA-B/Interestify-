import React from 'react';
import './App.css';
import SearchTweets from './Applets/SearchTweets';
import SearchFollowers from './Applets/SearchFollowers';
import { Grid, IconButton } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <nav className="navbar bg-dark">
        <ul className="navbar-nav">
          <li className="navbar-item">
          <IconButton
            className="navbar-brand"
            onClick={ () => {} }
            aria-label="Interestify"
            size="small">
              <img width="30px" src={ require('./logo.svg') } alt="logo" />
          </IconButton>
          </li>
        </ul>
      </nav>
      <br />
      <div className="container">
        <Grid container spacing={ 2 }>
          <Grid xs={ 12 } sm={ 12 } md={ 8 } item>
            <SearchTweets  height="80vh" />
          </Grid>
          <Grid xs={ 12 } sm={ 12 } md={ 4 } item>
            <SearchFollowers height="80vh" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
