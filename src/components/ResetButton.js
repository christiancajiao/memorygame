import React from "react";

class ResetButton extends React.Component {
  render() {
    return (
      <div className="resetButton" onClick={this.props.resetButton}>
        Reset
      </div>
    );
  }
}

export default ResetButton;
