import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Button, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import { AccountCircle, Brightness4, Brightness7, Menu } from '@mui/icons-material';

import { useTheme } from '@mui/material/styles';

import useStyles from './styles';

const NavBar = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = true;

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>

        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            style={{ outline: 'none' }}
            onClick={() => {}}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
        )}

        <IconButton
          color="inherit"
          sx={{ ml: 1 }}
          style={{ outline: 'none' }}
          onClick={() => {}}
          className={classes.menuButton}
        >
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {!isMobile && 'Search...'}

        <div>
          {!isAuthenticated
            ? (
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            )
            : (
              <Button
                color="inherit"
                component={Link}
                to="/profile/:id"
                onClick={() => {}}
                className={classes.linkButton}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar style={{ width: 30, height: 30 }} alt="Profile" src="" />
              </Button>
            )}
        </div>
        {isMobile && 'Search...'}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
