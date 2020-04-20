import React from 'react'
import BlockIcon from '@material-ui/icons/Block';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

const useStyles=makeStyles((theme)=>({
    primary:{color:"red"}
}))
export default function QuizCreated(props){
    const classes=useStyles()
    function CreateQuiz(){
        props.history.replace({pathname:'/'})
    }
    return(
        <div>
            <BlockIcon style={{height:"70%",width:"70%"}}color={'primary'} classes={{colorPrimary:classes.primary}}/>
            <br/>
            <span style={{fontFamily:"'Baloo Paaji 2', cursive"}}>Result was found with given id</span>
            <br/>
            <Button onClick={CreateQuiz} style={{marginTop:"10%"}} variant="contained" color="primary">
            Create Quiz
            </Button>
        </div>
    )
}