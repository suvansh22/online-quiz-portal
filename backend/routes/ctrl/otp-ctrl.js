const otpschema = require('../schema/otpSchema')
const quizctrl = require('../ctrl/quiz-ctrl')
var express = require('express')
var app = express()
require('run-middleware')(app)

exports.CheckOtp=(req,res)=>{
    let body = req.body
    otpschema.find({email:body.email},'otp',{limit:1,sort:{createdAt:-1}},function(error,result){
        if(error)
        {
            return res.status(400).json({message:"OOps something went wrong"})
        }
        else if(result)
        {
            console.log("A:",result[0].otp)
            if(body.otp==result[0].otp)
            {
                return res.status(200).json({Result:true})
            }
            else
            {
                return res.status(400).json({message:"Wrong otp"}) 
            }
        }
    })
}