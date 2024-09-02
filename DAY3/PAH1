import React from 'react';

class GokuTransform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transformation: "Kaioken",
      clickCount: 0 
    };
  }
  handleButtonClick = () => {
    this.setState((prevState) => {
      const newClickCount = prevState.clickCount + 1;
      
      if (newClickCount === 4) {
        return {
          transformation: prevState.transformation === "Kaioken" ? "SuperSaiyan" : "Kaioken",
          clickCount: 0
        };
      } else {
        return { clickCount: newClickCount };
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Current Transformation: {this.state.transformation}</h1>
        <button onClick={this.handleButtonClick}>Click Me</button>
        {/* <p>Click Count: {this.state.clickCount}</p> */}
      </div>
    );
  }
}

export default GokuTransform;
