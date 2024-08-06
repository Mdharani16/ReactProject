import React from 'react';
function data(){
    let name="Kiran";
    let age=25;
    let Status=true;
    let user;
    let res=null;
    alert("Check the console output!");
    console.log("Age :"+age);
    console.log("Status :"+Status);
    console.log("Name :"+name);
    console.log("userdefault :"+user)
    console.log("responsevalue :"+res);
}

function Types()
{
    return(
        <div>
        <button onClick={data}>PAH</button>
        </div>
    )
}
export default Types;
