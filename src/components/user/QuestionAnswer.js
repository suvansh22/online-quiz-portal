import React from 'react'
import NextWeekIcon from '@material-ui/icons/NextWeek';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Alert, AlertTitle } from '@material-ui/lab';

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
      margin: theme.spacing(0.5),
      border: 'none',
      padding: theme.spacing(0, 1),
      '&:not(:first-child)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-child': {
        borderRadius: theme.shape.borderRadius,
      },
    },
  }))(ToggleButtonGroup);

const useStyles=makeStyles((theme)=>({
    question:{
        width:"100%"
    },
    roots:{
        padding:"1%"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: "100%",
    },
    root:{
        backgroundColor:"orange",
        width:"auto",
        marginLeft:"1%",
        '&:hover':{
            border:"2px solid black"
            },
            '&$wrong':{backgroundColor:"red"},
            '&$right':{backgroundColor:"green"}
    },
    disable:{
        '&:disabled':{
            WebkitTextFillColor:"grey",
        },
    },
    wrong:{},
    right:{},
}))

function QuestionAnswer({part,quizinfo,partname,handleScore}){
    const classes=useStyles()
    const [idx,setIdx] = React.useState(0)
    const [option,setOption]=React.useState("")
    const[classname,setClassName]=React.useState("")
    const [alertgo,setAlertgo] = React.useState(false)
    function nextQuestion(){
        var localalert
        if(option==="" && !alertgo)
        {
            setAlertgo(true)
            localalert=true
        }
        else
        {
            setAlertgo(false)
            localalert-=false
        }
        if(!localalert)
        {
            setIdx(idx+1)
            setOption("")
            setClassName()
        }
    }   


    const handleChangeOption = async(event, newOption) => {
        setOption(newOption);
        if(quizinfo.Result==='Simultaneously')
        {
            if(newOption===part[idx]['answer'])
            {
                setClassName(classes.right)
                await handleScore(1,partname)
            }
            else
            {
                await handleScore(0,partname)
                setClassName(classes.wrong)
            }
        }
        else
        {
            if(newOption===part[idx]['answer'])
            {
                await handleScore(1,partname)
            }
            else
            {
                await handleScore(0,partname)
            }
        }
      };

    return(
        <div style={{display:"flex",flexDirection:"column"}}>
            <div>
                <span><b>Question&nbsp;{idx+1}</b></span>
            </div>
            <div>
                <ul style={{listStyleType:"square"}}>
                    <li>
                        <Typography style={{fontSize:"25px",textAlign:"left"}}>
                        {part[idx]["question"]}
                        </Typography>
                    </li>
                </ul>
            </div>
                    <div>
                    <StyledToggleButtonGroup
                    size="small"
                    value={option}
                    exclusive
                    onChange={option===""?handleChangeOption:null}
                    aria-label="option"
                    style={{display:"flex",flexDirection:"column",padding:"1px",WebkitTextFillColor:"black"}}
                    >
                    <ToggleButton classes={{root:classes.root,selected:classname,disabled:classes.disable}} disabled={quizinfo.Result==='Simultaneously'?option===""?false:true:false}  value="option1" aria-label="option1">
                        {part[idx]["option1"]}
                    </ToggleButton>
                    <ToggleButton style={{marginLeft:"1%"}} classes={{root:classes.root,selected:classname,disabled:classes.disable}} disabled={quizinfo.Result==='Simultaneously'?option===""?false:true:false} value="option2" aria-label="option2">
                        {part[idx]["option2"]}
                    </ToggleButton>
                    <ToggleButton style={{marginLeft:"1%"}} classes={{root:classes.root,selected:classname,disabled:classes.disable}} disabled={quizinfo.Result==='Simultaneously'?option===""?false:true:false} value="option3" aria-label="option3">
                        {part[idx]["option3"]}
                    </ToggleButton>
                    <ToggleButton style={{marginLeft:"1%"}} classes={{root:classes.root,selected:classname,disabled:classes.disable}} disabled={quizinfo.Result==='Simultaneously'?option===""?false:true:false} value="option4" aria-label="option4">
                        {part[idx]["option4"]}
                        </ToggleButton>
                        </StyledToggleButtonGroup>
                        </div>
                        <div>
                            <Button variant="contained" color="primary" disabled={part.length===idx+1?true:false} onClick={nextQuestion}>
                                Next
                            </Button>
                            </div>
                            {alertgo?<Alert severity="warning">
                                <AlertTitle>Warning</AlertTitle>
                                <strong>You have not selected any option!</strong>
                            </Alert>:null}
        </div>
    )
}

export default QuestionAnswer 
