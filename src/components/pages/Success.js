import React from 'react'


export default function Success({inwidth,inheight}){

    return(
        <div style={{width:inwidth,height:inheight}}>
            <span style={{WebkitTextFillColor:"Green"}}>Successfully saved</span>
        </div>
    )
}