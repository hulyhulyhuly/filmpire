import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Grow, Rating, Tooltip, Typography } from '@mui/material';

import useStyles from './styles';

const Movie = ({ movie, i }) => {
  const cls = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={cls.movie}>
      <Grow in key={i} timeout={(i * 1) * 150}>
        <Link className={cls.links} to={`/movie/${movie.id}`}>
          <img
            className={cls.image}
            alt={movie.title}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://www.fillmurray.com/200/300'
            }
          />
          <Typography className={cls.title} variant="h5">{movie.title}</Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
