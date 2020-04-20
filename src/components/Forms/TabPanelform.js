import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

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
}))
export default function TabPanelform({part,handleAdd,handleRemove,handleChange,field,handleSubmit}){
    const classes=useStyles()
    React.useEffect(()=>{
        field[0].part="part1"
    },[])

    return(
        <Paper className={classes.roots}>
            <form  onSubmit={(event)=>handleSubmit(event,part)}>
            <Grid container spacing={2}>
                {field.map((field,idx)=>{
                    return(
                        <React.Fragment key={idx}>
                        <Grid item xs={12} sm={12}>
                            <span>Question&nbsp;{idx+1}</span>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            name="question"
                            required
                            className={classes.question}
                            multiline
                            variant="outlined"
                            label="Question"
                            value={field["question"]}
                            onChange={(event)=>handleChange(idx,event)}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <TextField
                            name="option1"
                            required
                            variant="outlined"
                            label="Option1"
                            value={field["option1"]}
                            onChange={(event)=>handleChange(idx,event)}
                            />
                            </Grid> 
                        <Grid item xs={6} sm={3}>
                            <TextField
                            name="option2"
                            required
                            variant="outlined"
                            label="Option2"
                            value={field["option2"]}
                            onChange={(event)=>handleChange(idx,event)}
                            />
                            </Grid> 
                        <Grid item xs={6} sm={3}>
                            <TextField
                            name="option3"
                            required
                            variant="outlined"
                            label="Option3"
                            value={field["option3"]}
                            onChange={(event)=>handleChange(idx,event)}
                            />
                            </Grid> 
                        <Grid item xs={6} sm={3}>
                            <TextField
                            name="option4"
                            required
                            variant="outlined"
                            label="Option4"
                            value={field["option4"]}
                            onChange={(event)=>handleChange(idx,event)}
                            />
                            </Grid> 
                        <Grid item xs={6} sm={3}>
                        <FormControl required variant="outlined" style={{minWidth:"100%"}}>
                        <InputLabel id="answer" key={idx}>Answer</InputLabel>
                            <Select
                                inputProps={{
                                name: 'answer',
                                id: 'answer'
                                }}
                                labelId="answer"
                                label="Answer"
                                autoWidth={true}
                                id="answer"
                                name="answer"
                                value={field['answer']?field['answer']:field['option1']}
                                onChange={(event)=>handleChange(idx,event)}
                                >
                                {Object.keys(field).map((key,index)=>{if(index>2 && index<7){
                                return<MenuItem value={key} key={index}>{field[key]}</MenuItem>
                                }})}
                            </Select>
                            </FormControl>
                        </Grid> 
                            </React.Fragment>)
                })}
            </Grid>
            <div style={{marginTop:"5%",display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
            <Fab onClick={()=>handleAdd('part1')} disabled={field.length>=30?true:false} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
            <Fab onClick={handleRemove} disabled={field.length===1?true:false} color="primary" aria-label="add">
                <DeleteRoundedIcon />
            </Fab>
            <Fab type="submit" disabled={field.length>=1?false:true} color="primary" aria-label="add">
                <SaveRoundedIcon />
            </Fab>
            </div>
            </form>
        </Paper>
    )
}