import React from 'react';
function dh(){
    let myarray=["a","e","i","o"];
    myarray.push("u");
    alert("Check the console output");
    console.log(myarray);
}
function Arr()
{
    return(
        <div>
        <button onClick={dh}>CE2</button><br></br>
        </div>
    )
}
export default Arr;
