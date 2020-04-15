import React from "react";
import Card1 from "../imagenes/carta1.jpg";
import Card2 from "../imagenes/carta2.jpg";
import Card3 from "../imagenes/carta3.jpg";
import Card4 from "../imagenes/carta4.jpg";
import Card5 from "../imagenes/carta5.jpg";
import Card6 from "../imagenes/carta6.jpg";
import Card7 from "../imagenes/carta7.png";
import Card8 from "../imagenes/carta8.jpg";

class Card extends React.Component {
  onCardClicked = (e) => {
    this.props.onCardClicked(this.props.numero, this.props.id);
  };
  numerotoCard = {
    0: Card1,
    1: Card2,
    2: Card3,
    3: Card4,
    4: Card5,
    5: Card6,
    6: Card7,
    7: Card8,
  };

  render() {
    return (
      <div
        className={this.props.isUpSide ? "cardClick" : "card"}
        onClick={this.onCardClicked}
        id={this.props.id}
      >
        <img
          className={this.props.isUpSide ? "imageClick" : "image"}
          src={this.numerotoCard[this.props.numero]}
          onClick={this.onCardClicked}
          id={this.props.id}
        />
      </div>
    );
  }
}

export default Card;
