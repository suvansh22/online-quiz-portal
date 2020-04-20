import React from 'react'
import {checkUserValidity} from '../Connection'
import OtpGenerate from './OtpGenerate'
import OtpCheck from './OtpCheck'
import ReactLoading from 'react-loading';

function LoginForm(){
    const [loading,setLoading]=React.useState(false);

    const getOtp=async(registerData)=>{
        await setLoading(true)
        checkUserValidity(registerData.quizid,registerData.email).then(async(res)=>{
            if(res.data.RESULT)
            {
                await setLoading(false)
                setView(<OtpCheck getOtp={getOtp} userinfo={registerData}/>)   
            }
            else
            {
                alert("Please try again")
            }
        })
        .catch(error=>{
            alert(error.response.data.message)
            setLoading(false);})
    }

    
    React.useEffect(()=>{
        sessionStorage.clear()
    },[])

    
    const [view,setView]=React.useState(<OtpGenerate getOtp={getOtp}/>)

    return(
        <React.Fragment>
            {loading?<ReactLoading type={"spinningBubbles"} color={"blue"}/>:view}
        </React.Fragment>
    )
}

export default LoginForm
