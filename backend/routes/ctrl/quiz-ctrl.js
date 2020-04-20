const QuizSchema = require('../schema/quizSchema')
const otpGenerator = require('otp-generator')
const nodemailer=require("nodemailer");
const otpschema = require('../schema/otpSchema')
const quizinfoschema = require('../schema/quizInfoSchema')

exports.createQuizData=(req,res)=>{
    const data=req.body;
    console.log("S:",data)
    const newData= new QuizSchema(data)
    newData.save((error)=>{
        if(error)
        {
            return res.status(400).json({message:"OOps something went wrong"})
        }
            quizinfoschema.find({_id:data.quizid},'quizname',function(error,result){
                if(error)
                {
                    res.status(400).json({message:"Plase try again"})
                }
                console.log("A",result[0].quizname)
            return res.status(200).send({message:"done",id:newData._id,title:result[0].quizname})
        })
    })
}

exports.CheckUserAvailability=(req,res)=>{
    const id = req.params.id
    const reqemail = req.params.email
    quizinfoschema.findOne({_id:id},function(error,result){
        if(result)
        {
            QuizSchema.findOne({quizid:id,email:reqemail},function(error,result){
                if(result)
                {
                    return res.status(400).json({message:"already exists"})
                }
                else if(error)
                {
                    return res.status(400).json({message:"OOps something went wrong"})
                }
                let otp=otpGenerator.generate(4,{upperCase:false,specialChars:false,alphabets:false,digits:true});
                let transporter=nodemailer.createTransport({
                    service:'gmail',
                    secure:false,
                    auth:{
                        user:'thedailyofferjuet@gmail.com',
                        pass:'suvansh@12345'
                    }
                });
                var msg='Your otp is: '+otp+' for quiz with id: '+id
        
                let mailOptions ={
                    from :'s22ubbu@gmail.com',
                    to:reqemail,
                    subject:'OTP',
                    text:msg
                };
                transporter.sendMail(mailOptions,function(error,result){
                    if(error)
                    {
                        return res.status(400).json({message:"Oops something went wrong please try again!"}) 
                    }
                    else{
                        console.log('Email send')
                        const newData= new otpschema({email:reqemail,otp:otp})
                        newData.save((error)=>{
                            if(error)
                            {
                                console.log(error)
                                return res.status(400).json({message:"Something went wrong"})
        
                            }
                        return res.status(200).json({RESULT:true});
                        })
                    }
                })
                    })
        }
        else if(!result)
        {
            return res.status(422).send({message:"No quiz exists with such id"})
        }
        else
        {
            return res.status(400).json({message:"Oops something went wrong please try again!"}) 
        }
    })
}
