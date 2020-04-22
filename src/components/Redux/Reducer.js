import {field1} from './fieldData'
import{quizData} from './quizData'

export const initialState={
    quizData
}
const quiztempdata = (state = initialState,action)=>{
    switch(action.type){
        case "create_Part_1":
            return field1[action.idx]=[action.fields];
        case "create_Part_2":
            return [...state,action.fields];
        case "create_Part_3":
            return [...state,action.fields];
        case "get_Part_1":
            return action.field1;
        case "save_quiz":
            let data={...action.data}
            return {
                quizData:{...state.quizData,...data}
            }
        case "get_quiz":
            console.log("yup")
        // case "get_Part_2":
        //     return action.field2;
        // case "get_Part_3":
        //     return action.field3;
        default:
            return state;
    }
}

export default quiztempdata;