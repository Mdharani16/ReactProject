import React from 'react';

const Stylecss=()=>{
    const rev=
    {
        backgroundColor:'lightblue',
        color:'darkblue',
        Padding:'10px',
        border:'1px solid blue',
        borderRadius:'5px'
        
    }
    return(
        <div style={rev}>
            <h1 style={{color:'green'}}>Inline Style in JSX Example.</h1>
            <p style={{color:'darkblue',fontSize:'16px'}}>"This is a paragraph with inline styles applied."</p>
        </div>
    )
} 
export default Stylecss;
