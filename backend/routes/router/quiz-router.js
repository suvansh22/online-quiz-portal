const express = require('express')
const quizCtrl = require('../ctrl/quiz-ctrl')
const router = express.Router()
const infoCtrl = require('../ctrl/info-ctrl')
const dynamicquiztable = require('../ctrl/dynamic-ctrl')
const otpCtrl = require('../ctrl/otp-ctrl')

router.post('/createQuestionAnswer/:id',dynamicquiztable.createQuestionAnswer)
router.get('/getQuestionAnswer/:id',dynamicquiztable.getQuestionAnswer)
router.post('/quizinfo',infoCtrl.createQuizinfo)
router.get('/quizinfo/:id',infoCtrl.getQuizInfoById)
router.put('/quizinfoupdate/:id',infoCtrl.updateQuizInfo)
router.post('/inputUserInfo',quizCtrl.createQuizData)
router.get('/userAvailabilty/:id/:email',quizCtrl.CheckUserAvailability)
router.post('/checkOtp',otpCtrl.CheckOtp)
//router.delete('/answer/:id',answerCtrl.deleteAnswer)

module.exports=router