import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { mainListItems, secondaryListItems } from './listItems';
import { Button, Grid, Container, Badge, IconButton, Divider, Typography, List, Toolbar, Link, Card, CardContent, Checkbox, Paper } from '@mui/material';



const lgStyle = {
  flexGrow: 1,
  background: "-webkit-linear-gradient(180deg, rgba(230, 0, 40, 0.723958) 0%, #F4B30B 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  TextFillColor: 'transparent',
  letterSpacing: '0.1rem',
  fontSize: 33,
  fontWeight: 800,
  fontStyle: 'normal',
  fontFamily: 'Caveat Brush',
} as const;


const drawerWidth: number = 240;

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export default function Dashboard(): JSX.Element {
  const [open, setOpen] = React.useState(true);
  const [check, setCheck] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleCheckBox = () => {
    setCheck(!check);
    console.log(check);
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar sx={{ backgroundColor: "#FFFFFF" }} position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={lgStyle}
          >
            HACKERMIT
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
            backgroundColor: "#FFFFFF",
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          bgcolor: '#DCDCDC',
        }}
      >
        <Toolbar />
        <Grid >
          <Grid item>
            <Box width='98%' sx=
              {{
                py: 1.5,
                mx: 2,
                my: 2,
                bgcolor: 'white',
                borderRadius: 3.5,
              }}>
              <Button variant="contained" startIcon={<AddIcon />} sx={{ ml: 2 }}>Add exam</Button>
              <Button variant="contained" sx={{ ml: 2 }}>Weekly Details</Button>
              <Button variant="contained" sx={{ ml: 2 }}>Move to category</Button>
              <Button variant="contained" sx={{ ml: 2 }}>Move to archiev</Button>
            </Box>
          </Grid>
          <Grid item>
            <Box width='98%' sx=
              {{
                py: 1,
                mx: 2,
                my: 2,
                bgcolor: 'white',
                borderRadius: 3.5,
                height: '80vh',
              }}>
              {/* Page Content */}
              <Grid container spacing={2} direction="column"
                justifyContent="center"
                alignItems="center">
                <Grid item sx={{ width: '90%' }}>
                  <Box mb={3}>
                    <Paper>
                      <Box p={2}>
                        <Grid container alignItems="center" spacing={1}>
                          {check === false ?
                            <IconButton onClick={handleCheckBox}>
                              <CheckBoxOutlineBlankIcon />
                            </IconButton> :
                            <IconButton onClick={handleCheckBox}>
                              <CheckBoxIcon />
                            </IconButton>}
                          <Grid item>
                            <img src="https://picsum.photos/200/300" alt="hehe" width="100%" />
                          </Grid>
                          <Grid item>
                            <Typography>hehe</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4, bgcolor: 'white' }} />
      </Box>
    </Box>
  );
}
