import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';

import useStyles from './styles';

import { NavBar, Movies, MovieInfo, Actors, ActorInfo, Profile } from '.';

const App = () => {
  const cls = useStyles();

  return (
    <div className={cls.root}>
      <CssBaseline />
      <NavBar />
      <main className={cls.content}>
        <div className={cls.toolbar} />
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
