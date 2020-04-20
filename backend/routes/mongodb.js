var mongoose = require('mongoose')
var {DB_URI} = require('./config')
mongoose
.connect(DB_URI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},
    ()=>{console.log("connected to db")})
.catch(e=>{console.error('Connection error',e.message)})
const db = mongoose.connection

module.exports=db