import {field1} from './fieldData'
import{quizData} from './quizData'

export const saveQuiz=(data)=>{
    return{
        type:"save_quiz",
        data
    }
}

export const getQuiz=()=>{
    return{
        type:"get_quiz",
    }
}

export const createPart1=(fields,idx)=>{
    return{
    type:"create_Part_1",
    fields,
    idx
    }
}

export const getPart1=()=>{
    return{
        type:"get_Part_1",
        field1
    }
}

export const createPart2=fields=>{
    return{
        type:"create_Part_2",
        fields
    }
}


// export const getPart2=()=>{
//     return{
//         type:"get_Part_2",
//         field2
//     }
// }

export const createPart3=fields=>{
    return{
        type:"create_Part_3",
        fields
    }
}


// export const getPart3=()=>{
//     return{
//         type:"get_Part_3",
//         field3
//     }
// }