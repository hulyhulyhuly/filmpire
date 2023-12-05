import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';
import { Movie } from '..';

const MovieList = ({ movies, numberOfMovies }) => {
  const cls = useStyles();

  return (
    <Grid className={cls.moviesContainer}>
      {
        movies.results
          .slice(0, numberOfMovies)
          .map((m, i) => <Movie key={i} movie={m} i={i} />)
      }
    </Grid>
  );
};

export default MovieList;
