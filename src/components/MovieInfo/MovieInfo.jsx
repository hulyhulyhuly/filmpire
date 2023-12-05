import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Box, Button, ButtonGroup, Grid, Modal, Rating, Typography } from '@mui/material';
import { ArrowBack, Favorite, FavoriteBorderOutlined, Movie as MovieIcon, Language, PlusOne, Remove, Theaters } from '@mui/icons-material';

import { selectGenreOrCate } from '../../features/currentGenreOrCate';
import { useGetMovieQuery, useGetListQuery, useGetRecommendationsQuery, useChangeListMutation } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import useStyles from './styles';
import { MovieList } from '..';
import { userSelector } from '../../features/auth';

const MovieInfo = () => {
  const { id } = useParams();
  const { user } = useSelector(userSelector);
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, page: 1 });
  const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, page: 1 });
  const { data: recommendations } = useGetRecommendationsQuery({ id, list: '/recommendations' });
  const [changeList] = useChangeListMutation();

  const [open, setOpen] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const dispatch = useDispatch();

  const cls = useStyles();
  const img_path = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((m) => m?.id === data?.id));
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((m) => m?.id === data?.id));
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    await changeList({
      user_id: user.id,
      type: 'favorite',
      body: {
        media_type: 'movie',
        media_id: id,
        favorite: !isMovieFavorited,
      },
    });
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await changeList({
      user_id: user.id,
      type: 'watchlist',
      body: {
        media_type: 'movie',
        media_id: id,
        watchlist: !isMovieWatchlisted,
      },
    });
    setIsMovieWatchlisted((prev) => !prev);
  };

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
      <Grid item sm={12} lg={4} style={{ display: 'flex', marginBottom: '2rem' }}>
        <img className={cls.poster} alt={data?.title} src={`${img_path}/${data?.poster_path}`} />
      </Grid>

      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          { data?.title } { data?.release_date.split('-')[0] }
        </Typography>

        <Typography variant="h5" align="center" gutterBottom>
          { data?.tagline }
        </Typography>

        <Grid item className={cls.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} precision={0.1} />
            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>{data?.vote_average} / 10</Typography>
          </Box>

          <Typography variant="h6" align="center" gutterBottom>
            { data?.runtime }min | Language: { data?.spoken_languages[0].name }
          </Typography>
        </Grid>

        <Grid item container className={cls.genresContainer}>
          { data?.genres?.map((g) => (
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
                <img className={cls.castImage} src={`${img_path}/${c.profile_path}`} />
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
                  Watchlist
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
          recommendations?.results.length
            ? <MovieList movies={recommendations} numberOfMovies={12} />
            : <Typography variant="subtitle2" align="center">Sorry, nothing was found.</Typography>
        }
      </Box>

      <Modal closeAfterTransition className={cls.modal} open={open} onClose={() => setOpen(false)}>
        { data?.videos?.results?.length > 0 && (
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
