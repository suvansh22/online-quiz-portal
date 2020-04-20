import {field1} from './fieldData'

const quiztempdata = (state=[],action)=>{
    switch(action.type){
        case "create_Part_1":
            return field1[action.idx]=[action.fields];
        case "create_Part_2":
            return [...state,action.fields];
        case "create_Part_3":
            return [...state,action.fields];
        case "get_Part_1":
            return action.field1;
        // case "get_Part_2":
        //     return action.field2;
        // case "get_Part_3":
        //     return action.field3;
        default:
            return state;
    }
}

export default quiztempdata;