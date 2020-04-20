const mongoose=require('mongoose')
const Schema = mongoose.Schema

const QuizSchema = new Schema(
    {
        quizid:{required:true,type:String},
        email:{required:true,type:String},
        name:{required:true,type:String}
    },{collection:'quizdata'}
)

module.exports=mongoose.model('QuizData',QuizSchema);