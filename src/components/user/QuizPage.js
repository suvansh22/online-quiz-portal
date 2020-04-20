import React,{useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import {getQuizInfoId} from '../Connection'
import QuestionAnswer from './QuestionAnswer'
import {QuestionLoader} from './QuestionLoader'
import ReactCountdownClock from 'react-countdown-clock'

const useStyles = makeStyles((theme) => ({
    roots:{
        width:"600px",
        height:"100%",
        backgroundColor:"white",
        [theme.breakpoints.down(400)]:{
            width:"80%"
        },
    },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  rootdiv:{
    display:"flex",
    flexDirection:"column"
  }
}));

export default function QuizPage(props) {
  const classes = useStyles();
  const [quizinfo,setQuizinfo] = React.useState({});
  const [questions,setQuestions] = React.useState({});
  const [score,setScore] = React.useState({"part1":0,"part2":0})

  const style={
    part1:{
      display:`${quizinfo.part1===""?"none":"block"}`
    },
    part2:{
      display:`${quizinfo.part2===""?"none":"block"}`
    },
      part3:{
        display:`${quizinfo.part3===""?"none":"block"}`
      }
  }

    const UserAuthentication=useCallback(async()=>{
    if(sessionStorage.getItem("quizid"))
    {
      let quizid = sessionStorage.getItem("quizid")
      let id = sessionStorage.getItem("id")
      if(quizid !== props.match.params.id || id !== props.match.params.uid)
      {
        props.history.replace(`/QuizNotAvailable/${props.match.params.id}/${props.match.params.uid}`)
      }
    }
    else
    {
      props.history.replace(`/QuizNotAvailable/${props.match.params.id}/${props.match.params.uid}`)
    }
    },[props.match.params.id,props.match.params.uid,props.history])

    const extractQuizinfo=useCallback(async()=>{
        let quizid = props.match.params.id
        await getQuizInfoId(quizid).then(res=>{setQuizinfo(res.data);})
                              .catch(error=>alert(error.reponese.data.message))
                              const total=await QuestionLoader(props.match.params.id)
                              setQuestions(total)

    },[props.match.params.id])

    const handleScore=(point,part)=>{
      let newValue=score[part]+point
      setScore({...score,[part]:newValue})
    }

    const handleSubmit =()=>{
      props.history.replace({pathname:`/Result/${props.match.params.id}/${props.match.params.uid}`,state:{quizinfo:quizinfo,score:score,totalquestion:{"part1":questions[0]?questions[0].length:0,"part2":questions[1]?questions[1].length:0,"part3":questions[2]?questions[2].length:0}}})
    }

  React.useEffect(()=>{
    UserAuthentication()
    extractQuizinfo()
  },[UserAuthentication,extractQuizinfo,])


  return (
    <div className={classes.rootdiv}>
      {quizinfo.timebound==="Yes"?<div style={{display:"flex",flexDirection:"row"}}>
      <ReactCountdownClock seconds={60*quizinfo.timeLimit}
                     color="#3f51b5"
                     alpha={0.9}
                     size={80}
                     onComplete={()=>{alert("hi");handleSubmit()}}
                     timeFormat="hms" />
      </div>:null}
    <Paper className={classes.roots}>
      <ExpansionPanel style={style.part1}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}><b>{quizinfo.part1}</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails  style={{justifyContent:"space-around"}}>
          {questions[0]?<QuestionAnswer part={questions[0]} quizinfo={quizinfo} partname="part1" handleScore={handleScore} />:null}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel style={style.part2}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}><b>{quizinfo.part2}</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails  style={{justifyContent:"space-around"}}>
          {questions[1]?<QuestionAnswer part={questions[1]} quizinfo={quizinfo} partname="part2" handleScore={handleScore}/>:null}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel style={style.part3}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}><b>{quizinfo.part3}</b></Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails  style={{justifyContent:"space-around"}}>
          {questions[2]?<QuestionAnswer part={questions[2]} quizinfo={quizinfo} partname="part3" handleScore={handleScore} />:null}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <div style={{padding:"1%"}}>
      <Button onClick={handleSubmit} variant="contained" color="primary" >Submit</Button>
      </div>
    </Paper>
    </div>
  );
}
