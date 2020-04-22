import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight:"0px",
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
}));

function Login(props) {
  const classes = useStyles();
  function handleClick(){
    props.history.push({pathname:'/createQuiz'})
  }
  
  function handleTitle(){
    props.history.push({pathname:'/'})
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography onClick={handleTitle} style={{cursor:"pointer"}} variant="h6" className={classes.title}>
            Quiz&nbsp;Time
          </Typography>
          {sessionStorage.getItem('quizname')?<span style={{margin:"auto",WebkitTextFillColor:"black"}}><b>{sessionStorage.getItem("quizname")}</b></span>:null}
          {sessionStorage.getItem("name")?<span style={{marginLeft:"auto"}}>{sessionStorage.getItem("name")}</span>:<Button style={{marginLeft:"auto"}} onClick={handleClick} color="inherit">Create Quiz</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Login)