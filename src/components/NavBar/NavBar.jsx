import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Button, Drawer, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import { AccountCircle, Brightness4, Brightness7, Menu } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

// eslint-disable-next-line import/no-cycle
import { Sidebar } from '..';
import useStyles from './styles';

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = true;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>

          {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            style={{ outline: 'none' }}
            onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
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
      <div>
        <nav className={classes.drawer}>
          {isMobile
            ? (
              <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                classes={{ paper: classes.drawerPaper }}
                ModalProps={{ keepMounted: true }}
              >
                <Sidebar setMobileOpen={setMobileOpen} />
              </Drawer>
            )
            : (
              <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
                <Sidebar setMobileOpen={setMobileOpen} />
              </Drawer>
            )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;