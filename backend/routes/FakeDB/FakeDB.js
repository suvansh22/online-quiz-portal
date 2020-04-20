const QuizSchema = require('../quizSchema')
const quizdata = require('./Data')
class FakeDB{
    clean(){
        return QuizSchema.deleteMany({})
    }
    addData(){
        return QuizSchema.create(quizdata)
    }
    async populate(){
        await this.clean()
        await this.addData()
    }
}

module.exports = FakeDB