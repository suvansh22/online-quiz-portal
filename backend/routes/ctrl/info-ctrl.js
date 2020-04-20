const quizinfoSchema=require('../schema/quizInfoSchema')

exports.createQuizinfo=(req,res)=>{
    const body=req.body
    const newData=new quizinfoSchema(body)
    newData.save((error)=>{
        if(error)
        {
            console.log(error)
            return res.status(400).send({errors:[{title:'Data Error!',message:"cannot be saved data"}]})

        }
        return res.status(201).json({success: true,id: newData._id,message: 'Movie created!'})
    })
}

exports.getQuizInfoById=(req,res)=>{
    const id=req.params.id
    quizinfoSchema.findById(id,(error,data)=>{
        if(error)
        {
            return res.status(400).send({message:"cannot fetch data from database"})
        }
        else
        {
            return res.status(200).json(data);
        }
    })
}

exports.updateQuizInfo=(req,res)=>{
    const id=req.params.id
    quizinfoSchema.findByIdAndUpdate({_id:id},{$set:{edit:false}},(error,data)=>{
        if(error)
        {
            return res.status(400).send({errors:[{messase:"Quiz is ready"}]})
        }
        else
        {
            return res.status(200).json({message:"success"})
        }
    })
}