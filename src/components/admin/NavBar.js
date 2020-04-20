import React from 'react';
import { fade,makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx'
import Menu from '@material-ui/core/Menu'
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  icon:{
      display:'none',
    [theme.breakpoints.down(400)]:{
        display:'block'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    WebkitTextFillColor:"#bb39db",
    fontWeight:"bold",
    textShadow:"2px 0px #bb39db",
    [theme.breakpoints.down(400)]:{
        fontSize:"100%"
    }
  },
  button:{
      flexGrow:1,
  },
  loginButton:{
    display:'block',
    [theme.breakpoints.down(400)]:{
        display:'none'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: '100%',
    marginLeft:"5px",
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const[anchorEL,setAnchorEL]=React.useState(null);

  function handleProfileMenu(event){
      setAnchorEL(event.currentTarget)
  }

  function handlecloseProfileMenu(){
    setAnchorEL(null)
}

  const loginButton=(<Menu
                        anchorEl={anchorEL}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        id="login"
                        open={Boolean(anchorEL)}
                        onClose={handlecloseProfileMenu}
                        keepMounted>
                        <MenuItem>Login</MenuItem>
                    </Menu>)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            QUIZ&nbsp;TIME
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div  className={classes.button}/>
          <Button color="inherit" className={classes.loginButton}>Login</Button>
          <IconButton
            className={clsx(classes.menuButton,classes.icon)}
            color="inherit"
            aria-controls="login"
            aria-haspopup="true"
            onClick={handleProfileMenu}
          >
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {loginButton}
    </div>
  );
}