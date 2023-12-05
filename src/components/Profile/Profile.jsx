import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

import { userSelector } from '../../features/auth';
import { useGetListQuery } from '../../services/TMDB';
import RatedCards from '../RatedCards/RatedCards';

// Get access to profile name or id from redux state
// display in the profile component

const Profile = () => {
  const { user } = useSelector(userSelector);

  const { data: favoriteMovies, refetch: refetchFavorite } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, page: 1 });
  const { data: watchlistMovies, refetch: refetchWatchlist } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, page: 1 });

  useEffect(() => {
    refetchFavorite();
    refetchWatchlist();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile - {user.username}</Typography>
        <Button color="inherit" onClick={logout}>Logout &nbsp; <ExitToApp /></Button>
      </Box>
      {
        !favoriteMovies?.results?.length && !watchlistMovies?.results?.length
          ? <Typography>Add favorites or watchlist some movies to see them here!</Typography>
          : (
            <Box>
              <RatedCards title="Favorite Movies" data={favoriteMovies} />
              <RatedCards title="Watchlist Movies" data={watchlistMovies} />
            </Box>
          )
      }
    </Box>
  );
};

export default Profile;
