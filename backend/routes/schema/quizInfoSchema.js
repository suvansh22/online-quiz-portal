const mongoose=require('mongoose')
const Schema=mongoose.Schema

const QuizInfo=new Schema(
    {
    quizname:{type:String,required:true},
    part1:{type:String,required:true},
    part2:{type:String,default:""},
    part3:{type:String,default:""},
    timebound:{type:String,required:true},
    Result:{type:String,required:true},
    timeLimit:{type:String},
    noofParts:{type:String,required:true},
    edit:{type:Boolean,default:true}
    },{coolection:'quizinfo'}
)

module.exports=mongoose.model('quizinfo',QuizInfo)