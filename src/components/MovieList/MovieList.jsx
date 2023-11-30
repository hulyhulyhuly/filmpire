import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';

// eslint-disable-next-line import/no-cycle
import { Movie } from '..';

const MovieList = ({ movies }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.moviesContainer}>
      {movies.results.map((m, i) => <Movie key={i} movie={m} i={i} />)}
    </Grid>
  );
};

export default MovieList;
