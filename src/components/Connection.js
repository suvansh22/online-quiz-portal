import axios from 'axios'
 const api=axios.create({baseURL:"http://localhost:3001/database"})

 export const getData = ()=>api.get(`/quizdata`)
 export const getDataById = id =>api.get(`/quizdata/${id}`)
 export const createQuiz=(payload)=>api.post('/quizinfo',payload)
 export const getQuizInfoId=(id)=>api.get(`/quizinfo/${id}`)
 export const createDynamicQuizTable=(payload,id)=>api.post(`/createQuestionAnswer/${id}`,payload)
 export const updateQuiz=(id)=>api.put(`/quizinfoupdate/${id}`)
 export const getDynamicQuizTable=id=>api.get(`/getQuestionAnswer/${id}`)
 export const checkUserValidity=(id,email)=>api.get(`/userAvailabilty/${id}/${email}`)
 export const checkOtp=(payload)=>api.post(`/checkOtp`,payload);
 export const inputUserInfo=(payload)=>api.post('/inputUserInfo',payload)