import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';

import useStyles from './style';

import { NavBar, Movies, MovieInfo, Actors, ActorInfo, Profile } from '.';

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/">
            <Movies />
          </Route>
          <Route exact path="/movie/:id">
            <MovieInfo />
          </Route>
          <Route exact path="/actors">
            <Actors />
          </Route>
          <Route exact path="/actor/:id">
            <ActorInfo />
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;
