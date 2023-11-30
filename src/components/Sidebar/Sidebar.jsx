import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, CircularProgress, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { useTheme } from '@mui/styles';

import { useGetGenresQuery } from '../../services/TMDB';
import useStyles from './styles';

const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const cates = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

// const demoCates = [
//   { label: 'Comedy', value: 'comedy' },
//   { label: 'Action', value: 'action' },
//   { label: 'Horror', value: 'horror' },
//   { label: 'Animation', value: 'animation' },
// ];

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching } = useGetGenresQuery();

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? blueLogo : redLogo}
          alt="Filmpire Logo"
        />
      </Link>

      <Divider />

      <List>
        <ListSubheader>Categories</ListSubheader>
        {cates.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => {}}>
              {/* <ListItemIcon>
                <img src={redLogo} className={classes.genreImages} height={30} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />

      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching
          ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )
          : (
            data.genres.map(({ name }) => (
              <Link key={name} className={classes.links} to="/">
                <ListItem onClick={() => {}}>
                  {/* <ListItemIcon>
                <img src={redLogo} className={classes.genreImages} height={30} />
              </ListItemIcon> */}
                  <ListItemText primary={name} />
                </ListItem>
              </Link>
            ))
          )}
      </List>
    </>
  );
};

export default Sidebar;
