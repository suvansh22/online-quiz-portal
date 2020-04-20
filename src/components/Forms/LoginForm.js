import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function LoginForm(){

    function handleSubmit(data){
        console.log(data)
        event.preventDefault()
    }

    return(
            <form onSubmit={()=>handleSubmit(data)} >
                <TextField
                variant="outlined"
                label="email"
                id="email"
                name="email"
                />
                <Button 
                type="submit"
                variant="contained"
                //onClick={handleSubmit}
                >Click on me
                </Button>
            </form>
    )
}