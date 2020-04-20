import React from'react'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'
import {createPart1,getPart1} from '../Redux/actions'
 
function Test({dispatch}){

    const [value,setValue]=React.useState({test:"",tes1:""})
    function handleChange(event,idx){
        setValue({[event.target.name]:event.target.value})
        dispatch(createPart1({name:event.target.value,age:10},idx))
    }
    function jjj(){
        console.log(dispatch(getPart1()))
    }
    return(
        <div>
            <TextField name="test" id="test" variant="outlined" value={value.test} onChange={(e)=>handleChange(e,0)}/>
            <TextField name="test1" id="test1" variant="outlined" value={value.test1} onChange={(e)=>handleChange(e,1)}/>
        </div>
    )
}

export default connect()(Test)