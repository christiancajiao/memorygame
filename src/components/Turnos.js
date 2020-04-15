import React from "react";

class Turnos extends React.Component {
  turno = () => {};
  render() {
    return <div className="turnos">{this.props.turnos}</div>;
  }
}

export default Turnos;
