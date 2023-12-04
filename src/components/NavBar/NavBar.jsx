import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Avatar, Button, Drawer, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import { AccountCircle, Brightness4, Brightness7, Menu } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import { setUser, userSelector } from '../../features/auth';
// eslint-disable-next-line import/no-cycle
import { Search, Sidebar } from '..';
import { createSessionId, fetchToken, movieApi } from '../../utils';
import useStyles from './styles';

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user } = useSelector(userSelector);
  const dispatch = useDispatch();

  const cls = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  // const isAuthenticated = false;
  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await movieApi.get(`/account?sessen_id=${sessionIdFromLocalStorage}`);
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await movieApi.get(`/account?sessen_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={cls.toolbar}>

          {
            isMobile
            && (
              <IconButton
                color="inherit"
                edge="start"
                style={{ outline: 'none' }}
                onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                className={cls.menuButton}
              >
                <Menu />
              </IconButton>
            )
          }

          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            style={{ outline: 'none' }}
            onClick={() => {}}
            className={cls.menuButton}
          >
            { theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 /> }
          </IconButton>

          { !isMobile && <Search /> }

          <div>
            {
              !isAuthenticated
                ? (
                  <Button color="inherit" onClick={fetchToken}>
                    Login &nbsp; <AccountCircle />
                  </Button>
                )
                : (
                  <Button
                    color="inherit"
                    component={Link}
                    to={`/profile/${user.id}`}
                    className={cls.linkButton}
                    onClick={() => {}}
                  >
                    { !isMobile && <>My Movies &nbsp;</> }
                    <Avatar style={{ width: 30, height: 30 }} alt="Profile" src="" />
                  </Button>
                )
            }
          </div>

          { isMobile && <Search /> }

        </Toolbar>
      </AppBar>

      <div>
        <nav className={cls.drawer}>
          {
            isMobile
              ? (
                <Drawer
                  variant="temporary"
                  anchor="right"
                  open={mobileOpen}
                  onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                  cls={{ paper: cls.drawerPaper }}
                  ModalProps={{ keepMounted: true }}
                >
                  <Sidebar setMobileOpen={setMobileOpen} />
                </Drawer>
              )
              : (
                <Drawer cls={{ paper: cls.drawerPaper }} variant="permanent" open>
                  <Sidebar setMobileOpen={setMobileOpen} />
                </Drawer>
              )
          }
        </nav>
      </div>
    </>
  );
};

export default NavBar;
