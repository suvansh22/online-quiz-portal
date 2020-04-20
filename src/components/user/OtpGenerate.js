import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import {useForm} from 'react-hook-form'
import Button from '@material-ui/core/Button'
import FormError from './FormError'

const useStyles = makeStyles(theme=>({
    roots:{
        width:"400px",
        height:"100%",
        padding:"1%",
        backgroundColor:"white",
        [theme.breakpoints.down(400)]:{
            width:"80%"
        }
    }
}))

function OtpGenerate({getOtp}){
    const classes=useStyles();
    const {handleSubmit,register,errors} = useForm();
    // eslint-disable-next-line
    const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    React.useState(()=>{
        sessionStorage.clear()
    },[])

    return(
        <Paper className={classes.roots}>
            <form onSubmit={handleSubmit(getOtp)}>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <TextField
                    type="email"
                    variant="outlined"
                    label="Email-id"
                    name="email"
                    id="email"
                    inputRef={register({required:{value:true,message:"! Email Required"},pattern:{value:EMAIL_PATTERN,message:"Not a valid email"}})}
                    />
                    <FormError errors={errors} name="email">
                    {(message) => <p>{message}</p>}
                    </FormError>
                </Grid>
                <Grid item xs={12}>
                    
                <TextField
                    variant="outlined"
                    label="Name"
                    name="name"
                    id="name"
                    inputRef={register({required:{value:true,message:"! Name is required"},minLength:{value:4,message:"Too Short"}})}
                    />
                    <FormError errors={errors} name="name">
                    {(message) => <p>{message}</p>}
                    </FormError>
                </Grid> 
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    label="Quiz Id"
                    name="quizid"
                    id="quizid"
                    inputRef={register({required:{value:true,message:"!Quiz id is required"},minLength:{value:22,message:"Not a valid id"}})}
                    />
                    <FormError errors={errors} name="quizid">
                    {(message) => <p>{message}</p>}
                    </FormError>
                </Grid>
                <Grid style={{WebkitTextFillColor:"black"}} item xs={12}>
                    <span>eg Quiz-id:</span>
                    <br/>
                    <span>5e9d53076ea85011fc28567e</span>
                </Grid>
                <Grid item xs={12}>
                        <Button type="submit" name="otp" color="primary" variant="contained">Generate otp</Button>
                </Grid>
            </Grid>
            </form>
        </Paper>
    )
}

export default OtpGenerate