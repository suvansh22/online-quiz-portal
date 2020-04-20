import React from 'react'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles=makeStyles((theme)=>({
    primary:{color:"green"}
}))
export default function QuizCreated(props){
    const classes=useStyles()
    return(
        <div>
            <CheckCircleOutlineIcon style={{height:"70%",width:"70%"}}color={'primary'}classes={{colorPrimary:classes.primary}}/>
            <br/>
            <span style={{fontFamily:"'Baloo Paaji 2', cursive"}}>Your quiz is created</span>
            <br/>
            <span style={{fontFamily:"'Baloo Paaji 2', cursive"}}>id:{props.match.params.id}</span>
        </div>
    )
}