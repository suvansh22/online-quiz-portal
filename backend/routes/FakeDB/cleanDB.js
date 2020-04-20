const mongoose = require('mongoose')
const FakeDB = require('./FakeDB')

var url="mongodb+srv://suvansh:12345@cluster0-qmuir.mongodb.net/online-quiz-portal?retryWrites=true&w=majority"
mongoose
.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},
    async()=>{
        const fakeDB=new FakeDB();
        console.log("Starting population DB")
        await fakeDB.populate();
        await mongoose.connection.close();
        console.log("DB has been populated")
    })