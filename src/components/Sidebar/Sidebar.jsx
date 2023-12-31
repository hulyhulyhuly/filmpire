import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { useTheme } from '@mui/styles';

import { selectGenreOrCate } from '../../features/currentGenreOrCate';
import { useGetGenresQuery } from '../../services/TMDB';
import useStyles from './styles';
import genresIcons from '../../assets/genres';

const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const cates = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const Sidebar = ({ setMobileOpen }) => {
  const { genreIdOrCateName } = useSelector((state) => state.currentGenreOrCate);

  const { data, isFetching } = useGetGenresQuery();
  const theme = useTheme();
  const cls = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCateName]);

  return (
    <>
      <Link to="/" className={cls.imageLink}>
        <img
          className={cls.image}
          src={theme.palette.mode === 'light' ? blueLogo : redLogo}
          alt="Filmpire Logo"
        />
      </Link>

      <Divider />

      <List>
        <ListSubheader>Categories</ListSubheader>
        {cates.map(({ label, value }) => (
          <Link key={value} className={cls.links} to="/">
            <ListItem onClick={() => dispatch(selectGenreOrCate(value))}>
              <ListItemIcon>
                <img src={genresIcons[label.toLowerCase()]} className={cls.genreImages} height={30} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />

      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching
          ? <Box display="flex" justifyContent="center"><CircularProgress /></Box>
          : data.genres.map(({ id, name }) => (
            <Link key={id} className={cls.links} to="/">
              <ListItem onClick={() => dispatch(selectGenreOrCate(id))}>
                <ListItemIcon>
                  <img src={genresIcons[name.toLowerCase()]} className={cls.genreImages} height={30} />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))}
      </List>
    </>
  );
};

export default Sidebar;
