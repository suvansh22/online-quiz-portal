var mongoose = require('mongoose')
var Schema= mongoose.Schema;

function dynamicSchema(id){
    delete mongoose.connection.models[id+'.address'];
    var quizTable = new Schema({
        part:{type:String,required:true},
        question:{type:String,required:true},
        option1:{type:String,required:true},
        option2:{type:String,required:true},
        option3:{type:String,required:true},
        option4:{type:String,required:true},
        answer:{type:String,required:true}
    },{collection:id+'.address'});

return mongoose.model(id+'.address',quizTable)
}

module.exports=dynamicSchema