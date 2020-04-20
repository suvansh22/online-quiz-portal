import React from 'react'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

const useStyles=makeStyles((theme)=>({
    primary:{color:"yellow"}
}))
export default function QuizCreated(props){
    const classes=useStyles()
    function CreateQuiz(){
        props.history.replace({pathname:'/'})
    }
    return(
        <div>
            <ErrorOutlineIcon style={{height:"70%",width:"70%"}}color={'primary'}classes={{colorPrimary:classes.primary}}/>
            <br/>
            <span style={{fontFamily:"'Baloo Paaji 2', cursive"}}>Quiz already created</span>
            <br/>
            <Button onClick={CreateQuiz} style={{marginTop:"10%"}} variant="contained" color="primary">
            Create New Quiz
            </Button>
        </div>
    )
}