function th(){
    const n1="Kabil";
    const n2="Kabil";
    const o1={n:"Kabil"};
    const o2={n:"Kabil"};
    alert("check it is true at primitive and reference datatype");
    if(n1===n2)
    {
        console.log("primitive: "+true);

    }if(o1===o2){
        console.log("reference: "+true);
    }else{
        console.log("reference: "+false);
    }
}
function Cy1()
{
    return(
        <div>
            <button onClick={th}>CY1</button>
        </div>
    )
}
export default Cy1;
