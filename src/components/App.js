import React from "react";
import Card from "./cards";
import Turno from "./Turnos";
import ResetButton from "./ResetButton";
import Win from "./Win";

let numeroElementos = [0, 1, 2, 3, 4, 5, 6, 7];
let espejonumeroElementos = [0, 1, 2, 3, 4, 5, 6, 7];
let randomLocationfornumbers = [];

let i = 0;
while (i < numeroElementos.length) {
  let indicerandom = Math.floor(Math.random() * numeroElementos.length);
  let espejoindicerandom = Math.floor(
    Math.random() * espejonumeroElementos.length
  );

  let numeroRandom = numeroElementos[indicerandom];
  let espejonumeroRandom = espejonumeroElementos[espejoindicerandom];

  numeroElementos.splice(indicerandom, 1);
  espejonumeroElementos.splice(espejoindicerandom, 1);

  randomLocationfornumbers.push(numeroRandom);
  randomLocationfornumbers.push(espejonumeroRandom);
}
function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 500);
  });
}

class App extends React.Component {
  state = {
    firstClickedCard: "",
    pairOfCards: [],
    actualID: [],
    idNumbers: [],
    turnos: 0,
    segundos: 0,
    minutos: 0,
    final: 0,
  };

  resuelveen1segudno = () => {
    setInterval(() => {
      if (this.state.segundos === 59) {
        this.setState({
          segundos: 0,
          minutos: this.state.minutos + 1,
        });
      }
      this.setState({ segundos: this.state.segundos + 1 });
    }, 1000);
  };

  // comparacion para cartas boca arriba
  // if (this.state.firstClickedCard !== "" || this.state.pairOfCards.includes(numero)) { this.setState({ upside: true})}

  onCardClicked = (number, index) => {
    if (this.state.segundos === 0) {
      this.resuelveen1segudno();
    }

    if (this.state.firstClickedCard === "") {
      this.setState({
        firstClickedCard: number,
        actualID: [...this.state.actualID, index],
      });

      return;
    }
    if (
      this.state.pairOfCards.includes(number) ||
      this.state.idNumbers.includes(index)
    ) {
      return;
    } else if (
      this.state.firstClickedCard === number &&
      this.state.actualID.includes(index)
    ) {
      return;
    }
    //ON SECOND CLICK
    if (
      //this mean is pair
      this.state.firstClickedCard === number &&
      this.state.actualID.includes(index) === false
    ) {
      this.setState({
        pairOfCards: [
          ...this.state.pairOfCards,
          this.state.firstClickedCard,
          number,
        ],
        idNumbers: [
          ...this.state.idNumbers,
          Number(this.state.actualID),
          index,
        ],
        turnos: this.state.turnos + 1,
      });
      this.setState({ firstClickedCard: "", actualID: [] });
    } else if (this.state.firstClickedCard !== number) {
      //async function
      const asyncCall = async () => {
        this.setState({
          pairOfCards: [...this.state.pairOfCards, number],
          idNumbers: [...this.state.idNumbers, index],
        });
        const result = await resolveAfter2Seconds();
        console.log(result);
        let eliminarultimoId = this.state.idNumbers.pop();
        let eliminarultimopar = this.state.pairOfCards.pop();
        this.setState({
          firstClickedCard: "",
          pairOfCards: this.state.pairOfCards,
          actualID: [],
          idNumbers: this.state.idNumbers,
          turnos: this.state.turnos + 1,
        });
      };

      asyncCall();
    }
  };

  resetButton = () => {
    this.setState({
      firstClickedCard: "",
      pairOfCards: [],
      actualID: [],
      idNumbers: [],
      turnos: 0,
      segundos: 0,
      minutos: 0,
      final: 0,
    });
  };

  createCard = () => {
    console.log(this.state.pairOfCards);
    //que hace que una tarjeta este descubierta o no ?---
    //
    return randomLocationfornumbers.map((number, index) => {
      return (
        <Card
          isUpSide={
            (this.state.firstClickedCard === number &&
              this.state.actualID.includes(index)) ||
            (this.state.pairOfCards.includes(number) &&
              this.state.idNumbers.includes(index))
          }
          id={index}
          onCardClicked={this.onCardClicked}
          onlistpair={this.state.pairOfCards}
          numero={number}
        />
      );
    });
  };
  winadvice = () => {
    // no puedo hacer set state
    return (
      <Win
        deployWin={
          this.state.pairOfCards.includes(0) &&
          this.state.pairOfCards.includes(1) &&
          this.state.pairOfCards.includes(2) &&
          this.state.pairOfCards.includes(3) &&
          this.state.pairOfCards.includes(4) &&
          this.state.pairOfCards.includes(5) &&
          this.state.pairOfCards.includes(6) &&
          this.state.pairOfCards.includes(7)
        }
        turnos={this.state.turnos}
        time={this.state.finalTime}
      />
    );
  };
  render() {
    return (
      <div className="containerOfContainers">
        {this.winadvice()}
        <div className="fondo"></div>
        <div className="buttonsContainer">
          <ResetButton resetButton={this.resetButton} />
          <div className="reloj">
            {this.state.minutos} : {this.state.segundos}
          </div>
          <Turno turnos={this.state.turnos} />
        </div>
        <div className="eye"></div>
        <div className="cardContainer">{this.createCard()}</div>
      </div>
    );
  }
}

export default App;
