import React from "react";

class Win extends React.Component {
  puntaje = () => {
    if (this.props.turnos <= 10) {
    } else if (this.props.turnos >= 11 && this.props.turnos < 13) {
      return (
        <div>
          <img className="estrella" />
          <img className="estrella" />
          <img className="estrella" />
        </div>
      );
    } else if (this.props.turnos >= 16 && this.props.turnos < 19) {
      return (
        <div>
          <img className="estrella" />
          <img className="estrella" />
          <img className="estrellaoculta" />
        </div>
      );
    } else if (this.props.turnos >= 20 && this.props.turnos < 25) {
      return (
        <div>
          <img className="estrella" />
          <img className="estrellaoculta" />
          <img className="estrellaoculta" />
        </div>
      );
    } else {
      return (
        <div>
          <img className="estrellaoculta" />
          <img className="estrellaoculta" />
          <img className="estrellaoculta" />
        </div>
      );
    }
  };

  cerrarventanawin = () => {
    window.location.reload();
  };
  render() {
    return (
      <div
        className={this.props.deployWin ? "winning_win" : "playing_win"}
        onClick={this.cerrarventanawin}
      >
        <div className="exitwin"> BACK TO GAME</div>
        <div className="win_message">GAME OVER</div>

        <div className="win_estrellas">{this.puntaje()}</div>
      </div>
    );
  }
}

export default Win;
