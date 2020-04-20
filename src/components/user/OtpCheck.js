import React from 'react'
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import TextField from '@material-ui/core/TextField'
import {useForm} from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles';
import FormError from './FormError'
import Button from '@material-ui/core/Button'
import {checkOtp,inputUserInfo} from '../Connection'
import {withRouter} from 'react-router-dom'


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

function OtpCheck(props){
    const classes=useStyles();
    const {register,errors,handleSubmit}=useForm();
    const {userinfo,getOtp} = props

    
    const handlecheckOtp=async(registerData)=>{
        let reqotp=registerData.otp;
        let completeinfo={...userinfo}
        completeinfo.otp=reqotp
        await checkOtp(completeinfo).then(async(res)=>{
            if(res.data.Result)
            {
                    await inputUserInfo(userinfo).then(async(res)=>{
                    await sessionStorage.setItem('id',res.data.id)
                    await sessionStorage.setItem('quizid',userinfo.quizid)
                    await sessionStorage.setItem('name',userinfo.name)
                    console.log("A:",res.data)
                    await sessionStorage.setItem('quizname',res.data.title)
                    props.history.replace({pathname:`/quizpage/${userinfo.quizid}/${res.data.id}`})
                })
                .catch(error=>console.log("AS:",error)
                )
            }
            else
            {
                alert("Something went wrong")
            }
        })
        .catch(error=>{
            alert(error.response.data.message)
        })
    }


    return(
        <Paper className={classes.roots}>
            <form onSubmit={handleSubmit(handlecheckOtp)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    label="OTP"
                    name="otp"
                    id="otp"
                    inputRef={register({required:{value:true,message:"Enter OTP"},minLength:{value:4,message:"Invalid OTP"},maxLength:{value:4,message:"Invalid OTP"}})}
                    />
                    <FormError errors={errors} name="otp">
                    {(message) => <p>{message}</p>}
                    </FormError>
                </Grid>
                <Grid item xs={6}>
                <Button type="submit" name="otp" color="primary" variant="contained">Start Test</Button>
                </Grid>
                <Grid item xs={6}>
                <Button  name="otpResend" onClick={getOtp} color="primary" variant="contained">OtpResend</Button>
                </Grid>
            </Grid>
            </form>
        </Paper>
    )
}


export default withRouter(OtpCheck)