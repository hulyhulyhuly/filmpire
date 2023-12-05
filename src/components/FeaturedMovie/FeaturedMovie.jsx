import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import useStyles from './styles';

const FeaturedMovie = ({ movie }) => {
  const cls = useStyles();

  if (!movie) {
    return null;
  }

  return (
    <Box component={Link} to={`/movie/${movie.id}`} className={cls.featuredCardContainer}>
      <Card className={cls.card} classes={{ root: cls.cardRoot }}>
        <CardMedia
          media="picture"
          title={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie.title}
          className={cls.cardMedia}
        />
        <Box padding="1.25rem">
          <CardContent className={cls.cardContent} classes={{ root: cls.cardContentRoot }}>
            <Typography variant="h5" gutterBottom>{movie.title}</Typography>
            <Typography variant="body2">{movie.overview}</Typography>
          </CardContent>

        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
