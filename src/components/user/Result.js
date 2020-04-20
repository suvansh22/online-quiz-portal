import React,{useCallback} from 'react'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'

const useStyles=makeStyles((theme)=>({
    root:{
        width:"60%",
        [theme.breakpoints.down(400)]:{
            width:"100%"
        }
    }
}))

function Result(props){
    const {quizinfo,score,totalquestion}=props.location.state
    const classes=useStyles()

    const UserAuthentication=useCallback(async()=>{
        if(sessionStorage.getItem("quizid"))
        {
          let quizid = sessionStorage.getItem("quizid")
          let id = sessionStorage.getItem("id")
          if(quizid !== props.match.params.id || id !== props.match.params.uid)
            {
                props.history.replace({pathname:`/ResultNotFound/${props.match.params.id}/${props.match.params.uid}`})
            }
        }
        else
        {
            props.history.replace({pathname:`/ResultNotFound/${props.match.params.id}/${props.match.params.uid}`})
        }
        },[props.match.params.id,props.match.params.uid,props.history])

    React.useState(()=>{
        UserAuthentication()
    },[UserAuthentication])
return(
    <Paper className={classes.root}>
        <span><h1>Your Score:</h1></span>
        <br/>
        {quizinfo.part1===""?null:<div><span>{quizinfo.part1}&nbsp;:&nbsp;</span><span>{score.part1}/{totalquestion.part1}</span></div>}
        <br/>
        {quizinfo.part2===""?null:<div><span>{quizinfo.part2}&nbsp;:&nbsp;</span><span>{score.part2}/{totalquestion.part2}</span></div>}
        <br/>
        {quizinfo.part3===""?null:<div><span>{quizinfo.part3}&nbsp;:&nbsp;</span><span>{score.part3}/{totalquestion.part3}</span></div>}
    </Paper>
)
}

export default Result