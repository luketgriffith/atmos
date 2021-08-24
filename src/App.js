import React, { useState, useEffect } from 'react'
import {
  Route,
  NavLink,
  useLocation
} from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import routes from './routes'
import { useDispatch } from 'react-redux'
import { getAllData } from './actions'
const drawerWidth = 240;

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // load all the data for our app into redux
  useEffect(() => {
    dispatch(getAllData())
  }, [])

  // set up route names so links have right active class
  const location = useLocation();
  const { pathname } = location;
  const routeName = pathname.split('/')[1];

  return (
      <div style={{ display: 'flex' }}>
       <Drawer
         className={classes.drawer}
         variant="permanent"
         classes={{
           paper: classes.drawerPaper,
         }}
         anchor="left"
       >
           <NavLink to="/homes" className={routeName === 'homes' || routeName === "" ? classes.active : classes.link}>Home Plans</NavLink>
           <NavLink to="/lots" className={routeName === 'lots' ? classes.active : classes.link}>Lots</NavLink>
         </Drawer>

         <div style={{ flex: 1, padding: '10px' }}>
           {routes.map((route) => (
             <Route
               key={route.path}
               path={route.path}
               exact={route.exact}
             >
               <route.main />
             </Route>
           ))}
         </div>
      </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    padding: 24
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  link: {
    marginBottom: 6,
    fontSize: 18,
    textDecoration: 'none'
  },
  active: {
    marginBottom: 6,
    fontSize: 18,
    textDecoration: 'none',
    color: 'red'
  }
}));

export default App;
