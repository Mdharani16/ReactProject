function Array(){
    const direct=["North","South","East","West"];
    const other=["left","right"];
    const News=direct.concat(other);
    console.log(News);
}
function RefreshArray(){
    <ul id="my"></ul>
       let direct=["North","South","East","West"];
       let list=document.getElementById("my");
       let ul=<ul>${direct.map(direct =>
        <li>${direct}</li>).join('')}</ul>;
       console.log(ul);
}
function App()
{
    return(
        <div className="App">
        <button onClick={Array}>Array</button>
        <button onClick={RefreshArray}>RefreshArray</button>
        </div>
    )
}
export default App;
