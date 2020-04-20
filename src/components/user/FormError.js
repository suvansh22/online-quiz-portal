import React from 'react';
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    roots:{
        marginLeft:"23%",
        border:"1px solid red",
        width:"55%",
        backgroundColor:"#ef9a9a",
        WebkitTextFillColor:"black",
        [theme.breakpoints.down(400)]:{
            marginLeft:"12%",
            marginRight:"10%",
            width:"75%",
        }
    }
}))

const FormError = ({children, errors, name}) => {
    const classes=useStyles()
    const error = errors[name] || null;

  if (!error) { return null; }

  return <Paper className={classes.roots} children={children(error.message)}></Paper>
}

export default FormError;