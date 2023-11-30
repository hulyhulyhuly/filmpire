import React from 'react';
import { Grid, Typography } from '@mui/material';

import useStyles from './styles';

const Movie = ({ movie }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Typography className={classes.title} variant="h5">
        {movie.title}
      </Typography>

    </Grid>
  );
};

export default Movie;