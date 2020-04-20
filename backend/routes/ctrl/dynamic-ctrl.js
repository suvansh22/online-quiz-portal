exports.createQuestionAnswer=(req,res)=>{
    const body=req.body
    const id=req.params.id
    //const dynamicquizTable = require('../schema/dynamicSchema')(id)
    require('../schema/dynamicSchema')(id).insertMany(body,function(error,result){
        if(error)
        {
            console.log(error)
            return res.status(400).send({errors:[{title:'Data Error!',message:"cannot be saved data"}]})

        }
        return res.status(201).json({success: true})
    })
}

exports.getQuestionAnswer=(req,res)=>{
    const id = req.params.id
    require('../schema/dynamicSchema')(id).find({},function(error,result){
        if(error)
        {
            return res.status(400).json({message:"Failure"})
        }
        else
        {
            return res.status(200).json(result)
        }
})
}