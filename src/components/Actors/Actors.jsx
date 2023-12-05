import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import useStyles from './styles.js';
import { useGetActorQuery, useGetMovieByActorIdQuery } from '../../services/TMDB';
import { MovieList, Pagination } from '..';

const Actors = () => {
  const [page, setPage] = useState(1);
  const { id } = useParams();

  const { data, isFetching, error } = useGetActorQuery(id);
  const { data: movies } = useGetMovieByActorIdQuery(id);

  const history = useHistory();
  const cls = useStyles();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button color="primary" startIcon={<ArrowBack />} onClick={() => history.goBack()}>Go back</Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img className={cls.actorImage} src={`https://image.tmdb.org/t/p/w780${data?.profile_path}`} />
        </Grid>

        <Grid item lg={7} xl={8} style={{}}>
          <Typography variant="h2" gutterBottom>{ data?.name }</Typography>
          <Typography variant="h5" gutterBottom>{ `Born: ${new Date(data?.birthday).toDateString()}` }</Typography>
          <Typography variant="body2" align="justify" paragraph>{ data?.biography || 'Sorry, no biography yet...' }</Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around" alignItems="center">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
            <Button startIcon={<ArrowBack />} onClick={() => history.goBack()}>BACK</Button>
          </Box>
        </Grid>
      </Grid>

      <Box margin="2rem 0">
        <Typography variant="h2" align="center" gutterBottom>Movies</Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
        <Pagination currentPage={page} setPage={setPage} totalPages={movies.total_pages} />
      </Box>
    </>
  );
};

export default Actors;
