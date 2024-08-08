import React from "react";
 
const Smile = () => {
    const rev={
        backgroundColor:'lightgrey',
        paddingTop:'10px',
        border:'5px solid grey',
        borderRadius:'5px'
    }
         return(
            <div style={rev}>
                <h1 style={{textAlign:'center'}}>Smile Component</h1>
                <h3 style={{textAlign:'center'}}>It is a functional Component</h3>
                <img alt="img" src="https://static.vecteezy.com/system/resources/previews/003/660/834/original/happy-smile-emoticon-expression-free-vector.jpg" style={{width:'350px', height:'350px',paddingLeft:'460px'}}/> 
            </div>
         )
}
export default Smile;