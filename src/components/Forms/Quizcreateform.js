import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import {useForm} from 'react-hook-form'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import ReceiptIcon from '@material-ui/icons/Receipt';
import {createQuiz} from '../Connection'
import {connect} from 'react-redux'
import {saveQuiz,getQuiz} from '../Redux/actions'

const useStyles = makeStyles(theme=>({
    roots:{
        width:"60%",
        height:"100%",
        padding:"1%",
        backgroundColor:"white",
        [theme.breakpoints.down(400)]:{
            width:"80%"
        }
    },
    parts:{
        border:"0px solid white",
    },
    partbutton:{
        //border:"1px solid",
        WebkitTextFillColor:"black",
        height:"100%",
        width:"15%",
        cursor:"ponter",
        '&:hover':{backgroundColor:"red",
                WebkitTextFillColor:"white"              
        },
        '&:focus':{backgroundColor:"green",
             WebkitTextFillColor:"white"              
        }
    },input: {
        display: 'none',
      },
}))

function valuetext(value) {
    return `${value}min`;
  }

function Quizcreateform(props){
    const classes = useStyles();
    const[parts,setParts]=React.useState(1);
    const[valuechange,setvaluechange]=React.useState({timebound:"No",Result:"In the end"})
    var {handleSubmit,register}=useForm()
    const[timelimit,setTimelimit]=React.useState(10);
    const {dispatch} = props

    const handlepartButton=(value)=>{
        setParts(value);
        }

    const handleChangeSlider=(event,newValue)=>{
        setTimelimit(newValue)
    }
    async function formSubmit(registerData){
        // dispatch(saveQuiz(registerData))
        createQuiz(registerData).then(res=>{
            props.history.replace({pathname:`/QuestionAnswerForm/${res.data["id"]}`})
        })
    }

    function handleChange(event){
        setvaluechange({...valuechange,[event.target.name]:event.target.value})
    }

    const timeSlider=(
        <React.Fragment>
        <Grid item xs={12} sm={4}>Time Limit</Grid>
        <Grid item xs={12} sm={8}>
            <input
            name="timeLimit"
            ref={register}
            value={timelimit}
            style={{display:"none"}}
            readOnly/>
            <Slider
        defaultValue={10}
        value={timelimit}
        getAriaValueText={valuetext}
        onChange={handleChangeSlider}
        aria-labelledby="timelimit"
        step={10}
        marks
        min={10}
        max={180}
        valueLabelDisplay="auto"
      />
      </Grid>
        </React.Fragment>
    )
    
    const part2=(
        <React.Fragment>
            <Grid item xs={false} sm={4}></Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                size="small"
                name="part2"
                label="Part 2"
                id="Part 2"
                inputRef={register}
                required
                variant="outlined"/>
                </Grid>
            <Grid item xs={false} sm={4}></Grid>
            </React.Fragment>
        )

    const part3=(
        <React.Fragment>
        <Grid item sm={4} xs={false}></Grid>
        <Grid item xs={12} sm={4}>
            <TextField
            size="small"
            name="part3"
            label="Part 3"
            id="Part 3"
            inputRef={register}
            required
            variant="outlined"/>
            </Grid>
        <Grid item sm={4} xs={false}></Grid>
        </React.Fragment>)


    return(
        <Paper className={classes.roots}>
            <form onSubmit={handleSubmit(formSubmit)}>
            <Grid container spacing={2}>
                <Grid style={{textAlign:"center"}} item xs={12} sm={4}>
                    <span >Quiz Name</span>
                </Grid>
                <Grid item xs={12} sm={4} style={{}}>
                    <TextField
                    inputRef={register}
                    required
                    size="small"
                    name="quizname"
                    id="quizname"
                    variant="outlined"
                    />
                    
                </Grid>
                <Grid item sm={4} xs={false}></Grid>
                <Grid style={{textAlign:"center"}} item xs={12} sm={4}>
                    <span>Quiz parts</span>
                </Grid>
                <Grid item xs={12} sm={4}>
                            <input
                        name="noofParts"
                        ref={register}
                        value={parts}
                        style={{display:"none"}}
                        readOnly/>
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button name="1" onClick={()=>handlepartButton(1)}>One</Button>
                        <Button name="2" onClick={()=>handlepartButton(2)}>Two</Button>
                        <Button name="3" onClick={()=>handlepartButton(3)}>Three</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item sm={4} xs={false}></Grid>
                <Grid item xs={12} sm={4} style={{textAlign:"center"}}>
                    <span>Part Title</span>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                    name="part1"
                    label="Part 1"
                    size="small"
                    id="Part 1"
                    inputRef={register}
                    required
                    variant="outlined"/>
                    </Grid>
                <Grid item xs={false} sm={4}></Grid>
                {parts>1?part2:null}
                {parts>2?part3:null}
                <Grid item xs={12} sm={4}><span>Time Bounded</span></Grid>
                <Grid item xs={12} sm={8}>
                <RadioGroup style={{display:"flex",flexDirection:"row"}} aria-label="timebound" name="timebound" value={valuechange.timebound} onChange={handleChange}>
                    <FormControlLabel value="Yes" control={<Radio inputRef={register}/>} label="Yes" />
                    <FormControlLabel value="No" control={<Radio inputRef={register}/>} label="No" />
                </RadioGroup>
                </Grid>
                {valuechange.timebound==="Yes"?timeSlider:null}
                <Grid item xs={12} sm={4}>Result</Grid>
                <Grid item xs={false} sm={6}>
                <RadioGroup style={{display:"flex",flexDirection:"row"}} aria-label="Result" name="Result" value={valuechange.Result} onChange={handleChange}>
                    <FormControlLabel value="Simultaneously" control={<Radio inputRef={register}/>} label="Simultaneously" />
                    <FormControlLabel value="In the end" control={<Radio inputRef={register}/>} label="In the end" />
                </RadioGroup>
                </Grid>
                <Grid item xs={12} sm={2}></Grid>
                <Grid item xs={false} sm={4}></Grid>
                <Grid item xs={12} sm={4}><Button type="submit" variant="contained" startIcon={<ReceiptIcon/>} color="primary">Create</Button></Grid>
                <Grid item xs={false} sm={4}></Grid>
            </Grid>
            </form>
        </Paper>
    )
}

// const mapStateToProps= state=>{
//     return{
//         quizData:state.quiztempdata
//     }
// }

export default Quizcreateform