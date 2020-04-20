const mongoose = require('mongoose')
const Schema = mongoose.Schema
const otpSchema = new Schema(
    {
        email:{required:true,type:String},
        otp:{required:true,type:Number},
        createdAt:{type:Date,default:new Date()}
    },{collection:'otpSchema'}
)

otpSchema.index({createdAt:1,expireAfterSeconds:300})

module.exports=mongoose.model('otpSchema',otpSchema);

