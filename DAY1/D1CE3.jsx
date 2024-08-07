import React from 'react';
function World(){
    return(
        <div>
            <p>
                This is a Team Functional Component
            </p>
        </div>
    )
}
function Teams()
{
    return(
        <div>
        <p>This is World Functional Component</p>
        <World/>
        </div>
    )
}
export default Teams;
