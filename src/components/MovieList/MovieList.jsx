import React from 'react';
import { Grid } from '@mui/material';

// eslint-disable-next-line import/no-cycle
import { Movie } from '..';
import useStyles from './styles';

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
