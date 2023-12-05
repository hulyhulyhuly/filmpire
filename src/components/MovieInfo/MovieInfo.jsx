import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CircularProgress, Box, Button, ButtonGroup, Grid, Modal, Rating, Typography, useMediaQuery } from '@mui/material';
import { ArrowBack, Favorite, FavoriteBorderOutlined, Movie as MovieIcon, Language, PlusOne, Remove, Theaters, Mode } from '@mui/icons-material';

import { selectGenreOrCate } from '../../features/currentGenreOrCate';
import { useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import useStyles from './styles';
import { MovieList } from '..';

const MovieInfo = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: recommendations, isFetching: _isRecommendationsFetching, error: _recommendationsError } = useGetRecommendationsQuery({ id, list: '/recommendations' });
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const cls = useStyles();

  const isMovieFavorited = false;
  const addToFavorites = () => {};

  const isMovieWatchlisted = true;
  const addToWatchlist = () => {};

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        <Link to="/">Somethinh has gone wrong - Go back </Link>
      </Box>
    );
  }

  return (
    <Grid container className={cls.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          className={cls.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>

      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data?.release_date.split('-')[0]})
        </Typography>

        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>

        <Grid item className={cls.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>{data?.vote_average} / 10</Typography>
          </Box>

          <Typography variant="h6" align="center" gutterBottom>
            { data?.runtime }min /  { data?.spoken_languages.length > 0 ? `${data?.spoken_languages[0].name}` : '' }
          </Typography>
        </Grid>

        <Grid item container className={cls.genresContainer}>
          {data?.genres?.map((g) => (
            <Link key={g.name} className={cls.links} to="/" onClick={() => dispatch(selectGenreOrCate(g.id))}>
              <img src={genreIcons[g.name.toLowerCase()]} className={cls.gerneImages} height={30} />
              <Typography color="textPrimary" variant="subtitle1">{g.name}</Typography>
            </Link>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>Overview</Typography>
        <Typography style={{ marginBottom: '2rem' }}>{data?.overview}</Typography>

        <Typography variant="h5" gutterBottom>Top Cast</Typography>
        <Grid item container spacing={2}>
          {
            data && data.credits?.cast?.map((c, i) => (
              c.profile_path
              && (
              <Grid key={i} item xs={4} md={2} style={{ textDecoration: 'none' }} component={Link} to={`/actors/${c.id}`}>
                <img className={cls.castImage} src={`https://image.tmdb.org/t/p/w500/${c.profile_path}`} />
                <Typography color="textPrimary">{c.name}</Typography>
                <Typography color="textSecondary">{c.character.split('-')[0]}</Typography>
              </Grid>
              )
            )).slice(0, 6)
          }
        </Grid>

        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={cls.buttonContainer}>
            <Grid item xs={12} sm={6} className={cls.buttonContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button targer="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                <Button targer="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid>

            <Grid item xs={12} sm={6} className={cls.buttonContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  { isMovieFavorited ? 'Unfavorite' : 'Favorite' }
                </Button>

                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  { isMovieWatchlisted ? 'UnWatchlist' : 'Watchlist' }
                </Button>

                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main', textUnderline: 'none' }}>
                  <Typography style={{ textDecoration: 'none' }} component={Link} to="/" color="inherit" variant="subtitle2">Back</Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>

      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">You might also like</Typography>
        {
          recommendations
            ? <MovieList movies={recommendations} numberOfMovies={12} />
            : <Box>Sorry, nothing was found. </Box>
        }
      </Box>

      <Modal closeAfterTransition className={cls.modal} open={open} onClose={() => setOpen(false)}>
        {data?.videos.results.length && (
          <iframe
            className={cls.video}
            autoPlay
            title="Trailer"
            allow="autoplay"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            style={{ border: '0' }}
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInfo;
