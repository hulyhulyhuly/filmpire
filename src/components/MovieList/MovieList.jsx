import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';
import { Movie } from '..';

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const cls = useStyles();
  const startFrom = excludeFirst ? 1 : 0;

  return (
    <Grid className={cls.moviesContainer}>
      {
        movies.results
          .slice(startFrom, numberOfMovies)
          .map((m, i) => <Movie key={i} movie={m} i={i} />)
      }
    </Grid>
  );
};

export default MovieList;
